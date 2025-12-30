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
    { url: '/services/cervical-spine-surgery-hyderabad', priority: 0.8 },
    { url: '/services/lumbar-spine-surgery-hyderabad', priority: 0.8 },
    { url: '/services/disc-replacement-surgery-hyderabad', priority: 0.8 },
    { url: '/services/spinal-decompression-hyderabad', priority: 0.7 },
    { url: '/services/kyphoplasty-vertebroplasty-hyderabad', priority: 0.7 },
    { url: '/services/scoliosis-surgery-hyderabad', priority: 0.7 },
    
    // Brain procedures
    { url: '/services/awake-craniotomy-hyderabad', priority: 0.8 },
    { url: '/services/epilepsy-surgery-hyderabad', priority: 0.8 },
    { url: '/services/pituitary-tumor-surgery-hyderabad', priority: 0.7 },
    { url: '/services/acoustic-neuroma-surgery-hyderabad', priority: 0.7 },
    { url: '/services/brain-aneurysm-surgery-hyderabad', priority: 0.7 },
    { url: '/services/hydrocephalus-treatment-hyderabad', priority: 0.7 },
    { url: '/services/deep-brain-stimulation-hyderabad', priority: 0.7 },
    
    // Nerve procedures
    { url: '/services/peripheral-nerve-surgery-hyderabad', priority: 0.8 },
    { url: '/services/trigeminal-neuralgia-surgery-hyderabad', priority: 0.8 },
    { url: '/services/cooled-radiofrequency-ablation-hyderabad', priority: 0.8 },
    { url: '/services/carpal-tunnel-surgery-hyderabad', priority: 0.7 },
    { url: '/services/brachial-plexus-surgery-hyderabad', priority: 0.7 },
    { url: '/services/nerve-decompression-surgery-hyderabad', priority: 0.7 },
    
    // Cost pages (high commercial intent)
    { url: '/services/spine-surgery-cost-hyderabad', priority: 0.9 },
    { url: '/services/slip-disc-surgery-cost-hyderabad', priority: 0.9 },
    { url: '/services/brain-surgery-cost-hyderabad', priority: 0.9 },
    { url: '/services/endoscopic-surgery-cost-calculator', priority: 0.8 },
    
    // Technology and techniques
    { url: '/services/robotic-spine-surgery-hyderabad', priority: 0.8 },
    { url: '/services/navigation-guided-surgery-hyderabad', priority: 0.7 },
    { url: '/services/microscopic-spine-surgery-hyderabad', priority: 0.7 },
    { url: '/services/laser-spine-surgery-hyderabad', priority: 0.7 },
    
    // Emergency services
    { url: '/services/emergency-neurosurgery-hyderabad', priority: 0.8 },
    { url: '/services/trauma-neurosurgery-hyderabad', priority: 0.7 },
    { url: '/services/spine-fracture-surgery-hyderabad', priority: 0.7 },
  ];

  return services.map(service => ({
    url: `${SITE_URL}${service.url}`,
    lastModified: now,
    changeFrequency: 'weekly' as const,
    priority: service.priority,
  }));
}
