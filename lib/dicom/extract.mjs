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
