import { createSandbox, runSandboxCommand, destroySandbox } from '../sandbox/client';
import { NETWORK_POLICIES } from '../sandbox/network';

const EXTRACT_SCRIPT = `
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const fs = require('fs');
const dicomParser = require('dicom-parser');

const INPUT_FILE = 'input.dcm';

async function main() {
  try {
    if (!fs.existsSync(INPUT_FILE)) {
      console.error('Input file not found');
      process.exit(1);
    }

    const buffer = fs.readFileSync(INPUT_FILE);
    const byteArray = new Uint8Array(buffer);

    let dataSet;
    try {
        dataSet = dicomParser.parseDicom(byteArray);
    } catch(e) {
        console.error('DICOM parsing failed:', e.message);
        process.exit(1);
    }

    const output = {
        patientName: dataSet.string('x00100010'),
        patientId: dataSet.string('x00100020'),
        studyDate: dataSet.string('x00080020'),
        modality: dataSet.string('x00080060'),
        manufacturer: dataSet.string('x00080070'),
        studyDescription: dataSet.string('x00081030'),
        institutionName: dataSet.string('x00080080'),
    };

    console.log(JSON.stringify(output));

  } catch (error) {
    console.error('Extraction script error:', error);
    process.exit(1);
  }
}

main();
`;

export interface DicomMetadata {
  patientName?: string;
  patientId?: string;
  studyDate?: string;
  modality?: string;
  manufacturer?: string;
  studyDescription?: string;
  institutionName?: string;
}

export async function extractDicomMetadataInSandbox(dicomBuffer: Buffer): Promise<DicomMetadata> {
  const timeoutMs = process.env.SANDBOX_DICOM_TIMEOUT_MS ? parseInt(process.env.SANDBOX_DICOM_TIMEOUT_MS, 10) : 60000;

  const sandbox = await createSandbox({
    runtime: 'node',
    timeoutMs,
    vcpus: 1,
    network: NETWORK_POLICIES.DICOM_EXTRACTION,
  });

  try {
    await sandbox.writeFiles([
      { path: 'input.dcm', content: dicomBuffer },
      { path: 'extract.mjs', content: Buffer.from(EXTRACT_SCRIPT) },
    ]);

    // Install dicom-parser and run script
    const result = (await runSandboxCommand({
      sandbox,
      cmd: 'sh',
      args: ['-c', 'npm i dicom-parser@1.8.21 --silent && node extract.mjs'],
      timeoutMs,
    })) as { stdout: string; stderr: string; exitCode: number };

    if (result.exitCode !== 0) {
      console.error('Sandbox stderr:', result.stderr);
      throw new Error('DICOM extraction failed inside sandbox');
    }

    const stdoutStr = result.stdout;

    // Try to find the JSON line in stdout
    const lines = stdoutStr.trim().split('\n');
    let jsonResult;
    for (let i = lines.length - 1; i >= 0; i--) {
        try {
            const parsed = JSON.parse(lines[i]);
            if (parsed && typeof parsed === 'object') {
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

    return jsonResult as DicomMetadata;

  } finally {
    await destroySandbox(sandbox);
  }
}
