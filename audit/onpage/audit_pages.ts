
import fs from 'fs';
import path from 'path';
import axios from 'axios';
import { JSDOM } from 'jsdom';

const AUDIT_DIR = path.join(process.cwd(), 'audit');
const ONPAGE_DIR = path.join(AUDIT_DIR, 'onpage');
const TECH_DIR = path.join(AUDIT_DIR, 'tech');
const SCHEMA_DIR = path.join(AUDIT_DIR, 'schema'); // Preparing for next step

if (!fs.existsSync(ONPAGE_DIR)) fs.mkdirSync(ONPAGE_DIR, { recursive: true });
if (!fs.existsSync(TECH_DIR)) fs.mkdirSync(TECH_DIR, { recursive: true });
if (!fs.existsSync(SCHEMA_DIR)) fs.mkdirSync(SCHEMA_DIR, { recursive: true });

async function runAudit() {
  // Load Inventory
  const inventoryPath = path.join(AUDIT_DIR, 'crawl', 'url_inventory.json');
  if (!fs.existsSync(inventoryPath)) {
    console.error('Inventory not found!');
    process.exit(1);
  }
  const inventory = JSON.parse(fs.readFileSync(inventoryPath, 'utf8'));
  let urls = inventory.sitemap;

  // Limit to top 20 for this run to be fast, prioritizing different types
  // Mix: 1 Home, 5 Services, 5 Conditions, 5 Locations, 4 Blogs
  const targetUrls: string[] = [];
  const add = (filter: (u: string) => boolean, count: number) => {
    const matches = urls.filter(filter);
    targetUrls.push(...matches.slice(0, count));
  };

  add(u => u === 'http://localhost:3000/', 1);
  add(u => u.includes('/services/'), 5);
  add(u => u.includes('/conditions/'), 5);
  add(u => u.includes('/locations/') || u.includes('/neurosurgeon-'), 5);
  add(u => u.includes('/blog/'), 5);

  const uniqueUrls = [...new Set(targetUrls)];
  console.log(`Auditing ${uniqueUrls.length} pages...`);

  const onpageIssues: string[] = ['URL,Issue Type,Severity,Details'];
  const techIssues: string[] = ['URL,Issue Type,Details'];
  const schemaGap: string[] = ['URL,Missing Schema'];

  for (const url of uniqueUrls) {
    try {
      console.log(`Scanning ${url}...`);
      const res = await axios.get(url, { validateStatus: () => true });

      if (res.status !== 200) {
        techIssues.push(`${url},Status Code,returned ${res.status}`);
        continue;
      }

      const dom = new JSDOM(res.data);
      const doc = dom.window.document;

      // 1. Title
      const title = doc.querySelector('title')?.textContent || '';
      if (!title) onpageIssues.push(`${url},Missing Title,High,Title tag empty`);
      else if (title.length < 10) onpageIssues.push(`${url},Short Title,Medium,${title.length} chars`);
      else if (title.length > 70) onpageIssues.push(`${url},Long Title,Low,${title.length} chars`);

      // 2. Meta Description
      const desc = doc.querySelector('meta[name="description"]')?.getAttribute('content') || '';
      if (!desc) onpageIssues.push(`${url},Missing Description,High,Meta description missing`);
      else if (desc.length < 50) onpageIssues.push(`${url},Short Description,Medium,${desc.length} chars`);
      else if (desc.length > 170) onpageIssues.push(`${url},Long Description,Low,${desc.length} chars`);

      // 3. H1
      const h1s = doc.querySelectorAll('h1');
      if (h1s.length === 0) onpageIssues.push(`${url},Missing H1,High,No H1 found`);
      else if (h1s.length > 1) onpageIssues.push(`${url},Multiple H1,Medium,Found ${h1s.length} H1s`);

      // 4. Canonical
      const canonical = doc.querySelector('link[rel="canonical"]')?.getAttribute('href');
      if (!canonical) techIssues.push(`${url},Missing Canonical,Canonical tag missing`);
      // Basic check if canonical matches current URL (ignoring trailing slash differences)
      // Note: localhost might confuse this if canonical is production URL

      // 5. Images Alt
      const images = doc.querySelectorAll('img');
      let missingAlt = 0;
      images.forEach(img => {
        if (!img.getAttribute('alt')) missingAlt++;
      });
      if (missingAlt > 0) onpageIssues.push(`${url},Missing Alt Text,Medium,${missingAlt} images missing alt`);

      // 6. Schema Check (Prep for Step 6, might as well do it here to save fetches)
      const schemas = Array.from(doc.querySelectorAll('script[type="application/ld+json"]')).map(s => {
        try { return JSON.parse(s.textContent || '{}'); } catch { return {}; }
      });

      const hasPhysician = schemas.some(s => {
        const type = s['@type'];
        return type === 'Physician' || (Array.isArray(type) && type.includes('Physician')) ||
               (s['@graph'] && s['@graph'].some((g: any) => g['@type'] === 'Physician'));
      });

      const hasBreadcrumb = schemas.some(s => {
        const type = s['@type'];
        return type === 'BreadcrumbList' ||
               (s['@graph'] && s['@graph'].some((g: any) => g['@type'] === 'BreadcrumbList'));
      });

      if (!hasPhysician && !url.includes('/blog/')) schemaGap.push(`${url},Physician`);
      if (!hasBreadcrumb && url !== 'http://localhost:3000/') schemaGap.push(`${url},BreadcrumbList`);

    } catch (e: any) {
      console.error(`Error scanning ${url}: ${e.message}`);
      techIssues.push(`${url},Scan Error,${e.message}`);
    }
  }

  fs.writeFileSync(path.join(ONPAGE_DIR, 'issues.csv'), onpageIssues.join('\n'));
  fs.writeFileSync(path.join(TECH_DIR, 'tech_issues.csv'), techIssues.join('\n'));
  fs.writeFileSync(path.join(SCHEMA_DIR, 'gap_analysis.csv'), schemaGap.join('\n')); // Saving for Step 6 context

  console.log('Audit Complete.');
}

runAudit();
