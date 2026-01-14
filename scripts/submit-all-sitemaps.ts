/**
 * Submit Multiple Sitemaps to Google Search Console
 * 
 * This script submits all sitemaps for a property with proper rate limiting
 * to respect Google's API quotas (20 QPS, 200 QPM).
 * 
 * Usage:
 *   npx tsx scripts/submit-all-sitemaps.ts
 * 
 * Environment Variables:
 *   GOOGLE_INDEXING_KEY_JSON  (Required) Service Account JSON credentials
 *   SITE_URL                  (Optional) Base URL (default: https://www.drsayuj.info)
 *   GSC_SITE_URL              (Optional) Exact GSC property identifier
 */

// Load environment variables from .env.local if it exists
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

// Rate limiting: 20 QPS = 0.05s delay, but use 0.1s for safety margin
const DELAY_BETWEEN_SUBMISSIONS_MS = 100; // 0.1 seconds = 10 QPS (well below 20 QPS limit)

interface SitemapConfig {
  path: string;
  description: string;
}

// Default sitemaps for the site
const DEFAULT_SITEMAPS: SitemapConfig[] = [
  { path: '/sitemap.xml', description: 'Main sitemap' },
  { path: '/sitemap-blog.xml', description: 'Blog posts sitemap' },
  { path: '/sitemap-services.xml', description: 'Services sitemap' },
  { path: '/sitemap-conditions.xml', description: 'Conditions sitemap' },
  { path: '/sitemap-locations.xml', description: 'Locations sitemap' },
  { path: '/sitemap-images.xml', description: 'Images sitemap' },
  { path: '/sitemap-videos.xml', description: 'Videos sitemap' },
];

/**
 * Sleep utility for rate limiting
 */
function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Get authenticated Google Auth client
 */
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
    scopes: ['https://www.googleapis.com/auth/webmasters'],
  });

  return auth;
}

/**
 * Submit a single sitemap with error handling
 */
async function submitSitemap(
  searchConsole: any,
  siteUrl: string,
  sitemapUrl: string,
  description: string
): Promise<{ success: boolean; error?: string }> {
  try {
    const res = await searchConsole.sitemaps.submit({
      siteUrl: siteUrl,
      feedpath: sitemapUrl,
    });

    if (res.status === 204 || res.status === 200) {
      console.log(`  ✅ ${description}: ${sitemapUrl}`);
      return { success: true };
    } else {
      console.warn(`  ⚠️  ${description}: Unexpected status ${res.status}`);
      return { success: true }; // Still consider it successful if no error thrown
    }
  } catch (error: any) {
    if (error.response) {
      const statusCode = error.response.status;
      // Don't fail completely on 404 - sitemap might not exist yet
      if (statusCode === 404) {
        console.log(`  ⏭️  ${description}: Not found (may not exist yet)`);
        return { success: false, error: 'Not found' };
      }
      console.error(`  ❌ ${description}: HTTP ${statusCode} - ${error.response.data?.error?.message || error.message}`);
    } else {
      console.error(`  ❌ ${description}: ${error.message}`);
    }
    return { success: false, error: error.message };
  }
}

/**
 * Main function to submit all sitemaps
 */
async function submitAllSitemaps() {
  const siteUrl = process.env.SITE_URL || 'https://www.drsayuj.info';
  const formattedSiteUrl = siteUrl.replace(/\/$/, '');
  const targetSiteUrl = process.env.GSC_SITE_URL || formattedSiteUrl;

  // Allow custom sitemaps via environment variable (comma-separated)
  const customSitemaps = process.env.SITEMAPS
    ? process.env.SITEMAPS.split(',').map(path => ({
        path: path.trim(),
        description: `Custom sitemap: ${path.trim()}`,
      }))
    : [];

  const sitemapsToSubmit = customSitemaps.length > 0 ? customSitemaps : DEFAULT_SITEMAPS;

  console.log('🚀 Starting batch sitemap submission\n');
  console.log(`📋 Property: ${targetSiteUrl}`);
  console.log(`📊 Sitemaps to submit: ${sitemapsToSubmit.length}\n`);

  try {
    console.log('🔐 Authenticating with Google...');
    const auth = await getAuthClient();
    const searchConsole = google.webmasters({ version: 'v3', auth });
    console.log('✅ Authentication successful\n');

    const results = {
      successful: 0,
      failed: 0,
      skipped: 0,
    };

    // Submit each sitemap with rate limiting
    for (let i = 0; i < sitemapsToSubmit.length; i++) {
      const sitemap = sitemapsToSubmit[i];
      const fullUrl = `${formattedSiteUrl}${sitemap.path}`;

      console.log(`[${i + 1}/${sitemapsToSubmit.length}] Submitting: ${sitemap.path}`);

      const result = await submitSitemap(
        searchConsole,
        targetSiteUrl,
        fullUrl,
        sitemap.description
      );

      if (result.success) {
        results.successful++;
      } else if (result.error === 'Not found') {
        results.skipped++;
      } else {
        results.failed++;
      }

      // Rate limiting: wait before next submission (except for the last one)
      if (i < sitemapsToSubmit.length - 1) {
        await sleep(DELAY_BETWEEN_SUBMISSIONS_MS);
      }
    }

    // Summary
    console.log('\n' + '='.repeat(50));
    console.log('📊 Submission Summary:');
    console.log(`   ✅ Successful: ${results.successful}`);
    console.log(`   ⏭️  Skipped (not found): ${results.skipped}`);
    console.log(`   ❌ Failed: ${results.failed}`);
    console.log('='.repeat(50));

    if (results.failed > 0) {
      console.log('\n⚠️  Some sitemaps failed to submit. Check the errors above.');
      process.exit(1);
    } else {
      console.log('\n✅ All sitemaps submitted successfully!');
      console.log('   Note: Submissions are queued for processing. Check GSC for status.');
    }
  } catch (error: any) {
    console.error('\n❌ Fatal error:', error.message);
    process.exit(1);
  }
}

// Run if executed directly
if (require.main === module) {
  submitAllSitemaps().catch(console.error);
}

export { submitAllSitemaps };
