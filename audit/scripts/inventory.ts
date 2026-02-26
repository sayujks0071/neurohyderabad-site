import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

// Replicate logic from app/sitemap-services.ts
const sitemapServices = () => {
  const services = [
    { url: '/services', priority: 0.9 },
    { url: '/services/minimally-invasive-spine-surgery', priority: 1.0 },
    { url: '/services/endoscopic-discectomy-hyderabad', priority: 1.0 },
    { url: '/services/brain-tumor-surgery-hyderabad', priority: 0.9 },
    { url: '/services/awake-spine-surgery-hyderabad', priority: 0.9 },
    { url: '/services/spinal-fusion-surgery-hyderabad', priority: 0.8 },
    { url: '/services/kyphoplasty-vertebroplasty-hyderabad', priority: 0.7 },
    { url: '/services/epilepsy-surgery-hyderabad', priority: 0.8 },
    { url: '/services/peripheral-nerve-surgery-hyderabad', priority: 0.8 },
    { url: '/services/cooled-radiofrequency-ablation-hyderabad', priority: 0.8 },
    { url: '/services/spine-surgery-cost-hyderabad', priority: 0.9 },
    { url: '/services/slip-disc-surgery-cost-hyderabad', priority: 0.9 },
    { url: '/services/robotic-spine-surgery-hyderabad', priority: 0.8 },
  ];
  return services.map(s => ({ ...s, changeFrequency: 'weekly' }));
};

// Replicate logic from app/sitemap-conditions.ts
const sitemapConditions = () => {
  const conditions = [
    { url: '/conditions', priority: 0.9 },
    { url: '/conditions/herniated-disc-treatment-hyderabad', priority: 0.9 },
    { url: '/conditions/slip-disc-treatment-hyderabad', priority: 0.9 },
    { url: '/conditions/sciatica-pain-treatment-hyderabad', priority: 0.9 },
    { url: '/conditions/spinal-stenosis-treatment-hyderabad', priority: 0.8 },
    { url: '/conditions/cervical-radiculopathy-treatment-hyderabad', priority: 0.8 },
    { url: '/conditions/spondylolisthesis-treatment-hyderabad', priority: 0.7 },
    { url: '/conditions/scoliosis-treatment-hyderabad', priority: 0.7 },
    { url: '/conditions/brain-tumor-surgery-hyderabad', priority: 0.9 },
    { url: '/conditions/pituitary-adenoma-hyderabad', priority: 0.7 },
    { url: '/conditions/acoustic-neuroma-treatment-hyderabad', priority: 0.7 },
    { url: '/conditions/brain-aneurysm-treatment-hyderabad', priority: 0.7 },
    { url: '/conditions/chiari-malformation-hyderabad', priority: 0.6 },
    { url: '/conditions/trigeminal-neuralgia-treatment-hyderabad', priority: 0.8 },
    { url: '/conditions/carpal-tunnel-syndrome-hyderabad', priority: 0.7 },
    { url: '/symptoms/signs-of-brain-tumor', priority: 0.8 },
    { url: '/symptoms/pain-on-top-of-head-causes', priority: 0.7 },
  ];
  return conditions.map(c => ({ ...c, changeFrequency: 'weekly' }));
};

// Replicate logic from app/sitemap-locations.ts
const sitemapLocations = () => {
  const locations = [
    { url: '/locations', priority: 0.8 },
    { url: '/neurosurgeon-malakpet', priority: 1.0 },
    { url: '/neurosurgeon-hyderabad', priority: 1.0 },
    { url: '/neurosurgeon-jubilee-hills', priority: 0.9 },
    { url: '/neurosurgeon-banjara-hills', priority: 0.9 },
    { url: '/neurosurgeon-hitech-city', priority: 0.9 },
    { url: '/neurosurgeon-gachibowli', priority: 0.8 },
    { url: '/neurosurgeon-secunderabad', priority: 0.8 },
    { url: '/locations/lb-nagar', priority: 0.7 },
    { url: '/locations/neurosurgeon-kondapur', priority: 0.7 },
    { url: '/locations/neurosurgeon-kothapet', priority: 0.7 },
    { url: '/locations/neurosurgeon-kukatpally', priority: 0.7 },
    { url: '/locations/neurosurgeon-manikonda', priority: 0.7 },
    { url: '/locations/neurosurgeon-nizampet', priority: 0.7 },
    { url: '/locations/neurosurgeon-madhapur', priority: 0.7 },
    { url: '/locations/neurosurgeon-near-jubilee-hills-faq', priority: 0.6 },
    { url: '/locations/neurosurgeon-near-kachiguda-faq', priority: 0.6 },
    { url: '/locations/neurosurgeon-near-kondapur-faq', priority: 0.6 },
  ];
  return locations.map(l => ({ ...l, changeFrequency: 'weekly' }));
};

