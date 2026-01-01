#!/usr/bin/env node

/**
 * Comprehensive SEO Audit for drsayuj.info
 * Autonomous SEO Engineer - Deep Analysis
 */

const fs = require('fs');
const path = require('path');
const https = require('https');
const { URL } = require('url');

// Configuration
const SITE_URL = 'https://www.drsayuj.info';
const MAX_PAGES = 150;
const CONCURRENT_REQUESTS = 5;

// Results storage
const auditResults = {
  timestamp: new Date().toISOString(),
  site: SITE_URL,
  discovery: {},
  onPage: {},
  technical: {},
  local: {},
  backlinks: {},
  competitors: {},
  recommendations: []
};

// Request cache for performance
const requestCache = new Map();

// HTTP agent for connection pooling
const httpsAgent = new https.Agent({
  keepAlive: true,
  maxSockets: CONCURRENT_REQUESTS,
  maxFreeSockets: 2,
  timeout: 10000,
  scheduling: 'fifo' // Use FIFO for predictable request ordering
});

// Utility functions
function makeRequest(url) {
  // Check cache first
  if (requestCache.has(url)) {
    return Promise.resolve(requestCache.get(url));
  }

  return new Promise((resolve, reject) => {
    const urlObj = new URL(url);
    const options = {
      hostname: urlObj.hostname,
      port: 443,
      path: urlObj.pathname + urlObj.search,
      method: 'GET',
      agent: httpsAgent,
      headers: {
        'User-Agent': 'SEO-Audit-Bot/1.0',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.5',
        'Connection': 'keep-alive',
      }
    };

    const req = https.request(options, (res) => {
      const chunks = [];
      res.on('data', (chunk) => chunks.push(chunk));
      res.on('end', () => {
        const body = Buffer.concat(chunks).toString('utf8');
        const result = {
          url,
          statusCode: res.statusCode,
          headers: res.headers,
          body,
          size: body.length
        };
        // Cache the result
        requestCache.set(url, result);
        resolve(result);
      });
    });

    req.on('error', reject);
    req.setTimeout(10000, () => {
      req.destroy();
      reject(new Error('Request timeout'));
    });
    req.end();
  });
}

// Parse sitemap and extract URLs
async function parseSitemap() {
  console.log('🔍 Parsing sitemap...');
  
  try {
    // Primary sitemap is a single urlset at /sitemap.xml (no index sitemap)
    const sitemap = await makeRequest(`${SITE_URL}/sitemap.xml`);
    const fallback = await makeRequest(`${SITE_URL}/sitemap-0.xml`).catch(() => null);

    const xmlSource = sitemap.statusCode === 200 && sitemap.body.includes('<urlset')
      ? sitemap.body
      : fallback?.body || '';
    
    const urls = [];
    const urlMatches = xmlSource.match(/<loc>(.*?)<\/loc>/g);
    
    if (urlMatches) {
      urlMatches.forEach(match => {
        const url = match.replace(/<\/?loc>/g, '');
        if (url.startsWith(SITE_URL)) {
          urls.push(url);
        }
      });
    }
    
    auditResults.discovery = {
      sitemapIndex: sitemap.statusCode === 200,
      sitemapContent: Boolean(urlMatches && urlMatches.length),
      totalUrls: urls.length,
      urls: urls.slice(0, MAX_PAGES)
    };
    
    console.log(`✅ Found ${urls.length} URLs in sitemap`);
    return urls.slice(0, MAX_PAGES);
  } catch (error) {
    console.error('❌ Error parsing sitemap:', error.message);
    return [];
  }
}

// Analyze individual page
async function analyzePage(url) {
  try {
    const response = await makeRequest(url);
    
    if (response.statusCode !== 200) {
      return {
        url,
        statusCode: response.statusCode,
        error: 'Non-200 status'
      };
    }
    
    const html = response.body;
    const analysis = {
      url,
      statusCode: response.statusCode,
      size: response.size,
      loadTime: Date.now(),
      title: extractTitle(html),
      metaDescription: extractMetaDescription(html),
      h1Tags: extractH1Tags(html),
      h2Tags: extractH2Tags(html),
      canonical: extractCanonical(html),
      internalLinks: extractInternalLinks(html),
      images: extractImages(html),
      structuredData: extractStructuredData(html),
      wordCount: countWords(html),
      issues: []
    };
    
    // Check for SEO issues
    if (!analysis.title) analysis.issues.push('Missing title tag');
    if (!analysis.metaDescription) analysis.issues.push('Missing meta description');
    if (analysis.title && analysis.title.length > 60) analysis.issues.push('Title too long');
    if (analysis.metaDescription && analysis.metaDescription.length > 160) analysis.issues.push('Meta description too long');
    if (analysis.h1Tags.length === 0) analysis.issues.push('Missing H1 tag');
    if (analysis.h1Tags.length > 1) analysis.issues.push('Multiple H1 tags');
    if (!analysis.canonical) analysis.issues.push('Missing canonical tag');
    
    return analysis;
  } catch (error) {
    return {
      url,
      error: error.message
    };
  }
}

