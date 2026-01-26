# Middleware API Integration Guide

## Overview

This guide covers programmatic integration with Middleware APIs for dashboard management, alert configuration, agent management, and metrics retrieval.

## API Client

A TypeScript client is available at `src/lib/middleware/api-client.ts` that provides type-safe access to all Middleware APIs.

## Authentication

### Access Token

1. **Generate Access Token:**
   - Login to Middleware dashboard: `https://hjptv.middleware.io`
   - Navigate to Settings → API Keys
   - Generate a new Access Token
   - Copy the token

2. **Configure Environment Variable:**
   ```bash
   # .env.local
   MIDDLEWARE_ACCESS_TOKEN=your_access_token_here
   MIDDLEWARE_API_URL=https://hjptv.middleware.io/api/v1  # Optional, defaults to this
   ```

3. **Quick Setup:**
   ```bash
   ./scripts/setup-middleware-env.sh
   ```

### API Keys Reference

**Note:** Different keys are used for different purposes:
- **Agent API Key**: `fygjftkluglwjxlwyhqdwshcbwtvfavastli` (for infrastructure agents)
- **RUM Account Key**: `svxkmvkxzpkxtuyhsgmgdiyfjwkxtytiltea` (for browser monitoring)
- **API Access Token**: Generated from dashboard (for programmatic API access)

See [Middleware Configuration Guide](./middleware-configuration.md) for complete key reference.

## Usage Examples

### 1. Dashboard Management

#### Get All Dashboards

```typescript
import { middlewareApi } from '@/src/lib/middleware/api-client';

// Get all dashboards
const dashboards = await middlewareApi.getDashboards();
console.log('Dashboards:', dashboards);

// Get specific dashboard by key
const dashboard = await middlewareApi.getDashboards('my-dashboard-key');
```

#### Create Dashboard

```typescript
const newDashboard = await middlewareApi.createDashboard({
  name: 'Website Performance Dashboard',
  description: 'Monitor website performance metrics',
  widgets: [
    {
      name: 'API Response Times',
      type: 'line',
      query: {
        metric: 'http.response_time',
        filters: [{ key: 'service', value: 'website' }],
      },
    },
  ],
});
```

#### Clone Dashboard

```typescript
const cloned = await middlewareApi.cloneDashboard({
  sourceId: 'original-dashboard-id',
  name: 'Website Performance Dashboard - Copy',
});
```

### 2. Widget Management

#### Create Widget

```typescript
const widget = await middlewareApi.createWidget({
  name: 'Error Rate',
  type: 'line',
  query: {
    metric: 'error.rate',
    timeRange: {
      start: Date.now() - 3600000, // 1 hour ago
      end: Date.now(),
    },
  },
});
```

#### Get Widget Data

```typescript
const data = await middlewareApi.getWidgetData({
  widgetId: 'widget-id',
  query: {
    metric: 'http.response_time',
    filters: [],
    groupBy: ['service'],
  },
});
```

### 3. Metrics and Data

#### Query Metrics

```typescript
const metrics = await middlewareApi.getMetrics({
  metrics: ['cpu.usage', 'memory.usage'],
  filters: [
    { key: 'host', value: 'production-server' },
  ],
  groupBy: ['service'],
  timeRange: {
    start: Date.now() - 86400000, // 24 hours ago
    end: Date.now(),
  },
});
```

#### Get Resources

```typescript
const resources = await middlewareApi.getResources();
// Returns list of available resources (hosts, services, etc.)
```

### 4. Alert Management

#### Get Alerts by Rule

```typescript
const alerts = await middlewareApi.getAlertsByRule('rule-id');
```

#### Create Alert

```typescript
const alert = await middlewareApi.createAlert('rule-id', {
  name: 'High CPU Alert',
  condition: {
    metric: 'cpu.usage',
    threshold: 80,
    operator: '>',
  },
  actions: [
    {
      type: 'webhook',
      url: 'https://www.drsayuj.info/api/webhooks/middleware',
    },
  ],
});
```

#### Get Alert Statistics

```typescript
const stats = await middlewareApi.getAlertStats('rule-id');
```

### 5. Agent Management

#### Get Agent Hosts

```typescript
const hosts = await middlewareApi.getAgentHosts();
```

#### Get Agent Configuration

```typescript
const config = await middlewareApi.getAgentConfig('host-id');
```

#### Update Agent Configuration

```typescript
await middlewareApi.updateAgentConfig('host-id', {
  integrations: {
    apm: { enabled: true },
    logs: { enabled: true },
  },
});
```

#### Get Host Integrations

```typescript
const integrations = await middlewareApi.getHostIntegrations('host-id');
```

### 6. Configuration Groups

#### Get Configuration Groups

```typescript
const groups = await middlewareApi.getConfigGroups();
```

#### Create Configuration Group

```typescript
const group = await middlewareApi.createConfigGroup('production-group', {
  integrations: {
    apm: { enabled: true },
    logs: { enabled: true },
  },
  settings: {
    sampleRate: 1.0,
  },
});
```

#### Assign Group to Hosts

```typescript
await middlewareApi.assignConfigGroup('production-group', [
  'host-id-1',
  'host-id-2',
]);
```

## Integration with Website

### Example: Create Performance Dashboard

