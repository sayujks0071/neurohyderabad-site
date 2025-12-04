/**
 * BlogLayout Component
 * 
 * Reusable layout for all blog posts with standardized structure:
 * - SEO metadata
 * - Breadcrumbs
 * - Title and meta info
 * - Content rendering
 * - CTA section
 * - E-E-A-T components
 * - JSON-LD schema
 * - Medical disclaimer
 */

import React from 'react';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import Breadcrumbs from '@/app/components/Breadcrumbs';
import AuthorByline from '@/app/_components/AuthorByline';
import SourceList from '@/app/_components/SourceList';
import ReviewedBy from '@/app/_components/ReviewedBy';
import NAP from '@/app/_components/NAP';
import StandardCTA from '@/app/_components/StandardCTA';
import RelatedContent from '@/app/_components/RelatedContent';
import ArticleSummarizer from '@/app/_components/ArticleSummarizer';
import ContentRecommendations from '@/app/_components/ContentRecommendations';
import type { BlogPost, CTAType } from '@/src/types/blog';
import { SITE_URL } from '@/src/lib/seo';

interface BlogLayoutProps {
  post: BlogPost;
  content: string; // Markdown content
  className?: string;
}

/**
 * Get CTA component based on ctaType
 */
function getCTAComponent(ctaType?: CTAType, overrideText?: string) {
  switch (ctaType) {
    case 'ai-assistant':
      return (
        <Link
          href="/ai-chat"
          className="bg-blue-600 text-white px-6 py-3 rounded-full hover:bg-blue-700 transition-colors inline-block"
        >
          {overrideText || 'Chat with AI Assistant'}
        </Link>
      );
    case 'whatsapp':
      return (
        <Link
          href="https://wa.me/919778280044"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-green-500 text-white px-6 py-3 rounded-full hover:bg-green-600 transition-colors inline-block"
        >
          {overrideText || 'WhatsApp Us'}
        </Link>
      );
    case 'call':
      return (
        <Link
          href="tel:+919778280044"
          className="bg-green-600 text-white px-6 py-3 rounded-full hover:bg-green-700 transition-colors inline-block"
        >
          {overrideText || 'Call +91 97782 80044'}
        </Link>
      );
    case 'learn-more':
      return (
        <Link
          href="/services"
          className="border-2 border-blue-600 text-blue-600 px-6 py-3 rounded-full hover:bg-blue-600 hover:text-white transition-colors inline-block"
        >
          {overrideText || 'Learn More About Our Services'}
        </Link>
      );
    case 'book-consult':
    default:
      return (
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/appointments"
            className="bg-blue-600 text-white px-6 py-3 rounded-full hover:bg-blue-700 transition-colors text-center"
          >
            {overrideText || 'Book Consultation'}
          </Link>
          <Link
            href="/services/endoscopic-discectomy-hyderabad/"
            className="border-2 border-blue-600 text-blue-600 px-6 py-3 rounded-full hover:bg-blue-600 hover:text-white transition-colors text-center"
          >
            Learn About Our Services
          </Link>
        </div>
      );
  }
}

/**
 * Generate JSON-LD schema for blog post
 */
