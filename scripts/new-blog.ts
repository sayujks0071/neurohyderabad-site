#!/usr/bin/env ts-node

/**
 * New Blog Post Generator
 * 
 * Creates a new blog post with proper frontmatter and skeleton content
 * 
 * Usage:
 *   ts-node scripts/new-blog.ts --title "My Blog Post" --category spine --primaryKeyword "spine surgery"
 *   ts-node scripts/new-blog.ts --title "My Blog Post" --ai (uses OpenAI to generate content)
 */

// Register tsconfig paths to resolve @ aliases
import 'tsconfig-paths/register';

import fs from 'fs/promises';
import path from 'path';
import { generateText } from 'ai';
import { getTextModel } from '@/src/lib/ai/gateway';

interface BlogOptions {
  title: string;
  slug?: string;
  category?: string;
  primaryKeyword?: string;
  secondaryKeywords?: string[];
  targetLocations?: string[];
  faq?: string; // Path to FAQ JSON file
  ai?: boolean; // Use AI to generate content
  scheduledAt?: string; // ISO date string for scheduled publishing
}

// Parse command line arguments
function parseArgs(): BlogOptions {
  const args = process.argv.slice(2);
  const options: BlogOptions = {
    title: '',
  };

  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    const nextArg = args[i + 1];

    switch (arg) {
      case '--title':
        if (nextArg) {
          options.title = nextArg;
          i++;
        }
        break;
      case '--slug':
        if (nextArg) {
          options.slug = nextArg;
          i++;
        }
        break;
      case '--category':
        if (nextArg) {
          options.category = nextArg;
          i++;
        }
        break;
      case '--primaryKeyword':
        if (nextArg) {
          options.primaryKeyword = nextArg;
          i++;
        }
        break;
      case '--secondaryKeywords':
        if (nextArg) {
          options.secondaryKeywords = nextArg.split(',').map(k => k.trim());
          i++;
        }
        break;
      case '--targetLocations':
        if (nextArg) {
          options.targetLocations = nextArg.split(',').map(l => l.trim());
          i++;
        }
        break;
      case '--faq':
        if (nextArg) {
          options.faq = nextArg;
          i++;
        }
        break;
      case '--ai':
        options.ai = true;
        break;
      case '--scheduledAt':
        if (nextArg) {
          options.scheduledAt = nextArg;
          i++;
        }
        break;
    }
  }

  return options;
}

// Generate slug from title
function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

// Load FAQ from JSON file if provided
async function loadFAQ(faqPath?: string): Promise<Array<{ question: string; answer: string }> | undefined> {
  if (!faqPath) return undefined;
  
  try {
    const content = await fs.readFile(faqPath, 'utf8');
    const faq = JSON.parse(content);
    
    if (Array.isArray(faq)) {
      return faq;
    } else if (faq.faq && Array.isArray(faq.faq)) {
      return faq.faq;
    }
    
    console.warn('FAQ file format not recognized, skipping');
    return undefined;
  } catch (error) {
    console.warn(`Could not load FAQ file ${faqPath}:`, error);
    return undefined;
  }
}

