import fetch from 'node-fetch';

async function testMCP() {
  const baseUrl = 'http://localhost:3000/api/mcp';
  
  console.log('\x1b[36m%s\x1b[0m', '--- 1. Testing MCP tools/list ---');
  try {
    const listResponse = await fetch(baseUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        jsonrpc: '2.0',
        id: 1,
        method: 'tools/list',
        params: {}
      })
    });
    const listData = await listResponse.json();
    console.log(JSON.stringify(listData, null, 2));
    
    // Check if _meta exists for book_appointment
    const bookTool = listData.result.tools.find(t => t.name === 'book_appointment');
    if (bookTool?._meta?.['openai/outputTemplate']) {
      console.log('\x1b[32m%s\x1b[0m', '✓ Found OpenAI Apps SDK metadata in tool definition');
    }
  } catch (error) {
    console.error('List failed:', error.message);
  }

  console.log('\n\x1b[36m%s\x1b[0m', '--- 2. Testing MCP tools/call (book_appointment) ---');
  try {
    const callResponse = await fetch(baseUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        jsonrpc: '2.0',
        id: 2,
        method: 'tools/call',
        params: {
          name: 'book_appointment',
          arguments: { patientName: 'Test Patient', service: 'Brain Surgery' }
        }
      })
    });
    const callData = await callResponse.json();
    console.log(JSON.stringify(callData, null, 2));
    
    if (callData.result._meta?.['openai/outputTemplate'] === 'ui://widget/appointment-booking.html') {
      console.log('\x1b[32m%s\x1b[0m', '✓ Response contains correct widget reference');
    }
  } catch (error) {
    console.error('Call failed:', error.message);
  }

  console.log('\n\x1b[36m%s\x1b[0m', '--- 3. Testing MCP tools/call (submit_appointment) ---');
  try {
    const callResponse = await fetch(baseUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        jsonrpc: '2.0',
        id: 3,
        method: 'tools/call',
        params: {
          name: 'submit_appointment',
          arguments: { 
            patientName: 'Test Patient', 
            phone: '1234567890',
            appointmentDate: '2026-02-01',
            appointmentTime: '10:00 AM',
            reason: 'Testing the new MCP submission tool.'
          }
        }
      })
    });
    const callData = await callResponse.json();
    console.log(JSON.stringify(callData, null, 2));
  } catch (error) {
    console.error('Call failed:', error.message);
  }

  console.log('\n\x1b[36m%s\x1b[0m', '--- 4. Testing MCP tools/call (check_site_health) ---');
  try {
    const callResponse = await fetch(baseUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        jsonrpc: '2.0',
        id: 4,
        method: 'tools/call',
        params: {
          name: 'check_site_health',
          arguments: {}
        }
      })
    });
    const callData = await callResponse.json();
    console.log(JSON.stringify(callData, null, 2));
  } catch (error) {
    console.error('Call failed:', error.message);
  }
}

testMCP();
