import { MetadataRoute } from 'next';

const SITE_URL = 'https://www.drsayuj.info';

export default function sitemap(): MetadataRoute.Sitemap {
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
  ];

  const conditionPages = [
    '/conditions/brain-tumor-surgery-hyderabad',
    '/conditions/sciatica-treatment-hyderabad',
    '/conditions/spinal-stenosis-treatment-hyderabad',
    '/conditions/trigeminal-neuralgia-treatment-hyderabad',
    '/conditions/cervical-radiculopathy-treatment-hyderabad',
    '/conditions/slip-disc-treatment-hyderabad',
  ];

  const locationPages = [
    '/neurosurgeon-hyderabad',
    '/neurosurgeon-jubilee-hills',
    '/neurosurgeon-banjara-hills',
    '/neurosurgeon-hitech-city',
    '/neurosurgeon-secunderabad',
    '/neurosurgeon-gachibowli',
    '/neurosurgeon-malakpet',
    '/locations/malakpet',
    '/locations/lb-nagar',
    '/locations/brain-spine-surgeon-jubilee-hills',
    '/locations/brain-spine-surgeon-banjara-hills',
    '/locations/brain-spine-surgeon-hitec-city',
  ];

  const resourcePages = [
    '/knowledge-base',
    '/blog',
    '/patient-stories',
    '/disease-guides',
    '/research',
    '/media',
    '/emergency-rehabilitation',
    '/technology-facilities',
    '/best-neurosurgeon-in-hyderabad',
  ];

  const blogPosts = [
    '/blog/awake-spine-surgery-vs-general-anesthesia-guide',
    '/blog/cervical-spondylosis-neck-pain-hyderabad',
    '/blog/cost-of-endoscopic-spine-surgery-hyderabad',
    '/blog/endoscopic-spine-surgery-recovery-timeline',
    '/blog/headache-vs-brain-tumor-warning-signs',
    '/blog/lumbar-canal-stenosis-walking-pain-hyderabad',
    '/blog/microdiscectomy-vs-laminectomy-recovery-comparison',
    '/blog/neuroplasticity-brain-recovery-hyderabad',
    '/blog/osteoporotic-spine-fracture-elderly-guide',
    '/blog/sciatica-vs-normal-back-pain-guide',
    '/blog/trigeminal-neuralgia-vs-tooth-pain-guide',
    '/blog/understanding-mri-spine-report-guide',
  ];

  const symptomPages = [
    '/symptoms/signs-of-brain-tumor',
    '/symptoms/pain-on-top-of-head-causes',
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

  for (const page of blogPosts) {
    entries.push({ url: `${SITE_URL}${page}`, lastModified: now, changeFrequency: 'monthly', priority: 0.6 });
  }

  for (const page of symptomPages) {
    entries.push({ url: `${SITE_URL}${page}`, lastModified: now, changeFrequency: 'monthly', priority: 0.6 });
  }

  for (const page of legalPages) {
    entries.push({ url: `${SITE_URL}${page}`, lastModified: now, changeFrequency: 'yearly', priority: 0.3 });
  }

  return entries;
}
