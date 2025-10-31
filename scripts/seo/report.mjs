#!/usr/bin/env node

/**
 * SEO Report Generator
 * Generates markdown reports from audit JSON files
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const REPORTS_DIR = path.join(__dirname, '../../reports/seo');
const DATE = new Date().toISOString().split('T')[0];

// Find latest audit file
const auditFiles = fs.existsSync(REPORTS_DIR)
  ? fs.readdirSync(REPORTS_DIR)
      .filter(f => f.endsWith('.json'))
      .sort()
      .reverse()
  : [];

if (auditFiles.length === 0) {
  console.error('? No audit files found. Run seo:audit first.');
  process.exit(1);
}

const latestAuditFile = path.join(REPORTS_DIR, auditFiles[0]);
const audit = JSON.parse(fs.readFileSync(latestAuditFile, 'utf-8'));

// Generate markdown report
const report = `# SEO Audit Report - ${audit.date}

**Generated:** ${audit.timestamp}  
**Site:** ${audit.siteUrl}

## Summary

- **Total Checks:** ${Object.keys(audit.checks).length}
- **Passed:** ${Object.values(audit.checks).filter(c => c.passed).length}
- **Failed:** ${Object.values(audit.checks).filter(c => !c.passed).length}
- **Issues Found:** ${audit.issues.length}

## Check Results

${Object.entries(audit.checks)
  .map(([key, check]) => {
    const status = check.passed ? '?' : '?';
    return `### ${status} ${key.charAt(0).toUpperCase() + key.slice(1)}`;
  })
  .join('\n\n')}

## Issues

${audit.issues.length === 0
  ? '? No issues found!'
  : audit.issues
      .map(
        (issue, idx) =>
          `### ${idx + 1}. [${issue.level.toUpperCase()}] ${issue.type}\n\n${issue.message}`
      )
      .join('\n\n')}

## Recommendations

${audit.recommendations.length === 0
  ? 'No specific recommendations at this time.'
  : audit.recommendations.map((rec, idx) => `${idx + 1}. ${rec}`).join('\n')}

---

*Report generated automatically by SEO audit bot*
`;

// Save report
const reportFile = path.join(REPORTS_DIR, `${audit.date}.md`);
fs.writeFileSync(reportFile, report);

console.log(`? SEO report generated: ${reportFile}`);
console.log(`   Issues: ${audit.issues.length}`);
console.log(`   Checks passed: ${Object.values(audit.checks).filter(c => c.passed).length}/${Object.keys(audit.checks).length}`);
