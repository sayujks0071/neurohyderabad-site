
const fs = require('fs');
const path = require('path');

const dataFile = path.join(__dirname, '../audit/crawl/data.json');
const data = JSON.parse(fs.readFileSync(dataFile, 'utf8'));

const PROD_URL = 'https://www.drsayuj.info';

// 1. URL Inventory
let csv = 'URL,Status,Title,MetaDescription,H1,Canonical,WordCount\n';
data.pages.forEach(p => {
  const h1 = p.h1 && p.h1.length > 0 ? `"${p.h1[0].replace(/"/g, '""')}"` : '';
  const title = p.title ? `"${p.title.replace(/"/g, '""')}"` : '';
  const desc = p.description ? `"${p.description.replace(/"/g, '""')}"` : '';
  csv += `"${p.url}",${p.status},${title},${desc},${h1},"${p.canonical}",${p.wordCount}\n`;
});
fs.writeFileSync(path.join(__dirname, '../audit/crawl/url_inventory.csv'), csv);

// 2. Schema Inventory
const schemaInv = {};
data.pages.forEach(p => {
  if (p.schemas && p.schemas.length > 0) {
    schemaInv[p.url] = p.schemas.map(s => s['@type']);
  }
});
fs.writeFileSync(path.join(__dirname, '../audit/schema/schema_inventory.json'), JSON.stringify(schemaInv, null, 2));

// 3. Tech Issues & On-Page Issues
let techCsv = 'URL,Issue,Severity\n';
let onpageCsv = 'URL,Issue,Severity,Recommendation\n';

data.pages.forEach(p => {
  // Tech
  if (p.status !== 200) {
    techCsv += `"${p.url}","Status ${p.status}","High"\n`;
  }
  if (p.canonical && p.canonical !== p.url && !p.url.includes('?')) {
    // Basic canonical check (ignoring query params)
     // Normalize slashes
    const normUrl = p.url.replace(/\/$/, '');
    const normCan = p.canonical.replace(/\/$/, '');
    if (normUrl !== normCan) {
       techCsv += `"${p.url}","Canonical Mismatch (Self: ${p.url}, Can: ${p.canonical})","Medium"\n`;
    }
  }

  // On-Page
  if (!p.title) {
    onpageCsv += `"${p.url}","Missing Title","High","Add Title"\n`;
  } else if (p.title.length < 30) {
    onpageCsv += `"${p.url}","Title too short","Low","Expand Title"\n`;
  } else if (p.title.length > 65) {
    onpageCsv += `"${p.url}","Title too long","Low","Shorten Title"\n`;
  }

  if (!p.description) {
    onpageCsv += `"${p.url}","Missing Meta Description","High","Add Description"\n`;
  } else if (p.description.length < 50) {
    onpageCsv += `"${p.url}","Description too short","Low","Expand Description"\n`;
  } else if (p.description.length > 170) {
    onpageCsv += `"${p.url}","Description too long","Low","Shorten Description"\n`;
  }

  if (!p.h1 || p.h1.length === 0) {
    onpageCsv += `"${p.url}","Missing H1","High","Add H1"\n`;
  } else if (p.h1.length > 1) {
    onpageCsv += `"${p.url}","Multiple H1s","Medium","Use only one H1"\n`;
  }

  if (p.wordCount < 200) {
     onpageCsv += `"${p.url}","Thin Content (${p.wordCount} words)","Medium","Add Content"\n`;
  }
});

fs.writeFileSync(path.join(__dirname, '../audit/tech/tech_issues.csv'), techCsv);
fs.writeFileSync(path.join(__dirname, '../audit/onpage/onpage_issues.csv'), onpageCsv);

// 4. Headers Report
let headersMd = '# Headers Report\n\n';
data.pages.slice(0, 10).forEach(p => { // Sample first 10
  headersMd += `## ${p.url}\n`;
  if (p.headers) {
    headersMd += '```json\n' + JSON.stringify(p.headers, null, 2) + '\n```\n';
  }
});
fs.writeFileSync(path.join(__dirname, '../audit/headers/headers_report.md'), headersMd);

console.log('Processed audit data into CSV/JSON/MD.');
