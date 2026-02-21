
const fs = require('fs');
const path = require('path');

const reportDir = path.join(process.cwd(), 'audit', 'lighthouse');
const summaryPath = path.join(reportDir, 'summary.md');

const files = fs.readdirSync(reportDir).filter(f => f.endsWith('.json') && f.startsWith('lhr-'));

let summary = '# Lighthouse Audit Summary\n\n';

files.forEach(file => {
  const content = fs.readFileSync(path.join(reportDir, file), 'utf-8');
  const json = JSON.parse(content);
  const url = json.finalUrl;

  summary += `## ${url}\n`;
  summary += `**Performance:** ${json.categories.performance.score * 100}\n`;
  summary += `**Accessibility:** ${json.categories.accessibility.score * 100}\n`;
  summary += `**Best Practices:** ${json.categories['best-practices'].score * 100}\n`;
  summary += `**SEO:** ${json.categories.seo.score * 100}\n\n`;

  summary += '### Key Issues\n';

  const audits = json.audits;
  const failedAudits = Object.values(audits).filter(a => (a.score !== null && a.score < 0.9) || (a.scoreDisplayMode === 'error'));

  // Sort by score ascending
  failedAudits.sort((a, b) => (a.score || 0) - (b.score || 0));

  failedAudits.slice(0, 10).forEach(audit => {
    summary += `- **${audit.title}** (${audit.score}): ${audit.displayValue || ''}\n`;
  });
  summary += '\n---\n\n';
});

fs.writeFileSync(summaryPath, summary);
console.log('Summary generated at', summaryPath);
