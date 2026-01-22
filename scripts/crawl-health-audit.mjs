import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT_DIR = path.join(__dirname, '..');
const REPORTS_DIR = path.join(ROOT_DIR, 'reports');
const REPORT_FILE = path.join(REPORTS_DIR, 'crawl-health-weekly.json');
const BASE_URL = process.env.BASE_URL || 'http://localhost:3000';

// Ensure reports dir exists
if (!fs.existsSync(REPORTS_DIR)) {
  fs.mkdirSync(REPORTS_DIR, { recursive: true });
}

async function getUrlList() {
  const urls = new Set(['/', '/appointments', '/robots.txt', '/sitemap.xml']);

  // Extract locations
  try {
    const locationsContent = fs.readFileSync(path.join(ROOT_DIR, 'src/data/locations.ts'), 'utf8');
    const slugMatches = locationsContent.matchAll(/slug:\s*["']([^"']+)["']/g);
    for (const match of slugMatches) {
        let slug = match[1];
        if (!slug.startsWith('/')) slug = '/' + slug;
        urls.add(slug);
    }
  } catch (e) {
    console.error('Error reading locations.ts:', e);
  }

  // Extract conditions
  try {
    const conditionsContent = fs.readFileSync(path.join(ROOT_DIR, 'src/data/conditionsIndex.ts'), 'utf8');
    const pathMatches = conditionsContent.matchAll(/primaryPath:\s*["']([^"']+)["']/g);
    for (const match of pathMatches) {
        urls.add(match[1]);
    }
  } catch (e) {
    console.error('Error reading conditionsIndex.ts:', e);
  }

  return Array.from(urls);
}

async function fetchPage(url) {
  const fullUrl = url.startsWith('http') ? url : `${BASE_URL}${url}`;
  try {
    const response = await fetch(fullUrl, { redirect: 'manual' });
    const status = response.status;
    let location = response.headers.get('location');

    let redirectChain = [];
    if (status >= 300 && status < 400 && location) {
        redirectChain.push({ status, location });

        let currentUrl = location.startsWith('/') ? `${BASE_URL}${location}` : location;
        let hops = 0;

        while (hops < 5) {
             try {
                const nextRes = await fetch(currentUrl, { redirect: 'manual' });
                if (nextRes.status >= 300 && nextRes.status < 400 && nextRes.headers.get('location')) {
                    const nextLoc = nextRes.headers.get('location');
                    redirectChain.push({ status: nextRes.status, location: nextLoc });
                    currentUrl = nextLoc.startsWith('/') ? `${BASE_URL}${nextLoc}` : nextLoc;
                    hops++;
                } else {
                    break;
                }
             } catch (e) {
                 break;
             }
        }
    }

    // Fetch content if 200
    let content = '';
    if (status === 200) {
        content = await response.text();
    }

    return {
        url,
        status,
        redirectChain,
        content
    };
  } catch (error) {
    return {
        url,
        status: 0,
        error: error.message
    };
  }
}

function analyzeContent(html, baseUrl) {
    const titleMatch = html.match(/<title>([^<]*)<\/title>/i);
    const title = titleMatch ? titleMatch[1] : null;

    // Internal links
    const links = new Set();
    const hrefRegex = /<a[^>]+href=["']([^"']+)["']/gi;
    let match;
    while ((match = hrefRegex.exec(html)) !== null) {
        let href = match[1];
        // Clean href (remove hash, query)
        href = href.split('#')[0]; // keep query? usually yes for crawl

        if (href.startsWith('/') || href.startsWith(baseUrl)) {
             // Normalize to path
             if (href.startsWith(baseUrl)) {
                 href = href.substring(baseUrl.length);
             }
             if (href && href !== '/') {
                 links.add(href);
             }
        }
    }

    // Thin content
    let text = html.replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '')
                   .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '')
                   .replace(/<[^>]+>/g, ' ')
                   .replace(/\s+/g, ' ')
                   .trim();
    const wordCount = text.split(' ').length;

    return { title, links: Array.from(links), wordCount };
}

