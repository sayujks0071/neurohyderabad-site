import { createSandbox, runSandboxCommand, destroySandbox } from '../sandbox/client';
import { NETWORK_POLICIES } from '../sandbox/network';

// Embedded extract script to ensure availability in serverless environment
const EXTRACT_SCRIPT = `
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const pdf = require('pdf-parse');
const fs = require('fs');

const INPUT_FILE = 'input.pdf';
const MAX_CHARS = 120000;

async function main() {
  try {
    if (!fs.existsSync(INPUT_FILE)) {
      console.error('Input file not found');
      process.exit(1);
    }

    const dataBuffer = fs.readFileSync(INPUT_FILE);

    const data = await pdf(dataBuffer);

    const text = data.text || '';
    const numpages = data.numpages || 0;

    // Sanitize text (remove control characters except newlines/tabs)
    const sanitized = text.replace(/[\\x00-\\x08\\x0B-\\x1F\\x7F]/g, '');

    const truncated = sanitized.length > MAX_CHARS;
    const finalText = sanitized.slice(0, MAX_CHARS);

    console.log(JSON.stringify({
      text: finalText,
      numpages,
      truncated
    }));

  } catch (error) {
    console.error('Extraction failed:', error);
    process.exit(1);
  }
}

main();
`;

export interface ExtractionResult {
  text: string;
  numpages: number;
  truncated: boolean;
}

export async function extractReferralPdfInSandbox(pdfBuffer: Buffer): Promise<ExtractionResult> {
  const sandbox = await createSandbox({
    runtime: 'node',
    timeoutMs: 120000,
    vcpus: 1,
    network: NETWORK_POLICIES.PDF_EXTRACTION,
  });

  try {
    await sandbox.writeFiles([
      { path: 'input.pdf', content: pdfBuffer },
      { path: 'extract.mjs', content: Buffer.from(EXTRACT_SCRIPT) },
    ]);

    const result = (await runSandboxCommand({
      sandbox,
      cmd: 'sh',
      args: ['-c', 'npm i pdf-parse@1.1.1 --silent && node extract.mjs'],
      timeoutMs: 120000,
    })) as { stdout: string; stderr: string; exitCode: number };

    if (result.exitCode !== 0) {
      console.error('Sandbox stderr:', result.stderr);
      throw new Error('PDF extraction failed inside sandbox');
    }

    const stdoutStr = result.stdout;
    const lines = stdoutStr.trim().split('\n');
    let jsonResult;
    // Iterate from end to find last valid JSON
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
        throw new Error(`Invalid JSON from sandbox. Output: ${result.stdout}`);
    }

    return jsonResult;

  } finally {
    await destroySandbox(sandbox);
  }
}
