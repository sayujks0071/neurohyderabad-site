
import { createPatient, findPatientByEmail } from '../lib/crm-client';

async function main() {
    console.log('Starting CRM client verification...');

    const testEmail = `verify-${Date.now()}@example.com`;
    console.log(`Testing with email: ${testEmail}`);

    try {
        // 1. Check if patient exists (should be null)
        console.log('1. Finding patient...');
        const existing = await findPatientByEmail(testEmail);
        console.log('Find result:', existing);

        // 2. Create patient
        console.log('2. Creating patient...');
        const newPatient = await createPatient({
            email: testEmail,
            first_name: 'Verification',
            last_name: 'Script',
            phone: '555-0199',
            city: 'Local Test',
            notes: 'Created via verification script',
            pain_score: 5,
            mri_scan_available: false
        });
        console.log('Create result:', newPatient);

        if (newPatient && newPatient.email === testEmail) {
            console.log('✅ SUCCESS: Patient created successfully');
        } else {
            console.error('❌ FAILURE: Patient creation returned unexpected result');
        }

    } catch (error) {
        console.error('❌ ERROR:', error);
        process.exit(1);
    }
}

main();
