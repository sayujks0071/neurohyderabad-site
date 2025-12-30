'use client';

import { useEffect } from 'react';

interface SEOOptimizerProps {
  title?: string;
  description?: string;
  keywords?: string[];
  canonicalUrl?: string;
  ogImage?: string;
  structuredData?: any;
}

export default function SEOOptimizer({
  title,
  description,
  keywords = [],
  canonicalUrl,
  ogImage,
  structuredData,
}: SEOOptimizerProps) {
  useEffect(() => {
    // Optimize page title
    if (title && document.title !== title) {
      document.title = title;
    }

    // Optimize meta description
    if (description) {
      let metaDescription = document.querySelector('meta[name="description"]');
      if (!metaDescription) {
        metaDescription = document.createElement('meta');
        metaDescription.setAttribute('name', 'description');
        document.head.appendChild(metaDescription);
      }
      metaDescription.setAttribute('content', description);
    }

    // Optimize keywords
    if (keywords.length > 0) {
      let metaKeywords = document.querySelector('meta[name="keywords"]');
      if (!metaKeywords) {
        metaKeywords = document.createElement('meta');
        metaKeywords.setAttribute('name', 'keywords');
        document.head.appendChild(metaKeywords);
      }
      metaKeywords.setAttribute('content', keywords.join(', '));
    }

    // Optimize canonical URL
    if (canonicalUrl) {
      let canonical = document.querySelector('link[rel="canonical"]');
      if (!canonical) {
        canonical = document.createElement('link');
        canonical.setAttribute('rel', 'canonical');
        document.head.appendChild(canonical);
      }
      canonical.setAttribute('href', canonicalUrl);
    }

    // Optimize Open Graph image
    if (ogImage) {
      let ogImageMeta = document.querySelector('meta[property="og:image"]');
      if (!ogImageMeta) {
        ogImageMeta = document.createElement('meta');
        ogImageMeta.setAttribute('property', 'og:image');
        document.head.appendChild(ogImageMeta);
      }
      ogImageMeta.setAttribute('content', ogImage);
    }

    // Add structured data
    if (structuredData) {
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.textContent = JSON.stringify(structuredData);
      document.head.appendChild(script);
    }

    // Optimize heading structure
    const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
    headings.forEach((heading, index) => {
      const level = parseInt(heading.tagName.charAt(1));
      const previousLevel = index > 0 ? 
        parseInt(headings[index - 1].tagName.charAt(1)) : 0;
      
      // Ensure proper heading hierarchy
      if (level > previousLevel + 1) {
        console.warn(`Heading hierarchy issue: ${heading.tagName} follows ${headings[index - 1]?.tagName}`);
      }
    });

    // Optimize internal links
    const internalLinks = document.querySelectorAll('a[href^="/"]');
    internalLinks.forEach(link => {
      const href = link.getAttribute('href');
      if (href && !href.startsWith('http')) {
        // Ensure internal links are absolute
        if (!href.startsWith('/')) {
          link.setAttribute('href', `/${href}`);
        }
      }
    });

    // Optimize images
    const images = document.querySelectorAll('img');
    images.forEach(img => {
      if (!img.getAttribute('alt')) {
        console.warn('Image missing alt text:', img.src);
      }
      if (!img.getAttribute('loading')) {
        img.setAttribute('loading', 'lazy');
      }
    });

  }, [title, description, keywords, canonicalUrl, ogImage, structuredData]);

  return null;
}
