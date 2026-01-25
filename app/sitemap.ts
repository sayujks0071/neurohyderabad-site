import { MetadataRoute } from 'next';
import { getAllBlogPosts } from '@/src/lib/blog';
import { SITE_URL } from '@/src/lib/seo';

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

  const servicePages = [
    '/services/minimally-invasive-spine-surgery',
    '/services/endoscopic-discectomy-hyderabad',
    '/services/brain-tumor-surgery-hyderabad',
    '/services/spinal-fusion-surgery-hyderabad',
    '/services/epilepsy-surgery-hyderabad',
    '/services/peripheral-nerve-surgery-hyderabad',
    '/services/awake-spine-surgery-hyderabad',
    '/services/spine-surgery-cost-hyderabad',
    '/services/slip-disc-surgery-cost-hyderabad',
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

  const conditionPages = [
    '/conditions/brain-tumor-surgery-hyderabad',
    '/conditions/spinal-stenosis-treatment-hyderabad',
    '/conditions/trigeminal-neuralgia-treatment-hyderabad',
    '/conditions/cervical-radiculopathy-treatment-hyderabad',
    '/conditions/slip-disc-treatment-hyderabad',
    // Added Orphans
    '/conditions/brain-bleed-evacuation-hyderabad',
    '/conditions/cervical-myelopathy-decompression-hyderabad',
    '/conditions/osteoporotic-spine-fracture-hyderabad',
    '/conditions/sciatica-pain-treatment-hyderabad',
    '/conditions/spine-tumor-surgery-hyderabad',
    '/conditions/spondylolisthesis-treatment-hyderabad',
    '/conditions/degenerative-disc-disease-treatment-hyderabad',
  ];

  const locationPages = [
    '/neurosurgeon-hyderabad',
    '/neurosurgeon-jubilee-hills',
    '/neurosurgeon-banjara-hills',
    '/neurosurgeon-hitech-city',
    '/neurosurgeon-secunderabad',
    '/neurosurgeon-gachibowli',
    '/neurosurgeon-malakpet',
    '/locations/lb-nagar',
    '/locations/neurosurgeon-kothapet',
    '/locations/brain-spine-surgeon-jubilee-hills',
    '/locations/brain-spine-surgeon-banjara-hills',
    '/locations/brain-spine-surgeon-hitec-city',
    // Added Orphans (High Priority ones)
    '/locations/neurosurgeon-kondapur',
    '/locations/neurosurgeon-kukatpally',
    '/locations/neurosurgeon-manikonda',
    '/locations/neurosurgeon-nizampet',
    '/locations/banjara-hills',
    '/locations/hitech-city',
    '/locations/malakpet',
    '/locations/secunderabad',
    '/locations/neurosurgeon-near-jubilee-hills',
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

  // 1. Dynamic Blog Posts (from MDX content/blog)
  const mdxPosts = await getAllBlogPosts();
  const dynamicBlogUrls = mdxPosts.map(post => `/blog/${post.slug}`);

  // 2. Legacy/Folder-based Blog Posts (from app/blog/*) that are NOT in content/blog
  // Verified from file system audit
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

  const entries: MetadataRoute.Sitemap = [];

  for (const page of corePages) {
    entries.push({
      url: `${SITE_URL}${page.url}`,
      lastModified: now,
      changeFrequency: page.changeFrequency,
      priority: page.priority,
    });
  }

  for (const page of servicePages) {
    entries.push({ url: `${SITE_URL}${page}`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 });
  }

  for (const page of conditionPages) {
    entries.push({ url: `${SITE_URL}${page}`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 });
  }

  for (const page of locationPages) {
    entries.push({ url: `${SITE_URL}${page}`, lastModified: now, changeFrequency: 'weekly', priority: 0.7 });
  }

  for (const page of resourcePages) {
    entries.push({ url: `${SITE_URL}${page}`, lastModified: now, changeFrequency: 'weekly', priority: 0.7 });
  }

  for (const page of allBlogUrls) {
    entries.push({ url: `${SITE_URL}${page}`, lastModified: now, changeFrequency: 'daily', priority: 0.7 });
  }

  for (const page of symptomPages) {
    entries.push({ url: `${SITE_URL}${page}`, lastModified: now, changeFrequency: 'monthly', priority: 0.6 });
  }

  for (const page of legalPages) {
    entries.push({ url: `${SITE_URL}${page}`, lastModified: now, changeFrequency: 'yearly', priority: 0.3 });
  }

  return entries;
}
