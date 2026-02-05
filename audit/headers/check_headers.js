const http = require('http');
const fs = require('fs');
const path = require('path');

const URLS = [
  "http://localhost:3000/",
  "http://localhost:3000/services/endoscopic-spine-surgery-hyderabad",
  "http://localhost:3000/conditions/sciatica-pain-treatment-hyderabad",
  "http://localhost:3000/locations/malakpet"
];

const RESULTS = [];

async function check(url) {
  return new Promise((resolve) => {
    const start = Date.now();
    const req = http.get(url, (res) => {
      const ttfb = Date.now() - start;
      // Consume body
      res.resume();
      resolve({
        url,
        status: res.statusCode,
        ttfb,
        headers: res.headers
      });
    });
    req.on('error', (e) => resolve({ url, error: e.message }));
  });
}

async function run() {
  for (const url of URLS) {
    console.log(`Checking headers for ${url}...`);
    const res = await check(url);
    RESULTS.push(res);
  }

  const md = `# Headers & TTFB Report

| URL | Status | TTFB (ms) | Cache-Control | Content-Type |
| --- | --- | --- | --- | --- |
${RESULTS.map(r => `| ${r.url.replace('http://localhost:3000', '')} | ${r.status} | ${r.ttfb} | ${r.headers['cache-control'] || '-'} | ${r.headers['content-type']} |`).join('\n')}

## Full Headers
\`\`\`json
${JSON.stringify(RESULTS, null, 2)}
\`\`\`
`;

  fs.writeFileSync(path.join(__dirname, 'headers_report.md'), md);
  console.log('Headers report saved.');
}

run();
