#!/usr/bin/env ts-node

/**
 * Blog Metadata Normalization Script
 * 
 * Updates existing blog posts to match the canonical BlogPost schema
 * - Adds missing required fields
 * - Ensures consistent structure
 * - Does NOT rewrite content, only updates frontmatter
 * 
 * Usage:
 *   ts-node scripts/normalize-blog-metadata.ts
 *   ts-node scripts/normalize-blog-metadata.ts --dry-run (preview changes)
 */

import fs from 'fs/promises';
import path from 'path';
import matter from 'gray-matter';
import type { BlogPost } from '@/src/types/blog';
import { BLOG_DEFAULTS, validateBlogPost } from '@/src/types/blog';

const BLOG_DIR = path.join(process.cwd(), 'content', 'blog');
const DRY_RUN = process.argv.includes('--dry-run');

interface NormalizationStats {
  processed: number;
  updated: number;
  errors: number;
  skipped: number;
}

/**
 * Normalize a blog post's frontmatter
 */
function normalizeBlogPost(post: Partial<BlogPost>, slug: string): Partial<BlogPost> {
  const normalized: Partial<BlogPost> = {
    ...BLOG_DEFAULTS,
    ...post,
    slug: post.slug || slug,
  };

  // Ensure required fields have defaults
  if (!normalized.publishedAt) {
    normalized.publishedAt = new Date().toISOString().split('T')[0];
  }

  if (!normalized.lastReviewedAt) {
    normalized.lastReviewedAt = normalized.updatedAt || normalized.publishedAt;
  }

  if (!normalized.lastReviewedBy) {
    normalized.lastReviewedBy = 'Dr. Sayuj Krishnan';
  }

  if (!normalized.category) {
    normalized.category = 'general';
  }

  if (!normalized.tags) {
    normalized.tags = [];
  }

  if (!normalized.primaryKeyword) {
    // Generate from title if missing
    normalized.primaryKeyword = (normalized.title || slug)
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, ' ');
  }

  if (!normalized.schemaType) {
    normalized.schemaType = 'BlogPosting';
  }

  if (!normalized.ctaType) {
    normalized.ctaType = 'book-consult';
  }

  // Ensure excerpt and description exist (even if placeholder)
  if (!normalized.excerpt) {
    normalized.excerpt = normalized.description || `[Add a 150-160 character excerpt for ${normalized.title}]`;
  }

  if (!normalized.description) {
    normalized.description = normalized.excerpt || `[Add a 155 character meta description for ${normalized.title}]`;
  }

  return normalized;
}

/**
 * Convert frontmatter object to YAML string
 */
function frontmatterToYAML(data: Partial<BlogPost>): string {
  const lines: string[] = [];
  
  // Required fields first
  const requiredFields = ['slug', 'title', 'excerpt', 'description', 'category', 'primaryKeyword', 'publishedAt'];
  for (const field of requiredFields) {
    if (data[field as keyof BlogPost] !== undefined) {
      const value = data[field as keyof BlogPost];
      if (typeof value === 'string') {
        lines.push(`${field}: "${value.replace(/"/g, '\\"')}"`);
      } else {
        lines.push(`${field}: ${value}`);
      }
    }
  }

  // Optional fields
  const optionalFields: Array<keyof BlogPost> = [
    'subtitle',
    'tags',
    'secondaryKeywords',
    'heroImage',
    'ogImage',
    'updatedAt',
    'lastReviewedAt',
    'lastReviewedBy',
    'readingTimeMinutes',
    'featured',
    'targetLocations',
    'schemaType',
    'faq',
    'relatedConditions',
    'relatedTreatments',
    'ctaType',
    'ctaOverrideText',
    'sources',
  ];

  for (const field of optionalFields) {
    const value = data[field];
    if (value !== undefined && value !== null) {
      if (Array.isArray(value)) {
        if (value.length > 0) {
          lines.push(`${field}:`);
          value.forEach((item) => {
            if (typeof item === 'object' && 'question' in item) {
              // FAQ item
              lines.push(`  - question: "${item.question.replace(/"/g, '\\"')}"`);
              lines.push(`    answer: "${item.answer.replace(/"/g, '\\"')}"`);
            } else if (typeof item === 'object' && 'label' in item) {
              // Source item
              lines.push(`  - label: "${item.label.replace(/"/g, '\\"')}"`);
              lines.push(`    href: "${item.href.replace(/"/g, '\\"')}"`);
            } else {
              lines.push(`  - ${item}`);
            }
          });
        }
      } else if (typeof value === 'string') {
        lines.push(`${field}: "${value.replace(/"/g, '\\"')}"`);
      } else if (typeof value === 'boolean') {
        lines.push(`${field}: ${value}`);
      } else {
        lines.push(`${field}: ${value}`);
      }
    }
  }

  return lines.join('\n');
}