const linkCache = new Map();

async function checkLink(url) {
    if (linkCache.has(url)) return linkCache.get(url);
    const fullUrl = url.startsWith('http') ? url : `${BASE_URL}${url}`;
    try {
        const res = await fetch(fullUrl, { method: 'HEAD' });
        let status = res.status;
        if (status === 405 || status === 404) { // Try GET if HEAD fails or 404 (sometimes static files behave weirdly)
             const resGet = await fetch(fullUrl, { method: 'GET' });
             status = resGet.status;
        }
        linkCache.set(url, status);
        return status;
    } catch (e) {
        linkCache.set(url, 0);
        return 0;
    }
}

async function runAudit() {
  const seedUrls = await getUrlList();
  console.log(`Auditing ${seedUrls.length} seed URLs...`);

  const auditResults = [];
  const brokenInternalLinks = []; // { source, target, status }
  const duplicateTitles = {};
  const missingTitles = [];
  const thinPages = [];
  const redirectChains = [];
  const allDiscoveredLinks = new Set([...seedUrls]);

  // 1. Crawl Seed Pages
  for (const url of seedUrls) {
      // console.log(`Checking ${url}...`);
      const res = await fetchPage(url);

      if (res.status === 0) {
          console.error(`Failed to fetch ${url}: ${res.error}`);
          continue;
      }

      if (res.redirectChain && res.redirectChain.length > 1) {
          redirectChains.push({ url, chain: res.redirectChain });
      }

      if (res.status === 200) {
          // Skip analysis for xml/txt
          if (url.endsWith('.xml') || url.endsWith('.txt')) {
              continue;
          }

          const { title, links, wordCount } = analyzeContent(res.content, BASE_URL);

          if (!title) {
              missingTitles.push(url);
          } else {
              if (!duplicateTitles[title]) duplicateTitles[title] = [];
              duplicateTitles[title].push(url);
          }

          if (wordCount < 250) {
             thinPages.push({ url, wordCount });
          }

          for (const link of links) {
              allDiscoveredLinks.add(link);
              // Check link later or now?
              // Let's store checking task
          }

          // Store links for checking 404s later
          auditResults.push({ url, links });
      }
  }

  // 2. Check all discovered unique internal links for 404s
  console.log(`Checking ${allDiscoveredLinks.size} unique internal links...`);
  const brokenLinksFound = [];

  for (const link of allDiscoveredLinks) {
      const status = await checkLink(link);
      if (status >= 400 || status === 0) {
          brokenLinksFound.push({ link, status });
      }
  }

  // 3. Map broken links back to source pages
  for (const res of auditResults) {
      for (const link of res.links) {
          const broken = brokenLinksFound.find(b => b.link === link);
          if (broken) {
              brokenInternalLinks.push({ source: res.url, target: link, status: broken.status });
          }
      }
  }

  // Filter duplicate titles with only 1 count
  const actualDuplicateTitles = {};
  for (const [title, urls] of Object.entries(duplicateTitles)) {
      if (urls.length > 1) {
          actualDuplicateTitles[title] = urls;
      }
  }

  const report = {
      timestamp: new Date().toISOString(),
      summary: {
          urls_checked: seedUrls.length,
          broken_links_found: brokenInternalLinks.length,
          redirect_chains: redirectChains.length,
          duplicate_titles: Object.keys(actualDuplicateTitles).length,
          missing_titles: missingTitles.length,
          thin_pages: thinPages.length,
      },
      details: {
          broken_links: brokenInternalLinks,
          redirect_chains: redirectChains,
          duplicate_titles: actualDuplicateTitles,
          missing_titles: missingTitles,
          thin_pages: thinPages
      }
  };

  fs.writeFileSync(REPORT_FILE, JSON.stringify(report, null, 2));
  console.log(`Report saved to ${REPORT_FILE}`);
}

runAudit().catch(console.error);
