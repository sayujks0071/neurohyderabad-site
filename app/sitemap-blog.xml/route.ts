import { SITE_URL } from '@/src/lib/seo';

export const runtime = 'nodejs';
// Regenerate weekly
export const revalidate = 604800;

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
  
  // High-value SEO blog posts targeting competitive keywords
  const blogPosts = [
    // Cost-related (high commercial intent)
    { url: '/blog/spine-surgery-cost-complete-guide-hyderabad', priority: 0.9 },
    { url: '/blog/brain-tumor-surgery-cost-hyderabad', priority: 0.9 },
    { url: '/blog/endoscopic-spine-surgery-cost-hyderabad', priority: 0.9 },
    { url: '/blog/insurance-coverage-neurosurgery-india', priority: 0.8 },
    
    // Procedure comparisons (featured snippet targets)
    { url: '/blog/endoscopic-vs-open-spine-surgery-comparison', priority: 0.9 },
    { url: '/blog/endoscopic-vs-microdiscectomy-hyderabad', priority: 0.8 },
    { url: '/blog/fusion-vs-disc-replacement-guide', priority: 0.8 },
    { url: '/blog/awake-vs-general-anesthesia-spine-surgery', priority: 0.8 },
    
    // Recovery guides (high search volume)
    { url: '/blog/spine-surgery-recovery-timeline-hyderabad', priority: 0.8 },
    { url: '/blog/return-to-work-after-endoscopic-discectomy-hyderabad', priority: 0.7 },
    { url: '/blog/post-surgery-rehabilitation-guide', priority: 0.7 },
    { url: '/blog/exercises-after-spine-surgery', priority: 0.7 },
    
    // Condition-specific guides
    { url: '/blog/herniated-disc-treatment-without-surgery', priority: 0.8 },
    { url: '/blog/sciatica-pain-management-hyderabad', priority: 0.8 },
    { url: '/blog/when-to-worry-about-back-pain-neurosurgeon-hyderabad', priority: 0.8 },
    { url: '/blog/trigeminal-neuralgia-treatment-options', priority: 0.7 },
    
    // Technology and innovation
    { url: '/blog/robotic-spine-surgery-hyderabad-2024', priority: 0.7 },
    { url: '/blog/latest-advances-neurosurgery-2024', priority: 0.7 },
    { url: '/blog/navigation-guided-spine-surgery-benefits', priority: 0.6 },
    
    // Patient education
    { url: '/blog/how-to-choose-best-neurosurgeon-hyderabad', priority: 0.8 },
    { url: '/blog/questions-to-ask-before-spine-surgery', priority: 0.7 },
    { url: '/blog/second-opinion-brain-spine-surgery', priority: 0.7 },
    { url: '/blog/preparing-for-neurosurgery-complete-guide', priority: 0.6 },
    
    // Emergency and urgent care
    { url: '/blog/emergency-signs-need-neurosurgeon', priority: 0.7 },
    { url: '/blog/head-injury-when-to-seek-help', priority: 0.7 },
    { url: '/blog/acute-back-pain-emergency-signs', priority: 0.6 },
    
    // Success stories and testimonials
    { url: '/blog/endoscopic-surgery-success-stories-hyderabad', priority: 0.6 },
    { url: '/blog/patient-testimonials-spine-surgery', priority: 0.6 },
    { url: '/blog/life-after-brain-tumor-surgery', priority: 0.6 },
    
    // Existing blog posts
    { url: '/blog/does-endoscopic-spine-surgery-work-for-sciatica-hyderabad', priority: 0.7 },
    { url: '/blog/brain-tumor-surgery-cost-hyderabad', priority: 0.8 },
    { url: '/blog/endoscopic-discectomy-cost-hyderabad', priority: 0.7 },
    { url: '/blog/spinal-fusion-cost-hyderabad', priority: 0.7 },
    { url: '/blog/awake-craniotomy-guide', priority: 0.6 },
    { url: '/blog/day-care-spine-surgery-insurance-hyderabad', priority: 0.7 },
    { url: '/blog/day-care-endoscopic-spine-surgery-eligibility', priority: 0.6 },
    { url: '/blog/endoscopic-cervical-spine-surgery-hyderabad', priority: 0.6 },
    { url: '/blog/mvd-vs-radiosurgery-trigeminal-neuralgia', priority: 0.6 },
    { url: '/blog/spine-health-maintenance-hyderabad', priority: 0.5 },
    { url: '/blog/disc-replacement-vs-fusion', priority: 0.6 },
    { url: '/blog/how-much-does-brain-surgery-cost-hyderabad', priority: 0.8 },
  ];

  let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
  xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

  for (const post of blogPosts) {
    xml += `  <url>\n`;
    xml += `    <loc>${escapeXml(SITE_URL + post.url)}</loc>\n`;
    xml += `    <lastmod>${now}</lastmod>\n`;
    xml += `    <changefreq>weekly</changefreq>\n`;
    xml += `    <priority>${post.priority}</priority>\n`;
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
