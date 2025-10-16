#!/usr/bin/env node

/**
 * Comprehensive SEO Audit Script for drsayuj.info
 * Analyzes sitemap, robots.txt, and performs technical SEO checks
 */

const https = require('https');
const fs = require('fs');
const path = require('path');

// Configuration
const SITE_URL = 'https://www.drsayuj.info';
const AUDIT_DATE = new Date().toISOString().split('T')[0];
const OUTPUT_DIR = path.join(__dirname, '../reports/seo');

// Ensure output directory exists
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

// Utility function to make HTTPS requests
function makeRequest(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => resolve({
        statusCode: res.statusCode,
        headers: res.headers,
        body: data
      }));
    }).on('error', reject);
  });
}

// Parse XML sitemap
function parseSitemap(xmlContent) {
  const urls = [];
  const urlMatches = xmlContent.match(/<loc>(.*?)<\/loc>/g);
  
  if (urlMatches) {
    urlMatches.forEach(match => {
      const url = match.replace(/<\/?loc>/g, '');
      urls.push(url);
    });
  }
  
  return urls;
}

// Analyze page metadata
async function analyzePage(url) {
  try {
    const response = await makeRequest(url);
    
    if (response.statusCode !== 200) {
      return {
        url,
        status: 'error',
        statusCode: response.statusCode,
        error: `HTTP ${response.statusCode}`
      };
    }

    const html = response.body;
    
    // Extract metadata
    const title = html.match(/<title[^>]*>(.*?)<\/title>/i)?.[1] || '';
    const description = html.match(/<meta[^>]*name=["']description["'][^>]*content=["']([^"']*)["'][^>]*>/i)?.[1] || '';
    const canonical = html.match(/<link[^>]*rel=["']canonical["'][^>]*href=["']([^"']*)["'][^>]*>/i)?.[1] || '';
    const h1 = html.match(/<h1[^>]*>(.*?)<\/h1>/i)?.[1] || '';
    const h2s = (html.match(/<h2[^>]*>(.*?)<\/h2>/gi) || []).map(h => h.replace(/<\/?h2[^>]*>/gi, ''));
    
    // Check for structured data
    const hasJsonLd = html.includes('application/ld+json');
    const hasMicrodata = html.includes('itemscope');
    const hasRdfa = html.includes('vocab=');
    
    // Check for images without alt text
    const images = html.match(/<img[^>]*>/gi) || [];
    const imagesWithoutAlt = images.filter(img => !img.includes('alt='));
    
    // Check for internal links
    const internalLinks = (html.match(/<a[^>]*href=["']\/[^"']*["'][^>]*>/gi) || []).length;
    
    // Check page size
    const pageSize = Buffer.byteLength(html, 'utf8');
    
    return {
      url,
      status: 'success',
      statusCode: response.statusCode,
      metadata: {
        title: title.trim(),
        titleLength: title.length,
        description: description.trim(),
        descriptionLength: description.length,
        canonical: canonical.trim(),
        h1: h1.trim(),
        h2Count: h2s.length,
        h2s: h2s.map(h => h.trim())
      },
      technical: {
        hasJsonLd,
        hasMicrodata,
        hasRdfa,
        imagesWithoutAlt: imagesWithoutAlt.length,
        totalImages: images.length,
        internalLinks,
        pageSize
      },
      performance: {
        contentLength: response.headers['content-length'] || pageSize,
        contentType: response.headers['content-type'] || '',
        lastModified: response.headers['last-modified'] || '',
        cacheControl: response.headers['cache-control'] || ''
      }
    };
  } catch (error) {
    return {
      url,
      status: 'error',
      error: error.message
    };
  }
}

// Main audit function
async function runSEOAudit() {
  console.log('🔍 Starting comprehensive SEO audit for drsayuj.info...\n');
  
  const auditResults = {
    timestamp: new Date().toISOString(),
    site: SITE_URL,
    auditDate: AUDIT_DATE,
    summary: {
      totalPages: 0,
      successfulPages: 0,
      errorPages: 0,
      issues: []
    },
    pages: [],
    recommendations: []
  };

  try {
    // 1. Fetch and analyze sitemap
    console.log('📋 Fetching sitemap...');
    const sitemapResponse = await makeRequest(`${SITE_URL}/sitemap-0.xml`);
    const urls = parseSitemap(sitemapResponse.body);
    
    console.log(`Found ${urls.length} URLs in sitemap`);
    auditResults.summary.totalPages = urls.length;

    // 2. Analyze robots.txt
    console.log('🤖 Analyzing robots.txt...');
    const robotsResponse = await makeRequest(`${SITE_URL}/robots.txt`);
    auditResults.robots = {
      content: robotsResponse.body,
      statusCode: robotsResponse.statusCode,
      allowsCrawling: robotsResponse.body.includes('Allow: /'),
      sitemapReference: robotsResponse.body.includes('Sitemap:')
    };

    // 3. Analyze key pages (limit to first 20 for initial audit)
    console.log('📄 Analyzing key pages...');
    const keyPages = urls.slice(0, 20); // Analyze first 20 pages
    
    for (const url of keyPages) {
      console.log(`  Analyzing: ${url}`);
      const pageAnalysis = await analyzePage(url);
      auditResults.pages.push(pageAnalysis);
      
      if (pageAnalysis.status === 'success') {
        auditResults.summary.successfulPages++;
        
        // Check for common SEO issues
        if (pageAnalysis.metadata.titleLength === 0) {
          auditResults.summary.issues.push(`${url}: Missing title tag`);
        } else if (pageAnalysis.metadata.titleLength > 60) {
          auditResults.summary.issues.push(`${url}: Title too long (${pageAnalysis.metadata.titleLength} chars)`);
        }
        
        if (pageAnalysis.metadata.descriptionLength === 0) {
          auditResults.summary.issues.push(`${url}: Missing meta description`);
        } else if (pageAnalysis.metadata.descriptionLength > 160) {
          auditResults.summary.issues.push(`${url}: Meta description too long (${pageAnalysis.metadata.descriptionLength} chars)`);
        }
        
        if (pageAnalysis.metadata.h1 === '') {
          auditResults.summary.issues.push(`${url}: Missing H1 tag`);
        }
        
        if (pageAnalysis.technical.imagesWithoutAlt > 0) {
          auditResults.summary.issues.push(`${url}: ${pageAnalysis.technical.imagesWithoutAlt} images without alt text`);
        }
        
        if (pageAnalysis.technical.internalLinks < 3) {
          auditResults.summary.issues.push(`${url}: Low internal link count (${pageAnalysis.technical.internalLinks})`);
        }
        
      } else {
        auditResults.summary.errorPages++;
        auditResults.summary.issues.push(`${url}: ${pageAnalysis.error}`);
      }
      
      // Small delay to be respectful
      await new Promise(resolve => setTimeout(resolve, 100));
    }

    // 4. Generate recommendations
    console.log('💡 Generating recommendations...');
    
    // Title tag recommendations
    const pagesWithoutTitles = auditResults.pages.filter(p => p.metadata?.titleLength === 0).length;
    if (pagesWithoutTitles > 0) {
      auditResults.recommendations.push({
        category: 'Metadata',
        priority: 'High',
        issue: `${pagesWithoutTitles} pages missing title tags`,
        solution: 'Add unique, keyword-rich title tags (50-60 characters) to all pages'
      });
    }
    
    // Meta description recommendations
    const pagesWithoutDescriptions = auditResults.pages.filter(p => p.metadata?.descriptionLength === 0).length;
    if (pagesWithoutDescriptions > 0) {
      auditResults.recommendations.push({
        category: 'Metadata',
        priority: 'High',
        issue: `${pagesWithoutDescriptions} pages missing meta descriptions`,
        solution: 'Add compelling meta descriptions (150-160 characters) to all pages'
      });
    }
    
    // H1 recommendations
    const pagesWithoutH1 = auditResults.pages.filter(p => p.metadata?.h1 === '').length;
    if (pagesWithoutH1 > 0) {
      auditResults.recommendations.push({
        category: 'Content Structure',
        priority: 'High',
        issue: `${pagesWithoutH1} pages missing H1 tags`,
        solution: 'Add single, descriptive H1 tag to each page'
      });
    }
    
    // Image alt text recommendations
    const totalImagesWithoutAlt = auditResults.pages.reduce((sum, p) => sum + (p.technical?.imagesWithoutAlt || 0), 0);
    if (totalImagesWithoutAlt > 0) {
      auditResults.recommendations.push({
        category: 'Accessibility',
        priority: 'Medium',
        issue: `${totalImagesWithoutAlt} images missing alt text`,
        solution: 'Add descriptive alt text to all images for accessibility and SEO'
      });
    }
    
    // Internal linking recommendations
    const pagesWithLowInternalLinks = auditResults.pages.filter(p => (p.technical?.internalLinks || 0) < 3).length;
    if (pagesWithLowInternalLinks > 0) {
      auditResults.recommendations.push({
        category: 'Internal Linking',
        priority: 'Medium',
        issue: `${pagesWithLowInternalLinks} pages with low internal link count`,
        solution: 'Add 5+ relevant internal links per page to improve crawlability and user experience'
      });
    }
    
    // Structured data recommendations
    const pagesWithoutStructuredData = auditResults.pages.filter(p => !p.technical?.hasJsonLd && !p.technical?.hasMicrodata).length;
    if (pagesWithoutStructuredData > 0) {
      auditResults.recommendations.push({
        category: 'Structured Data',
        priority: 'Medium',
        issue: `${pagesWithoutStructuredData} pages without structured data`,
        solution: 'Implement JSON-LD structured data for medical content (Physician, MedicalBusiness, FAQPage)'
      });
    }

    // 5. Save results
    const jsonFile = path.join(OUTPUT_DIR, `seo-audit-${AUDIT_DATE}.json`);
    const mdFile = path.join(OUTPUT_DIR, `seo-audit-${AUDIT_DATE}.md`);
    
    fs.writeFileSync(jsonFile, JSON.stringify(auditResults, null, 2));
    
    // Generate markdown report
    const markdownReport = generateMarkdownReport(auditResults);
    fs.writeFileSync(mdFile, markdownReport);
    
    console.log(`\n✅ SEO audit completed!`);
    console.log(`📊 Results saved to:`);
    console.log(`   - ${jsonFile}`);
    console.log(`   - ${mdFile}`);
    
    // Print summary
    console.log(`\n📈 Audit Summary:`);
    console.log(`   - Total pages analyzed: ${auditResults.summary.totalPages}`);
    console.log(`   - Successful pages: ${auditResults.summary.successfulPages}`);
    console.log(`   - Error pages: ${auditResults.summary.errorPages}`);
    console.log(`   - Issues found: ${auditResults.summary.issues.length}`);
    console.log(`   - Recommendations: ${auditResults.recommendations.length}`);
    
  } catch (error) {
    console.error('❌ Audit failed:', error.message);
    process.exit(1);
  }
}

// Generate markdown report
function generateMarkdownReport(results) {
  const { summary, pages, recommendations, robots } = results;
  
  let report = `# SEO Audit Report - drsayuj.info\n\n`;
  report += `**Audit Date:** ${results.auditDate}\n`;
  report += `**Site:** ${results.site}\n`;
  report += `**Timestamp:** ${results.timestamp}\n\n`;
  
  // Executive Summary
  report += `## 📊 Executive Summary\n\n`;
  report += `- **Total Pages Analyzed:** ${summary.totalPages}\n`;
  report += `- **Successful Pages:** ${summary.successfulPages}\n`;
  report += `- **Error Pages:** ${summary.errorPages}\n`;
  report += `- **Issues Found:** ${summary.issues.length}\n`;
  report += `- **Recommendations:** ${recommendations.length}\n\n`;
  
  // Critical Issues
  report += `## 🚨 Critical Issues\n\n`;
  if (summary.issues.length > 0) {
    summary.issues.forEach(issue => {
      report += `- ${issue}\n`;
    });
  } else {
    report += `No critical issues found.\n`;
  }
  report += `\n`;
  
  // Recommendations
  report += `## 💡 Recommendations\n\n`;
  recommendations.forEach(rec => {
    report += `### ${rec.category} (${rec.priority} Priority)\n`;
    report += `**Issue:** ${rec.issue}\n\n`;
    report += `**Solution:** ${rec.solution}\n\n`;
  });
  
  // Page Analysis
  report += `## 📄 Page Analysis\n\n`;
  report += `| URL | Status | Title Length | Description Length | H1 | Images w/o Alt | Internal Links |\n`;
  report += `|-----|--------|--------------|-------------------|----|----------------|----------------|\n`;
  
  pages.forEach(page => {
    const titleLen = page.metadata?.titleLength || 0;
    const descLen = page.metadata?.descriptionLength || 0;
    const h1 = page.metadata?.h1 ? '✓' : '✗';
    const imagesWithoutAlt = page.technical?.imagesWithoutAlt || 0;
    const internalLinks = page.technical?.internalLinks || 0;
    
    report += `| ${page.url} | ${page.status} | ${titleLen} | ${descLen} | ${h1} | ${imagesWithoutAlt} | ${internalLinks} |\n`;
  });
  
  // Robots.txt Analysis
  report += `\n## 🤖 Robots.txt Analysis\n\n`;
  report += `**Status Code:** ${robots.statusCode}\n`;
  report += `**Allows Crawling:** ${robots.allowsCrawling ? '✓' : '✗'}\n`;
  report += `**Sitemap Reference:** ${robots.sitemapReference ? '✓' : '✗'}\n\n`;
  report += `\`\`\`\n${robots.content}\n\`\`\`\n\n`;
  
  return report;
}

// Run the audit
if (require.main === module) {
  runSEOAudit().catch(console.error);
}

module.exports = { runSEOAudit, analyzePage, parseSitemap };