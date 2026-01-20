import axios from 'axios';

const BASE_URL = process.env.BASE_URL || 'http://localhost:3000';

async function testLeadSubmission() {
    console.log('Testing /api/lead submission...');
    try {
        const response = await axios.post(`${BASE_URL}/api/lead`, {
            fullName: 'Test User',
            phone: '1234567890',
            email: 'test@example.com',
            concern: 'Test concern',
            metadata: { source: 'test-script' }
        });

        console.log('Lead submission response:', response.data);
        if (response.data.ok) {
            console.log('✅ Lead submission successful');
        } else {
            console.error('❌ Lead submission failed:', response.data);
        }
    } catch (error: any) {
        console.error('❌ Error submitting lead:', error.response?.data || error.message);
    }
}

async function testAppointmentEmail() {
    console.log('\nTesting /api/email/appointment submission...');
    try {
        const response = await axios.post(`${BASE_URL}/api/email/appointment`, {
            name: 'Test Patient',
            email: 'test-patient@example.com',
            phone: '9876543210',
            message: 'This is a test appointment request from the verification script.',
            preferredDate: '2025-02-01'
        });

        console.log('Appointment email response:', response.data);
        if (response.data.success) {
            console.log('✅ Appointment email submission successful');
        } else {
            console.error('❌ Appointment email submission failed:', response.data);
        }
    } catch (error: any) {
        console.error('❌ Error submitting appointment email:', error.response?.data || error.message);
    }
}

async function run() {
    await testLeadSubmission();
    await testAppointmentEmail();
}

run();
