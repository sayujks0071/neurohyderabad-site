#!/usr/bin/env ts-node
/**
 * Setup Middleware Dashboards for www.drsayuj.info
 *
 * Creates recommended dashboards:
 * 1. Business Critical Dashboard
 * 2. Performance Dashboard
 * 3. Operational Dashboard
 */

import { middlewareApi } from '../src/lib/middleware/api-client';

const DASHBOARDS = [
  {
    name: 'Business Critical Dashboard',
    description: 'Key business metrics including appointment bookings and critical errors',
    widgets: [
      {
        name: 'Appointment Booking Success Rate',
        type: 'line',
        query: {
          metric: 'form.success_rate',
          filters: [{ key: 'form_name', value: 'appointment' }],
          timeRange: { start: 'now-24h', end: 'now' }
        },
        visualization: {
          yAxis: { label: 'Success Rate (%)', min: 0, max: 100 }
        }
      },
      {
        name: 'Form Submission Funnel',
        type: 'bar',
        query: {
          metric: 'form.submissions',
          groupBy: ['step'],
          timeRange: { start: 'now-24h', end: 'now' }
        },
        visualization: {
          title: 'Funnel Steps'
        }
      },
      {
        name: 'Global Error Rate',
        type: 'line',
        query: {
          metric: 'error.rate',
          timeRange: { start: 'now-24h', end: 'now' }
        },
        visualization: {
          yAxis: { label: 'Error Rate (%)' }
        }
      },
      {
        name: 'Peak Traffic Performance (RPS)',
        type: 'line',
        query: {
          metric: 'http.requests',
          timeRange: { start: 'now-24h', end: 'now' }
        },
        visualization: {
          yAxis: { label: 'Requests per Second' }
        }
      }
    ]
  },
  {
    name: 'Performance Dashboard',
    description: 'Core Web Vitals and page load performance metrics',
    widgets: [
      {
        name: 'LCP (Largest Contentful Paint)',
        type: 'line',
        query: {
          metric: 'web_vitals.lcp',
          groupBy: ['device'],
          timeRange: { start: 'now-24h', end: 'now' }
        },
        visualization: {
          yAxis: { label: 'Time (ms)' }
        }
      },
      {
        name: 'CLS (Cumulative Layout Shift)',
        type: 'line',
        query: {
          metric: 'web_vitals.cls',
          groupBy: ['device'],
          timeRange: { start: 'now-24h', end: 'now' }
        },
        visualization: {
          yAxis: { label: 'Shift Score' }
        }
      },
      {
        name: 'INP (Interaction to Next Paint)',
        type: 'line',
        query: {
          metric: 'web_vitals.inp',
          groupBy: ['device'],
          timeRange: { start: 'now-24h', end: 'now' }
        },
        visualization: {
          yAxis: { label: 'Time (ms)' }
        }
      },
      {
        name: 'Page Load Times (Critical Pages)',
        type: 'bar',
        query: {
          metric: 'page.load_time',
          groupBy: ['path'],
          filters: [
            { key: 'path', value: ['/', '/appointments', '/services'] }
          ],
          timeRange: { start: 'now-24h', end: 'now' }
        },
        visualization: {
          yAxis: { label: 'Time (ms)' }
        }
      },
      {
        name: 'API Response Times',
        type: 'line',
        query: {
          metric: 'http.response_time',
          filters: [{ key: 'service', value: 'api' }],
          timeRange: { start: 'now-24h', end: 'now' }
        },
        visualization: {
          yAxis: { label: 'Time (ms)' }
        }
      }
    ]
  },
  {
    name: 'Operational Dashboard',
    description: 'Infrastructure health and deployment monitoring',
    widgets: [
      {
        name: 'Infrastructure CPU Usage',
        type: 'line',
        query: {
          metric: 'host.cpu',
          groupBy: ['host'],
          timeRange: { start: 'now-24h', end: 'now' }
        },
        visualization: {
          yAxis: { label: 'CPU Usage (%)', max: 100 }
        }
      },
      {
        name: 'Infrastructure Memory Usage',
        type: 'line',
        query: {
          metric: 'host.memory',
          groupBy: ['host'],
          timeRange: { start: 'now-24h', end: 'now' }
        },
        visualization: {
          yAxis: { label: 'Memory Usage (%)', max: 100 }
        }
      },
      {
        name: 'Deployment Health (Error Count)',
        type: 'bar',
        query: {
          metric: 'error.count',
          groupBy: ['version'],
          timeRange: { start: 'now-7d', end: 'now' }
        },
        visualization: {
          yAxis: { label: 'Error Count' }
        }
      }
    ]
  }
];

async function setupDashboards() {
  console.log('📊 Setting up Middleware dashboards for www.drsayuj.info\n');

  try {
    for (const config of DASHBOARDS) {
      console.log(`Creating: ${config.name}...`);

      try {
        const dashboard = await middlewareApi.createDashboard(config);
        console.log(`  ✅ Created dashboard: ${dashboard.id || config.name}\n`);
      } catch (error: any) {
        console.error(`  ❌ Failed to create ${config.name}:`, error.message);
      }
    }

    console.log(`\n✅ Dashboard setup complete!`);

  } catch (error: any) {
    console.error('❌ Setup failed:', error.message);
    process.exit(1);
  }
}

// Run setup
setupDashboards().catch(console.error);
