const fs = require('fs');
const path = require('path');

const inventoryPath = path.join(__dirname, '../crawl/url_inventory.json');
if (!fs.existsSync(inventoryPath)) {
  console.error('Inventory not found!');
  process.exit(1);
}

const inventory = JSON.parse(fs.readFileSync(inventoryPath, 'utf8'));

const issues = [];

inventory.forEach(page => {
  if (page.status !== 200) return;

  // Title
  if (!page.title) {
    issues.push({ url: page.path, type: 'Missing Title', severity: 'High' });
  } else if (page.title.length < 30) {
    issues.push({ url: page.path, type: 'Title Too Short', severity: 'Low' });
  } else if (page.title.length > 60) {
    issues.push({ url: page.path, type: 'Title Too Long', severity: 'Medium' });
  }

  // Description
  if (!page.description) {
    issues.push({ url: page.path, type: 'Missing Description', severity: 'High' });
  } else if (page.description.length < 50) {
    issues.push({ url: page.path, type: 'Description Too Short', severity: 'Low' });
  } else if (page.description.length > 160) {
    issues.push({ url: page.path, type: 'Description Too Long', severity: 'Medium' });
  }

  // H1
  if (!page.h1) {
    issues.push({ url: page.path, type: 'Missing H1', severity: 'High' });
  }

  // Word Count
  if (page.wordCount < 300) {
    issues.push({ url: page.path, type: 'Thin Content', severity: 'Medium' });
  }

  // Canonical
  if (!page.canonical) {
     // issues.push({ url: page.path, type: 'Missing Canonical', severity: 'Medium' });
  }
});

const csvHeader = 'URL,Issue,Severity\n';
const csvRows = issues.map(i => `${i.url},"${i.type}",${i.severity}`).join('\n');

fs.writeFileSync(path.join(__dirname, 'issues.csv'), csvHeader + csvRows);
console.log(`Found ${issues.length} issues.`);
