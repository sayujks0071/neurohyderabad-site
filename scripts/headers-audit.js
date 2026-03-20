const fs = require('fs');
const path = require('path');
const https = require('https');

const urls = [
  'https://www.drsayuj.info/',
  'https://www.drsayuj.info/services/endoscopic-spine-surgery-hyderabad',
];

const HEADERS_DIR = path.join(__dirname, '../audit/headers');
if (!fs.existsSync(HEADERS_DIR)) {
  fs.mkdirSync(HEADERS_DIR, { recursive: true });
}

let md = `# Headers Audit\nGenerated: ${new Date().toISOString()}\n\n`;
let csv = 'URL,TTFB (ms),Cache-Control,Content-Encoding,Vercel-Cache\n';

async function fetchHeaders() {
  for (const url of urls) {
    console.log(`Fetching headers for ${url}...`);
    try {
      const start = Date.now();
      const res = await new Promise((resolve, reject) => {
        https.get(url, (res) => resolve(res)).on('error', reject);
      });
      const ttfb = Date.now() - start;
      const headers = res.headers;

      md += `## ${url}\n`;
      md += `- TTFB: ${ttfb}ms\n`;
      md += `- Status: ${res.statusCode}\n`;
      Object.keys(headers).forEach(k => {
        md += `- ${k}: ${headers[k]}\n`;
      });
      md += '\n';

      csv += `${url},${ttfb},"${headers['cache-control'] || ''}","${headers['content-encoding'] || ''}","${headers['x-vercel-cache'] || ''}"\n`;

    } catch (err) {
      console.error(`Error fetching ${url}: ${err.message}`);
    }
  }

  fs.writeFileSync(path.join(HEADERS_DIR, 'headers_report.md'), md);
  fs.writeFileSync(path.join(HEADERS_DIR, 'ttfb_table.csv'), csv);
  console.log('Headers audit complete.');
}

fetchHeaders();
