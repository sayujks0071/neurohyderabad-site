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
// import { AxiosError } from 'axios';

// Define types for command line arguments
interface CliArgs {
  mode: 'sitemap' | 'index' | 'list' | 'status' | 'help';
  url?: string;
  sitemap?: string;
  siteUrl?: string;
}

// Sitemap status interface
interface SitemapStatus {
  path: string;
  type: string;
  lastDownloaded?: string;
  errors?: number;
  warnings?: number;
  contents?: Array<{ type: string; submitted: string }>;
}

// Parse command line arguments
function parseArgs(): CliArgs {
  const args = process.argv.slice(2);

  if (args.includes('--help') || args.includes('-h')) {
    return { mode: 'help' };
  }

  if (args.includes('--sitemap')) {
    const sitemapIndex = args.indexOf('--sitemap');
    const sitemapUrl = args[sitemapIndex + 1];
    return { mode: 'sitemap', sitemap: sitemapUrl };
  }

  if (args.includes('--list')) {
    return { mode: 'list' };
  }

  if (args.includes('--status')) {
    const statusIndex = args.indexOf('--status');
    const sitemapUrl = args[statusIndex + 1];
    return { mode: 'status', sitemap: sitemapUrl };
  }

  const indexFlag = args.indexOf('--index');
  if (indexFlag !== -1 && args[indexFlag + 1]) {
    return { mode: 'index', url: args[indexFlag + 1] };
  }

  return { mode: 'help' };
}

// Helper to get authenticated client
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
    scopes: [
      'https://www.googleapis.com/auth/webmasters', // For Sitemap
      'https://www.googleapis.com/auth/indexing'    // For URL Indexing
    ],
  });

  return auth;
}

/**
 * Submits a sitemap to Google Search Console API
 * Supports multiple sitemaps and includes comprehensive error handling
 */
async function submitSitemap(sitemapUrl?: string) {
  try {
    const siteUrl = process.env.SITE_URL || 'https://www.drsayuj.info';
    // Remove trailing slash if present for consistency
    const formattedSiteUrl = siteUrl.replace(/\/$/, '');
    
    // Support custom sitemap URL or default to main sitemap
    const feedPath = sitemapUrl || `${formattedSiteUrl}/sitemap.xml`;
    
    // Support domain properties (sc-domain:example.com)
    const targetSiteUrl = process.env.GSC_SITE_URL || formattedSiteUrl;

    console.log(`🔐 Authenticating with Google...`);
    const auth = await getAuthClient();
    const searchConsole = google.webmasters({ version: 'v3', auth });

    console.log(`📤 Submitting sitemap: ${feedPath}`);
    console.log(`   Property: ${targetSiteUrl}`);

    const res = await searchConsole.sitemaps.submit({
      siteUrl: targetSiteUrl,
      feedpath: feedPath,
    });

    // A successful request typically returns 204 No Content or 200 OK
    if (res.status === 204 || res.status === 200) {
      console.log(`✅ Sitemap submitted successfully!`);
      console.log(`   Status: ${res.status}`);
      if (res.headers.date) {
        console.log(`   Response Date: ${res.headers.date}`);
      }
      console.log(`   Note: Submission accepted into processing queue. Validation happens asynchronously.`);
    } else {
      console.warn(`⚠️  Unexpected status code: ${res.status}`);
    }
  } catch (error: any) {
    handleHttpError(error, 'sitemap submission');
  }
}

/**
 * Comprehensive error handler for HTTP errors from Google APIs
 */
