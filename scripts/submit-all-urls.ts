#!/usr/bin/env tsx
/**
 * Submit ALL URLs from all sitemaps to Google Indexing API
 * Extracts URLs from all sitemaps and submits them in batches
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

const SITE_URL = (process.env.SITE_URL || 'https://www.drsayuj.info').replace(/\/$/, '');
const DAILY_QUOTA = 200;
const DELAY_MS = 100; // 100ms delay between requests

// All sitemaps to extract URLs from
const SITEMAPS = [
  '/sitemap-main.xml',
  '/sitemap-blog.xml',
  '/sitemap-services.xml',
  '/sitemap-conditions.xml',
  '/sitemap-locations.xml',
  '/sitemap-images.xml',
  '/sitemap-videos.xml',
];

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

function extractLocs(xml: string): string[] {
  const matches = [...xml.matchAll(/<loc>(.*?)<\/loc>/g)];
  return matches.map(match => match[1].trim()).filter(Boolean);
}

async function fetchText(url: string): Promise<string> {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Failed to fetch ${url}: ${res.status}`);
  }
  return res.text();
}

async function getSitemapUrls(sitemapUrl: string): Promise<string[]> {
  try {
    const xml = await fetchText(sitemapUrl);
    const locs = extractLocs(xml);
    
    // Check if this is a sitemap index (contains nested sitemaps)
    if (xml.includes('<sitemapindex')) {
      const nestedResults = await Promise.all(
        locs.map(async loc => {
          try {
            return await getSitemapUrls(loc);
          } catch (error) {
            console.warn(`   ⚠️  Failed to fetch nested sitemap: ${loc}`);
            return [];
          }
        })
      );
      return nestedResults.flat();
    }
    
    return locs;
  } catch (error: any) {
    console.warn(`   ⚠️  Failed to fetch sitemap ${sitemapUrl}: ${error.message}`);
    return [];
  }
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

async function sleep(ms: number) {
  await new Promise(resolve => setTimeout(resolve, ms));
}

async function main() {
  const args = process.argv.slice(2);
  const limit = args.includes('--limit') 
    ? parseInt(args[args.indexOf('--limit') + 1]) || DAILY_QUOTA
    : DAILY_QUOTA;
  const dryRun = args.includes('--dry-run');

  console.log('🚀 Starting comprehensive URL submission\n');
  console.log(`📋 Fetching URLs from ${SITEMAPS.length} sitemaps...\n`);

  // Extract all URLs from all sitemaps
  const allUrls: string[] = [];
  
  for (const sitemapPath of SITEMAPS) {
    const sitemapUrl = `${SITE_URL}${sitemapPath}`;
    console.log(`📄 Processing: ${sitemapPath}`);
    
    try {
      const urls = await getSitemapUrls(sitemapUrl);
      console.log(`   ✅ Found ${urls.length} URLs`);
      allUrls.push(...urls);
    } catch (error: any) {
      console.error(`   ❌ Error: ${error.message}`);
    }
  }

  // Remove duplicates and sort
  const uniqueUrls = Array.from(new Set(allUrls)).sort();
  
  console.log(`\n📊 Total unique URLs: ${uniqueUrls.length}`);
  console.log(`📈 Daily quota: ${limit} URLs`);
  console.log(`⏱️  Delay between requests: ${DELAY_MS}ms`);
  
  if (dryRun) {
    console.log(`\n🔍 DRY RUN MODE - No URLs will be submitted\n`);
    console.log('URLs that would be submitted:');
    uniqueUrls.slice(0, limit).forEach((url, i) => {
      console.log(`  ${i + 1}. ${url}`);
    });
    return;
  }

  const urlsToIndex = uniqueUrls.slice(0, Math.min(limit, uniqueUrls.length));
  
  if (uniqueUrls.length > limit) {
    console.warn(`\n⚠️  Warning: Only submitting first ${limit} URLs to respect daily quota`);
    console.warn(`   Remaining ${uniqueUrls.length - limit} URLs will need to be submitted in subsequent runs\n`);
  }

  console.log(`\n🔐 Authenticating with Google...`);
  const auth = await getAuthClient();
  console.log(`✅ Authentication successful\n`);

  let successCount = 0;
  let errorCount = 0;
  const errors: Array<{ url: string; error: string }> = [];

  for (let i = 0; i < urlsToIndex.length; i++) {
    const url = urlsToIndex[i];
    const progress = `[${i + 1}/${urlsToIndex.length}]`;

    try {
      process.stdout.write(`${progress} Submitting: ${url}... `);
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
        await sleep(DELAY_MS);
      }
    } catch (error: any) {
      console.log('❌');
      errorCount++;
      const errorMsg = error.response?.data?.error?.message || error.message;
      errors.push({ url, error: errorMsg });
      console.error(`   Error: ${errorMsg}`);
      
      // If rate limited, wait longer before continuing
      if (error.response?.status === 429) {
        console.log(`   ⏱️  Waiting 60 seconds before continuing...`);
        await sleep(60000);
      }
    }
  }

  console.log('\n' + '='.repeat(60));
  console.log('📊 Submission Summary:');
  console.log(`   ✅ Successful: ${successCount}`);
  console.log(`   ❌ Failed: ${errorCount}`);
  console.log(`   📈 Success rate: ${((successCount / urlsToIndex.length) * 100).toFixed(1)}%`);
  console.log('='.repeat(60));

  if (errors.length > 0) {
    console.log('\n❌ Errors:');
    errors.slice(0, 10).forEach(({ url, error }) => {
      console.log(`   - ${url}`);
      console.log(`     ${error}`);
    });
    if (errors.length > 10) {
      console.log(`   ... and ${errors.length - 10} more errors`);
    }
  }

  const remainingQuota = limit - successCount;
  const remainingUrls = uniqueUrls.length - urlsToIndex.length;
  
  if (remainingUrls > 0) {
    console.log(`\n💡 Remaining URLs to submit: ${remainingUrls}`);
    console.log(`   Run this script again tomorrow to submit the next batch`);
  }
  
  if (remainingQuota > 0 && remainingUrls === 0) {
    console.log(`\n💡 Remaining daily quota: ~${remainingQuota} URLs`);
  } else if (remainingQuota === 0) {
    console.log(`\n⚠️  Daily quota limit reached (${limit} URLs)`);
  }
}

main().catch(error => {
  console.error('❌ Fatal error:', error.message);
  process.exit(1);
});
