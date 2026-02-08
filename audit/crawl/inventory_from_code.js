const fs = require('fs');
const path = require('path');
const https = require('http');

const SITE_URL = 'http://localhost:3000';
const OUTPUT_DIR = path.join(__dirname);

// Files to parse
const FILES = [
  'app/sitemap.ts',
  'app/sitemap-services.ts',
  'app/sitemap-conditions.ts',
  'app/sitemap-locations.ts'
];

function fetchUrl(url) {
  return new Promise((resolve, reject) => {
    const req = https.get(url, (res) => {
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => {
        resolve({
          statusCode: res.statusCode,
          headers: res.headers,
          body: data,
          url: url
        });
      });
    });
    req.on('error', (e) => reject(e));
    req.end();
  });
}

function extractMeta(html) {
  const titleMatch = html.match(/<title[^>]*>(.*?)<\/title>/i);
  const title = titleMatch ? titleMatch[1] : '';

  const descMatch = html.match(/<meta[^>]*name=["']description["'][^>]*content=["']([^"']*)["']/i);
  const description = descMatch ? descMatch[1] : '';

  const h1Match = html.match(/<h1[^>]*>(.*?)<\/h1>/i);
  const h1 = h1Match ? h1Match[1].replace(/<[^>]+>/g, '').trim() : '';

  const canonicalMatch = html.match(/<link[^>]*rel=["']canonical["'][^>]*href=["']([^"']*)["']/i);
  const canonical = canonicalMatch ? canonicalMatch[1] : '';

  const robotsMatch = html.match(/<meta[^>]*name=["']robots["'][^>]*content=["']([^"']*)["']/i);
  const robots = robotsMatch ? robotsMatch[1] : '';

  const text = html.replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '')
                   .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '')
                   .replace(/<[^>]+>/g, ' ')
                   .replace(/\s+/g, ' ')
                   .trim();
  const wordCount = text.split(' ').length;

  return { title, description, h1, canonical, robots, wordCount };
}

async function run() {
  console.log('Parsing sitemap files...');
  const urls = new Set();

  for (const file of FILES) {
    const content = fs.readFileSync(path.join(process.cwd(), file), 'utf8');

    // Pattern 1: { url: '/path', ... }
    const matches1 = content.matchAll(/url:\s*['"]([^'"]+)['"]/g);
    for (const m of matches1) {
      if (m[1].startsWith('/')) urls.add(m[1]);
    }

    // Pattern 2: Array of strings like ['/path', '/path2']
    // This is harder to regex reliably if it spans lines, but let's try to catch simple strings in arrays
    // Or just look for any string starting with / inside the file that looks like a path
    const matches2 = content.matchAll(/['"](\/[a-zA-Z0-9\-\/]+)['"]/g);
    for (const m of matches2) {
      const u = m[1];
      if (!u.includes('*') && !u.includes('api/') && !u.includes('_next') && !u.includes('.')) {
         urls.add(u);
      }
    }
  }

  // Add root
  urls.add('/');

  console.log(`Found ${urls.size} unique URLs.`);

  const results = [];
  const urlArray = Array.from(urls).sort();

  for (const u of urlArray) {
    const fullUrl = `${SITE_URL}${u === '/' ? '' : u}`;
    try {
      // console.log(`Crawling ${fullUrl}...`);
      process.stdout.write(`Crawling ${u}... `);
      const res = await fetchUrl(fullUrl);
      process.stdout.write(`${res.statusCode}\n`);

      const meta = extractMeta(res.body);
      results.push({
        url: `https://www.drsayuj.info${u}`,
        path: u,
        status: res.statusCode,
        ...meta
      });
    } catch (e) {
      console.log(`Error: ${e.message}`);
      results.push({
        url: `https://www.drsayuj.info${u}`,
        path: u,
        status: 'ERROR',
        error: e.message
      });
    }
  }

  // CSV
  const csvHeader = 'Path,Status,Title,Description,H1,Canonical,Robots,WordCount\n';
  const csvRows = results.map(r => {
    const escape = (text) => text ? `"${text.replace(/"/g, '""').replace(/\n/g, ' ')}"` : '';
    return `${r.path},${r.status},${escape(r.title)},${escape(r.description)},${escape(r.h1)},${escape(r.canonical)},${escape(r.robots)},${r.wordCount||0}`;
  }).join('\n');

  fs.writeFileSync(path.join(OUTPUT_DIR, 'url_inventory.csv'), csvHeader + csvRows);
  fs.writeFileSync(path.join(OUTPUT_DIR, 'url_inventory.json'), JSON.stringify(results, null, 2));

  console.log(`Inventory saved to ${path.join(OUTPUT_DIR, 'url_inventory.csv')}`);
}

run();