function handleHttpError(error: any, operation: string) {
  console.error(`❌ Error during ${operation}:`);

  if (error.response) {
    // The server responded with a status code outside the 2xx range
    const statusCode = error.response.status;
    const errorData = error.response.data;

    console.error(`   HTTP Status: ${statusCode}`);

    switch (statusCode) {
      case 403:
        console.error(`   🔒 Permission Denied`);
        console.error(`   Cause: Insufficient permissions or Service Account not added to GSC property.`);
        console.error(`   Action Required:`);
        console.error(`   1. Go to Google Search Console > Settings > Users and permissions`);
        console.error(`   2. Add the Service Account email as 'Owner' or 'Full User'`);
        console.error(`   3. Service Account email format: ...@...iam.gserviceaccount.com`);
        break;
      case 404:
        console.error(`   🔍 Not Found`);
        console.error(`   Cause: Property or sitemap URL not found.`);
        console.error(`   Action Required:`);
        console.error(`   1. Verify the siteUrl matches exactly how it appears in GSC`);
        console.error(`   2. For Domain Properties, use format: sc-domain:example.com`);
        console.error(`   3. Ensure the sitemap URL is accessible and returns valid XML`);
        console.error(`   4. Check that the property exists in Search Console`);
        break;
      case 429:
        console.error(`   ⏱️  Rate Limit Exceeded`);
        console.error(`   Cause: Too many requests sent too quickly.`);
        console.error(`   Limits: 20 QPS, 200 QPM per user`);
        console.error(`   Action Required:`);
        console.error(`   1. Implement rate limiting/throttling in your script`);
        console.error(`   2. Add delays between submissions (e.g., 0.5s)`);
        console.error(`   3. Consider submitting sitemap index instead of individual sitemaps`);
        break;
      case 400:
        console.error(`   📝 Bad Request`);
        console.error(`   Cause: Invalid request parameters.`);
        if (errorData?.error?.message) {
          console.error(`   Details: ${errorData.error.message}`);
        }
        break;
      default:
        console.error(`   Details:`, errorData || error.message);
    }
  } else if (error.request) {
    // The request was made but no response was received (Network Error)
    console.error(`   🌐 Network Error`);
    console.error(`   Cause: No response received from Google servers.`);
    console.error(`   Action: Check your internet connection and try again.`);
  } else {
    // Something happened in setting up the request
    console.error(`   ⚠️  Request Setup Error`);
    console.error(`   Cause: ${error.message}`);
  }

  process.exit(1);
}

async function requestIndexing(url: string) {
  try {
    console.log(`Authenticating with Google...`);
    const auth = await getAuthClient();
    const indexing = google.indexing({ version: 'v3', auth });

    console.log(`Requesting indexing for: ${url}`);

    const res = await indexing.urlNotifications.publish({
      requestBody: {
        url: url,
        type: 'URL_UPDATED',
      },
    });

    console.log(`✅ Indexing request sent! Status: ${res.status}`);
    console.log(res.data);
  } catch (error: any) {
    console.error(`❌ Error requesting indexing:`, error.message);
    process.exit(1);
  }
}

/**
 * Lists all sitemaps submitted for a property
 */
