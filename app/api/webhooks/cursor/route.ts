import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';

/**
 * POST /api/webhooks/cursor
 * 
 * Webhook handler for Cursor webhook events
 * 
 * Verifies webhook signature using the configured secret
 * and processes webhook payloads.
 * 
 * Webhook Configuration:
 * - Name: webhookname-cursor
 * - Payload URL: https://www.drsayuj.info/api/webhooks/cursor
 * - Secret: 26e25b8cfe3525166e2d7f4c688053bf
 */
export async function POST(request: NextRequest) {
  try {
    // Get webhook secret from environment or use provided secret
    const webhookSecret = process.env.CURSOR_WEBHOOK_SECRET || '26e25b8cfe3525166e2d7f4c688053bf';
    
    // Get signature from headers (common header names)
    const signature = 
      request.headers.get('x-cursor-signature') ||
      request.headers.get('x-webhook-signature') ||
      request.headers.get('x-signature') ||
      request.headers.get('signature');

    // Read raw body for signature verification
    const rawBody = await request.text();
    
    // Verify webhook signature if provided
    if (signature && webhookSecret) {
      // Common signature verification methods
      // Method 1: HMAC SHA256
      const expectedSignature = crypto
        .createHmac('sha256', webhookSecret)
        .update(rawBody)
        .digest('hex');
      
      // Method 2: Compare with provided signature (could be prefixed)
      const isValid = 
        signature === expectedSignature ||
        signature === `sha256=${expectedSignature}` ||
        `sha256=${expectedSignature}` === signature;

      if (!isValid) {
        console.error('[webhooks/cursor] Invalid signature');
        return NextResponse.json(
          { error: 'Invalid signature' },
          { status: 401 }
        );
      }
    }

    // Parse payload
    let payload;
    try {
      payload = JSON.parse(rawBody);
    } catch (error) {
      console.error('[webhooks/cursor] Invalid JSON payload:', error);
      return NextResponse.json(
        { error: 'Invalid JSON payload' },
        { status: 400 }
      );
    }

    console.log('[webhooks/cursor] Received webhook:', {
      event: payload.event || payload.type || 'unknown',
      timestamp: new Date().toISOString(),
      payloadKeys: Object.keys(payload),
    });

    // Process webhook based on event type
    const eventType = payload.event || payload.type || 'unknown';
    
    switch (eventType) {
      case 'deployment':
      case 'deploy':
        // Handle deployment events
        await handleDeploymentEvent(payload);
        break;
      
      case 'build':
        // Handle build events
        await handleBuildEvent(payload);
        break;
      
      case 'error':
      case 'failure':
        // Handle error events
        await handleErrorEvent(payload);
        break;
      
      default:
        // Handle generic events
        await handleGenericEvent(payload);
    }

    // Return success response
    return NextResponse.json(
      { 
        status: 'success',
        received: true,
        event: eventType,
        timestamp: new Date().toISOString(),
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('[webhooks/cursor] Error processing webhook:', error);
    return NextResponse.json(
      { 
        error: 'Internal server error',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

/**
 * Handle deployment events
 */
async function handleDeploymentEvent(payload: any) {
  console.log('[webhooks/cursor] Deployment event:', payload);
  
  // Add your deployment handling logic here
  // Examples:
  // - Update deployment status
  // - Trigger notifications
  // - Update database records
  // - Trigger revalidation
}

/**
 * Handle build events
 */
async function handleBuildEvent(payload: any) {
  console.log('[webhooks/cursor] Build event:', payload);
  
  // Add your build handling logic here
}

/**
 * Handle error events
 */
async function handleErrorEvent(payload: any) {
  console.error('[webhooks/cursor] Error event:', payload);
  
  // Add your error handling logic here
  // Examples:
  // - Send alerts
  // - Log to monitoring service
  // - Trigger incident response
}

/**
 * Handle generic events
 */
async function handleGenericEvent(payload: any) {
  console.log('[webhooks/cursor] Generic event:', payload);
  
  // Add your generic event handling logic here
}

/**
 * GET /api/webhooks/cursor
 * 
 * Webhook verification endpoint (for some webhook providers)
 */
export async function GET(request: NextRequest) {
  const challenge = request.nextUrl.searchParams.get('challenge');
  
  if (challenge) {
    // Some webhook providers send a challenge for verification
    return NextResponse.json({ challenge });
  }
  
  return NextResponse.json({
    status: 'active',
    endpoint: '/api/webhooks/cursor',
    timestamp: new Date().toISOString(),
  });
}
