#!/usr/bin/env tsx
/**
 * Index all pending URLs discovered via URL Inspection API.
 *
 * Defaults to sitemap.xml, inspects each URL, and submits pending
 * URLs to the Indexing API with rate limiting.
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

const DEFAULT_SITE_URL = 'https://www.drsayuj.info';
const SITE_URL = (process.env.SITE_URL || DEFAULT_SITE_URL).replace(/\/$/, '');
const GSC_SITE_URL = process.env.GSC_SITE_URL || SITE_URL;
const DEFAULT_SITEMAP_URL = `${SITE_URL}/sitemap-main.xml`;
const INSPECTION_ENDPOINT =
  'https://searchconsole.googleapis.com/v1/urlInspection/index:inspect';

const DEFAULT_DELAY_MS = 250;
const DEFAULT_LIMIT = Infinity;

type InspectResult = {
  inspectionResult?: {
    indexStatusResult?: {
      verdict?: string;
      coverageState?: string;
      robotsTxtState?: string;
      indexingState?: string;
      pageFetchState?: string;
    };
  };
};

function parseArgs(argv: string[]) {
  const args = [...argv];
  const options: {
    sitemap: string;
    limit: number;
    delayMs: number;
    dryRun: boolean;
  } = {
    sitemap: DEFAULT_SITEMAP_URL,
    limit: DEFAULT_LIMIT,
    delayMs: DEFAULT_DELAY_MS,
    dryRun: false,
  };

  for (let i = 0; i < args.length; i += 1) {
    const arg = args[i];
    if (arg === '--sitemap' && args[i + 1]) {
      options.sitemap = args[i + 1];
      i += 1;
      continue;
    }
    if (arg === '--limit' && args[i + 1]) {
      options.limit = Number.parseInt(args[i + 1], 10) || DEFAULT_LIMIT;
      i += 1;
      continue;
    }
    if (arg === '--delay' && args[i + 1]) {
      options.delayMs = Number.parseInt(args[i + 1], 10) || DEFAULT_DELAY_MS;
      i += 1;
      continue;
    }
    if (arg === '--dry-run') {
      options.dryRun = true;
    }
  }

  return options;
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
  const xml = await fetchText(sitemapUrl);
  const locs = extractLocs(xml);
  if (xml.includes('<sitemapindex')) {
    const nestedResults = await Promise.all(
      locs.map(async loc => getSitemapUrls(loc))
    );
    return nestedResults.flat();
  }
  return locs;
}

function shouldAttemptIndex(result?: InspectResult['inspectionResult']): boolean {
  if (!result?.indexStatusResult) {
    return true;
  }

  const coverage = (result.indexStatusResult.coverageState || '').toLowerCase();
  const verdict = (result.indexStatusResult.verdict || '').toUpperCase();
  const robots = result.indexStatusResult.robotsTxtState || '';
  const indexing = result.indexStatusResult.indexingState || '';

  const blockedByRobots = robots && robots !== 'ALLOWED';
  const blockedByNoindex = coverage.includes('noindex');
  const blockedByRobotsText = coverage.includes('blocked') || coverage.includes('robots');

  if (blockedByRobots || blockedByNoindex || blockedByRobotsText) {
    return false;
  }

  const looksPending =
    coverage.includes('not indexed') ||
    coverage.includes('unknown to google') ||
    coverage.includes('discovered') ||
    coverage.includes('crawled') ||
    verdict !== 'PASS';

  if (indexing && indexing !== 'INDEXING_ALLOWED' && indexing !== 'INDEXING_ALLOWED_WITH_CAVEATS') {
    return false;
  }

  return looksPending;
}

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

  return new google.auth.GoogleAuth({
    credentials,
    scopes: [
      'https://www.googleapis.com/auth/webmasters',
      'https://www.googleapis.com/auth/indexing',
    ],
  });
}

async function getAccessToken(auth: any): Promise<string> {
  const client = await auth.getClient();
  const tokenResponse = await client.getAccessToken();
  if (!tokenResponse || !tokenResponse.token) {
    throw new Error('Failed to acquire access token.');
  }
  return tokenResponse.token;
}

async function inspectUrl(
  url: string,
  accessToken: string
): Promise<InspectResult> {
  const res = await fetch(INSPECTION_ENDPOINT, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      inspectionUrl: url,
      siteUrl: GSC_SITE_URL,
    }),
  });

  const data = (await res.json().catch(() => ({}))) as InspectResult;
  if (!res.ok) {
    const message =
      (data as any)?.error?.message || `Inspection failed (${res.status})`;
    throw new Error(message);
  }
  return data;
}

async function indexUrl(url: string, auth: any): Promise<boolean> {
  const indexing = google.indexing({ version: 'v3', auth });
  const res = await indexing.urlNotifications.publish({
    requestBody: {
      url,
      type: 'URL_UPDATED',
    },
  });
  return res.status === 200;
}

async function sleep(ms: number) {
  await new Promise(resolve => setTimeout(resolve, ms));
}

async function main() {
  const options = parseArgs(process.argv.slice(2));
  console.log('🔎 Fetching sitemap URLs...');
  const sitemapUrls = await getSitemapUrls(options.sitemap);
  const uniqueUrls = Array.from(new Set(sitemapUrls));
  const urlsToCheck = uniqueUrls.slice(0, options.limit);

  console.log(`📋 Found ${uniqueUrls.length} URLs (checking ${urlsToCheck.length})`);
  console.log(`🔐 Authenticating with Google...`);
  const auth = await getAuthClient();
  const accessToken = await getAccessToken(auth);
  console.log(`✅ Authenticated`);

  let pendingCount = 0;
  let indexedCount = 0;
  let skippedCount = 0;
  const pendingUrls: string[] = [];

  for (let i = 0; i < urlsToCheck.length; i += 1) {
    const url = urlsToCheck[i];
    const progress = `[${i + 1}/${urlsToCheck.length}]`;
    try {
      const inspection = await inspectUrl(url, accessToken);
      const isPending = shouldAttemptIndex(inspection.inspectionResult);

      if (!isPending) {
        console.log(`${progress} ✅ Already indexed or blocked: ${url}`);
        skippedCount += 1;
        await sleep(options.delayMs);
        continue;
      }

      pendingCount += 1;
      pendingUrls.push(url);

      if (options.dryRun) {
        console.log(`${progress} 💤 Pending (dry run): ${url}`);
        await sleep(options.delayMs);
        continue;
      }

      const success = await indexUrl(url, auth);
      if (success) {
        console.log(`${progress} 🚀 Indexed: ${url}`);
        indexedCount += 1;
      } else {
        console.log(`${progress} ❌ Indexing failed: ${url}`);
      }
    } catch (error: any) {
      console.log(`${progress} ❌ Error for ${url}: ${error.message}`);
    }

    if (i < urlsToCheck.length - 1) {
      await sleep(options.delayMs);
    }
  }

  console.log('\n✅ Completed pending URL indexing');
  console.log(`Pending URLs found: ${pendingCount}`);
  console.log(`Indexed URLs: ${indexedCount}`);
  console.log(`Skipped URLs: ${skippedCount}`);

  if (pendingUrls.length > 0) {
    console.log('\nPending URLs:');
    pendingUrls.forEach(url => console.log(`- ${url}`));
  }
}

main().catch(error => {
  console.error('❌ Failed to index pending URLs:', error.message);
  process.exit(1);
});
