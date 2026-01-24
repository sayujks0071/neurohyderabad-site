
const fs = require('fs');
const path = require('path');

const DIR = path.join(process.cwd(), 'audit', 'lighthouse');
const files = fs.readdirSync(DIR).filter(f => f.endsWith('.json'));

let summary = '# Lighthouse Lab Audit Summary\n\n| Page | Perf | Acc | BP | SEO | LCP | TBT | CLS |\n|---|---|---|---|---|---|---|---|\n';

files.forEach(file => {
  const name = file.replace('.json', '');
  const content = JSON.parse(fs.readFileSync(path.join(DIR, file), 'utf8'));
  const c = content.categories;
  const a = content.audits;

  const perf = c.performance ? Math.round(c.performance.score * 100) : '-';
  const acc = c.accessibility ? Math.round(c.accessibility.score * 100) : '-';
  const bp = c['best-practices'] ? Math.round(c['best-practices'].score * 100) : '-';
  const seo = c.seo ? Math.round(c.seo.score * 100) : '-';

  const lcp = a['largest-contentful-paint'] ? a['largest-contentful-paint'].displayValue : '-';
  const tbt = a['total-blocking-time'] ? a['total-blocking-time'].displayValue : '-';
  const cls = a['cumulative-layout-shift'] ? a['cumulative-layout-shift'].displayValue : '-';

  summary += `| ${name} | ${perf} | ${acc} | ${bp} | ${seo} | ${lcp} | ${tbt} | ${cls} |\n`;
});

fs.writeFileSync(path.join(DIR, 'summary.md'), summary);
console.log('Summary generated at audit/lighthouse/summary.md');
