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
