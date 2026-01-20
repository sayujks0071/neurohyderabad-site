const fs = require('fs');
const path = require('path');
const http = require('http');
const { JSDOM } = require('jsdom');

const URLs = [
  '/',
  '/services/endoscopic-spine-surgery-hyderabad',
  '/conditions/sciatica-pain-treatment-hyderabad',
  '/locations/malakpet',
  '/blog/sciatica-pain-management-hyderabad',
  '/about',
  '/contact',
  '/services/brain-tumor-surgery-hyderabad',
  '/conditions/trigeminal-neuralgia-treatment-hyderabad',
  '/neurosurgeon-hyderabad'
];

const OUTPUT_FILE = path.join(__dirname, '../audit/onpage/onpage_issues.csv');
const CLUSTER_FILE = path.join(__dirname, '../audit/onpage/cannibalization_clusters.md');

if (!fs.existsSync(path.dirname(OUTPUT_FILE))) {
  fs.mkdirSync(path.dirname(OUTPUT_FILE), { recursive: true });
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
  const issues = [];
  const pageData = [];

  console.log('Starting On-Page Audit...');

  for (const urlPath of URLs) {
    try {
      console.log(`Analyzing ${urlPath}...`);
      const html = await fetchPage(urlPath);
      const dom = new JSDOM(html);
      const doc = dom.window.document;

      const title = doc.querySelector('title')?.textContent || '';
      const metaDesc = doc.querySelector('meta[name="description"]')?.content || '';
      const h1 = doc.querySelector('h1')?.textContent?.trim() || '';
      const h2s = Array.from(doc.querySelectorAll('h2')).map(el => el.textContent.trim());
      const canonical = doc.querySelector('link[rel="canonical"]')?.href || '';

      pageData.push({ urlPath, title, h1 });

      // Checks
      if (!title) issues.push({ url: urlPath, type: 'Missing Title', severity: 'High', fix: 'Add title in Metadata' });
      else if (title.length < 30) issues.push({ url: urlPath, type: 'Short Title', severity: 'Low', fix: 'Expand title' });
      else if (title.length > 65) issues.push({ url: urlPath, type: 'Long Title', severity: 'Medium', fix: 'Shorten title' });

      if (!metaDesc) issues.push({ url: urlPath, type: 'Missing Meta Description', severity: 'High', fix: 'Add description in Metadata' });
      else if (metaDesc.length < 100) issues.push({ url: urlPath, type: 'Short Meta Desc', severity: 'Low', fix: 'Expand description' });
      else if (metaDesc.length > 170) issues.push({ url: urlPath, type: 'Long Meta Desc', severity: 'Medium', fix: 'Shorten description' });

      const h1Count = doc.querySelectorAll('h1').length;
      if (h1Count === 0) issues.push({ url: urlPath, type: 'Missing H1', severity: 'High', fix: 'Add H1 tag' });
      if (h1Count > 1) issues.push({ url: urlPath, type: 'Multiple H1', severity: 'Medium', fix: 'Ensure only one H1' });

      if (!canonical) issues.push({ url: urlPath, type: 'Missing Canonical', severity: 'High', fix: 'Add canonical URL' });

    } catch (err) {
      console.error(`Failed to analyze ${urlPath}:`, err);
    }
  }

  // Save CSV
  const csvContent = 'URL,Issue Type,Severity,Recommended Fix\n' +
    issues.map(i => `${i.url},${i.type},${i.severity},${i.fix}`).join('\n');
  fs.writeFileSync(OUTPUT_FILE, csvContent);

  // Check Cannibalization (Similarity)
  let clusters = '# Cannibalization Clusters\n\n';
  // Simple check for duplicate titles or H1s
  const titleMap = {};
  pageData.forEach(p => {
    if (!titleMap[p.title]) titleMap[p.title] = [];
    titleMap[p.title].push(p.urlPath);
  });

  for (const [t, urls] of Object.entries(titleMap)) {
    if (urls.length > 1) {
      clusters += `### Duplicate Title: "${t}"\n- ${urls.join('\n- ')}\n\n`;
    }
  }

  fs.writeFileSync(CLUSTER_FILE, clusters);
  console.log('On-Page Audit Complete.');
}

run();
