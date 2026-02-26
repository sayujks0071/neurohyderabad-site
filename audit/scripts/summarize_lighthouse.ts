import fs from 'fs';
import path from 'path';

const lighthouseDir = path.join(process.cwd(), 'audit', 'lighthouse');
const files = fs.readdirSync(lighthouseDir).filter(f => f.endsWith('.report.json'));

let summary = '# Lighthouse Summary\n\n';
summary += '| Page | Performance | Accessibility | Best Practices | SEO | LCP | CLS | TBT |\n';
summary += '|---|---|---|---|---|---|---|---|\n';

files.forEach(file => {
  const filePath = path.join(lighthouseDir, file);
  try {
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    const name = file.replace('.report.json', '');

    // Check if categories exist (sometimes they are null if run failed partially)
    const perf = data.categories?.performance?.score ? Math.round(data.categories.performance.score * 100) : '-';
    const a11y = data.categories?.accessibility?.score ? Math.round(data.categories.accessibility.score * 100) : '-';
    const bp = data.categories?.['best-practices']?.score ? Math.round(data.categories['best-practices'].score * 100) : '-';
    const seo = data.categories?.seo?.score ? Math.round(data.categories.seo.score * 100) : '-';

    const lcp = data.audits?.['largest-contentful-paint']?.displayValue || '-';
    const cls = data.audits?.['cumulative-layout-shift']?.displayValue || '-';
    const tbt = data.audits?.['total-blocking-time']?.displayValue || '-';

    summary += `| ${name} | ${perf} | ${a11y} | ${bp} | ${seo} | ${lcp} | ${cls} | ${tbt} |\n`;
  } catch (e) {
    console.error(`Error parsing ${file}:`, e);
  }
});

summary += '\n\n## Key Issues\n';
summary += 'Check individual HTML reports for details.\n';

fs.writeFileSync(path.join(lighthouseDir, 'summary.md'), summary);
console.log('Lighthouse summary generated at audit/lighthouse/summary.md');
