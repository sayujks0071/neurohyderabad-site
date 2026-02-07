const http = require('http');
const fs = require('fs');
const path = require('path');
const { URL } = require('url');

const SITE_URL = 'http://localhost:3000';
const OUTPUT_DIR = path.join(__dirname, '../crawl');
const MAX_PAGES = 200;
const CONCURRENT_REQUESTS = 5;

// Ensure output directory exists
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

const requestCache = new Map();
const httpAgent = new http.Agent({ keepAlive: true, maxSockets: CONCURRENT_REQUESTS });

function makeRequest(url) {
  if (requestCache.has(url)) return Promise.resolve(requestCache.get(url));

  return new Promise((resolve, reject) => {
    const urlObj = new URL(url);
    const options = {
      hostname: urlObj.hostname,
      port: urlObj.port || 80,
      path: urlObj.pathname + urlObj.search,
      method: 'GET',
      agent: httpAgent,
      headers: { 'User-Agent': 'SEO-Audit-Bot/1.0' }
    };

    const req = http.request(options, (res) => {
      const chunks = [];
      res.on('data', (chunk) => chunks.push(chunk));
      res.on('end', () => {
        const body = Buffer.concat(chunks).toString('utf8');
        const result = {
          url,
          statusCode: res.statusCode,
          headers: res.headers,
          body,
          size: body.length
        };
        requestCache.set(url, result);
        resolve(result);
      });
    });

    req.on('error', reject);
    req.setTimeout(10000, () => {
      req.destroy();
      reject(new Error('Request timeout'));
    });
    req.end();
  });
}

async function parseSitemap() {
  console.log('🔍 Parsing sitemap...');
  try {
    const sitemapUrl = `${SITE_URL}/sitemap-main.xml`;
    const sitemap = await makeRequest(sitemapUrl);

    // Check if sitemap exists
    if (sitemap.statusCode !== 200) {
        console.warn(`⚠️ Sitemap not found at ${sitemapUrl}. Trying crawl from homepage.`);
        return [`${SITE_URL}/`];
    }

    const urls = [];
    // Simple regex for loc tags
    const urlMatches = sitemap.body.match(/<loc>(.*?)<\/loc>/g);

    if (urlMatches) {
      urlMatches.forEach(match => {
        let url = match.replace(/<\/?loc>/g, '');
        // Replace production domain with localhost if needed, though sitemap might have localhost URLs if generated locally
        if (url.includes('drsayuj.info')) {
            url = url.replace('https://www.drsayuj.info', SITE_URL);
        }
        if (url.startsWith(SITE_URL)) {
          urls.push(url);
        }
      });
    }

    console.log(`✅ Found ${urls.length} URLs in sitemap`);
    return urls.slice(0, MAX_PAGES);
  } catch (error) {
    console.error('❌ Error parsing sitemap:', error.message);
    return [`${SITE_URL}/`];
  }
}