function generateBlogSchema(post: BlogPost) {
  const baseSchema = {
    '@context': 'https://schema.org',
    '@type': post.schemaType || 'BlogPosting',
    headline: post.title,
    description: post.description,
    author: {
      '@type': 'Person',
      name: 'Dr. Sayuj Krishnan',
      url: `${SITE_URL}/about/`,
    },
    datePublished: post.publishedAt,
    dateModified: post.updatedAt || post.publishedAt,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${SITE_URL}/blog/${post.slug}/`,
    },
  };

  // Add FAQPage schema if FAQs exist
  if (post.faq && post.faq.length > 0) {
    return {
      '@context': 'https://schema.org',
      '@graph': [
        baseSchema,
        {
          '@type': 'FAQPage',
          mainEntity: post.faq.map((faq) => ({
            '@type': 'Question',
            name: faq.question,
            acceptedAnswer: {
              '@type': 'Answer',
              text: faq.answer,
            },
          })),
        },
      ],
    };
  }

  return baseSchema;
}

export default function BlogLayout({ post, content, className = '' }: BlogLayoutProps) {
  const formattedPublishedDate = new Date(post.publishedAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const formattedUpdatedDate = post.updatedAt
    ? new Date(post.updatedAt).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : null;

  const formattedReviewedDate = post.lastReviewedAt
    ? new Date(post.lastReviewedAt).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : null;

  return (
    <>
      <Breadcrumbs
        items={[
          { name: 'Home', href: '/' },
          { name: 'Blog', href: '/blog/' },
          { name: post.title, href: `/blog/${post.slug}/` },
        ]}
      />
      
      <main className={`container mx-auto px-4 py-16 ${className}`}>
        <article className="max-w-4xl mx-auto">
          {/* Header */}
          <header className="mb-8">
            {post.category && (
              <div className="text-sm uppercase tracking-wide text-blue-600 mb-2">
                {post.category}
              </div>
            )}
            <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
            {post.subtitle && (
              <p className="text-xl text-gray-600 mb-4">{post.subtitle}</p>
            )}
            
            {/* Meta Information */}
            <div className="text-sm text-gray-600 mb-4 space-y-1">
              <div className="flex flex-wrap items-center gap-2">
                <span>Published: {formattedPublishedDate}</span>
                {formattedUpdatedDate && (
                  <>
                    <span>•</span>
                    <span>Updated: {formattedUpdatedDate}</span>
                  </>
                )}
                {post.readingTimeMinutes && (
                  <>
                    <span>•</span>
                    <span>{post.readingTimeMinutes} min read</span>
                  </>
                )}
              </div>
              {formattedReviewedDate && (
                <div>
                  <span>Last reviewed by {post.lastReviewedBy || 'Dr. Sayuj Krishnan'}: {formattedReviewedDate}</span>
                </div>
              )}
            </div>

            {/* Tags */}
            {post.tags && post.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </header>

          {/* Article Summarizer */}
          <div className="mb-6">
            <ArticleSummarizer content={content} maxLength={200} />
          </div>

          {/* Content */}
          <div className="prose max-w-none mb-8">
            <ReactMarkdown
              components={{
                h1: ({ children }) => (
                  <h1 className="text-4xl font-bold mb-4 mt-8 first:mt-0">{children}</h1>
                ),
                h2: ({ children }) => (
                  <h2 className="text-3xl font-semibold mb-4 mt-8 text-blue-800">{children}</h2>
                ),
                h3: ({ children }) => (
                  <h3 className="text-2xl font-medium mb-3 mt-6 text-blue-700">{children}</h3>
                ),
                h4: ({ children }) => (
                  <h4 className="text-xl font-medium mb-2 mt-4 text-gray-800">{children}</h4>
                ),
                p: ({ children }) => (
                  <p className="text-gray-700 mb-4 leading-relaxed">{children}</p>
                ),
                ul: ({ children }) => (
                  <ul className="list-disc list-inside mb-4 text-gray-700 space-y-2 ml-4">{children}</ul>
                ),
                ol: ({ children }) => (
                  <ol className="list-decimal list-inside mb-4 text-gray-700 space-y-2 ml-4">{children}</ol>
                ),
                li: ({ children }) => (
                  <li className="mb-1">{children}</li>
                ),
                strong: ({ children }) => (
                  <strong className="font-semibold text-gray-900">{children}</strong>
                ),
                em: ({ children }) => (
                  <em className="italic text-gray-800">{children}</em>
                ),
                blockquote: ({ children }) => (
                  <blockquote className="border-l-4 border-blue-500 pl-4 italic text-gray-600 my-4 bg-blue-50 py-2">
                    {children}
                  </blockquote>
                ),
                a: ({ href, children }) => {
                  const isExternal = href?.startsWith('http');
                  return (
                    <Link
                      href={href || '#'}
                      className="text-blue-600 hover:text-blue-800 underline"
                      target={isExternal ? '_blank' : undefined}
                      rel={isExternal ? 'noopener noreferrer' : undefined}
                    >
                      {children}
                    </Link>
                  );
                },
                code: ({ children }) => (
                  <code className="bg-gray-100 px-1 py-0.5 rounded text-sm font-mono text-gray-800">
                    {children}
                  </code>
                ),
                pre: ({ children }) => (
                  <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto mb-4">
                    {children}
                  </pre>
                ),
              }}
            >
              {content}
            </ReactMarkdown>
          </div>

          <RelatedContent
            relatedConditions={post.relatedConditions}
            relatedTreatments={post.relatedTreatments}
          />

          {/* AI-Powered Content Recommendations */}
          <div className="mb-8">
            <ContentRecommendations currentSlug={post.slug} limit={3} />
          </div>

          {/* CTA Section */}
          <section className="mb-8 bg-blue-50 p-6 rounded-lg text-center">
            <h3 className="text-lg font-semibold mb-4">
              {post.ctaOverrideText || 'Ready to Take the Next Step?'}
            </h3>
            <p className="mb-4 text-gray-700">
              {post.targetLocations && post.targetLocations.length > 0
                ? `Get expert neurosurgery care in ${post.targetLocations.join(', ')}.`
                : 'Get expert neurosurgery care with Dr. Sayuj Krishnan.'}
            </p>
            {getCTAComponent(post.ctaType, post.ctaOverrideText)}
          </section>

          {/* Medical Disclaimer */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Medical Disclaimer</h2>
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
              <p className="text-sm text-gray-700">
                <strong>Important:</strong> This information is for educational purposes only and should not replace professional medical advice, diagnosis, or treatment. Always seek the advice of your physician or other qualified health provider with any questions you may have regarding a medical condition. Never disregard professional medical advice or delay in seeking it because of something you have read on this website.
              </p>
              <p className="text-sm text-gray-700 mt-2">
                If you think you may have a medical emergency, call your doctor or emergency services (108) immediately.
              </p>
            </div>
          </section>

          {/* E-E-A-T Components */}
          <section className="mb-8 space-y-4">
            <AuthorByline
              publishedOn={post.publishedAt}
              updatedOn={post.updatedAt}
            />
            
            {post.sources && post.sources.length > 0 && (
              <SourceList sources={post.sources} />
            )}
            
            <ReviewedBy
              lastReviewed={post.lastReviewedAt || post.updatedAt || post.publishedAt}
              reviewerName={post.lastReviewedBy}
            />
            
            <NAP />
          </section>
        </article>
      </main>

      {/* JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateBlogSchema(post)),
        }}
      />
    </>
  );
}
