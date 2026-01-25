
import fs from 'fs';
import path from 'path';
import axios from 'axios';

const BASE_URL = 'http://localhost:3000';
const AUDIT_DIR = path.join(process.cwd(), 'audit', 'crawl');

// --- Helper: Fetch Sitemaps (Network) ---
async function fetchSitemapUrls(url: string, visited = new Set<string>()): Promise<string[]> {
  if (visited.has(url)) return [];
  visited.add(url);

  console.log(`Fetching sitemap: ${url}`);
  try {
    const response = await axios.get(url, { maxRedirects: 5, timeout: 5000 });
    const xml = response.data;
    const urls: string[] = [];

    // Simple regex to find <loc>
    const locRegex = /<loc>(.*?)<\/loc>/g;
    let match;
    while ((match = locRegex.exec(xml)) !== null) {
      const loc = match[1].trim();
      if (loc.endsWith('.xml')) {
        const nestedUrls = await fetchSitemapUrls(loc, visited);
        urls.push(...nestedUrls);
      } else {
        urls.push(loc);
      }
    }
    return urls;
  } catch (error: any) {
    console.error(`Error fetching sitemap ${url}: ${error.message}`);
    return [];
  }
}

// --- Helper: Parse Sitemap File (Static Analysis) ---
function parseSitemapFile(): string[] {
  const filePath = path.join(process.cwd(), 'app', 'sitemap.ts');
  if (!fs.existsSync(filePath)) return [];

  const content = fs.readFileSync(filePath, 'utf8');
  const urls: string[] = [];

  // Regex to find string literals starting with / inside the file
  // This captures things like '/about', '/services/...'
  // Be careful not to capture imports or other noise.
  // Looking at the file content, they are mostly inside arrays or objects.

  // Strategy: Match strings that look like paths
  const pathRegex = /['"](\/[a-zA-Z0-9\-\/]+)['"]/g;
  let match;
  while ((match = pathRegex.exec(content)) !== null) {
    const p = match[1];
    if (!p.startsWith('/_') && !p.includes('*')) {
        urls.push(`${BASE_URL}${p}`);
    }
  }

  return urls;
}

// --- Helper: Scan File System ---
function scanFileSystem(dir: string, baseDir: string = ''): string[] {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const pages: string[] = [];

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    const relativePath = path.join(baseDir, entry.name);

    if (entry.isDirectory()) {
      pages.push(...scanFileSystem(fullPath, relativePath));
    } else if (entry.name === 'page.tsx' || entry.name === 'page.js') {
      let route = baseDir
        .replace(/\\/g, '/')
        .split('/')
        .filter(segment =>
          !segment.startsWith('(') &&
          !segment.startsWith('_')
        )
        .join('/');

      if (route === '') route = '/';
      else route = '/' + route;

      pages.push(route);
    }
  }
  return pages;
}

// --- Main ---
async function main() {
  if (!fs.existsSync(AUDIT_DIR)) fs.mkdirSync(AUDIT_DIR, { recursive: true });

  // 1. Get Sitemap URLs (Try Network, Fallback to Static)
  let sitemapUrls = await fetchSitemapUrls(`${BASE_URL}/sitemap.xml`);
  let source = 'Network';

  if (sitemapUrls.length === 0) {
    console.log("Network sitemap fetch failed or empty. Falling back to static analysis of app/sitemap.ts");
    sitemapUrls = parseSitemapFile();
    source = 'StaticAnalysis';
  }

  const uniqueSitemapUrls = [...new Set(sitemapUrls)].sort();

  // 2. Get File System Routes
  const appDir = path.join(process.cwd(), 'app');
  const fileSystemRoutes = scanFileSystem(appDir);

  // 3. Analyze Orphans
  const orphans: string[] = [];
  const covered: string[] = [];

  const normalizedSitemapPaths = uniqueSitemapUrls.map(u => {
    try {
        return new URL(u).pathname;
    } catch (e) {
        return u.replace(BASE_URL, '');
    }
  });

  for (const fsRoute of fileSystemRoutes) {
    if (fsRoute.includes('[') || fsRoute.includes(']')) continue;

    if (!normalizedSitemapPaths.includes(fsRoute)) {
        if (fsRoute === '/' && (normalizedSitemapPaths.includes('/') || normalizedSitemapPaths.includes(''))) continue;
        orphans.push(fsRoute);
    } else {
        covered.push(fsRoute);
    }
  }

  // 4. Output
  console.log(`Found ${uniqueSitemapUrls.length} URLs in Sitemap (${source}).`);
  console.log(`Found ${fileSystemRoutes.length} Route Definitions in File System.`);
  console.log(`Found ${orphans.length} Potential Orphans.`);

  const csvContent = [
    'URL,Source,Type',
    ...uniqueSitemapUrls.map(u => `${u},Sitemap,Indexable`),
    ...orphans.map(u => `${BASE_URL}${u},FileSystem,Orphan`)
  ].join('\n');

  fs.writeFileSync(path.join(AUDIT_DIR, 'url_inventory.csv'), csvContent);
  fs.writeFileSync(path.join(AUDIT_DIR, 'url_inventory.json'), JSON.stringify({ sitemap: uniqueSitemapUrls, orphans, source }, null, 2));

  const summary = `
# Crawl Summary

- **Sitemap Source:** ${source}
- **Total Sitemap URLs:** ${uniqueSitemapUrls.length}
- **Total FS Routes:** ${fileSystemRoutes.length}
- **Orphans Detected:** ${orphans.length}

## Potential Orphans (Action Required)
${orphans.map(o => `- ${o}`).join('\n')}
  `;
  fs.writeFileSync(path.join(AUDIT_DIR, 'crawl_summary.md'), summary);
}

main().catch(console.error);
