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
    if (score >= 90) return 'text-green-600';
    if (score >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'bg-red-100 text-red-800 border-red-200';
      case 'warning': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'info': return 'bg-blue-100 text-blue-800 border-blue-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  if (loading) {
    return (
      <div className="p-6 bg-white rounded-lg shadow-lg">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="space-y-3">
            <div className="h-3 bg-gray-200 rounded"></div>
            <div className="h-3 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6">SEO Dashboard</h2>
      
      {/* Core Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="p-4 border rounded-lg">
          <div className="text-sm text-gray-600">Page Speed</div>
          <div className={`text-2xl font-bold ${getScoreColor(metrics.pageSpeed)}`}>
            {metrics.pageSpeed}/100
          </div>
        </div>
        
        <div className="p-4 border rounded-lg">
          <div className="text-sm text-gray-600">Mobile Score</div>
          <div className={`text-2xl font-bold ${getScoreColor(metrics.mobileScore)}`}>
            {metrics.mobileScore}/100
          </div>
        </div>
        
        <div className="p-4 border rounded-lg">
          <div className="text-sm text-gray-600">SEO Score</div>
          <div className={`text-2xl font-bold ${getScoreColor(metrics.seoScore)}`}>
            {metrics.seoScore}/100
          </div>
        </div>
        
        <div className="p-4 border rounded-lg">
          <div className="text-sm text-gray-600">Bounce Rate</div>
          <div className={`text-2xl font-bold ${metrics.bounceRate < 40 ? 'text-green-600' : 'text-yellow-600'}`}>
            {metrics.bounceRate}%
          </div>
        </div>
      </div>

      {/* Growth Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="p-4 bg-blue-50 rounded-lg">
          <div className="text-sm text-gray-600">Backlinks</div>
          <div className="text-xl font-semibold">{metrics.backlinks}</div>
          <div className="text-xs text-green-600">↑ 12% this month</div>
        </div>
        
        <div className="p-4 bg-blue-50 rounded-lg">
          <div className="text-sm text-gray-600">Keywords Ranking</div>
          <div className="text-xl font-semibold">{metrics.keywords}</div>
          <div className="text-xs text-green-600">↑ 23 new keywords</div>
        </div>
        
        <div className="p-4 bg-blue-50 rounded-lg">
          <div className="text-sm text-gray-600">Indexed Pages</div>
          <div className="text-xl font-semibold">{metrics.indexedPages}</div>
          <div className="text-xs text-gray-600">of 112 total</div>
        </div>
        
        <div className="p-4 bg-blue-50 rounded-lg">
          <div className="text-sm text-gray-600">Organic Traffic</div>
          <div className="text-xl font-semibold">{metrics.organicTraffic}</div>
          <div className="text-xs text-green-600">↑ 34% vs last month</div>
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
                  issue.severity === 'critical' ? 'bg-red-600 text-white' :
                  issue.severity === 'warning' ? 'bg-yellow-600 text-white' :
                  'bg-blue-600 text-white'
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
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            Submit Sitemap
          </button>
          <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
            Request Indexing
          </button>
          <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700">
            Check Schema
          </button>
          <button className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700">
            View Full Report
          </button>
        </div>
      </div>

      {/* Top Performing Pages */}
      <div className="mt-8 border-t pt-6">
        <h3 className="text-lg font-semibold mb-4">Top Performing Pages</h3>
        <div className="space-y-2">
          <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
            <span className="text-sm">/services/endoscopic-spine-surgery</span>
            <span className="text-sm text-green-600">2,341 visits</span>
          </div>
          <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
            <span className="text-sm">/conditions/herniated-disc</span>
            <span className="text-sm text-green-600">1,876 visits</span>
          </div>
          <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
            <span className="text-sm">/blog/spine-surgery-cost-guide</span>
            <span className="text-sm text-green-600">1,234 visits</span>
          </div>
        </div>
      </div>

      {/* Competitor Tracking */}
      <div className="mt-8 border-t pt-6">
        <h3 className="text-lg font-semibold mb-4">Competitor Rankings</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className="text-sm text-gray-600 mb-2">Your Rankings</div>
            <div className="space-y-1">
              <div className="text-sm">• "neurosurgeon hyderabad" - #3</div>
              <div className="text-sm">• "endoscopic spine surgery" - #1</div>
              <div className="text-sm">• "spine surgeon malakpet" - #1</div>
            </div>
          </div>
          <div>
            <div className="text-sm text-gray-600 mb-2">Competitor Average</div>
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
