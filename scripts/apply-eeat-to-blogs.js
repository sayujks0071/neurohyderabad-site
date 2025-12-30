#!/usr/bin/env node

/**
 * Script to systematically apply E-E-A-T components to all blog posts
 * This ensures consistent author attribution, sources, and medical review across all content
 */

const fs = require('fs');
const path = require('path');

const BLOG_DIR = 'app/blog';
const COMPONENTS_TO_ADD = [
  "import AuthorByline from '@/app/_components/AuthorByline';",
  "import SourceList from '@/app/_components/SourceList';",
  "import ReviewedBy from '@/app/_components/ReviewedBy';",
  "import NAP from '@/app/_components/NAP';",
  "import { sources } from '../sources';"
];

const E_E_A_T_COMPONENTS = `
      <AuthorByline 
        publishedOn="2025-01-15"
        updatedOn="2025-10-19"
      />
      
      <SourceList sources={sources['${'${slug}'}']} />
      
      <NAP />
      <ReviewedBy />`;

// Blog posts that need E-E-A-T enhancement
const BLOG_POSTS = [
  'awake-craniotomy-guide',
  'day-care-endoscopic-spine-surgery-eligibility',
  'day-care-spine-surgery-insurance-hyderabad',
  'disc-replacement-vs-fusion',
  'endoscopic-vs-microdiscectomy-hyderabad',
  'mvd-vs-radiosurgery-trigeminal-neuralgia',
  'return-to-work-after-endoscopic-discectomy-hyderabad',
  'sciatica-pain-management-hyderabad',
  'spine-health-maintenance-hyderabad',
  'spinal-fusion-cost-hyderabad'
];

function updateBlogPost(slug) {
  const filePath = path.join(BLOG_DIR, slug, 'page.tsx');
  
  if (!fs.existsSync(filePath)) {
    console.log(`❌ File not found: ${filePath}`);
    return false;
  }

  let content = fs.readFileSync(filePath, 'utf8');
  
  // Check if already has E-E-A-T components
  if (content.includes('AuthorByline') && content.includes('SourceList')) {
    console.log(`✅ ${slug} already has E-E-A-T components`);
    return true;
  }

  // Add imports if not present
  COMPONENTS_TO_ADD.forEach(importLine => {
    if (!content.includes(importLine)) {
      // Find the last import statement
      const lastImportIndex = content.lastIndexOf('import ');
      if (lastImportIndex !== -1) {
        const nextLineIndex = content.indexOf('\n', lastImportIndex);
        content = content.slice(0, nextLineIndex) + '\n' + importLine + content.slice(nextLineIndex);
      }
    }
  });

  // Add E-E-A-T components before closing tags
  const componentsToAdd = E_E_A_T_COMPONENTS.replace('${slug}', slug);
  
  // Find a good place to insert the components (before closing main/article tags)
  const insertPatterns = [
    /<\/main>/,
    /<\/article>/,
    /<\/div>\s*<\/div>\s*<\/div>\s*\);\s*}/,
    /<NAP \/>\s*<ReviewedBy \/>/
  ];

  let inserted = false;
  for (const pattern of insertPatterns) {
    if (pattern.test(content)) {
      content = content.replace(pattern, componentsToAdd + '\n' + content.match(pattern)[0]);
      inserted = true;
      break;
    }
  }

  if (!inserted) {
    // Fallback: add before the last closing tags
    const lastClosingTags = content.lastIndexOf('</div>');
    if (lastClosingTags !== -1) {
      content = content.slice(0, lastClosingTags) + componentsToAdd + '\n' + content.slice(lastClosingTags);
      inserted = true;
    }
  }

  if (inserted) {
    fs.writeFileSync(filePath, content);
    console.log(`✅ Updated ${slug} with E-E-A-T components`);
    return true;
  } else {
    console.log(`❌ Could not find insertion point for ${slug}`);
    return false;
  }
}

function main() {
  console.log('🚀 Applying E-E-A-T components to blog posts...\n');
  
  let successCount = 0;
  let totalCount = BLOG_POSTS.length;

  BLOG_POSTS.forEach(slug => {
    if (updateBlogPost(slug)) {
      successCount++;
    }
  });

  console.log(`\n📊 Results: ${successCount}/${totalCount} blog posts updated successfully`);
  
  if (successCount === totalCount) {
    console.log('🎉 All blog posts now have E-E-A-T components!');
  } else {
    console.log('⚠️  Some blog posts may need manual review');
  }
}

if (require.main === module) {
  main();
}

module.exports = { updateBlogPost, BLOG_POSTS };
