#!/usr/bin/env node

/**
 * Link Health Monitoring Script
 * Checks for broken internal links and 404s
 */

const https = require('https');
const fs = require('fs');
const path = require('path');

const SITE_URL = 'https://www.drsayuj.com';

// Colors for console output
const colors = {
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  reset: '\x1b[0m',
  bold: '\x1b[1m'
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function makeRequest(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      resolve({
        statusCode: res.statusCode,
        headers: res.headers,
        url: res.responseUrl || url
      });
    }).on('error', (err) => {
      reject(err);
    });
  });
}

function extractLinks(html, baseUrl) {
  const linkRegex = /<a[^>]+href=["']([^"']+)["'][^>]*>/gi;
  const links = [];
  let match;
  
  while ((match = linkRegex.exec(html)) !== null) {
    let href = match[1];
    
    // Skip external links, mailto, tel, etc.
    if (href.startsWith('http') || href.startsWith('mailto:') || href.startsWith('tel:') || href.startsWith('#')) {
      continue;
    }
    
    // Convert relative URLs to absolute
    if (href.startsWith('/')) {
      href = `${SITE_URL}${href}`;
    } else {
      href = `${baseUrl}/${href}`;
    }
    
    links.push(href);
  }
  
  return [...new Set(links)]; // Remove duplicates
}

async function checkPageLinks(url) {
  try {
    const result = await makeRequest(url);
    
    if (result.statusCode !== 200) {
      return {
        url,
        status: result.statusCode,
        links: [],
        brokenLinks: [],
        error: `Page returned ${result.statusCode}`
      };
    }
    
    // For now, we'll check a predefined list of internal links
    // In a full implementation, you'd fetch the HTML and extract links
    const commonInternalLinks = [
      '/',
      '/services',
      '/conditions',
      '/patient-stories',
      '/appointments',
      '/contact',
      '/about',
      '/blog',
      '/services/endoscopic-discectomy-hyderabad',
      '/services/minimally-invasive-spine-surgery',
      '/services/brain-tumor-surgery-hyderabad',
      '/services/peripheral-nerve-surgery-hyderabad',
      '/conditions/sciatica-treatment-hyderabad',
      '/conditions/spinal-stenosis-treatment-hyderabad',
      '/conditions/trigeminal-neuralgia-treatment-hyderabad',
      '/conditions/cervical-radiculopathy-treatment-hyderabad',
      '/stories/endoscopic-discectomy-same-day-hyderabad',
      '/stories/endoscopic-ulbd-stenosis-hyderabad',
      '/stories/mvd-trigeminal-neuralgia-hyderabad',
      '/locations/brain-spine-surgeon-jubilee-hills',
      '/locations/brain-spine-surgeon-banjara-hills',
      '/locations/brain-spine-surgeon-hitec-city'
    ];
    
    const brokenLinks = [];
    
    for (const link of commonInternalLinks) {
      try {
        const linkResult = await makeRequest(`${SITE_URL}${link}`);
        if (linkResult.statusCode >= 400) {
          brokenLinks.push({
            url: `${SITE_URL}${link}`,
            status: linkResult.statusCode
          });
        }
      } catch (error) {
        brokenLinks.push({
          url: `${SITE_URL}${link}`,
          status: 'ERROR',
          error: error.message
        });
      }
      
      // Small delay between requests
      await new Promise(resolve => setTimeout(resolve, 100));
    }
    
    return {
      url,
      status: result.statusCode,
      links: commonInternalLinks,
      brokenLinks,
      healthy: brokenLinks.length === 0
    };
    
  } catch (error) {
    return {
      url,
      error: error.message,
      healthy: false
    };
  }
}

function generateLinkReport(results) {
  log('\n' + '='.repeat(80), 'bold');
  log('LINK HEALTH MONITORING REPORT', 'bold');
  log('='.repeat(80), 'bold');
  
  const allBrokenLinks = results.flatMap(r => r.brokenLinks || []);
  const uniqueBrokenLinks = [...new Set(allBrokenLinks.map(link => link.url))];
  
  log(`\nOverall Link Health: ${uniqueBrokenLinks.length} broken links found`, 
      uniqueBrokenLinks.length === 0 ? 'green' : 'red');
  
  if (uniqueBrokenLinks.length > 0) {
    log('\nBROKEN LINKS:', 'bold');
    log('-'.repeat(80));
    
    uniqueBrokenLinks.forEach(linkUrl => {
      const linkInfo = allBrokenLinks.find(l => l.url === linkUrl);
      const statusIcon = linkInfo.status === 'ERROR' ? '💥' : '❌';
      const statusColor = 'red';
      
      log(`${statusIcon} ${linkUrl}`, statusColor);
      log(`   Status: ${linkInfo.status}`, statusColor);
      if (linkInfo.error) {
        log(`   Error: ${linkInfo.error}`, statusColor);
      }
    });
  }
  
  // Summary by page
  log('\nPAGE SUMMARY:', 'bold');
  log('-'.repeat(80));
  
  results.forEach(result => {
    if (result.error) {
      log(`❌ ${result.url}`, 'red');
      log(`   Error: ${result.error}`, 'red');
      return;
    }
    
    const statusIcon = result.healthy ? '✅' : '⚠️';
    const statusColor = result.healthy ? 'green' : 'yellow';
    
    log(`${statusIcon} ${result.url}`, statusColor);
    log(`   Status: ${result.status} | Broken Links: ${result.brokenLinks?.length || 0}`, statusColor);
  });
  
  // Recommendations
  if (uniqueBrokenLinks.length > 0) {
    log('\nRECOMMENDATIONS:', 'bold');
    log('-'.repeat(80));
    log('• Fix broken internal links to improve user experience', 'yellow');
    log('• Update sitemap if pages have been moved', 'yellow');
    log('• Check for typos in internal link URLs', 'yellow');
    log('• Ensure all new pages are properly linked', 'yellow');
  }
  
  log('\n' + '='.repeat(80), 'bold');
}

async function main() {
  log('Starting link health monitoring...', 'blue');
  
  const pagesToCheck = [
    '/',
    '/services',
    '/conditions',
    '/patient-stories',
    '/appointments',
    '/contact'
  ];
  
  const results = [];
  
  for (const page of pagesToCheck) {
    const url = `${SITE_URL}${page}`;
    log(`Checking links from ${url}...`, 'blue');
    const result = await checkPageLinks(url);
    results.push(result);
    
    // Small delay between pages
    await new Promise(resolve => setTimeout(resolve, 1000));
  }
  
  generateLinkReport(results);
  
  // Save results to file
  const timestamp = new Date().toISOString();
  const reportFile = path.join(__dirname, '..', 'health-reports', `links-${timestamp.split('T')[0]}.json`);
  
  // Ensure reports directory exists
  const reportsDir = path.dirname(reportFile);
  if (!fs.existsSync(reportsDir)) {
    fs.mkdirSync(reportsDir, { recursive: true });
  }
  
  const allBrokenLinks = results.flatMap(r => r.brokenLinks || []);
  const uniqueBrokenLinks = [...new Set(allBrokenLinks.map(link => link.url))];
  
  fs.writeFileSync(reportFile, JSON.stringify({
    timestamp,
    results,
    summary: {
      totalPages: results.length,
      healthyPages: results.filter(r => r.healthy).length,
      totalBrokenLinks: uniqueBrokenLinks.length,
      brokenLinks: uniqueBrokenLinks
    }
  }, null, 2));
  
  log(`\nReport saved to: ${reportFile}`, 'green');
}

if (require.main === module) {
  main().catch(console.error);
}

module.exports = { checkPageLinks, generateLinkReport };

