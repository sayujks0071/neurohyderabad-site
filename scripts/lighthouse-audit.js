#!/usr/bin/env node

/**
 * Lighthouse Technical SEO Audit for drsayuj.info
 * Analyzes Core Web Vitals, Performance, SEO, and Accessibility
 */

const { default: lighthouse } = require('lighthouse');
const chromeLauncher = require('chrome-launcher');
const fs = require('fs');
const path = require('path');

const SITE_URL = 'https://www.drsayuj.info';
const AUDIT_DATE = new Date().toISOString().split('T')[0];
const OUTPUT_DIR = path.join(__dirname, '../reports/seo');

async function runLighthouseAudit() {
  console.log('🔍 Starting Lighthouse technical SEO audit...\n');
  
  const chrome = await chromeLauncher.launch({chromeFlags: ['--headless']});
  const options = {
    logLevel: 'info',
    output: 'json',
    onlyCategories: ['performance', 'seo', 'accessibility', 'best-practices'],
    port: chrome.port,
  };
  
  const config = {
    extends: 'lighthouse:default',
    settings: {
      onlyAudits: [
        'first-contentful-paint',
        'largest-contentful-paint',
        'cumulative-layout-shift',
        'speed-index',
        'total-blocking-time',
        'interactive',
        'viewport',
        'document-title',
        'meta-description',
        'http-status-code',
        'link-text',
        'crawlable-anchors',
        'is-crawlable',
        'robots-txt',
        'sitemap',
        'structured-data',
        'color-contrast',
        'image-alt',
        'heading-order',
        'html-has-lang',
        'meta-viewport'
      ]
    }
  };

  try {
    console.log('📊 Running Lighthouse audit...');
    const runnerResult = await lighthouse(SITE_URL, options, config);
    
    const auditResults = {
      timestamp: new Date().toISOString(),
      site: SITE_URL,
      auditDate: AUDIT_DATE,
      lighthouse: runnerResult.lhr,
      summary: {
        performance: runnerResult.lhr.categories.performance.score * 100,
        seo: runnerResult.lhr.categories.seo.score * 100,
        accessibility: runnerResult.lhr.categories.accessibility.score * 100,
        bestPractices: runnerResult.lhr.categories['best-practices'].score * 100
      },
      coreWebVitals: {
        lcp: runnerResult.lhr.audits['largest-contentful-paint'].numericValue,
        cls: runnerResult.lhr.audits['cumulative-layout-shift'].numericValue,
        fcp: runnerResult.lhr.audits['first-contentful-paint'].numericValue,
        tbt: runnerResult.lhr.audits['total-blocking-time'].numericValue,
        si: runnerResult.lhr.audits['speed-index'].numericValue
      },
      issues: [],
      recommendations: []
    };

    // Analyze audit results
    const audits = runnerResult.lhr.audits;
    
    // Performance issues
    if (audits['largest-contentful-paint'].score < 0.9) {
      auditResults.issues.push({
        category: 'Performance',
        severity: 'High',
        audit: 'Largest Contentful Paint',
        score: audits['largest-contentful-paint'].score,
        details: audits['largest-contentful-paint'].details
      });
    }
    
    if (audits['cumulative-layout-shift'].score < 0.9) {
      auditResults.issues.push({
        category: 'Performance',
        severity: 'High',
        audit: 'Cumulative Layout Shift',
        score: audits['cumulative-layout-shift'].score,
        details: audits['cumulative-layout-shift'].details
      });
    }
    
    // SEO issues
    if (audits['document-title'].score < 1) {
      auditResults.issues.push({
        category: 'SEO',
        severity: 'High',
        audit: 'Document Title',
        score: audits['document-title'].score,
        details: audits['document-title'].details
      });
    }
    
    if (audits['meta-description'].score < 1) {
      auditResults.issues.push({
        category: 'SEO',
        severity: 'Medium',
        audit: 'Meta Description',
        score: audits['meta-description'].score,
        details: audits['meta-description'].details
      });
    }
    
    if (audits['structured-data'].score < 1) {
      auditResults.issues.push({
        category: 'SEO',
        severity: 'Medium',
        audit: 'Structured Data',
        score: audits['structured-data'].score,
        details: audits['structured-data'].details
      });
    }
    
    // Accessibility issues
    if (audits['color-contrast'].score < 1) {
      auditResults.issues.push({
        category: 'Accessibility',
        severity: 'High',
        audit: 'Color Contrast',
        score: audits['color-contrast'].score,
        details: audits['color-contrast'].details
      });
    }
    
    if (audits['image-alt'].score < 1) {
      auditResults.issues.push({
        category: 'Accessibility',
        severity: 'Medium',
        audit: 'Image Alt Text',
        score: audits['image-alt'].score,
        details: audits['image-alt'].details
      });
    }
    
    if (audits['heading-order'].score < 1) {
      auditResults.issues.push({
        category: 'Accessibility',
        severity: 'Medium',
        audit: 'Heading Order',
        score: audits['heading-order'].score,
        details: audits['heading-order'].details
      });
    }

    // Generate recommendations
    if (auditResults.summary.performance < 90) {
      auditResults.recommendations.push({
        category: 'Performance',
        priority: 'High',
        issue: 'Performance score below 90',
        solution: 'Optimize images, minify CSS/JS, implement lazy loading, use CDN'
      });
    }
    
    if (auditResults.summary.seo < 95) {
      auditResults.recommendations.push({
        category: 'SEO',
        priority: 'High',
        issue: 'SEO score below 95',
        solution: 'Fix title tags, meta descriptions, add structured data, improve internal linking'
      });
    }
    
    if (auditResults.summary.accessibility < 95) {
      auditResults.recommendations.push({
        category: 'Accessibility',
        priority: 'High',
        issue: 'Accessibility score below 95',
        solution: 'Fix color contrast, add alt text, correct heading hierarchy'
      });
    }

    // Save results
    const jsonFile = path.join(OUTPUT_DIR, `lighthouse-audit-${AUDIT_DATE}.json`);
    const mdFile = path.join(OUTPUT_DIR, `lighthouse-audit-${AUDIT_DATE}.md`);
    
    fs.writeFileSync(jsonFile, JSON.stringify(auditResults, null, 2));
    
    // Generate markdown report
    const markdownReport = generateLighthouseMarkdownReport(auditResults);
    fs.writeFileSync(mdFile, markdownReport);
    
    console.log(`\n✅ Lighthouse audit completed!`);
    console.log(`📊 Results saved to:`);
    console.log(`   - ${jsonFile}`);
    console.log(`   - ${mdFile}`);
    
    // Print summary
    console.log(`\n📈 Lighthouse Summary:`);
    console.log(`   - Performance: ${auditResults.summary.performance.toFixed(1)}/100`);
    console.log(`   - SEO: ${auditResults.summary.seo.toFixed(1)}/100`);
    console.log(`   - Accessibility: ${auditResults.summary.accessibility.toFixed(1)}/100`);
    console.log(`   - Best Practices: ${auditResults.summary.bestPractices.toFixed(1)}/100`);
    console.log(`   - Issues found: ${auditResults.issues.length}`);
    console.log(`   - Recommendations: ${auditResults.recommendations.length}`);
    
    await chrome.kill();
    
  } catch (error) {
    console.error('❌ Lighthouse audit failed:', error.message);
    await chrome.kill();
    process.exit(1);
  }
}

