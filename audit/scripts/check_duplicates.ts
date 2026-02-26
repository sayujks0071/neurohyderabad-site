import fs from 'fs';
import path from 'path';

const resultsPath = path.join(process.cwd(), 'audit', 'crawl', 'crawl_results.json');
const results = JSON.parse(fs.readFileSync(resultsPath, 'utf8'));

const titleMap = new Map();
const descMap = new Map();
const h1Map = new Map();

results.forEach((r: any) => {
  if (r.status !== 200) return;

  if (r.title) {
    if (!titleMap.has(r.title)) titleMap.set(r.title, []);
    titleMap.get(r.title).push(r.url);
  }

  if (r.metaDescription) {
    if (!descMap.has(r.metaDescription)) descMap.set(r.metaDescription, []);
    descMap.get(r.metaDescription).push(r.url);
  }

  if (r.h1) {
    if (!h1Map.has(r.h1)) h1Map.set(r.h1, []);
    h1Map.get(r.h1).push(r.url);
  }
});

let report = '# Duplicate Content Report\n\n';

report += '## Duplicate Titles\n';
titleMap.forEach((urls, title) => {
  if (urls.length > 1) {
    report += `- **${title}** (${urls.length})\n`;
    urls.forEach((u: string) => report += `  - ${u}\n`);
  }
});

report += '\n## Duplicate Descriptions\n';
descMap.forEach((urls, desc) => {
  if (urls.length > 1) {
    report += `- **${desc}** (${urls.length})\n`;
    urls.forEach((u: string) => report += `  - ${u}\n`);
  }
});

report += '\n## Duplicate H1s\n';
h1Map.forEach((urls, h1) => {
  if (urls.length > 1) {
    report += `- **${h1}** (${urls.length})\n`;
    urls.forEach((u: string) => report += `  - ${u}\n`);
  }
});

fs.writeFileSync(path.join(process.cwd(), 'audit', 'onpage', 'duplicates.md'), report);
console.log('Duplicates report generated.');
