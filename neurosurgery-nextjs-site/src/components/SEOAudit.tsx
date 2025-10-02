"use client";
import { useEffect, useState } from 'react';
import { analytics } from '../lib/analytics';

interface SEOAuditData {
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

export default function SEOAudit() {
  const [auditData, setAuditData] = useState<SEOAuditData | null>(null);
  const [isRunning, setIsRunning] = useState(false);

  const runSEOAudit = async () => {
    setIsRunning(true);
    
    try {
      const data: SEOAuditData = {
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
        pageType: 'unknown',
        timestamp: Date.now()
      };

      // Get Core Web Vitals
      if ('web-vital' in window) {
        // This would require importing web-vitals library
        // For now, we'll use performance API
        const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
        if (navigation) {
          data.ttfb = navigation.responseStart - navigation.requestStart;
          data.domContentLoaded = navigation.domContentLoadedEventEnd - navigation.fetchStart;
          data.pageLoadTime = navigation.loadEventEnd - navigation.fetchStart;
        }
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

      // Determine page type
      const path = window.location.pathname;
      if (path === '/') {
        data.pageType = 'home';
      } else if (path.includes('/services/')) {
        data.pageType = 'service';
      } else if (path.includes('/conditions/')) {
        data.pageType = 'condition';
      } else if (path.includes('/blog/')) {
        data.pageType = 'blog';
      } else if (path.includes('/neurosurgeon-')) {
        data.pageType = 'location';
      } else {
        data.pageType = 'other';
      }

      setAuditData(data);

      // Send to Statsig
      analytics.track('SEO_Audit_Complete', {
        page_slug: path,
        page_type: data.pageType,
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
        error_message: error instanceof Error ? error.message : 'Unknown error'
      });
    } finally {
      setIsRunning(false);
    }
  };

  useEffect(() => {
    // Auto-run audit on component mount
    runSEOAudit();
  }, []);

  if (!auditData) {
    return (
      <div className="p-4 bg-gray-100 rounded-lg">
        <h3 className="text-lg font-semibold mb-2">SEO Audit</h3>
        {isRunning ? (
          <p>Running SEO audit...</p>
        ) : (
          <button 
            onClick={runSEOAudit}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Run SEO Audit
          </button>
        )}
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
    <div className="p-6 bg-white rounded-lg shadow-lg">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold">SEO Audit Results</h3>
        <button 
          onClick={runSEOAudit}
          disabled={isRunning}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {isRunning ? 'Running...' : 'Refresh Audit'}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Core Web Vitals */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <h4 className="font-semibold mb-3">Core Web Vitals</h4>
          <div className="space-y-2 text-sm">
            <div>LCP: <span className={getScoreColor(auditData.lcp || 0, { good: 2500, needsImprovement: 4000 })}>
              {auditData.lcp ? `${auditData.lcp.toFixed(0)}ms` : 'N/A'}
            </span></div>
            <div>FID: <span className={getScoreColor(auditData.fid || 0, { good: 100, needsImprovement: 300 })}>
              {auditData.fid ? `${auditData.fid.toFixed(0)}ms` : 'N/A'}
            </span></div>
            <div>CLS: <span className={getScoreColor(auditData.cls || 0, { good: 0.1, needsImprovement: 0.25 })}>
              {auditData.cls ? auditData.cls.toFixed(3) : 'N/A'}
            </span></div>
            <div>FCP: <span className={getScoreColor(auditData.fcp || 0, { good: 1800, needsImprovement: 3000 })}>
              {auditData.fcp ? `${auditData.fcp.toFixed(0)}ms` : 'N/A'}
            </span></div>
            <div>TTFB: <span className={getScoreColor(auditData.ttfb || 0, { good: 800, needsImprovement: 1800 })}>
              {auditData.ttfb ? `${auditData.ttfb.toFixed(0)}ms` : 'N/A'}
            </span></div>
          </div>
        </div>

        {/* Content Analysis */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <h4 className="font-semibold mb-3">Content Analysis</h4>
          <div className="space-y-2 text-sm">
            <div>Word Count: {auditData.wordCount.toLocaleString()}</div>
            <div>Readability: <span className={getScoreColor(auditData.readabilityScore, { good: 60, needsImprovement: 30 })}>
              {auditData.readabilityScore.toFixed(1)}
            </span></div>
            <div>H1 Count: {auditData.h1Count}</div>
            <div>H2 Count: {auditData.h2Count}</div>
            <div>Images: {auditData.imageCount} ({auditData.imageAltCount} with alt)</div>
          </div>
        </div>

        {/* Technical SEO */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <h4 className="font-semibold mb-3">Technical SEO</h4>
          <div className="space-y-2 text-sm">
            <div>Title Length: <span className={getScoreColor(auditData.titleLength, { good: 30, needsImprovement: 60 })}>
              {auditData.titleLength} chars
            </span></div>
            <div>Meta Description: <span className={getScoreColor(auditData.metaDescriptionLength, { good: 120, needsImprovement: 160 })}>
              {auditData.metaDescriptionLength} chars
            </span></div>
            <div>Canonical: {getBooleanIcon(auditData.hasCanonical)}</div>
            <div>Robots Meta: {getBooleanIcon(auditData.hasRobotsMeta)}</div>
            <div>Open Graph: {getBooleanIcon(auditData.hasOpenGraph)}</div>
            <div>Twitter Card: {getBooleanIcon(auditData.hasTwitterCard)}</div>
            <div>Structured Data: {getBooleanIcon(auditData.hasStructuredData)}</div>
          </div>
        </div>

        {/* Links */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <h4 className="font-semibold mb-3">Link Analysis</h4>
          <div className="space-y-2 text-sm">
            <div>Internal Links: {auditData.internalLinkCount}</div>
            <div>External Links: {auditData.externalLinkCount}</div>
            <div>Total Links: {auditData.internalLinkCount + auditData.externalLinkCount}</div>
          </div>
        </div>

        {/* Mobile Optimization */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <h4 className="font-semibold mb-3">Mobile Optimization</h4>
          <div className="space-y-2 text-sm">
            <div>Mobile Friendly: {getBooleanIcon(auditData.isMobileFriendly)}</div>
            <div>Viewport Meta: {getBooleanIcon(auditData.viewportMeta)}</div>
            <div>Screen Width: {window.innerWidth}px</div>
          </div>
        </div>

        {/* Page Info */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <h4 className="font-semibold mb-3">Page Information</h4>
          <div className="space-y-2 text-sm">
            <div>Page Type: {auditData.pageType}</div>
            <div>URL: {auditData.url}</div>
            <div>Audit Time: {new Date(auditData.timestamp).toLocaleTimeString()}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
