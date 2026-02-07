const fs = require('fs');
const path = require('path');
const http = require('http');

const CRAWL_FILE = path.join(__dirname, '../crawl/url_inventory.json');
const OUTPUT_DIR = path.join(__dirname, '../tech');
if (!fs.existsSync(OUTPUT_DIR)) fs.mkdirSync(OUTPUT_DIR, { recursive: true });

const SITE_URL = 'http://localhost:3000';

async function checkRobots() {
  return new Promise((resolve) => {
    http.get(`${SITE_URL}/robots.txt`, (res) => {
      resolve({
        statusCode: res.statusCode,
        exists: res.statusCode === 200,
        content: res.statusCode === 200 ? 'Found' : 'Missing'
      });
    }).on('error', () => resolve({ statusCode: 0, exists: false }));
  });
}

async function analyze() {
  if (!fs.existsSync(CRAWL_FILE)) {
    console.error('❌ Crawl file not found. Run crawl first.');
    return;
  }

  const urls = JSON.parse(fs.readFileSync(CRAWL_FILE, 'utf8'));
  const issues = [];

  // 1. Robots.txt
  const robots = await checkRobots();
  if (!robots.exists) {
      issues.push({ url: '/robots.txt', type: 'missing_robots', severity: 'HIGH' });
  }

  // 2. Crawl Errors (404/500)
  urls.forEach(u => {
      if (u.statusCode >= 400 && u.statusCode < 500) {
          issues.push({ url: u.url, type: `client_error_${u.statusCode}`, severity: 'HIGH' });
      } else if (u.statusCode >= 500) {
          issues.push({ url: u.url, type: `server_error_${u.statusCode}`, severity: 'CRITICAL' });
      }
  });

  // Write Issues CSV
  const csv = 'url,issue_type,severity\n' +
    issues.map(i => `${i.url},${i.issue_type},${i.severity}`).join('\n');
  fs.writeFileSync(path.join(OUTPUT_DIR, 'tech_issues.csv'), csv);

  // Write Notes
  const notes = `# Technical SEO Notes

- **Robots.txt Status:** ${robots.statusCode} (${robots.content})
- **Crawl Errors:** ${issues.length}
  - 4xx: ${issues.filter(i => i.type.startsWith('client_error')).length}
  - 5xx: ${issues.filter(i => i.type.startsWith('server_error')).length}
  `;
  fs.writeFileSync(path.join(OUTPUT_DIR, 'robots_sitemap_notes.md'), notes);

  console.log('✅ Technical analysis complete.');
}

analyze();
