import { SITE_URL } from '@/src/lib/seo';

export const runtime = 'nodejs';
export const revalidate = 604800; // Weekly

function escapeXml(value: string) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&apos;');
}

export async function GET() {
  const now = new Date().toISOString();
  
  const locations = [
    // Main locations page
    { url: '/locations', priority: 0.8 },
    
    // Primary location (Yashoda Hospital Malakpet)
    { url: '/locations/malakpet', priority: 1.0 },
    { url: '/neurosurgeon-malakpet', priority: 1.0 },
    { url: '/spine-surgeon-malakpet', priority: 0.9 },
    { url: '/brain-surgeon-malakpet', priority: 0.9 },
    { url: '/yashoda-hospital-malakpet-neurosurgeon', priority: 0.9 },
    
    // Major areas in Hyderabad
    { url: '/neurosurgeon-hyderabad', priority: 1.0 },
    { url: '/neurosurgeon-jubilee-hills', priority: 0.9 },
    { url: '/neurosurgeon-banjara-hills', priority: 0.9 },
    { url: '/neurosurgeon-hitech-city', priority: 0.9 },
    { url: '/neurosurgeon-gachibowli', priority: 0.8 },
    { url: '/neurosurgeon-secunderabad', priority: 0.8 },
    { url: '/neurosurgeon-madhapur', priority: 0.8 },
    { url: '/neurosurgeon-kondapur', priority: 0.8 },
    
    // Specific location pages with service combinations
    { url: '/locations/brain-spine-surgeon-jubilee-hills', priority: 0.8 },
    { url: '/locations/brain-spine-surgeon-banjara-hills', priority: 0.8 },
    { url: '/locations/brain-spine-surgeon-hitec-city', priority: 0.8 },
    { url: '/locations/endoscopic-spine-surgeon-hyderabad', priority: 0.9 },
    { url: '/locations/minimally-invasive-surgeon-hyderabad', priority: 0.8 },
    
    // Secondary locations
    { url: '/locations/lb-nagar', priority: 0.7 },
    { url: '/neurosurgeon-lb-nagar', priority: 0.7 },
    { url: '/neurosurgeon-uppal', priority: 0.7 },
    { url: '/neurosurgeon-dilsukhnagar', priority: 0.7 },
    { url: '/neurosurgeon-kukatpally', priority: 0.7 },
    { url: '/neurosurgeon-miyapur', priority: 0.7 },
    { url: '/neurosurgeon-ameerpet', priority: 0.7 },
    { url: '/neurosurgeon-begumpet', priority: 0.7 },
    
    // Nearby cities/areas
    { url: '/neurosurgeon-telangana', priority: 0.6 },
    { url: '/neurosurgeon-andhra-pradesh', priority: 0.6 },
    { url: '/best-neurosurgeon-south-india', priority: 0.7 },
    
    // Hospital-specific pages
    { url: '/yashoda-hospital-neurosurgeon', priority: 0.9 },
    { url: '/best-doctor-yashoda-hospital', priority: 0.8 },
    { url: '/yashoda-malakpet-spine-surgeon', priority: 0.8 },
    
    // Near me variations (for local SEO)
    { url: '/neurosurgeon-near-me', priority: 0.9 },
    { url: '/spine-surgeon-near-me', priority: 0.9 },
    { url: '/brain-surgeon-near-me', priority: 0.8 },
    { url: '/back-pain-doctor-near-me', priority: 0.8 },
  ];

  let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
  xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

  for (const location of locations) {
    xml += `  <url>\n`;
    xml += `    <loc>${escapeXml(SITE_URL + location.url)}</loc>\n`;
    xml += `    <lastmod>${now}</lastmod>\n`;
    xml += `    <changefreq>weekly</changefreq>\n`;
    xml += `    <priority>${location.priority}</priority>\n`;
    xml += `  </url>\n`;
  }

  xml += `</urlset>\n`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400',
    },
  });
}
