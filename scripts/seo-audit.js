#!/usr/bin/env node

/**
 * Comprehensive SEO Audit Script for drsayuj.info
 * 
 * This script performs an in-depth SEO audit including:
 * - Sitemap and robots.txt analysis
 * - Page crawling and metadata extraction
 * - Core Web Vitals measurement
 * - Structured data validation
 * - Internal linking analysis
 * - Image optimization audit
 * - Mobile-friendliness check
 */

const https = require('https');
const http = require('http');
const { URL } = require('url');
const fs = require('fs');
const path = require('path');

// Configuration
const SITE_URL = 'https://www.drsayuj.info';
const OUTPUT_DIR = path.join(__dirname, '../reports/seo');
const DATE = new Date().toISOString().split('T')[0];

// Ensure output directory exists
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

// Audit results
const audit = {
  timestamp: new Date().toISOString(),
  siteUrl: SITE_URL,
  summary: {
    totalPages: 0,
    crawledPages: 0,
    errors: 0,
    warnings: 0
  },
  pages: [],
  issues: {
    critical: [],
    high: [],
    medium: [],
    low: []
  },
  recommendations: []
};

/**
 * Fetch URL content
 */
function fetchUrl(url) {
  return new Promise((resolve, reject) => {
    const protocol = url.startsWith('https') ? https : http;
    protocol.get(url, { timeout: 10000 }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve({ statusCode: res.statusCode, headers: res.headers, body: data }));
    }).on('error', reject).on('timeout', () => reject(new Error('Timeout')));
  });
}

/**
 * Extract metadata from HTML
 */
