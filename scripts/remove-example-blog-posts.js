#!/usr/bin/env node

/**
 * Script to find and remove example/test/draft blog posts
 * This prevents sample content from being published to production
 */

const fs = require('fs');
const path = require('path');

const BLOG_DIR = 'app/blog';
const FORBIDDEN_KEYWORDS = ['example', 'test', 'draft', 'sample', 'template', 'placeholder'];
const DRY_RUN = process.argv.includes('--dry-run');

function isForbiddenPost(slug) {
  const lowerSlug = slug.toLowerCase();
  return FORBIDDEN_KEYWORDS.some(keyword => lowerSlug.includes(keyword));
}

function findExamplePosts() {
  const examplePosts = [];
  
  if (!fs.existsSync(BLOG_DIR)) {
    console.log(`❌ Blog directory not found: ${BLOG_DIR}`);
    return examplePosts;
  }

  const entries = fs.readdirSync(BLOG_DIR, { withFileTypes: true });
  
  for (const entry of entries) {
    if (!entry.isDirectory()) continue;
    
    const slug = entry.name;
    
    // Skip special directories
    if (slug === 'page' || slug.startsWith('_') || slug.startsWith('.')) {
      continue;
    }
    
    if (isForbiddenPost(slug)) {
      const postPath = path.join(BLOG_DIR, slug);
      const pageFile = path.join(postPath, 'page.tsx');
      
      if (fs.existsSync(pageFile)) {
        examplePosts.push({
          slug,
          path: postPath,
          pageFile
        });
      }
    }
  }
  
  return examplePosts;
}

function removePost(post) {
  if (DRY_RUN) {
    console.log(`[DRY RUN] Would remove: ${post.path}`);
    return true;
  }
  
  try {
    // Remove the entire directory
    fs.rmSync(post.path, { recursive: true, force: true });
    console.log(`✅ Removed: ${post.path}`);
    return true;
  } catch (error) {
    console.error(`❌ Failed to remove ${post.path}:`, error.message);
    return false;
  }
}

function main() {
  console.log('🔍 Scanning for example/test/draft blog posts...\n');
  
  const examplePosts = findExamplePosts();
  
  if (examplePosts.length === 0) {
    console.log('✅ No example posts found. All clear!');
    return;
  }
  
  console.log(`⚠️  Found ${examplePosts.length} example/test/draft post(s):\n`);
  examplePosts.forEach(post => {
    console.log(`  - ${post.slug} (${post.path})`);
  });
  
  if (DRY_RUN) {
    console.log('\n[DRY RUN] No files were actually removed.');
    console.log('Run without --dry-run to remove these posts.');
    return;
  }
  
  console.log('\n🗑️  Removing example posts...\n');
  
  let removed = 0;
  examplePosts.forEach(post => {
    if (removePost(post)) {
      removed++;
    }
  });
  
  console.log(`\n📊 Results: Removed ${removed}/${examplePosts.length} example post(s)`);
  
  if (removed === examplePosts.length) {
    console.log('🎉 All example posts have been removed!');
  }
}

if (require.main === module) {
  main();
}

module.exports = { findExamplePosts, isForbiddenPost };

















