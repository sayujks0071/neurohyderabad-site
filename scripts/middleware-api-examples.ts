#!/usr/bin/env ts-node
/**
 * Middleware API Usage Examples
 * 
 * Run with: pnpm tsx scripts/middleware-api-examples.ts
 */

import { middlewareApi } from '../src/lib/middleware/api-client';

async function main() {
  const command = process.argv[2];

  switch (command) {
    case 'dashboards':
      await listDashboards();
      break;
    case 'create-dashboard':
      await createPerformanceDashboard();
      break;
    case 'widgets':
      await listWidgets();
      break;
    case 'metrics':
      await queryMetrics();
      break;
    case 'alerts':
      await listAlerts();
      break;
    case 'hosts':
      await listHosts();
      break;
    default:
      console.log(`
Usage: pnpm tsx scripts/middleware-api-examples.ts <command>

Commands:
  dashboards        - List all dashboards
  create-dashboard   - Create a performance dashboard
  widgets           - List all widgets
  metrics           - Query metrics
  alerts            - List alerts (requires rule-id)
  hosts             - List agent hosts
      `);
  }
}

async function listDashboards() {
  try {
    console.log('Fetching dashboards...');
    const dashboards = await middlewareApi.getDashboards();
    console.log(`Found ${dashboards.length} dashboards:`);
    dashboards.forEach((d: any) => {
      console.log(`  - ${d.name || d.id} (${d.id})`);
    });
  } catch (error) {
    console.error('Error:', error);
  }
}

async function createPerformanceDashboard() {
  try {
    console.log('Creating performance dashboard...');
    const dashboard = await middlewareApi.createDashboard({
      name: 'Website Performance Dashboard',
      description: 'Monitor website Core Web Vitals and API performance',
      widgets: [
        {
          name: 'LCP (Largest Contentful Paint)',
          type: 'line',
          query: {
            metric: 'web_vitals.lcp',
            filters: [{ key: 'service', value: 'website' }],
          },
        },
        {
          name: 'API Response Time',
          type: 'line',
          query: {
            metric: 'http.response_time',
            filters: [{ key: 'service', value: 'api' }],
          },
        },
      ],
    });
    console.log('Dashboard created:', dashboard);
  } catch (error) {
    console.error('Error:', error);
  }
}

async function listWidgets() {
  try {
    console.log('Fetching widgets...');
    const widgets = await middlewareApi.getWidgets();
    console.log(`Found ${widgets.length} widgets:`);
    widgets.forEach((w: any) => {
      console.log(`  - ${w.name || w.builder_id} (${w.builder_id})`);
    });
  } catch (error) {
    console.error('Error:', error);
  }
}

async function queryMetrics() {
  try {
    console.log('Querying metrics...');
    const metrics = await middlewareApi.getMetrics({
      metrics: ['cpu.usage', 'memory.usage'],
      timeRange: {
        start: Date.now() - 3600000, // 1 hour ago
        end: Date.now(),
      },
    });
    console.log('Metrics:', JSON.stringify(metrics, null, 2));
  } catch (error) {
    console.error('Error:', error);
  }
}

async function listAlerts() {
  const ruleId = process.argv[3];
  if (!ruleId) {
    console.error('Error: Rule ID required');
    console.log('Usage: pnpm tsx scripts/middleware-api-examples.ts alerts <rule-id>');
    return;
  }

  try {
    console.log(`Fetching alerts for rule ${ruleId}...`);
    const alerts = await middlewareApi.getAlertsByRule(ruleId);
    console.log(`Found ${alerts.length} alerts:`);
    alerts.forEach((a: any) => {
      console.log(`  - ${a.name || a.id} (${a.id})`);
    });
  } catch (error) {
    console.error('Error:', error);
  }
}

async function listHosts() {
  try {
    console.log('Fetching agent hosts...');
    const hosts = await middlewareApi.getAgentHosts();
    console.log(`Found ${hosts.length} hosts:`);
    hosts.forEach((h: any) => {
      console.log(`  - ${h.name || h.id} (${h.id})`);
    });
  } catch (error) {
    console.error('Error:', error);
  }
}

main().catch(console.error);
