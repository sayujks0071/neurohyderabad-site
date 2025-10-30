#!/usr/bin/env node

/**
 * Deployment Verification Script
 * Checks if critical pages are accessible after deployment
 */

const https = require('https');
const { execSync } = require('child_process');

const SITE_URL = 'https://www.drsayuj.info';
const CRITICAL_PAGES = [
  '/about',
  '/patient-stories',
  '/services/endoscopic-spine-surgery-hyderabad',
  '/services/brain-tumor-surgery-hyderabad'
];

function checkPage(url) {
  return new Promise((resolve) => {
    https.get(url, { 
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; DeploymentVerifier/1.0)'
      },
      timeout: 10000
    }, (res) => {
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => {
        const status = res.statusCode;
        const hasContent = data.length > 1000; // Reasonable content length
        const hasError = data.includes('404') || data.includes('Error') || data.includes('Not Found');
        resolve({
          url,
          status,
          accessible: status === 200 && hasContent && !hasError,
          contentLength: data.length,
          hasError
        });
      });
    }).on('error', (err) => {
      resolve({
        url,
        status: 0,
        accessible: false,
        error: err.message
      });
    }).on('timeout', () => {
      resolve({
        url,
        status: 0,
        accessible: false,
        error: 'Timeout'
      });
    });
  });
}

async function verifyDeployment() {
  console.log('🔍 Verifying deployment for:', SITE_URL);
  console.log('Checking critical pages...\n');

  const results = await Promise.all(
    CRITICAL_PAGES.map(page => checkPage(`${SITE_URL}${page}`))
  );

  console.log('Results:');
  console.log('─'.repeat(60));
  
  let allAccessible = true;
  results.forEach((result) => {
    const status = result.accessible ? '✅' : '❌';
    console.log(`${status} ${result.url}`);
    console.log(`   Status: ${result.status || 'N/A'}`);
    if (result.error) {
      console.log(`   Error: ${result.error}`);
    } else {
      console.log(`   Content Length: ${result.contentLength} bytes`);
      if (result.hasError) {
        console.log(`   ⚠️  Page contains error indicators`);
      }
    }
    console.log('');
    
    if (!result.accessible) {
      allAccessible = false;
    }
  });

  console.log('─'.repeat(60));
  if (allAccessible) {
    console.log('✅ All critical pages are accessible!');
    process.exit(0);
  } else {
    console.log('❌ Some pages are not accessible. Please check deployment logs.');
    process.exit(1);
  }
}

verifyDeployment();

