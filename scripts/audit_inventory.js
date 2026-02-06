const fs = require('fs');
const path = require('path');

const SITE_URL = (process.env.SITE_URL || 'https://www.drsayuj.info').replace(/\/$/, '');
const SITEMAP_URL = `${SITE_URL}/sitemap-main.xml`;

// Helper to get all files in a directory recursively
function getFiles(dir, files = []) {
  try {
    const fileList = fs.readdirSync(dir);
    for (const file of fileList) {
      const name = `${dir}/${file}`;
      if (fs.statSync(name).isDirectory()) {
        getFiles(name, files);
      } else {
        files.push(name);
      }
    }
  } catch (e) {
    // ignore
  }
  return files;
}

async function loadSitemapUrls() {
  // Prefer the canonical, served sitemap.
  // Fallbacks keep this script usable when offline or when the server isn't reachable.
  const candidates = [
    { kind: 'http', value: SITEMAP_URL },
    { kind: 'file', value: path.join(process.cwd(), '.next', 'server', 'app', 'sitemap-main.xml.body') },
    { kind: 'file', value: path.join(process.cwd(), '.next', 'server', 'app', 'sitemap.xml.body') },
    { kind: 'file', value: path.join(process.cwd(), 'audit', 'crawl', 'sitemap.xml') },
  ];

  for (const c of candidates) {
    try {
      const xml =
        c.kind === 'http'
          ? await (async () => {
              const res = await fetch(c.value);
              if (!res.ok) throw new Error(`HTTP ${res.status}`);
              return await res.text();
            })()
          : fs.readFileSync(c.value, 'utf8');

      const urls = [];
      const regex = /<loc>(.*?)<\/loc>/g;
      let match;
      while ((match = regex.exec(xml)) !== null) urls.push(match[1]);
      if (urls.length > 0) return urls;
    } catch {
      // try next candidate
    }
  }

  console.error(`Could not load sitemap XML from ${SITEMAP_URL} or local fallbacks.`);
  return [];
}

async function main() {
  const sitemapUrls = await loadSitemapUrls();

  // 2. Get Actual MDX content
  const mdxFiles = fs.readdirSync('content/blog')
    .filter(f => f.endsWith('.mdx'))
    .map(f => `${SITE_URL}/blog/${f.replace('.mdx', '')}`);

  // 3. Get Explicit Page Routes
  const pageFiles = getFiles('app');
  const pageRoutes = pageFiles
    .filter(f => f.endsWith('/page.tsx') || f.endsWith('/page.js'))
    .map(f => {
      let route = f.replace('app', '').replace('/page.tsx', '').replace('/page.js', '');
      if (route === '') route = '/';
      return `${SITE_URL}${route}`;
    })
    .filter(r => !r.includes('[') && !r.includes('('));

  // Combine and Audit
  // Normalize to remove trailing slashes for comparison
  const normalize = u => u.replace(/\/$/, '');
  const sitemapSet = new Set(sitemapUrls.map(normalize));
  const allPotentialUrls = new Set([...sitemapUrls, ...mdxFiles, ...pageRoutes]);

  console.log('url,type,in_sitemap,in_filesystem,status');

  for (const rawUrl of allPotentialUrls) {
    const url = normalize(rawUrl);
    const pathPart = url.replace(SITE_URL, '');

    let type = 'other';
    if (pathPart === '' || pathPart === '/') type = 'home';
    else if (pathPart.includes('/blog')) type = 'blog';
    else if (pathPart.includes('/services')) type = 'service';
    else if (pathPart.includes('/conditions')) type = 'condition';
    else if (pathPart.includes('/locations') || pathPart.includes('/neurosurgeon-')) type = 'location';

    const inSitemap = sitemapSet.has(url);

    // Check FS existence (approximate)
    let inFs = false;
    if (type === 'blog') {
      const slug = pathPart.split('/').pop();
      if (fs.existsSync(`content/blog/${slug}.mdx`)) inFs = true;
      else if (fs.existsSync(`app${pathPart}/page.tsx`)) inFs = true;
    } else {
      if (fs.existsSync(`app${pathPart}/page.tsx`) || pathPart === '') inFs = true;
      // Handle virtual routes if known
      if (pathPart === '/sitemap.xml' || pathPart === '/sitemap-main.xml') inFs = true;
    }

    // Filter out internal/admin pages from being flagged as "Orphan" if they are truly internal
    const isInternal = pathPart.startsWith('/admin') || pathPart.startsWith('/api') || pathPart.startsWith('/auth') || pathPart.includes('test') || pathPart.includes('drafts');

    let status = 'OK';
    if (inSitemap && !inFs) status = 'Ghost (In Sitemap, No File)';
    if (!inSitemap && inFs && !isInternal) status = 'Orphan (In File, No Sitemap)';
    if (!inSitemap && !inFs) status = 'Unknown';

    console.log(`${url},${type},${inSitemap},${inFs},"${status}"`);
  }
}

main().catch((e) => {
  console.error(e);
  process.exitCode = 1;
});
