
import fs from 'fs';
import path from 'path';
import { JSDOM } from 'jsdom';

const OUTPUT_DIR = path.join(process.cwd(), 'audit', 'onpage');
const SCHEMA_DIR = path.join(process.cwd(), 'audit', 'schema');
const TECH_DIR = path.join(process.cwd(), 'audit', 'tech');

const BASE_URL = 'http://localhost:3000';

const URLS_TO_CHECK = [
  '/',
  '/services/endoscopic-spine-surgery-hyderabad',
  '/conditions/sciatica-pain-treatment-hyderabad',
  '/neurosurgeon-banjara-hills',
  '/appointments'
];

async function fetchHtml(url: string) {
  try {
    const res = await fetch(BASE_URL + url);
    if (!res.ok) throw new Error(`Failed to fetch ${url}: ${res.status}`);
    return await res.text();
  } catch (error) {
    console.error(error);
    return null;
  }
}

async function main() {
  const onpageIssues: any[] = [];
  const schemaInventory: any = {};
  const techIssues: any[] = [];

  for (const url of URLS_TO_CHECK) {
    console.log(`Analyzing ${url}...`);
    const html = await fetchHtml(url);
    if (!html) {
      techIssues.push({ url, issue: 'Fetch Failed', severity: 'Critical' });
      continue;
    }

    const dom = new JSDOM(html);
    const doc = dom.window.document;

    // 1. Metadata
    const title = doc.querySelector('title')?.textContent || '';
    const desc = doc.querySelector('meta[name="description"]')?.getAttribute('content') || '';
    const canonical = doc.querySelector('link[rel="canonical"]')?.getAttribute('href') || '';
    const robots = doc.querySelector('meta[name="robots"]')?.getAttribute('content') || '';

    if (!title) onpageIssues.push({ url, issue: 'Missing Title', severity: 'High' });
    else if (title.length < 30 || title.length > 65) onpageIssues.push({ url, issue: 'Title Length', severity: 'Medium', details: `${title.length} chars` });

    if (!desc) onpageIssues.push({ url, issue: 'Missing Meta Description', severity: 'High' });
    else if (desc.length < 120 || desc.length > 160) onpageIssues.push({ url, issue: 'Meta Description Length', severity: 'Low', details: `${desc.length} chars` });

    if (!canonical) onpageIssues.push({ url, issue: 'Missing Canonical', severity: 'Medium' });

    // 2. Headings
    const h1s = Array.from(doc.querySelectorAll('h1')).map(h => h.textContent?.trim());
    if (h1s.length === 0) onpageIssues.push({ url, issue: 'Missing H1', severity: 'High' });
    else if (h1s.length > 1) onpageIssues.push({ url, issue: 'Multiple H1s', severity: 'Medium', details: h1s.join(' | ') });

    // 3. Schema
    const schemas: any[] = [];
    const scriptTags = Array.from(doc.querySelectorAll('script[type="application/ld+json"]'));
    scriptTags.forEach(script => {
      try {
        const json = JSON.parse(script.textContent || '{}');
        schemas.push(json);
      } catch (e) {
        onpageIssues.push({ url, issue: 'Invalid JSON-LD', severity: 'High' });
      }
    });
    schemaInventory[url] = schemas;

    // 4. Links
    const links = Array.from(doc.querySelectorAll('a'));
    const internalLinks = links.filter(a => a.href.startsWith('/') || a.href.includes('localhost'));
    if (internalLinks.length < 5) onpageIssues.push({ url, issue: 'Low Internal Linking', severity: 'Medium', details: `${internalLinks.length} links` });

    // 5. Images
    const images = Array.from(doc.querySelectorAll('img'));
    const missingAlt = images.filter(img => !img.alt);
    if (missingAlt.length > 0) onpageIssues.push({ url, issue: 'Missing Alt Text', severity: 'Low', details: `${missingAlt.length} images` });
  }

  // Save outputs
  fs.writeFileSync(path.join(OUTPUT_DIR, 'onpage_issues.csv'),
    'URL,Issue,Severity,Details\n' + onpageIssues.map(i => `${i.url},${i.issue},${i.severity},"${i.details || ''}"`).join('\n')
  );

  fs.writeFileSync(path.join(SCHEMA_DIR, 'schema_inventory.json'), JSON.stringify(schemaInventory, null, 2));

  fs.writeFileSync(path.join(TECH_DIR, 'tech_issues.csv'),
    'URL,Issue,Severity\n' + techIssues.map(i => `${i.url},${i.issue},${i.severity}`).join('\n')
  );

  console.log('On-page audit complete.');
}

main().catch(console.error);
