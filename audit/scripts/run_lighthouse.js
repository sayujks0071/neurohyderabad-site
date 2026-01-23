const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const urls = [
  { url: 'http://localhost:3000/', name: 'home' },
  { url: 'http://localhost:3000/services/endoscopic-spine-surgery-hyderabad', name: 'service' },
  { url: 'http://localhost:3000/conditions/sciatica-pain-treatment-hyderabad', name: 'condition' },
  { url: 'http://localhost:3000/neurosurgeon-malakpet', name: 'location' },
  { url: 'http://localhost:3000/blog/sciatica-pain-relief-exercises-hyderabad', name: 'blog' }
];

const outputDir = 'audit/lighthouse';
if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true });

urls.forEach(({ url, name }) => {
  console.log(`Running Lighthouse for ${name} (${url})...`);
  try {
    execSync(`npx lighthouse "${url}" --output json --output html --output-path "${outputDir}/${name}" --chrome-flags="--headless --no-sandbox" --only-categories=performance,accessibility,best-practices,seo`, { stdio: 'inherit' });
    console.log(`Done for ${name}`);
  } catch (e) {
    console.error(`Failed for ${name}:`, e.message);
  }
});
