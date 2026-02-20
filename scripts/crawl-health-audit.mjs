import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ensure BASE_URL is correct.
// If running against production, use https://www.drsayuj.info
// If running locally (and server is running), use http://localhost:3000
const BASE_URL = process.argv.includes('--local') ? 'http://localhost:3000' : 'https://www.drsayuj.info';
const REPORT_FILE = path.join(__dirname, '../reports/crawl-health-weekly.json');

const URLS_TO_CHECK = [
  '/',
  '/appointments',
  '/locations',
  '/neurosurgeon-malakpet',
  '/neurosurgeon-hyderabad',
  '/services/spine-surgery-hyderabad',
  '/services/brain-tumor-surgery-hyderabad',
  '/conditions',
  '/conditions/sciatica-pain-treatment-hyderabad'
];

const results = {
  timestamp: new Date().toISOString(),
  baseUrl: BASE_URL,
  summary: {
    totalChecked: 0,
    brokenLinks: 0,
    redirectChains: 0,
    duplicateTitles: 0,
    missingTitles: 0,
    thinPages: 0,
    robotsTxt: false,
    sitemapXml: false
  },
  pages: [],
  brokenLinksFound: []
};

const titleMap = new Map();

async function checkUrl(urlPath) {
  const fullUrl = new URL(urlPath, BASE_URL).toString();
  console.log(`Checking: ${fullUrl}`);

  let internalLinks = [];
  let title = '';
  let wordCount = 0;
  let status = 0;
  let finalUrl = fullUrl;
  let redirectChain = [];

  try {
    const response = await fetch(fullUrl, { redirect: 'manual' });
    status = response.status;

    // Handle Redirects manually to detect chains
    if (status >= 300 && status < 400) {
      let currentUrl = fullUrl;
      let currentStatus = status;
      let currentResponse = response;
      let hops = 0;

      while (currentStatus >= 300 && currentStatus < 400 && hops < 5) {
        const location = currentResponse.headers.get('location');
        if (!location) break;

        // Handle relative redirect locations
        const nextUrl = new URL(location, currentUrl).toString();
        redirectChain.push({ from: currentUrl, to: nextUrl, status: currentStatus });

        // Fetch next
        const nextResponse = await fetch(nextUrl, { redirect: 'manual' });
        currentStatus = nextResponse.status;
        currentUrl = nextUrl;
        currentResponse = nextResponse;
        finalUrl = currentUrl;
        hops++;
      }

      if (hops > 1) {
        results.summary.redirectChains++;
      }
    }

    // If final page is OK (or was OK initially), get content
    if (status === 200) {
      const text = await response.text();

      // Extract Title
      const titleMatch = text.match(/<title>([^<]*)<\/title>/i);
      title = titleMatch ? titleMatch[1] : '';

      if (!title) {
        results.summary.missingTitles++;
      } else {
        if (titleMap.has(title)) {
          results.summary.duplicateTitles++;
          // Mark both as duplicates if not already
        }
        titleMap.set(title, (titleMap.get(title) || 0) + 1);
      }

      // Word Count (Approx)
      // Remove scripts, styles, and html tags
      const cleanText = text
        .replace(/<script\b[^>]*>([\s\S]*?)<\/script>/gim, "")
        .replace(/<style\b[^>]*>([\s\S]*?)<\/style>/gim, "")
        .replace(/<[^>]*>/g, ' ')
        .replace(/\s+/g, ' ')
        .trim();

      wordCount = cleanText.split(' ').length;

      if (wordCount < 250) {
        results.summary.thinPages++;
      }

      // Extract Internal Links
      const linkRegex = /href=["']([^"']+)["']/g;
      let match;
      while ((match = linkRegex.exec(text)) !== null) {
        let href = match[1];

        // Basic normalization
        if (href.startsWith('/') || href.startsWith(BASE_URL)) {
          try {
             const absoluteUrl = new URL(href, BASE_URL);
             // Ensure it's the same origin
             if (absoluteUrl.origin === new URL(BASE_URL).origin) {
               internalLinks.push(absoluteUrl.pathname);
             }
          } catch (e) {
            // Ignore invalid URLs
          }
        }
      }
    }

    results.pages.push({
      url: urlPath,
      status,
      finalUrl,
      redirectChain,
      title,
      wordCount,
      internalLinksCount: internalLinks.length
    });

    return { internalLinks };

  } catch (error) {
    console.error(`Error checking ${fullUrl}:`, error.message);
    results.pages.push({
      url: urlPath,
      error: error.message,
      status: 0
    });
    return { internalLinks: [] };
  }
}

