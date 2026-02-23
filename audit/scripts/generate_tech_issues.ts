import fs from 'fs';
import path from 'path';

const issues = [];

// 1. Check for 404s
const crawlResults = JSON.parse(fs.readFileSync('audit/crawl/crawl_results.json', 'utf8'));
crawlResults.forEach((r: any) => {
  if (r.status === 404) {
    issues.push({
      url: r.url,
      issue_type: '404 Not Found',
      severity: 'High',
      fix: 'Check if content exists, restore or redirect.'
    });
  }
});

// 2. Check for redirect chains (simplified)
crawlResults.forEach((r: any) => {
    // If redirected is true, check if finalUrl is different from requested url
    // and if status is not 200 (which means it's a redirect response captured, or final response)
    // Actually my crawl script captures finalUrl.
    if (r.redirected && r.url !== r.finalUrl) {
         issues.push({
            url: r.url,
            issue_type: 'Redirect',
            severity: 'Low',
            fix: `Update internal link to ${r.finalUrl}`
         });
    }
});


// 3. Check for duplicates (from report)
// I'll parse the duplicates.md if I want, or just re-run logic.
// The duplicates.md showed only Disclaimer duplicates, which is low priority.

// 4. Check for Robots/Sitemap (manual check)
// Robots.txt looked fine. Sitemap looked fine.

// 5. Check for dynamicParams issue (manual check)
issues.push({
    url: '/blog/[slug]',
    issue_type: 'Configuration',
    severity: 'High',
    fix: 'Set dynamicParams = true to allow new blog posts to render via ISR.'
});

const csvHeader = 'url,issue_type,severity,fix\n';
const csvBody = issues.map(i => `"${i.url}","${i.issue_type}","${i.severity}","${i.fix}"`).join('\n');

fs.writeFileSync(path.join(process.cwd(), 'audit', 'tech', 'tech_issues.csv'), csvHeader + csvBody);
console.log('Tech issues CSV generated.');
