
import fs from 'fs';
import path from 'path';

const CRAWL_FILE = path.join(process.cwd(), 'audit/crawl/url_inventory.json');
const OUT_DIR_ONPAGE = path.join(process.cwd(), 'audit/onpage');
const OUT_DIR_TECH = path.join(process.cwd(), 'audit/tech');
const OUT_DIR_SCHEMA = path.join(process.cwd(), 'audit/schema');

if (!fs.existsSync(OUT_DIR_ONPAGE)) fs.mkdirSync(OUT_DIR_ONPAGE, { recursive: true });
if (!fs.existsSync(OUT_DIR_TECH)) fs.mkdirSync(OUT_DIR_TECH, { recursive: true });
if (!fs.existsSync(OUT_DIR_SCHEMA)) fs.mkdirSync(OUT_DIR_SCHEMA, { recursive: true });

interface PageData {
  url: string;
  status: number;
  title: string;
  description: string;
  h1: string;
  wordCount: number;
  canonical: string;
  robots: string;
  schemaTypes: string[];
}

function analyze() {
  if (!fs.existsSync(CRAWL_FILE)) {
    console.error("Crawl file not found.");
    return;
  }

  const data: PageData[] = JSON.parse(fs.readFileSync(CRAWL_FILE, 'utf-8'));

  const onpageIssues: any[] = [];
  const techIssues: any[] = [];
  const schemaInventory: any[] = [];

  const titleMap = new Map<string, string[]>();

  data.forEach(page => {
    // Tech Issues
    if (page.status !== 200) {
      techIssues.push({ url: page.url, issue: `Status ${page.status}`, severity: 'High' });
    }

    // Canonical Check
    // Approximate check: if canonical is present, it should ideally match the full URL or be the canonical version
    if (page.status === 200 && !page.canonical) {
       techIssues.push({ url: page.url, issue: 'Missing Canonical', severity: 'Medium' });
    }

    // OnPage Issues
    if (page.status === 200) {
      if (!page.title) {
        onpageIssues.push({ url: page.url, issue: 'Missing Title', severity: 'High' });
      } else {
        if (page.title.length < 10) onpageIssues.push({ url: page.url, issue: 'Title too short', severity: 'Low' });
        if (page.title.length > 70) onpageIssues.push({ url: page.url, issue: 'Title too long', severity: 'Medium' });

        const normTitle = page.title.toLowerCase().trim();
        if (!titleMap.has(normTitle)) titleMap.set(normTitle, []);
        titleMap.get(normTitle)?.push(page.url);
      }

      if (!page.description) {
        onpageIssues.push({ url: page.url, issue: 'Missing Description', severity: 'High' });
      } else {
        if (page.description.length < 50) onpageIssues.push({ url: page.url, issue: 'Description too short', severity: 'Low' });
        if (page.description.length > 170) onpageIssues.push({ url: page.url, issue: 'Description too long', severity: 'Medium' });
      }

      if (!page.h1) {
        onpageIssues.push({ url: page.url, issue: 'Missing H1', severity: 'High' });
      }

      if (page.wordCount < 200) {
         onpageIssues.push({ url: page.url, issue: 'Thin Content (<200 words)', severity: 'Medium' });
      }
    }

    // Schema
    schemaInventory.push({ url: page.url, types: page.schemaTypes });
    if (page.status === 200 && (!page.schemaTypes || page.schemaTypes.length === 0)) {
        // Some pages might not need schema, but most should have Breadcrumb or WebSite
        // onpageIssues.push({ url: page.url, issue: 'Missing Schema', severity: 'Low' });
    }
  });

  // Check duplicates
  titleMap.forEach((urls, title) => {
    if (urls.length > 1) {
      urls.forEach(u => {
        onpageIssues.push({ url: u, issue: `Duplicate Title: ${urls.length} pages share this title`, severity: 'High' });
      });
    }
  });

  // Write OnPage CSV
  const onpageHeader = 'url,issue,severity\n';
  const onpageCsv = onpageIssues.map(i => `"${i.url}","${i.issue}","${i.severity}"`).join('\n');
  fs.writeFileSync(path.join(OUT_DIR_ONPAGE, 'onpage_issues.csv'), onpageHeader + onpageCsv);

  // Write Tech CSV
  const techHeader = 'url,issue,severity\n';
  const techCsv = techIssues.map(i => `"${i.url}","${i.issue}","${i.severity}"`).join('\n');
  fs.writeFileSync(path.join(OUT_DIR_TECH, 'tech_issues.csv'), techHeader + techCsv);

  // Write Schema JSON
  fs.writeFileSync(path.join(OUT_DIR_SCHEMA, 'schema_inventory.json'), JSON.stringify(schemaInventory, null, 2));

  console.log(`Analysis complete. Found ${onpageIssues.length} on-page issues and ${techIssues.length} tech issues.`);
}

analyze();
