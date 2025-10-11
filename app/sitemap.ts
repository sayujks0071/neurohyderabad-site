import { MetadataRoute } from 'next';
import { patientStories } from '../src/content/stories';

// ISR: Revalidate every hour
export const revalidate = 3600;

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.drsayuj.info';
  const now = new Date();
  
  const entries: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 1,
    },
    // Service pages (non-trailing slash, consistent with next.config.mjs)
    {
      url: `${baseUrl}/services/minimally-invasive-spine-surgery`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/services/endoscopic-discectomy-hyderabad`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/services/brain-tumor-surgery-hyderabad`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/services/epilepsy-surgery-hyderabad`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/services/peripheral-nerve-surgery-hyderabad`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/services/spinal-fusion-surgery-hyderabad`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    // Condition pages (new high-intent pages)
    {
      url: `${baseUrl}/conditions/brain-tumor-surgery-hyderabad`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.85,
    },
    {
      url: `${baseUrl}/conditions/trigeminal-neuralgia-treatment-hyderabad`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/conditions/cervical-radiculopathy-treatment-hyderabad`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/conditions/sciatica-treatment-hyderabad`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/conditions/slip-disc-treatment-hyderabad`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/conditions/spinal-stenosis-treatment-hyderabad`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    // Symptom pages
    {
      url: `${baseUrl}/symptoms/signs-of-brain-tumor`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.75,
    },
    {
      url: `${baseUrl}/symptoms/pain-on-top-of-head-causes`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    // Location pages
    {
      url: `${baseUrl}/locations`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/locations/brain-spine-surgeon-banjara-hills`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/locations/brain-spine-surgeon-hitec-city`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/locations/brain-spine-surgeon-jubilee-hills`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    // Blog pages
    {
      url: `${baseUrl}/blog/endoscopic-spine-surgery-cost-hyderabad`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blog/return-to-work-after-endoscopic-discectomy-hyderabad`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blog/endoscopic-vs-microdiscectomy-hyderabad`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blog/sciatica-pain-management-hyderabad`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blog/spine-health-maintenance-hyderabad`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blog/spine-surgery-recovery-timeline-hyderabad`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    // Core pages
    {
      url: `${baseUrl}/patient-stories`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/appointments`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/ai-chat`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/technology-facilities`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/emergency-rehabilitation`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/disease-guides`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
  ];

  const storyEntries: MetadataRoute.Sitemap = patientStories.map((story) => ({
    url: `${baseUrl}/patient-stories/${story.slug}`,
    lastModified: new Date(story.date),
    changeFrequency: 'monthly',
    priority: 0.5,
  }));

  return [...entries, ...storyEntries];
}
