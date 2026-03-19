import { SITE_URL } from '@/src/lib/seo';

export const runtime = 'nodejs';
export const revalidate = 86400; // 24 hours

/**
 * Sitemap Index — lists all sub-sitemaps.
 * Google discovers all URLs through this single entry point.
 *
 * Previously this was a redirect to /sitemap-main.xml (a flat file).
 * Now it's a proper <sitemapindex> pointing to category-specific sub-sitemaps.
 */
export async function GET() {
  const now = new Date().toISOString();

  const sitemaps = [
    '/sitemap-main.xml',
    '/sitemap-services.xml',
    '/sitemap-conditions.xml',
    '/sitemap-locations.xml',
  ];

  const lines: string[] = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
  ];

  for (const path of sitemaps) {
    lines.push('  <sitemap>');
    lines.push(`    <loc>${SITE_URL}${path}</loc>`);
    lines.push(`    <lastmod>${now}</lastmod>`);
    lines.push('  </sitemap>');
  }

  lines.push('</sitemapindex>');

  return new Response(lines.join('\n') + '\n', {
    headers: {
      'content-type': 'application/xml; charset=utf-8',
      'cache-control': 'public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400',
    },
  });
}
