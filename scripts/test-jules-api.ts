/**
 * Test script for Google Jules API
 * 
 * This is a simplified test to verify the API connection works.
 * 
 * Usage:
 *   JULES_API_TOKEN=your_token npx tsx scripts/test-jules-api.ts
 *   or
 *   GOOGLE_JULES_API_TOKEN=your_token npx tsx scripts/test-jules-api.ts
 */

const JULES_API_TOKEN = process.env.JULES_API_TOKEN || process.env.GOOGLE_JULES_API_TOKEN;

if (!JULES_API_TOKEN) {
  console.error('❌ Error: JULES_API_TOKEN or GOOGLE_JULES_API_TOKEN environment variable is required');
  console.error('\nUsage:');
  console.error('  JULES_API_TOKEN=your_token npx tsx scripts/test-jules-api.ts');
  console.error('  or');
  console.error('  GOOGLE_JULES_API_TOKEN=your_token npx tsx scripts/test-jules-api.ts');
  process.exit(1);
}

async function testJulesAPI() {
  console.log('🧪 Testing Google Jules API Connection\n');
  console.log(`📝 Token: ${JULES_API_TOKEN.substring(0, 10)}...${JULES_API_TOKEN.substring(JULES_API_TOKEN.length - 4)}\n`);

  // Jules API uses Google Cloud API format
  const baseUrl = process.env.JULES_API_URL || 'https://jules.googleapis.com';
  const apiVersion = '/v1alpha';
  const sessionsEndpoint = `${baseUrl}${apiVersion}/sessions`;
  const sourcesEndpoint = `${baseUrl}${apiVersion}/sources`;

  console.log(`🔗 Testing Jules API endpoints...\n`);

  // Test 1: List sources (simpler endpoint to test auth)
  // Try both API key and OAuth token methods
  const authMethods = [
    { name: 'API Key (X-Goog-Api-Key)', header: 'X-Goog-Api-Key' },
    { name: 'OAuth Token (Authorization)', header: 'Authorization', value: `Bearer ${JULES_API_TOKEN}` },
  ];

  for (const authMethod of authMethods) {
    try {
      console.log(`📡 Test 1: Listing sources with ${authMethod.name} (${sourcesEndpoint})`);
      
      const headers: Record<string, string> = {
        'Content-Type': 'application/json',
        'User-Agent': 'neurohyderabad-site-test/1.0',
      };
      
      if (authMethod.header === 'X-Goog-Api-Key') {
        headers['X-Goog-Api-Key'] = JULES_API_TOKEN;
      } else {
        headers['Authorization'] = authMethod.value!;
      }
      
      const response = await fetch(sourcesEndpoint, {
        method: 'GET',
        headers,
      });

      console.log(`   Status: ${response.status} ${response.statusText}`);

      if (!response.ok) {
        const errorText = await response.text();
        console.log(`   ❌ Error: ${errorText.substring(0, 200)}`);
        console.log('');
        continue; // Try next auth method
      } else {
        const result = await response.json();
        console.log('   ✅ Success! API responded:');
        console.log(`   Response keys: ${Object.keys(result).join(', ')}`);
        
        if (result.sources) {
          console.log(`   Found ${result.sources.length} source(s)`);
        }
        
        console.log(`\n✅ Jules API connection test PASSED with ${authMethod.name}!`);
        console.log(`✅ Working endpoint: ${sourcesEndpoint}\n`);
        return;
      }
    } catch (error) {
      console.log(`   ❌ Error: ${error instanceof Error ? error.message : String(error)}`);
      console.log('');
      continue; // Try next auth method
    }
  }

  // Test 2: Create a test session (try with OAuth token)
  try {
    console.log(`\n📡 Test 2: Creating test session with OAuth token (${sessionsEndpoint})`);
    
    const testPrompt = `Test connection for neurohyderabad-site repository. 
This is a simple test to verify the API is working.
Repository: sayujks0071/neurohyderabad-site
Branch: main`;

    const response = await fetch(sessionsEndpoint, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${JULES_API_TOKEN}`,
        'Content-Type': 'application/json',
        'User-Agent': 'neurohyderabad-site-test/1.0',
      },
      body: JSON.stringify({
        prompt: testPrompt,
        sourceContext: {
          source: 'sources/github-sayujks0071-neurohyderabad-site',
          githubRepoContext: {
            startingBranch: 'main',
          },
        },
        title: 'API Connection Test',
        requirePlanApproval: false, // Don't require approval for test
      }),
    });

    console.log(`   Status: ${response.status} ${response.statusText}`);

    if (!response.ok) {
      const errorText = await response.text();
      console.log(`   ❌ Error: ${errorText.substring(0, 300)}`);
    } else {
      const result = await response.json();
      console.log('   ✅ Success! Session created:');
      console.log(`   Session ID: ${result.name || result.id || 'N/A'}`);
      console.log(`   Response keys: ${Object.keys(result).join(', ')}`);
      
      if (result.state) {
        console.log(`   State: ${result.state}`);
      }

      console.log('\n✅ Jules API connection test PASSED!');
      console.log(`✅ Working endpoint: ${sessionsEndpoint}\n`);
      return;
    }
  } catch (error) {
    console.log(`   ❌ Error: ${error instanceof Error ? error.message : String(error)}`);
  }
  
  console.error('❌ All API endpoints failed. Please check:');
  console.error('   1. JULES_API_TOKEN is correct');
  console.error('   2. JULES_API_URL is set correctly (if using custom endpoint)');
  console.error('   3. Network connectivity');
  console.error('   4. API endpoint URL is correct');
  console.error('\n💡 Tip: Check the Jules API documentation for the correct endpoint URL');
  process.exit(1);
}

testJulesAPI().catch((error) => {
  console.error('❌ Unexpected error:', error);
  process.exit(1);
});
