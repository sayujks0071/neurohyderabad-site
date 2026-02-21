import { MetadataRoute } from 'next';
const SITE_URL = 'https://www.drsayuj.info';
export default function sitemapServices(): MetadataRoute.Sitemap {
  const now = new Date().toISOString();
  const services = [
    // Primary services (highest priority)
    { url: '/services', priority: 0.9 },
    { url: '/services/minimally-invasive-spine-surgery', priority: 1.0 },
    { url: '/services/endoscopic-discectomy-hyderabad', priority: 1.0 },
    { url: '/services/brain-tumor-surgery-hyderabad', priority: 0.9 },
    { url: '/services/awake-spine-surgery-hyderabad', priority: 0.9 },
    // Spine procedures
    { url: '/services/spinal-fusion-surgery-hyderabad', priority: 0.8 },
    { url: '/services/kyphoplasty-vertebroplasty-hyderabad', priority: 0.7 },
    // Brain procedures
    { url: '/services/epilepsy-surgery-hyderabad', priority: 0.8 },
    // Nerve procedures
    { url: '/services/peripheral-nerve-surgery-hyderabad', priority: 0.8 },
    { url: '/services/cooled-radiofrequency-ablation-hyderabad', priority: 0.8 },
    // Cost pages (high commercial intent)
    { url: '/services/spine-surgery-cost-hyderabad', priority: 0.9 },
    { url: '/services/slip-disc-surgery-cost-hyderabad', priority: 0.9 },
    // Technology and techniques
    { url: '/services/robotic-spine-surgery-hyderabad', priority: 0.8 },
    // Emergency services
  ];
  return services.map(service => ({
    url: `${SITE_URL}${service.url}`,
    lastModified: now,
    changeFrequency: 'weekly' as const,
    priority: service.priority,
  }));
}
