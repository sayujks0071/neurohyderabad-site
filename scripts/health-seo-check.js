#!/usr/bin/env node

/**
 * Unified Site Health & SEO Check
 * Combines health monitoring and SEO audit
 */

const https = require('https');
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const SITE_URL = 'https://www.drsayuj.info';

// Colors for terminal
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  red: '\x1b[31m',
  cyan: '\x1b[36m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m'
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function logSection(title) {
  console.log('\n' + '='.repeat(60));
  log(`  ${title}`, 'cyan');
  console.log('='.repeat(60) + '\n');
}

// Health checks
async function checkHealth() {
  logSection('SITE HEALTH CHECK');
  
  const checks = {
    homepage: false,
    ssl: false,
    sitemap: false,
    robots: false,
    performance: { latency: 0, status: 'unknown' }
  };

  // Check homepage
  try {
    const start = Date.now();
    const response = await fetch(SITE_URL, { 
      method: 'HEAD',
      headers: { 'User-Agent': 'HealthCheck/1.0' }
    });
    const latency = Date.now() - start;
    
    checks.homepage = response.ok;
    checks.performance = {
      latency,
      status: latency < 1500 ? 'excellent' : latency < 3000 ? 'good' : 'slow'
    };
    
    if (response.ok) {
      log(`✅ Homepage: Accessible (${latency}ms)`, 'green');
    } else {
      log(`❌ Homepage: HTTP ${response.status}`, 'red');
    }
  } catch (error) {
    log(`❌ Homepage: ${error.message}`, 'red');
  }

  // Check SSL (HTTPS works)
  try {
    const response = await fetch(SITE_URL, { method: 'HEAD' });
    checks.ssl = response.ok;
    if (response.ok) {
      log('✅ SSL Certificate: Valid', 'green');
    } else {
      log(`⚠️  SSL Certificate: HTTP ${response.status}`, 'yellow');
    }
  } catch (error) {
    log(`❌ SSL Certificate: ${error.message}`, 'red');
  }

  // Check sitemap
  try {
    const response = await fetch(`${SITE_URL}/sitemap-main.xml`);
    if (response.ok) {
      const text = await response.text();
      const urlCount = (text.match(/<url>/g) || []).length;
      checks.sitemap = true;
      log(`✅ Sitemap: Accessible (${urlCount} URLs)`, 'green');
    } else {
      log(`❌ Sitemap: HTTP ${response.status}`, 'red');
    }
  } catch (error) {
    log(`❌ Sitemap: ${error.message}`, 'red');
  }

  // Check robots.txt
  try {
    const response = await fetch(`${SITE_URL}/robots.txt`);
    checks.robots = response.ok;
    if (response.ok) {
      log('✅ Robots.txt: Accessible', 'green');
    } else {
      log(`⚠️  Robots.txt: HTTP ${response.status}`, 'yellow');
    }
  } catch (error) {
    log(`⚠️  Robots.txt: ${error.message}`, 'yellow');
  }

  return checks;
}

