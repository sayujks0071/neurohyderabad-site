import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PROJECT_ROOT = path.resolve(__dirname, '..');

const REPORT_PATH = path.join(PROJECT_ROOT, 'reports/crawl-health-weekly.json');
const CONDITIONS_INDEX_PATH = path.join(PROJECT_ROOT, 'src/data/conditionsIndex.ts');

// Helper to extract primaryPaths from conditionsIndex.ts
function extractConditionPaths() {
  try {
    const content = fs.readFileSync(CONDITIONS_INDEX_PATH, 'utf-8');
    const regex = /primaryPath:\s*["']([^"']+)["']/g;
    const paths = [];
    let match;
    while ((match = regex.exec(content)) !== null) {
      if (match[1].startsWith('/conditions/')) {
        paths.push(match[1]);
      }
    }
    return paths;
  } catch (err) {
    console.error('Error reading conditionsIndex.ts:', err);
    return [];
  }
}

async function fetchPage(baseUrl, relativeUrl) {
  const url = new URL(relativeUrl, baseUrl).toString();
  try {
    const start = Date.now();
    const res = await fetch(url);
    const time = Date.now() - start;

    let html = '';
    let wordCount = 0;
    let title = '';
    let links = [];

    if (res.ok) {
        html = await res.text();
        // Extract Title
        const titleMatch = html.match(/<title>([^<]*)<\/title>/i);
        title = titleMatch ? titleMatch[1] : '';

        // Estimate Word Count
        const text = html.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
        wordCount = text.split(' ').length;

        // Extract Links
        const linkRegex = /href=["'](\/[^"']*)["']/g;
        let lMatch;
        while ((lMatch = linkRegex.exec(html)) !== null) {
            // Filter out obviously non-page links
            const link = lMatch[1];
            if (!link.startsWith('//') &&
                !link.match(/\.(png|jpg|jpeg|gif|svg|css|js|ico)$/i)) {
                links.push(link);
            }
        }
    }

    return {
      url: relativeUrl,
      status: res.status,
      ok: res.ok,
      redirected: res.redirected,
      finalUrl: res.url,
      title,
      wordCount,
      time,
      links: [...new Set(links)]
    };
  } catch (err) {
    return {
      url: relativeUrl,
      status: 0,
      ok: false,
      error: err.message,
      links: []
    };
  }
}

async function main() {
  const args = process.argv.slice(2);
  const baseUrlArg = args.find(a => a.startsWith('--base-url='));
  const baseUrl = baseUrlArg ? baseUrlArg.split('=')[1] : 'http://localhost:3000';

  console.log(`Starting crawl audit against ${baseUrl}...`);

  // 1. Seeds
  const conditionPaths = extractConditionPaths();
  // Limit condition paths to first 5 to avoid huge crawl, plus the ones we know were broken
  const brokenSuspects = [
      '/conditions/acoustic-neuroma-treatment-hyderabad',
      '/conditions/carpal-tunnel-syndrome-hyderabad'
  ];
  const seeds = [
      '/',
      '/appointments',
      '/services',
      '/conditions',
      '/about',
      ...brokenSuspects
  ];

  // Also add any other condition paths from index (maybe check them all since checking existence is fast)
  // The goal is to check ALL links found on seeds.

  // We will check:
  // 1. All Seeds (Fetch body + Extract links)
  // 2. All Discovered Links (Head/Get status check only, unless we want to recurse)

  // For this audit, we'll do 1 level depth.

  const results = new Map(); // url -> result

  // Queue seeds
  for (const url of seeds) {
      if (!results.has(url)) {
          console.log(`Crawling Seed: ${url}...`);
          const result = await fetchPage(baseUrl, url);
          results.set(url, result);
      }
  }

  // Collect all discovered links
  const allDiscoveredLinks = new Set();
  for (const result of results.values()) {
      if (result.links) {
          for (const link of result.links) {
              // Normalize link (remove hash/query if needed, but keeping simple for now)
              const cleanLink = link.split('#')[0].split('?')[0];
              if (cleanLink.length > 1) { // ignore / or empty
                  allDiscoveredLinks.add(cleanLink);
              }
          }
      }
  }

  // Also include all condition paths from data source as targets to verify
  conditionPaths.forEach(p => allDiscoveredLinks.add(p));

  console.log(`Found ${allDiscoveredLinks.size} unique internal links to verify.`);

  // Check discovered links
  for (const link of allDiscoveredLinks) {
      if (!results.has(link)) {
          // console.log(`Verifying: ${link}...`); // reduce noise
          // We can just do a lighter check, but fetchPage is fine.
          const result = await fetchPage(baseUrl, link);
          // We don't need to parse links from these (depth 1)
          delete result.links;
          results.set(link, result);
      }
  }

  // Generate Report
  const finalResults = Array.from(results.values());
  const report = {
    timestamp: new Date().toISOString(),
    baseUrl,
    summary: {
      totalChecked: finalResults.length,
      brokenLinks: 0,
      redirects: 0,
      thinPages: 0,
      missingTitles: 0,
    },
    details: finalResults
  };

  for (const r of finalResults) {
    if (!r.ok) report.summary.brokenLinks++;
    if (r.redirected) report.summary.redirects++;
    if (r.ok && r.wordCount > 0 && r.wordCount < 300) report.summary.thinPages++;
    if (r.ok && !r.title) report.summary.missingTitles++;
  }

  const reportsDir = path.dirname(REPORT_PATH);
  if (!fs.existsSync(reportsDir)) {
      fs.mkdirSync(reportsDir, { recursive: true });
  }

  fs.writeFileSync(REPORT_PATH, JSON.stringify(report, null, 2));
  console.log(`Audit complete. Checked ${report.summary.totalChecked} links.`);
  console.log(`Report saved to ${REPORT_PATH}`);

  const broken = finalResults.filter(r => !r.ok);
  if (broken.length > 0) {
      console.log('\nBroken Links Found:');
      broken.forEach(r => console.log(`${r.status} ${r.url} (${r.error || ''})`));
  } else {
      console.log('\nNo broken links found!');
  }
}

main().catch(console.error);
