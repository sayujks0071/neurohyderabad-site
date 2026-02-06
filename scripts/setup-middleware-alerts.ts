#!/usr/bin/env ts-node
/**
 * Setup Middleware Alerts for www.drsayuj.info
 * 
 * Creates critical alerts for:
 * - High error rates
 * - Slow API responses
 * - Poor Core Web Vitals
 * - Deployment failures
 * - Form submission failures
 */

import { middlewareApi } from '../src/lib/middleware/api-client';

const SITE_URL = 'https://www.drsayuj.info';
const WEBHOOK_URL = `${SITE_URL}/api/webhooks/middleware`;

interface AlertConfig {
  name: string;
  description: string;
  condition: {
    metric: string;
    threshold: number;
    operator: '>' | '<' | '=' | '>=' | '<=';
    window?: string;
    filters?: { key: string; value: string }[];
  };
  severity: 'low' | 'medium' | 'high' | 'critical';
}

const ALERTS: AlertConfig[] = [
  // --- Priority 1: Critical (Immediate Action) ---
  {
    name: 'Form Submission Failure',
    description: 'Critical: Form submission success rate < 90%',
    condition: {
      metric: 'form.success_rate',
      threshold: 0.9, // 90%
      operator: '<',
      window: '15m',
    },
    severity: 'critical',
  },
  {
    name: 'Appointment API Down',
    description: 'Critical: Appointment API returning 5xx errors',
    condition: {
      metric: 'http.status.5xx',
      threshold: 0,
      operator: '>',
      window: '1m',
      filters: [{ key: 'path', value: '/api/appointments' }],
    },
    severity: 'critical',
  },
  {
    name: 'Critical Global Error Rate',
    description: 'Critical: Global error rate > 5%',
    condition: {
      metric: 'error.rate',
      threshold: 0.05, // 5%
      operator: '>',
      window: '5m',
    },
    severity: 'critical',
  },

  // --- Priority 2: High (Urgent Investigation) ---
  {
    name: 'High Error Rate',
    description: 'Warning: Error rate exceeds 1%',
    condition: {
      metric: 'error.rate',
      threshold: 0.01, // 1%
      operator: '>',
      window: '5m',
    },
    severity: 'high',
  },
  {
    name: 'Poor LCP',
    description: 'Alert when LCP exceeds 2.5s (poor user experience)',
    condition: {
      metric: 'web_vitals.lcp',
      threshold: 2500, // 2.5 seconds
      operator: '>',
      window: '10m',
    },
    severity: 'high',
  },
  {
    name: 'Chatbot API Latency',
    description: 'Chatbot API taking longer than 3s',
    condition: {
      metric: 'http.response_time',
      threshold: 3000, // 3 seconds
      operator: '>',
      window: '5m',
      filters: [{ key: 'path', value: '/api/ai/chat' }],
    },
    severity: 'high',
  },
  {
    name: 'Critical Page Load - Home',
    description: 'Home page load time > 3s',
    condition: {
      metric: 'page.load_time',
      threshold: 3000,
      operator: '>',
      window: '10m',
      filters: [{ key: 'path', value: '/' }],
    },
    severity: 'high',
  },
  {
    name: 'Critical Page Load - Appointments',
    description: 'Appointment page load time > 3s',
    condition: {
      metric: 'page.load_time',
      threshold: 3000,
      operator: '>',
      window: '10m',
      filters: [{ key: 'path', value: '/appointments' }],
    },
    severity: 'high',
  },

  // --- Priority 3: Monitor (Optimization) ---
  {
    name: 'High CLS',
    description: 'Alert when CLS exceeds 0.1 (layout instability)',
    condition: {
      metric: 'web_vitals.cls',
      threshold: 0.1,
      operator: '>',
      window: '10m',
    },
    severity: 'medium',
  },
  {
    name: 'Slow INP',
    description: 'Alert when INP exceeds 200ms (poor interactivity)',
    condition: {
      metric: 'web_vitals.inp',
      threshold: 200, // 200ms
      operator: '>',
      window: '10m',
    },
    severity: 'medium',
  },
  {
    name: 'High 404 Rate',
    description: 'Alert when 404 error rate > 5%',
    condition: {
      metric: 'http.status.404',
      threshold: 0.05, // 5%
      operator: '>',
      window: '10m',
    },
    severity: 'medium',
  },
];

async function setupAlerts() {
  console.log('🚨 Setting up Middleware alerts for www.drsayuj.info\n');

  try {
    // Note: You'll need to create a rule first or use an existing rule ID
    const ruleId = process.argv[2] || 'default-rule-id';

    if (ruleId === 'default-rule-id') {
      console.log('⚠️  Note: You need to provide a rule ID');
      console.log('   Usage: pnpm tsx scripts/setup-middleware-alerts.ts <rule-id>');
      console.log('   Or create a rule in the dashboard first\n');
      return;
    }

    const webhookSecret = process.env.MIDDLEWARE_WEBHOOK_SECRET;
    if (!webhookSecret) {
      console.warn('⚠️  Warning: MIDDLEWARE_WEBHOOK_SECRET not set. Webhooks will not be authenticated.');
    }

    console.log(`📡 Creating alerts for rule: ${ruleId}\n`);

    for (const config of ALERTS) {
      try {
        console.log(`Creating: ${config.name}...`);

        const filters = [
          { key: 'url', value: SITE_URL },
          ...(config.condition.filters || [])
        ];

        const alert = await middlewareApi.createAlert(ruleId, {
          name: config.name,
          description: config.description,
          condition: {
            ...config.condition,
            filters,
          },
          actions: [
            {
              type: 'webhook',
              url: WEBHOOK_URL,
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                ...(webhookSecret ? { 'x-middleware-secret': webhookSecret } : {}),
              },
            },
          ],
          severity: config.severity,
        });
        console.log(`  ✅ Created alert: ${alert.id || alert.name}\n`);
      } catch (error: any) {
        console.error(`  ❌ Failed to create ${config.name}:`, error.message);
      }
    }

    console.log(`\n✅ Alert setup complete!`);
    console.log(`\n📋 Webhook handler: ${WEBHOOK_URL}`);
    console.log('   Make sure this endpoint is set up to receive alerts');

  } catch (error: any) {
    console.error('❌ Setup failed:', error.message);
    console.error('\n💡 Make sure you have:');
    console.error('  1. Set MIDDLEWARE_ACCESS_TOKEN in .env.local');
    console.error('  2. Set MIDDLEWARE_WEBHOOK_SECRET in .env.local');
    console.error('  3. Created a rule in the dashboard');
    console.error('  4. Provided the rule ID as an argument');
    process.exit(1);
  }
}

// Run setup
setupAlerts().catch(console.error);
