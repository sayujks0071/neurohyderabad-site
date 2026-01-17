/**
 * Google Analytics 4 Performance Management Test Script
 * 
 * Tests the Google Analytics Data API to fetch performance metrics
 * for www.drsayuj.info
 * 
 * Usage:
 *   npx tsx scripts/test-ga4-performance.ts
 * 
 * Required Environment Variables:
 *   - GOOGLE_INDEXING_KEY_JSON: Service account JSON (for authentication)
 *   - GA4_PROPERTY_ID: GA4 Property ID (numeric, e.g., "123456789")
 *   - GA4_MEASUREMENT_ID: GA4 Measurement ID (optional, e.g., "G-BBTYBBDWMR")
 */

import { google } from 'googleapis';
import * as fs from 'fs';
import * as path from 'path';

const SITE_URL = 'https://www.drsayuj.info';
const GA4_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID || 'G-BBTYBBDWMR';

interface PerformanceMetrics {
  pageLoadTime?: number;
  lcp?: number; // Largest Contentful Paint
  fid?: number; // First Input Delay
  cls?: number; // Cumulative Layout Shift
  inp?: number; // Interaction to Next Paint
  fcp?: number; // First Contentful Paint
  ttfb?: number; // Time to First Byte
}

interface PagePerformance {
  pagePath: string;
  pageTitle: string;
  metrics: PerformanceMetrics;
  sessions: number;
  pageViews: number;
}

type Ga4Row = {
  dimensionValues?: Array<{ value?: string }>;
  metricValues?: Array<{ value?: string }>;
};

/**
 * Load service account credentials
 */
function loadServiceAccount() {
  const keyJson = process.env.GOOGLE_INDEXING_KEY_JSON;
  
  if (!keyJson) {
    throw new Error(
      'GOOGLE_INDEXING_KEY_JSON environment variable is missing. ' +
      'Use the same service account credentials configured for Google Indexing API.'
    );
  }

  try {
    return JSON.parse(keyJson);
  } catch (e) {
    throw new Error(`Failed to parse GOOGLE_INDEXING_KEY_JSON: ${e}`);
  }
}

/**
 * Get authenticated Analytics Data API client
 */
async function getAnalyticsClient() {
  const credentials = loadServiceAccount();
  
  const auth = new google.auth.GoogleAuth({
    credentials,
    scopes: [
      'https://www.googleapis.com/auth/analytics.readonly',
      'https://www.googleapis.com/auth/analytics',
    ],
  });

  const analyticsData = google.analyticsdata('v1beta');
  return { auth, analyticsData };
}

/**
 * Get GA4 Property ID from environment or prompt user
 */
function getPropertyId(): string {
  const propertyId = process.env.GA4_PROPERTY_ID;
  
  if (!propertyId) {
    console.error('\n❌ GA4_PROPERTY_ID environment variable is missing!\n');
    console.log('📋 How to find your GA4 Property ID:');
    console.log('1. Go to: https://analytics.google.com/');
    console.log('2. Select your property (www.drsayuj.info)');
    console.log('3. Go to Admin → Property Settings');
    console.log('4. Copy the "Property ID" (numeric, e.g., 123456789)');
    console.log('\n💡 Add to .env.local:');
    console.log('   GA4_PROPERTY_ID=your-property-id-here\n');
    throw new Error('GA4_PROPERTY_ID is required');
  }

  return propertyId;
}

/**
 * Test API connection
 */
async function testConnection(auth: any, analyticsData: any, propertyId: string) {
  console.log('🔌 Testing Google Analytics Data API connection...\n');
  
  try {
    const property = `properties/${propertyId}`;
    
    // Test with a simple metadata request
    const [response] = await analyticsData.properties.getMetadata({
      name: property,
    });

    console.log('✅ Connection successful!');
    console.log(`   Property: ${response.displayName || propertyId}`);
    console.log(`   Currency: ${response.currencyCode || 'N/A'}\n`);
    
    return true;
  } catch (error: any) {
    console.error('❌ Connection failed:', error.message);
    
    if (error.code === 403) {
      console.error('\n⚠️  Permission denied. Ensure:');
      console.error('1. Service account has "Viewer" role in GA4 property');
      console.error('2. Analytics Data API is enabled in Google Cloud Console');
      console.error('3. Service account email is added to GA4 property users\n');
    }
    
    return false;
  }
}

/**
 * Fetch Core Web Vitals metrics
 */
