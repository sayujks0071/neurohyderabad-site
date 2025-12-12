#!/usr/bin/env node

/**
 * Script to validate blog posts before they are created/published
 * Prevents example/test/draft posts from being created
 */

const fs = require('fs');
const path = require('path');

const FORBIDDEN_KEYWORDS = ['example', 'test', 'draft', 'sample', 'template', 'placeholder'];
const BLOG_DIR = 'app/blog';

function isForbiddenSlug(slug) {
  if (!slug) return true;
  const lowerSlug = slug.toLowerCase();
  return FORBIDDEN_KEYWORDS.some(keyword => lowerSlug.includes(keyword));
}

function isForbiddenTitle(title) {
  if (!title) return false;
  const lowerTitle = title.toLowerCase();
  return FORBIDDEN_KEYWORDS.some(keyword => lowerTitle.includes(keyword));
}

function validateBlogPost(slug, title) {
  const errors = [];
  const warnings = [];

  // Validate slug
  if (!slug || slug.trim() === '') {
    errors.push('Blog post slug is required');
  } else if (isForbiddenSlug(slug)) {
    errors.push(`Blog post slug "${slug}" contains forbidden keywords (${FORBIDDEN_KEYWORDS.join(', ')})`);
  }

  // Validate title
  if (!title || title.trim() === '') {
    errors.push('Blog post title is required');
  } else if (isForbiddenTitle(title)) {
    errors.push(`Blog post title "${title}" contains forbidden keywords (${FORBIDDEN_KEYWORDS.join(', ')})`);
  }

  // Check if post already exists
  const postPath = path.join(BLOG_DIR, slug);
  if (fs.existsSync(postPath)) {
    warnings.push(`Blog post directory already exists: ${postPath}`);
  }

  return {
    valid: errors.length === 0,
    errors,
    warnings
  };
}

function main() {
  const slug = process.argv[2];
  const title = process.argv[3] || '';

  if (!slug) {
    console.error('Usage: node scripts/validate-blog-post.js <slug> [title]');
    console.error('Example: node scripts/validate-blog-post.js my-blog-post "My Blog Post Title"');
    process.exit(1);
  }

  console.log(`🔍 Validating blog post: ${slug}\n`);

  const validation = validateBlogPost(slug, title);

  if (validation.warnings.length > 0) {
    validation.warnings.forEach(warning => {
      console.log(`⚠️  ${warning}`);
    });
    console.log('');
  }

  if (validation.errors.length > 0) {
    console.error('❌ Validation failed:\n');
    validation.errors.forEach(error => {
      console.error(`   - ${error}`);
    });
    console.error('\n💡 Blog posts with example/test/draft keywords are not allowed.');
    process.exit(1);
  }

  console.log('✅ Blog post validation passed!');
  console.log(`   Slug: ${slug}`);
  if (title) {
    console.log(`   Title: ${title}`);
  }
}

if (require.main === module) {
  main();
}

module.exports = { validateBlogPost, isForbiddenSlug, isForbiddenTitle };






















