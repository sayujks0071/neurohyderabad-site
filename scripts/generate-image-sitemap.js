#!/usr/bin/env node

/**
 * Generate Image Sitemap
 * 
 * Creates an image sitemap for all images on the website.
 */

const fs = require('fs');
const path = require('path');

const SITE_URL = 'https://www.drsayuj.info';
const OUTPUT_FILE = path.join(process.cwd(), 'public', 'sitemap-images.xml');
const PUBLIC_IMAGES_DIR = path.join(process.cwd(), 'public', 'images');

function generateImageSitemap() {
  const images = [];
  
  // Core images
  const coreImages = [
    {
      loc: `${SITE_URL}/images/og-default.jpg`,
      caption: 'Dr. Sayuj Krishnan - Neurosurgeon in Hyderabad',
      title: 'Dr. Sayuj Krishnan - Expert Neurosurgeon',
      license: `${SITE_URL}/content-integrity`
    },
    {
      loc: `${SITE_URL}/images/dr-sayuj-krishnan-portrait-optimized.jpg`,
      caption: 'Dr. Sayuj Krishnan Portrait',
      title: 'Dr. Sayuj Krishnan - Neurosurgeon',
      license: `${SITE_URL}/content-integrity`
    },
    {
      loc: `${SITE_URL}/images/logo-optimized.png`,
      caption: 'Dr. Sayuj Krishnan Logo',
      title: 'Dr. Sayuj Krishnan Neurosurgery Logo',
      license: `${SITE_URL}/content-integrity`
    }
  ];
  
  images.push(...coreImages);
  
  // Scan public/images directory if it exists
  if (fs.existsSync(PUBLIC_IMAGES_DIR)) {
    const imageFiles = fs.readdirSync(PUBLIC_IMAGES_DIR)
      .filter(file => /\.(jpg|jpeg|png|webp|avif)$/i.test(file))
      .map(file => ({
        loc: `${SITE_URL}/images/${file}`,
        caption: file.replace(/[-_]/g, ' ').replace(/\.[^/.]+$/, ''),
        title: file.replace(/[-_]/g, ' ').replace(/\.[^/.]+$/, ''),
        license: `${SITE_URL}/content-integrity`
      }));
    
    images.push(...imageFiles);
  }
  
  // Generate XML
  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"\n';
  xml += '        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n';
  
  // Group images by page (simplified - in production, map images to actual pages)
  const pages = [
    { url: `${SITE_URL}/`, images: images.slice(0, 5) },
    { url: `${SITE_URL}/about`, images: images.filter(img => img.loc.includes('portrait')) },
    { url: `${SITE_URL}/services/minimally-invasive-spine-surgery`, images: images.slice(0, 3) },
  ];
  
  pages.forEach(page => {
    if (page.images.length === 0) return;
    
    xml += '  <url>\n';
    xml += `    <loc>${page.url}</loc>\n`;
    
    page.images.forEach(image => {
      xml += '    <image:image>\n';
      xml += `      <image:loc>${image.loc}</image:loc>\n`;
      if (image.caption) {
        xml += `      <image:caption>${image.caption}</image:caption>\n`;
      }
      if (image.title) {
        xml += `      <image:title>${image.title}</image:title>\n`;
      }
      if (image.license) {
        xml += `      <image:license>${image.license}</image:license>\n`;
      }
      xml += '    </image:image>\n';
    });
    
    xml += '  </url>\n';
  });
  
  xml += '</urlset>';
  
  // Write to file
  fs.writeFileSync(OUTPUT_FILE, xml, 'utf8');
  console.log(`✅ Image sitemap generated: ${OUTPUT_FILE}`);
  console.log(`   Total images: ${images.length}`);
}

generateImageSitemap();
