import { google } from 'googleapis';

// Define types for command line arguments
interface CliArgs {
  mode: 'sitemap' | 'index' | 'check' | 'help';
  url?: string;
  sitemapUrl?: string;
}

// Parse command line arguments
function parseArgs(): CliArgs {
  const args = process.argv.slice(2);

  if (args.includes('--help') || args.includes('-h')) {
    return { mode: 'help' };
  }

  // Handle sitemap submission mode
  if (args.includes('--sitemap')) {
    const argsMap: CliArgs = { mode: 'sitemap' };

    // Check for optional url override
    const urlIndex = args.indexOf('--url');
    if (urlIndex !== -1 && args[urlIndex + 1]) {
      argsMap.url = args[urlIndex + 1];
    }

    // Check for optional sitemap-url override
    const sitemapUrlIndex = args.indexOf('--sitemap-url');
    if (sitemapUrlIndex !== -1 && args[sitemapUrlIndex + 1]) {
      argsMap.sitemapUrl = args[sitemapUrlIndex + 1];
    }

    return argsMap;
  }

  // Handle sitemap check/list mode
  if (args.includes('--check')) {
    const argsMap: CliArgs = { mode: 'check' };

    const urlIndex = args.indexOf('--url');
    if (urlIndex !== -1 && args[urlIndex + 1]) {
      argsMap.url = args[urlIndex + 1];
    }

    return argsMap;
  }

  // Handle single URL indexing mode
  const indexFlag = args.indexOf('--index');
  if (indexFlag !== -1 && args[indexFlag + 1]) {
    return { mode: 'index', url: args[indexFlag + 1] };
  }

  return { mode: 'help' };
}

// Helper to get authenticated client
async function getAuthClient() {
  // Support both correct and misspelled environment variable names
  const keyJson = process.env.GOOGLE_INDEXING_KEY_JSON || process.env.GOOGOLE_INDEXING_KEY_JSON;
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

async function submitSitemap(siteUrlOverride?: string, sitemapUrlOverride?: string) {
  try {
    const envSiteUrl = process.env.SITE_URL || 'https://www.drsayuj.info';
    const siteUrl = siteUrlOverride || envSiteUrl;

    let feedPath: string;

    if (sitemapUrlOverride) {
      feedPath = sitemapUrlOverride;
    } else {
      // Logic for deriving feedPath
      if (siteUrl.startsWith('sc-domain:')) {
        // We cannot easily derive the full URL from a sc-domain property without more info.
        // We will attempt to strip 'sc-domain:' and prepend 'https://' as a best guess,
        // but warn the user.
        const domain = siteUrl.replace('sc-domain:', '');
        feedPath = `https://${domain}/sitemap.xml`;
        console.warn(`⚠️  Warning: Using a Domain Property (${siteUrl}) without an explicit --sitemap-url.`);
        console.warn(`   Assumed sitemap URL: ${feedPath}`);
        console.warn(`   If this is incorrect, use --sitemap-url <url>`);
      } else {
         // Standard URL property
         const formattedSiteUrl = siteUrl.replace(/\/$/, '');
         feedPath = `${formattedSiteUrl}/sitemap.xml`;
      }
    }

    console.log(`Authenticating with Google...`);
    const auth = await getAuthClient();
    const searchConsole = google.webmasters({ version: 'v3', auth });

    console.log(`Submitting sitemap: ${feedPath}`);
    console.log(`Property: ${siteUrl}`);

    const res = await searchConsole.sitemaps.submit({
      siteUrl: siteUrl,
      feedpath: feedPath,
    });

    if (res.status === 204 || res.status === 200) {
       console.log(`✅ Sitemap submitted successfully!`);
       console.log(`   Response Date: ${res.headers.date}`);
    } else {
       console.warn(`⚠️  Unexpected status code: ${res.status}`);
    }

  } catch (error: any) {
    handleGscError(error);
    process.exit(1);
  }
}

async function checkSitemaps(siteUrlOverride?: string) {
  try {
    const envSiteUrl = process.env.SITE_URL || 'https://www.drsayuj.info';
    const siteUrl = siteUrlOverride || envSiteUrl;

    console.log(`Authenticating with Google...`);
    const auth = await getAuthClient();
    const searchConsole = google.webmasters({ version: 'v3', auth });

    console.log(`Fetching sitemaps for property: ${siteUrl}...`);

    const res = await searchConsole.sitemaps.list({
      siteUrl: siteUrl,
    });

    if (!res.data.sitemap || res.data.sitemap.length === 0) {
      console.log('No sitemaps found for this property.');
      return;
    }

    console.log('\nSubmitted Sitemaps:');
    console.table(res.data.sitemap.map(s => ({
      path: s.path,
      lastSubmitted: s.lastSubmitted,
      lastDownloaded: s.lastDownloaded,
      errors: s.errors,
      warnings: s.warnings,
      isPending: s.isPending
    })));

  } catch (error: any) {
    handleGscError(error);
    process.exit(1);
  }
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

function handleGscError(error: any) {
  console.error(`❌ Operation Failed`);

  if (error.response) {
      const statusCode = error.response.status;
      const errorData = error.response.data;

      console.error(`   HTTP Status: ${statusCode}`);

      if (statusCode === 403) {
          console.error("   Cause: Permission Denied.");
          console.error("   Action: Ensure the Service Account email is added as an 'Owner' or 'Full User' in GSC.");
          console.error("   Note: For Domain Properties (sc-domain:...), you must add the user to the Domain Property specifically.");
      } else if (statusCode === 404) {
          console.error("   Cause: Property or Resource not found.");
          console.error("   Action: Verify the 'siteUrl' matches the GSC property exactly (including trailing slashes or 'sc-domain:' prefix).");
      } else if (statusCode === 429) {
          console.error("   Cause: Quota Exceeded (Rate Limit).");
          console.error("   Action: Slow down requests.");
      } else {
        console.error(`   Details: ${error.message}`);
      }
  } else {
      console.error(`   Error: ${error.message}`);
  }
}

function printHelp() {
  console.log(`
Google SEO Automation Script

Usage:
  npx tsx scripts/google-seo-automation.ts [command] [options]

Commands:
  --sitemap             Submit the sitemap to Google Search Console
  --check               List submitted sitemaps and their status
  --index <url>         Request instant indexing for a specific URL via Indexing API
  --help                Show this help message

Options (for --sitemap and --check):
  --url <siteUrl>       Override the GSC Property ID (e.g., 'sc-domain:example.com' or 'https://example.com')
  --sitemap-url <url>   Explicitly specify the sitemap URL (required if siteUrl is a Domain Property and logic differs)

Environment Variables:
  GOOGLE_INDEXING_KEY_JSON  (Required) The full JSON content of your Service Account Key
  SITE_URL                  (Optional) Default property ID (default: https://www.drsayuj.info)
  `);
}

async function main() {
  const args = parseArgs();

  switch (args.mode) {
    case 'sitemap':
      await submitSitemap(args.url, args.sitemapUrl);
      break;
    case 'check':
      await checkSitemaps(args.url);
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
