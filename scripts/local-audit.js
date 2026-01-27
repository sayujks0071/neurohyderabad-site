
const fs = require('fs');
const path = require('path');
const http = require('http');
const { URL } = require('url');

const LOCAL_URL = 'http://localhost:3000';
const PROD_URL = 'https://www.drsayuj.info';
const CONCURRENT_REQUESTS = 5;

const auditResults = {
  timestamp: new Date().toISOString(),
  site: LOCAL_URL,
  pages: []
};

// Simple request function for localhost (HTTP)
function makeRequest(url) {
  return new Promise((resolve, reject) => {
    const req = http.get(url, (res) => {
      const chunks = [];
      res.on('data', (chunk) => chunks.push(chunk));
      res.on('end', () => {
        const body = Buffer.concat(chunks).toString('utf8');
        resolve({
          statusCode: res.statusCode,
          headers: res.headers,
          body
        });
      });
    });
    req.on('error', reject);
    req.setTimeout(5000, () => {
      req.destroy();
      reject(new Error('Timeout'));
    });
  });
}

async function parseSitemap() {
  console.log('🔍 Loading URLs from audit/crawl/urls.json...');
  try {
    const urlsPath = path.join(__dirname, '../audit/crawl/urls.json');
    const urls = JSON.parse(fs.readFileSync(urlsPath, 'utf8'));
    // Convert paths to local URLs
    return urls.map(u => u.startsWith('http') ? u.replace(PROD_URL, LOCAL_URL) : `${LOCAL_URL}${u}`);
  } catch (e) {
    console.error('Error loading URLs:', e.message);
    return [];
  }
}

const REGEX = {
  title: /<title[^>]*>(.*?)<\/title>/i,
  metaDesc: /<meta[^>]*name=["']description["'][^>]*content=["']([^"']*)["']/i,
  h1: /<h1[^>]*>(.*?)<\/h1>/gi,
  canonical: /<link[^>]*rel=["']canonical["'][^>]*href=["']([^"']*)["']/i,
  schema: /<script[^>]*type=["']application\/ld\+json["'][^>]*>(.*?)<\/script>/gi,
  tags: /<[^>]*>/g
};

async function analyzePage(url) {
  try {
    const res = await makeRequest(url);
    const html = res.body;

    const titleMatch = html.match(REGEX.title);
    const title = titleMatch ? titleMatch[1].trim() : '';

    const descMatch = html.match(REGEX.metaDesc);
    const description = descMatch ? descMatch[1].trim() : '';

    const h1Matches = html.match(REGEX.h1) || [];
    const h1s = h1Matches.map(h => h.replace(REGEX.tags, '').trim());

    const canonicalMatch = html.match(REGEX.canonical);
    const canonical = canonicalMatch ? canonicalMatch[1].trim() : '';

    const schemaMatches = [];
    let match;
    while ((match = REGEX.schema.exec(html)) !== null) {
        try {
            schemaMatches.push(JSON.parse(match[1]));
        } catch(e) {}
    }

    const wordCount = html.replace(REGEX.tags, ' ').replace(/\s+/g, ' ').trim().split(' ').length;

    return {
      url: url.replace(LOCAL_URL, PROD_URL), // Store as Prod URL for reporting
      status: res.statusCode,
      title,
      description,
      h1: h1s,
      canonical,
      wordCount,
      schemas: schemaMatches,
      headers: res.headers
    };
  } catch (e) {
    return {
      url: url.replace(LOCAL_URL, PROD_URL),
      error: e.message
    };
  }
}

async function run() {
  const urls = await parseSitemap();
  console.log(`Found ${urls.length} URLs`);

  const results = [];
  for (let i = 0; i < urls.length; i += CONCURRENT_REQUESTS) {
    const batch = urls.slice(i, i + CONCURRENT_REQUESTS);
    console.log(`Processing ${i + 1}-${Math.min(i + CONCURRENT_REQUESTS, urls.length)}...`);
    const promises = batch.map(u => analyzePage(u));
    const batchResults = await Promise.all(promises);
    results.push(...batchResults);
  }

  auditResults.pages = results;

  const outFile = path.join(__dirname, '../audit/crawl/data.json');
  fs.writeFileSync(outFile, JSON.stringify(auditResults, null, 2));
  console.log(`Saved to ${outFile}`);
}

run();
