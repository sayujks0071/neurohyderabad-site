const fs = require('fs');
const path = require('path');

const BUILD_OUTPUT = path.join(__dirname, '../.next/server/app');
const OUTPUT_CSV = path.join(__dirname, '../audit/crawl/url_inventory.csv');
const OUTPUT_JSON = path.join(__dirname, '../audit/crawl/url_inventory.json');
const SUMMARY_MD = path.join(__dirname, '../audit/crawl/crawl_summary.md');

const BASE_URL = 'https://www.drsayuj.info';

function getUrlsFromBuild() {
  const urls = [];

  function walk(dir) {
    if (!fs.existsSync(dir)) return;
    const files = fs.readdirSync(dir);
    for (const file of files) {
      const fullPath = path.join(dir, file);
      const stat = fs.statSync(fullPath);

      if (stat.isDirectory()) {
        walk(fullPath);
      } else if (file.endsWith('.html')) {
        let route = fullPath.replace(BUILD_OUTPUT, '').replace('.html', '');
        if (route.endsWith('/index')) route = route.replace('/index', '');
        if (route === '') route = '/';

        // Skip generated partials/chunks
        if (route.includes('_next/') || route.includes('.next/')) continue;

        urls.push({
          url: `${BASE_URL}${route}`,
          route,
          type: route === '/' ? 'home' : route.split('/')[1] || 'other'
        });
      }
    }
  }

  walk(BUILD_OUTPUT);
  return urls;
}

const urls = getUrlsFromBuild();
fs.writeFileSync(OUTPUT_JSON, JSON.stringify(urls, null, 2));

const csv = ['URL,Route,Type\n' + urls.map(u => `${u.url},${u.route},${u.type}`).join('\n')];
fs.writeFileSync(OUTPUT_CSV, csv.join('\n'));

const countsByType = urls.reduce((acc, u) => {
  acc[u.type] = (acc[u.type] || 0) + 1;
  return acc;
}, {});

const summary = `
# Crawl Summary
Generated: ${new Date().toISOString()}

Total URLs: ${urls.length}

## Counts by Type
${Object.entries(countsByType).map(([k, v]) => `- ${k}: ${v}`).join('\n')}
`;
fs.writeFileSync(SUMMARY_MD, summary);
console.log('Crawl audit complete.');
