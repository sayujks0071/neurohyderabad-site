const fs = require('fs');
const http = require('http');

async function measureTTFB(url) {
  return new Promise((resolve) => {
    const start = Date.now();
    const req = http.get(url, (res) => {
      const ttfb = Date.now() - start;
      res.on('data', () => {});
      res.on('end', () => resolve({ ttfb, headers: res.headers }));
    });
    req.on('error', () => resolve({ ttfb: -1, headers: {} }));
  });
}

async function run() {
  const urlsText = fs.readFileSync('audit/crawl/url_inventory.csv', 'utf8');
  const urls = urlsText.split('\n').filter(u => u.trim()).slice(0, 10);

  let md = '# Headers Report\n\n';
  let csv = 'url,ttfb_ms,cache_control\n';

  for (const url of urls) {
    const localUrl = url.trim().replace('https://www.drsayuj.info', 'http://localhost:3000');
    const { ttfb, headers } = await measureTTFB(localUrl);

    md += `## URL: ${url}\n`;
    md += `- **TTFB:** ${ttfb}ms\n`;
    md += `- **Cache-Control:** ${headers['cache-control'] || 'MISSING'}\n`;
    md += `- **Vary:** ${headers['vary'] || 'MISSING'}\n\n`;

    csv += `"${url}",${ttfb},"${headers['cache-control'] || 'none'}"\n`;
  }

  fs.writeFileSync('audit/headers/headers_report.md', md);
  fs.writeFileSync('audit/headers/ttfb_table.csv', csv);
  console.log('Headers TTFB audited!');
}

run();
