#!/usr/bin/env ts-node
/**
 * Setup Middleware Monitoring for www.drsayuj.info
 * 
 * Creates dashboards, widgets, and alerts for the most common use cases:
 * 1. Appointment Booking API Performance
 * 2. Chatbot/AI Chat Performance
 * 3. Core Web Vitals Monitoring
 * 4. Error Rate Tracking
 * 5. Page Load Performance
 * 6. Deployment Health
 * 7. Form Submission Success Rate
 */

import { middlewareApi } from '../src/lib/middleware/api-client';

const SITE_URL = 'https://www.drsayuj.info';

interface DashboardConfig {
  name: string;
  description: string;
  widgets: any[];
}

const DASHBOARDS: DashboardConfig[] = [
  {
    name: 'Website Performance Overview',
    description: 'Monitor Core Web Vitals and overall website performance',
    widgets: [
      {
        name: 'LCP (Largest Contentful Paint)',
        type: 'line',
        query: {
          metric: 'web_vitals.lcp',
          filters: [
            { key: 'service', value: 'website' },
            { key: 'url', value: SITE_URL },
          ],
          groupBy: ['page'],
          timeRange: {
            start: Date.now() - 86400000, // 24 hours
            end: Date.now(),
          },
        },
      },
      {
        name: 'CLS (Cumulative Layout Shift)',
        type: 'line',
        query: {
          metric: 'web_vitals.cls',
          filters: [
            { key: 'service', value: 'website' },
            { key: 'url', value: SITE_URL },
          ],
        },
      },
      {
        name: 'INP (Interaction to Next Paint)',
        type: 'line',
        query: {
          metric: 'web_vitals.inp',
          filters: [
            { key: 'service', value: 'website' },
            { key: 'url', value: SITE_URL },
          ],
        },
      },
      {
        name: 'FCP (First Contentful Paint)',
        type: 'line',
        query: {
          metric: 'web_vitals.fcp',
          filters: [
            { key: 'service', value: 'website' },
            { key: 'url', value: SITE_URL },
          ],
        },
      },
      {
        name: 'TTFB (Time to First Byte)',
        type: 'line',
        query: {
          metric: 'web_vitals.ttfb',
          filters: [
            { key: 'service', value: 'website' },
            { key: 'url', value: SITE_URL },
          ],
        },
      },
    ],
  },
  {
    name: 'API Performance',
    description: 'Monitor critical API endpoints',
    widgets: [
      {
        name: 'Appointment API Response Time',
        type: 'line',
        query: {
          metric: 'http.response_time',
          filters: [
            { key: 'service', value: 'api' },
            { key: 'endpoint', value: '/api/appointments/submit' },
            { key: 'url', value: SITE_URL },
          ],
        },
      },
      {
        name: 'Chatbot API Response Time',
        type: 'line',
        query: {
          metric: 'http.response_time',
          filters: [
            { key: 'service', value: 'api' },
            { key: 'endpoint', value: '/api/ai/chat' },
            { key: 'url', value: SITE_URL },
          ],
        },
      },
      {
        name: 'Lead API Response Time',
        type: 'line',
        query: {
          metric: 'http.response_time',
          filters: [
            { key: 'service', value: 'api' },
            { key: 'endpoint', value: '/api/lead' },
            { key: 'url', value: SITE_URL },
          ],
        },
      },
      {
        name: 'API Error Rate',
        type: 'line',
        query: {
          metric: 'error.rate',
          filters: [
            { key: 'service', value: 'api' },
            { key: 'url', value: SITE_URL },
          ],
          groupBy: ['endpoint'],
        },
      },
    ],
  },
  {
    name: 'Critical Pages Performance',
    description: 'Monitor performance of key pages',
    widgets: [
      {
        name: 'Homepage Load Time',
        type: 'line',
        query: {
          metric: 'http.response_time',
          filters: [
            { key: 'page', value: '/' },
            { key: 'url', value: SITE_URL },
          ],
        },
      },
      {
        name: 'Appointments Page Load Time',
        type: 'line',
        query: {
          metric: 'http.response_time',
          filters: [
            { key: 'page', value: '/appointments' },
            { key: 'url', value: SITE_URL },
          ],
        },
      },
      {
        name: 'Services Page Load Time',
        type: 'line',
        query: {
          metric: 'http.response_time',
          filters: [
            { key: 'page', value: '/services' },
            { key: 'url', value: SITE_URL },
          ],
        },
      },
      {
        name: 'Contact Page Load Time',
        type: 'line',
        query: {
          metric: 'http.response_time',
          filters: [
            { key: 'page', value: '/contact' },
            { key: 'url', value: SITE_URL },
          ],
        },
      },
    ],
  },
  {
    name: 'Error Tracking',
    description: 'Monitor errors and exceptions',
    widgets: [
      {
        name: 'JavaScript Error Rate',
        type: 'line',
        query: {
          metric: 'error.rate',
          filters: [
            { key: 'error_type', value: 'javascript' },
            { key: 'url', value: SITE_URL },
          ],
        },
      },
      {
        name: 'API Error Rate',
        type: 'line',
        query: {
          metric: 'error.rate',
          filters: [
            { key: 'error_type', value: 'api' },
            { key: 'url', value: SITE_URL },
          ],
        },
      },
      {
        name: '404 Error Rate',
        type: 'line',
        query: {
          metric: 'http.status.404',
          filters: [
            { key: 'url', value: SITE_URL },
          ],
        },
      },
      {
        name: 'Top Errors',
        type: 'table',
        query: {
          metric: 'error.count',
          filters: [
            { key: 'url', value: SITE_URL },
          ],
          groupBy: ['error_message'],
          orderBy: { field: 'count', direction: 'desc' },
          limit: 10,
        },
      },
    ],
  },
  {
    name: 'User Engagement',
    description: 'Track user interactions and conversions',
    widgets: [
      {
        name: 'Page Views',
        type: 'line',
        query: {
          metric: 'page.views',
          filters: [
            { key: 'url', value: SITE_URL },
          ],
          groupBy: ['page'],
        },
      },
      {
        name: 'Form Submissions',
        type: 'line',
        query: {
          metric: 'form.submissions',
          filters: [
            { key: 'url', value: SITE_URL },
          ],
          groupBy: ['form_type'],
        },
      },
      {
        name: 'Chatbot Interactions',
        type: 'line',
        query: {
          metric: 'chat.interactions',
          filters: [
            { key: 'url', value: SITE_URL },
          ],
        },
      },
      {
        name: 'Appointment Booking Success Rate',
        type: 'gauge',
        query: {
          metric: 'form.success_rate',
          filters: [
            { key: 'form_type', value: 'appointment' },
            { key: 'url', value: SITE_URL },
          ],
        },
      },
    ],
  },
];

