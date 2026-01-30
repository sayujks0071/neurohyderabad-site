
import fs from 'fs';
import path from 'path';
import axios from 'axios';
import { JSDOM } from 'jsdom';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BASE_URL = 'http://localhost:3000';
const OUT_DIR = path.join(process.cwd(), 'audit/crawl');
const CONCURRENCY = 5;

// Helper to delay
const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// 1. Gather URLs from source code
async function gatherUrls() {
  const urls = new Set<string>();

  // Add core pages
  urls.add('/');
  urls.add('/about');
  urls.add('/appointments');
  urls.add('/contact');
  urls.add('/services');
  urls.add('/conditions');
  urls.add('/locations');
  urls.add('/blog');

  // Parse sitemap files
  const sitemapFiles = [
    'app/sitemap-services.ts',
    'app/sitemap-conditions.ts',
    'app/sitemap-locations.ts',
    'app/sitemap.ts' // also parse the main one for hardcoded extras
  ];

  for (const file of sitemapFiles) {
    if (fs.existsSync(file)) {
      const content = fs.readFileSync(file, 'utf-8');
      const matches = content.matchAll(/url:\s*['"`]([^'"`]+)['"`]/g);
      for (const match of matches) {
        let url = match[1];
        if (url.startsWith('http')) {
           // extract path if it has full URL
           try {
             const u = new URL(url);
             url = u.pathname;
           } catch (e) {}
        }
        if (!url.startsWith('/')) url = '/' + url;
        urls.add(url);
      }

      // Also look for simple string paths in arrays if any
      const stringMatches = content.matchAll(/['"`](\/[a-zA-Z0-9-/]+)['"`]/g);
      for (const match of stringMatches) {
          urls.add(match[1]);
      }
    }
  }

  // Scan MDX blog posts
  const blogDir = path.join(process.cwd(), 'content/blog');
  if (fs.existsSync(blogDir)) {
    const files = fs.readdirSync(blogDir);
    for (const file of files) {
      if (file.endsWith('.mdx')) {
        const slug = file.replace('.mdx', '');
        urls.add(`/blog/${slug}`);
      }
    }
  }

  // Scan app directory for page.tsx
  const appDir = path.join(process.cwd(), 'app');
  function scanApp(dir: string, baseRoute: string) {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
      if (entry.isDirectory()) {
        if (!entry.name.startsWith('_') && !entry.name.startsWith('(') && !entry.name.startsWith('.')) {
            // handle dynamic routes logic is complex, skipping strict dynamic scan for now as sitemaps cover most
            // but we can capture static folders
            if (!entry.name.includes('[')) {
                scanApp(path.join(dir, entry.name), `${baseRoute}/${entry.name}`);
            }
        }
      } else if (entry.name === 'page.tsx') {
        urls.add(baseRoute || '/');
      }
    }
  }
  // scanApp(appDir, ''); // Disabled to avoid noise from dynamic route folders, relying on sitemaps + explicit blog scan

  return Array.from(urls).sort();
}

// 2. Crawl URLs
async function crawl(urls: string[]) {
  const results: any[] = [];
  const batches = [];

  for (let i = 0; i < urls.length; i += CONCURRENCY) {
    batches.push(urls.slice(i, i + CONCURRENCY));
  }

  console.log(`Found ${urls.length} URLs to crawl.`);

  for (const batch of batches) {
    await Promise.all(batch.map(async (urlPath) => {
      const result = {
        url: urlPath,
        status: 0,
        title: '',
        description: '',
        h1: '',
        canonical: '',
        robots: '',
        wordCount: 0,
        schemaTypes: [] as string[],
        inlinks: 0 // approximate
      };

      try {
        const response = await axios.get(`${BASE_URL}${urlPath}`, {
          validateStatus: () => true,
          timeout: 10000
        });

        result.status = response.status;

        if (response.status === 200 && response.headers['content-type']?.includes('text/html')) {
          const dom = new JSDOM(response.data);
          const doc = dom.window.document;

          result.title = doc.querySelector('title')?.textContent || '';
          result.description = doc.querySelector('meta[name="description"]')?.getAttribute('content') || '';
          result.h1 = doc.querySelector('h1')?.textContent?.trim() || '';
          result.canonical = doc.querySelector('link[rel="canonical"]')?.getAttribute('href') || '';
          result.robots = doc.querySelector('meta[name="robots"]')?.getAttribute('content') || '';

          // Word count (approx)
          const bodyText = doc.body.textContent || '';
          result.wordCount = bodyText.split(/\s+/).length;

          // Schema
          const scripts = doc.querySelectorAll('script[type="application/ld+json"]');
          scripts.forEach(script => {
            try {
              const json = JSON.parse(script.textContent || '{}');
              if (json['@type']) {
                if (Array.isArray(json['@type'])) {
                    result.schemaTypes.push(...json['@type']);
                } else {
                    result.schemaTypes.push(json['@type']);
                }
              }
              if (json['@graph']) {
                  json['@graph'].forEach((g: any) => {
                      if (g['@type']) result.schemaTypes.push(g['@type']);
                  });
              }
            } catch (e) {}
          });
        }
      } catch (error: any) {
        console.error(`Error crawling ${urlPath}: ${error.message}`);
        result.status = 500;
      }

      results.push(result);
      process.stdout.write('.');
    }));
  }

  console.log('\nCrawl complete.');
  return results;
}

// Main
(async () => {
  const urls = await gatherUrls();
  const data = await crawl(urls);

  // Save JSON
  fs.writeFileSync(path.join(OUT_DIR, 'url_inventory.json'), JSON.stringify(data, null, 2));

  // Save CSV
  const csvHeader = 'url,status,title,description,h1,word_count,canonical,robots,schema_types\n';
  const csvRows = data.map(r => {
    const clean = (s: string) => `"${(s || '').replace(/"/g, '""')}"`;
    return `${clean(r.url)},${r.status},${clean(r.title)},${clean(r.description)},${clean(r.h1)},${r.wordCount},${clean(r.canonical)},${clean(r.robots)},${clean(r.schemaTypes.join('; '))}`;
  }).join('\n');

  fs.writeFileSync(path.join(OUT_DIR, 'url_inventory.csv'), csvHeader + csvRows);
  console.log(`Saved inventory to ${OUT_DIR}`);
})();
