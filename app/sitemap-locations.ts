import { MetadataRoute } from 'next';

const SITE_URL = 'https://www.drsayuj.info';

export default function sitemapLocations(): MetadataRoute.Sitemap {
  const now = new Date().toISOString();
  
  const locations = [
    // Main locations page
    { url: '/locations', priority: 0.8 },

    // Primary location (Yashoda Hospital Malakpet)
    { url: '/neurosurgeon-malakpet', priority: 1.0 },

    // Major areas in Hyderabad
    { url: '/neurosurgeon-hyderabad', priority: 1.0 },
    { url: '/neurosurgeon-jubilee-hills', priority: 0.9 },
    { url: '/neurosurgeon-banjara-hills', priority: 0.9 },
    { url: '/neurosurgeon-hitech-city', priority: 0.9 },
    { url: '/neurosurgeon-gachibowli', priority: 0.8 },
    { url: '/neurosurgeon-secunderabad', priority: 0.8 },

    // Secondary locations
    { url: '/locations/lb-nagar', priority: 0.7 },
    { url: '/locations/neurosurgeon-kondapur', priority: 0.7 },
    { url: '/locations/neurosurgeon-kothapet', priority: 0.7 },
    { url: '/locations/neurosurgeon-kukatpally', priority: 0.7 },
    { url: '/locations/neurosurgeon-manikonda', priority: 0.7 },
    { url: '/locations/neurosurgeon-nizampet', priority: 0.7 },
    { url: '/locations/neurosurgeon-madhapur', priority: 0.7 },

    // FAQ location pages
    { url: '/locations/neurosurgeon-near-jubilee-hills-faq', priority: 0.6 },
    { url: '/locations/neurosurgeon-near-kachiguda-faq', priority: 0.6 },
    { url: '/locations/neurosurgeon-near-kondapur-faq', priority: 0.6 },
  ];

  return locations.map(location => ({
    url: `${SITE_URL}${location.url}`,
    lastModified: now,
    changeFrequency: 'weekly' as const,
    priority: location.priority,
  }));
}
