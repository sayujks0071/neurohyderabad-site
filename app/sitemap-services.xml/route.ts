import sitemapServices from '../sitemap-services';

export const runtime = 'nodejs';
export const revalidate = 86400;

function escapeXml(s: string) {
  return s.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;');
}

export async function GET() {
  const entries = sitemapServices();

  const lines: string[] = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
  ];

  for (const e of entries) {
    lines.push('<url>');
    lines.push(`<loc>${escapeXml(e.url)}</loc>`);
    if (e.lastModified) {
      const lm = typeof e.lastModified === 'string' ? e.lastModified : (e.lastModified as Date).toISOString();
      lines.push(`<lastmod>${escapeXml(lm)}</lastmod>`);
    }
    if (e.changeFrequency) lines.push(`<changefreq>${escapeXml(e.changeFrequency)}</changefreq>`);
    if (typeof e.priority === 'number') lines.push(`<priority>${e.priority}</priority>`);
    lines.push('</url>');
  }

  lines.push('</urlset>');

  return new Response(lines.join('\n') + '\n', {
    headers: {
      'content-type': 'application/xml; charset=utf-8',
      'cache-control': 'public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400',
    },
  });
}
