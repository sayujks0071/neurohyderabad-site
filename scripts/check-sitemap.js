#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const sitemapPath = path.join(process.cwd(), 'public', 'sitemap.xml');

try {
  if (!fs.existsSync(sitemapPath)) {
    console.error('❌ Sitemap not found at public/sitemap.xml');
    process.exit(1);
  }

  const xml = fs.readFileSync(sitemapPath, 'utf-8').trim();
  if (!xml.startsWith('<?xml') || !xml.includes('<urlset')) {
    console.error('❌ Sitemap XML is missing required declaration or <urlset> tag');
    process.exit(1);
  }

  console.log('✅ Sitemap looks valid at public/sitemap.xml');
  process.exit(0);
} catch (error) {
  console.error('❌ Sitemap check failed:', error.message);
  process.exit(1);
}
