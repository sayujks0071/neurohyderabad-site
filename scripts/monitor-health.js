#!/usr/bin/env node

/**
 * Health Monitoring Script
 * Monitors Core Web Vitals, link health, and basic site metrics
 */

const https = require('https');
const fs = require('fs');
const path = require('path');

const SITE_URL = 'https://www.drsayuj.com';
const PAGES_TO_CHECK = [
  '/',
  '/services/endoscopic-discectomy-hyderabad',
  '/stories/endoscopic-discectomy-same-day-hyderabad',
  '/locations/brain-spine-surgeon-jubilee-hills',
  '/patient-stories',
  '/appointments'
];

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

// HTTP agent for connection pooling
const httpsAgent = new https.Agent({
  keepAlive: true,
  maxSockets: 5,
  maxFreeSockets: 2,
  timeout: 5000
});

function makeRequest(url) {
  return new Promise((resolve, reject) => {
    const startTime = Date.now();
    
    const options = {
      agent: httpsAgent,
      headers: {
        'Accept-Encoding': 'gzip, br'
      }
    };
    
    https.get(url, options, (res) => {
      const chunks = [];
      
      res.on('data', (chunk) => {
        chunks.push(chunk);
      });
      
      res.on('end', () => {
        const endTime = Date.now();
        const responseTime = endTime - startTime;
        const contentLength = Buffer.concat(chunks).length;
        
        resolve({
          statusCode: res.statusCode,
          headers: res.headers,
          responseTime,
          contentLength,
          compressed: res.headers['content-encoding'] || 'none'
        });
      });
    }).on('error', (err) => {
      reject(err);
    });
  });
}

function checkCompression(headers) {
  const encoding = headers['content-encoding'];
  if (encoding && (encoding.includes('br') || encoding.includes('gzip'))) {
    return { status: 'good', encoding };
  }
  return { status: 'warning', encoding: encoding || 'none' };
}

function checkCacheHeaders(headers) {
  const cacheControl = headers['cache-control'];
  if (cacheControl && cacheControl.includes('max-age')) {
    return { status: 'good', cacheControl };
  }
  return { status: 'warning', cacheControl: 'none' };
}

function checkSecurityHeaders(headers) {
  const securityHeaders = [
    'strict-transport-security',
    'x-content-type-options',
    'x-frame-options',
    'x-xss-protection'
  ];
  
  const present = securityHeaders.filter(header => headers[header]);
  return {
    status: present.length === securityHeaders.length ? 'good' : 'warning',
    present: present.length,
    total: securityHeaders.length
  };
}

async function checkPageHealth(url) {
  try {
    const result = await makeRequest(url);
    
    const compression = checkCompression(result.headers);
    const caching = checkCacheHeaders(result.headers);
    const security = checkSecurityHeaders(result.headers);
    
    return {
      url,
      status: result.statusCode,
      responseTime: result.responseTime,
      contentLength: result.contentLength,
      compression,
      caching,
      security,
      healthy: result.statusCode === 200 && result.responseTime < 2000
    };
  } catch (error) {
    return {
      url,
      error: error.message,
      healthy: false
    };
  }
}

function generateReport(results) {
  log('\n' + '='.repeat(80), 'bold');
  log('HEALTH MONITORING REPORT', 'bold');
  log('='.repeat(80), 'bold');
  
  const healthyPages = results.filter(r => r.healthy).length;
  const totalPages = results.length;
  
  log(`\nOverall Health: ${healthyPages}/${totalPages} pages healthy`, 
      healthyPages === totalPages ? 'green' : 'yellow');
  
  log('\nPAGE DETAILS:', 'bold');
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
    log(`   Status: ${result.status} | Response Time: ${result.responseTime}ms | Size: ${Math.round(result.contentLength/1024)}KB`);
    
    // Compression
    const compIcon = result.compression.status === 'good' ? '✅' : '⚠️';
    const compColor = result.compression.status === 'good' ? 'green' : 'yellow';
    log(`   Compression: ${compIcon} ${result.compression.encoding}`, compColor);
    
    // Caching
    const cacheIcon = result.caching.status === 'good' ? '✅' : '⚠️';
    const cacheColor = result.caching.status === 'good' ? 'green' : 'yellow';
    log(`   Caching: ${cacheIcon} ${result.caching.cacheControl}`, cacheColor);
    
    // Security
    const secIcon = result.security.status === 'good' ? '✅' : '⚠️';
    const secColor = result.security.status === 'good' ? 'green' : 'yellow';
    log(`   Security: ${secIcon} ${result.security.present}/${result.security.total} headers`, secColor);
  });
  
  // Summary
  log('\nSUMMARY:', 'bold');
  log('-'.repeat(80));
  
  const avgResponseTime = results
    .filter(r => !r.error)
    .reduce((sum, r) => sum + r.responseTime, 0) / results.filter(r => !r.error).length;
  
  const compressionIssues = results.filter(r => r.compression && r.compression.status !== 'good').length;
  const cachingIssues = results.filter(r => r.caching && r.caching.status !== 'good').length;
  const securityIssues = results.filter(r => r.security && r.security.status !== 'good').length;
  
  log(`Average Response Time: ${Math.round(avgResponseTime)}ms`);
  log(`Compression Issues: ${compressionIssues}/${totalPages}`, compressionIssues > 0 ? 'yellow' : 'green');
  log(`Caching Issues: ${cachingIssues}/${totalPages}`, cachingIssues > 0 ? 'yellow' : 'green');
  log(`Security Issues: ${securityIssues}/${totalPages}`, securityIssues > 0 ? 'yellow' : 'green');
  
  // Recommendations
  if (compressionIssues > 0 || cachingIssues > 0 || securityIssues > 0) {
    log('\nRECOMMENDATIONS:', 'bold');
    log('-'.repeat(80));
    
    if (compressionIssues > 0) {
      log('• Enable Brotli/Gzip compression for better performance', 'yellow');
    }
    if (cachingIssues > 0) {
      log('• Add proper cache headers for static assets', 'yellow');
    }
    if (securityIssues > 0) {
      log('• Implement missing security headers', 'yellow');
    }
  }
  
  log('\n' + '='.repeat(80), 'bold');
}

async function main() {
  log('Starting health monitoring...', 'blue');
  
  // Process pages in parallel with Promise.all for better performance
  const results = await Promise.all(
    PAGES_TO_CHECK.map(async (page) => {
      const url = `${SITE_URL}${page}`;
      log(`Checking ${url}...`, 'blue');
      return await checkPageHealth(url);
    })
  );
  
  generateReport(results);
  
  // Save results to file
  const timestamp = new Date().toISOString();
  const reportFile = path.join(__dirname, '..', 'health-reports', `health-${timestamp.split('T')[0]}.json`);
  
  // Ensure reports directory exists
  const reportsDir = path.dirname(reportFile);
  if (!fs.existsSync(reportsDir)) {
    fs.mkdirSync(reportsDir, { recursive: true });
  }
  
  // Filter once and reuse
  const validResults = results.filter(r => !r.error);
  const avgResponseTime = validResults.length > 0
    ? Math.round(validResults.reduce((sum, r) => sum + r.responseTime, 0) / validResults.length)
    : 0;
  
  fs.writeFileSync(reportFile, JSON.stringify({
    timestamp,
    results,
    summary: {
      totalPages: results.length,
      healthyPages: results.filter(r => r.healthy).length,
      avgResponseTime
    }
  }, null, 2));
  
  log(`\nReport saved to: ${reportFile}`, 'green');
}

if (require.main === module) {
  main().catch(console.error);
}

module.exports = { checkPageHealth, generateReport };

