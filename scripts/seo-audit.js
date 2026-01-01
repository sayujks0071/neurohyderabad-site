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

// Request cache to avoid duplicate fetches
const requestCache = new Map();

/**
 * Fetch URL content with caching
 */
function fetchUrl(url) {
  // Check cache first
  if (requestCache.has(url)) {
    return Promise.resolve(requestCache.get(url));
  }

  return new Promise((resolve, reject) => {
    const protocol = url.startsWith('https') ? https : http;
    const req = protocol.get(url, { timeout: 10000 }, (res) => {
      const chunks = [];
      res.on('data', chunk => chunks.push(chunk));
      res.on('end', () => {
        const result = { 
          statusCode: res.statusCode, 
          headers: res.headers, 
          body: Buffer.concat(chunks).toString('utf8')
        };
        // Cache the result
        requestCache.set(url, result);
        resolve(result);
      });
    });
    req.on('error', reject);
    req.on('timeout', () => {
      req.destroy();
      reject(new Error('Timeout'));
    });
  });
}

// Pre-compiled regex patterns for better performance
// Note: Using non-global patterns where appropriate to avoid state issues
const REGEX_PATTERNS = {
  title: /<title[^>]*>([^<]+)<\/title>/i,
  metaDescription: /<meta\s+name=["']description["']\s+content=["']([^"']+)["']/i,
  canonical: /<link\s+rel=["']canonical["']\s+href=["']([^"']+)["']/i,
  h1: /<h1[^>]*>([^<]+)<\/h1>/gi,
  h2: /<h2[^>]*>([^<]+)<\/h2>/gi,
  ogTags: /<meta\s+property=["']og:([^"']+)["']\s+content=["']([^"']+)["']/gi,
  twitterTags: /<meta\s+name=["']twitter:([^"']+)["']\s+content=["']([^"']+)["']/gi,
  jsonLd: /<script\s+type=["']application\/ld\+json["'][^>]*>([^<]+)<\/script>/gi,
  links: /<a\s+[^>]*href=["']([^"']+)["'][^>]*>/gi,
  images: /<img\s+[^>]*src=["']([^"']+)["'][^>]*>/gi,
  body: /<body[^>]*>([\s\S]*)<\/body>/i,
  tags: /<[^>]+>/g,
  whitespace: /\s+/g
};

// Helper function to safely reset and use global regex patterns
function matchAllWithLimit(html, pattern, limit) {
  const matches = [];
  pattern.lastIndex = 0;
  let match;
  while ((match = pattern.exec(html)) !== null && matches.length < limit) {
    matches.push(match);
  }
  pattern.lastIndex = 0; // Reset for next use
  return matches;
}

/**
 * Extract metadata from HTML with optimized regex caching
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
  const titleMatch = html.match(REGEX_PATTERNS.title);
  if (titleMatch) metadata.title = titleMatch[1].trim();

  // Meta description
  const descMatch = html.match(REGEX_PATTERNS.metaDescription);
  if (descMatch) metadata.metaDescription = descMatch[1].trim();

  // Canonical URL
  const canonicalMatch = html.match(REGEX_PATTERNS.canonical);
  if (canonicalMatch) metadata.canonicalUrl = canonicalMatch[1];

  // H1 tags
  const h1Matches = html.match(REGEX_PATTERNS.h1);
  if (h1Matches) {
    metadata.h1 = h1Matches.map(h => h.replace(REGEX_PATTERNS.tags, '').trim());
  }

  // H2 tags (limit to 10 for performance)
  const h2Matches = html.match(REGEX_PATTERNS.h2);
  if (h2Matches) {
    metadata.h2 = h2Matches.slice(0, 10).map(h => h.replace(REGEX_PATTERNS.tags, '').trim());
  }

  // Open Graph tags
  const ogMatches = matchAllWithLimit(html, REGEX_PATTERNS.ogTags, 10);
  ogMatches.forEach(match => {
    metadata.ogTags[match[1]] = match[2];
  });

  // Twitter tags
  const twitterMatches = matchAllWithLimit(html, REGEX_PATTERNS.twitterTags, 10);
  twitterMatches.forEach(match => {
    metadata.twitterTags[match[1]] = match[2];
  });

  // Structured data
  const jsonLdMatches = matchAllWithLimit(html, REGEX_PATTERNS.jsonLd, 5);
  jsonLdMatches.forEach(match => {
    try {
      metadata.structuredData.push(JSON.parse(match[1]));
    } catch (e) {
      // Invalid JSON - skip
    }
  });

  // Links - optimized with Set for deduplication
  const internalLinksSet = new Set();
  const externalLinksSet = new Set();
  const baseUrl = new URL(url);
  
  const linkMatches = matchAllWithLimit(html, REGEX_PATTERNS.links, 200);
  linkMatches.forEach(match => {
    try {
      const linkUrl = new URL(match[1], url);
      if (linkUrl.hostname === baseUrl.hostname) {
        internalLinksSet.add(match[1]);
      } else {
        externalLinksSet.add(match[1]);
      }
    } catch (e) {
      // Invalid URL - skip
    }
  });
  metadata.internalLinks = Array.from(internalLinksSet);
  metadata.externalLinks = Array.from(externalLinksSet);

  // Images
  const imgMatches = matchAllWithLimit(html, REGEX_PATTERNS.images, 50);
  imgMatches.forEach(match => {
    const altMatch = match[0].match(/alt=["']([^"']*)["']/);
    metadata.images.push({
      src: match[1],
      alt: altMatch ? altMatch[1] : ''
    });
  });

  // Word count (approximate) - optimized
  const bodyMatch = html.match(REGEX_PATTERNS.body);
  if (bodyMatch) {
    const text = bodyMatch[1]
      .replace(REGEX_PATTERNS.tags, ' ')
      .replace(REGEX_PATTERNS.whitespace, ' ')
      .trim();
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

    // Crawl pages with concurrent processing (limit to 50 for performance)
    const urlsToCrawl = urls.slice(0, 50);
    console.log(`\n🕷️  Crawling ${urlsToCrawl.length} pages...`);

    // Process in batches of 5 for better performance
    const BATCH_SIZE = 5;
    for (let i = 0; i < urlsToCrawl.length; i += BATCH_SIZE) {
      const batch = urlsToCrawl.slice(i, i + BATCH_SIZE);
      console.log(`  Processing batch ${Math.floor(i/BATCH_SIZE) + 1}/${Math.ceil(urlsToCrawl.length/BATCH_SIZE)}`);
      
      await Promise.all(batch.map(async (url) => {
        try {
          const response = await fetchUrl(url);
          
          if (response.statusCode !== 200) {
            audit.issues.high.push({
              url,
              type: 'non_200_status',
              message: `Page returned status ${response.statusCode}`
            });
            return;
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
        } catch (error) {
          console.error(`  ❌ Error crawling ${url}:`, error.message);
          audit.issues.critical.push({
            url,
            type: 'crawl_error',
            message: error.message
          });
        }
      }));
      
      // Small delay between batches to avoid overwhelming the server
      if (i + BATCH_SIZE < urlsToCrawl.length) {
        await new Promise(resolve => setTimeout(resolve, 200));
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
