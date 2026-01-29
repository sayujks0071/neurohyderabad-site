
import fs from 'fs';
import path from 'path';

const inventory = JSON.parse(fs.readFileSync('audit/crawl/url_inventory.json', 'utf-8'));
const issues = [];
const clusters = {};

// Helper to extract string between delimiters
function extract(content, startStr, endStr) {
  const start = content.indexOf(startStr);
  if (start === -1) return null;
  const end = content.indexOf(endStr, start + startStr.length);
  if (end === -1) return null;
  return content.substring(start + startStr.length, end).trim();
}

function analyzeFile(entry) {
  const filePath = entry.filePath;
  if (!filePath || filePath === 'UNKNOWN' || !fs.existsSync(filePath)) {
    return { title: null, description: null, h1: null, canonical: null, isDynamic: false };
  }

  const content = fs.readFileSync(filePath, 'utf-8');
  let title = null;
  let description = null;
  let h1 = null;
  let canonical = null;
  let isDynamic = false;

  // 1. Check for Dynamic Metadata
  if (content.includes('generateMetadata')) {
    isDynamic = true;
  }

  // 2. Extract Static Metadata (Page.tsx)
  if (filePath.endsWith('.tsx')) {
    // Very naive regex for static metadata
    const titleMatch = content.match(/title:\s*['"`](.*?)['"`]/);
    if (titleMatch) title = titleMatch[1];

    const descMatch = content.match(/description:\s*['"`](.*?)['"`]/);
    if (descMatch) description = descMatch[1];

    // Canonical often in alternates
    const canonicalMatch = content.match(/canonical:\s*['"`](.*?)['"`]/);
    if (canonicalMatch) canonical = canonicalMatch[1];

    // H1 check (JSX)
    const h1Match = content.match(/<h1[^>]*>([\s\S]*?)<\/h1>/);
    if (h1Match) {
       // Strip inner tags if any
       h1 = h1Match[1].replace(/<[^>]*>/g, '').trim();
    }
  }

  // 3. Extract Frontmatter (MDX)
  if (filePath.endsWith('.mdx')) {
    // Frontmatter
    const fmMatch = content.match(/^---\n([\s\S]*?)\n---/);
    if (fmMatch) {
      const fm = fmMatch[1];
      const titleMatch = fm.match(/title:\s*(.*)/);
      if (titleMatch) title = titleMatch[1].replace(/^['"]|['"]$/g, '').trim();

      const descMatch = fm.match(/description:\s*(.*)/);
      if (descMatch) description = descMatch[1].replace(/^['"]|['"]$/g, '').trim();
    }

    // H1 in MDX is often title in frontmatter, OR # Header
    if (!h1) {
        const hashMatch = content.match(/\n# (.*)/);
        if (hashMatch) h1 = hashMatch[1].trim();
        else if (title) h1 = title; // Fallback for MDX
    }
  }

  return { title, description, h1, canonical, isDynamic };
}

console.log('Starting On-Page Audit...');

const processed = [];

inventory.forEach(entry => {
  const data = analyzeFile(entry);

  // Validation Logic
  const msgs = [];

  if (data.isDynamic) {
    // Skip strict checks for dynamic pages unless we can simulate them
    // But we can check if they have a template structure
  } else {
      if (!data.title && !entry.filePath.includes('[slug]')) msgs.push({ type: 'missing_title', severity: 'High' });
      if (!data.description && !entry.filePath.includes('[slug]')) msgs.push({ type: 'missing_description', severity: 'High' });
      if (!data.h1 && !entry.filePath.includes('[slug]')) msgs.push({ type: 'missing_h1', severity: 'Medium' });

      if (data.title && data.title.length < 30) msgs.push({ type: 'short_title', severity: 'Low' });
      if (data.title && data.title.length > 70) msgs.push({ type: 'long_title', severity: 'Medium' }); // 60 is standard, 70 max

      if (data.description && data.description.length < 50) msgs.push({ type: 'short_description', severity: 'Low' });
      if (data.description && data.description.length > 160) msgs.push({ type: 'long_description', severity: 'Medium' });
  }

  msgs.forEach(m => {
    issues.push({
      url: entry.url,
      issue_type: m.type,
      severity: m.severity,
      fix: 'Update content'
    });
  });

  // Cannibalization Check Data
  if (data.title) {
    // Normalize title
    const norm = data.title.toLowerCase().replace(/[^\w\s]/g, '');
    if (!clusters[norm]) clusters[norm] = [];
    clusters[norm].push(entry.url);
  }
});

// Write CSV
const csv = 'url,issue_type,severity,recommended_fix\n' +
  issues.map(i => `${i.url},${i.issue_type},${i.severity},${i.fix}`).join('\n');
fs.writeFileSync('audit/onpage/onpage_issues.csv', csv);

// Write Cannibalization
const clusterMd = Object.entries(clusters)
  .filter(([_, urls]) => urls.length > 1)
  .map(([title, urls]) => `### "${title}"\n${urls.map(u => `- ${u}`).join('\n')}`)
  .join('\n\n');

fs.writeFileSync('audit/onpage/cannibalization_clusters.md', '# Potential Keyword Cannibalization (Title Clashes)\n\n' + (clusterMd || 'None detected.'));

console.log(`Audit complete. ${issues.length} issues found.`);
