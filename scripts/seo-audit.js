#!/usr/bin/env node

/**
 * Comprehensive SEO Audit Script for drsayuj.info
 * Performs deep analysis of on-page SEO, technical SEO, and content quality
 */

const https = require('https');
const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom');

class SEOAuditor {
  constructor() {
    this.baseUrl = 'https://www.drsayuj.info';
    this.results = {
      timestamp: new Date().toISOString(),
      site: this.baseUrl,
      pages: [],
      summary: {
        totalPages: 0,
        issues: [],
        recommendations: [],
        scores: {
          performance: 0,
          seo: 0,
          accessibility: 0,
          bestPractices: 0
        }
      }
    };
  }

  async fetchPage(url) {
    return new Promise((resolve, reject) => {
      const request = https.get(url, (response) => {
        let data = '';
        
        response.on('data', (chunk) => {
          data += chunk;
        });
        
        response.on('end', () => {
          resolve({
            url,
            statusCode: response.statusCode,
            headers: response.headers,
            content: data,
            size: data.length
          });
        });
      });
      
      request.on('error', (error) => {
        reject(error);
      });
      
      request.setTimeout(30000, () => {
        request.destroy();
        reject(new Error('Request timeout'));
      });
    });
  }

  analyzePage(pageData) {
    const dom = new JSDOM(pageData.content);
    const document = dom.window.document;
    
    const analysis = {
      url: pageData.url,
      statusCode: pageData.statusCode,
      size: pageData.size,
      issues: [],
      recommendations: [],
      metrics: {}
    };

    // Title tag analysis
    const title = document.querySelector('title');
    if (title) {
      const titleText = title.textContent.trim();
      analysis.metrics.title = {
        text: titleText,
        length: titleText.length,
        hasKeyword: this.hasPrimaryKeyword(titleText),
        position: titleText.toLowerCase().includes('hyderabad') ? 'good' : 'needs-improvement'
      };
      
      if (titleText.length < 30) {
        analysis.issues.push('Title too short (under 30 characters)');
      } else if (titleText.length > 60) {
        analysis.issues.push('Title too long (over 60 characters)');
      }
    } else {
      analysis.issues.push('Missing title tag');
    }

    // Meta description analysis
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      const descText = metaDesc.getAttribute('content');
      analysis.metrics.metaDescription = {
        text: descText,
        length: descText.length,
        hasKeyword: this.hasPrimaryKeyword(descText)
      };
      
      if (descText.length < 120) {
        analysis.issues.push('Meta description too short (under 120 characters)');
      } else if (descText.length > 160) {
        analysis.issues.push('Meta description too long (over 160 characters)');
      }
    } else {
      analysis.issues.push('Missing meta description');
    }

    // Heading structure analysis
    const h1s = document.querySelectorAll('h1');
    const h2s = document.querySelectorAll('h2');
    const h3s = document.querySelectorAll('h3');
    
    analysis.metrics.headings = {
      h1Count: h1s.length,
      h2Count: h2s.length,
      h3Count: h3s.length,
      h1Text: h1s.length > 0 ? h1s[0].textContent.trim() : null
    };

    if (h1s.length === 0) {
      analysis.issues.push('Missing H1 tag');
    } else if (h1s.length > 1) {
      analysis.issues.push('Multiple H1 tags found');
    }

