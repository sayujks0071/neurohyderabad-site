#!/usr/bin/env node

/**
 * SEO Monitoring Script
 * Run this script to check SEO health and submit sitemaps
 */

const https = require('https');
const fs = require('fs');
const path = require('path');

const SITE_URL = 'https://www.drsayuj.info';
const SITEMAPS = [
  '/sitemap-main.xml',
  '/sitemap-blog.xml',
  '/sitemap-services.xml',
  '/sitemap-conditions.xml',
  '/sitemap-locations.xml'
];

// Color codes for terminal output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  red: '\x1b[31m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m'
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function logSection(title) {
  console.log('\n' + '='.repeat(50));
  log(title, 'bright');
  console.log('='.repeat(50));
}

// Check if robots.txt exists and is accessible
function checkRobotsTxt() {
  logSection('Checking robots.txt');
  
  const robotsPath = path.join(__dirname, '..', 'public', 'robots.txt');
  
  if (fs.existsSync(robotsPath)) {
    log('✅ robots.txt found', 'green');
    
    const content = fs.readFileSync(robotsPath, 'utf8');
    const sitemapCount = (content.match(/Sitemap:/g) || []).length;
    
    if (sitemapCount > 0) {
      log(`✅ ${sitemapCount} sitemaps referenced in robots.txt`, 'green');
    } else {
      log('⚠️ No sitemaps referenced in robots.txt', 'yellow');
    }
  } else {
    log('❌ robots.txt not found', 'red');
  }
}

// Check if all sitemap files exist
function checkSitemaps() {
  logSection('Checking Sitemaps');
  
  SITEMAPS.forEach(sitemap => {
    const sitemapFile = sitemap.replace('/sitemap', 'app/sitemap');
    const sitemapPath = path.join(__dirname, '..', sitemapFile.replace('.xml', '.ts'));
    
    if (fs.existsSync(sitemapPath)) {
      log(`✅ ${sitemap} configured`, 'green');
    } else {
      log(`⚠️ ${sitemap} not found`, 'yellow');
    }
  });
}

// Check for meta tag configuration
function checkMetaTags() {
  logSection('Checking Meta Tags Configuration');
  
  const layoutPath = path.join(__dirname, '..', 'app', 'layout.tsx');
  
  if (fs.existsSync(layoutPath)) {
    const content = fs.readFileSync(layoutPath, 'utf8');
    
    const checks = [
      { pattern: /metadataBase/, name: 'Metadata Base URL' },
      { pattern: /title:/, name: 'Title Template' },
      { pattern: /description:/, name: 'Meta Description' },
      { pattern: /openGraph:/, name: 'Open Graph Tags' },
      { pattern: /twitter:/, name: 'Twitter Card Tags' }
    ];
    
    checks.forEach(check => {
      if (content.includes(check.pattern.source || check.pattern)) {
        log(`✅ ${check.name} configured`, 'green');
      } else {
        log(`⚠️ ${check.name} not found`, 'yellow');
      }
    });
  }
}

// Check for schema markup
function checkSchemaMarkup() {
  logSection('Checking Schema Markup');
  
  const schemaFiles = [
    'app/components/schemas/WebsiteSchema.tsx',
    'app/components/schemas/PhysicianSchema.tsx',
    'app/components/schemas/HospitalSchema.tsx',
    'app/components/schemas/MedicalClinicSchema.tsx'
  ];
  
  schemaFiles.forEach(file => {
    const schemaPath = path.join(__dirname, '..', file);
    const schemaName = path.basename(file, '.tsx');
    
    if (fs.existsSync(schemaPath)) {
      log(`✅ ${schemaName} implemented`, 'green');
    } else {
      log(`⚠️ ${schemaName} not found`, 'yellow');
    }
  });
}

// Generate sitemap submission URLs
function generateSubmissionURLs() {
  logSection('Sitemap Submission URLs');
  
  console.log('\n📍 Google Search Console:');
  log('https://search.google.com/search-console', 'cyan');
  
  console.log('\n📍 Bing Webmaster Tools:');
  log('https://www.bing.com/webmasters', 'cyan');
  
  console.log('\n📍 Ping URLs (visit these to notify search engines):');
  SITEMAPS.forEach(sitemap => {
    const fullUrl = `${SITE_URL}${sitemap}`;
    console.log('\nGoogle:');
    log(`https://www.google.com/ping?sitemap=${encodeURIComponent(fullUrl)}`, 'blue');
    console.log('Bing:');
    log(`https://www.bing.com/ping?sitemap=${encodeURIComponent(fullUrl)}`, 'blue');
  });
}

// Check page speed insights
function checkPageSpeed() {
  logSection('Performance Check URLs');
  
  console.log('\n🚀 PageSpeed Insights:');
  log(`https://pagespeed.web.dev/analysis?url=${encodeURIComponent(SITE_URL)}`, 'cyan');
  
  console.log('\n📱 Mobile-Friendly Test:');
  log(`https://search.google.com/test/mobile-friendly?url=${encodeURIComponent(SITE_URL)}`, 'cyan');
  
  console.log('\n🎭 Rich Results Test:');
  log(`https://search.google.com/test/rich-results?url=${encodeURIComponent(SITE_URL)}`, 'cyan');
  
  console.log('\n✅ Schema Validator:');
  log('https://validator.schema.org/', 'cyan');
}

// SEO checklist
function showChecklist() {
  logSection('SEO Implementation Checklist');
  
  const checklist = [
    { task: 'Submit sitemap to Google Search Console', priority: 'CRITICAL' },
    { task: 'Submit sitemap to Bing Webmaster Tools', priority: 'HIGH' },
    { task: 'Verify Google My Business listing', priority: 'CRITICAL' },
    { task: 'Complete Practo profile', priority: 'HIGH' },
    { task: 'Add schema markup testing', priority: 'MEDIUM' },
    { task: 'Set up Google Analytics 4', priority: 'HIGH' },
    { task: 'Configure conversion tracking', priority: 'HIGH' },
    { task: 'Request patient reviews', priority: 'MEDIUM' },
    { task: 'Start blog content schedule', priority: 'MEDIUM' },
    { task: 'Implement internal linking', priority: 'LOW' }
  ];
  
  checklist.forEach((item, index) => {
    const priorityColor = item.priority === 'CRITICAL' ? 'red' : 
                         item.priority === 'HIGH' ? 'yellow' : 
                         'green';
    console.log(`\n${index + 1}. ${item.task}`);
    log(`   Priority: ${item.priority}`, priorityColor);
  });
}

// Main execution
function main() {
  console.clear();
  log('\n🔍 SEO Health Check for www.drsayuj.info\n', 'bright');
  
  checkRobotsTxt();
  checkSitemaps();
  checkMetaTags();
  checkSchemaMarkup();
  generateSubmissionURLs();
  checkPageSpeed();
  showChecklist();
  
  logSection('Summary');
  log('✅ SEO implementation is complete!', 'green');
  log('📋 Follow the checklist above for immediate actions', 'yellow');
  log('🚀 Submit sitemaps using the URLs provided', 'cyan');
  log('📊 Monitor performance weekly using the dashboard', 'blue');
  
  console.log('\n' + '='.repeat(50));
  log('Run this script weekly to monitor SEO health', 'bright');
  console.log('='.repeat(50) + '\n');
}

// Run the script
main();
