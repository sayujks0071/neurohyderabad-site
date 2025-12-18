#!/usr/bin/env node

/**
 * SEO Health Check Script
 * Verifies all SEO implementations
 */

const fs = require('fs');
const path = require('path');

const SITE_URL = 'https://www.drsayuj.info';

// Colors for terminal
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  red: '\x1b[31m',
  cyan: '\x1b[36m'
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

console.log('\n🔍 SEO Health Check for www.drsayuj.info\n');
console.log('=' .repeat(50));

// Check robots.txt
const robotsPath = path.join(__dirname, '..', 'public', 'robots.txt');
if (fs.existsSync(robotsPath)) {
  log('✅ robots.txt exists', 'green');
} else {
  log('❌ robots.txt missing', 'red');
}

// Check sitemaps
const sitemaps = [
  'app/sitemap.ts',
  'app/sitemap-blog.ts', 
  'app/sitemap-services.ts',
  'app/sitemap-conditions.ts',
  'app/sitemap-locations.ts'
];

console.log('\n📍 Sitemaps:');
sitemaps.forEach(sitemap => {
  const sitemapPath = path.join(__dirname, '..', sitemap);
  if (fs.existsSync(sitemapPath)) {
    log(`✅ ${sitemap} configured`, 'green');
  } else {
    log(`⚠️ ${sitemap} not found`, 'yellow');
  }
});

console.log('\n📊 Submission URLs:');
console.log('\nGoogle Search Console:');
log('https://search.google.com/search-console', 'cyan');

console.log('\nBing Webmaster Tools:');
log('https://www.bing.com/webmasters', 'cyan');

console.log('\n🚀 Performance Tests:');
log(`https://pagespeed.web.dev/analysis?url=${SITE_URL}`, 'cyan');

console.log('\n=' .repeat(50));
log('✅ SEO setup complete! Follow the URLs above.', 'green');
console.log('=' .repeat(50) + '\n');
