"use client";
import { useEffect, useState } from 'react';
import { analytics } from '../lib/analytics';

interface SEOMetrics {
  // Core Web Vitals
  lcp: number | null;
  fid: number | null;
  cls: number | null;
  fcp: number | null;
  ttfb: number | null;
  
  // Page Performance
  pageLoadTime: number | null;
  domContentLoaded: number | null;
  
  // SEO Elements
  titleLength: number;
  metaDescriptionLength: number;
  h1Count: number;
  h2Count: number;
  imageCount: number;
  imageAltCount: number;
  internalLinkCount: number;
  externalLinkCount: number;
  
  // Content Analysis
  wordCount: number;
  readabilityScore: number;
  
  // Technical SEO
  hasCanonical: boolean;
  hasRobotsMeta: boolean;
  hasOpenGraph: boolean;
  hasTwitterCard: boolean;
  hasStructuredData: boolean;
  
  // Mobile Optimization
  isMobileFriendly: boolean;
  viewportMeta: boolean;
  
  // Page URL and metadata
  url: string;
  pageType: string;
  timestamp: number;
}

interface SEODashboardProps {
  pageType: 'home' | 'service' | 'condition' | 'blog' | 'location' | 'other';
  pageSlug: string;
  serviceOrCondition?: string;
}

