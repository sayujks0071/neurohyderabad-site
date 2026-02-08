import { createSandbox, runSandboxCommand } from '../sandbox/client';
import { NETWORK_POLICIES } from '../sandbox/network';

// Embedded extract script to avoid file read issues in serverless
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

export async function extractPdfTextInSandbox(pdfBuffer: Buffer): Promise<ExtractionResult> {
  const sandbox = await createSandbox({
    runtime: 'node',
    timeoutMs: 120000,
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

    // Handle stdout whether it's a string or a function (depending on sandbox version)
    const stdoutStr = typeof result.stdout === 'function'
      ? await result.stdout()
      : result.stdout;

    // Try to find the JSON line in stdout (in case of other logs)
    const lines = (stdoutStr as string).trim().split('\n');
    let jsonResult;
    // Iterate from end to find last valid JSON
    for (let i = lines.length - 1; i >= 0; i--) {
        try {
            jsonResult = JSON.parse(lines[i]);
            if (jsonResult && typeof jsonResult === 'object' && 'text' in jsonResult) {
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
    // @ts-ignore
    if (sandbox.destroy) await sandbox.destroy();
  }
}
