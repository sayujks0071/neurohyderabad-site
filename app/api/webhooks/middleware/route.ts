/**
 * Middleware Webhook Handler
 * 
 * Receives alerts and notifications from Middleware monitoring
 * Integrates with existing monitoring infrastructure
 */

import { NextRequest, NextResponse } from 'next/server';

interface MiddlewareAlert {
  id: string;
  name: string;
  description?: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  metric: string;
  value: number;
  threshold: number;
  condition: string;
  timestamp: string;
  url?: string;
  filters?: Record<string, string>;
}

export async function POST(request: NextRequest) {
  // SECURITY: Require secret key
  const webhookSecret = process.env.MIDDLEWARE_WEBHOOK_SECRET;

  // Fail secure if secret is not configured
  if (!webhookSecret) {
    console.error('Security: MIDDLEWARE_WEBHOOK_SECRET not configured. Denying access.');
    return NextResponse.json(
      { error: 'Server misconfiguration: Auth not set up' },
      { status: 500 }
    );
  }

  // Check for authentication header
  const headerSecret = request.headers.get('x-middleware-secret');
  if (headerSecret !== webhookSecret) {
    console.warn('Security: Unauthorized access attempt to Middleware webhook');
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    );
  }

  try {
    const alert: MiddlewareAlert = await request.json();

    console.log('[Middleware Alert]', {
      id: alert.id,
      name: alert.name,
      severity: alert.severity,
      metric: alert.metric,
      value: alert.value,
      threshold: alert.threshold,
      timestamp: alert.timestamp,
    });

    // Handle critical alerts immediately
    if (alert.severity === 'critical') {
      await handleCriticalAlert(alert);
    }

    // Handle high severity alerts
    if (alert.severity === 'high') {
      await handleHighSeverityAlert(alert);
    }

    // Log all alerts
    await logAlert(alert);

    // Send to existing monitoring webhook if configured
    if (process.env.MONITORING_WEBHOOK_URL) {
      try {
        await fetch(process.env.MONITORING_WEBHOOK_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            type: 'middleware_alert',
            ...alert,
            source: 'middleware',
          }),
        });
      } catch (error) {
        console.error('[Middleware Webhook] Failed to forward to monitoring service:', error);
      }
    }

    return NextResponse.json({
      received: true,
      alertId: alert.id,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('[Middleware Webhook] Error:', error);
    return NextResponse.json(
      { error: 'Failed to process alert', details: String(error) },
      { status: 500 }
    );
  }
}

async function handleCriticalAlert(alert: MiddlewareAlert) {
  console.error('[CRITICAL ALERT]', alert);

  // Critical alerts that need immediate attention:
  // - Form submission failures (business critical)
  // - Complete API failures
  // - Security issues

  if (alert.metric === 'form.success_rate' && alert.value < 0.9) {
    // Form submission failure - business critical
    console.error('[CRITICAL] Form submission failure detected!');
    // TODO: Send immediate notification (SMS, phone call, etc.)
  }

  // TODO: Implement immediate notification channels
  // - SMS via Twilio
  // - Phone call
  // - PagerDuty
  // - Slack critical channel
}

async function handleHighSeverityAlert(alert: MiddlewareAlert) {
  console.warn('[HIGH ALERT]', alert);

  // High severity alerts:
  // - High error rates
  // - Poor performance metrics
  // - API slowdowns

  // TODO: Send to notification channels
  // - Email
  // - Slack
  // - Teams
}

async function logAlert(alert: MiddlewareAlert) {
  // Log to database or logging service
  // TODO: Store in database for alert history
  // TODO: Send to logging service (e.g., Logtail, Datadog)
}

// GET endpoint for webhook verification
export async function GET(request: NextRequest) {
  return NextResponse.json({
    service: 'Middleware Webhook Handler',
    status: 'active',
    endpoints: {
      'POST /': 'Receive Middleware alerts',
    },
    webhookUrl: `${process.env.NEXT_PUBLIC_APP_URL || 'https://www.drsayuj.info'}/api/webhooks/middleware`,
  });
}