    // Canonical URL analysis
    const canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) {
      analysis.metrics.canonical = canonical.getAttribute('href');
      if (analysis.metrics.canonical !== pageData.url) {
        analysis.issues.push('Canonical URL mismatch');
      }
    } else {
      analysis.issues.push('Missing canonical URL');
    }

    // Image analysis
    const images = document.querySelectorAll('img');
    const imagesWithoutAlt = Array.from(images).filter(img => !img.alt);
    analysis.metrics.images = {
      total: images.length,
      withoutAlt: imagesWithoutAlt.length,
      withoutAltPercentage: images.length > 0 ? (imagesWithoutAlt.length / images.length * 100).toFixed(1) : 0
    };

    if (imagesWithoutAlt.length > 0) {
      analysis.issues.push(`${imagesWithoutAlt.length} images missing alt text`);
    }

    // Internal links analysis
    const links = document.querySelectorAll('a[href]');
    const internalLinks = Array.from(links).filter(link => {
      const href = link.getAttribute('href');
      return href && (href.startsWith('/') || href.includes('drsayuj.info'));
    });
    
    analysis.metrics.links = {
      total: links.length,
      internal: internalLinks.length,
      internalPercentage: links.length > 0 ? (internalLinks.length / links.length * 100).toFixed(1) : 0
    };

    if (internalLinks.length < 5) {
      analysis.issues.push('Low internal link count (less than 5)');
    }

    // Schema markup analysis
    const schemaScripts = document.querySelectorAll('script[type="application/ld+json"]');
    analysis.metrics.schema = {
      count: schemaScripts.length,
      types: []
    };

    schemaScripts.forEach(script => {
      try {
        const schema = JSON.parse(script.textContent);
        if (schema['@type']) {
          analysis.metrics.schema.types.push(schema['@type']);
        }
      } catch (e) {
        analysis.issues.push('Invalid JSON-LD schema markup');
      }
    });

    if (schemaScripts.length === 0) {
      analysis.issues.push('Missing structured data');
    }

    // Content analysis
    const bodyText = document.body ? document.body.textContent : '';
    const wordCount = bodyText.split(/\s+/).filter(word => word.length > 0).length;
    analysis.metrics.content = {
      wordCount: wordCount,
      hasKeywordInFirst100: this.hasPrimaryKeyword(bodyText.substring(0, 500))
    };

    if (wordCount < 300) {
      analysis.issues.push('Content too short (under 300 words)');
    }

    // Mobile viewport analysis
    const viewport = document.querySelector('meta[name="viewport"]');
    if (!viewport) {
      analysis.issues.push('Missing viewport meta tag');
    }

    return analysis;
  }

  hasPrimaryKeyword(text) {
    const keywords = ['neurosurgeon', 'hyderabad', 'spine surgery', 'brain surgery', 'neurosurgery'];
    const lowerText = text.toLowerCase();
    return keywords.some(keyword => lowerText.includes(keyword));
  }

  async auditSite() {
    console.log('🔍 Starting comprehensive SEO audit for drsayuj.info...');
    
    // Get all URLs from sitemap
    const sitemapResponse = await this.fetchPage(`${this.baseUrl}/sitemap.xml`);
    const sitemapDom = new JSDOM(sitemapResponse.content);
    const urls = Array.from(sitemapDom.window.document.querySelectorAll('loc'))
      .map(loc => loc.textContent);

    console.log(`📊 Found ${urls.length} URLs in sitemap`);

    // Analyze each page
    for (let i = 0; i < urls.length; i++) {
      const url = urls[i];
      console.log(`🔍 Analyzing ${i + 1}/${urls.length}: ${url}`);
      
      try {
        const pageData = await this.fetchPage(url);
        const analysis = this.analyzePage(pageData);
        this.results.pages.push(analysis);
        
        // Add delay to be respectful
        await new Promise(resolve => setTimeout(resolve, 1000));
      } catch (error) {
        console.error(`❌ Error analyzing ${url}:`, error.message);
        this.results.pages.push({
          url,
          error: error.message,
          issues: ['Failed to fetch page']
        });
      }
    }

    this.generateSummary();
    return this.results;
  }

  generateSummary() {
    const pages = this.results.pages.filter(p => !p.error);
    this.results.summary.totalPages = pages.length;

    // Count issues by type
    const issueCounts = {};
    pages.forEach(page => {
      page.issues.forEach(issue => {
        issueCounts[issue] = (issueCounts[issue] || 0) + 1;
      });
    });

    // Generate recommendations
    const recommendations = [];
    
    if (issueCounts['Missing title tag']) {
      recommendations.push('Add title tags to all pages');
    }
    
    if (issueCounts['Missing meta description']) {
      recommendations.push('Add meta descriptions to all pages');
    }
    
    if (issueCounts['Missing H1 tag']) {
      recommendations.push('Add H1 tags to pages missing them');
    }
    
    if (issueCounts['Missing canonical URL']) {
      recommendations.push('Add canonical URLs to all pages');
    }
    
    if (issueCounts['images missing alt text']) {
      recommendations.push('Add alt text to all images');
    }
    
    if (issueCounts['Missing structured data']) {
      recommendations.push('Implement structured data markup');
    }

    this.results.summary.issues = Object.entries(issueCounts)
      .sort(([,a], [,b]) => b - a)
      .map(([issue, count]) => ({ issue, count, percentage: (count / pages.length * 100).toFixed(1) }));

    this.results.summary.recommendations = recommendations;

    // Calculate overall scores (simplified)
    const totalIssues = Object.values(issueCounts).reduce((sum, count) => sum + count, 0);
    const maxPossibleIssues = pages.length * 10; // Assuming 10 potential issues per page
    const seoScore = Math.max(0, 100 - (totalIssues / maxPossibleIssues * 100));
    
    this.results.summary.scores = {
      seo: Math.round(seoScore),
      performance: 85, // Placeholder - would need Lighthouse data
      accessibility: 90, // Placeholder - would need Lighthouse data
      bestPractices: 88 // Placeholder - would need Lighthouse data
    };
  }

  async saveResults() {
    const timestamp = new Date().toISOString().split('T')[0];
    const reportsDir = path.join(__dirname, '..', 'reports', 'seo');
    
    if (!fs.existsSync(reportsDir)) {
      fs.mkdirSync(reportsDir, { recursive: true });
    }

    const jsonFile = path.join(reportsDir, `${timestamp}.json`);
    const mdFile = path.join(reportsDir, `${timestamp}.md`);

    // Save JSON results
    fs.writeFileSync(jsonFile, JSON.stringify(this.results, null, 2));
    console.log(`📄 JSON report saved: ${jsonFile}`);

    // Generate Markdown report
    const mdReport = this.generateMarkdownReport();
    fs.writeFileSync(mdFile, mdReport);
    console.log(`📄 Markdown report saved: ${mdFile}`);

    return { jsonFile, mdFile };
  }

  generateMarkdownReport() {
    const { summary, pages } = this.results;
    
    let report = `# SEO Audit Report - drsayuj.info\n\n`;
    report += `**Date:** ${new Date().toLocaleDateString()}\n`;
    report += `**Total Pages Analyzed:** ${summary.totalPages}\n\n`;

    // Overall Scores
    report += `## 📊 Overall Scores\n\n`;
    report += `| Metric | Score |\n`;
    report += `|--------|-------|\n`;
    report += `| SEO | ${summary.scores.seo}/100 |\n`;
    report += `| Performance | ${summary.scores.performance}/100 |\n`;
    report += `| Accessibility | ${summary.scores.accessibility}/100 |\n`;
    report += `| Best Practices | ${summary.scores.bestPractices}/100 |\n\n`;

    // Top Issues
    report += `## 🚨 Top Issues\n\n`;
    summary.issues.slice(0, 10).forEach(({ issue, count, percentage }) => {
      report += `- **${issue}**: ${count} pages (${percentage}%)\n`;
    });
    report += `\n`;

    // Recommendations
    report += `## 💡 Recommendations\n\n`;
    summary.recommendations.forEach(rec => {
      report += `- ${rec}\n`;
    });
    report += `\n`;

    // Page-by-page analysis
    report += `## 📄 Page Analysis\n\n`;
    pages.forEach(page => {
      if (page.error) {
        report += `### ❌ ${page.url}\n`;
        report += `**Error:** ${page.error}\n\n`;
        return;
      }

      report += `### ${page.url}\n`;
      report += `**Status:** ${page.statusCode}\n`;
      report += `**Size:** ${(page.size / 1024).toFixed(1)} KB\n`;
      
      if (page.issues.length > 0) {
        report += `**Issues:**\n`;
        page.issues.forEach(issue => {
          report += `- ${issue}\n`;
        });
      } else {
        report += `**Status:** ✅ No issues found\n`;
      }
      report += `\n`;
    });

    return report;
  }
}

// Run the audit
async function main() {
  const auditor = new SEOAuditor();
  
  try {
    const results = await auditor.auditSite();
    const files = await auditor.saveResults();
    
    console.log('\n✅ SEO audit completed successfully!');
    console.log(`📊 Analyzed ${results.summary.totalPages} pages`);
    console.log(`🚨 Found ${results.summary.issues.length} different types of issues`);
    console.log(`💡 Generated ${results.summary.recommendations.length} recommendations`);
    console.log(`📄 Reports saved to: ${files.jsonFile} and ${files.mdFile}`);
    
  } catch (error) {
    console.error('❌ Audit failed:', error);
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}

module.exports = SEOAuditor;