async function fetchCoreWebVitals(
  auth: any,
  analyticsData: any,
  propertyId: string,
  days: number = 7
): Promise<PerformanceMetrics> {
  const property = `properties/${propertyId}`;
  const endDate = new Date().toISOString().split('T')[0];
  const startDate = new Date(Date.now() - days * 24 * 60 * 60 * 1000)
    .toISOString()
    .split('T')[0];

  console.log(`📊 Fetching Core Web Vitals (last ${days} days)...\n`);

  const metrics = [
    { name: 'averageSessionDuration' },
    { name: 'screenPageViews' },
  ];

  // Core Web Vitals events (if tracked)
  const cwvEvents = ['LCP', 'FID', 'CLS', 'INP', 'FCP', 'TTFB'];

  try {
    // Try to fetch Core Web Vitals events
    const [response] = await analyticsData.properties.runReport({
      property,
      dateRanges: [{ startDate, endDate }],
      dimensions: [{ name: 'eventName' }],
      metrics: [
        { name: 'eventCount' },
        { name: 'eventValue' },
      ],
      dimensionFilter: {
        filter: {
          fieldName: 'eventName',
          inListFilter: {
            values: cwvEvents,
          },
        },
      },
      limit: 100,
    });

    const cwvData: PerformanceMetrics = {};

    if (response.rows && response.rows.length > 0) {
      response.rows.forEach((row: Ga4Row) => {
        const eventName = row.dimensionValues?.[0]?.value || '';
        const eventCount = parseInt(row.metricValues?.[0]?.value || '0', 10);
        const eventValue = parseFloat(row.metricValues?.[1]?.value || '0');

        if (eventCount > 0) {
          const avgValue = eventValue / eventCount;
          
          switch (eventName) {
            case 'LCP':
              cwvData.lcp = avgValue;
              break;
            case 'FID':
              cwvData.fid = avgValue;
              break;
            case 'CLS':
              cwvData.cls = avgValue;
              break;
            case 'INP':
              cwvData.inp = avgValue;
              break;
            case 'FCP':
              cwvData.fcp = avgValue;
              break;
            case 'TTFB':
              cwvData.ttfb = avgValue;
              break;
          }
        }
      });
    }

    return cwvData;
  } catch (error: any) {
    console.warn('⚠️  Could not fetch Core Web Vitals:', error.message);
    return {};
  }
}

/**
 * Fetch page performance data
 */
async function fetchPagePerformance(
  auth: any,
  analyticsData: any,
  propertyId: string,
  days: number = 7
): Promise<PagePerformance[]> {
  const property = `properties/${propertyId}`;
  const endDate = new Date().toISOString().split('T')[0];
  const startDate = new Date(Date.now() - days * 24 * 60 * 60 * 1000)
    .toISOString()
    .split('T')[0];

  console.log(`📄 Fetching page performance data (last ${days} days)...\n`);

  try {
    const [response] = await analyticsData.properties.runReport({
      property,
      dateRanges: [{ startDate, endDate }],
      dimensions: [
        { name: 'pagePath' },
        { name: 'pageTitle' },
      ],
      metrics: [
        { name: 'screenPageViews' },
        { name: 'sessions' },
        { name: 'averageSessionDuration' },
      ],
      orderBys: [
        {
          metric: { metricName: 'screenPageViews' },
          desc: true,
        },
      ],
      limit: 20,
    });

    const pages: PagePerformance[] = [];

    if (response.rows && response.rows.length > 0) {
      response.rows.forEach((row: Ga4Row) => {
        const pagePath = row.dimensionValues?.[0]?.value || '';
        const pageTitle = row.dimensionValues?.[1]?.value || '';
        const pageViews = parseInt(row.metricValues?.[0]?.value || '0', 10);
        const sessions = parseInt(row.metricValues?.[1]?.value || '0', 10);
        const avgDuration = parseFloat(row.metricValues?.[2]?.value || '0');

        pages.push({
          pagePath,
          pageTitle,
          metrics: {
            pageLoadTime: avgDuration,
          },
          sessions,
          pageViews,
        });
      });
    }

    return pages;
  } catch (error: any) {
    console.error('❌ Error fetching page performance:', error.message);
    return [];
  }
}

/**
 * Fetch real-time performance data
 */
async function fetchRealtimeData(
  auth: any,
  analyticsData: any,
  propertyId: string
) {
  const property = `properties/${propertyId}`;

  console.log('⚡ Fetching real-time data...\n');

  try {
    const [response] = await analyticsData.properties.runRealtimeReport({
      property,
      dimensions: [{ name: 'pagePath' }],
      metrics: [
        { name: 'activeUsers' },
        { name: 'screenPageViews' },
      ],
      limit: 10,
    });

    if (response.rows && response.rows.length > 0) {
      console.log('📊 Current Active Users by Page:\n');
      response.rows.forEach((row: Ga4Row, index: number) => {
        const pagePath = row.dimensionValues?.[0]?.value || 'Unknown';
        const activeUsers = row.metricValues?.[0]?.value || '0';
        const pageViews = row.metricValues?.[1]?.value || '0';
        
        console.log(`   ${index + 1}. ${pagePath}`);
        console.log(`      👥 Active Users: ${activeUsers}`);
        console.log(`      👁️  Page Views: ${pageViews}\n`);
      });
    } else {
      console.log('   No active users at the moment.\n');
    }
  } catch (error: any) {
    console.warn('⚠️  Could not fetch real-time data:', error.message);
  }
}

/**
 * Display performance insights
 */
