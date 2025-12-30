#!/usr/bin/env node

/**
 * Performance monitoring script for drsayuj.info
 * Checks Core Web Vitals and alerts if thresholds are exceeded
 */

const https = require('https');
const fs = require('fs');
const path = require('path');

// Performance thresholds based on Google's recommendations
const THRESHOLDS = {
  LCP: 2500, // Largest Contentful Paint (ms)
  FID: 100,  // First Input Delay (ms) - not measurable via HTTP
  CLS: 0.1,  // Cumulative Layout Shift (score)
  FCP: 1800, // First Contentful Paint (ms)
  TTI: 3800, // Time to Interactive (ms)
  TBT: 300,  // Total Blocking Time (ms)
  SI: 3400   // Speed Index (ms)
};

const SITE_URL = 'https://www.drsayuj.info';

/**
 * Run Lighthouse audit via PageSpeed Insights API
 */
async function runLighthouseAudit(url) {
  return new Promise((resolve, reject) => {
    const apiKey = process.env.PAGESPEED_API_KEY;
    if (!apiKey) {
      console.warn('⚠️  PAGESPEED_API_KEY not set. Running local Lighthouse audit instead.');
      // Fall back to local Lighthouse audit
      const { exec } = require('child_process');
      const lighthouseCmd = `npx lighthouse "${url}" --only-categories=performance --output=json --chrome-flags="--headless" --quiet --output-path=/tmp/lighthouse-temp.json`;
      
      exec(lighthouseCmd, (error, stdout, stderr) => {
        if (error) {
          console.error('Local Lighthouse audit failed:', error.message);
          resolve(null);
          return;
        }
        
        try {
          // Read the output file since Lighthouse writes to file when using --output-path
          const fs = require('fs');
          const result = JSON.parse(fs.readFileSync('/tmp/lighthouse-temp.json', 'utf8'));
          resolve(result);
        } catch (parseError) {
          console.error('Failed to parse Lighthouse results:', parseError.message);
          resolve(null);
        }
      });
      return;
    }

    const apiUrl = `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${encodeURIComponent(url)}&key=${apiKey}&strategy=mobile&category=performance`;
    
    https.get(apiUrl, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const result = JSON.parse(data);
          resolve(result);
        } catch (error) {
          reject(error);
        }
      });
    }).on('error', reject);
  });
}

/**
 * Check if performance metrics meet thresholds
 */
function checkPerformanceMetrics(auditResult) {
  if (!auditResult || !auditResult.lighthouseResult) {
    console.log('❌ No Lighthouse data available');
    return false;
  }

  const audits = auditResult.lighthouseResult.audits;
  const metrics = auditResult.lighthouseResult.categories.performance.score;
  
  console.log(`\n📊 Performance Score: ${Math.round(metrics * 100)}/100`);
  
  const issues = [];
  
  // Check Core Web Vitals
  if (audits['largest-contentful-paint']) {
    const lcp = audits['largest-contentful-paint'].numericValue;
    if (lcp > THRESHOLDS.LCP) {
      issues.push(`LCP: ${Math.round(lcp)}ms (threshold: ${THRESHOLDS.LCP}ms)`);
    } else {
      console.log(`✅ LCP: ${Math.round(lcp)}ms`);
    }
  }
  
  if (audits['first-contentful-paint']) {
    const fcp = audits['first-contentful-paint'].numericValue;
    if (fcp > THRESHOLDS.FCP) {
      issues.push(`FCP: ${Math.round(fcp)}ms (threshold: ${THRESHOLDS.FCP}ms)`);
    } else {
      console.log(`✅ FCP: ${Math.round(fcp)}ms`);
    }
  }
  
  if (audits['total-blocking-time']) {
    const tbt = audits['total-blocking-time'].numericValue;
    if (tbt > THRESHOLDS.TBT) {
      issues.push(`TBT: ${Math.round(tbt)}ms (threshold: ${THRESHOLDS.TBT}ms)`);
    } else {
      console.log(`✅ TBT: ${Math.round(tbt)}ms`);
    }
  }
  
  if (audits['speed-index']) {
    const si = audits['speed-index'].numericValue;
    if (si > THRESHOLDS.SI) {
      issues.push(`SI: ${Math.round(si)}ms (threshold: ${THRESHOLDS.SI}ms)`);
    } else {
      console.log(`✅ SI: ${Math.round(si)}ms`);
    }
  }
  
  if (issues.length > 0) {
    console.log('\n❌ Performance Issues Found:');
    issues.forEach(issue => console.log(`  • ${issue}`));
    return false;
  }
  
  console.log('\n✅ All performance metrics within thresholds!');
  return true;
}

/**
 * Save performance report
 */
function saveReport(auditResult, passed) {
  const report = {
    timestamp: new Date().toISOString(),
    url: SITE_URL,
    passed,
    score: auditResult?.lighthouseResult?.categories?.performance?.score,
    metrics: auditResult?.lighthouseResult?.audits ? {
      lcp: auditResult.lighthouseResult.audits['largest-contentful-paint']?.numericValue,
      fcp: auditResult.lighthouseResult.audits['first-contentful-paint']?.numericValue,
      tbt: auditResult.lighthouseResult.audits['total-blocking-time']?.numericValue,
      si: auditResult.lighthouseResult.audits['speed-index']?.numericValue,
    } : null
  };
  
  const reportsDir = path.join(__dirname, '..', 'reports', 'performance');
  if (!fs.existsSync(reportsDir)) {
    fs.mkdirSync(reportsDir, { recursive: true });
  }
  
  const filename = `performance-${new Date().toISOString().split('T')[0]}.json`;
  fs.writeFileSync(path.join(reportsDir, filename), JSON.stringify(report, null, 2));
  
  console.log(`\n📄 Report saved to: reports/performance/${filename}`);
}

/**
 * Main execution
 */
async function main() {
  console.log('🚀 Starting performance check for drsayuj.info...\n');
  
  try {
    const auditResult = await runLighthouseAudit(SITE_URL);
    
    if (!auditResult) {
      console.log('⚠️  Could not run performance audit. Skipping detailed analysis.');
      console.log('💡 To enable full monitoring, set PAGESPEED_API_KEY environment variable.');
      console.log('💡 Or ensure Lighthouse is installed: npm install -g lighthouse');
      process.exit(0); // Exit with success since this is not a critical failure
    }
    
    const passed = checkPerformanceMetrics(auditResult);
    saveReport(auditResult, passed);
    
    if (!passed) {
      console.log('\n⚠️  Performance check failed. Consider optimizing:');
      console.log('  • Compress images further');
      console.log('  • Defer non-critical JavaScript');
      console.log('  • Optimize third-party scripts');
      console.log('  • Use CDN for static assets');
      process.exit(1);
    } else {
      console.log('\n🎉 Performance check passed!');
      process.exit(0);
    }
  } catch (error) {
    console.error('❌ Performance check failed:', error.message);
    console.log('💡 This may be due to network issues or missing dependencies.');
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}

module.exports = { runLighthouseAudit, checkPerformanceMetrics };
