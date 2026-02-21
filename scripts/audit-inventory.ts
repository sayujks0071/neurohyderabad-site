
import fs from 'fs';
import path from 'path';
import { glob } from 'glob';

// Simple XML parser since we can't depend on xml2js availability without checking
function parseSitemapUrls(xmlContent: string): string[] {
  const urls: string[] = [];
  const regex = /<loc>(.*?)<\/loc>/g;
  let match;
  while ((match = regex.exec(xmlContent)) !== null) {
    urls.push(match[1]);
  }
  return urls;
}

async function main() {
  const inventory: {
    url: string;
    type: string;
    source: string;
  }[] = [];

  // 1. Parse public/sitemap.xml
  const sitemapPath = path.join(process.cwd(), 'public', 'sitemap.xml');
  if (fs.existsSync(sitemapPath)) {
    const xml = fs.readFileSync(sitemapPath, 'utf-8');
    const urls = parseSitemapUrls(xml);
    urls.forEach(url => {
      inventory.push({
        url,
        type: 'sitemap',
        source: 'public/sitemap.xml'
      });
    });
    console.log(`Found ${urls.length} URLs in sitemap.xml`);
  } else {
    console.warn('public/sitemap.xml not found');
  }

  // 2. Scan app directory for static routes (simple heuristic)
  // This is a backup if sitemap is incomplete
  // We won't implement a full Next.js route resolver here, just relying on sitemap + data files is usually enough.

  // Deduplicate
  const uniqueUrls = new Map();
  inventory.forEach(item => uniqueUrls.set(item.url, item));

  const finalInventory = Array.from(uniqueUrls.values());

  // Output CSV
  const csvContent = ['URL,Type,Source'].join(',') + '\n' +
    finalInventory.map(item => `${item.url},${item.type},${item.source}`).join('\n');

  fs.writeFileSync(path.join(process.cwd(), 'audit', 'crawl', 'url_inventory.csv'), csvContent);
  fs.writeFileSync(path.join(process.cwd(), 'audit', 'crawl', 'url_inventory.json'), JSON.stringify(finalInventory, null, 2));

  console.log(`Inventory saved: ${finalInventory.length} unique URLs.`);
}

main().catch(console.error);
