const fs = require('fs');
const path = require('path');

const CRAWL_FILE = path.join(__dirname, '../crawl/url_inventory.json');
const OUTPUT_DIR = path.join(__dirname, '../onpage');

if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

function analyze() {
  if (!fs.existsSync(CRAWL_FILE)) {
    console.error('❌ Crawl file not found. Run crawl first.');
    return;
  }

  const urls = JSON.parse(fs.readFileSync(CRAWL_FILE, 'utf8'));
  const issues = [];
  const titleCounts = {};
  const h1Counts = {};

  urls.forEach(url => {
    // 1. Missing Title
    if (!url.title) {
      issues.push({ url: url.url, type: 'missing_title', severity: 'HIGH', fix: 'Add unique title tag' });
    } else {
      titleCounts[url.title] = (titleCounts[url.title] || 0) + 1;
      if (url.title.length > 60) issues.push({ url: url.url, type: 'title_too_long', severity: 'MED', fix: 'Shorten title < 60 chars' });
      if (url.title.length < 30) issues.push({ url: url.url, type: 'title_too_short', severity: 'LOW', fix: 'Add keywords to title' });
    }

    // 2. Missing/Duplicate H1
    if (!url.h1) {
      issues.push({ url: url.url, type: 'missing_h1', severity: 'HIGH', fix: 'Add H1 tag' });
    } else {
      h1Counts[url.h1] = (h1Counts[url.h1] || 0) + 1;
    }

    // 3. Meta Description
    if (!url.metaDescription) {
      issues.push({ url: url.url, type: 'missing_meta_desc', severity: 'HIGH', fix: 'Add meta description' });
    } else {
        if (url.metaDescription.length > 160) issues.push({ url: url.url, type: 'meta_desc_too_long', severity: 'LOW', fix: 'Shorten meta desc < 160 chars' });
        if (url.metaDescription.length < 50) issues.push({ url: url.url, type: 'meta_desc_too_short', severity: 'LOW', fix: 'Expand meta desc' });
    }

    // 4. Thin Content
    if (url.wordCount < 300 && url.templateType !== 'other') {
      issues.push({ url: url.url, type: 'thin_content', severity: 'MED', fix: 'Add more content (>300 words)' });
    }

    // 5. Canonical
    if (!url.canonical) {
        issues.push({ url: url.url, type: 'missing_canonical', severity: 'HIGH', fix: 'Add self-referencing canonical' });
    }
  });

  // Cannibalization Check
  const duplicateTitles = Object.entries(titleCounts).filter(([_, count]) => count > 1).map(([title]) => title);
  const duplicateH1s = Object.entries(h1Counts).filter(([_, count]) => count > 1).map(([h1]) => h1);

  // Write Issues CSV
  const csv = 'url,issue_type,severity,recommended_fix\n' +
    issues.map(i => `${i.url},${i.type},${i.severity},"${i.fix}"`).join('\n');
  fs.writeFileSync(path.join(OUTPUT_DIR, 'onpage_issues.csv'), csv);

  // Write Cannibalization Report
  let clusterReport = '# Cannibalization & Duplication Clusters\n\n## Duplicate Titles\n';
  duplicateTitles.forEach(title => {
      const affected = urls.filter(u => u.title === title).map(u => u.url);
      clusterReport += `- **"${title}"** (${affected.length} pages)\n${affected.map(u => `  - ${u}`).join('\n')}\n`;
  });

  clusterReport += '\n## Duplicate H1s\n';
  duplicateH1s.forEach(h1 => {
      const affected = urls.filter(u => u.h1 === h1).map(u => u.url);
      clusterReport += `- **"${h1}"** (${affected.length} pages)\n${affected.map(u => `  - ${u}`).join('\n')}\n`;
  });

  fs.writeFileSync(path.join(OUTPUT_DIR, 'cannibalization_clusters.md'), clusterReport);

  console.log('✅ On-Page analysis complete.');
}

analyze();
