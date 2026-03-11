const fs = require('fs');
const http = require('http');

async function fetchUrl(urlStr) {
  return new Promise((resolve) => {
    const req = http.get(urlStr, {
        headers: { 'User-Agent': 'SEO-Audit-Bot/1.0' }
    }, (res) => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => resolve({ status: res.statusCode, body, headers: res.headers }));
    });
    req.on('error', (err) => resolve({ status: 500, error: err.message, headers: {} }));
  });
}

function extractMetadata(html) {
  const getTag = (regex) => (html.match(regex) || [])[1] || '';
  return {
    title: getTag(/<title[^>]*>([^<]+)<\/title>/i),
    desc: getTag(/<meta\s+name="description"\s+content="([^"]+)"/i) || getTag(/<meta\s+content="([^"]+)"\s+name="description"/i),
    h1: getTag(/<h1[^>]*>([\s\S]*?)<\/h1>/i).replace(/<[^>]+>/g, '').trim(),
    canonical: getTag(/<link\s+rel="canonical"\s+href="([^"]+)"/i),
    robots: getTag(/<meta\s+name="robots"\s+content="([^"]+)"/i) || getTag(/<meta\s+content="([^"]+)"\s+name="robots"/i)
  };
}

async function run() {
  const urlsText = fs.readFileSync('audit/crawl/url_inventory.csv', 'utf8');
  const urls = urlsText.split('\n').filter(u => u.trim());

  const results = [];
  const inventory = [];

  // Test a small subset to avoid rate limits locally, e.g., first 10
  const urlsToTest = urls.slice(0, 15);
  console.log(`Auditing ${urlsToTest.length} URLs...`);

  for (const url of urlsToTest) {
    // Replace site URL with localhost for local testing
    const localUrl = url.trim().replace('https://www.drsayuj.info', 'http://localhost:3000');
    console.log(`Fetching ${localUrl}...`);
    const { status, body, headers } = await fetchUrl(localUrl);

    if (status !== 200) {
      results.push({ url, status, error: 'Non-200 status' });
      continue;
    }

    const meta = extractMetadata(body);
    const wordCount = body.replace(/<[^>]*>?/gm, '').split(/\s+/).length;

    let type = 'other';
    if (url === 'https://www.drsayuj.info/') type = 'home';
    else if (url.includes('/services')) type = 'service';
    else if (url.includes('/conditions')) type = 'condition';
    else if (url.includes('/locations')) type = 'location';
    else if (url.includes('/blog')) type = 'blog';

    inventory.push({
      url,
      status,
      ...meta,
      wordCount,
      type
    });

    // Check SEO issues
    if (!meta.title) results.push({ url, issue: 'Missing Title', severity: 'High' });
    else if (meta.title.length < 10 || meta.title.length > 70) results.push({ url, issue: `Title length (${meta.title.length}) suboptimal`, severity: 'Medium' });

    if (!meta.desc) results.push({ url, issue: 'Missing Meta Description', severity: 'High' });
    else if (meta.desc.length < 50 || meta.desc.length > 160) results.push({ url, issue: `Meta Desc length (${meta.desc.length}) suboptimal`, severity: 'Medium' });

    if (!meta.h1) results.push({ url, issue: 'Missing H1', severity: 'High' });

    // Schema check
    if (!body.includes('application/ld+json')) {
      results.push({ url, issue: 'Missing JSON-LD Schema', severity: 'Medium' });
    }
  }

  fs.writeFileSync('audit/crawl/url_inventory.json', JSON.stringify(inventory, null, 2));
  fs.writeFileSync('audit/onpage/onpage_issues.csv', 'url,issue,severity\n' + results.map(r => `"${r.url}","${r.issue}","${r.severity}"`).join('\n'));
  console.log('Done!');
}

run();
