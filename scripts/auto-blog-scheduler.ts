#!/usr/bin/env ts-node

/**
 * Auto Blog Scheduler
 * 
 * Generates and publishes blog posts automatically based on a schedule
 * Can be run manually or via cron
 * 
 * Usage:
 *   ts-node scripts/auto-blog-scheduler.ts
 *   ts-node scripts/auto-blog-scheduler.ts --generate-today (generate posts for today)
 */

import { execSync } from 'child_process';
import fs from 'fs/promises';
import path from 'path';

import { BlogTopic } from './ai-blog-prompts';
import { validateGeneratedArticle } from '../src/lib/blog-validation';

interface ScheduledBlogTopic extends BlogTopic {
  scheduledDate: string; // YYYY-MM-DD
  useAI?: boolean;
}

// Pre-defined blog topics for automatic generation
// You can expand this list with more topics
const BLOG_TOPICS: ScheduledBlogTopic[] = [
  // Add your scheduled blog topics here
  // Example:
  // {
  //   id: "sciatica-guide-2025",
  //   title: "Understanding Sciatica: Causes and Treatment Options",
  //   category: "spine",
  //   primaryKeyword: "sciatica treatment hyderabad",
  //   targetLocations: ["Hyderabad", "Malakpet"],
  //   focus: "Comprehensive guide to understanding sciatica, its causes, modern treatment options, and when to seek specialist care in Hyderabad.",
  //   riskLevel: "low",
  //   scheduledDate: "2025-02-01",
  //   useAI: true,
  // },
];

/**
 * Generate a blog post using the CLI tool (which uses the new AI prompts and validation)
 */
async function generateBlogPost(topic: ScheduledBlogTopic): Promise<boolean> {
  console.log(`📝 Generating blog post: ${topic.title}`);
  
  const cmdArgs = [
    '--title', topic.title,
    '--category', topic.category,
    '--primaryKeyword', topic.primaryKeyword,
  ];
  
  // Add target locations if provided
  if (topic.targetLocations && topic.targetLocations.length > 0) {
    cmdArgs.push('--targetLocations', topic.targetLocations.join(','));
  }
  
  // Use AI if specified (the CLI tool now uses the new prompts and strict validation)
  if (topic.useAI) {
    cmdArgs.push('--ai');
  }
  
  // Add scheduled date if provided
  if (topic.scheduledDate) {
    cmdArgs.push('--scheduledAt', topic.scheduledDate);
  }
  
  try {
    execSync(`npm run new:blog -- ${cmdArgs.map(arg => `"${arg}"`).join(' ')}`, {
      stdio: 'inherit',
      cwd: process.cwd(),
    });
    console.log(`✅ Generated: ${topic.title}`);
    return true;
  } catch (error: any) {
    // Check if error is due to validation failure
    const errorMessage = error?.message || String(error);
    if (errorMessage.includes('validation failed')) {
      console.error(`❌ Validation failed for: ${topic.title}`);
      console.error('   Post will NOT be published. Review topic/prompts if this persists.');
      return false; // Skip this post, but continue with others
    }
    console.error(`❌ Failed to generate: ${topic.title}`, error);
    // For other errors, you might want to throw or return false
    // Returning false allows workflow to continue with other posts
    return false;
  }
}

/**
 * Get today's date in YYYY-MM-DD format
 */
function getToday(): string {
  return new Date().toISOString().split('T')[0];
}

/**
 * Check and publish scheduled posts
 */
async function publishScheduledPosts(): Promise<void> {
  const today = getToday();
  const blogDir = path.join(process.cwd(), 'content', 'blog');
  
  try {
    const files = await fs.readdir(blogDir);
    const blogFiles = files.filter(f => f.endsWith('.mdx') || f.endsWith('.md'));
    
    for (const file of blogFiles) {
      const filePath = path.join(blogDir, file);
      const content = await fs.readFile(filePath, 'utf8');
      
      // Check for scheduledAt in frontmatter
      const scheduledMatch = content.match(/scheduledAt:\s*["']?([^"'\n]+)["']?/);
      if (scheduledMatch) {
        const scheduledDate = scheduledMatch[1].trim();
        
        if (scheduledDate <= today) {
          console.log(`📅 Publishing scheduled post: ${file} (scheduled for ${scheduledDate})`);
          
          // Update publishedAt to scheduled date
          let updatedContent = content.replace(
            /publishedAt:\s*["']?[^"'\n]+["']?/,
            `publishedAt: "${scheduledDate}"`
          );
          
          // Remove scheduledAt field
          updatedContent = updatedContent.replace(/scheduledAt:\s*["']?[^"'\n]+["']?\n?/g, '');
          
          await fs.writeFile(filePath, updatedContent, 'utf8');
          console.log(`✅ Published: ${file}`);
        }
      }
    }
  } catch (error) {
    console.error('Error publishing scheduled posts:', error);
    throw error;
  }
}

/**
 * Main function
 */
async function main() {
  const args = process.argv.slice(2);
  const generateToday = args.includes('--generate-today');
  
  if (generateToday) {
    // Generate posts scheduled for today
    const today = getToday();
    const topicsForToday = BLOG_TOPICS.filter((topic: ScheduledBlogTopic) => topic.scheduledDate === today);
    
    if (topicsForToday.length === 0) {
      console.log(`No blog posts scheduled for today (${today})`);
      return;
    }
    
    console.log(`📅 Generating ${topicsForToday.length} blog post(s) for today...`);
    
    let successCount = 0;
    let failureCount = 0;
    
    for (const topic of topicsForToday) {
      const success = await generateBlogPost(topic);
      if (success) {
        successCount++;
      } else {
        failureCount++;
      }
    }
    
    console.log(`\n📊 Generation Summary:`);
    console.log(`   ✅ Successful: ${successCount}`);
    console.log(`   ❌ Failed/Skipped: ${failureCount}`);
    
    // If all failed, we might want to fail the workflow
    // For now, we'll just log and continue (workflow stays green)
    if (failureCount > 0 && successCount === 0) {
      console.warn('⚠️  All blog posts failed validation. No posts published today.');
      // Uncomment to fail workflow:
      // throw new Error('All scheduled blog posts failed validation');
    }
  } else {
    // Just publish already-generated scheduled posts
    await publishScheduledPosts();
  }
  
  // Commit changes if in git repo
  try {
    execSync('git add content/blog/', { stdio: 'inherit' });
    execSync('git commit -m "📝 Auto-generated blog posts" || exit 0', { stdio: 'inherit' });
    execSync('git push origin main || exit 0', { stdio: 'inherit' });
  } catch (error) {
    console.warn('Git operations failed (may not be in a git repo):', error);
  }
}

main().catch((error) => {
  console.error('Error:', error);
  process.exit(1);
});

