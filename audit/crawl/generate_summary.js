const fs = require('fs');
const path = require('path');

const inventoryPath = path.join(__dirname, 'url_inventory.json');
const inventory = JSON.parse(fs.readFileSync(inventoryPath, 'utf8'));

const total = inventory.length;
const ok = inventory.filter(r => r.status === 200).length;
const errors = inventory.filter(r => r.status !== 200);

const summary = `# Crawl Summary
- **Total URLs in Sitemap**: ${total}
- **200 OK**: ${ok}
- **Broken Links (404/Error)**: ${errors.length}

## Broken Links Details
${errors.map(e => `- ${e.path} (${e.status})`).join('\n')}

## Missing Metadata (on 200 OK pages)
- Missing Title: ${inventory.filter(r => r.status === 200 && !r.title).length}
- Missing Description: ${inventory.filter(r => r.status === 200 && !r.description).length}
- Missing H1: ${inventory.filter(r => r.status === 200 && !r.h1).length}

## Low Word Count (< 300 words)
${inventory.filter(r => r.status === 200 && r.wordCount < 300).map(r => `- ${r.path} (${r.wordCount} words)`).join('\n')}
`;

fs.writeFileSync(path.join(__dirname, 'crawl_summary.md'), summary);
console.log('Summary generated.');
