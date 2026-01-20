const fs = require('fs');
const path = require('path');
const http = require('http');
const { JSDOM } = require('jsdom');

const URLs = [
  '/',
  '/services/endoscopic-spine-surgery-hyderabad',
  '/conditions/sciatica-pain-treatment-hyderabad',
  '/locations/malakpet',
  '/blog/sciatica-pain-management-hyderabad'
];

const OUTPUT_JSON = path.join(__dirname, '../audit/schema/schema_inventory.json');
const OUTPUT_CSV = path.join(__dirname, '../audit/schema/schema_issues.csv');
const YMYL_GAP = path.join(__dirname, '../audit/schema/ymyl_gap_list.md');

if (!fs.existsSync(path.dirname(OUTPUT_JSON))) {
  fs.mkdirSync(path.dirname(OUTPUT_JSON), { recursive: true });
}

function fetchPage(path) {
  return new Promise((resolve, reject) => {
    http.get(`http://localhost:3000${path}`, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(data));
      res.on('error', reject);
    });
  });
}

async function run() {
  console.log('Starting Schema Audit...');
  const inventory = {};
  const issues = [];
  const ymylGaps = [];

  for (const urlPath of URLs) {
    try {
      const html = await fetchPage(urlPath);
      const dom = new JSDOM(html);
      const doc = dom.window.document;

      const scripts = Array.from(doc.querySelectorAll('script[type="application/ld+json"]'));
      const schemas = scripts.map(s => {
        try {
          return JSON.parse(s.textContent);
        } catch (e) {
          return null;
        }
      }).filter(s => s);

      inventory[urlPath] = schemas.map(s => s['@type']);

      // Validation Logic
      const types = schemas.map(s => s['@type']);
      const hasPhysician = types.includes('Physician') || types.includes('Person'); // layout
      const hasBreadcrumb = types.includes('BreadcrumbList');
      const hasFAQ = types.includes('FAQPage');
      const hasMedical = types.includes('MedicalWebPage') || types.includes('MedicalCondition');
      const hasArticle = types.includes('Article') || types.includes('BlogPosting');

      // Global Checks
      if (!hasPhysician) issues.push({ url: urlPath, issue: 'Missing Physician Schema' });
      // Breadcrumb check (might be missing on home)
      if (urlPath !== '/' && !hasBreadcrumb) issues.push({ url: urlPath, issue: 'Missing Breadcrumb Schema' });

      // Page Specific
      if (urlPath.includes('/services/') && !hasMedical) issues.push({ url: urlPath, issue: 'Missing MedicalWebPage Schema' });
      if (urlPath.includes('/conditions/') && !hasMedical) issues.push({ url: urlPath, issue: 'Missing MedicalCondition/WebPage Schema' });
      if (urlPath.includes('/blog/') && !hasArticle) issues.push({ url: urlPath, issue: 'Missing Article Schema' });

      // FAQ Check (Recommended for Service/Condition)
      if ((urlPath.includes('/services/') || urlPath.includes('/conditions/')) && !hasFAQ) {
         issues.push({ url: urlPath, issue: 'Missing FAQPage Schema (Opportunity)' });
      }

    } catch (err) {
      console.error(err);
    }
  }

  fs.writeFileSync(OUTPUT_JSON, JSON.stringify(inventory, null, 2));

  const csvContent = 'URL,Issue\n' + issues.map(i => `${i.url},${i.issue}`).join('\n');
  fs.writeFileSync(OUTPUT_CSV, csvContent);

  // YMYL Gaps
  let ymylContent = '# YMYL Gap Analysis\n\n';
  issues.forEach(i => {
    ymylContent += `- [ ] **${i.url}**: ${i.issue}\n`;
  });
  if (issues.length === 0) ymylContent += "No critical schema gaps found in sample.";
  fs.writeFileSync(YMYL_GAP, ymylContent);

  console.log('Schema Audit Complete.');
}

run();