function generateLighthouseMarkdownReport(results) {
  const { summary, coreWebVitals, issues, recommendations } = results;
  
  let report = `# Lighthouse Technical SEO Audit - drsayuj.info\n\n`;
  report += `**Audit Date:** ${results.auditDate}\n`;
  report += `**Site:** ${results.site}\n`;
  report += `**Timestamp:** ${results.timestamp}\n\n`;
  
  // Scores Summary
  report += `## 📊 Lighthouse Scores\n\n`;
  report += `| Category | Score | Status |\n`;
  report += `|----------|-------|--------|\n`;
  report += `| Performance | ${summary.performance.toFixed(1)}/100 | ${summary.performance >= 90 ? '✅ Good' : '⚠️ Needs Improvement'} |\n`;
  report += `| SEO | ${summary.seo.toFixed(1)}/100 | ${summary.seo >= 95 ? '✅ Good' : '⚠️ Needs Improvement'} |\n`;
  report += `| Accessibility | ${summary.accessibility.toFixed(1)}/100 | ${summary.accessibility >= 95 ? '✅ Good' : '⚠️ Needs Improvement'} |\n`;
  report += `| Best Practices | ${summary.bestPractices.toFixed(1)}/100 | ${summary.bestPractices >= 90 ? '✅ Good' : '⚠️ Needs Improvement'} |\n\n`;
  
  // Core Web Vitals
  report += `## 🚀 Core Web Vitals\n\n`;
  report += `| Metric | Value | Status |\n`;
  report += `|--------|-------|--------|\n`;
  report += `| Largest Contentful Paint (LCP) | ${(coreWebVitals.lcp / 1000).toFixed(2)}s | ${coreWebVitals.lcp < 2500 ? '✅ Good' : '⚠️ Needs Improvement'} |\n`;
  report += `| Cumulative Layout Shift (CLS) | ${coreWebVitals.cls.toFixed(3)} | ${coreWebVitals.cls < 0.1 ? '✅ Good' : '⚠️ Needs Improvement'} |\n`;
  report += `| First Contentful Paint (FCP) | ${(coreWebVitals.fcp / 1000).toFixed(2)}s | ${coreWebVitals.fcp < 1800 ? '✅ Good' : '⚠️ Needs Improvement'} |\n`;
  report += `| Total Blocking Time (TBT) | ${(coreWebVitals.tbt / 1000).toFixed(2)}s | ${coreWebVitals.tbt < 200 ? '✅ Good' : '⚠️ Needs Improvement'} |\n`;
  report += `| Speed Index (SI) | ${(coreWebVitals.si / 1000).toFixed(2)}s | ${coreWebVitals.si < 3400 ? '✅ Good' : '⚠️ Needs Improvement'} |\n\n`;
  
  // Issues
  report += `## 🚨 Issues Found\n\n`;
  if (issues.length > 0) {
    issues.forEach(issue => {
      report += `### ${issue.category} - ${issue.audit}\n`;
      report += `**Severity:** ${issue.severity}\n`;
      report += `**Score:** ${(issue.score * 100).toFixed(1)}/100\n\n`;
    });
  } else {
    report += `No critical issues found.\n\n`;
  }
  
  // Recommendations
  report += `## 💡 Recommendations\n\n`;
  recommendations.forEach(rec => {
    report += `### ${rec.category} (${rec.priority} Priority)\n`;
    report += `**Issue:** ${rec.issue}\n\n`;
    report += `**Solution:** ${rec.solution}\n\n`;
  });
  
  return report;
}

// Run the audit
if (require.main === module) {
  runLighthouseAudit().catch(console.error);
}

module.exports = { runLighthouseAudit };
