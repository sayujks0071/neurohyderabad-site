import fetch from 'node-fetch';

async function testMCP() {
  const baseUrl = 'http://localhost:3000/api/mcp';
  
  console.log('--- Testing MCP tools/list ---');
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
  } catch (error) {
    console.error('List failed (is server running?):', error.message);
  }

  console.log('\n--- Testing MCP tools/call (get_medical_info) ---');
  try {
    const callResponse = await fetch(baseUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        jsonrpc: '2.0',
        id: 2,
        method: 'tools/call',
        params: {
          name: 'get_medical_info',
          arguments: { query: 'brain tumor treatment' }
        }
      })
    });
    const callData = await callResponse.json();
    console.log(JSON.stringify(callData, null, 2));
  } catch (error) {
    console.error('Call failed (is server running?):', error.message);
  }
}

testMCP();