// SEO checks
async function checkSEO() {
  logSection('SEO AUDIT');
  
  const seoChecks = {
    metaTags: false,
    structuredData: false,
    mobileFriendly: false,
    pageSpeed: 'unknown'
  };

  // Check homepage meta tags
  try {
    const response = await fetch(SITE_URL);
    const html = await response.text();
    
    const hasTitle = /<title[^>]*>/.test(html);
    const hasDescription = /<meta[^>]*name=["']description["'][^>]*>/.test(html);
    const hasOG = /<meta[^>]*property=["']og:/.test(html);
    
    seoChecks.metaTags = hasTitle && hasDescription && hasOG;
    
    if (hasTitle && hasDescription && hasOG) {
      log('✅ Meta Tags: Present (title, description, OG tags)', 'green');
    } else {
      log('⚠️  Meta Tags: Missing some tags', 'yellow');
      if (!hasTitle) log('   - Missing <title>', 'yellow');
      if (!hasDescription) log('   - Missing meta description', 'yellow');
      if (!hasOG) log('   - Missing Open Graph tags', 'yellow');
    }
  } catch (error) {
    log(`❌ Meta Tags Check: ${error.message}`, 'red');
  }

  // Check structured data
  try {
    const response = await fetch(SITE_URL);
    const html = await response.text();
    const hasSchema = /<script[^>]*type=["']application\/ld\+json["']/.test(html);
    
    seoChecks.structuredData = hasSchema;
    
    if (hasSchema) {
      log('✅ Structured Data: Present (JSON-LD)', 'green');
    } else {
      log('⚠️  Structured Data: Not found', 'yellow');
    }
  } catch (error) {
    log(`❌ Structured Data Check: ${error.message}`, 'red');
  }

  // Check mobile-friendly (viewport meta)
  try {
    const response = await fetch(SITE_URL);
    const html = await response.text();
    const hasViewport = /<meta[^>]*name=["']viewport["']/.test(html);
    
    seoChecks.mobileFriendly = hasViewport;
    
    if (hasViewport) {
      log('✅ Mobile-Friendly: Viewport meta tag present', 'green');
    } else {
      log('⚠️  Mobile-Friendly: Missing viewport meta tag', 'yellow');
    }
  } catch (error) {
    log(`❌ Mobile-Friendly Check: ${error.message}`, 'red');
  }

  return seoChecks;
}

// Run comprehensive SEO audit
function runSEOAudit() {
  logSection('COMPREHENSIVE SEO AUDIT');
  
  try {
    log('Running comprehensive SEO audit...', 'cyan');
    const scriptPath = path.join(__dirname, 'comprehensive-seo-audit.js');
    
    if (fs.existsSync(scriptPath)) {
      execSync(`node ${scriptPath}`, { stdio: 'inherit' });
      log('\n✅ SEO audit completed!', 'green');
      log('📄 Check reports/seo/ for detailed reports', 'cyan');
    } else {
      log('⚠️  Comprehensive SEO audit script not found', 'yellow');
    }
  } catch (error) {
    log(`❌ SEO Audit Error: ${error.message}`, 'red');
  }
}

// Main execution
async function main() {
  console.clear();
  log('\n🔍 Site Health & SEO Check for www.drsayuj.info\n', 'magenta');
  
  const healthResults = await checkHealth();
  const seoResults = await checkSEO();
  
  // Summary
  logSection('SUMMARY');
  
  const healthScore = [
    healthResults.homepage,
    healthResults.ssl,
    healthResults.sitemap,
    healthResults.robots
  ].filter(Boolean).length;
  
  const seoScore = [
    seoResults.metaTags,
    seoResults.structuredData,
    seoResults.mobileFriendly
  ].filter(Boolean).length;
  
  log(`Health Score: ${healthScore}/4`, healthScore === 4 ? 'green' : healthScore >= 2 ? 'yellow' : 'red');
  log(`SEO Score: ${seoScore}/3`, seoScore === 3 ? 'green' : seoScore >= 2 ? 'yellow' : 'red');
  log(`Performance: ${healthResults.performance.status} (${healthResults.performance.latency}ms)`, 
      healthResults.performance.status === 'excellent' ? 'green' : 
      healthResults.performance.status === 'good' ? 'yellow' : 'red');
  
  console.log('\n' + '='.repeat(60));
  log('💡 Run "pnpm seo:audit" for detailed SEO analysis', 'cyan');
  log('💡 Check /api/workflows/health for API health endpoint', 'cyan');
  console.log('='.repeat(60) + '\n');
  
  // Optionally run full SEO audit
  const args = process.argv.slice(2);
  if (args.includes('--full') || args.includes('-f')) {
    runSEOAudit();
  } else {
    log('💡 Tip: Add --full flag to run comprehensive SEO audit', 'yellow');
  }
}

// Run
main().catch(console.error);
