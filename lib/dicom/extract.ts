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

    // Helper to get string value from DICOM data element
    const getVal = (tag) => {
        const element = dataSet.elements[tag];
        if (element && element.length > 0) {
            // Read string from buffer using offset and length
            // Using 'latin1' (binary) as default for DICOM unless specific charset handling is needed
            // But for basic ASCII metadata, utf8 or latin1 is usually fine.
            // Let's use utf8 and strip nulls.
            const text = buffer.toString('utf8', element.dataOffset, element.dataOffset + element.length);
            // Remove null characters and trim
            return text.replace(/\\u0000/g, '').trim();
        }
        return null;
    };

    const metadata = {
      patientName: getVal('x00100010'),
      patientId: getVal('x00100020'),
      studyDate: getVal('x00080020'),
      modality: getVal('x00080060'),
      studyDescription: getVal('x00081030'),
    };

    console.log(JSON.stringify(metadata));

  } catch (error) {
    console.error('Extraction failed:', error);
    process.exit(1);
  }
}

main();
`;

export interface DicomMetadata {
  patientName: string | null;
  patientId: string | null;
  studyDate: string | null;
  modality: string | null;
  studyDescription: string | null;
}

export async function extractDicomMetadataInSandbox(dicomBuffer: Buffer): Promise<DicomMetadata> {
  const sandbox = await createSandbox({
    runtime: 'node',
    timeoutMs: 120000,
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
      args: ['-c', 'npm i dicom-parser --silent && node extract.mjs'],
      timeoutMs: 120000,
    })) as { stdout: string; stderr: string; exitCode: number };

    if (result.exitCode !== 0) {
      console.error('Sandbox stderr:', result.stderr);
      throw new Error('DICOM extraction failed inside sandbox');
    }

    const stdoutStr = result.stdout;
    const lines = stdoutStr.trim().split('\n');
    let jsonResult;
    // Iterate from end to find last valid JSON
    for (let i = lines.length - 1; i >= 0; i--) {
        try {
            const parsed = JSON.parse(lines[i]);
            // Check if it looks like our metadata object
            if (parsed && typeof parsed === 'object' && ('patientName' in parsed || 'modality' in parsed)) {
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