// Generate AI content using Vercel AI Gateway / OpenAI
async function generateAIContent(options: BlogOptions): Promise<string> {
  const apiKey = process.env.OPENAI_API_KEY || process.env.AI_GATEWAY_API_KEY;
  
  // Note: On Vercel, we might use OIDC, but for this script running locally we need a key
  if (!apiKey && !process.env.VERCEL) {
    console.warn('OPENAI_API_KEY or AI_GATEWAY_API_KEY not set, skipping AI generation');
    return '';
  }

  // Import AI prompts and validation
  const { AI_BLOG_SYSTEM_PROMPT, buildAiBlogUserPrompt } = require('./ai-blog-prompts');
  const { validateGeneratedArticle } = require('../src/lib/blog-validation');
  
  // Build topic object for prompt
  const topic = {
    id: options.slug || generateSlug(options.title),
    title: options.title,
    category: options.category || 'general',
    primaryKeyword: options.primaryKeyword || options.title.toLowerCase(),
    targetLocations: options.targetLocations || ['Hyderabad'],
    focus: `Educational article about ${options.title} for patients in ${options.targetLocations?.join(', ') || 'Hyderabad'}`,
    riskLevel: 'low' as const,
  };
  
  const todayISO = new Date().toISOString();
  const userPrompt = buildAiBlogUserPrompt(topic, todayISO);

  try {
    const { text } = await generateText({
      model: getTextModel('gpt-4o-mini'),
      messages: [
        {
          role: 'system',
          content: AI_BLOG_SYSTEM_PROMPT,
        },
        {
          role: 'user',
          content: userPrompt,
        },
      ],
      temperature: 0.3,
      maxTokens: 4000,
    });

    const content = text || '';
          
    // Validate content using strict validation
    const validation = validateGeneratedArticle(content, topic, 1000);

    if (!validation.ok) {
      console.error('❌ AI article validation FAILED:');
      validation.errors.forEach((err: string) => {
        console.error(`   • ${err}`);
      });
      if (validation.warnings.length > 0) {
        console.warn('Warnings:');
        validation.warnings.forEach((w: string) => {
          console.warn(`   • ${w}`);
        });
      }
      // Hard stop: do NOT create file if validation fails
      throw new Error(`AI article validation failed: ${validation.errors.join('; ')}`);
    }

    if (validation.warnings.length > 0) {
      console.warn('⚠️  AI article validation warnings:');
      validation.warnings.forEach((w: string) => {
        console.warn(`   • ${w}`);
      });
      console.warn('   Content will be saved but may need review.');
    } else {
      console.log('✅ Content validation passed');
    }

    return content;
  } catch (error) {
    console.error('Error generating AI content:', error);
    throw error;
  }
}

// Generate skeleton content
function generateSkeletonContent(options: BlogOptions, faq?: Array<{ question: string; answer: string }>): string {
  const sections = [
    '## Introduction',
    '',
    `[Write an engaging introduction about ${options.title}. Explain why this topic matters to patients and families in Hyderabad.]`,
    '',
    '## Symptoms',
    '',
    '[Describe common symptoms, warning signs, and when patients should be concerned.]',
    '',
    '## Causes',
    '',
    '[Explain the underlying causes, risk factors, and contributing factors.]',
    '',
    '## When to Seek Emergency Care',
    '',
    '[List red-flag symptoms that require immediate medical attention. Emphasize calling 108 or going to emergency department.]',
    '',
    '## Treatment Options',
    '',
    '[Describe available treatment options, including conservative and surgical approaches. Link to related services/conditions using [[link:services/endoscopic-discectomy-hyderabad]] format.]',
    '',
    '## Recovery & Follow-up',
    '',
    '[Explain recovery timeline, what to expect, and follow-up care requirements.]',
  ];

  if (faq && faq.length > 0) {
    sections.push('');
    sections.push('## Frequently Asked Questions');
    sections.push('');
    faq.forEach((item) => {
      sections.push(`### ${item.question}`);
      sections.push('');
      sections.push(item.answer);
      sections.push('');
    });
  } else {
    sections.push('');
    sections.push('## Frequently Asked Questions');
    sections.push('');
    sections.push('[Add common questions and evidence-based answers here.]');
  }

  sections.push('');
  sections.push('## Next Steps');
  sections.push('');
  sections.push('[Include a call-to-action encouraging readers to book a consultation or learn more about related services.]');

  return sections.join('\n');
}

// Generate frontmatter
function generateFrontmatter(options: BlogOptions, faq?: Array<{ question: string; answer: string }>): string {
  const slug = options.slug || generateSlug(options.title);
  const today = new Date().toISOString().split('T')[0];
  
  // Use scheduledAt if provided, otherwise use today
  const publishDate = options.scheduledAt || today;
  
  const frontmatter: any = {
    slug,
    title: options.title,
    excerpt: `[Write a 150-160 character excerpt summarizing this blog post for search results and social sharing.]`,
    description: `[Write a 155 character meta description for SEO. Include primary keyword: ${options.primaryKeyword || options.title}]`,
    category: options.category || 'general',
    tags: [],
    primaryKeyword: options.primaryKeyword || options.title.toLowerCase(),
    publishedAt: publishDate,
    lastReviewedAt: today,
    lastReviewedBy: 'Dr. Sayuj Krishnan',
    schemaType: 'BlogPosting',
    ctaType: 'book-consult',
  };
  
  // Add scheduledAt if it's in the future
  if (options.scheduledAt && options.scheduledAt > today) {
    frontmatter.scheduledAt = options.scheduledAt;
    // Keep publishedAt as scheduled date for proper sorting
    frontmatter.publishedAt = options.scheduledAt;
  }

  if (options.secondaryKeywords && options.secondaryKeywords.length > 0) {
    frontmatter.secondaryKeywords = options.secondaryKeywords;
  }

  if (options.targetLocations && options.targetLocations.length > 0) {
    frontmatter.targetLocations = options.targetLocations;
  }

  if (faq && faq.length > 0) {
    frontmatter.faq = faq;
  }

  // Format as YAML
  const yamlLines: string[] = [];
  for (const [key, value] of Object.entries(frontmatter)) {
    if (Array.isArray(value)) {
      yamlLines.push(`${key}:`);
      value.forEach((item) => {
        if (typeof item === 'object') {
          yamlLines.push(`  - question: "${item.question}"`);
          yamlLines.push(`    answer: "${item.answer}"`);
        } else {
          yamlLines.push(`  - ${item}`);
        }
      });
    } else if (typeof value === 'string') {
      yamlLines.push(`${key}: "${value}"`);
    } else {
      yamlLines.push(`${key}: ${value}`);
    }
  }

  return yamlLines.join('\n');
}

