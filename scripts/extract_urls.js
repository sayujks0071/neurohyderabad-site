
const fs = require('fs');
const path = require('path');

const files = [
  'app/sitemap.ts',
  'app/sitemap-services.ts',
  'app/sitemap-conditions.ts',
  'app/sitemap-locations.ts'
];

const urls = new Set();
// Add homepage
urls.add('/');

files.forEach(file => {
  const content = fs.readFileSync(path.join(__dirname, '../', file), 'utf8');
  // Match url: '/path' or '/path' in arrays
  const matches = content.matchAll(/url:\s*'(\/[^']+)'|'(\/[^']+)'/g);
  for (const match of matches) {
    const url = match[1] || match[2];
    if (url && !url.includes('*') && !url.includes('${')) {
      urls.add(url);
    }
  }
});

const urlList = Array.from(urls).sort();
const outFile = path.join(__dirname, '../audit/crawl/urls.json');
fs.writeFileSync(outFile, JSON.stringify(urlList, null, 2));
console.log(`Extracted ${urlList.length} URLs to ${outFile}`);
