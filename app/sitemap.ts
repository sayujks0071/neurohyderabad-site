import { MetadataRoute } from 'next';
import { getAllBlogPosts } from '@/src/lib/blog';
import { SITE_URL } from '@/src/lib/seo';
import sitemapServices from './sitemap-services';
import sitemapConditions from './sitemap-conditions';
import sitemapLocations from './sitemap-locations';

export const revalidate = 86400; // regenerate daily

// Canonical sitemap at /sitemap.xml (Next metadata route).
// Keep this list canonical: do not include pages that 301 to a different URL.
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date().toISOString();

  const corePages = [
    { url: '', priority: 1.0, changeFrequency: 'daily' as const },
    { url: '/about', priority: 0.9, changeFrequency: 'weekly' as const },
    { url: '/appointments', priority: 0.9, changeFrequency: 'weekly' as const },
    { url: '/contact', priority: 0.8, changeFrequency: 'weekly' as const },
    { url: '/services', priority: 0.9, changeFrequency: 'weekly' as const },
    { url: '/conditions', priority: 0.9, changeFrequency: 'weekly' as const },
    { url: '/locations', priority: 0.8, changeFrequency: 'weekly' as const },
    { url: '/best-neurosurgeon-in-hyderabad', priority: 0.9, changeFrequency: 'monthly' as const },
    { url: '/brain-surgery', priority: 0.8, changeFrequency: 'monthly' as const },
    { url: '/spine-surgery', priority: 0.8, changeFrequency: 'monthly' as const },
    { url: '/pediatric-neurosurgery', priority: 0.7, changeFrequency: 'monthly' as const },
    { url: '/technology-innovation', priority: 0.7, changeFrequency: 'monthly' as const },
  ];

  const unique = new Set<string>();
  const entries: MetadataRoute.Sitemap = [];

  function add(url: string, priority: number, changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency']) {
    const full = `${SITE_URL}${url}`;
    if (unique.has(full)) return;
    unique.add(full);
    entries.push({ url: full, lastModified: now, changeFrequency, priority });
  }

  // Core
  for (const p of corePages) add(p.url, p.priority, p.changeFrequency);

  // Services / Conditions / Locations (canonical only)
  for (const e of sitemapServices()) {
    if (!unique.has(e.url)) {
      unique.add(e.url);
      entries.push(e);
    }
  }
  for (const e of sitemapConditions()) {
    if (!unique.has(e.url)) {
      unique.add(e.url);
      entries.push(e);
    }
  }
  for (const e of sitemapLocations()) {
    if (!unique.has(e.url)) {
      unique.add(e.url);
      entries.push(e);
    }
  }

  // Blog posts from content/blog
  const posts = await getAllBlogPosts();
  for (const post of posts) add(`/blog/${post.slug}`, 0.7, 'daily');

  // Resource hubs
  const resourcePages = [
    '/knowledge-base',
    '/blog',
    '/patient-stories',
    '/research',
    '/media',
    '/technology-facilities',
  ];
  for (const page of resourcePages) add(page, 0.7, 'weekly');

  // Legal
  const legalPages = [
    '/privacy',
    '/cookies',
    '/terms',
    '/disclaimer',
    '/medical-disclaimer',
    '/content-integrity',
    '/editorial-policy',
  ];
  for (const page of legalPages) add(page, 0.3, 'yearly');

  return entries;
}

