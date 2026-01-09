const fs = require('fs');
const path = require('path');

// Mock content of sitemap.ts based on read_file output
const sitemapUrls = [
    // Core
    '/',
    '/about',
    '/appointments',
    '/contact',
    '/services',
    '/conditions',
    '/locations',
    '/best-neurosurgeon-in-hyderabad',

    // Services
    '/services/minimally-invasive-spine-surgery',
    '/services/endoscopic-discectomy-hyderabad',
    '/services/brain-tumor-surgery-hyderabad',
    '/services/spinal-fusion-surgery-hyderabad',
    '/services/epilepsy-surgery-hyderabad',
    '/services/peripheral-nerve-surgery-hyderabad',
    '/services/awake-spine-surgery-hyderabad',
    '/services/spine-surgery-cost-hyderabad',
    '/services/slip-disc-surgery-cost-hyderabad',

    // Conditions
    '/conditions/brain-tumor-surgery-hyderabad',
    '/conditions/sciatica-treatment-hyderabad',
    '/conditions/spinal-stenosis-treatment-hyderabad',
    '/conditions/trigeminal-neuralgia-treatment-hyderabad',
    '/conditions/cervical-radiculopathy-treatment-hyderabad',
    '/conditions/slip-disc-treatment-hyderabad',

    // Locations
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

    // Resources
    '/knowledge-base',
    '/blog',
    '/patient-stories',
    '/disease-guides',
    '/research',
    '/media',
    '/emergency-rehabilitation',
    '/technology-facilities',

    // Blog Posts (from sitemap.ts)
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
    '/blog/trigeminal-neuralgia-vs-tooth-pain-guide',
    '/blog/osteoporotic-spine-fracture-elderly-guide',

    // Symptoms
    '/symptoms/signs-of-brain-tumor',
    '/symptoms/pain-on-top-of-head-causes',

    // Legal
    '/privacy',
    '/cookies',
    '/terms',
    '/disclaimer',
    '/medical-disclaimer',
    '/content-integrity',
    '/editorial-policy',
];

const blogDir = 'content/blog';
let mdxFiles = [];
try {
    mdxFiles = fs.readdirSync(blogDir).filter(f => f.endsWith('.mdx'));
} catch (e) {
    console.error('Error reading blog dir', e);
}

// Convert sitemap URLs to inventory objects
const inventory = sitemapUrls.map(url => {
    let type = 'other';
    if (url === '/') type = 'home';
    else if (url.startsWith('/services')) type = 'service';
    else if (url.startsWith('/conditions')) type = 'condition';
    else if (url.startsWith('/locations') || url.includes('neurosurgeon-')) type = 'location';
    else if (url.startsWith('/blog')) type = 'blog';

    return {
        url: `https://www.drsayuj.info${url}`,
        path: url,
        type: type,
        inSitemap: true,
        source: 'sitemap.ts'
    };
});

// Check for MDX files not in sitemap
mdxFiles.forEach(file => {
    const slug = file.replace('.mdx', '');
    const expectedPath = `/blog/${slug}`;
    const exists = inventory.find(i => i.path === expectedPath);

    if (!exists) {
        inventory.push({
            url: `https://www.drsayuj.info${expectedPath}`,
            path: expectedPath,
            type: 'blog',
            inSitemap: false,
            source: 'mdx_file',
            note: 'Orphan content? Not in sitemap.ts'
        });
    } else {
        exists.hasMdxSource = true;
    }
});

// Mark missing content for sitemap entries
inventory.filter(i => i.type === 'blog').forEach(item => {
    if (item.source === 'sitemap.ts' && !item.hasMdxSource) {
        item.note = 'Phantom URL? In sitemap but no matching MDX file found yet (could be hardcoded page)';
    }
});

fs.writeFileSync('audit/crawl/url_inventory.json', JSON.stringify(inventory, null, 2));
console.log(`Generated inventory with ${inventory.length} URLs`);

// Generate CSV
const csvHeader = 'url,path,type,in_sitemap,source,note\n';
const csvRows = inventory.map(i => `"${i.url}","${i.path}","${i.type}",${i.inSitemap},"${i.source}","${i.note || ''}"`).join('\n');
fs.writeFileSync('audit/crawl/url_inventory.csv', csvHeader + csvRows);