// Main function
async function main() {
  const options = parseArgs();

  if (!options.title) {
    console.error('Error: --title is required');
    console.error('Usage: ts-node scripts/new-blog.ts --title "My Blog Post" [options]');
    console.error('');
    console.error('Options:');
    console.error('  --title <string>           (required) Blog post title');
    console.error('  --slug <string>            Custom slug (auto-generated from title if not provided)');
    console.error('  --category <string>        Category: spine, brain, epilepsy, general, etc.');
    console.error('  --primaryKeyword <string> Primary SEO keyword');
    console.error('  --secondaryKeywords <csv> Comma-separated secondary keywords');
    console.error('  --targetLocations <csv>    Comma-separated target locations (e.g., "Hyderabad,Malakpet")');
    console.error('  --faq <path>              Path to JSON file with FAQ array');
    console.error('  --ai                      Use OpenAI to generate initial content draft');
    console.error('  --scheduledAt <date>      Schedule for future date (YYYY-MM-DD)');
    process.exit(1);
  }

  const slug = options.slug || generateSlug(options.title);
  const blogDir = path.join(process.cwd(), 'content', 'blog');
  const filePath = path.join(blogDir, `${slug}.mdx`);

  // Check if file already exists
  try {
    await fs.access(filePath);
    console.error(`Error: Blog post with slug "${slug}" already exists at ${filePath}`);
    process.exit(1);
  } catch {
    // File doesn't exist, continue
  }

  // Load FAQ if provided
  const faq = await loadFAQ(options.faq);

  // Generate content
  let content: string;
  if (options.ai) {
    console.log('🤖 Generating content with AI...');
    try {
      content = await generateAIContent(options);
      console.log('✅ AI content generated');
    } catch (error) {
      console.warn('⚠️  AI generation failed, using skeleton:', error);
      content = generateSkeletonContent(options, faq);
    }
  } else {
    content = generateSkeletonContent(options, faq);
  }

  // Generate frontmatter
  const frontmatter = generateFrontmatter(options, faq);

  // Combine into MDX file
  const mdxContent = `---\n${frontmatter}\n---\n\n${content}\n`;

  // Write file
  await fs.mkdir(blogDir, { recursive: true });
  await fs.writeFile(filePath, mdxContent, 'utf8');

  const today = new Date().toISOString().split('T')[0];
  
  console.log('');
  console.log('✅ Blog post created successfully!');
  console.log('');
  console.log(`📄 File: ${filePath}`);
  console.log(`🔗 URL: /blog/${slug}/`);
  
  if (options.scheduledAt && options.scheduledAt > today) {
    console.log(`📅 Scheduled for: ${options.scheduledAt}`);
    console.log('   (Will auto-publish on scheduled date via GitHub Actions)');
  } else {
    console.log('📝 Ready to publish immediately');
    console.log('   (Commit and push to auto-publish, or use GitHub Actions)');
  }
  
  console.log('');
  console.log('Next steps:');
  console.log('1. Edit the frontmatter in the file to add proper excerpt, description, tags, etc.');
  console.log('2. Review and refine the content');
  console.log('3. Add internal links using [[link:path]] format');
  console.log('4. Add sources to app/blog/sources.ts');
  console.log('5. Test locally: npm run dev');
  console.log('6. Commit and push to auto-publish (or use GitHub Actions: Blog Auto-Publish)');
  console.log('');
}

main().catch((error) => {
  console.error('Error:', error);
  process.exit(1);
});
