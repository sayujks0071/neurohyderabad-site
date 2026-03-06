import { MetadataRoute } from 'next';
const SITE_URL = 'https://www.drsayuj.info';
export default function sitemapConditions(): MetadataRoute.Sitemap {
  const now = new Date().toISOString();
  const conditions = [
    // Main conditions page
    { url: '/conditions', priority: 0.9 },
    // Spine conditions (high search volume)
    { url: '/conditions/herniated-disc-treatment-hyderabad', priority: 0.9 },
    { url: '/conditions/slip-disc-treatment-hyderabad', priority: 0.9 },
    { url: '/conditions/sciatica-pain-treatment-hyderabad', priority: 0.9 },
    { url: '/conditions/spinal-stenosis-treatment-hyderabad', priority: 0.8 },
    { url: '/conditions/cervical-radiculopathy-treatment-hyderabad', priority: 0.8 },
    { url: '/conditions/cervical-myelopathy-decompression-hyderabad', priority: 0.8 },
    { url: '/conditions/degenerative-disc-disease-treatment-hyderabad', priority: 0.8 },
    { url: '/conditions/osteoporotic-spine-fracture-hyderabad', priority: 0.7 },
    { url: '/conditions/spondylolisthesis-treatment-hyderabad', priority: 0.7 },
    { url: '/conditions/scoliosis-treatment-hyderabad', priority: 0.7 },
    // Brain conditions
    { url: '/conditions/brain-tumor-surgery-hyderabad', priority: 0.9 },
    { url: '/conditions/brain-bleed-evacuation-hyderabad', priority: 0.8 },
    { url: '/conditions/pituitary-adenoma-hyderabad', priority: 0.7 },
    { url: '/conditions/acoustic-neuroma-treatment-hyderabad', priority: 0.7 },
    { url: '/conditions/brain-aneurysm-treatment-hyderabad', priority: 0.7 },
    { url: '/conditions/chiari-malformation-hyderabad', priority: 0.6 },
    // Nerve conditions
    { url: '/conditions/trigeminal-neuralgia-treatment-hyderabad', priority: 0.8 },
    { url: '/conditions/carpal-tunnel-syndrome-hyderabad', priority: 0.7 },
    // Pain conditions
    // Symptom pages (for voice search)
    { url: '/symptoms/signs-of-brain-tumor', priority: 0.8 },
    { url: '/symptoms/pain-on-top-of-head-causes', priority: 0.7 },
  ];
  return conditions.map(condition => ({
    url: `${SITE_URL}${condition.url}`,
    lastModified: now,
    changeFrequency: 'weekly' as const,
    priority: condition.priority,
  }));
}
