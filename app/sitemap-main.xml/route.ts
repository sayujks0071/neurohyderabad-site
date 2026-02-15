import type { NextRequest } from 'next/server';
import { getAllBlogPosts } from '@/src/lib/blog';
import { SITE_URL } from '@/src/lib/seo';
import sitemapServices from '../sitemap-services';
import sitemapConditions from '../sitemap-conditions';
import sitemapLocations from '../sitemap-locations';

export const runtime = 'nodejs';
export const revalidate = 86400; // regenerate daily

function escapeXml(s: string) {
  return s
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&apos;');
}

function toXml(entries: Array<{ url: string; lastModified?: string; changeFrequency?: string; priority?: number }>) {
  const lines: string[] = [];
  lines.push('<?xml version="1.0" encoding="UTF-8"?>');
  lines.push('<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">');

  for (const e of entries) {
    lines.push('<url>');
    lines.push(`<loc>${escapeXml(e.url)}</loc>`);
    if (e.lastModified) lines.push(`<lastmod>${escapeXml(e.lastModified)}</lastmod>`);
    if (e.changeFrequency) lines.push(`<changefreq>${escapeXml(e.changeFrequency)}</changefreq>`);
    if (typeof e.priority === 'number') lines.push(`<priority>${e.priority}</priority>`);
    lines.push('</url>');
  }

  lines.push('</urlset>');
  return lines.join('\n') + '\n';
}

// Canonical sitemap for main pages.
export async function GET(_req: NextRequest) {
  const now = new Date().toISOString();

  const unique = new Set<string>();
  const entries: Array<{ url: string; lastModified: string; changeFrequency: string; priority: number }> = [];

  function add(url: string, priority: number, changeFrequency: string) {
    const full = `${SITE_URL}${url}`;
    if (unique.has(full)) return;
    unique.add(full);
    entries.push({ url: full, lastModified: now, changeFrequency, priority });
  }

  const corePages = [
    { url: '', priority: 1.0, changeFrequency: 'daily' },
    { url: '/about', priority: 0.9, changeFrequency: 'weekly' },
    { url: '/appointments', priority: 0.9, changeFrequency: 'weekly' },
    { url: '/contact', priority: 0.8, changeFrequency: 'weekly' },
    { url: '/services', priority: 0.9, changeFrequency: 'weekly' },
    { url: '/conditions', priority: 0.9, changeFrequency: 'weekly' },
    { url: '/locations', priority: 0.8, changeFrequency: 'weekly' },
    { url: '/best-neurosurgeon-in-hyderabad', priority: 0.9, changeFrequency: 'monthly' },
    { url: '/brain-surgery', priority: 0.8, changeFrequency: 'monthly' },
    { url: '/spine-surgery', priority: 0.8, changeFrequency: 'monthly' },
    { url: '/pediatric-neurosurgery', priority: 0.7, changeFrequency: 'monthly' },
    { url: '/technology-innovation', priority: 0.7, changeFrequency: 'monthly' },
  ];
  for (const p of corePages) add(p.url, p.priority, p.changeFrequency);

  for (const e of sitemapServices()) {
    if (unique.has(e.url)) continue;
    unique.add(e.url);
    entries.push({
      url: e.url,
      lastModified: typeof e.lastModified === 'string' ? e.lastModified : now,
      changeFrequency: e.changeFrequency ?? 'weekly',
      priority: typeof e.priority === 'number' ? e.priority : 0.7,
    });
  }
  for (const e of sitemapConditions()) {
    if (unique.has(e.url)) continue;
    unique.add(e.url);
    entries.push({
      url: e.url,
      lastModified: typeof e.lastModified === 'string' ? e.lastModified : now,
      changeFrequency: e.changeFrequency ?? 'weekly',
      priority: typeof e.priority === 'number' ? e.priority : 0.7,
    });
  }
  for (const e of sitemapLocations()) {
    if (unique.has(e.url)) continue;
    unique.add(e.url);
    entries.push({
      url: e.url,
      lastModified: typeof e.lastModified === 'string' ? e.lastModified : now,
      changeFrequency: e.changeFrequency ?? 'weekly',
      priority: typeof e.priority === 'number' ? e.priority : 0.7,
    });
  }

  const posts = await getAllBlogPosts();
  for (const post of posts) add(`/blog/${post.slug}`, 0.7, 'monthly');

  for (const page of ['/knowledge-base', '/blog', '/patient-stories', '/research', '/media', '/technology-facilities']) {
    add(page, 0.7, 'weekly');
  }

  for (const page of ['/privacy', '/cookies', '/terms', '/disclaimer', '/medical-disclaimer', '/content-integrity', '/editorial-policy']) {
    add(page, 0.3, 'yearly');
  }

  return new Response(toXml(entries), {
    headers: {
      'content-type': 'application/xml; charset=utf-8',
      'cache-control': 'public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400',
    },
  });
}
