import { createSandbox, runSandboxCommand, destroySandbox } from '../sandbox/client';
import { NETWORK_POLICIES } from '../sandbox/network';

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

    // Check if valid DICOM before parsing to avoid crash if possible, but parseDicom handles it
    let dataSet;
    try {
        dataSet = dicomParser.parseDicom(buffer);
    } catch (e) {
        console.error('Failed to parse DICOM:', e.message);
        process.exit(1);
    }

    const result = {
      patientName: dataSet.string('x00100010') || 'N/A',
      patientID: dataSet.string('x00100020') || 'N/A',
      studyDate: dataSet.string('x00080020') || 'N/A',
      studyDescription: dataSet.string('x00081030') || 'N/A',
      modality: dataSet.string('x00080060') || 'N/A',
      seriesDescription: dataSet.string('x0008103e') || 'N/A',
    };

    console.log(JSON.stringify(result));

  } catch (error) {
    console.error('Extraction script failed:', error);
    process.exit(1);
  }
}

main();
`;

export interface DicomMetadata {
  patientName: string;
  patientID: string;
  studyDate: string;
  studyDescription: string;
  modality: string;
  seriesDescription: string;
}

export async function extractDicomMetadataInSandbox(dicomBuffer: Buffer): Promise<DicomMetadata> {
  const sandbox = await createSandbox({
    runtime: 'node',
    timeoutMs: 60000, // 1 minute should be enough for metadata
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
      args: ['-c', 'npm i dicom-parser@1.8.21 --silent && node extract.mjs'],
      timeoutMs: 60000,
    })) as { stdout: string; stderr: string; exitCode: number };

    if (result.exitCode !== 0) {
      console.error('Sandbox stderr:', result.stderr);
      throw new Error('DICOM extraction failed inside sandbox');
    }

    const stdoutStr = result.stdout;

    // Parse JSON from stdout
    const lines = stdoutStr.trim().split('\n');
    let jsonResult;
    for (let i = lines.length - 1; i >= 0; i--) {
        try {
            const parsed = JSON.parse(lines[i]);
            if (parsed && typeof parsed === 'object' && 'modality' in parsed) { // simple check
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
