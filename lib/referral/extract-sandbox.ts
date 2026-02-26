import { createSandbox, runSandboxCommand, destroySandbox } from '../sandbox/client';
import { NETWORK_POLICIES } from '../sandbox/network';

const EXTRACT_SCRIPT = `
const fs = require('fs');
const pdf = require('pdf-parse');

const INPUT_FILE = 'input.pdf';

async function main() {
  try {
    if (!fs.existsSync(INPUT_FILE)) {
      console.error('Input file not found');
      process.exit(1);
    }

    const dataBuffer = fs.readFileSync(INPUT_FILE);

    const data = await pdf(dataBuffer);

    const result = {
      text: data.text ? data.text.replace(/\\u0000/g, '') : '',
      numpages: data.numpages,
      info: data.info,
    };

    console.log(JSON.stringify(result));

  } catch (error) {
    console.error('Extraction failed:', error);
    process.exit(1);
  }
}

main();
`;

export interface ReferralExtractionResult {
  text: string;
  numpages: number;
  info?: any;
}

export async function extractReferralTextInSandbox(pdfBuffer: Buffer): Promise<ReferralExtractionResult> {
  const sandbox = await createSandbox({
    runtime: 'node',
    timeoutMs: 120000, // 2 mins
    vcpus: 1,
    network: NETWORK_POLICIES.PDF_EXTRACTION,
  });

  try {
    await sandbox.writeFiles([
      { path: 'input.pdf', content: pdfBuffer },
      { path: 'extract.js', content: Buffer.from(EXTRACT_SCRIPT) },
    ]);

    // Install pdf-parse and run the script
    // Note: We use 'npm i pdf-parse --silent' inside the sandbox.
    // The sandbox environment starts fresh, so we need to install dependencies.
    const result = await runSandboxCommand({
      sandbox,
      cmd: 'sh',
      args: ['-c', 'npm i pdf-parse@1.1.1 --silent && node extract.js'],
      timeoutMs: 120000,
    });

    if (result.exitCode !== 0) {
      console.error('Sandbox stderr:', result.stderr);
      throw new Error(`Referral extraction failed: ${result.stderr || 'Unknown error'}`);
    }

    const stdoutStr = result.stdout;
    const lines = stdoutStr.trim().split('\n');
    let jsonResult;

    // Find the last valid JSON line
    for (let i = lines.length - 1; i >= 0; i--) {
      try {
        const parsed = JSON.parse(lines[i]);
        if (parsed && typeof parsed === 'object' && 'text' in parsed) {
          jsonResult = parsed;
          break;
        }
      } catch (e) {
        continue;
      }
    }

    if (!jsonResult) {
       // It's possible stdout contains npm logs or other noise, but we expect at least one JSON line.
       throw new Error(`Invalid output from extraction script. Stdout: ${stdoutStr.slice(0, 500)}`);
    }

    return jsonResult;

  } finally {
    await destroySandbox(sandbox);
  }
}