async function listSitemaps() {
  try {
    const siteUrl = process.env.SITE_URL || 'https://www.drsayuj.info';
    const formattedSiteUrl = siteUrl.replace(/\/$/, '');
    const targetSiteUrl = process.env.GSC_SITE_URL || formattedSiteUrl;

    console.log(`🔐 Authenticating with Google...`);
    const auth = await getAuthClient();
    const searchConsole = google.webmasters({ version: 'v3', auth });

    console.log(`📋 Fetching sitemaps for property: ${targetSiteUrl}`);

    const res = await searchConsole.sitemaps.list({
      siteUrl: targetSiteUrl,
    });

    if (res.data.sitemap) {
      console.log(`\n✅ Found ${res.data.sitemap.length} sitemap(s):\n`);
      
      // Sort by errors first, then by path
      const sortedSitemaps = [...res.data.sitemap].sort((a: any, b: any) => {
        const aErrors = a.errors || 0;
        const bErrors = b.errors || 0;
        if (aErrors !== bErrors) return bErrors - aErrors;
        return (a.path || '').localeCompare(b.path || '');
      });
      
      sortedSitemaps.forEach((sitemap: any, index: number) => {
        console.log(`${index + 1}. ${sitemap.path}`);
        console.log(`   Type: ${sitemap.type || 'unknown'}`);
        
        if (sitemap.lastDownloaded) {
          const date = new Date(sitemap.lastDownloaded);
          console.log(`   ✅ Last Downloaded: ${date.toLocaleString()}`);
        } else {
          console.log(`   ⏳ Not yet downloaded`);
        }
        
        if (sitemap.errors !== undefined && sitemap.errors > 0) {
          console.log(`   ❌ Errors: ${sitemap.errors}`);
          // Try to get detailed error info
          if (sitemap.contents) {
            const errorContents = sitemap.contents.filter((c: any) => c.type === 'error');
            if (errorContents.length > 0) {
              console.log(`   Error details:`);
              errorContents.forEach((err: any, i: number) => {
                console.log(`     ${i + 1}. ${err.submitted || 'Unknown error'}`);
              });
            }
          }
        } else if (sitemap.errors === 0) {
          console.log(`   ✅ No errors`);
        }
        
        if (sitemap.warnings !== undefined && sitemap.warnings > 0) {
          console.log(`   ⚠️  Warnings: ${sitemap.warnings}`);
        }
        
        if (sitemap.contents) {
          const validContents = sitemap.contents.filter((c: any) => c.type !== 'error');
          if (validContents.length > 0) {
            console.log(`   📄 Valid URLs: ${validContents.length}`);
          }
        }
        
        console.log('');
      });
      
      // Summary
      const withErrors = res.data.sitemap.filter((s: any) => s.errors > 0).length;
      const withWarnings = res.data.sitemap.filter((s: any) => s.warnings > 0).length;
      const healthy = res.data.sitemap.filter((s: any) => 
        (s.errors === 0 || s.errors === undefined) && 
        s.lastDownloaded && 
        s.type
      ).length;
      
      console.log('='.repeat(60));
      console.log('📊 Summary:');
      console.log(`   ✅ Healthy: ${healthy}`);
      console.log(`   ⚠️  With Warnings: ${withWarnings}`);
      console.log(`   ❌ With Errors: ${withErrors}`);
      console.log('='.repeat(60));
      
      if (withErrors > 0) {
        console.log('\n💡 Tip: Use --status <sitemap-url> to get detailed error information');
      }
    } else {
      console.log(`\n📭 No sitemaps found for this property.`);
    }
  } catch (error: any) {
    handleHttpError(error, 'listing sitemaps');
  }
}

/**
 * Gets the status of a specific sitemap
 */
async function getSitemapStatus(sitemapUrl: string) {
  try {
    const siteUrl = process.env.SITE_URL || 'https://www.drsayuj.info';
    const formattedSiteUrl = siteUrl.replace(/\/$/, '');
    const targetSiteUrl = process.env.GSC_SITE_URL || formattedSiteUrl;

    console.log(`🔐 Authenticating with Google...`);
    const auth = await getAuthClient();
    const searchConsole = google.webmasters({ version: 'v3', auth });

    console.log(`🔍 Checking status for: ${sitemapUrl}`);
    console.log(`   Property: ${targetSiteUrl}`);

    const res = await searchConsole.sitemaps.get({
      siteUrl: targetSiteUrl,
      feedpath: sitemapUrl,
    });

    const sitemap = res.data as any;
    
    console.log(`\n📊 Sitemap Status:\n`);
    console.log(`   Path: ${sitemap.path}`);
    console.log(`   Type: ${sitemap.type || 'unknown'}`);
    
    if (sitemap.lastDownloaded) {
      const date = new Date(sitemap.lastDownloaded);
      console.log(`   ✅ Last Downloaded: ${date.toLocaleString()}`);
    } else {
      console.log(`   ⏳ Not yet downloaded`);
    }
    
    if (sitemap.errors !== undefined) {
      if (sitemap.errors > 0) {
        console.log(`   ❌ Errors: ${sitemap.errors}`);
        
        // Show error details if available
        if (sitemap.contents) {
          const errorContents = sitemap.contents.filter((c: any) => c.type === 'error');
          if (errorContents.length > 0) {
            console.log(`\n   Error Details:`);
            errorContents.forEach((err: any, i: number) => {
              console.log(`     ${i + 1}. ${err.submitted || JSON.stringify(err)}`);
            });
          }
        }
      } else {
        console.log(`   ✅ Errors: 0`);
      }
    }
    
    if (sitemap.warnings !== undefined) {
      if (sitemap.warnings > 0) {
        console.log(`   ⚠️  Warnings: ${sitemap.warnings}`);
      } else {
        console.log(`   ✅ Warnings: 0`);
      }
    }
    
    if (sitemap.contents) {
      const validContents = sitemap.contents.filter((c: any) => c.type !== 'error');
      const errorContents = sitemap.contents.filter((c: any) => c.type === 'error');
      
      console.log(`\n   📄 Contents:`);
      console.log(`      Valid URLs: ${validContents.length}`);
      if (errorContents.length > 0) {
        console.log(`      Errors: ${errorContents.length}`);
      }
      
      // Show first few valid URLs as examples
      if (validContents.length > 0 && validContents.length <= 10) {
        console.log(`\n   Valid URLs:`);
        validContents.forEach((content: any, i: number) => {
          console.log(`     ${i + 1}. ${content.submitted || content.type}`);
        });
      } else if (validContents.length > 10) {
        console.log(`\n   First 5 valid URLs:`);
        validContents.slice(0, 5).forEach((content: any, i: number) => {
          console.log(`     ${i + 1}. ${content.submitted || content.type}`);
        });
        console.log(`     ... and ${validContents.length - 5} more`);
      }
    }
    
    // Check if sitemap is accessible
    console.log(`\n   🔗 Sitemap URL: ${sitemapUrl}`);
    console.log(`   💡 Tip: Visit the URL in your browser to verify it's accessible and returns valid XML`);
  } catch (error: any) {
    handleHttpError(error, 'checking sitemap status');
  }
}

