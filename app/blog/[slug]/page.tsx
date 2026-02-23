/**
 * Dynamic Blog Post Page
 * 
 * Uses the new blog content system with MDX files and BlogLayout component
 * Falls back to existing page.tsx files if MDX not found
 */

import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getBlogPostBySlug, getBlogPostContent, getAllBlogPosts } from '@/src/lib/blog';
import { generateBlogMetadata } from '@/src/lib/blog-seo';
import BlogLayout from '@/app/_components/BlogLayout';
import { SITE_URL } from '@/src/lib/seo';

// Ensure this route is fully statically generated.
// Allow dynamic generation for new paths (ISR) that were not present at build time.
export const dynamic = 'force-static';
export const dynamicParams = true;

interface PageParams {
  params: Promise<{
    slug: string;
  }>;
}

/**
 * Generate static params for all blog posts
 */
export async function generateStaticParams() {
  try {
    const posts = await getAllBlogPosts();
    return posts.map((post) => ({
      slug: post.slug,
    }));
  } catch (error) {
    console.error('Error generating static params:', error);
    return [];
  }
}

/**
 * Generate metadata for the blog post
 */
export async function generateMetadata({ params }: PageParams): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);

  if (!post) {
    return {
      title: 'Blog Post Not Found',
      description: 'The requested blog post could not be found.',
    };
  }

  return generateBlogMetadata(post);
}

/**
 * Blog post page component
 */
export default async function BlogPostPage({ params }: PageParams) {
  const { slug } = await params;
  
  // Try to load from new content system
  const post = await getBlogPostBySlug(slug);
  const content = await getBlogPostContent(slug);

  if (!post || !content) {
    // Note: Existing blog posts in app/blog/[slug]/page.tsx format will continue to work
    // as Next.js will route to those specific page files first.
    // This dynamic route only handles posts from the new content/blog/ system.
    notFound();
  }

  return <BlogLayout post={post} content={content} />;
}

// Revalidate every 24 hours
export const revalidate = 86400;
