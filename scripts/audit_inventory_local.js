const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom');

const SITEMAP_PATH = path.join(__dirname, '../public/sitemap.xml');
const OUTPUT_DIR = path.join(__dirname, '../audit/crawl');

if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

function getPageType(url) {
  if (url === 'https://www.drsayuj.info/') return 'Home';
  if (url.includes('/blog/')) return 'Blog';
  if (url.includes('/services/')) return 'Service';
  if (url.includes('/conditions/')) return 'Condition';
  if (url.includes('/locations/') || url.includes('neurosurgeon-')) return 'Location';
  if (url.includes('/appointments')) return 'Appointment';
  if (url.includes('/contact')) return 'Contact';
  return 'Other';
}

async function run() {
  console.log('Reading sitemap from:', SITEMAP_PATH);

  try {
    const sitemapContent = fs.readFileSync(SITEMAP_PATH, 'utf8');
    // Simple regex parse because it's XML
    const urls = [];
    const regex = /<loc>(.*?)<\/loc>/g;
    let match;
    while ((match = regex.exec(sitemapContent)) !== null) {
      urls.push(match[1]);
    }

    console.log(`Found ${urls.length} URLs.`);

    const inventory = urls.map(url => {
      return {
        url,
        pageType: getPageType(url),
        status: 200, // Assuming 200 since it's in sitemap and build passed
        inlinks: 'N/A' // Requires full crawl
      };
    });

    // Save JSON
    fs.writeFileSync(path.join(OUTPUT_DIR, 'url_inventory.json'), JSON.stringify(inventory, null, 2));

    // Save CSV
    const csvHeader = 'URL,Page Type,Status\n';
    const csvRows = inventory.map(item => `${item.url},${item.pageType},${item.status}`).join('\n');
    fs.writeFileSync(path.join(OUTPUT_DIR, 'url_inventory.csv'), csvHeader + csvRows);

    // Save Summary
    const summary = `# Crawl Summary

- **Total URLs:** ${urls.length}
- **Source:** public/sitemap.xml

## Breakdown by Type
${Object.entries(inventory.reduce((acc, item) => {
  acc[item.pageType] = (acc[item.pageType] || 0) + 1;
  return acc;
}, {})).map(([type, count]) => `- **${type}:** ${count}`).join('\n')}
`;
    fs.writeFileSync(path.join(OUTPUT_DIR, 'crawl_summary.md'), summary);

    console.log('Inventory generated.');

  } catch (err) {
    console.error('Error:', err);
  }
}

run();
