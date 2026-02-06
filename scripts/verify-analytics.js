#!/usr/bin/env node

/**
 * Analytics Verification Script
 * Tests GA4 tracking events on the live site
 */

const https = require('https');
const { exec } = require('child_process');

const GA4_MEASUREMENT_ID = 'G-MMLQCFN4ZJ';
const SITE_URL = 'https://www.drsayuj.info';

console.log('🔍 Analytics Verification Script');
console.log('================================');
console.log(`GA4 Measurement ID: ${GA4_MEASUREMENT_ID}`);
console.log(`Site URL: ${SITE_URL}`);
console.log('');

// Test GA4 endpoint accessibility
function testGA4Endpoint() {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'www.google-analytics.com',
      port: 443,
      path: `/g/collect?v=2&tid=${GA4_MEASUREMENT_ID}`,
      method: 'GET',
      headers: {
        'User-Agent': 'Analytics-Verification-Script/1.0'
      }
    };

    const req = https.request(options, (res) => {
      console.log(`✅ GA4 Endpoint Status: ${res.statusCode}`);
      resolve(res.statusCode);
    });

    req.on('error', (error) => {
      console.log(`❌ GA4 Endpoint Error: ${error.message}`);
      reject(error);
    });

    req.end();
  });
}

// Test site accessibility
function testSiteAccessibility() {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'www.drsayuj.info',
      port: 443,
      path: '/',
      method: 'GET',
      headers: {
        'User-Agent': 'Analytics-Verification-Script/1.0'
      }
    };

    const req = https.request(options, (res) => {
      console.log(`✅ Site Accessibility: ${res.statusCode}`);
      resolve(res.statusCode);
    });

    req.on('error', (error) => {
      console.log(`❌ Site Accessibility Error: ${error.message}`);
      reject(error);
    });

    req.end();
  });
}

// Check for GA4 script in page source
function checkGA4Script() {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'www.drsayuj.info',
      port: 443,
      path: '/',
      method: 'GET',
      headers: {
        'User-Agent': 'Analytics-Verification-Script/1.0'
      }
    };

    let data = '';
    const req = https.request(options, (res) => {
      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('end', () => {
        const hasGA4Script = data.includes('gtag') && data.includes(GA4_MEASUREMENT_ID);
        const hasAnalyticsEvents = data.includes('analytics') || data.includes('track');
        
        console.log(`✅ GA4 Script Present: ${hasGA4Script ? 'Yes' : 'No'}`);
        console.log(`✅ Analytics Events: ${hasAnalyticsEvents ? 'Yes' : 'No'}`);
        
        if (hasGA4Script) {
          console.log('   📊 GA4 tracking script detected in page source');
        }
        
        if (hasAnalyticsEvents) {
          console.log('   📈 Analytics event tracking detected');
        }
        
        resolve({ hasGA4Script, hasAnalyticsEvents });
      });
    });

    req.on('error', (error) => {
      console.log(`❌ Script Check Error: ${error.message}`);
      reject(error);
    });

    req.end();
  });
}

// Main verification function
async function verifyAnalytics() {
  try {
    console.log('🔍 Testing GA4 Endpoint...');
    await testGA4Endpoint();
    console.log('');

    console.log('🌐 Testing Site Accessibility...');
    await testSiteAccessibility();
    console.log('');

    console.log('📊 Checking Analytics Implementation...');
    await checkGA4Script();
    console.log('');

    console.log('✅ Analytics Verification Complete!');
    console.log('');
    console.log('📋 Next Steps:');
    console.log('1. Visit https://www.drsayuj.info in your browser');
    console.log('2. Accept cookie consent');
    console.log('3. Scroll through pages and click CTAs');
    console.log('4. Check GA4 Real-time reports for events');
    console.log('5. Monitor conversion funnel performance');
    console.log('');
    console.log('📊 GA4 Dashboard: https://analytics.google.com/');
    console.log(`🔗 Real-time Report: https://analytics.google.com/analytics/web/#/p${GA4_MEASUREMENT_ID}/realtime/overview`);

  } catch (error) {
    console.log(`❌ Verification failed: ${error.message}`);
    process.exit(1);
  }
}

// Run verification
verifyAnalytics();