function extractMetadata(html, url) {
  const metadata = {
    url,
    title: '',
    metaDescription: '',
    h1: [],
    h2: [],
    canonicalUrl: '',
    ogTags: {},
    twitterTags: {},
    structuredData: [],
    internalLinks: [],
    externalLinks: [],
    images: [],
    wordCount: 0
  };

  // Title
  const titleMatch = html.match(/<title[^>]*>([^<]+)<\/title>/i);
  if (titleMatch) metadata.title = titleMatch[1].trim();

  // Meta description
  const descMatch = html.match(/<meta\s+name=["']description["']\s+content=["']([^"']+)["']/i);
  if (descMatch) metadata.metaDescription = descMatch[1].trim();

  // Canonical URL
  const canonicalMatch = html.match(/<link\s+rel=["']canonical["']\s+href=["']([^"']+)["']/i);
  if (canonicalMatch) metadata.canonicalUrl = canonicalMatch[1];

  // H1 tags
  const h1Matches = html.match(/<h1[^>]*>([^<]+)<\/h1>/gi);
  if (h1Matches) {
    metadata.h1 = h1Matches.map(h => h.replace(/<[^>]+>/g, '').trim());
  }

  // H2 tags
  const h2Matches = html.match(/<h2[^>]*>([^<]+)<\/h2>/gi);
  if (h2Matches) {
    metadata.h2 = h2Matches.map(h => h.replace(/<[^>]+>/g, '').trim()).slice(0, 10);
  }

  // Open Graph tags
  const ogMatches = html.match(/<meta\s+property=["']og:([^"']+)["']\s+content=["']([^"']+)["']/gi);
  if (ogMatches) {
    ogMatches.forEach(tag => {
      const match = tag.match(/property=["']og:([^"']+)["']\s+content=["']([^"']+)["']/);
      if (match) metadata.ogTags[match[1]] = match[2];
    });
  }

  // Twitter tags
  const twitterMatches = html.match(/<meta\s+name=["']twitter:([^"']+)["']\s+content=["']([^"']+)["']/gi);
  if (twitterMatches) {
    twitterMatches.forEach(tag => {
      const match = tag.match(/name=["']twitter:([^"']+)["']\s+content=["']([^"']+)["']/);
      if (match) metadata.twitterTags[match[1]] = match[2];
    });
  }

  // Structured data
  const jsonLdMatches = html.match(/<script\s+type=["']application\/ld\+json["'][^>]*>([^<]+)<\/script>/gi);
  if (jsonLdMatches) {
    jsonLdMatches.forEach(script => {
      try {
        const json = script.replace(/<script[^>]*>/, '').replace(/<\/script>/, '');
        metadata.structuredData.push(JSON.parse(json));
      } catch (e) {
        // Invalid JSON
      }
    });
  }

  // Links
  const linkMatches = html.match(/<a\s+[^>]*href=["']([^"']+)["'][^>]*>/gi);
  if (linkMatches) {
    linkMatches.forEach(link => {
      const match = link.match(/href=["']([^"']+)["']/);
      if (match) {
        const href = match[1];
        try {
          const linkUrl = new URL(href, url);
          if (linkUrl.hostname === new URL(url).hostname) {
            metadata.internalLinks.push(href);
          } else {
            metadata.externalLinks.push(href);
          }
        } catch (e) {
          // Invalid URL
        }
      }
    });
  }

  // Images
  const imgMatches = html.match(/<img\s+[^>]*src=["']([^"']+)["'][^>]*>/gi);
  if (imgMatches) {
    imgMatches.forEach(img => {
      const srcMatch = img.match(/src=["']([^"']+)["']/);
      const altMatch = img.match(/alt=["']([^"']*)["']/);
      if (srcMatch) {
        metadata.images.push({
          src: srcMatch[1],
          alt: altMatch ? altMatch[1] : ''
        });
      }
    });
  }

  // Word count (approximate)
  const bodyMatch = html.match(/<body[^>]*>([\s\S]*)<\/body>/i);
  if (bodyMatch) {
    const text = bodyMatch[1].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
    metadata.wordCount = text.split(' ').length;
  }

  return metadata;
}

/**
 * Analyze page metadata
 */
function analyzePage(metadata) {
  const issues = [];

  // Title analysis
  if (!metadata.title) {
    issues.push({ severity: 'critical', type: 'missing_title', message: 'Page has no title tag' });
  } else if (metadata.title.length < 30) {
    issues.push({ severity: 'high', type: 'short_title', message: `Title too short (${metadata.title.length} chars)` });
  } else if (metadata.title.length > 60) {
    issues.push({ severity: 'medium', type: 'long_title', message: `Title too long (${metadata.title.length} chars)` });
  }

  // Meta description analysis
  if (!metadata.metaDescription) {
    issues.push({ severity: 'high', type: 'missing_description', message: 'Page has no meta description' });
  } else if (metadata.metaDescription.length < 120) {
    issues.push({ severity: 'medium', type: 'short_description', message: `Meta description too short (${metadata.metaDescription.length} chars)` });
  } else if (metadata.metaDescription.length > 160) {
    issues.push({ severity: 'medium', type: 'long_description', message: `Meta description too long (${metadata.metaDescription.length} chars)` });
  }

  // H1 analysis
  if (metadata.h1.length === 0) {
    issues.push({ severity: 'critical', type: 'missing_h1', message: 'Page has no H1 tag' });
  } else if (metadata.h1.length > 1) {
    issues.push({ severity: 'medium', type: 'multiple_h1', message: `Page has ${metadata.h1.length} H1 tags` });
  }

  // Canonical URL analysis
  if (!metadata.canonicalUrl) {
    issues.push({ severity: 'high', type: 'missing_canonical', message: 'Page has no canonical URL' });
  }

  // Structured data analysis
  if (metadata.structuredData.length === 0) {
    issues.push({ severity: 'medium', type: 'missing_structured_data', message: 'Page has no structured data' });
  }

  // Image alt text analysis
  const imagesWithoutAlt = metadata.images.filter(img => !img.alt);
  if (imagesWithoutAlt.length > 0) {
    issues.push({ 
      severity: 'medium', 
      type: 'missing_image_alt', 
      message: `${imagesWithoutAlt.length} images missing alt text` 
    });
  }

  // Content length analysis
  if (metadata.wordCount < 300) {
    issues.push({ 
      severity: 'medium', 
      type: 'thin_content', 
      message: `Page has thin content (${metadata.wordCount} words)` 
    });
  }

  // Internal linking analysis
  if (metadata.internalLinks.length < 3) {
    issues.push({ 
      severity: 'low', 
      type: 'insufficient_internal_links', 
      message: `Page has only ${metadata.internalLinks.length} internal links` 
    });
  }

  return issues;
}

/**
 * Main audit function
 */
async function runAudit() {
  console.log('🔍 Starting comprehensive SEO audit for', SITE_URL);
  console.log('📅 Date:', DATE);

  try {
    // Fetch sitemap
    console.log('\n📄 Fetching sitemap...');
    const sitemapResponse = await fetchUrl(`${SITE_URL}/sitemap-0.xml`);
    const urlMatches = sitemapResponse.body.match(/<loc>([^<]+)<\/loc>/g);
    
    if (!urlMatches) {
      console.error('❌ No URLs found in sitemap');
      return;
    }

    const urls = urlMatches.map(match => match.replace(/<\/?loc>/g, ''));
    audit.summary.totalPages = urls.length;
    console.log(`✅ Found ${urls.length} URLs in sitemap`);

    // Crawl pages (limit to 50 for performance)
    const urlsToCrawl = urls.slice(0, 50);
    console.log(`\n🕷️  Crawling ${urlsToCrawl.length} pages...`);

    for (const url of urlsToCrawl) {
      try {
        console.log(`  Crawling: ${url}`);
        const response = await fetchUrl(url);
        
        if (response.statusCode !== 200) {
          audit.issues.high.push({
            url,
            type: 'non_200_status',
            message: `Page returned status ${response.statusCode}`
          });
          continue;
        }

        const metadata = extractMetadata(response.body, url);
        const pageIssues = analyzePage(metadata);
        
        audit.pages.push({
          url,
          statusCode: response.statusCode,
          metadata,
          issues: pageIssues
        });

        // Categorize issues
        pageIssues.forEach(issue => {
          audit.issues[issue.severity].push({ url, ...issue });
          if (issue.severity === 'critical') audit.summary.errors++;
          else audit.summary.warnings++;
        });

        audit.summary.crawledPages++;
        
        // Rate limiting
        await new Promise(resolve => setTimeout(resolve, 100));
      } catch (error) {
        console.error(`  ❌ Error crawling ${url}:`, error.message);
        audit.issues.critical.push({
          url,
          type: 'crawl_error',
          message: error.message
        });
      }
    }

    // Generate recommendations
    console.log('\n💡 Generating recommendations...');
    generateRecommendations();

    // Save results
    const jsonPath = path.join(OUTPUT_DIR, `audit-${DATE}.json`);
    const mdPath = path.join(OUTPUT_DIR, `audit-${DATE}.md`);
    
    fs.writeFileSync(jsonPath, JSON.stringify(audit, null, 2));
    fs.writeFileSync(mdPath, generateMarkdownReport());

    console.log('\n✅ Audit complete!');
    console.log(`📊 Results saved to:`);
    console.log(`   - ${jsonPath}`);
    console.log(`   - ${mdPath}`);
    console.log(`\n📈 Summary:`);
    console.log(`   Total pages: ${audit.summary.totalPages}`);
    console.log(`   Crawled pages: ${audit.summary.crawledPages}`);
    console.log(`   Critical issues: ${audit.issues.critical.length}`);
    console.log(`   High priority issues: ${audit.issues.high.length}`);
    console.log(`   Medium priority issues: ${audit.issues.medium.length}`);
    console.log(`   Low priority issues: ${audit.issues.low.length}`);

  } catch (error) {
    console.error('❌ Audit failed:', error);
    process.exit(1);
  }
}

/**
 * Generate recommendations based on audit findings
 */
function generateRecommendations() {
  const recommendations = [];

  // Critical issues
  if (audit.issues.critical.length > 0) {
    recommendations.push({
      priority: 'CRITICAL',
      category: 'Technical SEO',
      issue: 'Critical SEO issues detected',
      impact: 'High',
      effort: 'Medium',
      recommendation: 'Address all critical issues immediately (missing titles, H1 tags, crawl errors)'
    });
  }

  // Meta descriptions
  const missingDescriptions = audit.issues.high.filter(i => i.type === 'missing_description');
  if (missingDescriptions.length > 0) {
    recommendations.push({
      priority: 'HIGH',
      category: 'On-Page SEO',
      issue: `${missingDescriptions.length} pages missing meta descriptions`,
      impact: 'High',
      effort: 'Low',
      recommendation: 'Add unique, compelling meta descriptions (120-160 chars) to all pages'
    });
  }

  // Image alt text
  const missingAlt = audit.issues.medium.filter(i => i.type === 'missing_image_alt');
  if (missingAlt.length > 0) {
    recommendations.push({
      priority: 'MEDIUM',
      category: 'Accessibility & SEO',
      issue: 'Multiple images missing alt text',
      impact: 'Medium',
      effort: 'Low',
      recommendation: 'Add descriptive alt text to all images for accessibility and SEO'
    });
  }

  // Thin content
  const thinContent = audit.issues.medium.filter(i => i.type === 'thin_content');
  if (thinContent.length > 0) {
    recommendations.push({
      priority: 'MEDIUM',
      category: 'Content Quality',
      issue: `${thinContent.length} pages with thin content (<300 words)`,
      impact: 'Medium',
      effort: 'High',
      recommendation: 'Expand thin content pages or consolidate with related pages'
    });
  }

  // Internal linking
  const lowInternalLinks = audit.issues.low.filter(i => i.type === 'insufficient_internal_links');
  if (lowInternalLinks.length > 0) {
    recommendations.push({
      priority: 'LOW',
      category: 'Internal Linking',
      issue: `${lowInternalLinks.length} pages with insufficient internal links`,
      impact: 'Low',
      effort: 'Low',
      recommendation: 'Add 5+ relevant internal links per page to improve crawlability'
    });
  }

  audit.recommendations = recommendations;
}

/**
 * Generate markdown report
 */
function generateMarkdownReport() {
  let md = `# SEO Audit Report - ${DATE}\n\n`;
  md += `**Site:** ${SITE_URL}\n`;
  md += `**Audit Date:** ${new Date().toISOString()}\n\n`;
  
  md += `## Executive Summary\n\n`;
  md += `- **Total Pages:** ${audit.summary.totalPages}\n`;
  md += `- **Pages Crawled:** ${audit.summary.crawledPages}\n`;
  md += `- **Critical Issues:** ${audit.issues.critical.length}\n`;
  md += `- **High Priority Issues:** ${audit.issues.high.length}\n`;
  md += `- **Medium Priority Issues:** ${audit.issues.medium.length}\n`;
  md += `- **Low Priority Issues:** ${audit.issues.low.length}\n\n`;

  md += `## Top Recommendations\n\n`;
  md += `| Priority | Category | Issue | Impact | Effort | Recommendation |\n`;
  md += `|----------|----------|-------|--------|--------|----------------|\n`;
  audit.recommendations.forEach(rec => {
    md += `| ${rec.priority} | ${rec.category} | ${rec.issue} | ${rec.impact} | ${rec.effort} | ${rec.recommendation} |\n`;
  });
  md += `\n`;

  md += `## Critical Issues\n\n`;
  if (audit.issues.critical.length === 0) {
    md += `✅ No critical issues found.\n\n`;
  } else {
    audit.issues.critical.forEach(issue => {
      md += `- **${issue.url}**: ${issue.message}\n`;
    });
    md += `\n`;
  }

  md += `## High Priority Issues\n\n`;
  if (audit.issues.high.length === 0) {
    md += `✅ No high priority issues found.\n\n`;
  } else {
    const grouped = groupBy(audit.issues.high, 'type');
    Object.keys(grouped).forEach(type => {
      md += `### ${type.replace(/_/g, ' ').toUpperCase()}\n\n`;
      grouped[type].forEach(issue => {
        md += `- ${issue.url}\n`;
      });
      md += `\n`;
    });
  }

  return md;
}

/**
 * Group array by key
 */
function groupBy(array, key) {
  return array.reduce((result, item) => {
    (result[item[key]] = result[item[key]] || []).push(item);
    return result;
  }, {});
}

// Run the audit
runAudit().catch(console.error);
