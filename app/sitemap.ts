import { MetadataRoute } from 'next';
import { getAllBlogPosts } from '@/src/lib/blog';
import { SITE_URL } from '@/src/lib/seo';
import sitemapServices from './sitemap-services';
import sitemapConditions from './sitemap-conditions';
import sitemapLocations from './sitemap-locations';
export const revalidate = 86400; // Regenerate daily
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date().toISOString();
  const corePages = [
    { url: '', priority: 1.0, changeFrequency: 'daily' as const },
    { url: '/about', priority: 1.0, changeFrequency: 'weekly' as const },
    { url: '/appointments', priority: 0.9, changeFrequency: 'weekly' as const },
    { url: '/contact', priority: 0.9, changeFrequency: 'weekly' as const },
    { url: '/services', priority: 0.9, changeFrequency: 'weekly' as const },
    { url: '/conditions', priority: 0.9, changeFrequency: 'weekly' as const },
    { url: '/locations', priority: 0.8, changeFrequency: 'weekly' as const },
    { url: '/best-neurosurgeon-in-hyderabad', priority: 0.9, changeFrequency: 'monthly' as const },
    { url: '/brain-surgery', priority: 0.8, changeFrequency: 'monthly' as const },
    { url: '/pediatric-neurosurgery', priority: 0.7, changeFrequency: 'monthly' as const },
    { url: '/spine-surgery', priority: 0.8, changeFrequency: 'monthly' as const },
    { url: '/symptoms-checker', priority: 0.7, changeFrequency: 'monthly' as const },
    { url: '/technology-innovation', priority: 0.7, changeFrequency: 'monthly' as const },
  ];
  // Helper to deduplicate entries based on URL
  const uniqueUrls = new Set<string>();
  const finalEntries: MetadataRoute.Sitemap = [];
  const addEntries = (entries: MetadataRoute.Sitemap) => {
    for (const entry of entries) {
      if (!uniqueUrls.has(entry.url)) {
        uniqueUrls.add(entry.url);
        finalEntries.push(entry);
      }
    }
  };
  // 1. Add Core Pages
  const coreEntries: MetadataRoute.Sitemap = corePages.map(page => ({
    url: `${SITE_URL}${page.url}`,
    lastModified: now,
    changeFrequency: page.changeFrequency,
    priority: page.priority,
  }));
  addEntries(coreEntries);
  // 2. Add Imported Sitemaps (Services, Conditions, Locations)
  addEntries(sitemapServices());
  addEntries(sitemapConditions());
  addEntries(sitemapLocations());
  // 3. Add Orphaned/Legacy Pages (If not already covered by imported sitemaps)
  // These lists are retained from the previous sitemap.ts to ensure no URL is lost
  // If they exist in imported sitemaps, they will be skipped by deduplication.
  const extraServicePages = [
    // Added Orphans
    '/services/cervical-endoscopic-spine-surgery-hyderabad',
    '/services/compare-neurosurgeons-hyderabad',
    '/services/cooled-radiofrequency-ablation-hyderabad',
    '/services/dr-sayuj-vs-apollo-neuro-icu',
    '/services/endoscopic-spine-surgery-hyderabad',
    '/services/kims-spine-surgery-second-opinion',
    '/services/lumbar-laminectomy-surgery-hyderabad',
    '/services/peripheral-nerve-surgery',
    '/services/spinal-fusion',
    '/services/spine-surgery-hyderabad',
    '/services/uniportal-endoscopic-spine-surgery-hyderabad',
    '/services/cervical-disc-replacement-hyderabad',
    '/services/kyphoplasty-vertebroplasty-hyderabad',
    '/services/microdiscectomy-surgery-cost-hyderabad',
    '/services/robotic-spine-surgery-hyderabad',
    '/services/spinal-decompression-surgery-hyderabad',
  ];
  const extraConditionPages = [
    // Added Orphans
    '/conditions/brain-bleed-evacuation-hyderabad',
    '/conditions/cervical-myelopathy-decompression-hyderabad',
    '/conditions/osteoporotic-spine-fracture-hyderabad',
    '/conditions/sciatica-pain-treatment-hyderabad',
    '/conditions/spine-tumor-surgery-hyderabad',
    '/conditions/spondylolisthesis-treatment-hyderabad',
    '/conditions/degenerative-disc-disease-treatment-hyderabad',
  ];
  const extraLocationPages = [
    // Added Orphans (High Priority ones)
    '/locations/neurosurgeon-kondapur',
    '/locations/neurosurgeon-kukatpally',
    '/locations/neurosurgeon-manikonda',
    '/locations/neurosurgeon-nizampet',
    '/locations/banjara-hills',
    '/locations/hitech-city',
    '/locations/malakpet',
    '/locations/secunderabad',
    '/locations/neurosurgeon-uppal',
  ];
  const resourcePages = [
    '/knowledge-base',
    '/blog',
    '/patient-stories',
    '/research',
    '/media',
    '/technology-facilities',
    '/best-neurosurgeon-in-hyderabad',
    '/stories/endoscopic-discectomy-same-day-hyderabad',
    '/stories/endoscopic-ulbd-stenosis-hyderabad',
    '/stories/mvd-trigeminal-neuralgia-hyderabad',
  ];
  for (const page of extraServicePages) {
    addEntries([{ url: `${SITE_URL}${page}`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 }]);
  }
  for (const page of extraConditionPages) {
    addEntries([{ url: `${SITE_URL}${page}`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 }]);
  }
  for (const page of extraLocationPages) {
    addEntries([{ url: `${SITE_URL}${page}`, lastModified: now, changeFrequency: 'weekly', priority: 0.7 }]);
  }
  for (const page of resourcePages) {
    addEntries([{ url: `${SITE_URL}${page}`, lastModified: now, changeFrequency: 'weekly', priority: 0.7 }]);
  }
  // 4. Dynamic Blog Posts (from MDX content/blog)
  const mdxPosts = await getAllBlogPosts();
  const dynamicBlogUrls = mdxPosts.map(post => `/blog/${post.slug}`);
  // 5. Legacy/Folder-based Blog Posts (from app/blog/*) that are NOT in content/blog
  const legacyBlogPosts = [
    '/blog/awake-craniotomy-guide',
    '/blog/brain-tumor-surgery-cost-hyderabad',
    '/blog/day-care-endoscopic-spine-surgery-eligibility',
    '/blog/day-care-spine-surgery-insurance-hyderabad',
    '/blog/disc-replacement-vs-fusion',
    '/blog/does-endoscopic-spine-surgery-work-for-sciatica-hyderabad',
    '/blog/endoscopic-cervical-spine-surgery-hyderabad',
    '/blog/endoscopic-discectomy-cost-hyderabad',
    '/blog/endoscopic-spine-surgery-cost-hyderabad',
    '/blog/endoscopic-vs-microdiscectomy-hyderabad',
    '/blog/how-much-does-brain-surgery-cost-hyderabad',
    '/blog/mvd-vs-radiosurgery-trigeminal-neuralgia',
    '/blog/return-to-work-after-endoscopic-discectomy-hyderabad',
    '/blog/sciatica-pain-management-hyderabad',
    '/blog/spinal-fusion-cost-hyderabad',
    '/blog/spine-health-maintenance-hyderabad',
    '/blog/spine-surgery-recovery-timeline-hyderabad',
    '/blog/when-to-worry-about-back-pain-neurosurgeon-hyderabad',
    '/blog/world-stroke-day-2025-hyderabad-stroke-code',
  ];
  const allBlogUrls = [...new Set([...dynamicBlogUrls, ...legacyBlogPosts])];
  for (const page of allBlogUrls) {
     addEntries([{ url: `${SITE_URL}${page}`, lastModified: now, changeFrequency: 'daily', priority: 0.7 }]);
  }
  const symptomPages = [
    '/symptoms/signs-of-brain-tumor',
    '/symptoms/pain-on-top-of-head-causes',
    '/symptoms/back-pain',
  ];
  const legalPages = [
    '/privacy',
    '/cookies',
    '/terms',
    '/disclaimer',
    '/medical-disclaimer',
    '/content-integrity',
    '/editorial-policy',
  ];
  for (const page of symptomPages) {
    addEntries([{ url: `${SITE_URL}${page}`, lastModified: now, changeFrequency: 'monthly', priority: 0.6 }]);
  }
  for (const page of legalPages) {
    addEntries([{ url: `${SITE_URL}${page}`, lastModified: now, changeFrequency: 'yearly', priority: 0.3 }]);
  }
  return finalEntries;
}
