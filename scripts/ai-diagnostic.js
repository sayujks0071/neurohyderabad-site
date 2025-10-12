#!/usr/bin/env node

const https = require('https');

async function getWebsiteDiagnostics() {
  const url = 'https://www.drsayuj.com';
  
  return new Promise((resolve, reject) => {
    const startTime = Date.now();
    
    const options = {
      headers: {
        'Accept-Encoding': 'gzip, br',
        'User-Agent': 'AI-Diagnostic-Tool/1.0'
      }
    };

    https.get(url, options, (res) => {
      let data = '';
      let bodyInfo = {};

      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('end', () => {
        const endTime = Date.now();
        const responseTime = endTime - startTime;

        // Analyze the response
        bodyInfo = {
          contentLength: data.length,
          responseTime,
          isCompressed: res.headers['content-encoding'] ? true : false,
          actualEncoding: res.headers['content-encoding'] || 'none',
          contentType: res.headers['content-type'],
          server: res.headers['server'],
          cacheStatus: res.headers['x-vercel-cache'],
          etag: res.headers['etag']
        };

        resolve({
          statusCode: res.statusCode,
          headers: res.headers,
          bodyInfo,
          issue: 'Website shows ERR_CONTENT_DECODING_FAILED in Chrome/Comet but works in Safari. Content-encoding header advertises compression but body appears uncompressed.'
        });
      });
    }).on('error', (err) => {
      reject(err);
    });
  });
}

async function sendToAI(diagnosticData) {
  try {
    const response = await fetch('http://localhost:3000/api/ai-diagnostic', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(diagnosticData)
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Error calling AI diagnostic:', error);
    return { error: error.message };
  }
}

async function main() {
  console.log('🔍 Gathering website diagnostics...');
  
  try {
    const diagnostics = await getWebsiteDiagnostics();
    console.log('📊 Diagnostic data collected:');
    console.log(`   Status: ${diagnostics.statusCode}`);
    console.log(`   Content-Encoding: ${diagnostics.headers['content-encoding']}`);
    console.log(`   Cache Status: ${diagnostics.headers['x-vercel-cache']}`);
    console.log(`   ETag: ${diagnostics.headers['etag']}`);
    console.log(`   Response Time: ${diagnostics.bodyInfo.responseTime}ms`);
    console.log(`   Content Length: ${diagnostics.bodyInfo.contentLength} bytes`);
    
    console.log('\n🤖 Sending to AI for analysis...');
    const aiResult = await sendToAI(diagnostics);
    
    if (aiResult.error) {
      console.error('❌ AI Analysis Error:', aiResult.error);
      return;
    }
    
    console.log('\n🧠 AI Analysis:');
    console.log('=' .repeat(50));
    console.log(aiResult.analysis);
    console.log('=' .repeat(50));
    
  } catch (error) {
    console.error('❌ Diagnostic Error:', error);
  }
}

// Check if we're running this script directly
if (require.main === module) {
  main();
}

module.exports = { getWebsiteDiagnostics, sendToAI };











