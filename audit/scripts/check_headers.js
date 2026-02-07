const http = require('http');
const fs = require('fs');
const path = require('path');
const { URL } = require('url');

const OUTPUT_DIR = path.join(__dirname, '../headers');
if (!fs.existsSync(OUTPUT_DIR)) fs.mkdirSync(OUTPUT_DIR, { recursive: true });

const SITE_URL = 'http://localhost:3000';
const URLS = [
  '/',
  '/services/endoscopic-spine-surgery-hyderabad',
  '/locations/malakpet'
];

async function checkHeaders(urlPath) {
  const url = `${SITE_URL}${urlPath}`;
  const start = process.hrtime();

  return new Promise((resolve) => {
    http.get(url, (res) => {
      const diff = process.hrtime(start);
      const ttfb = (diff[0] * 1000 + diff[1] / 1e6).toFixed(2);

      resolve({
        url: urlPath,
        ttfb,
        headers: res.headers,
        statusCode: res.statusCode
      });
    }).on('error', (e) => {
      resolve({ url: urlPath, error: e.message });
    });
  });
}

async function run() {
  const results = await Promise.all(URLS.map(checkHeaders));

  const mdReport = `# Headers Report

| URL | TTFB (ms) | Cache-Control | Content-Encoding | Status |
|---|---|---|---|---|
${results.map(r => `| ${r.url} | ${r.ttfb} | ${r.headers['cache-control'] || 'MISSING'} | ${r.headers['content-encoding'] || 'none'} | ${r.statusCode} |`).join('\n')}

## Notes
- **Cache-Control:** Should be present for static assets, 'public, max-age=...'
- **Content-Encoding:** Should be 'gzip' or 'br'.
  `;

  fs.writeFileSync(path.join(OUTPUT_DIR, 'headers_report.md'), mdReport);

  const csvReport = `url,ttfb,cache_control,content_encoding,status\n` +
    results.map(r => `${r.url},${r.ttfb},"${r.headers['cache-control'] || ''}","${r.headers['content-encoding'] || ''}",${r.statusCode}`).join('\n');

  fs.writeFileSync(path.join(OUTPUT_DIR, 'ttfb_table.csv'), csvReport);

  console.log('✅ Headers check complete.');
}

run();
