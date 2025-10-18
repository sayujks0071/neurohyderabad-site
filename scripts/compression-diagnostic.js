#!/usr/bin/env node

const https = require('https');

function analyzeCompressionIssue(headers, bodyInfo) {
  const analysis = {
    issue: 'Content-Encoding Header/Body Mismatch',
    problems: [],
    solutions: [],
    recommendations: []
  };

  // Check for the specific issue
  const contentEncoding = headers['content-encoding'];
  const server = headers['server'];
  const cacheStatus = headers['x-vercel-cache'];

  console.log('\n🔍 COMPRESSION DIAGNOSTIC ANALYSIS');
  console.log('=' .repeat(50));

  // Problem 1: Dual encoding advertisement
  if (contentEncoding && contentEncoding.includes('gzip, br')) {
    analysis.problems.push('❌ Server advertises BOTH gzip AND brotli compression');
    analysis.solutions.push('✅ Configure server to advertise only ONE compression method');
  }

  // Problem 2: Cache serving old version
  if (cacheStatus === 'HIT') {
    analysis.problems.push('❌ Vercel cache is serving old version (HIT)');
    analysis.solutions.push('✅ Wait for cache to clear or force cache invalidation');
  }

  // Problem 3: Vercel + Next.js compression conflict
  if (server === 'Vercel' && contentEncoding) {
    analysis.problems.push('❌ Potential Vercel edge + Next.js compression conflict');
    analysis.solutions.push('✅ Ensure Next.js compress: true matches Vercel edge compression');
  }

  // Problem 4: Body size vs encoding mismatch
  if (contentEncoding && bodyInfo.contentLength > 100000) {
    analysis.problems.push('❌ Large response body with compression headers - potential mismatch');
    analysis.solutions.push('✅ Verify actual compression is applied to response body');
  }

  // Recommendations
  analysis.recommendations = [
    '🔧 Set compress: true in next.config.mjs to match Vercel headers',
    '⏰ Wait 10-15 minutes for Vercel cache to clear after deployment',
    '🧪 Test with: curl -I --compressed https://www.drsayuj.com',
    '🔄 Force cache clear by making a significant code change',
    '📱 Test in Chrome/Comet after cache clears'
  ];

  return analysis;
}

async function getWebsiteDiagnostics() {
  const url = 'https://www.drsayuj.com';
  
  return new Promise((resolve, reject) => {
    const startTime = Date.now();
    
    const options = {
      headers: {
        'Accept-Encoding': 'gzip, br',
        'User-Agent': 'Compression-Diagnostic/1.0'
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
          bodyInfo
        });
      });
    }).on('error', (err) => {
      reject(err);
    });
  });
}

async function main() {
  console.log('🔍 Gathering website compression diagnostics...');
  
  try {
    const diagnostics = await getWebsiteDiagnostics();
    
    console.log('\n📊 CURRENT STATUS:');
    console.log(`   Status Code: ${diagnostics.statusCode}`);
    console.log(`   Content-Encoding: ${diagnostics.headers['content-encoding']}`);
    console.log(`   Cache Status: ${diagnostics.headers['x-vercel-cache']}`);
    console.log(`   ETag: ${diagnostics.headers['etag']}`);
    console.log(`   Server: ${diagnostics.headers['server']}`);
    console.log(`   Response Time: ${diagnostics.bodyInfo.responseTime}ms`);
    console.log(`   Content Length: ${diagnostics.bodyInfo.contentLength} bytes`);
    
    const analysis = analyzeCompressionIssue(diagnostics.headers, diagnostics.bodyInfo);
    
    console.log(`\n🚨 IDENTIFIED PROBLEMS:`);
    analysis.problems.forEach(problem => console.log(`   ${problem}`));
    
    console.log(`\n💡 SOLUTIONS:`);
    analysis.solutions.forEach(solution => console.log(`   ${solution}`));
    
    console.log(`\n📋 RECOMMENDATIONS:`);
    analysis.recommendations.forEach(rec => console.log(`   ${rec}`));
    
    console.log('\n🎯 NEXT STEPS:');
    console.log('   1. Wait for Vercel cache to clear (check x-vercel-cache: MISS)');
    console.log('   2. Test: curl -I --compressed https://www.drsayuj.com');
    console.log('   3. If still failing, force cache clear with code change');
    console.log('   4. Test in Chrome/Comet browsers after cache clears');
    
  } catch (error) {
    console.error('❌ Diagnostic Error:', error);
  }
}

if (require.main === module) {
  main();
}

module.exports = { getWebsiteDiagnostics, analyzeCompressionIssue };
