```typescript
// scripts/create-performance-dashboard.ts
import { middlewareApi } from '../src/lib/middleware/api-client';

async function createPerformanceDashboard() {
  const dashboard = await middlewareApi.createDashboard({
    name: 'Website Performance',
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
      {
        name: 'Error Rate',
        type: 'line',
        query: {
          metric: 'error.rate',
          filters: [{ key: 'service', value: 'website' }],
        },
      },
    ],
  });

  console.log('Dashboard created:', dashboard.id);
}

createPerformanceDashboard();
```

### Example: Set Up Deployment Alerts

```typescript
// scripts/setup-deployment-alerts.ts
import { middlewareApi } from '../src/lib/middleware/api-client';

async function setupDeploymentAlerts() {
  // Create alert for high error rate after deployment
  const errorAlert = await middlewareApi.createAlert('deployment-rule-id', {
    name: 'Post-Deployment Error Spike',
    condition: {
      metric: 'error.rate',
      threshold: 0.05, // 5% error rate
      operator: '>',
      window: '5m', // 5 minute window
    },
    actions: [
      {
        type: 'webhook',
        url: 'https://www.drsayuj.info/api/webhooks/middleware',
        method: 'POST',
      },
    ],
  });

  // Create alert for performance degradation
  const perfAlert = await middlewareApi.createAlert('deployment-rule-id', {
    name: 'Post-Deployment Performance Degradation',
    condition: {
      metric: 'http.response_time',
      threshold: 2000, // 2 seconds
      operator: '>',
      window: '10m',
    },
    actions: [
      {
        type: 'webhook',
        url: 'https://www.drsayuj.info/api/webhooks/middleware',
      },
    ],
  });

  console.log('Alerts created:', { errorAlert, perfAlert });
}

setupDeploymentAlerts();
```

### Example: Webhook Handler for Middleware Alerts

```typescript
// app/api/webhooks/middleware/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const alert = await request.json();
    
    console.log('[Middleware Alert]', {
      type: alert.type,
      severity: alert.severity,
      message: alert.message,
      metric: alert.metric,
      value: alert.value,
      threshold: alert.threshold,
    });

    // Send notification (email, Slack, etc.)
    if (alert.severity === 'critical') {
      // Trigger immediate notification
      await sendCriticalAlert(alert);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('[Middleware Webhook] Error:', error);
    return NextResponse.json(
      { error: 'Failed to process alert' },
      { status: 500 }
    );
  }
}

async function sendCriticalAlert(alert: any) {
  // Implement your notification logic
  // e.g., send email, Slack message, etc.
}
```

## API Reference

### Base URL
```
https://hjptv.middleware.io/api/v1
```

### Authentication
All requests require an `Authorization` header:
```
Authorization: Bearer <access_token>
```

### Available Endpoints

#### Dashboards
- `GET /builder/report` - List all dashboards
- `GET /builder/report/{reportKey}` - Get dashboard by key
- `POST /builder/report` - Create dashboard
- `PUT /builder/report/{id}` - Update dashboard
- `DELETE /builder/report/{id}` - Delete dashboard
- `POST /builder/report/clone` - Clone dashboard
- `GET /builder/report/favourite/{reportId}/{favourite}` - Toggle favorite

#### Widgets
- `GET /builder/widget` - List widgets
- `POST /builder/widget` - Create widget
- `POST /builder/widget/data` - Get widget data
- `POST /builder/widget/multi-data` - Get multiple widget data
- `DELETE /builder/widget/{builder_id}` - Delete widget
- `PUT /builder/widget/scope/layouts` - Update layouts

#### Metrics
- `POST /builder/metrics-v2` - Query metrics
- `GET /builder/resources` - Get resources

#### Alerts
- `GET /rules/{rule_id}/alerts` - Get alerts by rule
- `POST /rules/{rule_id}/alerts` - Create alert
- `GET /rules/{rule_id}/alerts/stats` - Get alert stats

#### Agent Management
- `GET /agent/hosts` - List agent hosts
- `GET /agent/setting/{hostId}` - Get agent config
- `POST /agent/setting/{hostId}` - Update agent config
- `GET /agent/setting/{hostId}/integrations` - Get integrations
- `GET /agent/setting/config-groups` - List config groups
- `POST /agent/setting/config-groups/{groupName}` - Create config group
- `PUT /agent/setting/config-groups/{groupName}` - Assign group
- `GET /agent/client-tokens` - List client tokens
- `POST /agent/generate-client-token` - Generate token

## Error Handling

The API client throws errors for failed requests:

```typescript
try {
  const dashboard = await middlewareApi.getDashboards();
} catch (error) {
  if (error instanceof Error) {
    console.error('API Error:', error.message);
    // Handle error (e.g., retry, fallback, notify)
  }
}
```

## Best Practices

1. **Cache API Responses**: Don't query dashboards/widgets on every request
2. **Use Webhooks**: Set up webhooks for alerts instead of polling
3. **Error Handling**: Always wrap API calls in try-catch
4. **Rate Limiting**: Be mindful of API rate limits
5. **Token Security**: Never commit access tokens to version control

## Related Documentation

- [Middleware RUM Integration](./middleware-rum-integration.md)
- [Middleware Website Improvement Guide](./middleware-website-improvement-guide.md)
- [Middleware macOS Installation](./middleware-macos-installation.md)

## Last Updated
January 26, 2026