export default function SEODashboard({ pageType, pageSlug, serviceOrCondition }: SEODashboardProps) {
  const [metrics, setMetrics] = useState<SEOMetrics | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  const runSEOAudit = async () => {
    try {
      const data: SEOMetrics = {
        // Initialize with null values
        lcp: null,
        fid: null,
        cls: null,
        fcp: null,
        ttfb: null,
        pageLoadTime: null,
        domContentLoaded: null,
        titleLength: 0,
        metaDescriptionLength: 0,
        h1Count: 0,
        h2Count: 0,
        imageCount: 0,
        imageAltCount: 0,
        internalLinkCount: 0,
        externalLinkCount: 0,
        wordCount: 0,
        readabilityScore: 0,
        hasCanonical: false,
        hasRobotsMeta: false,
        hasOpenGraph: false,
        hasTwitterCard: false,
        hasStructuredData: false,
        isMobileFriendly: false,
        viewportMeta: false,
        url: window.location.href,
        pageType,
        timestamp: Date.now()
      };

      // Get Core Web Vitals
      const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      if (navigation) {
        data.ttfb = navigation.responseStart - navigation.requestStart;
        data.domContentLoaded = navigation.domContentLoadedEventEnd - navigation.fetchStart;
        data.pageLoadTime = navigation.loadEventEnd - navigation.fetchStart;
      }

      // Analyze DOM elements
      const title = document.querySelector('title');
      if (title) {
        data.titleLength = title.textContent?.length || 0;
      }

      const metaDescription = document.querySelector('meta[name="description"]');
      if (metaDescription) {
        data.metaDescriptionLength = metaDescription.getAttribute('content')?.length || 0;
      }

      // Count headings
      data.h1Count = document.querySelectorAll('h1').length;
      data.h2Count = document.querySelectorAll('h2').length;

      // Count images
      const images = document.querySelectorAll('img');
      data.imageCount = images.length;
      data.imageAltCount = Array.from(images).filter(img => img.alt && img.alt.trim() !== '').length;

      // Count links
      const links = document.querySelectorAll('a[href]');
      const currentDomain = window.location.hostname;
      data.internalLinkCount = Array.from(links).filter(link => {
        const href = link.getAttribute('href');
        return href && (href.startsWith('/') || href.includes(currentDomain));
      }).length;
      data.externalLinkCount = links.length - data.internalLinkCount;

      // Check meta tags
      data.hasCanonical = !!document.querySelector('link[rel="canonical"]');
      data.hasRobotsMeta = !!document.querySelector('meta[name="robots"]');
      data.hasOpenGraph = !!document.querySelector('meta[property^="og:"]');
      data.hasTwitterCard = !!document.querySelector('meta[name^="twitter:"]');
      data.hasStructuredData = !!document.querySelector('script[type="application/ld+json"]');

      // Check viewport meta
      data.viewportMeta = !!document.querySelector('meta[name="viewport"]');

      // Mobile friendliness check
      data.isMobileFriendly = window.innerWidth <= 768 && data.viewportMeta;

      // Word count (approximate)
      const textContent = document.body.textContent || '';
      data.wordCount = textContent.split(/\s+/).filter(word => word.length > 0).length;

      // Simple readability score (Flesch Reading Ease approximation)
      const sentences = textContent.split(/[.!?]+/).filter(s => s.trim().length > 0);
      const words = textContent.split(/\s+/).filter(w => w.length > 0);
      const syllables = words.reduce((acc, word) => acc + Math.max(1, word.length / 3), 0);
      
      if (sentences.length > 0 && words.length > 0) {
        data.readabilityScore = 206.835 - (1.015 * (words.length / sentences.length)) - (84.6 * (syllables / words.length));
      }

      setMetrics(data);

      // Send comprehensive SEO data to Statsig
      analytics.track('SEO_Audit_Complete', {
        page_slug: pageSlug,
        page_type: pageType,
        service_or_condition: serviceOrCondition,
        lcp: data.lcp || 0,
        fid: data.fid || 0,
        cls: data.cls || 0,
        fcp: data.fcp || 0,
        ttfb: data.ttfb || 0,
        page_load_time: data.pageLoadTime || 0,
        title_length: data.titleLength,
        meta_description_length: data.metaDescriptionLength,
        h1_count: data.h1Count,
        h2_count: data.h2Count,
        image_count: data.imageCount,
        image_alt_count: data.imageAltCount,
        internal_link_count: data.internalLinkCount,
        external_link_count: data.externalLinkCount,
        word_count: data.wordCount,
        readability_score: data.readabilityScore,
        has_canonical: data.hasCanonical,
        has_robots_meta: data.hasRobotsMeta,
        has_open_graph: data.hasOpenGraph,
        has_twitter_card: data.hasTwitterCard,
        has_structured_data: data.hasStructuredData,
        is_mobile_friendly: data.isMobileFriendly,
        viewport_meta: data.viewportMeta
      });

    } catch (error) {
      console.error('SEO Audit error:', error);
      analytics.track('SEO_Audit_Error', {
        page_slug: pageSlug,
        page_type: pageType,
        error_message: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  };

  useEffect(() => {
    // Auto-run audit on component mount
    runSEOAudit();
  }, [pageType, pageSlug, serviceOrCondition]);

  // Only show in development or when explicitly enabled
  if (process.env.NODE_ENV !== 'development' && !isVisible) {
    return (
      <button
        onClick={() => setIsVisible(true)}
        className="fixed bottom-4 right-4 bg-blue-600 text-white px-4 py-2 rounded-lg shadow-lg z-50"
      >
        SEO Dashboard
      </button>
    );
  }

  if (!metrics) {
    return (
      <div className="fixed bottom-4 right-4 bg-gray-100 p-4 rounded-lg shadow-lg z-50 max-w-sm">
        <h3 className="text-lg font-semibold mb-2">SEO Dashboard</h3>
        <p>Running SEO audit...</p>
      </div>
    );
  }

  const getScoreColor = (score: number, thresholds: { good: number; needsImprovement: number }) => {
    if (score >= thresholds.good) return 'text-green-600';
    if (score >= thresholds.needsImprovement) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getBooleanIcon = (value: boolean) => value ? '✅' : '❌';

  return (
    <div className="fixed bottom-4 right-4 bg-white p-6 rounded-lg shadow-lg z-50 max-w-md max-h-96 overflow-y-auto">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">SEO Dashboard</h3>
        <button 
          onClick={runSEOAudit}
          className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700"
        >
          Refresh
        </button>
        {process.env.NODE_ENV === 'development' && (
          <button 
            onClick={() => setIsVisible(false)}
            className="ml-2 text-gray-500 hover:text-gray-700"
          >
            ×
          </button>
        )}
      </div>

      <div className="space-y-4 text-sm">
        {/* Core Web Vitals */}
        <div className="bg-gray-50 p-3 rounded">
          <h4 className="font-semibold mb-2">Core Web Vitals</h4>
          <div className="space-y-1">
            <div>LCP: <span className={getScoreColor(metrics.lcp || 0, { good: 2500, needsImprovement: 4000 })}>
              {metrics.lcp ? `${metrics.lcp.toFixed(0)}ms` : 'N/A'}
            </span></div>
            <div>FID: <span className={getScoreColor(metrics.fid || 0, { good: 100, needsImprovement: 300 })}>
              {metrics.fid ? `${metrics.fid.toFixed(0)}ms` : 'N/A'}
            </span></div>
            <div>CLS: <span className={getScoreColor(metrics.cls || 0, { good: 0.1, needsImprovement: 0.25 })}>
              {metrics.cls ? metrics.cls.toFixed(3) : 'N/A'}
            </span></div>
            <div>TTFB: <span className={getScoreColor(metrics.ttfb || 0, { good: 800, needsImprovement: 1800 })}>
              {metrics.ttfb ? `${metrics.ttfb.toFixed(0)}ms` : 'N/A'}
            </span></div>
          </div>
        </div>

        {/* Content Analysis */}
        <div className="bg-gray-50 p-3 rounded">
          <h4 className="font-semibold mb-2">Content</h4>
          <div className="space-y-1">
            <div>Words: {metrics.wordCount.toLocaleString()}</div>
            <div>Readability: <span className={getScoreColor(metrics.readabilityScore, { good: 60, needsImprovement: 30 })}>
              {metrics.readabilityScore.toFixed(1)}
            </span></div>
            <div>H1: {metrics.h1Count} | H2: {metrics.h2Count}</div>
            <div>Images: {metrics.imageCount} ({metrics.imageAltCount} alt)</div>
          </div>
        </div>

        {/* Technical SEO */}
        <div className="bg-gray-50 p-3 rounded">
          <h4 className="font-semibold mb-2">Technical SEO</h4>
          <div className="space-y-1">
            <div>Title: <span className={getScoreColor(metrics.titleLength, { good: 30, needsImprovement: 60 })}>
              {metrics.titleLength} chars
            </span></div>
            <div>Meta: <span className={getScoreColor(metrics.metaDescriptionLength, { good: 120, needsImprovement: 160 })}>
              {metrics.metaDescriptionLength} chars
            </span></div>
            <div>Canonical: {getBooleanIcon(metrics.hasCanonical)}</div>
            <div>OG: {getBooleanIcon(metrics.hasOpenGraph)}</div>
            <div>Schema: {getBooleanIcon(metrics.hasStructuredData)}</div>
          </div>
        </div>

        {/* Links */}
        <div className="bg-gray-50 p-3 rounded">
          <h4 className="font-semibold mb-2">Links</h4>
          <div className="space-y-1">
            <div>Internal: {metrics.internalLinkCount}</div>
            <div>External: {metrics.externalLinkCount}</div>
          </div>
        </div>

        {/* Page Info */}
        <div className="bg-gray-50 p-3 rounded">
          <h4 className="font-semibold mb-2">Page Info</h4>
          <div className="space-y-1">
            <div>Type: {metrics.pageType}</div>
            <div>Mobile: {getBooleanIcon(metrics.isMobileFriendly)}</div>
            <div className="text-xs text-gray-500">
              {new Date(metrics.timestamp).toLocaleTimeString()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
