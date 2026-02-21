/**
 * Blog Content Loader
 * 
 * Loads and parses blog posts from content/blog/ directory
 * Supports MDX files with YAML frontmatter
 */

import fs from 'fs/promises';
import path from 'path';
import { unstable_cache } from 'next/cache';
import matter from 'gray-matter';
import type { BlogPost, BlogCategory } from '@/src/types/blog';
import { BLOG_DEFAULTS, validateBlogPost } from '@/src/types/blog';

const BLOG_DIR = path.join(process.cwd(), 'content', 'blog');

// Keywords that mark a post as example/test/draft content that should not be shown publicly
const FORBIDDEN_KEYWORDS = ['example', 'test', 'draft', 'sample', 'template', 'placeholder'];

/**
 * Check if a blog post slug contains forbidden keywords
 */
function isForbiddenPost(slug: string): boolean {
  const lowerSlug = slug.toLowerCase();
  return FORBIDDEN_KEYWORDS.some(keyword => lowerSlug.includes(keyword));
}

/**
 * Parse frontmatter and content from a blog file
 */
async function parseBlogFile(filePath: string): Promise<BlogPost | null> {
  try {
    const fileContents = await fs.readFile(filePath, 'utf8');
    const { data, content } = matter(fileContents);
    const derivedSlug = data.slug || path.basename(filePath, path.extname(filePath));

    // Hard block example/test/draft content even if it exists on disk
    if (isForbiddenPost(derivedSlug)) {
      console.warn(`Skipping forbidden blog post ${derivedSlug}`);
      return null;
    }
    
    // Merge frontmatter with defaults
    const post: BlogPost = {
      ...BLOG_DEFAULTS,
      ...data,
      // Ensure required fields
      slug: derivedSlug,
      publishedAt: data.publishedAt || new Date().toISOString(),
      tags: data.tags || [],
      sources: data.sources || [],
    } as BlogPost;
    
    // Calculate reading time if not provided (average 200 words per minute)
    if (!post.readingTimeMinutes && content) {
      const wordCount = content.split(/\s+/).length;
      post.readingTimeMinutes = Math.ceil(wordCount / 200);
    }
    
    // Validate the post
    const errors = validateBlogPost(post);
    if (errors.length > 0) {
      console.warn(`Blog post ${post.slug} has validation errors:`, errors);
    }
    
    return post;
  } catch (error) {
    console.error(`Error parsing blog file ${filePath}:`, error);
    return null;
  }
}

/**
 * Internal function to get all blog posts (uncached)
 */
async function _getAllBlogPosts(): Promise<BlogPost[]> {
  try {
    // Check if blog directory exists
    try {
      await fs.access(BLOG_DIR);
    } catch {
      // Directory doesn't exist yet, return empty array
      return [];
    }
    
    const files = await fs.readdir(BLOG_DIR);
    const mdxFiles = files.filter(file => 
      (file.endsWith('.mdx') || file.endsWith('.md')) && 
      file !== 'README.md' && // Exclude README
      !isForbiddenPost(path.basename(file, path.extname(file))) // Block example/test/draft slugs
    );
    
    if (mdxFiles.length === 0) {
      return [];
    }
    
    const posts = await Promise.all(
      mdxFiles.map(file =>
        parseBlogFile(path.join(BLOG_DIR, file))
      )
    );

    // Filter out nulls, forbidden posts, and sort by date
    const validPosts = posts.filter((post): post is BlogPost =>
      post !== null && !isForbiddenPost(post.slug)
    );
    
    return validPosts.sort((a, b) => {
      const dateA = new Date(a.publishedAt).getTime();
      const dateB = new Date(b.publishedAt).getTime();
      return dateB - dateA; // Newest first
    });
  } catch (error) {
    console.error('Error loading blog posts:', error);
    return [];
  }
}

/**
 * Get all blog posts, sorted by published date (newest first).
 * Cached for 1 hour using Next.js unstable_cache.
 */
export const getAllBlogPosts = unstable_cache(
  _getAllBlogPosts,
  ['all-blog-posts'],
  {
    revalidate: 3600,
    tags: ['blog-posts']
  }
);

/**
 * Get a single blog post by slug
 */
export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  try {
    // Check if blog directory exists
    try {
      await fs.access(BLOG_DIR);
    } catch {
      return null;
    }
    
    // Skip README and forbidden posts
    if (slug === 'README' || slug.toLowerCase() === 'readme') {
      return null;
    }

    // Block forbidden posts
    if (isForbiddenPost(slug)) {
      return null;
    }

    // Try .mdx first, then .md
    const extensions = ['.mdx', '.md'];
    
    for (const ext of extensions) {
      const filePath = path.join(BLOG_DIR, `${slug}${ext}`);
      try {
        await fs.access(filePath);
        return await parseBlogFile(filePath);
      } catch {
        continue;
      }
    }
    
    return null;
  } catch (error) {
    console.error(`Error loading blog post ${slug}:`, error);
    return null;
  }
}

/**
 * Get featured blog posts
 */
export async function getFeaturedBlogPosts(limit: number = 3): Promise<BlogPost[]> {
  const allPosts = await getAllBlogPosts();
  return allPosts
    .filter(post => post.featured)
    .slice(0, limit);
}

/**
 * Get recent blog posts
 */
export async function getRecentBlogPosts(limit: number = 5): Promise<BlogPost[]> {
  const allPosts = await getAllBlogPosts();
  return allPosts.slice(0, limit);
}

/**
 * Get blog posts by category
 */
export async function getBlogPostsByCategory(
  category: BlogCategory
): Promise<BlogPost[]> {
  const allPosts = await getAllBlogPosts();
  return allPosts.filter(post => post.category === category);
}

/**
 * Get blog post content (markdown body) by slug
 */
export async function getBlogPostContent(slug: string): Promise<string | null> {
  try {
    // Check if blog directory exists
    try {
      await fs.access(BLOG_DIR);
    } catch {
      return null;
    }
    
    // Skip README and forbidden posts
    if (slug === 'README' || slug.toLowerCase() === 'readme') {
      return null;
    }

    // Block forbidden posts
    if (isForbiddenPost(slug)) {
      return null;
    }

    const extensions = ['.mdx', '.md'];
    
    for (const ext of extensions) {
      const filePath = path.join(BLOG_DIR, `${slug}${ext}`);
      try {
        await fs.access(filePath);
        const fileContents = await fs.readFile(filePath, 'utf8');
        const { content } = matter(fileContents);
        return content;
      } catch {
        continue;
      }
    }
    
    return null;
  } catch (error) {
    console.error(`Error loading blog content ${slug}:`, error);
    return null;
  }
}

/**
 * Get all unique categories from blog posts
 */
export async function getAllBlogCategories(): Promise<BlogCategory[]> {
  const allPosts = await getAllBlogPosts();
  const categories = new Set<BlogCategory>();
  
  allPosts.forEach(post => {
    categories.add(post.category);
  });
  
  return Array.from(categories).sort();
}

/**
 * Get all unique tags from blog posts
 */
export async function getAllBlogTags(): Promise<string[]> {
  const allPosts = await getAllBlogPosts();
  const tags = new Set<string>();
  
  allPosts.forEach(post => {
    post.tags.forEach(tag => tags.add(tag));
  });
  
  return Array.from(tags).sort();
}
