import type { NextRequest } from 'next/server';

// Serve a deterministic, newline-formatted robots.txt.
// We intentionally avoid MetadataRoute here to keep full control over formatting and content.
export const runtime = 'nodejs';
export const revalidate = 604800; // 7 days

const DISALLOW_PATHS = [
  '/api/',
  '/auth/',
  '/drafts',
  '/drafts/',
  '/cache-test-new',
  '/force-cache-clear',
  '/force-redeploy-test',
  '/simple-statsig-test',
  '/statsig-test',
  '/statsig-test/',
  '/test-compression',
  '/test-inngest',
  '/test-routes',
  '/test-routes/',
  '/test-error',
  '/email-test',
  '/utm-links',
  '/utm-links/',
];

const SITE = 'https://www.drsayuj.info';

export function GET(_req: NextRequest) {
  const lines: string[] = [];
  lines.push('User-agent: *');
  lines.push('Allow: /');

  for (const path of DISALLOW_PATHS) lines.push(`Disallow: ${path}`);

  // Sitemaps (all should be HTTP 200 and valid XML)
  lines.push(`Sitemap: ${SITE}/sitemap-main.xml`);
  lines.push(`Sitemap: ${SITE}/sitemap-images.xml`);
  lines.push(`Sitemap: ${SITE}/sitemap-videos.xml`);

  // Non-standard but supported by some crawlers; harmless for Google.
  lines.push('Host: www.drsayuj.info');

  return new Response(lines.join('\n') + '\n', {
    headers: {
      'content-type': 'text/plain; charset=utf-8',
      // Cache, but allow quick refresh in edge caches.
      'cache-control': 'public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400',
    },
  });
}
