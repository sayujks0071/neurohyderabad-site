/**
 * Test Google Sheets Integration
 * 
 * This script tests the Google Apps Script webhook directly
 * Run with: node scripts/test-google-sheets-integration.js
 */

const GOOGLE_SCRIPT_URL = process.env.GOOGLE_SCRIPT_WEBHOOK_URL || 
  'https://script.google.com/macros/s/AKfycbx3jjLvsIPbrBWop39QpZOhqLPx1ztZRJPxMf_J6pLrTAJZPH8EKJdwn65SjEXamycN/exec';

async function testGoogleSheetsIntegration() {
  console.log('🧪 Testing Google Sheets Integration');
  console.log('====================================\n');
  console.log(`URL: ${GOOGLE_SCRIPT_URL}\n`);

  // Create test payload
  const testPayload = {
    name: `Test Patient ${new Date().toLocaleTimeString()}`,
    condition: 'Test appointment - Integration verification',
    message: 'This is an automated test from the integration script',
    appointmentDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 5 days from now
    appointmentTime: '10:00',
    age: '35',
    gender: 'male',
    timestamp: new Date().toISOString(),
  };

  console.log('📤 Sending test payload:');
  console.log(JSON.stringify(testPayload, null, 2));
  console.log('');

  try {
    console.log('⏳ Sending request to Google Apps Script...\n');

    const response = await fetch(GOOGLE_SCRIPT_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testPayload),
    });

    const responseText = await response.text();
    let responseBody;
    try {
      responseBody = JSON.parse(responseText);
    } catch {
      responseBody = responseText;
    }

    console.log('📥 Response:');
    console.log(`HTTP Status: ${response.status}\n`);

    if (response.ok) {
      console.log('✅ SUCCESS! Google Apps Script responded with', response.status);
      console.log('');
      if (responseBody) {
        console.log('Response body:');
        console.log(JSON.stringify(responseBody, null, 2));
        
        // Check for errors in response body
        if (responseBody.status === 'error' || responseBody.error) {
          console.log('');
          console.log('⚠️  WARNING: Google Apps Script returned an error');
          console.log('');
          console.log('💡 This usually means:');
          console.log('   1. The script received the data correctly ✅');
          console.log('   2. But there\'s an issue writing to Google Sheets ❌');
          console.log('');
          console.log('🔧 To fix:');
          console.log('   1. Open your Google Apps Script editor');
          console.log('   2. Check that you\'re opening the correct Spreadsheet');
          console.log('   3. Verify the sheet name matches your script');
          console.log('   4. Check execution logs: View → Execution log');
          console.log('   5. Common issues:');
          console.log('      - Spreadsheet not found (wrong ID)');
          console.log('      - Sheet name doesn\'t match');
          console.log('      - Missing permissions to write to sheet');
          console.log('');
          process.exit(1);
        }
      }
      console.log('');
      console.log('🎉 Integration test passed!');
      console.log('   Check your Google Sheet to verify the data was added.');
      process.exit(0);
    } else {
      console.log('❌ ERROR! Google Apps Script responded with HTTP', response.status);
      console.log('');
      if (responseBody) {
        console.log('Error response:');
        console.log(JSON.stringify(responseBody, null, 2));
      }
      console.log('');
      console.log('💡 Troubleshooting:');
      console.log('   1. Verify the Google Apps Script URL is correct');
      console.log('   2. Check that the script is deployed as a web app');
      console.log('   3. Verify script permissions: "Execute as: Me", "Who has access: Anyone"');
      console.log('   4. Check Google Apps Script execution logs');
      process.exit(1);
    }
  } catch (error) {
    console.error('❌ NETWORK ERROR!');
    console.error('');
    console.error('Error details:');
    console.error(error.message);
    console.error('');
    console.error('💡 Troubleshooting:');
    console.error('   1. Check your internet connection');
    console.error('   2. Verify the Google Apps Script URL is accessible');
    console.error('   3. Check for CORS or network firewall issues');
    process.exit(1);
  }
}

// Run the test
testGoogleSheetsIntegration();