// Replicate logic from app/sitemap.xml/route.ts (Core Pages)
const getCorePages = () => {
  return [
    { url: '', priority: 1.0, changeFrequency: 'daily' },
    { url: '/about', priority: 0.9, changeFrequency: 'weekly' },
    { url: '/appointments', priority: 0.9, changeFrequency: 'weekly' },
    { url: '/contact', priority: 0.8, changeFrequency: 'weekly' },
    { url: '/services', priority: 0.9, changeFrequency: 'weekly' },
    { url: '/conditions', priority: 0.9, changeFrequency: 'weekly' },
    { url: '/locations', priority: 0.8, changeFrequency: 'weekly' },
    { url: '/best-neurosurgeon-in-hyderabad', priority: 0.9, changeFrequency: 'monthly' },
    { url: '/brain-surgery', priority: 0.8, changeFrequency: 'monthly' },
    { url: '/spine-surgery', priority: 0.8, changeFrequency: 'monthly' },
    { url: '/pediatric-neurosurgery', priority: 0.7, changeFrequency: 'monthly' },
    { url: '/technology-innovation', priority: 0.7, changeFrequency: 'monthly' },
    { url: '/knowledge-base', priority: 0.7, changeFrequency: 'weekly' },
    { url: '/blog', priority: 0.7, changeFrequency: 'weekly' },
    { url: '/patient-stories', priority: 0.7, changeFrequency: 'weekly' },
    { url: '/research', priority: 0.7, changeFrequency: 'weekly' },
    { url: '/media', priority: 0.7, changeFrequency: 'weekly' },
    { url: '/technology-facilities', priority: 0.7, changeFrequency: 'weekly' },
    { url: '/privacy', priority: 0.3, changeFrequency: 'yearly' },
    { url: '/cookies', priority: 0.3, changeFrequency: 'yearly' },
    { url: '/terms', priority: 0.3, changeFrequency: 'yearly' },
    { url: '/disclaimer', priority: 0.3, changeFrequency: 'yearly' },
    { url: '/medical-disclaimer', priority: 0.3, changeFrequency: 'yearly' },
    { url: '/content-integrity', priority: 0.3, changeFrequency: 'yearly' },
    { url: '/editorial-policy', priority: 0.3, changeFrequency: 'yearly' },
  ];
};

// Blog Posts Logic
const getBlogPosts = () => {
  const BLOG_DIR = path.join(process.cwd(), 'content', 'blog');
  const FORBIDDEN_KEYWORDS = ['example', 'test', 'draft', 'sample', 'template', 'placeholder'];

  try {
    if (!fs.existsSync(BLOG_DIR)) return [];

    const files = fs.readdirSync(BLOG_DIR);
    const posts: any[] = [];

    files.forEach(file => {
      if (!file.endsWith('.md') && !file.endsWith('.mdx')) return;
      if (file === 'README.md') return;

      const filePath = path.join(BLOG_DIR, file);
      const fileContent = fs.readFileSync(filePath, 'utf8');
      const { data } = matter(fileContent);

      const slug = data.slug || path.basename(file, path.extname(file));

      // Skip forbidden
      if (FORBIDDEN_KEYWORDS.some(k => slug.toLowerCase().includes(k))) return;

      posts.push({
        url: `/blog/${slug}`,
        priority: 0.7,
        changeFrequency: 'daily'
      });
    });

    return posts;
  } catch (error) {
    console.error('Error reading blog posts:', error);
    return [];
  }
};

async function generateInventory() {
  const allUrls = [
    ...getCorePages(),
    ...sitemapServices(),
    ...sitemapConditions(),
    ...sitemapLocations(),
    ...getBlogPosts()
  ];

  // Dedup
  const uniqueUrls = new Map();
  allUrls.forEach(item => {
    // Normalize URL
    let url = item.url;
    if (!url.startsWith('/')) url = '/' + url;
    if (url === '/') url = ''; // Keep homepage as empty string for consistency with corePages or adjust later.
    // Actually, corePages uses empty string for homepage.
    // Let's normalize to full URL for the output.
    const fullUrl = `https://www.drsayuj.info${url}`;

    if (!uniqueUrls.has(fullUrl)) {
        uniqueUrls.set(fullUrl, {
            url: fullUrl,
            priority: item.priority,
            changeFrequency: item.changeFrequency
        });
    }
  });

  const inventory = Array.from(uniqueUrls.values());

  console.log(`Found ${inventory.length} unique URLs.`);

  const outputPath = path.join(process.cwd(), 'audit', 'crawl', 'url_inventory.json');
  fs.writeFileSync(outputPath, JSON.stringify(inventory, null, 2));
  console.log(`Wrote inventory to ${outputPath}`);
}

generateInventory();
