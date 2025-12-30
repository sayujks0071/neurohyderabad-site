import { NextRequest, NextResponse } from 'next/server';
import { writeFile, readFile, mkdir } from 'fs/promises';
import { join } from 'path';

interface WebhookPayload {
  event: string;
  timestamp: string;
  data: Record<string, any>;
  source: string;
}

export async function POST(request: NextRequest) {
  try {
    // Verify webhook secret if provided
    const authHeader = request.headers.get('authorization');
    const webhookSecret = process.env.WEBHOOK_SECRET;
    
    if (webhookSecret && authHeader !== `Bearer ${webhookSecret}`) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { event, timestamp, data, source } = body;

    // Validate required fields
    if (!event || !timestamp || !data) {
      return NextResponse.json(
        { error: 'Missing required fields: event, timestamp, data' },
        { status: 400 }
      );
    }

    // Create webhook payload
    const webhookPayload: WebhookPayload = {
      event,
      timestamp,
      data,
      source: source || 'unknown'
    };

    // Ensure webhooks directory exists
    const webhooksDir = join(process.cwd(), 'logs', 'webhooks');
    try {
      await mkdir(webhooksDir, { recursive: true });
    } catch (error) {
      // Directory might already exist
    }

    // Append to daily webhook log file
    const today = new Date().toISOString().split('T')[0];
    const webhookFile = join(webhooksDir, `webhooks-${today}.json`);

    let existingWebhooks: WebhookPayload[] = [];
    try {
      const existingContent = await readFile(webhookFile, 'utf-8');
      existingWebhooks = JSON.parse(existingContent);
    } catch (error) {
      // File doesn't exist or is empty, start fresh
    }

    // Add new webhook
    existingWebhooks.push(webhookPayload);

    // Keep only last 500 webhooks to prevent file from growing too large
    if (existingWebhooks.length > 500) {
      existingWebhooks = existingWebhooks.slice(-500);
    }

    // Write back to file
    await writeFile(webhookFile, JSON.stringify(existingWebhooks, null, 2));

    // Log the webhook event as bot activity
    const activityLogEntry = {
      action: `Webhook: ${event}`,
      status: 'info' as const,
      details: `Received webhook from ${source || 'unknown'}`,
      source: 'webhook',
      metadata: data
    };

    // Log to activity log
    const logsDir = join(process.cwd(), 'logs');
    const logFile = join(logsDir, `bot-activity-${today}.json`);

    let existingLogs: any[] = [];
    try {
      const existingContent = await readFile(logFile, 'utf-8');
      existingLogs = JSON.parse(existingContent);
    } catch (error) {
      // File doesn't exist or is empty, start fresh
    }

    existingLogs.push({
      timestamp: new Date().toISOString(),
      ...activityLogEntry
    });

    // Keep only last 1000 entries
    if (existingLogs.length > 1000) {
      existingLogs = existingLogs.slice(-1000);
    }

    await writeFile(logFile, JSON.stringify(existingLogs, null, 2));

    return NextResponse.json({
      success: true,
      message: 'Webhook received and logged successfully',
      webhook: webhookPayload
    });
  } catch (error) {
    console.error('Error processing webhook:', error);
    return NextResponse.json(
      { error: 'Failed to process webhook' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const date = searchParams.get('date') || new Date().toISOString().split('T')[0];
    const event = searchParams.get('event');
    const limit = parseInt(searchParams.get('limit') || '100');

    const webhooksDir = join(process.cwd(), 'logs', 'webhooks');
    const webhookFile = join(webhooksDir, `webhooks-${date}.json`);

    try {
      const content = await readFile(webhookFile, 'utf-8');
      let webhooks: WebhookPayload[] = JSON.parse(content);
      
      // Filter by event type if specified
      if (event) {
        webhooks = webhooks.filter(webhook => webhook.event === event);
      }
      
      // Return most recent webhooks
      const recentWebhooks = webhooks.slice(-limit).reverse();
      
      return NextResponse.json({
        date,
        event: event || 'all',
        webhooks: recentWebhooks,
        total: webhooks.length
      });
    } catch (error) {
      return NextResponse.json({
        date,
        event: event || 'all',
        webhooks: [],
        total: 0,
        message: 'No webhooks found for this date'
      });
    }
  } catch (error) {
    console.error('Error fetching webhooks:', error);
    return NextResponse.json(
      { error: 'Failed to fetch webhooks' },
      { status: 500 }
    );
  }
}