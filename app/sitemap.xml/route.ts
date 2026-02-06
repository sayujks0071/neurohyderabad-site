import { promises as fs } from 'fs';
import path from 'path';
import type { NextRequest } from 'next/server';

// Serve the generated `public/sitemap.xml` reliably.
// Next canary builds can behave oddly with a static `public/sitemap.xml`,
// so we expose it via an explicit route to guarantee HTTP 200 + XML.
export const runtime = 'nodejs';
export const revalidate = 3600; // 1 hour

export async function GET(_req: NextRequest) {
  try {
    const sitemapPath = path.join(process.cwd(), 'public', 'sitemap.xml');
    const xml = await fs.readFile(sitemapPath, 'utf8');

    return new Response(xml, {
      headers: {
        'content-type': 'application/xml; charset=utf-8',
        'cache-control': 'public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400',
      },
    });
  } catch {
    return new Response('Not Found', { status: 404 });
  }
}

