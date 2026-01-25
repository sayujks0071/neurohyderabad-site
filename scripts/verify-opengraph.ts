#!/usr/bin/env tsx
/**
 * Verify Open Graph metadata is properly configured
 * Checks HTML prefix, meta tags, and validates OG structure
 */

import { readFileSync } from 'fs';
import { join } from 'path';

const SITE_URL = process.env.SITE_URL || 'https://www.drsayuj.info';

interface OGCheck {
  name: string;
  passed: boolean;
  message: string;
}

const checks: OGCheck[] = [];

// Check 1: HTML prefix attribute
function checkHTMLPrefix() {
  const layoutPath = join(process.cwd(), 'app', 'layout.tsx');
  try {
    const content = readFileSync(layoutPath, 'utf-8');
    const hasPrefix = content.includes('prefix="og: https://ogp.me/ns# article: https://ogp.me/ns/article#"');
    checks.push({
      name: 'HTML Open Graph Prefix',
      passed: hasPrefix,
      message: hasPrefix
        ? '✅ HTML tag has Open Graph prefix'
        : '❌ HTML tag missing Open Graph prefix',
    });
  } catch (error) {
    checks.push({
      name: 'HTML Open Graph Prefix',
      passed: false,
      message: `❌ Error reading layout.tsx: ${error}`,
    });
  }
}

// Check 2: Root layout Open Graph metadata
function checkRootLayoutOG() {
  const layoutPath = join(process.cwd(), 'app', 'layout.tsx');
  try {
    const content = readFileSync(layoutPath, 'utf-8');
    const requiredOG = [
      'openGraph:',
      'title:',
      'description:',
      'url:',
      'siteName:',
      'images:',
    ];
    
    const missing = requiredOG.filter(prop => !content.includes(prop));
    
    checks.push({
      name: 'Root Layout Open Graph',
      passed: missing.length === 0,
      message: missing.length === 0
        ? '✅ All required Open Graph properties present'
        : `❌ Missing Open Graph properties: ${missing.join(', ')}`,
    });
  } catch (error) {
    checks.push({
      name: 'Root Layout Open Graph',
      passed: false,
      message: `❌ Error reading layout.tsx: ${error}`,
    });
  }
}

// Check 3: OG Image configuration
function checkOGImage() {
  const layoutPath = join(process.cwd(), 'app', 'layout.tsx');
  try {
    const content = readFileSync(layoutPath, 'utf-8');
    const hasImage = content.includes('og-default.jpg');
    const hasDimensions = content.includes('width: 1200') && content.includes('height: 630');
    const hasAlt = content.includes('alt:');
    
    const allPresent = hasImage && hasDimensions && hasAlt;
    
    checks.push({
      name: 'Open Graph Image',
      passed: allPresent,
      message: allPresent
        ? '✅ OG image properly configured (URL, dimensions, alt)'
        : `❌ OG image missing: ${!hasImage ? 'URL' : ''} ${!hasDimensions ? 'dimensions' : ''} ${!hasAlt ? 'alt text' : ''}`,
    });
  } catch (error) {
    checks.push({
      name: 'Open Graph Image',
      passed: false,
      message: `❌ Error reading layout.tsx: ${error}`,
    });
  }
}

// Check 4: Twitter Card configuration
function checkTwitterCard() {
  const layoutPath = join(process.cwd(), 'app', 'layout.tsx');
  try {
    const content = readFileSync(layoutPath, 'utf-8');
    const hasTwitter = content.includes('twitter:');
    const hasCard = content.includes('summary_large_image');
    const hasSite = content.includes('site:');
    
    checks.push({
      name: 'Twitter Card',
      passed: hasTwitter && hasCard && hasSite,
      message: hasTwitter && hasCard && hasSite
        ? '✅ Twitter Card properly configured'
        : `❌ Twitter Card missing: ${!hasTwitter ? 'twitter config' : ''} ${!hasCard ? 'card type' : ''} ${!hasSite ? 'site handle' : ''}`,
    });
  } catch (error) {
    checks.push({
      name: 'Twitter Card',
      passed: false,
      message: `❌ Error reading layout.tsx: ${error}`,
    });
  }
}

// Check 5: Article metadata helper
function checkArticleMetadata() {
  const metaPath = join(process.cwd(), 'app', '_lib', 'meta.ts');
  try {
    const content = readFileSync(metaPath, 'utf-8');
    const hasArticleSupport = content.includes('publishedTime') || content.includes('article');
    
    checks.push({
      name: 'Article Metadata Support',
      passed: hasArticleSupport,
      message: hasArticleSupport
        ? '✅ Article metadata helper available'
        : '⚠️  Article metadata helper not found (optional)',
    });
  } catch (error) {
    checks.push({
      name: 'Article Metadata Support',
      passed: true, // Optional
      message: '⚠️  Article metadata helper not found (optional)',
    });
  }
}

// Run all checks
function main() {
  console.log('🔍 Verifying Open Graph Configuration\n');
  
  checkHTMLPrefix();
  checkRootLayoutOG();
  checkOGImage();
  checkTwitterCard();
  checkArticleMetadata();
  
  // Print results
  console.log('Results:\n');
  checks.forEach(check => {
    console.log(`${check.passed ? '✅' : '❌'} ${check.name}`);
    console.log(`   ${check.message}\n`);
  });
  
  const passed = checks.filter(c => c.passed).length;
  const total = checks.length;
  const percentage = ((passed / total) * 100).toFixed(1);
  
  console.log('='.repeat(50));
  console.log(`Summary: ${passed}/${total} checks passed (${percentage}%)`);
  console.log('='.repeat(50));
  
  if (passed === total) {
    console.log('\n✅ All Open Graph checks passed!');
    process.exit(0);
  } else {
    console.log('\n⚠️  Some checks failed. Review the output above.');
    process.exit(1);
  }
}

main();
