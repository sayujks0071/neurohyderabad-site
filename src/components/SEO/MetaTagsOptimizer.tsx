/**
 * Enhanced Meta Tags Component for Maximum SEO Impact
 * Implements all meta tags for Google, Bing, and social platforms
 */

import Head from 'next/head';

interface MetaTagsOptimizerProps {
  // Basic meta
  title: string;
  description: string;
  keywords?: string[];
  canonical?: string;
  
  // Open Graph
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  ogType?: string;
  ogUrl?: string;
  
  // Twitter Card
  twitterCard?: 'summary' | 'summary_large_image' | 'app' | 'player';
  twitterSite?: string;
  twitterCreator?: string;
  twitterTitle?: string;
  twitterDescription?: string;
  twitterImage?: string;
  
  // Article meta
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
  section?: string;
  tags?: string[];
  
  // Additional SEO
  robots?: string;
  googlebot?: string;
  alternates?: Array<{lang: string; url: string}>;
  prev?: string;
  next?: string;
}

export default function MetaTagsOptimizer({
  title,
  description,
  keywords = [],
  canonical,
  ogTitle,
  ogDescription,
  ogImage = 'https://www.drsayuj.info/images/og-default.jpg',
  ogType = 'website',
  ogUrl,
  twitterCard = 'summary_large_image',
  twitterSite = '@drsayuj',
  twitterCreator = '@drsayuj',
  twitterTitle,
  twitterDescription,
  twitterImage,
  publishedTime,
  modifiedTime,
  author = 'Dr. Sayuj Krishnan',
  section,
  tags = [],
  robots = 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
  googlebot,
  alternates = [],
  prev,
  next
}: MetaTagsOptimizerProps) {
  const siteUrl = 'https://www.drsayuj.info';
  
  return (
    <Head>
      {/* Basic Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      {keywords.length > 0 && (
        <meta name="keywords" content={keywords.join(', ')} />
      )}
      <meta name="author" content={author} />
      
      {/* Canonical URL */}
      {canonical && <link rel="canonical" href={canonical.startsWith('http') ? canonical : `${siteUrl}${canonical}`} />}
      
      {/* Robots Meta Tags */}
      <meta name="robots" content={robots} />
      {googlebot && <meta name="googlebot" content={googlebot} />}
      <meta name="bingbot" content={robots} />
      
      {/* Google Specific */}
      <meta name="google" content="nositelinkssearchbox" />
      <meta name="google-site-verification" content={process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION} />
      
      {/* Bing Specific */}
      <meta name="msvalidate.01" content={process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION} />
      
      {/* Open Graph Meta Tags */}
      <meta property="og:title" content={ogTitle || title} />
      <meta property="og:description" content={ogDescription || description} />
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={ogUrl || canonical || `${siteUrl}/`} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={ogTitle || title} />
      <meta property="og:site_name" content="Dr. Sayuj Krishnan - Neurosurgeon" />
      <meta property="og:locale" content="en_IN" />
      
      {/* Twitter Card Meta Tags */}
      <meta name="twitter:card" content={twitterCard} />
      <meta name="twitter:site" content={twitterSite} />
      <meta name="twitter:creator" content={twitterCreator} />
      <meta name="twitter:title" content={twitterTitle || ogTitle || title} />
      <meta name="twitter:description" content={twitterDescription || ogDescription || description} />
      <meta name="twitter:image" content={twitterImage || ogImage} />
      <meta name="twitter:image:alt" content={twitterTitle || title} />
      
      {/* Article Meta Tags (for blog posts) */}
      {publishedTime && (
        <>
          <meta property="article:published_time" content={publishedTime} />
          <meta property="article:author" content={author} />
          {modifiedTime && <meta property="article:modified_time" content={modifiedTime} />}
          {section && <meta property="article:section" content={section} />}
          {tags.map((tag, index) => (
            <meta key={index} property="article:tag" content={tag} />
          ))}
        </>
      )}
      
      {/* Language Alternates */}
      {alternates.map((alt, index) => (
        <link key={index} rel="alternate" hrefLang={alt.lang} href={alt.url} />
      ))}
      <link rel="alternate" hrefLang="x-default" href={siteUrl} />
      
      {/* Pagination */}
      {prev && <link rel="prev" href={prev} />}
      {next && <link rel="next" href={next} />}
      
      {/* Additional Meta Tags */}
      <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      <meta name="format-detection" content="telephone=no" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      <meta name="apple-mobile-web-app-title" content="Dr. Sayuj" />
      
      {/* Geo Tags for Local SEO */}
      <meta name="geo.region" content="IN-TG" />
      <meta name="geo.placename" content="Hyderabad" />
      <meta name="geo.position" content="17.3667;78.5000" />
      <meta name="ICBM" content="17.3667, 78.5000" />
      
      {/* Medical/Health Specific */}
      <meta name="medical-specialty" content="Neurosurgery, Spine Surgery, Brain Surgery" />
      <meta name="hospital" content="Yashoda Hospital Malakpet" />
      <meta name="doctor" content="Dr. Sayuj Krishnan S" />
      
      {/* Performance Hints */}
      <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
      <link rel="preconnect" href="https://www.google-analytics.com" />
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
    </Head>
  );
}