function displayInsights(cwv: PerformanceMetrics, pages: PagePerformance[]) {
  console.log('\n' + '='.repeat(60));
  console.log('📈 Performance Insights');
  console.log('='.repeat(60) + '\n');

  // Core Web Vitals assessment
  if (Object.keys(cwv).length > 0) {
    console.log('🎯 Core Web Vitals:\n');
    
    if (cwv.lcp !== undefined) {
      const status = cwv.lcp <= 2500 ? '✅ Good' : cwv.lcp <= 4000 ? '⚠️  Needs Improvement' : '❌ Poor';
      console.log(`   LCP (Largest Contentful Paint): ${cwv.lcp.toFixed(0)}ms ${status}`);
    }
    
    if (cwv.fid !== undefined) {
      const status = cwv.fid <= 100 ? '✅ Good' : cwv.fid <= 300 ? '⚠️  Needs Improvement' : '❌ Poor';
      console.log(`   FID (First Input Delay): ${cwv.fid.toFixed(0)}ms ${status}`);
    }
    
    if (cwv.cls !== undefined) {
      const status = cwv.cls <= 0.1 ? '✅ Good' : cwv.cls <= 0.25 ? '⚠️  Needs Improvement' : '❌ Poor';
      console.log(`   CLS (Cumulative Layout Shift): ${cwv.cls.toFixed(3)} ${status}`);
    }
    
    if (cwv.inp !== undefined) {
      const status = cwv.inp <= 200 ? '✅ Good' : cwv.inp <= 500 ? '⚠️  Needs Improvement' : '❌ Poor';
      console.log(`   INP (Interaction to Next Paint): ${cwv.inp.toFixed(0)}ms ${status}`);
    }
    
    if (cwv.fcp !== undefined) {
      const status = cwv.fcp <= 1800 ? '✅ Good' : cwv.fcp <= 3000 ? '⚠️  Needs Improvement' : '❌ Poor';
      console.log(`   FCP (First Contentful Paint): ${cwv.fcp.toFixed(0)}ms ${status}`);
    }
    
    if (cwv.ttfb !== undefined) {
      const status = cwv.ttfb <= 800 ? '✅ Good' : cwv.ttfb <= 1800 ? '⚠️  Needs Improvement' : '❌ Poor';
      console.log(`   TTFB (Time to First Byte): ${cwv.ttfb.toFixed(0)}ms ${status}`);
    }
    
    console.log();
  } else {
    console.log('⚠️  Core Web Vitals not tracked yet.');
    console.log('   Enable Core Web Vitals tracking in your analytics setup.\n');
  }

  // Top performing pages
  if (pages.length > 0) {
    console.log('📄 Top Pages by Performance:\n');
    pages.slice(0, 10).forEach((page, index) => {
      console.log(`   ${index + 1}. ${page.pageTitle || page.pagePath}`);
      console.log(`      📍 Path: ${page.pagePath}`);
      console.log(`      👁️  Views: ${page.pageViews.toLocaleString()}`);
      console.log(`      👥 Sessions: ${page.sessions.toLocaleString()}`);
      if (page.metrics.pageLoadTime) {
        const duration = Math.round(page.metrics.pageLoadTime);
        const minutes = Math.floor(duration / 60);
        const seconds = duration % 60;
        console.log(`      ⏱️  Avg Session Duration: ${minutes}m ${seconds}s`);
      }
      console.log();
    });
  }
}

/**
 * Main function
 */
async function main() {
  console.log('🚀 Google Analytics 4 Performance Management Test');
  console.log('='.repeat(60));
  console.log(`\n🌐 Site: ${SITE_URL}`);
  console.log(`📊 GA4 Measurement ID: ${GA4_MEASUREMENT_ID}\n`);

  try {
    // Get property ID
    const propertyId = getPropertyId();
    console.log(`🔑 GA4 Property ID: ${propertyId}\n`);

    // Get authenticated client
    const { auth, analyticsData } = await getAnalyticsClient();

    // Test connection
    const connected = await testConnection(auth, analyticsData, propertyId);
    if (!connected) {
      process.exit(1);
    }

    // Fetch data
    const cwv = await fetchCoreWebVitals(auth, analyticsData, propertyId, 7);
    const pages = await fetchPagePerformance(auth, analyticsData, propertyId, 7);
    await fetchRealtimeData(auth, analyticsData, propertyId);

    // Display insights
    displayInsights(cwv, pages);

    console.log('='.repeat(60));
    console.log('\n✅ Performance test completed!\n');
    console.log('💡 Next Steps:');
    console.log('   1. Review Core Web Vitals and optimize poor-performing pages');
    console.log('   2. Monitor top pages for performance issues');
    console.log('   3. Set up automated performance alerts');
    console.log('   4. Link GA4 to BigQuery for advanced analysis\n');

  } catch (error: any) {
    console.error('\n❌ Error:', error.message);
    console.error('\n📖 Troubleshooting:');
    console.error('   1. Ensure GOOGLE_INDEXING_KEY_JSON is set in .env.local');
    console.error('   2. Ensure GA4_PROPERTY_ID is set in .env.local');
    console.error('   3. Grant service account "Viewer" access in GA4');
    console.error('   4. Enable Analytics Data API in Google Cloud Console\n');
    process.exit(1);
  }
}

main();
