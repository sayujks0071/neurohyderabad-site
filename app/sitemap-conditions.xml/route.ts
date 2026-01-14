import { SITE_URL } from "@/src/lib/seo";

export const runtime = "nodejs";
// Regenerate weekly
export const revalidate = 604800;

function escapeXml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

export async function GET() {
  const now = new Date().toISOString();
  
  const conditions = [
    // Main conditions page
    { url: '/conditions', priority: 0.9 },
    
    // Spine conditions (high search volume)
    { url: '/conditions/herniated-disc-treatment-hyderabad', priority: 0.9 },
    { url: '/conditions/slip-disc-treatment-hyderabad', priority: 0.9 },
    { url: '/conditions/sciatica-treatment-hyderabad', priority: 0.9 },
    { url: '/conditions/spinal-stenosis-treatment-hyderabad', priority: 0.8 },
    { url: '/conditions/cervical-radiculopathy-treatment-hyderabad', priority: 0.8 },
    { url: '/conditions/spondylolisthesis-treatment-hyderabad', priority: 0.7 },
    { url: '/conditions/degenerative-disc-disease-hyderabad', priority: 0.7 },
    { url: '/conditions/failed-back-surgery-syndrome-hyderabad', priority: 0.7 },
    { url: '/conditions/spine-tumor-treatment-hyderabad', priority: 0.7 },
    { url: '/conditions/scoliosis-treatment-hyderabad', priority: 0.7 },
    { url: '/conditions/kyphosis-treatment-hyderabad', priority: 0.6 },
    
    // Brain conditions
    { url: '/conditions/brain-tumor-surgery-hyderabad', priority: 0.9 },
    { url: '/conditions/meningioma-treatment-hyderabad', priority: 0.8 },
    { url: '/conditions/glioma-treatment-hyderabad', priority: 0.7 },
    { url: '/conditions/pituitary-adenoma-hyderabad', priority: 0.7 },
    { url: '/conditions/acoustic-neuroma-treatment-hyderabad', priority: 0.7 },
    { url: '/conditions/brain-aneurysm-treatment-hyderabad', priority: 0.7 },
    { url: '/conditions/hydrocephalus-treatment-hyderabad', priority: 0.7 },
    { url: '/conditions/chiari-malformation-hyderabad', priority: 0.6 },
    { url: '/conditions/epilepsy-surgery-candidate-hyderabad', priority: 0.7 },
    
    // Nerve conditions
    { url: '/conditions/trigeminal-neuralgia-treatment-hyderabad', priority: 0.8 },
    { url: '/conditions/carpal-tunnel-syndrome-hyderabad', priority: 0.7 },
    { url: '/conditions/peripheral-neuropathy-hyderabad', priority: 0.7 },
    { url: '/conditions/cubital-tunnel-syndrome-hyderabad', priority: 0.6 },
    { url: '/conditions/brachial-plexus-injury-hyderabad', priority: 0.6 },
    { url: '/conditions/facial-nerve-palsy-hyderabad', priority: 0.6 },
    
    // Pain conditions
    { url: '/conditions/chronic-back-pain-treatment-hyderabad', priority: 0.8 },
    { url: '/conditions/neck-pain-treatment-hyderabad', priority: 0.8 },
    { url: '/conditions/neuropathic-pain-treatment-hyderabad', priority: 0.7 },
    { url: '/conditions/radicular-pain-treatment-hyderabad', priority: 0.7 },
    { url: '/conditions/facet-joint-syndrome-hyderabad', priority: 0.6 },
    
    // Symptom pages (for voice search)
    { url: '/symptoms/signs-of-brain-tumor', priority: 0.8 },
    { url: '/symptoms/pain-on-top-of-head-causes', priority: 0.7 },
    { url: '/symptoms/numbness-tingling-hands-feet', priority: 0.7 },
    { url: '/symptoms/severe-headache-warning-signs', priority: 0.7 },
    { url: '/symptoms/back-pain-red-flags', priority: 0.8 },
    { url: '/symptoms/when-to-see-neurosurgeon', priority: 0.8 },
  ];

  let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
  xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

  for (const condition of conditions) {
    xml += `  <url>\n`;
    xml += `    <loc>${escapeXml(`${SITE_URL}${condition.url}`)}</loc>\n`;
    xml += `    <lastmod>${escapeXml(now)}</lastmod>\n`;
    xml += `    <changefreq>weekly</changefreq>\n`;
    xml += `    <priority>${condition.priority}</priority>\n`;
    xml += `  </url>\n`;
  }

  xml += `</urlset>\n`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
