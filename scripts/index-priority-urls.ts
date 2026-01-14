#!/usr/bin/env tsx
/**
 * Batch index high-priority URLs via Google Indexing API
 * Respects daily quota of 200 URLs per day
 */

// Load environment variables from .env.local
try {
  const fs = require('fs');
  const path = require('path');
  const envLocalPath = path.join(__dirname, '..', '.env.local');
  if (fs.existsSync(envLocalPath)) {
    const envContent = fs.readFileSync(envLocalPath, 'utf8');
    const lines = envContent.split('\n');
    let currentKey = '';
    let currentValue = '';
    let inQuotedValue = false;
    let quoteChar = '';
    
    for (const line of lines) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith('#')) {
        continue;
      }
      
      const keyMatch = trimmed.match(/^([A-Z_][A-Z0-9_]*)\s*=\s*(.*)$/);
      if (keyMatch) {
        if (currentKey && !process.env[currentKey]) {
          process.env[currentKey] = currentValue.replace(/^["']|["']$/g, '');
        }
        
        currentKey = keyMatch[1];
        const valuePart = keyMatch[2];
        
        if (valuePart.startsWith("'") || valuePart.startsWith('"')) {
          inQuotedValue = true;
          quoteChar = valuePart[0];
          currentValue = valuePart;
          if (valuePart.endsWith(quoteChar) && valuePart.length > 1) {
            inQuotedValue = false;
            currentValue = valuePart.slice(1, -1);
          }
        } else {
          currentValue = valuePart;
          inQuotedValue = false;
        }
      } else if (inQuotedValue && currentKey) {
        currentValue += '\n' + line;
        if (line.trim().endsWith(quoteChar)) {
          inQuotedValue = false;
          currentValue = currentValue.slice(1, -1);
        }
      }
    }
    
    if (currentKey && !process.env[currentKey]) {
      process.env[currentKey] = currentValue.replace(/^["']|["']$/g, '');
    }
  }
} catch (e) {
  // Ignore errors loading .env.local
}

import { google } from 'googleapis';

const SITE_URL = process.env.SITE_URL || 'https://www.drsayuj.info';
const DAILY_QUOTA = 200;
const DELAY_MS = 100; // 100ms delay between requests to avoid rate limiting

async function getAuthClient() {
  const keyJson = process.env.GOOGLE_INDEXING_KEY_JSON;
  if (!keyJson) {
    throw new Error('GOOGLE_INDEXING_KEY_JSON environment variable is missing.');
  }

  let credentials;
  try {
    credentials = JSON.parse(keyJson);
  } catch (e) {
    throw new Error('Failed to parse GOOGLE_INDEXING_KEY_JSON. Ensure it is valid JSON.');
  }

  const auth = new google.auth.GoogleAuth({
    credentials,
    scopes: ['https://www.googleapis.com/auth/indexing'],
  });

  return auth;
}

async function requestIndexing(url: string, auth: any): Promise<boolean> {
  try {
    const indexing = google.indexing({ version: 'v3', auth });

    const res = await indexing.urlNotifications.publish({
      requestBody: {
        url: url,
        type: 'URL_UPDATED',
      },
    });

    return res.status === 200;
  } catch (error: any) {
    if (error.response?.status === 429) {
      console.error(`   ⏱️  Rate limited. Waiting 60 seconds...`);
      await new Promise(resolve => setTimeout(resolve, 60000));
      return requestIndexing(url, auth); // Retry
    }
    throw error;
  }
}

// High-priority URLs to index
const PRIORITY_URLS = [
  // Core pages
  `${SITE_URL}/`,
  `${SITE_URL}/about`,
  `${SITE_URL}/services`,
  `${SITE_URL}/conditions`,
  `${SITE_URL}/locations`,
  `${SITE_URL}/appointments`,
  `${SITE_URL}/contact`,
  `${SITE_URL}/best-neurosurgeon-in-hyderabad`,

  // Top services
  `${SITE_URL}/services/endoscopic-discectomy-hyderabad`,
  `${SITE_URL}/services/brain-tumor-surgery-hyderabad`,
  `${SITE_URL}/services/minimally-invasive-spine-surgery`,
  `${SITE_URL}/services/spinal-fusion-surgery-hyderabad`,
  `${SITE_URL}/services/awake-spine-surgery-hyderabad`,
  `${SITE_URL}/services/epilepsy-surgery-hyderabad`,
  `${SITE_URL}/services/peripheral-nerve-surgery-hyderabad`,

  // Top conditions
  `${SITE_URL}/conditions/sciatica-treatment-hyderabad`,
  `${SITE_URL}/conditions/spinal-stenosis-treatment-hyderabad`,
  `${SITE_URL}/conditions/trigeminal-neuralgia-treatment-hyderabad`,
  `${SITE_URL}/conditions/slip-disc-treatment-hyderabad`,
  `${SITE_URL}/conditions/brain-tumor-surgery-hyderabad`,
  `${SITE_URL}/conditions/cervical-radiculopathy-treatment-hyderabad`,

  // Key locations
  `${SITE_URL}/locations/malakpet`,
  `${SITE_URL}/locations/banjara-hills`,
  `${SITE_URL}/locations/hitech-city`,
  `${SITE_URL}/neurosurgeon-hyderabad`,
  `${SITE_URL}/neurosurgeon-jubilee-hills`,
  `${SITE_URL}/neurosurgeon-banjara-hills`,
];

async function main() {
  const args = process.argv.slice(2);
  const limit = args.includes('--limit') 
    ? parseInt(args[args.indexOf('--limit') + 1]) || DAILY_QUOTA
    : DAILY_QUOTA;

  console.log('🚀 Starting batch URL indexing\n');
  console.log(`📋 Total URLs: ${PRIORITY_URLS.length}`);
  console.log(`📊 Daily quota: ${limit} URLs`);
  console.log(`⏱️  Delay between requests: ${DELAY_MS}ms\n`);

  const urlsToIndex = PRIORITY_URLS.slice(0, Math.min(limit, PRIORITY_URLS.length));
  
  if (urlsToIndex.length > limit) {
    console.warn(`⚠️  Warning: Only indexing first ${limit} URLs to respect daily quota\n`);
  }

  console.log('🔐 Authenticating with Google...');
  const auth = await getAuthClient();
  console.log('✅ Authentication successful\n');

  let successCount = 0;
  let errorCount = 0;
  const errors: Array<{ url: string; error: string }> = [];

  for (let i = 0; i < urlsToIndex.length; i++) {
    const url = urlsToIndex[i];
    const progress = `[${i + 1}/${urlsToIndex.length}]`;

    try {
      process.stdout.write(`${progress} Indexing: ${url}... `);
      const success = await requestIndexing(url, auth);
      
      if (success) {
        console.log('✅');
        successCount++;
      } else {
        console.log('❌ Failed');
        errorCount++;
        errors.push({ url, error: 'Unknown error' });
      }

      // Rate limiting: delay between requests
      if (i < urlsToIndex.length - 1) {
        await new Promise(resolve => setTimeout(resolve, DELAY_MS));
      }
    } catch (error: any) {
      console.log('❌');
      errorCount++;
      const errorMsg = error.response?.data?.error?.message || error.message;
      errors.push({ url, error: errorMsg });
      console.error(`   Error: ${errorMsg}`);
    }
  }

  console.log('\n' + '='.repeat(60));
  console.log('📊 Summary:');
  console.log(`   ✅ Successful: ${successCount}`);
  console.log(`   ❌ Failed: ${errorCount}`);
  console.log(`   📈 Success rate: ${((successCount / urlsToIndex.length) * 100).toFixed(1)}%`);
  console.log('='.repeat(60));

  if (errors.length > 0) {
    console.log('\n❌ Errors:');
    errors.forEach(({ url, error }) => {
      console.log(`   - ${url}`);
      console.log(`     ${error}`);
    });
  }

  const remainingQuota = limit - successCount;
  if (remainingQuota > 0) {
    console.log(`\n💡 Remaining daily quota: ~${remainingQuota} URLs`);
  } else {
    console.log(`\n⚠️  Daily quota limit reached (${limit} URLs)`);
  }
}

main().catch(error => {
  console.error('❌ Fatal error:', error.message);
  process.exit(1);
});
