const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');

const OUTPUT_DIR = path.join(__dirname, '../lighthouse');
const SITE_URL = 'http://localhost:3000';

const URLS = [
  '/',
  '/services/endoscopic-spine-surgery-hyderabad',
  '/services/microdiscectomy-surgery-hyderabad',
  '/services/brain-tumor-surgery-hyderabad',
  '/conditions/sciatica-pain-treatment-hyderabad',
  '/conditions/brain-tumor-surgery-hyderabad',
  '/conditions/slip-disc-treatment-hyderabad',
  '/locations/malakpet',
  '/locations/banjara-hills',
  '/blog/spinal-stenosis-vs-pad-leg-pain-guide' // Update if 404
];

if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

const lhciConfig = {
  ci: {
    collect: {
      url: URLS.map(u => `${SITE_URL}${u}`),
      numberOfRuns: 1,
      settings: {
        chromeFlags: "--no-sandbox --headless --disable-gpu",
        onlyCategories: ["performance", "accessibility", "best-practices", "seo"],
        skipAudits: ["uses-http2"], // Localhost doesn't use HTTP2
      }
    },
    upload: {
      target: 'filesystem',
      outputDir: OUTPUT_DIR,
      reportFilenamePattern: '%%PATHNAME%%-%%DATETIME%%.report.html'
    }
  }
};

const configPath = path.join(OUTPUT_DIR, 'lighthouserc.json');
fs.writeFileSync(configPath, JSON.stringify(lhciConfig, null, 2));

console.log('🚀 Starting Lighthouse audit...');
exec(`npx lhci autorun --config=${configPath}`, (error, stdout, stderr) => {
  if (error) {
    console.warn(`⚠️ Lighthouse finished with some errors (expected for threshold failures): ${error.message}`);
  }
  console.log(stdout);
  console.log(stderr);
  console.log('✅ Lighthouse audit complete.');
});