async function setupMonitoring() {
  console.log('🚀 Setting up Middleware monitoring for www.drsayuj.info\n');

  try {
    // Check API access
    console.log('📡 Checking API access...');
    const dashboards = await middlewareApi.getDashboards();
    console.log(`✅ Connected to Middleware API (${dashboards.length} existing dashboards)\n`);

    // Create dashboards
    console.log('📊 Creating dashboards...\n');
    const createdDashboards = [];

    for (const config of DASHBOARDS) {
      try {
        console.log(`Creating: ${config.name}...`);
        const dashboard = await middlewareApi.createDashboard({
          name: config.name,
          description: config.description,
          widgets: config.widgets,
        });
        createdDashboards.push(dashboard);
        console.log(`  ✅ Created dashboard: ${dashboard.id || dashboard.name}\n`);
      } catch (error: any) {
        console.error(`  ❌ Failed to create ${config.name}:`, error.message);
      }
    }

    console.log(`\n✅ Setup complete! Created ${createdDashboards.length} dashboards`);
    console.log('\n📋 Next steps:');
    console.log('1. Access your dashboards at: https://hjptv.middleware.io');
    console.log('2. Set up alerts using the API or dashboard UI');
    console.log('3. Configure webhook handler at /api/webhooks/middleware');
    console.log('\n📚 Documentation:');
    console.log('  - docs/middleware-api-integration.md');
    console.log('  - docs/middleware-website-improvement-guide.md');

  } catch (error: any) {
    console.error('❌ Setup failed:', error.message);
    console.error('\n💡 Make sure you have:');
    console.error('  1. Set MIDDLEWARE_ACCESS_TOKEN in .env.local');
    console.error('  2. Generated an access token from the dashboard');
    console.error('  3. Run: ./scripts/setup-middleware-env.sh');
    process.exit(1);
  }
}

// Run setup
setupMonitoring().catch(console.error);