function printHelp() {
  console.log(`
Google SEO Automation Script

Usage:
  npx tsx scripts/google-seo-automation.ts [command]

Commands:
  --sitemap [url]   Submit a sitemap to Google Search Console
                    (default: {SITE_URL}/sitemap.xml)
  --list            List all sitemaps submitted for the property
  --status <url>    Get detailed status of a specific sitemap
  --index <url>     Request instant indexing for a specific URL via Indexing API
                    (Note: Limited to JobPosting and BroadcastEvent schema types)
  --help            Show this help message

Examples:
  # Submit default sitemap
  npx tsx scripts/google-seo-automation.ts --sitemap

  # Submit specific sitemap
  npx tsx scripts/google-seo-automation.ts --sitemap https://www.drsayuj.info/sitemap-blog.xml

  # List all sitemaps
  npx tsx scripts/google-seo-automation.ts --list

  # Check status of a sitemap
  npx tsx scripts/google-seo-automation.ts --status https://www.drsayuj.info/sitemap.xml

Environment Variables:
  GOOGLE_INDEXING_KEY_JSON  (Required) The full JSON content of your Service Account Key
  SITE_URL                  (Optional) The base URL of your site (default: https://www.drsayuj.info)
  GSC_SITE_URL              (Optional) The exact GSC property identifier
                              Use 'sc-domain:example.com' for Domain Properties
                              Defaults to SITE_URL if not set

Notes:
  - The Google unauthenticated ping endpoint was deprecated on June 26, 2023
  - This script uses the Google Search Console API (authenticated)
  - Service Account must be added to GSC property as Owner or Full User
  - See docs/programmatic-indexing-guide.md for detailed setup instructions
  `);
}

async function main() {
  const args = parseArgs();

  switch (args.mode) {
    case 'sitemap':
      await submitSitemap(args.sitemap);
      break;
    case 'list':
      await listSitemaps();
      break;
    case 'status':
      if (args.sitemap) {
        await getSitemapStatus(args.sitemap);
      } else {
        console.error('Error: Sitemap URL is required for --status mode.');
        printHelp();
        process.exit(1);
      }
      break;
    case 'index':
      if (args.url) {
        await requestIndexing(args.url);
      } else {
        console.error('Error: URL is required for --index mode.');
        printHelp();
        process.exit(1);
      }
      break;
    case 'help':
    default:
      printHelp();
      break;
  }
}

main().catch(console.error);