/**
 * Process a single blog file
 */
async function processBlogFile(filePath: string, stats: NormalizationStats): Promise<void> {
  try {
    const fileName = path.basename(filePath);
    const slug = fileName.replace(/\.(mdx|md)$/, '');
    
    const fileContents = await fs.readFile(filePath, 'utf8');
    const { data, content } = matter(fileContents);
    
    // Normalize the frontmatter
    const normalized = normalizeBlogPost(data, slug);
    
    // Check if anything changed
    const originalYAML = matter.stringify('', data).split('---')[1]?.trim() || '';
    const newYAML = frontmatterToYAML(normalized);
    
    if (originalYAML === newYAML) {
      console.log(`✓ ${fileName} - No changes needed`);
      stats.skipped++;
      return;
    }
    
    // Validate
    const errors = validateBlogPost(normalized as BlogPost);
    if (errors.length > 0) {
      console.warn(`⚠ ${fileName} - Validation warnings:`, errors);
    }
    
    // Write updated file
    const updatedContent = `---\n${newYAML}\n---\n${content}`;
    
    if (!DRY_RUN) {
      await fs.writeFile(filePath, updatedContent, 'utf8');
      console.log(`✓ ${fileName} - Updated`);
    } else {
      console.log(`[DRY RUN] Would update ${fileName}`);
    }
    
    stats.updated++;
  } catch (error) {
    console.error(`✗ ${path.basename(filePath)} - Error:`, error);
    stats.errors++;
  }
  
  stats.processed++;
}

/**
 * Main function
 */
async function main() {
  console.log('📝 Blog Metadata Normalization');
  console.log(DRY_RUN ? '(DRY RUN MODE - No files will be modified)' : '');
  console.log('');

  const stats: NormalizationStats = {
    processed: 0,
    updated: 0,
    errors: 0,
    skipped: 0,
  };

  try {
    // Check if blog directory exists
    try {
      await fs.access(BLOG_DIR);
    } catch {
      console.error(`Error: Blog directory not found at ${BLOG_DIR}`);
      console.error('Create content/blog/ directory first or run new:blog to create a post');
      process.exit(1);
    }

    // Get all blog files
    const files = await fs.readdir(BLOG_DIR);
    const blogFiles = files.filter(file => 
      file.endsWith('.mdx') || file.endsWith('.md')
    );

    if (blogFiles.length === 0) {
      console.log('No blog files found in content/blog/');
      console.log('Create a blog post first: npm run new:blog -- --title "Your Title"');
      process.exit(0);
    }

    console.log(`Found ${blogFiles.length} blog file(s)\n`);

    // Process each file
    for (const file of blogFiles) {
      const filePath = path.join(BLOG_DIR, file);
      await processBlogFile(filePath, stats);
    }

    // Summary
    console.log('');
    console.log('📊 Summary:');
    console.log(`  Processed: ${stats.processed}`);
    console.log(`  Updated: ${stats.updated}`);
    console.log(`  Skipped: ${stats.skipped}`);
    console.log(`  Errors: ${stats.errors}`);

    if (DRY_RUN && stats.updated > 0) {
      console.log('');
      console.log('Run without --dry-run to apply changes');
    }

  } catch (error) {
    console.error('Fatal error:', error);
    process.exit(1);
  }
}

main().catch((error) => {
  console.error('Error:', error);
  process.exit(1);
});

