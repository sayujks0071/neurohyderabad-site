/**
 * SEO Dashboard Component
 * Real-time SEO metrics and monitoring
 */

'use client';

import { useEffect, useState } from 'react';

interface SEOMetrics {
  pageSpeed: number;
  mobileScore: number;
  seoScore: number;
  backlinks: number;
  keywords: number;
  indexedPages: number;
  organicTraffic: number;
  bounceRate: number;
}

interface SEOIssue {
  severity: 'critical' | 'warning' | 'info';
  message: string;
  fix: string;
}

export default function SEODashboard() {
  const [metrics, setMetrics] = useState<SEOMetrics>({
    pageSpeed: 0,
    mobileScore: 0,
    seoScore: 0,
    backlinks: 0,
    keywords: 0,
    indexedPages: 0,
    organicTraffic: 0,
    bounceRate: 0
  });

  const [issues, setIssues] = useState<SEOIssue[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching SEO metrics
    setTimeout(() => {
      setMetrics({
        pageSpeed: 92,
        mobileScore: 95,
        seoScore: 88,
        backlinks: 156,
        keywords: 234,
        indexedPages: 89,
        organicTraffic: 4567,
        bounceRate: 32
      });

      setIssues([
        {
          severity: 'warning',
          message: 'Missing alt text on 3 images',
          fix: 'Add descriptive alt text to images in /services page'
        },
        {
          severity: 'info',
          message: 'Opportunity: Create content for "robotic spine surgery"',
          fix: 'High search volume keyword with low competition'
        },
        {
          severity: 'critical',
          message: 'Mobile page speed needs improvement',
          fix: 'Optimize images and enable lazy loading'
        }
      ]);

      setLoading(false);
    }, 1000);
  }, []);

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-[var(--color-success-700)]';
    if (score >= 70) return 'text-[var(--color-warning-700)]';
    return 'text-[var(--color-error)]';
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'bg-[var(--color-error-light)] text-[var(--color-error-800)] border-[var(--color-error-light)]';
      case 'warning': return 'bg-[var(--color-warning-light)] text-[var(--color-warning-700)] border-[var(--color-warning)]';
      case 'info': return 'bg-[var(--color-primary-100)] text-[var(--color-primary-800)] border-[var(--color-primary-200)]';
      default: return 'bg-[var(--color-background)] text-[var(--color-text-primary)] border-[var(--color-border)]';
    }
  };

  if (loading) {
    return (
      <div className="p-6 bg-[var(--color-surface)] rounded-lg shadow-lg">
        <div className="animate-pulse">
          <div className="h-4 bg-[var(--color-border)] rounded w-1/4 mb-4"></div>
          <div className="space-y-3">
            <div className="h-3 bg-[var(--color-border)] rounded"></div>
            <div className="h-3 bg-[var(--color-border)] rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-[var(--color-surface)] rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6">SEO Dashboard</h2>
      
      {/* Core Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="p-4 border rounded-lg">
          <div className="text-sm text-[var(--color-text-secondary)]">Page Speed</div>
          <div className={`text-2xl font-bold ${getScoreColor(metrics.pageSpeed)}`}>
            {metrics.pageSpeed}/100
          </div>
        </div>
        
        <div className="p-4 border rounded-lg">
          <div className="text-sm text-[var(--color-text-secondary)]">Mobile Score</div>
          <div className={`text-2xl font-bold ${getScoreColor(metrics.mobileScore)}`}>
            {metrics.mobileScore}/100
          </div>
        </div>
        
        <div className="p-4 border rounded-lg">
          <div className="text-sm text-[var(--color-text-secondary)]">SEO Score</div>
          <div className={`text-2xl font-bold ${getScoreColor(metrics.seoScore)}`}>
            {metrics.seoScore}/100
          </div>
        </div>
        
        <div className="p-4 border rounded-lg">
          <div className="text-sm text-[var(--color-text-secondary)]">Bounce Rate</div>
          <div className={`text-2xl font-bold ${metrics.bounceRate < 40 ? 'text-[var(--color-success-700)]' : 'text-[var(--color-warning-700)]'}`}>
            {metrics.bounceRate}%
          </div>
        </div>
      </div>

      {/* Growth Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="p-4 bg-[var(--color-primary-50)] rounded-lg">
          <div className="text-sm text-[var(--color-text-secondary)]">Backlinks</div>
          <div className="text-xl font-semibold">{metrics.backlinks}</div>
          <div className="text-xs text-[var(--color-success-700)]">↑ 12% this month</div>
        </div>
        
        <div className="p-4 bg-[var(--color-primary-50)] rounded-lg">
          <div className="text-sm text-[var(--color-text-secondary)]">Keywords Ranking</div>
          <div className="text-xl font-semibold">{metrics.keywords}</div>
          <div className="text-xs text-[var(--color-success-700)]">↑ 23 new keywords</div>
        </div>
        
        <div className="p-4 bg-[var(--color-primary-50)] rounded-lg">
          <div className="text-sm text-[var(--color-text-secondary)]">Indexed Pages</div>
          <div className="text-xl font-semibold">{metrics.indexedPages}</div>
          <div className="text-xs text-[var(--color-text-secondary)]">of 112 total</div>
        </div>
        
        <div className="p-4 bg-[var(--color-primary-50)] rounded-lg">
          <div className="text-sm text-[var(--color-text-secondary)]">Organic Traffic</div>
          <div className="text-xl font-semibold">{metrics.organicTraffic}</div>
          <div className="text-xs text-[var(--color-success-700)]">↑ 34% vs last month</div>
        </div>
      </div>

      {/* SEO Issues & Opportunities */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-4">SEO Issues & Opportunities</h3>
        <div className="space-y-3">
          {issues.map((issue, index) => (
            <div key={index} className={`p-4 border rounded-lg ${getSeverityColor(issue.severity)}`}>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="font-medium">{issue.message}</div>
                  <div className="text-sm mt-1 opacity-80">{issue.fix}</div>
                </div>
                <span className={`px-2 py-1 text-xs rounded-full ml-4 ${
                  issue.severity === 'critical' ? 'bg-[var(--color-error)] text-white' :
                  issue.severity === 'warning' ? 'bg-[var(--color-warning-700)] text-white' :
                  'bg-[var(--color-primary-500)] text-white'
                }`}>
                  {issue.severity}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="border-t pt-6">
        <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
        <div className="flex flex-wrap gap-3">
          <button className="px-4 py-2 bg-[var(--color-primary-500)] text-white rounded-lg hover:bg-[var(--color-primary-700)]">
            Submit Sitemap
          </button>
          <button className="px-4 py-2 bg-[var(--color-success)] text-white rounded-lg hover:bg-[var(--color-success-700)]">
            Request Indexing
          </button>
          <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700">
            Check Schema
          </button>
          <button className="px-4 py-2 bg-[var(--color-text-secondary)] text-white rounded-lg hover:bg-[var(--color-text-secondary)]">
            View Full Report
          </button>
        </div>
      </div>

      {/* Top Performing Pages */}
      <div className="mt-8 border-t pt-6">
        <h3 className="text-lg font-semibold mb-4">Top Performing Pages</h3>
        <div className="space-y-2">
          <div className="flex justify-between items-center p-3 bg-[var(--color-background)] rounded">
            <span className="text-sm">/services/endoscopic-spine-surgery</span>
            <span className="text-sm text-[var(--color-success-700)]">2,341 visits</span>
          </div>
          <div className="flex justify-between items-center p-3 bg-[var(--color-background)] rounded">
            <span className="text-sm">/conditions/herniated-disc</span>
            <span className="text-sm text-[var(--color-success-700)]">1,876 visits</span>
          </div>
          <div className="flex justify-between items-center p-3 bg-[var(--color-background)] rounded">
            <span className="text-sm">/blog/spine-surgery-cost-guide</span>
            <span className="text-sm text-[var(--color-success-700)]">1,234 visits</span>
          </div>
        </div>
      </div>

      {/* Competitor Tracking */}
      <div className="mt-8 border-t pt-6">
        <h3 className="text-lg font-semibold mb-4">Competitor Rankings</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className="text-sm text-[var(--color-text-secondary)] mb-2">Your Rankings</div>
            <div className="space-y-1">
              <div className="text-sm">• "neurosurgeon hyderabad" - #3</div>
              <div className="text-sm">• "endoscopic spine surgery" - #1</div>
              <div className="text-sm">• "spine surgeon malakpet" - #1</div>
            </div>
          </div>
          <div>
            <div className="text-sm text-[var(--color-text-secondary)] mb-2">Competitor Average</div>
            <div className="space-y-1">
              <div className="text-sm">• Apollo Hospitals - #2</div>
              <div className="text-sm">• KIMS Hospital - #4</div>
              <div className="text-sm">• Continental - #5</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
