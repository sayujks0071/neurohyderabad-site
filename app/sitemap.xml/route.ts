import { SITE_URL } from '@/src/lib/seo';

export const runtime = 'nodejs';
export const revalidate = 86400; // regenerate daily

export function GET() {
  const sitemaps = [
    `${SITE_URL}/sitemap-main.xml`,
    `${SITE_URL}/sitemap-images.xml`,
    `${SITE_URL}/sitemap-videos.xml`,
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemaps.map(url => `  <sitemap>
    <loc>${url}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
  </sitemap>`).join('\n')}
</sitemapindex>`;

  return new Response(xml, {
    headers: {
      'content-type': 'application/xml; charset=utf-8',
      'cache-control': 'public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400',
    },
  });
}
