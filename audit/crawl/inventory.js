const fs = require('fs');
const path = require('path');
const https = require('http'); // localhost is http
const { URL } = require('url');

const SITE_URL = 'http://localhost:3000';
const SITEMAP_URL = `${SITE_URL}/sitemap.xml`;
const OUTPUT_DIR = path.join(__dirname);

if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

// Function to fetch content
function fetchUrl(url) {
  return new Promise((resolve, reject) => {
    const req = https.get(url, (res) => {
      let data = '';
      res.on('data', (chunk) => {
        data += chunk;
      });
      res.on('end', () => {
        resolve({
          statusCode: res.statusCode,
          headers: res.headers,
          body: data,
          url: url
        });
      });
    });
    req.on('error', (e) => {
      reject(e);
    });
    req.end();
  });
}

// Extract content using regex
function extractMeta(html) {
  const titleMatch = html.match(/<title[^>]*>(.*?)<\/title>/i);
  const title = titleMatch ? titleMatch[1] : '';

  const descMatch = html.match(/<meta[^>]*name=["']description["'][^>]*content=["']([^"']*)["']/i);
  const description = descMatch ? descMatch[1] : '';

  const h1Match = html.match(/<h1[^>]*>(.*?)<\/h1>/i);
  const h1 = h1Match ? h1Match[1].replace(/<[^>]+>/g, '') : ''; // Strip inner tags

  const canonicalMatch = html.match(/<link[^>]*rel=["']canonical["'][^>]*href=["']([^"']*)["']/i);
  const canonical = canonicalMatch ? canonicalMatch[1] : '';

  const robotsMatch = html.match(/<meta[^>]*name=["']robots["'][^>]*content=["']([^"']*)["']/i);
  const robots = robotsMatch ? robotsMatch[1] : '';

  // Word count (very rough)
  const text = html.replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '')
                   .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '')
                   .replace(/<[^>]+>/g, ' ')
                   .replace(/\s+/g, ' ')
                   .trim();
  const wordCount = text.split(' ').length;

  return { title, description, h1, canonical, robots, wordCount };
}

async function run() {
  console.log(`Fetching sitemap from ${SITEMAP_URL}...`);
  try {
    const sitemapRes = await fetchUrl(SITEMAP_URL);
    if (sitemapRes.statusCode !== 200) {
      throw new Error(`Failed to fetch sitemap: ${sitemapRes.statusCode}`);
    }

    const urls = [];
    const urlMatches = sitemapRes.body.match(/<loc>(.*?)<\/loc>/g);
    if (urlMatches) {
      urlMatches.forEach(match => {
        let url = match.replace(/<\/?loc>/g, '');
        // Replace production domain with localhost for crawling
        url = url.replace('https://www.drsayuj.info', SITE_URL);
        urls.push(url);
      });
    }

    console.log(`Found ${urls.length} URLs. Starting crawl...`);

    const results = [];
    // Limit to 50 for speed if needed, or process all. Let's do all with concurrency limit.
    // Simple serial for reliability in this env.

    for (const url of urls) {
      // Filter out PDF or images if they slipped in
      if (url.match(/\.(pdf|jpg|png)$/i)) continue;

      try {
        console.log(`Crawling ${url}...`);
        const res = await fetchUrl(url);
        const meta = extractMeta(res.body);

        results.push({
          url: url.replace(SITE_URL, 'https://www.drsayuj.info'), // Store as prod URL
          status: res.statusCode,
          ...meta
        });
      } catch (e) {
        console.error(`Error crawling ${url}:`, e.message);
        results.push({
          url: url.replace(SITE_URL, 'https://www.drsayuj.info'),
          status: 'ERROR',
          error: e.message
        });
      }
    }

    // Output CSV
    const csvHeader = 'URL,Status,Title,Description,H1,Canonical,Robots,WordCount\n';
    const csvRows = results.map(r => {
      const escape = (text) => text ? `"${text.replace(/"/g, '""')}"` : '';
      return `${r.url},${r.status},${escape(r.title)},${escape(r.description)},${escape(r.h1)},${escape(r.canonical)},${escape(r.robots)},${r.wordCount || 0}`;
    }).join('\n');

    fs.writeFileSync(path.join(OUTPUT_DIR, 'url_inventory.csv'), csvHeader + csvRows);
    fs.writeFileSync(path.join(OUTPUT_DIR, 'url_inventory.json'), JSON.stringify(results, null, 2));

    // Summary
    const summary = `# Crawl Summary
- **Total URLs Scanned**: ${results.length}
- **200 OK**: ${results.filter(r => r.status === 200).length}
- **Errors**: ${results.filter(r => r.status !== 200).length}

## Issues Detected
- Missing Title: ${results.filter(r => !r.title).length}
- Missing Description: ${results.filter(r => !r.description).length}
- Missing H1: ${results.filter(r => !r.h1).length}
`;
    fs.writeFileSync(path.join(OUTPUT_DIR, 'crawl_summary.md'), summary);

    console.log('Crawl complete.');

  } catch (e) {
    console.error('Crawl failed:', e);
  }
}

run();
