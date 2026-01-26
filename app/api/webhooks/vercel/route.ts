import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import * as handlers from './handlers';

/**
 * POST /api/webhooks/vercel
 * 
 * Webhook handler for Vercel webhook events
 * 
 * SECURITY: All requests are verified using HMAC SHA-1 signature verification.
 * The x-vercel-signature header must match the computed signature, or the
 * request will be rejected with HTTP 401.
 * 
 * Signature Algorithm: HMAC-SHA1(VERCEL_WEBHOOK_SECRET, raw_request_body)
 * 
 * Webhook Configuration in Vercel Dashboard:
 * - Go to Settings ➞ Webhooks
 * - Endpoint URL: https://www.drsayuj.info/api/webhooks/vercel
 * - Select events: Deployment Created, Deployment Succeeded, Deployment Error, etc.
 * - Secret: 7kotLjQYI1JAoYN3ClNxTmbq (set as VERCEL_WEBHOOK_SECRET environment variable)
 * 
 * Event Types Supported (see Vercel Webhooks API Reference):
 * 
 * Deployment Events:
 * - deployment.created, deployment.ready, deployment.succeeded
 * - deployment.promoted, deployment.error, deployment.canceled
 * - deployment.cleanup, deployment.check-rerequested
 * - deployment.checks.failed, deployment.checks.succeeded
 * - deployment.checkrun.start, deployment.checkrun.cancel
 * - deployment.integration.action.start/cancel/cleanup
 * 
 * Project Events:
 * - project.created, project.removed, project.renamed
 * - project.domain-created/deleted/moved/updated/verified/unverified
 * - project.rolling-release.started/approved/completed/aborted
 * 
 * Domain Events:
 * - domain.created, domain.renewal, domain.renewal-failed
 * - domain.certificate-add/renew/delete/failed
 * - domain.dns-records-changed, domain.auto-renew-changed
 * - domain.transfer-in-started/completed/failed
 * 
 * Integration Events:
 * - integration-configuration.permission-upgraded/removed
 * - integration-configuration.scope-change-confirmed/transferred
 * - integration-resource.project-connected/disconnected
 * 
 * Marketplace Events:
 * - marketplace.invoice.created/paid/notpaid/refunded
 * - marketplace.member.changed
 * 
 * Other Events:
 * - alerts.triggered
 * 
 * Legacy Events (deprecated but still supported):
 * - deployment, deployment-ready, deployment-prepared
 * - deployment-canceled, deployment-error
 * - project-created, project-removed
 * - integration-configuration-removed, etc.
 */
