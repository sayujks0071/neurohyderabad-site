#!/usr/bin/env tsx
/**
 * Submit sitemap and index priority URLs
 * 
 * Usage:
 *   tsx scripts/submit-sitemap-and-index.ts
 *   tsx scripts/submit-sitemap-and-index.ts --index-only
 *   tsx scripts/submit-sitemap-and-index.ts --sitemap-only
 */

const SITE_URL = 'https://www.drsayuj.info';
const API_URL = `${SITE_URL}/api/search-console`;

async function submitSitemap() {
  console.log('📤 Submitting sitemap to Google Search Console...');
  
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        action: 'submit_sitemap',
        sitemap: `${SITE_URL}/sitemap.xml`,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`❌ HTTP ${response.status}: ${errorText}`);
      process.exit(1);
    }

    const result = await response.json();
    
    if (result.success) {
      console.log('✅ Sitemap submitted successfully!');
      console.log(`   Status: ${result.status}`);
      if (result.message) {
        console.log(`   Message: ${result.message}`);
      }
    } else {
      const errorMsg = result.error || result.message || 'Unknown error';
      console.error('❌ Sitemap submission failed:', errorMsg);
      if (result.details) {
        console.error('   Details:', JSON.stringify(result.details, null, 2));
      }
      if (errorMsg.includes('GOOGLE_INDEXING_KEY_JSON') || errorMsg.includes('credentials')) {
        console.error('\n⚠️  Note: GOOGLE_INDEXING_KEY_JSON must be set in Vercel environment variables');
        console.error('   The API endpoint is working, but Google credentials are required for actual submission.');
      }
      process.exit(1);
    }
  } catch (error: any) {
    console.error('❌ Error submitting sitemap:', error.message || error);
    if (error.message?.includes('fetch')) {
      console.error('   Check your internet connection and that the API endpoint is accessible');
    }
    process.exit(1);
  }
}

async function indexPriorityUrls() {
  console.log('📇 Indexing priority URLs...');
  
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        action: 'index_priority_urls',
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`❌ HTTP ${response.status}: ${errorText}`);
      process.exit(1);
    }

    const result = await response.json();
    
    if (result.success) {
      console.log(`✅ Successfully indexed ${result.results?.length || 0} URLs`);
      if (result.message) {
        console.log(`   ${result.message}`);
      }
      if (result.errors && result.errors.length > 0) {
        console.warn(`⚠️  ${result.errors.length} errors occurred:`);
        result.errors.forEach((err: any) => {
          console.warn(`   - ${err.url}: ${err.error}`);
        });
      }
    } else {
      const errorMsg = result.error || result.message || 'Unknown error';
      console.error('❌ URL indexing failed:', errorMsg);
      if (result.details) {
        console.error('   Details:', JSON.stringify(result.details, null, 2));
      }
      if (errorMsg.includes('GOOGLE_INDEXING_KEY_JSON') || errorMsg.includes('credentials')) {
        console.error('\n⚠️  Note: GOOGLE_INDEXING_KEY_JSON must be set in Vercel environment variables');
        console.error('   The API endpoint is working, but Google credentials are required for actual indexing.');
      }
      process.exit(1);
    }
  } catch (error: any) {
    console.error('❌ Error indexing URLs:', error.message || error);
    if (error.message?.includes('fetch')) {
      console.error('   Check your internet connection and that the API endpoint is accessible');
    }
    process.exit(1);
  }
}

async function main() {
  const args = process.argv.slice(2);
  const indexOnly = args.includes('--index-only');
  const sitemapOnly = args.includes('--sitemap-only');

  if (sitemapOnly) {
    await submitSitemap();
  } else if (indexOnly) {
    await indexPriorityUrls();
  } else {
    // Do both
    await submitSitemap();
    console.log('');
    await indexPriorityUrls();
  }

  console.log('\n✅ Complete!');
}

main().catch(console.error);
