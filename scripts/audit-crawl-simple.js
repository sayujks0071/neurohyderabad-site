const fs = require('fs');
const path = require('path');
const https = require('https');
const { URL } = require('url');

const SITE_URL = 'https://www.drsayuj.info';
const OUTPUT_DIR = path.join(process.cwd(), 'audit', 'crawl');

if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

// Helper to make requests
function fetchUrl(url) {
  return new Promise((resolve, reject) => {
    const req = https.get(url, {
      headers: {
        'User-Agent': 'SEO-Audit-Bot/1.0',
      },
      timeout: 15000
    }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve({
        url,
        statusCode: res.statusCode,
        headers: res.headers,
        body: data
      }));
    });
    req.on('error', reject);
    req.on('timeout', () => {
      req.destroy();
      resolve({ url, statusCode: 0, error: 'Timeout' });
    });
  });
}

// Regex helpers
const REGEX = {
  title: /<title[^>]*>(.*?)<\/title>/i,
  metaDesc: /<meta[^>]*name=["']description["'][^>]*content=["']([^"']*)["']/i,
  robots: /<meta[^>]*name=["']robots["'][^>]*content=["']([^"']*)["']/i,
  canonical: /<link[^>]*rel=["']canonical["'][^>]*href=["']([^"']*)["']/i,
  h1: /<h1[^>]*>(.*?)<\/h1>/i,
  links: /<a[^>]*href=["']([^"']*)["'][^>]*>/gi,
};

function extract(html, regex) {
  const match = html.match(regex);
  return match ? match[1].trim() : '';
}

function countWords(html) {
  const text = html.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
  return text.split(' ').length;
}

async function run() {
  console.log('Fetching sitemap...');
  const sitemapRes = await fetchUrl(`${SITE_URL}/sitemap.xml`);

  if (sitemapRes.statusCode !== 200) {
    console.error('Failed to fetch sitemap');
    return;
  }

  const urls = [];
  const locRegex = /<loc>(.*?)<\/loc>/g;
  let match;
  while ((match = locRegex.exec(sitemapRes.body)) !== null) {
    urls.push(match[1]);
  }

  console.log(`Found ${urls.length} URLs in sitemap.`);

  const inventory = [];
  const errors = [];

  // Parallel crawl with limit
  const BATCH_SIZE = 5;
  for (let i = 0; i < urls.length; i += BATCH_SIZE) {
    const batch = urls.slice(i, i + BATCH_SIZE);
    console.log(`Crawling batch ${i + 1}-${i + batch.length}...`);

    const results = await Promise.all(batch.map(url => fetchUrl(url)));

    for (const res of results) {
      if (res.statusCode !== 200) {
        console.warn(`Error fetching ${res.url}: ${res.statusCode} ${res.error || ''}`);
        errors.push({ url: res.url, error: res.statusCode || res.error });
        // Still record what we can
      }

      const html = res.body || '';

      // Determine page type
      let type = 'other';
      if (res.url === SITE_URL || res.url === SITE_URL + '/') type = 'home';
      else if (res.url.includes('/services/')) type = 'service';
      else if (res.url.includes('/conditions/')) type = 'condition';
      else if (res.url.includes('/locations/') || res.url.includes('neurosurgeon-')) type = 'location';
      else if (res.url.includes('/blog/')) type = 'blog';
      else if (res.url.includes('/appointments')) type = 'appointment';

      // Count inlinks (approximation based on internal links found on this page? No, inlinks means incoming.
      // We can't easily count inlinks without a full graph. We can count outlinks.)
      // Prompt says "inlinks count (approx)". To do this properly requires a graph.
      // I will skip accurate inlinks count for now or calculate it after full crawl if I store all links.
      // For now, I'll store outlinks and we can compute inlinks later if needed, or leave as 0.

      const record = {
        url: res.url,
        statusCode: res.statusCode,
        canonical: extract(html, REGEX.canonical),
        robots: extract(html, REGEX.robots),
        title: extract(html, REGEX.title),
        metaDescription: extract(html, REGEX.metaDesc),
        h1: extract(html, REGEX.h1),
        wordCount: countWords(html),
        type: type,
        inlinks: 0 // Placeholder
      };

      inventory.push(record);
    }
  }

  // Calculate inlinks
  // Since we didn't extract all links from all pages to build a graph, we can't do this accurately in one pass without storing all links.
  // I will skip complex inlink calculation to save time/complexity, as it requires parsing all links.
  // But wait, "internal linking: orphan/low-linked pages flagged" is in Step 4.
  // So I SHOULD extract links.

  // Re-process bodies for links? I didn't store bodies.
  // I should have extracted links during crawl.
  // Let's modify the loop to extract internal links.
}

// I'll rewrite the loop above to include link extraction.
