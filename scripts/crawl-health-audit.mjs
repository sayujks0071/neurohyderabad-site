import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT_DIR = path.join(__dirname, '..');
const INVENTORY_FILE = path.join(ROOT_DIR, 'audit', 'crawl', 'url_inventory.json');
const REPORT_FILE = path.join(ROOT_DIR, 'reports', 'crawl-health-weekly.json');
const BASE_URL = 'http://localhost:3000';

async function main() {
  console.log('Starting Crawl Health Audit...');

  // 1. Load URLs
  let urls = [];
  try {
    const data = fs.readFileSync(INVENTORY_FILE, 'utf8');
    urls = JSON.parse(data);
    // Ensure unique and filter
    urls = [...new Set(urls)].filter(u => u.startsWith('/'));
  } catch (e) {
    console.error('Failed to load inventory:', e);
    // Fallback sample if file missing
    urls = ['/', '/appointments', '/services', '/conditions', '/locations'];
  }

  const results = {
    summary: {
      total_checked: 0,
      status_200: 0,
      status_404: 0,
      status_500: 0,
      redirect_chains: 0,
      duplicate_titles: 0,
      missing_titles: 0,
      thin_pages: 0,
      broken_internal_links: 0,
    },
    issues: [],
    details: {}
  };

  const internalLinksToCheck = new Set();
  const titleMap = new Map();

  // Helper to fetch and parse
  const checkUrl = async (urlPath) => {
    const fullUrl = new URL(urlPath, BASE_URL).toString();
    console.log(`Checking: ${fullUrl}`);

    try {
      const start = Date.now();
      const res = await fetch(fullUrl, { redirect: 'manual' });
      const status = res.status;

      let finalUrl = fullUrl;
      let redirectChain = [];
      let currentRes = res;
      let hopCount = 0;

      // Follow redirects manually to detect chains
      while (currentRes.status >= 300 && currentRes.status < 400 && hopCount < 10) {
        const location = currentRes.headers.get('location');
        if (!location) break;

        const nextUrl = new URL(location, finalUrl).toString(); // Handle relative redirects
        redirectChain.push({ from: finalUrl, to: nextUrl, status: currentRes.status });
        finalUrl = nextUrl;

        currentRes = await fetch(finalUrl, { redirect: 'manual' });
        hopCount++;
      }

      const finalStatus = currentRes.status;
      const html = await currentRes.text();

      // Analyze
      const result = {
        url: urlPath,
        final_url: finalUrl,
        status: finalStatus,
        redirects: redirectChain,
        title: '',
        canonical: '',
        robots: '',
        word_count: 0,
        internal_links: []
      };

      if (redirectChain.length > 1) {
        results.summary.redirect_chains++;
        results.issues.push({ type: 'redirect_chain', url: urlPath, chain: redirectChain });
      }

      if (finalStatus === 200) {
        // Title
        const titleMatch = html.match(/<title[^>]*>([^<]+)<\/title>/i);
        result.title = titleMatch ? titleMatch[1].trim() : '';

        if (!result.title) {
          results.summary.missing_titles++;
          results.issues.push({ type: 'missing_title', url: urlPath });
        } else {
          if (titleMap.has(result.title)) {
             results.summary.duplicate_titles++;
             // Only add issue once per duplicate set to avoid noise, or track all
             results.issues.push({ type: 'duplicate_title', url: urlPath, duplicate_of: titleMap.get(result.title) });
          } else {
            titleMap.set(result.title, urlPath);
          }
        }

        // Canonical
        const canonicalMatch = html.match(/<link[^>]*rel=["']canonical["'][^>]*href=["']([^"']+)["'][^>]*>/i);
        result.canonical = canonicalMatch ? canonicalMatch[1] : '';

        // Robots
        const robotsMatch = html.match(/<meta[^>]*name=["']robots["'][^>]*content=["']([^"']+)["'][^>]*>/i);
        result.robots = robotsMatch ? robotsMatch[1] : '';

        // Internal Links (simple regex)
        const linkRegex = /href=["'](\/[^"']*)["']/g;
        let match;
        while ((match = linkRegex.exec(html)) !== null) {
          const link = match[1];
          // Filter out obvious non-pages
          if (!link.startsWith('//') &&
              !link.match(/\.(png|jpg|jpeg|gif|svg|css|js|ico|xml|json)$/i) &&
              !link.includes('mailto:') &&
              !link.includes('tel:')) {
             result.internal_links.push(link);
             internalLinksToCheck.add(link);
          }
        }

        // Thin Content
        const bodyContent = html.replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '')
                                .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '')
                                .replace(/<[^>]+>/g, ' ')
                                .replace(/\s+/g, ' ')
                                .trim();
        result.word_count = bodyContent.split(' ').length;

        if (result.word_count < 300) {
           results.summary.thin_pages++;
           results.issues.push({ type: 'thin_page', url: urlPath, word_count: result.word_count });
        }
        results.summary.status_200++;
      } else if (finalStatus === 404) {
         results.summary.status_404++;
         results.issues.push({ type: '404', url: urlPath });
      } else {
         results.summary.status_500++; // Group other errors
      }

      results.details[urlPath] = result;

    } catch (err) {
      console.error(`Error checking ${urlPath}:`, err.message);
      results.issues.push({ type: 'error', url: urlPath, error: err.message });
    }
  };

  // Run checks with limited concurrency
  const CONCURRENCY = 5;
  for (let i = 0; i < urls.length; i += CONCURRENCY) {
    const chunk = urls.slice(i, i + CONCURRENCY);
    await Promise.all(chunk.map(checkUrl));
  }

  // Check discovered internal links for 404s (head request)
  console.log(`Checking ${internalLinksToCheck.size} unique internal links...`);
  const internalLinks = [...internalLinksToCheck];

  const checkLink = async (link) => {
    // skip if already checked as a primary page
    if (results.details[link]) return;

    try {
       const fullUrl = new URL(link, BASE_URL).toString();
       const res = await fetch(fullUrl, { method: 'HEAD' });
       if (res.status === 404) {
         results.summary.broken_internal_links++;
         results.issues.push({ type: 'broken_link', url: link, source: 'internal_scan' });
       }
    } catch (e) {
       // ignore
    }
  };

  for (let i = 0; i < internalLinks.length; i += CONCURRENCY) {
    const chunk = internalLinks.slice(i, i + CONCURRENCY);
    await Promise.all(chunk.map(checkLink));
  }

  // Check Robots.txt & Sitemap
  try {
    const robotsRes = await fetch(`${BASE_URL}/robots.txt`);
    if (robotsRes.status !== 200) results.issues.push({ type: 'missing_file', url: '/robots.txt' });

    const sitemapRes = await fetch(`${BASE_URL}/sitemap-main.xml`);
    if (sitemapRes.status !== 200) results.issues.push({ type: 'missing_file', url: '/sitemap-main.xml' });
  } catch (e) {
    results.issues.push({ type: 'check_failed', url: 'system_files' });
  }

  results.summary.total_checked = urls.length;

  // Save Report
  fs.mkdirSync(path.dirname(REPORT_FILE), { recursive: true });
  fs.writeFileSync(REPORT_FILE, JSON.stringify(results, null, 2));
  console.log(`Report saved to ${REPORT_FILE}`);
}

main();
