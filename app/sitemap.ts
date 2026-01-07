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
    '/services/endoscopic-spine-surgery-hyderabad',
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
    '/blog/headache-vs-brain-tumor-warning-signs',
    '/blog/does-endoscopic-spine-surgery-work-for-sciatica-hyderabad',
    '/blog/when-to-worry-about-back-pain-neurosurgeon-hyderabad',
    '/blog/brain-tumor-surgery-cost-hyderabad',
    '/blog/endoscopic-spine-surgery-cost-hyderabad',
    '/blog/endoscopic-discectomy-cost-hyderabad',
    '/blog/spinal-fusion-cost-hyderabad',
    '/blog/spine-surgery-recovery-timeline-hyderabad',
    '/blog/awake-craniotomy-guide',
    '/blog/day-care-spine-surgery-insurance-hyderabad',
    '/blog/day-care-endoscopic-spine-surgery-eligibility',
    '/blog/endoscopic-cervical-spine-surgery-hyderabad',
    '/blog/endoscopic-vs-microdiscectomy-hyderabad',
    '/blog/return-to-work-after-endoscopic-discectomy-hyderabad',
    '/blog/mvd-vs-radiosurgery-trigeminal-neuralgia',
    '/blog/sciatica-pain-management-hyderabad',
    '/blog/spine-health-maintenance-hyderabad',
    '/blog/disc-replacement-vs-fusion',
    '/blog/how-much-does-brain-surgery-cost-hyderabad',
    '/blog/lumbar-canal-stenosis-walking-pain-hyderabad',
    '/blog/awake-spine-surgery-vs-general-anesthesia-guide',
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
