#!/usr/bin/env node

/**
 * Daily SEO Audit Script
 * Performs automated SEO checks and generates reports
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SITE_URL = 'https://www.drsayuj.info';
const OUTPUT_DIR = path.join(__dirname, '../../reports/seo');
const DATE = new Date().toISOString().split('T')[0];

// Ensure output directory exists
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

const audit = {
  timestamp: new Date().toISOString(),
  siteUrl: SITE_URL,
  date: DATE,
  checks: {
    sitemap: { passed: false, details: null },
    robots: { passed: false, details: null },
    structuredData: { passed: false, details: null },
    metaTags: { passed: false, details: null },
    canonical: { passed: false, details: null },
    performance: { passed: false, details: null },
  },
  issues: [],
  recommendations: [],
};

// Check sitemap.xml
try {
  const sitemapUrl = `${SITE_URL}/sitemap.xml`;
  const response = await fetch(sitemapUrl);
  if (response.ok) {
    const text = await response.text();
    audit.checks.sitemap = {
      passed: true,
      details: {
        status: response.status,
        size: text.length,
        hasUrls: text.includes('<url>'),
      },
    };
  } else {
    audit.checks.sitemap = {
      passed: false,
      details: { status: response.status, error: 'Sitemap not accessible' },
    };
    audit.issues.push({
      level: 'high',
      type: 'sitemap',
      message: `Sitemap returned status ${response.status}`,
    });
  }
} catch (error) {
  audit.checks.sitemap = {
    passed: false,
    details: { error: error.message },
  };
  audit.issues.push({
    level: 'critical',
    type: 'sitemap',
    message: `Failed to fetch sitemap: ${error.message}`,
  });
}

// Check robots.txt
try {
  const robotsUrl = `${SITE_URL}/robots.txt`;
  const response = await fetch(robotsUrl);
  if (response.ok) {
    const text = await response.text();
    audit.checks.robots = {
      passed: true,
      details: {
        status: response.status,
        hasSitemap: text.includes('Sitemap:'),
        allowsCrawling: !text.includes('Disallow: /'),
      },
    };
  } else {
    audit.checks.robots = {
      passed: false,
      details: { status: response.status },
    };
    audit.issues.push({
      level: 'high',
      type: 'robots',
      message: `Robots.txt returned status ${response.status}`,
    });
  }
} catch (error) {
  audit.checks.robots = {
    passed: false,
    details: { error: error.message },
  };
  audit.issues.push({
    level: 'high',
    type: 'robots',
    message: `Failed to fetch robots.txt: ${error.message}`,
  });
}

// Check homepage for structured data and meta tags
try {
  const homepageResponse = await fetch(SITE_URL);
  if (homepageResponse.ok) {
    const html = await homepageResponse.text();
    
    // Check for structured data
    const hasJsonLd = html.includes('application/ld+json');
    const hasPhysicianSchema = html.includes('"@type":"Physician"');
    audit.checks.structuredData = {
      passed: hasJsonLd && hasPhysicianSchema,
      details: {
        hasJsonLd,
        hasPhysicianSchema,
      },
    };
    
    if (!hasPhysicianSchema) {
      audit.issues.push({
        level: 'high',
        type: 'structuredData',
        message: 'Homepage missing Physician JSON-LD schema',
      });
    }
    
    // Check for meta tags
    const hasTitle = html.includes('<title>');
    const hasDescription = html.includes('name="description"');
    const hasOGImage = html.includes('property="og:image"');
    audit.checks.metaTags = {
      passed: hasTitle && hasDescription && hasOGImage,
      details: {
        hasTitle,
        hasDescription,
        hasOGImage,
      },
    };
    
    // Check canonical
    const hasCanonical = html.includes('rel="canonical"');
    audit.checks.canonical = {
      passed: hasCanonical,
      details: { hasCanonical },
    };
    
    if (!hasCanonical) {
      audit.issues.push({
        level: 'medium',
        type: 'canonical',
        message: 'Homepage missing canonical tag',
      });
    }
  }
} catch (error) {
  audit.issues.push({
    level: 'critical',
    type: 'homepage',
    message: `Failed to fetch homepage: ${error.message}`,
  });
}

// Save audit results
const outputFile = path.join(OUTPUT_DIR, `${DATE}.json`);
fs.writeFileSync(outputFile, JSON.stringify(audit, null, 2));

console.log(`? SEO audit completed: ${outputFile}`);
console.log(`   Issues found: ${audit.issues.length}`);
console.log(`   Checks passed: ${Object.values(audit.checks).filter(c => c.passed).length}/${Object.keys(audit.checks).length}`);

process.exit(audit.issues.filter(i => i.level === 'critical').length > 0 ? 1 : 0);
