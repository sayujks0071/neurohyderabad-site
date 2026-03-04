"use client";
import React, { useState, useEffect, useCallback } from 'react';
import { analytics } from '../lib/analytics';
import { contentAnalysis } from '../lib/content-analysis';
import { technicalSEOAudit } from '../lib/technical-seo-audit';

interface SEOAuditDashboardProps {
  pageSlug: string;
  pageType: string;
  serviceOrCondition?: string;
}

interface AuditResults {
  content_quality: any;
  technical_seo: any;
  performance_metrics: any;
  recommendations: any[];
  critical_issues: any[];
  warnings: any[];
  overall_score: number;
}

export default function SEOAuditDashboard({ pageSlug, pageType, serviceOrCondition }: SEOAuditDashboardProps) {
  const [auditResults, setAuditResults] = useState<AuditResults | null>(null);
  const [isRunning, setIsRunning] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'content' | 'technical' | 'performance'>('overview');

  const runSEOAudit = useCallback(async () => {
    setIsRunning(true);
    
    try {
      // Get page content
      const pageContent = document.documentElement.outerHTML;
      const textContent = document.body.textContent || '';
      
      // Analyze content quality
      const contentQuality = contentAnalysis.analyzeContentQuality(textContent, {
        primary_keyword: serviceOrCondition || 'neurosurgeon hyderabad',
        last_updated: new Date().toISOString()
      });

      // Run technical SEO audit
      const technicalSEO = await technicalSEOAudit.runAudit(window.location.href);

      // Get performance metrics
      const performanceMetrics = {
        time_on_page: 0, // Would be tracked over time
        bounce_rate: 0,  // Would be tracked over time
        scroll_depth: 0, // Would be tracked over time
        page_views: 1    // Current page view
      };

      // Generate recommendations
      const contentRecommendations = contentAnalysis.generateContentRecommendations(contentQuality, {
        primary_keyword: serviceOrCondition || 'neurosurgeon hyderabad',
        last_updated: new Date().toISOString()
      });

      const allRecommendations = [
        ...contentRecommendations,
        ...technicalSEO.recommendations
      ];

      const results: AuditResults = {
        content_quality: contentQuality,
        technical_seo: technicalSEO,
        performance_metrics: performanceMetrics,
        recommendations: allRecommendations,
        critical_issues: technicalSEO.critical_issues,
        warnings: technicalSEO.warnings,
        overall_score: Math.round((contentQuality.overall_score + technicalSEO.overall_score) / 2)
      };

      setAuditResults(results);

      // Send audit data to Statsig
      analytics.track('SEO_Audit_Complete', {
        page_slug: pageSlug,
        page_type: pageType,
        service_or_condition: serviceOrCondition,
        overall_score: results.overall_score,
        content_quality_score: contentQuality.overall_score,
        technical_seo_score: technicalSEO.overall_score,
        critical_issues_count: results.critical_issues.length,
        warnings_count: results.warnings.length,
        recommendations_count: results.recommendations.length
      });

    } catch (error) {
      console.error('SEO Audit error:', error);
      analytics.track('SEO_Audit_Error', {
        page_slug: pageSlug,
        page_type: pageType,
        error_message: error instanceof Error ? error.message : 'Unknown error'
      });
    } finally {
      setIsRunning(false);
    }
  }, [pageSlug, pageType, serviceOrCondition]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      runSEOAudit();
    }
  }, [runSEOAudit]);

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-[var(--color-success-700)]';
    if (score >= 60) return 'text-[var(--color-warning-700)]';
    return 'text-[var(--color-error)]';
  };

  const getScoreBgColor = (score: number) => {
    if (score >= 80) return 'bg-[var(--color-success-light)]';
    if (score >= 60) return 'bg-[var(--color-warning-light)]';
    return 'bg-[var(--color-error-light)]';
  };

  if (!auditResults) {
    return (
      <div className="fixed bottom-4 right-4 bg-[var(--color-surface)] p-4 rounded-lg shadow-lg border border-[var(--color-border)] z-50 max-w-sm">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[var(--color-primary-500)] mx-auto mb-2"></div>
          <p className="text-sm text-[var(--color-text-secondary)]">Running SEO Audit...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed bottom-4 right-4 bg-[var(--color-surface)] rounded-lg shadow-lg border border-[var(--color-border)] z-50 max-w-md max-h-96 overflow-hidden">
      <div className="p-4 border-b border-[var(--color-border)]">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-lg font-bold">SEO Audit Dashboard</h3>
          <button
            onClick={runSEOAudit}
            disabled={isRunning}
            className="px-3 py-1 text-sm bg-[var(--color-primary-500)] text-white rounded hover:bg-[var(--color-primary-700)] disabled:bg-[var(--color-primary-300)]"
          >
            {isRunning ? 'Running...' : 'Refresh'}
          </button>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className={`px-3 py-1 rounded-full ${getScoreBgColor(auditResults.overall_score)}`}>
            <span className={`text-sm font-semibold ${getScoreColor(auditResults.overall_score)}`}>
              Overall: {auditResults.overall_score}/100
            </span>
          </div>
          <div className="text-xs text-[var(--color-text-secondary)]">
            {auditResults.critical_issues.length} critical, {auditResults.warnings.length} warnings
          </div>
        </div>
      </div>

      <div className="p-4">
        <div className="flex space-x-2 mb-4">
          {(['overview', 'content', 'technical', 'performance'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-3 py-1 text-sm rounded ${
                activeTab === tab 
                  ? 'bg-[var(--color-primary-500)] text-white' 
                  : 'bg-[var(--color-background)] text-[var(--color-text-secondary)] hover:bg-[var(--color-border)]'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        <div className="max-h-64 overflow-y-auto">
          {activeTab === 'overview' && (
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className={`text-2xl font-bold ${getScoreColor(auditResults.content_quality.overall_score)}`}>
                    {auditResults.content_quality.overall_score}
                  </div>
                  <div className="text-xs text-[var(--color-text-secondary)]">Content Quality</div>
                </div>
                <div className="text-center">
                  <div className={`text-2xl font-bold ${getScoreColor(auditResults.technical_seo.overall_score)}`}>
                    {auditResults.technical_seo.overall_score}
                  </div>
                  <div className="text-xs text-[var(--color-text-secondary)]">Technical SEO</div>
                </div>
              </div>

              {auditResults.critical_issues.length > 0 && (
                <div>
                  <h4 className="font-semibold text-[var(--color-error)] mb-2">Critical Issues</h4>
                  <div className="space-y-1">
                    {auditResults.critical_issues.slice(0, 3).map((issue, index) => (
                      <div key={index} className="text-xs text-[var(--color-error)]">
                        • {issue.issue}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {auditResults.warnings.length > 0 && (
                <div>
                  <h4 className="font-semibold text-[var(--color-warning-700)] mb-2">Warnings</h4>
                  <div className="space-y-1">
                    {auditResults.warnings.slice(0, 3).map((warning, index) => (
                      <div key={index} className="text-xs text-[var(--color-warning-700)]">
                        • {warning.issue}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === 'content' && (
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <div className="font-semibold">Word Count</div>
                  <div className="text-[var(--color-text-secondary)]">{auditResults.content_quality.word_count}</div>
                </div>
                <div>
                  <div className="font-semibold">Readability</div>
                  <div className="text-[var(--color-text-secondary)]">{auditResults.content_quality.readability_score.toFixed(1)}</div>
                </div>
                <div>
                  <div className="font-semibold">H1 Count</div>
                  <div className="text-[var(--color-text-secondary)]">{auditResults.content_quality.heading_structure.h1_count}</div>
                </div>
                <div>
                  <div className="font-semibold">H2 Count</div>
                  <div className="text-[var(--color-text-secondary)]">{auditResults.content_quality.heading_structure.h2_count}</div>
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Content Recommendations</h4>
                <div className="space-y-2">
                  {auditResults.recommendations
                    .filter(rec => rec.type?.includes('content') || rec.category?.includes('Content'))
                    .slice(0, 3)
                    .map((rec, index) => (
                      <div key={index} className="text-xs p-2 bg-[var(--color-background)] rounded">
                        <div className="font-medium">{rec.message}</div>
                        <div className="text-[var(--color-text-secondary)] mt-1">{rec.action}</div>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'technical' && (
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <div className="font-semibold">Meta Tags</div>
                  <div className="text-[var(--color-text-secondary)]">
                    {auditResults.technical_seo.categories.meta_tags.overall_score}/100
                  </div>
                </div>
                <div>
                  <div className="font-semibold">Structured Data</div>
                  <div className="text-[var(--color-text-secondary)]">
                    {auditResults.technical_seo.categories.structured_data.score}/100
                  </div>
                </div>
                <div>
                  <div className="font-semibold">Mobile</div>
                  <div className="text-[var(--color-text-secondary)]">
                    {auditResults.technical_seo.categories.mobile_optimization.score}/100
                  </div>
                </div>
                <div>
                  <div className="font-semibold">Images</div>
                  <div className="text-[var(--color-text-secondary)]">
                    {auditResults.technical_seo.categories.image_optimization.score}/100
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Technical Recommendations</h4>
                <div className="space-y-2">
                  {auditResults.recommendations
                    .filter(rec => rec.category && !rec.category.includes('Content'))
                    .slice(0, 3)
                    .map((rec, index) => (
                      <div key={index} className="text-xs p-2 bg-[var(--color-background)] rounded">
                        <div className="font-medium">{rec.message}</div>
                        <div className="text-[var(--color-text-secondary)] mt-1">{rec.actions?.[0] || rec.action}</div>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'performance' && (
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <div className="font-semibold">LCP</div>
                  <div className="text-[var(--color-text-secondary)]">
                    {auditResults.technical_seo.categories.core_web_vitals.LCP.value || 'N/A'}ms
                  </div>
                </div>
                <div>
                  <div className="font-semibold">CLS</div>
                  <div className="text-[var(--color-text-secondary)]">
                    {auditResults.technical_seo.categories.core_web_vitals.CLS.value || 'N/A'}
                  </div>
                </div>
                <div>
                  <div className="font-semibold">FID</div>
                  <div className="text-[var(--color-text-secondary)]">
                    {auditResults.technical_seo.categories.core_web_vitals.FID.value || 'N/A'}ms
                  </div>
                </div>
                <div>
                  <div className="font-semibold">TTFB</div>
                  <div className="text-[var(--color-text-secondary)]">
                    {auditResults.technical_seo.categories.core_web_vitals.TTFB.value || 'N/A'}ms
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Performance Metrics</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Time on Page:</span>
                    <span>{auditResults.performance_metrics.time_on_page}s</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Bounce Rate:</span>
                    <span>{(auditResults.performance_metrics.bounce_rate * 100).toFixed(1)}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Scroll Depth:</span>
                    <span>{(auditResults.performance_metrics.scroll_depth * 100).toFixed(1)}%</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
