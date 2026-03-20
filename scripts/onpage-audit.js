const fs = require('fs');
const path = require('path');

const BUILD_OUTPUT = path.join(__dirname, '../.next/server/app');
const OUTPUT_DIR = path.join(__dirname, '../audit/onpage');

if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

let csv = 'URL,Issue Type,Severity,Recommended Fix\n';
let md = `# Cannibalization Clusters\nGenerated: ${new Date().toISOString()}\n\n`;

function auditFile(fullPath, url) {
  try {
    const html = fs.readFileSync(fullPath, 'utf8');

    const titleMatch = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
    const title = titleMatch ? titleMatch[1].trim() : null;

    const descMatch = html.match(/<meta\s+name=["']description["']\s+content=["']([\s\S]*?)["']/i) ||
                      html.match(/<meta\s+content=["']([\s\S]*?)["']\s+name=["']description["']/i);
    const desc = descMatch ? descMatch[1].trim() : null;

    const h1Matches = [...html.matchAll(/<h1[^>]*>([\s\S]*?)<\/h1>/gi)];

    if (!title) csv += `${url},Missing Title,High,Add a descriptive <title> tag\n`;
    else if (title.length < 30 || title.length > 70) csv += `${url},Title Length (${title.length}),Medium,Keep title between 30 and 70 characters\n`;

    if (!desc) csv += `${url},Missing Description,High,Add a <meta name="description">\n`;
    else if (desc.length < 70 || desc.length > 160) csv += `${url},Description Length (${desc.length}),Medium,Keep description between 70 and 160 characters\n`;

    if (h1Matches.length === 0) csv += `${url},Missing H1,High,Add a single <h1> tag\n`;
    else if (h1Matches.length > 1) csv += `${url},Multiple H1s (${h1Matches.length}),Medium,Ensure only one <h1> tag is present\n`;

  } catch(err) {
    csv += `${url},Parse Error,High,Check file formatting\n`;
  }
}

const urls = JSON.parse(fs.readFileSync(path.join(__dirname, '../audit/crawl/url_inventory.json')));

urls.forEach(u => {
  const file = u.route === '/' ? '/index.html' : `${u.route}.html`;
  const fullPath = path.join(BUILD_OUTPUT, file);
  if (fs.existsSync(fullPath)) {
    auditFile(fullPath, u.url);
  } else {
    // Dynamic route without static generation
    csv += `${u.url},Not Statically Generated,Info,Ensure correct generation or ignore if dynamic\n`;
  }
});

fs.writeFileSync(path.join(OUTPUT_DIR, 'onpage_issues.csv'), csv);
fs.writeFileSync(path.join(OUTPUT_DIR, 'cannibalization_clusters.md'), md);
console.log('On-page audit complete.');