// Regex Patterns
const REGEX = {
  title: /<title[^>]*>(.*?)<\/title>/i,
  metaDescription: /<meta[^>]*name=["']description["'][^>]*content=["']([^"']*)["']/i,
  h1: /<h1[^>]*>(.*?)<\/h1>/gi,
  canonical: /<link[^>]*rel=["']canonical["'][^>]*href=["']([^"']*)["']/i,
  robots: /<meta[^>]*name=["']robots["'][^>]*content=["']([^"']*)["']/i,
  inlinks: /<a[^>]*href=["']([^"']*)["'][^>]*>/gi,
  tags: /<[^>]*>/g,
  whitespace: /\s+/g
};

function extractMetadata(html, url) {
  const titleMatch = html.match(REGEX.title);
  const title = titleMatch ? titleMatch[1].trim() : '';

  const metaDescMatch = html.match(REGEX.metaDescription);
  const metaDescription = metaDescMatch ? metaDescMatch[1].trim() : '';

  const h1Matches = html.match(REGEX.h1);
  const h1 = h1Matches ? h1Matches.map(m => m.replace(REGEX.tags, '').trim())[0] : ''; // Take first H1

  const canonicalMatch = html.match(REGEX.canonical);
  const canonical = canonicalMatch ? canonicalMatch[1].trim() : '';

  const robotsMatch = html.match(REGEX.robots);
  const robotsMeta = robotsMatch ? robotsMatch[1].trim() : '';

  // Word count approximation
  const text = html.replace(REGEX.tags, ' ').replace(REGEX.whitespace, ' ').trim();
  const wordCount = text.split(' ').filter(w => w.length > 0).length;

  // Inlinks approximation
  const linksSet = new Set();
  let match;
  REGEX.inlinks.lastIndex = 0;
  while ((match = REGEX.inlinks.exec(html)) !== null) {
      // filtering logic could be added here, currently just counting raw hrefs
      linksSet.add(match[1]);
  }
  const inlinksCount = linksSet.size;

  // Determine template type based on URL structure
  let templateType = 'other';
  if (url === `${SITE_URL}/`) templateType = 'home';
  else if (url.includes('/services/')) templateType = 'service';
  else if (url.includes('/conditions/')) templateType = 'condition';
  else if (url.includes('/locations/') || url.includes('/near/')) templateType = 'location';
  else if (url.includes('/blog/')) templateType = 'blog';
  else if (url.includes('/appointments')) templateType = 'appointment';

  return {
    url,
    statusCode: 200, // Assumed if we got here
    canonical,
    robotsMeta,
    title,
    metaDescription,
    h1,
    wordCount,
    templateType,
    inlinksCount
  };
}

async function run() {
  const urls = await parseSitemap();
  const results = [];
  const summary = {
      totalUrls: 0,
      statusCodes: {},
      missingTitles: 0,
      missingDescriptions: 0,
      missingH1: 0
  };

  // Process in batches
  for (let i = 0; i < urls.length; i += CONCURRENT_REQUESTS) {
    const batch = urls.slice(i, i + CONCURRENT_REQUESTS);
    console.log(`Processing batch ${Math.floor(i/CONCURRENT_REQUESTS) + 1}/${Math.ceil(urls.length/CONCURRENT_REQUESTS)}`);

    const promises = batch.map(async (url) => {
        try {
            const response = await makeRequest(url);
            if (response.statusCode !== 200) {
                return { url, statusCode: response.statusCode };
            }
            return extractMetadata(response.body, url);
        } catch (e) {
            return { url, error: e.message };
        }
    });

    const batchResults = await Promise.all(promises);
    results.push(...batchResults);
  }

  // Generate artifacts
  const csvHeader = 'url,statusCode,canonical,robotsMeta,title,metaDescription,h1,wordCount,templateType,inlinksCount\n';
  const csvRows = results.map(r => {
      // Escape CSV fields
      const escape = (str) => str ? `"${str.toString().replace(/"/g, '""')}"` : '';
      return `${r.url},${r.statusCode},${escape(r.canonical)},${escape(r.robotsMeta)},${escape(r.title)},${escape(r.metaDescription)},${escape(r.h1)},${r.wordCount || 0},${r.templateType || ''},${r.inlinksCount || 0}`;
  }).join('\n');

  fs.writeFileSync(path.join(OUTPUT_DIR, 'url_inventory.csv'), csvHeader + csvRows);
  fs.writeFileSync(path.join(OUTPUT_DIR, 'url_inventory.json'), JSON.stringify(results, null, 2));

  // Generate Summary
  summary.totalUrls = results.length;
  results.forEach(r => {
      summary.statusCodes[r.statusCode] = (summary.statusCodes[r.statusCode] || 0) + 1;
      if (!r.title) summary.missingTitles++;
      if (!r.metaDescription) summary.missingDescriptions++;
      if (!r.h1) summary.missingH1++;
  });

  const summaryMd = `# Crawl Summary

- **Total URLs:** ${summary.totalUrls}
- **Status Codes:** ${JSON.stringify(summary.statusCodes)}
- **Missing Titles:** ${summary.missingTitles}
- **Missing Meta Descriptions:** ${summary.missingDescriptions}
- **Missing H1:** ${summary.missingH1}
  `;
  fs.writeFileSync(path.join(OUTPUT_DIR, 'crawl_summary.md'), summaryMd);

  console.log('✅ Crawl complete.');
}

run();