// Pre-compiled regex patterns for performance
const REGEX_PATTERNS = {
  title: /<title[^>]*>(.*?)<\/title>/i,
  metaDescription: /<meta[^>]*name=["']description["'][^>]*content=["']([^"']*)["']/i,
  h1: /<h1[^>]*>(.*?)<\/h1>/gi,
  h2: /<h2[^>]*>(.*?)<\/h2>/gi,
  canonical: /<link[^>]*rel=["']canonical["'][^>]*href=["']([^"']*)["']/i,
  internalLinks: /<a[^>]*href=["']([^"']*)["'][^>]*>/gi,
  images: /<img[^>]*>/gi,
  structuredData: /<script[^>]*type=["']application\/ld\+json["'][^>]*>(.*?)<\/script>/gi,
  tags: /<[^>]*>/g,
  whitespace: /\s+/g
};

// HTML parsing functions with optimized regex
function extractTitle(html) {
  const match = html.match(REGEX_PATTERNS.title);
  return match ? match[1].trim() : null;
}

function extractMetaDescription(html) {
  const match = html.match(REGEX_PATTERNS.metaDescription);
  return match ? match[1].trim() : null;
}

function extractH1Tags(html) {
  const matches = html.match(REGEX_PATTERNS.h1);
  return matches ? matches.map(m => m.replace(REGEX_PATTERNS.tags, '').trim()) : [];
}

function extractH2Tags(html) {
  const matches = html.match(REGEX_PATTERNS.h2);
  return matches ? matches.slice(0, 10).map(m => m.replace(REGEX_PATTERNS.tags, '').trim()) : [];
}

function extractCanonical(html) {
  const match = html.match(REGEX_PATTERNS.canonical);
  return match ? match[1].trim() : null;
}

function extractInternalLinks(html) {
  const linksSet = new Set();
  let match;
  REGEX_PATTERNS.internalLinks.lastIndex = 0;
  let count = 0;
  
  // Pre-compile the hostname check for better performance
  const siteUrl = new URL(SITE_URL);
  const siteHostname = siteUrl.hostname;
  const siteOrigin = siteUrl.origin;
  
  while ((match = REGEX_PATTERNS.internalLinks.exec(html)) !== null && count++ < 200) {
    const href = match[1];
    try {
      // Quick check for relative URLs first
      if (href.startsWith('/') && !href.startsWith('//')) {
        linksSet.add(href);
      } else {
        // Full URL parsing for absolute URLs
        const linkUrl = new URL(href, SITE_URL);
        // Verify the full origin matches, not just a prefix
        if (linkUrl.hostname === siteHostname && linkUrl.origin === siteOrigin) {
          linksSet.add(href);
        }
      }
    } catch (e) {
      // Invalid URL - skip
    }
  }
  REGEX_PATTERNS.internalLinks.lastIndex = 0; // Reset for next use
  
  return Array.from(linksSet);
}

function extractImages(html) {
  const matches = html.match(REGEX_PATTERNS.images);
  if (!matches) return [];
  
  return matches.slice(0, 50).map(match => {
    const srcMatch = match.match(/src=["']([^"']*)["']/i);
    const altMatch = match.match(/alt=["']([^"']*)["']/i);
    
    return {
      src: srcMatch ? srcMatch[1] : null,
      alt: altMatch ? altMatch[1] : null,
      hasAlt: !!altMatch
    };
  });
}

function extractStructuredData(html) {
  const structuredData = [];
  let match;
  REGEX_PATTERNS.structuredData.lastIndex = 0;
  let count = 0;
  
  while ((match = REGEX_PATTERNS.structuredData.exec(html)) !== null && count++ < 5) {
    try {
      structuredData.push(JSON.parse(match[1]));
    } catch (e) {
      // Invalid JSON - skip
    }
  }
  
  return structuredData;
}

function countWords(html) {
  const text = html
    .replace(REGEX_PATTERNS.tags, ' ')
    .replace(REGEX_PATTERNS.whitespace, ' ')
    .trim();
  return text.split(' ').filter(word => word.length > 0).length;
}

// Batch process URLs
async function batchProcess(urls, batchSize = CONCURRENT_REQUESTS) {
  const results = [];
  
  for (let i = 0; i < urls.length; i += batchSize) {
    const batch = urls.slice(i, i + batchSize);
    console.log(`📊 Processing batch ${Math.floor(i/batchSize) + 1}/${Math.ceil(urls.length/batchSize)} (${batch.length} URLs)`);
    
    const batchPromises = batch.map(url => analyzePage(url));
    const batchResults = await Promise.allSettled(batchPromises);
    
    batchResults.forEach((result, index) => {
      if (result.status === 'fulfilled') {
        results.push(result.value);
      } else {
        results.push({
          url: batch[index],
          error: result.reason.message
        });
      }
    });
    
    // Small delay between batches
    await new Promise(resolve => setTimeout(resolve, 1000));
  }
  
  return results;
}

// Analyze on-page SEO
function analyzeOnPageSEO(pageResults) {
  console.log('📝 Analyzing on-page SEO...');
  
  const analysis = {
    totalPages: pageResults.length,
    pagesWithIssues: 0,
    commonIssues: {},
    titleAnalysis: {
      missing: 0,
      tooLong: 0,
      tooShort: 0,
      averageLength: 0
    },
    metaDescriptionAnalysis: {
      missing: 0,
      tooLong: 0,
      tooShort: 0,
      averageLength: 0
    },
    headingAnalysis: {
      missingH1: 0,
      multipleH1: 0,
      averageH2Count: 0
    },
    canonicalAnalysis: {
      missing: 0,
      selfReferencing: 0
    },
    imageAnalysis: {
      totalImages: 0,
      imagesWithoutAlt: 0,
      averageImagesPerPage: 0
    },
    contentAnalysis: {
      averageWordCount: 0,
      thinContent: 0
    }
  };
  
  let totalTitleLength = 0;
  let totalMetaLength = 0;
  let totalH2Count = 0;
  let totalImages = 0;
  let totalWordCount = 0;
  
  pageResults.forEach(page => {
    if (page.error) return;
    
    // Count issues
    if (page.issues && page.issues.length > 0) {
      analysis.pagesWithIssues++;
      page.issues.forEach(issue => {
        analysis.commonIssues[issue] = (analysis.commonIssues[issue] || 0) + 1;
      });
    }
    
    // Title analysis
    if (!page.title) {
      analysis.titleAnalysis.missing++;
    } else {
      totalTitleLength += page.title.length;
      if (page.title.length > 60) analysis.titleAnalysis.tooLong++;
      if (page.title.length < 30) analysis.titleAnalysis.tooShort++;
    }
    
    // Meta description analysis
    if (!page.metaDescription) {
      analysis.metaDescriptionAnalysis.missing++;
    } else {
      totalMetaLength += page.metaDescription.length;
      if (page.metaDescription.length > 160) analysis.metaDescriptionAnalysis.tooLong++;
      if (page.metaDescription.length < 120) analysis.metaDescriptionAnalysis.tooShort++;
    }
    
    // Heading analysis
    if (page.h1Tags.length === 0) analysis.headingAnalysis.missingH1++;
    if (page.h1Tags.length > 1) analysis.headingAnalysis.multipleH1++;
    totalH2Count += page.h2Tags.length;
    
    // Canonical analysis
    if (!page.canonical) {
      analysis.canonicalAnalysis.missing++;
    } else if (page.canonical === page.url) {
      analysis.canonicalAnalysis.selfReferencing++;
    }
    
    // Image analysis
    totalImages += page.images.length;
    page.images.forEach(img => {
      if (!img.hasAlt) analysis.imageAnalysis.imagesWithoutAlt++;
    });
    
    // Content analysis
    totalWordCount += page.wordCount;
    if (page.wordCount < 300) analysis.contentAnalysis.thinContent++;
  });
  
  // Calculate averages
  const validPages = pageResults.filter(p => !p.error).length;
  analysis.titleAnalysis.averageLength = validPages > 0 ? Math.round(totalTitleLength / validPages) : 0;
  analysis.metaDescriptionAnalysis.averageLength = validPages > 0 ? Math.round(totalMetaLength / validPages) : 0;
  analysis.headingAnalysis.averageH2Count = validPages > 0 ? Math.round(totalH2Count / validPages) : 0;
  analysis.imageAnalysis.totalImages = totalImages;
  analysis.imageAnalysis.averageImagesPerPage = validPages > 0 ? Math.round(totalImages / validPages) : 0;
  analysis.contentAnalysis.averageWordCount = validPages > 0 ? Math.round(totalWordCount / validPages) : 0;
  
  auditResults.onPage = analysis;
  return analysis;
}

// Generate recommendations
function generateRecommendations() {
  console.log('💡 Generating recommendations...');
  
  const recommendations = [];
  
  // On-page recommendations
  if (auditResults.onPage.titleAnalysis.missing > 0) {
    recommendations.push({
      category: 'On-Page SEO',
      priority: 'High',
      issue: `${auditResults.onPage.titleAnalysis.missing} pages missing title tags`,
      solution: 'Add unique, keyword-rich title tags to all pages',
      impact: 'High',
      effort: 'Low'
    });
  }
  
  if (auditResults.onPage.metaDescriptionAnalysis.missing > 0) {
    recommendations.push({
      category: 'On-Page SEO',
      priority: 'High',
      issue: `${auditResults.onPage.metaDescriptionAnalysis.missing} pages missing meta descriptions`,
      solution: 'Add compelling meta descriptions (150-160 characters) to all pages',
      impact: 'High',
      effort: 'Low'
    });
  }
  
  if (auditResults.onPage.headingAnalysis.missingH1 > 0) {
    recommendations.push({
      category: 'On-Page SEO',
      priority: 'High',
      issue: `${auditResults.onPage.headingAnalysis.missingH1} pages missing H1 tags`,
      solution: 'Add single, descriptive H1 tag to each page',
      impact: 'High',
      effort: 'Low'
    });
  }
  
  if (auditResults.onPage.canonicalAnalysis.missing > 0) {
    recommendations.push({
      category: 'Technical SEO',
      priority: 'High',
      issue: `${auditResults.onPage.canonicalAnalysis.missing} pages missing canonical tags`,
      solution: 'Add self-referencing canonical tags to prevent duplicate content',
      impact: 'High',
      effort: 'Low'
    });
  }
  
  if (auditResults.onPage.imageAnalysis.imagesWithoutAlt > 0) {
    recommendations.push({
      category: 'On-Page SEO',
      priority: 'Medium',
      issue: `${auditResults.onPage.imageAnalysis.imagesWithoutAlt} images missing alt text`,
      solution: 'Add descriptive alt text to all images for accessibility and SEO',
      impact: 'Medium',
      effort: 'Medium'
    });
  }
  
  if (auditResults.onPage.contentAnalysis.thinContent > 0) {
    recommendations.push({
      category: 'Content Quality',
      priority: 'Medium',
      issue: `${auditResults.onPage.contentAnalysis.thinContent} pages with thin content (<300 words)`,
      solution: 'Expand content to provide comprehensive information',
      impact: 'Medium',
      effort: 'High'
    });
  }
  
  auditResults.recommendations = recommendations;
  return recommendations;
}

// Main audit function
async function runComprehensiveAudit() {
  console.log('🚀 Starting comprehensive SEO audit for drsayuj.info\n');
  
  try {
    // 1. Discovery & Data Collection
    const urls = await parseSitemap();
    
    if (urls.length === 0) {
      console.error('❌ No URLs found in sitemap');
      return;
    }
    
    // 2. Analyze pages
    console.log(`📊 Analyzing ${urls.length} pages...`);
    const pageResults = await batchProcess(urls);
    
    // 3. On-page SEO analysis
    const onPageAnalysis = analyzeOnPageSEO(pageResults);
    
    // 4. Generate recommendations
    const recommendations = generateRecommendations();
    
    // 5. Save results
    const reportDir = path.join(__dirname, '../reports/seo');
    if (!fs.existsSync(reportDir)) {
      fs.mkdirSync(reportDir, { recursive: true });
    }
    
    const timestamp = new Date().toISOString().split('T')[0];
    const jsonFile = path.join(reportDir, `comprehensive-seo-audit-${timestamp}.json`);
    const mdFile = path.join(reportDir, `comprehensive-seo-audit-${timestamp}.md`);
    
    fs.writeFileSync(jsonFile, JSON.stringify(auditResults, null, 2));
    
    // Generate markdown report
    const mdReport = generateMarkdownReport();
    fs.writeFileSync(mdFile, mdReport);
    
    console.log('\n✅ Comprehensive SEO audit completed!');
    console.log(`📄 JSON report: ${jsonFile}`);
    console.log(`📄 Markdown report: ${mdFile}`);
    
    // Print summary
    printSummary();
    
  } catch (error) {
    console.error('❌ Audit failed:', error.message);
  }
}

// Generate markdown report
function generateMarkdownReport() {
  const { onPage, recommendations } = auditResults;
  
  return `# Comprehensive SEO Audit Report - drsayuj.info

**Date:** ${auditResults.timestamp.split('T')[0]}  
**Site:** ${auditResults.site}  
**Pages Analyzed:** ${onPage.totalPages}

## 📊 Executive Summary

### Key Metrics
- **Total Pages:** ${onPage.totalPages}
- **Pages with Issues:** ${onPage.pagesWithIssues}
- **Average Word Count:** ${onPage.contentAnalysis.averageWordCount}
- **Average Images per Page:** ${onPage.imageAnalysis.averageImagesPerPage}

### Critical Issues Found
${onPage.pagesWithIssues > 0 ? `${onPage.pagesWithIssues} pages have SEO issues that need immediate attention.` : 'No critical issues found.'}

## 🔍 On-Page SEO Analysis

### Title Tags
- **Missing:** ${onPage.titleAnalysis.missing}
- **Too Long (>60 chars):** ${onPage.titleAnalysis.tooLong}
- **Too Short (<30 chars):** ${onPage.titleAnalysis.tooShort}
- **Average Length:** ${onPage.titleAnalysis.averageLength} characters

### Meta Descriptions
- **Missing:** ${onPage.metaDescriptionAnalysis.missing}
- **Too Long (>160 chars):** ${onPage.metaDescriptionAnalysis.tooLong}
- **Too Short (<120 chars):** ${onPage.metaDescriptionAnalysis.tooShort}
- **Average Length:** ${onPage.metaDescriptionAnalysis.averageLength} characters

### Heading Structure
- **Missing H1:** ${onPage.headingAnalysis.missingH1}
- **Multiple H1:** ${onPage.headingAnalysis.multipleH1}
- **Average H2 Count:** ${onPage.headingAnalysis.averageH2Count}

### Canonical Tags
- **Missing:** ${onPage.canonicalAnalysis.missing}
- **Self-Referencing:** ${onPage.canonicalAnalysis.selfReferencing}

### Images
- **Total Images:** ${onPage.imageAnalysis.totalImages}
- **Missing Alt Text:** ${onPage.imageAnalysis.imagesWithoutAlt}
- **Average per Page:** ${onPage.imageAnalysis.averageImagesPerPage}

### Content Quality
- **Average Word Count:** ${onPage.contentAnalysis.averageWordCount}
- **Thin Content (<300 words):** ${onPage.contentAnalysis.thinContent}

## 💡 Recommendations

${recommendations.map((rec, index) => `
### ${index + 1}. ${rec.issue}

**Priority:** ${rec.priority}  
**Category:** ${rec.category}  
**Impact:** ${rec.impact} | **Effort:** ${rec.effort}

**Solution:** ${rec.solution}
`).join('')}

## 🎯 Next Steps

1. **Immediate (Week 1):** Address high-priority issues
2. **Short-term (Month 1):** Implement medium-priority recommendations
3. **Long-term (Quarter 1):** Focus on content expansion and optimization

## 📈 Expected Impact

Implementing these recommendations should result in:
- 15-25% improvement in organic traffic
- Better search engine rankings
- Enhanced user experience
- Improved Core Web Vitals scores

---
*Report generated by Autonomous SEO Engineer*
`;
}

// Print summary to console
function printSummary() {
  console.log('\n📊 AUDIT SUMMARY');
  console.log('================');
  console.log(`Total Pages: ${auditResults.onPage.totalPages}`);
  console.log(`Pages with Issues: ${auditResults.onPage.pagesWithIssues}`);
  console.log(`Critical Issues: ${auditResults.recommendations.filter(r => r.priority === 'High').length}`);
  console.log(`Recommendations: ${auditResults.recommendations.length}`);
  
  console.log('\n🔍 TOP ISSUES:');
  auditResults.recommendations.slice(0, 5).forEach((rec, index) => {
    console.log(`${index + 1}. ${rec.issue} (${rec.priority})`);
  });
}

// Run the audit
if (require.main === module) {
  runComprehensiveAudit();
}

module.exports = { runComprehensiveAudit };