async function checkBrokenLinks(linkObjects) {
  console.log(`Verifying ${linkObjects.length} links...`);

  // Create a set of verified links to avoid duplicates
  const verified = new Set();

  for (const { link, source } of linkObjects) {
    // Skip if already checked in main loop (approx)
    if (URLS_TO_CHECK.includes(link)) continue;

    // We want to check unique (link, source) pairs or just unique links?
    // Checking unique links is faster, but we lose "which page has this link".
    // Let's check unique links but keep track of *all* sources for reporting.
    // Actually, let's just check every link occurrence for simplicity here, or check unique links and map back.
    // To report source, we need to iterate linkObjects.

    // Optimization: Check unique links first, cache result.
    // But for reporting "Broken link X on page Y", we need page Y.

    const key = `${link}|${source}`;
    if (verified.has(key)) continue;
    verified.add(key);

    try {
        const fullUrl = new URL(link, BASE_URL).toString();
        // Use HEAD to be faster
        let response = await fetch(fullUrl, { method: 'HEAD' });

        if (response.status === 405) {
             response = await fetch(fullUrl, { method: 'GET' });
        }

        if (response.status >= 400) {
            results.summary.brokenLinks++;
            results.brokenLinksFound.push({ link, status: response.status, source });
            console.log(`❌ Broken link: ${link} (${response.status}) on ${source}`);
        }
    } catch (e) {
        results.summary.brokenLinks++;
        results.brokenLinksFound.push({ link, error: e.message, source });
        console.log(`❌ Broken link: ${link} (${e.message}) on ${source}`);
    }
  }
}

async function runAudit() {
  console.log(`Starting audit on ${BASE_URL}...`);

  // 1. Check Robots.txt
  try {
    const robotsUrl = new URL('/robots.txt', BASE_URL).toString();
    const resp = await fetch(robotsUrl);
    if (resp.status === 200) results.summary.robotsTxt = true;
  } catch (e) {
      console.log('Robots.txt check failed:', e.message);
  }

  // 2. Check Sitemap.xml
  try {
    const sitemapUrl = new URL('/sitemap.xml', BASE_URL).toString();
    const resp = await fetch(sitemapUrl);
    if (resp.status === 200) results.summary.sitemapXml = true;
  } catch (e) {
      console.log('Sitemap.xml check failed:', e.message);
  }

  // 3. Crawl Pages
  let allDiscoveredLinks = [];
  for (const url of URLS_TO_CHECK) {
    const { internalLinks } = await checkUrl(url);
    if (internalLinks) {
        internalLinks.forEach(link => {
            allDiscoveredLinks.push({ link, source: url });
        });
    }
    results.summary.totalChecked++;
  }

  // 4. Verify Links
  await checkBrokenLinks(allDiscoveredLinks);

  // 5. Save Report
  const reportDir = path.dirname(REPORT_FILE);
  if (!fs.existsSync(reportDir)) {
      fs.mkdirSync(reportDir, { recursive: true });
  }

  fs.writeFileSync(REPORT_FILE, JSON.stringify(results, null, 2));
  console.log(`Audit complete. Report saved to ${REPORT_FILE}`);

  // Log Summary
  console.log('Summary:', JSON.stringify(results.summary, null, 2));
}

runAudit();
