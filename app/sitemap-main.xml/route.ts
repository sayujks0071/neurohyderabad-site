import type { NextRequest } from 'next/server';
import { getAllBlogPosts } from '@/src/lib/blog';
import { SITE_URL } from '@/src/lib/seo';
// Services, conditions, and locations are now served by their own sub-sitemap endpoints:
// /sitemap-services.xml, /sitemap-conditions.xml, /sitemap-locations.xml
// This file (sitemap-main.xml) covers core pages, blog, and miscellaneous pages only.

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

// Canonical sitemap.
// We intentionally serve it at /sitemap-main.xml and 301/308 /sitemap.xml here
// to avoid an observed /sitemap.xml self-redirect loop on some Next canary builds.
export async function GET(_req: NextRequest) {
  const now = new Date().toISOString();

  const unique = new Set<string>();
  const entries: Array<{ url: string; lastModified: string; changeFrequency: string; priority: number }> = [];

  // Excluded paths ported from previous next-sitemap.config.js to prevent indexing
  const EXCLUDED_PATTERNS = [
    '/api/',
    '/auth/',
    '/404',
    '/500',
    '/drafts',
    '/cache-test',
    '/force-',
    '/statsig-test',
    '/test-',
    '/email-test',
    '/locations/banjara-hills',
    '/locations/hitech-city',
    '/locations/malakpet',
    '/locations/secunderabad',
    '/locations/brain-spine-surgeon-',
    'example',
    'test',
    'draft',
    'sample',
    'template',
    'placeholder'
  ];

  function isExcluded(url: string) {
    const lower = url.toLowerCase();
    return EXCLUDED_PATTERNS.some(pattern => lower.includes(pattern));
  }

  function add(url: string, priority: number, changeFrequency: string) {
    if (isExcluded(url)) return;
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

  // Services, conditions, and locations are now in their own sub-sitemaps.
  // See /sitemap-services.xml, /sitemap-conditions.xml, /sitemap-locations.xml

  const posts = await getAllBlogPosts();
  for (const post of posts) add(`/blog/${post.slug}`, 0.7, 'daily');

  for (const page of ['/knowledge-base', '/blog', '/patient-stories', '/research', '/media', '/technology-facilities']) {
    add(page, 0.7, 'weekly');
  }

  // Additional important pages
  for (const page of [
    '/cost-of-spine-surgery-hyderabad',
    '/spine-care-pathway',
    '/specializations',
    '/german-training',
    '/symptoms/back-pain',
    '/disease-guides/degenerative-disc-disease',
    '/refer',
    '/followup',
    '/stories/endoscopic-discectomy-same-day-hyderabad',
    '/stories/endoscopic-ulbd-stenosis-hyderabad',
    '/stories/mvd-trigeminal-neuralgia-hyderabad',
  ]) {
    add(page, 0.6, 'monthly');
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