export async function POST(request: NextRequest) {
  try {
    // Get webhook secret from environment
    // Secret: 7kotLjQYI1JAoYN3ClNxTmbq (set as VERCEL_WEBHOOK_SECRET)
    // Support both VERCEL_WEBHOOK_SECRET and WEBHOOK_SECRET for compatibility
    const webhookSecret = process.env.VERCEL_WEBHOOK_SECRET || process.env.WEBHOOK_SECRET;
    
    // SECURITY: Require webhook secret
    if (!webhookSecret) {
      console.error('[webhooks/vercel] Webhook secret not configured - rejecting request');
      return NextResponse.json(
        { error: 'Webhook secret not configured' },
        { status: 500 }
      );
    }

    // Get signature from headers
    const signature = request.headers.get('x-vercel-signature');
    
    // SECURITY: Require signature header
    if (!signature) {
      console.error('[webhooks/vercel] Missing x-vercel-signature header');
      return NextResponse.json(
        { error: 'Missing signature header' },
        { status: 401 }
      );
    }
    
    // Read raw body for signature verification (must be done before parsing JSON)
    // This matches Vercel's recommended pattern: const payload = await req.text();
    const rawPayload = await request.text();
    
    // SECURITY: Verify webhook signature using Vercel's recommended method
    // Pattern: HMAC-SHA1(secret, payload) → hex digest
    // Reference: https://vercel.com/docs/observability/webhooks-api-reference#securing-webhooks
    const isValid = await verifySignature(rawPayload, signature, webhookSecret);
    
    if (!isValid) {
      console.error('[webhooks/vercel] Invalid signature - request rejected');
      return NextResponse.json(
        { error: 'Invalid signature' },
        { status: 401 }
      );
    }
    
    console.log('[webhooks/vercel] Signature verified successfully');

    // Parse payload (after signature verification)
    let payload: any;
    try {
      payload = JSON.parse(rawPayload);
    } catch (error) {
      console.error('[webhooks/vercel] Invalid JSON payload:', error);
      return NextResponse.json(
        { error: 'Invalid JSON payload' },
        { status: 400 }
      );
    }

    // Extract event information
    const eventId = payload.id;
    const eventType = payload.type;
    const createdAt = payload.createdAt;
    const eventPayload = payload.payload;
    const region = payload.region;

    console.log('[webhooks/vercel] Received webhook:', {
      eventId,
      eventType,
      createdAt: new Date(createdAt).toISOString(),
      region,
      payloadKeys: eventPayload ? Object.keys(eventPayload) : [],
    });

    // Process webhook based on event type
    await handleVercelEvent(eventType, eventPayload, {
      eventId,
      createdAt,
      region,
    });

    // Return success response
    return NextResponse.json(
      { 
        status: 'success',
        received: true,
        eventType,
        eventId,
        timestamp: new Date().toISOString(),
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('[webhooks/vercel] Error processing webhook:', error);
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
 * Verify Vercel webhook signature
 * 
 * Implements Vercel's recommended signature verification pattern:
 * https://vercel.com/docs/observability/webhooks-api-reference#securing-webhooks
 * 
 * Pattern: HMAC-SHA1(secret, payload) → hex digest
 * 
 * SECURITY: Uses constant-time comparison to prevent timing attacks
 * 
 * @param payload - The raw request body as a string
 * @param signature - The x-vercel-signature header value
 * @param secret - The webhook secret (7kotLjQYI1JAoYN3ClNxTmbq)
 * @returns true if signature is valid, false otherwise
 */
async function verifySignature(
  payload: string,
  signature: string,
  secret: string
): Promise<boolean> {
  try {
    // Compute expected signature using Vercel's exact pattern:
    // crypto.createHmac('sha1', secret).update(payload).digest('hex')
    const expectedSignature = crypto
      .createHmac('sha1', secret)
      .update(payload)
      .digest('hex');

    // SECURITY: Use constant-time comparison to prevent timing attacks
    // Even though Vercel's example uses direct comparison, we use
    // constant-time comparison for enhanced security
    
    // Both signatures are hex strings
    let signatureBuffer: Buffer;
    let expectedBuffer: Buffer;
    
    try {
      signatureBuffer = Buffer.from(signature, 'hex');
      expectedBuffer = Buffer.from(expectedSignature, 'hex');
    } catch (error) {
      // Signature is not valid hex - reject immediately
      console.error('[webhooks/vercel] Signature is not valid hex:', error);
      return false;
    }
    
    // Length check first (before constant-time comparison)
    if (signatureBuffer.length !== expectedBuffer.length) {
      return false;
    }
    
    // Constant-time comparison to prevent timing attacks
    // This is more secure than direct string comparison
    return crypto.timingSafeEqual(signatureBuffer, expectedBuffer);
    
    // Alternative: Direct comparison (as shown in Vercel docs)
    // return signature === expectedSignature;
    // We use constant-time comparison for better security
  } catch (error) {
    console.error('[webhooks/vercel] Signature verification error:', error);
    // On any error, reject the request for security
    return false;
  }
}

/**
 * Handle Vercel webhook events
 */
async function handleVercelEvent(
  eventType: string,
  payload: any,
  metadata: { eventId: string; createdAt: number | string; region: string | null }
) {
  // Normalize event type (handle both new and legacy formats)
  // Convert dashes to dots for consistent matching
  const normalizedType = eventType.replace(/-/g, '.');

  switch (normalizedType) {
    // ===== DEPLOYMENT EVENTS =====
    case 'deployment.created':
    case 'deployment': // Legacy
      await handlers.handleDeploymentCreated(payload, metadata);
      break;
    
    case 'deployment.ready':
      await handlers.handleDeploymentReady(payload, metadata);
      break;
    
    case 'deployment.succeeded':
    case 'deployment.ready': // Legacy alias
      await handlers.handleDeploymentSucceeded(payload, metadata);
      break;
    
    case 'deployment.prepared': // Legacy
      await handlers.handleDeploymentPrepared(payload, metadata);
      break;
    
    case 'deployment.promoted':
      await handlers.handleDeploymentPromoted(payload, metadata);
      break;
    
    case 'deployment.error':
    case 'deployment.error': // Legacy
      await handlers.handleDeploymentError(payload, metadata);
      break;
    
    case 'deployment.canceled':
    case 'deployment.cancelled': // Alternative spelling
      await handlers.handleDeploymentCancelled(payload, metadata);
      break;
    
    case 'deployment.cleanup':
      await handlers.handleDeploymentCleanup(payload, metadata);
      break;
    
    case 'deployment.check.rerequested':
      await handlers.handleDeploymentCheckRerequested(payload, metadata);
      break;
    
    case 'deployment.checks.failed':
      await handlers.handleDeploymentChecksFailed(payload, metadata);
      break;
    
    case 'deployment.checks.succeeded':
      await handlers.handleDeploymentChecksSucceeded(payload, metadata);
      break;
    
    case 'deployment.checkrun.start':
      await handlers.handleDeploymentCheckrunStart(payload, metadata);
      break;
    
    case 'deployment.checkrun.cancel':
      await handlers.handleDeploymentCheckrunCancel(payload, metadata);
      break;
    
    case 'deployment.integration.action.start':
      await handlers.handleDeploymentIntegrationActionStart(payload, metadata);
      break;
    
    case 'deployment.integration.action.cancel':
      await handlers.handleDeploymentIntegrationActionCancel(payload, metadata);
      break;
    
    case 'deployment.integration.action.cleanup':
      await handlers.handleDeploymentIntegrationActionCleanup(payload, metadata);
      break;

    // ===== PROJECT EVENTS =====
    case 'project.created':
      await handlers.handleProjectCreated(payload, metadata);
      break;
    
    case 'project.removed':
      await handlers.handleProjectRemoved(payload, metadata);
      break;
    
    case 'project.renamed':
      await handlers.handleProjectRenamed(payload, metadata);
      break;
    
    case 'project.domain.created':
      await handlers.handleProjectDomainCreated(payload, metadata);
      break;
    
    case 'project.domain.deleted':
      await handlers.handleProjectDomainDeleted(payload, metadata);
      break;
    
    case 'project.domain.moved':
      await handlers.handleProjectDomainMoved(payload, metadata);
      break;
    
    case 'project.domain.updated':
      await handlers.handleProjectDomainUpdated(payload, metadata);
      break;
    
    case 'project.domain.verified':
      await handlers.handleProjectDomainVerified(payload, metadata);
      break;
    
    case 'project.domain.unverified':
      await handlers.handleProjectDomainUnverified(payload, metadata);
      break;
    
    case 'project.rolling.release.started':
      await handlers.handleRollingReleaseStarted(payload, metadata);
      break;
    
    case 'project.rolling.release.approved':
      await handlers.handleRollingReleaseApproved(payload, metadata);
      break;
    
    case 'project.rolling.release.completed':
      await handlers.handleRollingReleaseCompleted(payload, metadata);
      break;
    
    case 'project.rolling.release.aborted':
      await handlers.handleRollingReleaseAborted(payload, metadata);
      break;

    // ===== DOMAIN EVENTS =====
    case 'domain.created':
      await handlers.handleDomainCreated(payload, metadata);
      break;
    
    case 'domain.renewal':
      await handlers.handleDomainRenewal(payload, metadata);
      break;
    
    case 'domain.renewal.failed':
      await handlers.handleDomainRenewalFailed(payload, metadata);
      break;
    
    case 'domain.certificate.add':
      await handlers.handleDomainCertificateAdd(payload, metadata);
      break;
    
    case 'domain.certificate.add.failed':
      await handlers.handleDomainCertificateAddFailed(payload, metadata);
      break;
    
    case 'domain.certificate.renew':
      await handlers.handleDomainCertificateRenew(payload, metadata);
      break;
    
    case 'domain.certificate.renew.failed':
      await handlers.handleDomainCertificateRenewFailed(payload, metadata);
      break;
    
    case 'domain.certificate.deleted':
      await handlers.handleDomainCertificateDeleted(payload, metadata);
      break;
    
    case 'domain.dns.records.changed':
      await handlers.handleDomainDnsRecordsChanged(payload, metadata);
      break;
    
    case 'domain.auto.renew.changed':
      await handlers.handleDomainAutoRenewChanged(payload, metadata);
      break;
    
    case 'domain.transfer.in.started':
      await handlers.handleDomainTransferInStarted(payload, metadata);
      break;
    
    case 'domain.transfer.in.completed':
      await handlers.handleDomainTransferInCompleted(payload, metadata);
      break;
    
    case 'domain.transfer.in.failed':
      await handlers.handleDomainTransferInFailed(payload, metadata);
      break;

    // ===== INTEGRATION EVENTS =====
    case 'integration.configuration.permission.upgraded':
      await handlers.handleIntegrationPermissionUpgraded(payload, metadata);
      break;
    
    case 'integration.configuration.removed':
      await handlers.handleIntegrationConfigurationRemoved(payload, metadata);
      break;
    
    case 'integration.configuration.scope.change.confirmed':
      await handlers.handleIntegrationScopeChangeConfirmed(payload, metadata);
      break;
    
    case 'integration.configuration.transferred':
      await handlers.handleIntegrationConfigurationTransferred(payload, metadata);
      break;
    
    case 'integration.resource.project.connected':
      await handlers.handleIntegrationResourceProjectConnected(payload, metadata);
      break;
    
    case 'integration.resource.project.disconnected':
      await handlers.handleIntegrationResourceProjectDisconnected(payload, metadata);
      break;

    // ===== MARKETPLACE EVENTS =====
    case 'marketplace.invoice.created':
      await handlers.handleMarketplaceInvoiceCreated(payload, metadata);
      break;
    
    case 'marketplace.invoice.paid':
      await handlers.handleMarketplaceInvoicePaid(payload, metadata);
      break;
    
    case 'marketplace.invoice.notpaid':
      await handlers.handleMarketplaceInvoiceNotPaid(payload, metadata);
      break;
    
    case 'marketplace.invoice.refunded':
      await handlers.handleMarketplaceInvoiceRefunded(payload, metadata);
      break;
    
    case 'marketplace.member.changed':
      await handlers.handleMarketplaceMemberChanged(payload, metadata);
      break;

    // ===== ALERTS =====
    case 'alerts.triggered':
      await handlers.handleAlertsTriggered(payload, metadata);
      break;

    // ===== LEGACY EVENTS =====
    case 'deployment.checks.completed': // Deprecated - use deployment.checks.succeeded/failed
      await handlers.handleDeploymentChecksCompleted(payload, metadata);
      break;

    default:
      console.log('[webhooks/vercel] Unhandled event type:', eventType);
      await handlers.handleGenericEvent(eventType, payload, metadata);
  }
}

// All event handlers are now in ./handlers.ts

/**
 * GET /api/webhooks/vercel
 * 
 * Webhook verification endpoint (for some webhook providers)
 */
export async function GET(request: NextRequest) {
  return NextResponse.json({
    status: 'ok',
    endpoint: '/api/webhooks/vercel',
    message: 'Vercel webhook endpoint is ready',
    timestamp: new Date().toISOString(),
  });
}
