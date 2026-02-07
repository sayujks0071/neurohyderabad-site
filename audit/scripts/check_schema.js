const http = require('http');
const fs = require('fs');
const path = require('path');

const OUTPUT_DIR = path.join(__dirname, '../schema');
if (!fs.existsSync(OUTPUT_DIR)) fs.mkdirSync(OUTPUT_DIR, { recursive: true });

const SITE_URL = 'http://localhost:3000';
const URLS = [
  '/',
  '/services/endoscopic-spine-surgery-hyderabad',
  '/services/spine-surgery-cost-hyderabad',
  '/services/awake-spine-surgery-hyderabad',
  '/conditions/sciatica-pain-treatment-hyderabad',
  '/locations/malakpet',
  '/blog/spinal-stenosis-vs-pad-leg-pain-guide'
];

async function fetchPage(url) {
  return new Promise((resolve) => {
    http.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve({ url, body: data, statusCode: res.statusCode }));
    }).on('error', () => resolve({ url, body: '', statusCode: 0 }));
  });
}

function extractSchema(html) {
  const schemas = [];
  const regex = /<script type="application\/ld\+json">([\s\S]*?)<\/script>/gi;
  let match;
  while ((match = regex.exec(html)) !== null) {
    try {
      schemas.push(JSON.parse(match[1]));
    } catch (e) {
      // ignore invalid json
    }
  }
  return schemas;
}

async function run() {
  const results = [];
  const issues = [];
  const gapList = [];

  for (const urlPath of URLS) {
    const fullUrl = `${SITE_URL}${urlPath}`;
    const { body } = await fetchPage(fullUrl);
    const schemas = extractSchema(body);

    const schemaTypes = schemas.map(s => s['@type']);
    results.push({ url: urlPath, types: schemaTypes });

    // Validation
    const hasPhysician = schemas.some(s => s['@type'] === 'Physician' || (Array.isArray(s['@type']) && s['@type'].includes('Physician')));
    const hasClinic = schemas.some(s => s['@type'] === 'MedicalClinic' || (Array.isArray(s['@type']) && s['@type'].includes('MedicalClinic')));
    const hasBreadcrumb = schemas.some(s => s['@type'] === 'BreadcrumbList');
    const hasFAQ = schemas.some(s => s['@type'] === 'FAQPage');

    if (!hasPhysician) issues.push({ url: urlPath, issue: 'Missing Physician Schema' });
    if (!hasClinic && (urlPath.includes('/locations/') || urlPath === '/')) issues.push({ url: urlPath, issue: 'Missing MedicalClinic Schema' });
    if (!hasBreadcrumb && urlPath !== '/') issues.push({ url: urlPath, issue: 'Missing BreadcrumbList' });

    // YMYL Gaps
    if (urlPath.includes('/services/') || urlPath.includes('/conditions/')) {
        if (!hasFAQ) gapList.push(`- [ ] Add FAQPage Schema to ${urlPath}`);
        if (!schemas.some(s => s['@type'] === 'MedicalWebPage')) gapList.push(`- [ ] Add MedicalWebPage Schema to ${urlPath}`);
    }
  }

  fs.writeFileSync(path.join(OUTPUT_DIR, 'schema_inventory.json'), JSON.stringify(results, null, 2));

  const csv = 'url,issue\n' + issues.map(i => `${i.url},"${i.issue}"`).join('\n');
  fs.writeFileSync(path.join(OUTPUT_DIR, 'schema_issues.csv'), csv);

  const md = `# YMYL Schema Gaps

${gapList.join('\n')}
  `;
  fs.writeFileSync(path.join(OUTPUT_DIR, 'ymyl_gap_list.md'), md);

  console.log('✅ Schema check complete.');
}

run();
