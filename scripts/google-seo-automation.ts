import { google } from 'googleapis';

// Define types for command line arguments
interface CliArgs {
  mode: 'sitemap' | 'index' | 'help';
  url?: string;
}

// Parse command line arguments
function parseArgs(): CliArgs {
  const args = process.argv.slice(2);

  if (args.includes('--help') || args.includes('-h')) {
    return { mode: 'help' };
  }

  if (args.includes('--sitemap')) {
    return { mode: 'sitemap' };
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

async function submitSitemap() {
  try {
    const siteUrl = process.env.SITE_URL || 'https://www.drsayuj.info';
    // Remove trailing slash if present for consistency
    const formattedSiteUrl = siteUrl.replace(/\/$/, '');
    const feedPath = `${formattedSiteUrl}/sitemap.xml`;

    console.log(`Authenticating with Google...`);
    const auth = await getAuthClient();
    const searchConsole = google.webmasters({ version: 'v3', auth });

    console.log(`Submitting sitemap: ${feedPath} for site: ${formattedSiteUrl}`);

    // Note: The API expects siteUrl as it is defined in GSC property.
    // Usually it matches the domain.
    await searchConsole.sitemaps.submit({
      siteUrl: formattedSiteUrl,
      feedpath: feedPath,
    });

    console.log(`✅ Sitemap submitted successfully!`);
  } catch (error: any) {
    console.error(`❌ Error submitting sitemap:`, error.message);
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

function printHelp() {
  console.log(`
Google SEO Automation Script

Usage:
  ts-node scripts/google-seo-automation.ts [command]

Commands:
  --sitemap        Submit the sitemap.xml to Google Search Console
  --index <url>    Request instant indexing for a specific URL via Indexing API
  --help           Show this help message

Environment Variables:
  GOOGLE_INDEXING_KEY_JSON  (Required) The full JSON content of your Service Account Key
  SITE_URL                  (Optional) The base URL of your site (default: https://www.drsayuj.info)
  `);
}

async function main() {
  const args = parseArgs();

  switch (args.mode) {
    case 'sitemap':
      await submitSitemap();
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
