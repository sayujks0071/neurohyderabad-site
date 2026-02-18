
import { validateDicom } from '../../lib/dicom/validation';

async function run() {
    console.log('Testing DICOM validation...');

    // 1. Test too small file
    const smallFile = new File([new Uint8Array(10)], "small.dcm", { type: "application/dicom" });
    let res = await validateDicom(smallFile);
    console.log('Small file:', res.isValid === false ? 'PASS' : 'FAIL', res.error);

    // 2. Test invalid magic bytes
    const badData = new Uint8Array(132);
    badData.fill(0);
    const badFile = new File([badData], "bad.dcm", { type: "application/dicom" });
    res = await validateDicom(badFile);
    console.log('Bad magic:', res.isValid === false ? 'PASS' : 'FAIL', res.error);

    // 3. Test valid magic bytes
    const goodData = new Uint8Array(132);
    goodData.fill(0);
    // Write DICM at 128
    goodData[128] = 68; // D
    goodData[129] = 73; // I
    goodData[130] = 67; // C
    goodData[131] = 77; // M

    const goodFile = new File([goodData], "good.dcm", { type: "application/dicom" });
    res = await validateDicom(goodFile);
    console.log('Good magic:', res.isValid === true ? 'PASS' : 'FAIL', res.error);

    // 4. Test size limit
    const bigData = new Uint8Array(10 * 1024 * 1024 + 1);
    const bigFile = new File([bigData], "big.dcm", { type: "application/dicom" });
    res = await validateDicom(bigFile);
    console.log('Big file:', res.isValid === false ? 'PASS' : 'FAIL', res.error);
}

run().catch(console.error);
