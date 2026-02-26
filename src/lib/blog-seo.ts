/**
 * Blog SEO Utilities
 * 
 * Generates SEO metadata for blog posts
 */

import type { Metadata } from 'next';
import type { BlogPost } from '@/src/types/blog';
import { SITE_URL } from '@/src/lib/seo';
import { clamp } from '@/app/_lib/meta';

/**
 * Generate Next.js Metadata for a blog post
 */
export function generateBlogMetadata(post: BlogPost): Metadata {
  const title = clamp(
    `${post.title} | Dr. Sayuj Krishnan - Neurosurgeon Hyderabad`,
    60
  );
  const description = clamp(post.description, 155);
  const canonicalUrl = `${SITE_URL}/blog/${post.slug}`;
  
  // Generate OG image URL
  const ogImageUrl = post.ogImage 
    ? post.ogImage.startsWith('http') 
      ? post.ogImage 
      : `${SITE_URL}${post.ogImage}`
    : `${SITE_URL}/api/og?title=${encodeURIComponent(post.title)}&subtitle=${encodeURIComponent(post.subtitle || post.excerpt.substring(0, 100))}`;

  return {
    title: {
      absolute: title,
    },
    description,
    keywords: [
      post.primaryKeyword,
      ...(post.secondaryKeywords || []),
      ...(post.tags || []),
      'neurosurgery',
      'hyderabad',
      'dr sayuj krishnan',
    ].filter(Boolean).join(', '),
    alternates: {
      canonical: canonicalUrl,
      languages: {
        'en-IN': canonicalUrl,
        'x-default': canonicalUrl,
      },
    },
    openGraph: {
      title: post.title,
      description: post.description,
      url: canonicalUrl,
      siteName: 'Dr. Sayuj Krishnan - Neurosurgeon Hyderabad',
      locale: 'en_IN',
      type: 'article',
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt || post.publishedAt,
      authors: ['Dr. Sayuj Krishnan'],
      tags: post.tags,
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
      images: [ogImageUrl],
    },
  };
}

