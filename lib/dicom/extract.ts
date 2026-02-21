import { createSandbox, runSandboxCommand, destroySandbox } from '../sandbox/client';
import { NETWORK_POLICIES } from '../sandbox/network';

// Embedded extract script to avoid file read issues in serverless
const EXTRACT_SCRIPT = `
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const dicomParser = require('dicom-parser');
const fs = require('fs');

const INPUT_FILE = 'input.dcm';

async function main() {
  try {
    if (!fs.existsSync(INPUT_FILE)) {
      console.error('Input file not found');
      process.exit(1);
    }

    const buffer = fs.readFileSync(INPUT_FILE);
    const dataSet = dicomParser.parseDicom(buffer);

    // Standard DICOM tags
    // 0010,0010 Patient Name
    // 0010,0020 Patient ID
    // 0008,0020 Study Date
    // 0008,0060 Modality
    // 0008,1030 Study Description
    const result = {
      patientName: dataSet.string('x00100010'),
      patientId: dataSet.string('x00100020'),
      studyDate: dataSet.string('x00080020'),
      modality: dataSet.string('x00080060'),
      studyDescription: dataSet.string('x00081030'),
    };

    console.log(JSON.stringify(result));
  } catch (error) {
    console.error('DICOM parsing failed:', error);
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
  studyDescription?: string;
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

    const result = (await runSandboxCommand({
      sandbox,
      cmd: 'sh',
      // Install dicom-parser (lightweight)
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
            // Check if it looks like our result (has at least one expected key or is empty object)
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
