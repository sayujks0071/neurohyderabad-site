
import fs from 'fs';

const inventory = JSON.parse(fs.readFileSync('audit/crawl/url_inventory.json', 'utf-8'));

const counts: Record<string, number> = {};
let missingFiles = 0;

inventory.forEach((item: any) => {
  counts[item.type] = (counts[item.type] || 0) + 1;
  if (item.status.startsWith('404')) missingFiles++;
});

const summary = `
# Crawl Summary

**Total URLs:** ${inventory.length}
**Generated:** ${new Date().toISOString()}

## Page Types
${Object.entries(counts).map(([type, count]) => `- **${type}:** ${count}`).join('\n')}

## Issues
- **Missing Files (404):** ${missingFiles}

${missingFiles > 0 ? '\n## Missing Files List\n' + inventory.filter((i: any) => i.status.startsWith('404')).map((i: any) => `- ${i.path}`).join('\n') : ''}
`;

fs.writeFileSync('audit/crawl/crawl_summary.md', summary);
console.log('Summary generated.');
