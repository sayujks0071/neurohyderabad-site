import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const BASE_URL = 'http://localhost:3000';
const REPORT_DIR = path.join(__dirname, '../reports');
const REPORT_FILE = path.join(REPORT_DIR, 'crawl-health-weekly.json');

// Sample stable subset as per instructions
const SEED_URLS = [
  '/',
  '/appointments',
  '/locations',
  '/conditions',
  '/services',
  '/contact',
  '/neurosurgeon-hyderabad',
  '/neurosurgeon-jubilee-hills',
  '/locations/malakpet',
  '/conditions/sciatica-treatment-hyderabad',
  '/conditions/brain-tumor-surgery-hyderabad',
  '/services/minimally-invasive-spine-surgery',
  '/blog/headache-vs-brain-tumor-warning-signs'
];

const results = {
  summary: {
    total_checked: 0,
    broken_links: 0,
    redirect_chains: 0,
    duplicate_titles: 0,
    missing_titles: 0,
    thin_pages: 0,
    sitemap_status: 'unknown',
    robots_status: 'unknown'
  },
  details: {
    broken_links: [],
    redirect_chains: [],
    title_issues: [],
    thin_pages: []
  }
};

const visitedLinks = new Set();
const internalLinksToCheck = new Set();
const titles = new Map(); // url -> title

async function fetchWithRedirects(url) {
  let currentUrl = url;
  const hops = [];
  let response;

  // Prevent infinite loops
  const maxRedirects = 5;

  for (let i = 0; i < maxRedirects; i++) {
    try {
      response = await fetch(currentUrl, { redirect: 'manual' });
      hops.push({ url: currentUrl, status: response.status });

      if (response.status >= 300 && response.status < 400) {
        const location = response.headers.get('location');
        if (!location) break;

        // Handle relative redirects
        if (location.startsWith('/')) {
            currentUrl = new URL(location, BASE_URL).toString();
        } else if (location.startsWith('http')) {
            currentUrl = location;
        } else {
            // unexpected format
            break;
        }
      } else {
        break;
      }
    } catch (e) {
      return { error: e.message, hops };
    }
  }

  return { response, hops, finalUrl: currentUrl };
}

async function checkLink(url) {
  if (visitedLinks.has(url)) return;
  visitedLinks.add(url);

  try {
    const res = await fetch(url, { method: 'HEAD' });
    if (res.status === 404) {
      results.summary.broken_links++;
      results.details.broken_links.push({ url, status: 404, source: 'internal_link_check' });
    }
  } catch (e) {
    // ignore network errors for link checks usually, but record 404s
  }
}

async function processPage(path) {
  const url = `${BASE_URL}${path}`;
  console.log(`Crawling ${url}...`);

  const { response, hops, finalUrl, error } = await fetchWithRedirects(url);

  if (error || !response) {
    console.error(`Failed to fetch ${url}: ${error}`);
    return;
  }

  // Check redirect chains
  if (hops.length > 2) { // >1 hop means initial -> redirect -> final. 2 items in hops list means 1 redirect. wait.
    // fetchWithRedirects pushes the *request* URL and status.
    // If 301: hops=[{url: A, status: 301}]. Loop.
    // Next: fetch B. hops=[{url: A, 301}, {url: B, 200}].
    // Redirect chain > 1 hop means: A -> B -> C.
    // hops would be [{A, 301}, {B, 301}, {C, 200}]. Length 3.
    // So if hops.length > 2, it's a chain.
    if (hops.length > 2) {
        results.summary.redirect_chains++;
        results.details.redirect_chains.push({
            original: url,
            chain: hops.map(h => `${h.status} ${h.url}`)
        });
    }
  }

  if (response.status === 404) {
      results.summary.broken_links++;
      results.details.broken_links.push({ url, status: 404, source: 'seed_list' });
      return;
  }

  if (response.status !== 200) return;

  const text = await response.text();

  // Extract Title
  const titleMatch = text.match(/<title[^>]*>([^<]+)<\/title>/i);
  const title = titleMatch ? titleMatch[1].trim() : '';

  if (!title) {
    results.summary.missing_titles++;
    results.details.title_issues.push({ url, issue: 'missing' });
  } else {
    // Check duplicate
    // We strictly check duplicates within the seed list for now to avoid noise
    // But keeping track of all seen titles is good
    // However, different query params might result in same title, we should ignore those if we stripped them.
    // The seed list is distinct paths.

    // Check if we've seen this title mapped to a different path (ignoring trailing slashes)
    const normPath = path.replace(/\/$/, '');

    // Find if title exists
    for (const [p, t] of titles.entries()) {
        if (t === title && p !== normPath) {
             results.summary.duplicate_titles++;
             results.details.title_issues.push({ url, issue: 'duplicate', other: p, title });
        }
    }
    titles.set(normPath, title);
  }

  // Check Thin Content
  const bodyContent = text.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
  const wordCount = bodyContent.split(' ').length;
  if (wordCount < 400) { // Threshold from prompt
     results.summary.thin_pages++;
     results.details.thin_pages.push({ url, wordCount });
  }

  // Extract Links
  const linkRegex = /href=["'](\/[^"']+)["']/g;
  let match;
  while ((match = linkRegex.exec(text)) !== null) {
    const linkPath = match[1];
    if (linkPath.startsWith('//')) continue; // skip protocol-relative
    if (linkPath.match(/\.(css|js|png|jpg|jpeg|gif|svg|ico|woff|woff2)$/i)) continue; // skip assets

    // Normalize and add to check list
    internalLinksToCheck.add(`${BASE_URL}${linkPath}`);
  }
}

async function main() {
  if (!fs.existsSync(REPORT_DIR)) {
    fs.mkdirSync(REPORT_DIR, { recursive: true });
  }

  // 1. Check sitemap and robots
  try {
      const robots = await fetch(`${BASE_URL}/robots.txt`);
      results.summary.robots_status = robots.status === 200 ? 'ok' : 'missing';
  } catch (e) { results.summary.robots_status = 'error'; }

  try {
      const sitemap = await fetch(`${BASE_URL}/sitemap.xml`);
      results.summary.sitemap_status = sitemap.status === 200 ? 'ok' : 'missing';
  } catch (e) { results.summary.sitemap_status = 'error'; }

  // 2. Process Seed URLs
  for (const url of SEED_URLS) {
    await processPage(url);
    results.summary.total_checked++;
  }

  // 3. Check collected internal links
  console.log(`Checking ${internalLinksToCheck.size} internal links...`);
  const links = Array.from(internalLinksToCheck);
  // Limit concurrency
  const BATCH_SIZE = 10;
  for (let i = 0; i < links.length; i += BATCH_SIZE) {
      await Promise.all(links.slice(i, i + BATCH_SIZE).map(checkLink));
  }

  // Write Report
  fs.writeFileSync(REPORT_FILE, JSON.stringify(results, null, 2));
  console.log(`Report written to ${REPORT_FILE}`);
}

main().catch(console.error);
