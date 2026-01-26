/**
 * Vercel Webhook Event Handlers
 * 
 * Comprehensive handlers for all Vercel webhook event types
 * See: https://vercel.com/docs/observability/webhooks-api-reference
 */

import { addDeploymentEvent } from './status/store';

interface EventMetadata {
  eventId: string;
  createdAt: number | string;
  region: string | null;
}

// ===== DEPLOYMENT EVENT HANDLERS =====

export async function handleDeploymentCreated(payload: any, metadata: EventMetadata) {
  const eventData = {
    deploymentId: payload.deployment?.id,
    projectId: payload.project?.id || payload.projectId,
    projectName: payload.project?.name || payload.deployment?.name,
    url: payload.deployment?.url,
    target: payload.target,
    creator: payload.user?.id,
    teamId: payload.team?.id,
  };
  
  console.log('[webhooks/vercel] Deployment created:', eventData);

  // Store event for status endpoint
  addDeploymentEvent({
    eventId: metadata.eventId,
    eventType: 'deployment.created',
    deploymentId: payload.deployment?.id,
    projectId: payload.project?.id || payload.projectId,
    projectName: payload.project?.name || payload.deployment?.name,
    url: payload.deployment?.url,
    target: payload.target,
    status: 'created',
    createdAt: new Date(metadata.createdAt).toISOString(),
    region: metadata.region,
  });
}

export async function handleDeploymentReady(payload: any, metadata: EventMetadata) {
  const eventData = {
    deploymentId: payload.deployment?.id,
    projectId: payload.project?.id || payload.projectId,
    url: payload.deployment?.url,
    target: payload.target,
  };
  
  console.log('[webhooks/vercel] Deployment ready:', eventData);

  // Store event for status endpoint
  addDeploymentEvent({
    eventId: metadata.eventId,
    eventType: 'deployment.ready',
    deploymentId: payload.deployment?.id,
    projectId: payload.project?.id || payload.projectId,
    url: payload.deployment?.url,
    target: payload.target,
    status: 'ready',
    createdAt: new Date(metadata.createdAt).toISOString(),
    region: metadata.region,
  });
}

export async function handleDeploymentSucceeded(payload: any, metadata: EventMetadata) {
  const eventData = {
    deploymentId: payload.deployment?.id,
    projectId: payload.project?.id || payload.projectId,
    projectName: payload.project?.name,
    url: payload.deployment?.url,
    target: payload.target,
  };
  
  console.log('[webhooks/vercel] Deployment succeeded:', eventData);

  // Store event for status endpoint
  addDeploymentEvent({
    eventId: metadata.eventId,
    eventType: 'deployment.succeeded',
    deploymentId: payload.deployment?.id,
    projectId: payload.project?.id || payload.projectId,
    projectName: payload.project?.name,
    url: payload.deployment?.url,
    target: payload.target,
    status: 'succeeded',
    createdAt: new Date(metadata.createdAt).toISOString(),
    region: metadata.region,
  });
}

export async function handleDeploymentPrepared(payload: any, metadata: EventMetadata) {
  console.log('[webhooks/vercel] Deployment prepared:', {
    deploymentId: payload.deployment?.id,
    projectId: payload.project?.id || payload.projectId,
    url: payload.deployment?.url,
  });
}

export async function handleDeploymentPromoted(payload: any, metadata: EventMetadata) {
  console.log('[webhooks/vercel] Deployment promoted:', {
    deploymentId: payload.deployment?.id,
    projectId: payload.project?.id,
    projectName: payload.project?.name,
    url: payload.deployment?.url,
  });
}

export async function handleDeploymentError(payload: any, metadata: EventMetadata) {
  const eventData = {
    deploymentId: payload.deployment?.id,
    projectId: payload.project?.id || payload.projectId,
    projectName: payload.project?.name,
    error: payload.error,
    buildErrorAt: payload.deployment?.buildErrorAt,
  };
  
  console.error('[webhooks/vercel] Deployment error:', eventData);

  // Store event for status endpoint
  addDeploymentEvent({
    eventId: metadata.eventId,
    eventType: 'deployment.error',
    deploymentId: payload.deployment?.id,
    projectId: payload.project?.id || payload.projectId,
    projectName: payload.project?.name,
    status: 'error',
    error: payload.error,
    createdAt: new Date(metadata.createdAt).toISOString(),
    region: metadata.region,
  });

  // Send to monitoring service if configured
  if (process.env.MONITORING_WEBHOOK_URL) {
    try {
      await fetch(process.env.MONITORING_WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'deployment_error',
          project: payload.project?.name,
          deploymentId: payload.deployment?.id,
          error: payload.error,
          timestamp: new Date().toISOString(),
        }),
      });
    } catch (error) {
      console.error('[webhooks/vercel] Failed to send monitoring alert:', error);
    }
  }
}

export async function handleDeploymentCancelled(payload: any, metadata: EventMetadata) {
  const eventData = {
    deploymentId: payload.deployment?.id,
    projectId: payload.project?.id || payload.projectId,
    projectName: payload.project?.name,
  };
  
  console.log('[webhooks/vercel] Deployment cancelled:', eventData);

  // Store event for status endpoint
  addDeploymentEvent({
    eventId: metadata.eventId,
    eventType: 'deployment.canceled',
    deploymentId: payload.deployment?.id,
    projectId: payload.project?.id || payload.projectId,
    projectName: payload.project?.name,
    status: 'canceled',
    createdAt: new Date(metadata.createdAt).toISOString(),
    region: metadata.region,
  });
}

export async function handleDeploymentCleanup(payload: any, metadata: EventMetadata) {
  console.log('[webhooks/vercel] Deployment cleanup:', {
    deploymentId: payload.deployment?.id,
    projectId: payload.project?.id,
    aliases: payload.deployment?.alias,
  });
}

export async function handleDeploymentCheckRerequested(payload: any, metadata: EventMetadata) {
  console.log('[webhooks/vercel] Deployment check rerequested:', {
    deploymentId: payload.deployment?.id,
    checkId: payload.check?.id,
    userId: payload.user?.id,
  });
}

export async function handleDeploymentIntegrationActionStart(payload: any, metadata: EventMetadata) {
  console.log('[webhooks/vercel] Deployment integration action started:', {
    deploymentId: payload.deployment?.id,
    configurationId: payload.configuration?.id,
    resourceId: payload.resourceId,
    action: payload.action,
  });
}

export async function handleDeploymentIntegrationActionCancel(payload: any, metadata: EventMetadata) {
  console.log('[webhooks/vercel] Deployment integration action cancelled:', {
    deploymentId: payload.deployment?.id,
    configurationId: payload.configuration?.id,
    resourceId: payload.resourceId,
    action: payload.action,
  });
}

export async function handleDeploymentIntegrationActionCleanup(payload: any, metadata: EventMetadata) {
  console.log('[webhooks/vercel] Deployment integration action cleanup:', {
    deploymentId: payload.deployment?.id,
    configurationId: payload.configuration?.id,
    resourceId: payload.resourceId,
    action: payload.action,
  });
}

export async function handleDeploymentChecksCompleted(payload: any, metadata: EventMetadata) {
  console.log('[webhooks/vercel] Deployment checks completed:', {
    deploymentId: payload.deployment?.id,
    checks: payload.checks,
  });
}

export async function handleDeploymentChecksFailed(payload: any, metadata: EventMetadata) {
  const eventData = {
    deploymentId: payload.deployment?.id,
    projectId: payload.project?.id || payload.projectId,
    projectName: payload.project?.name,
    checks: payload.checks,
    failedChecks: payload.checks?.filter((check: any) => check.state === 'failed') || [],
  };
  
  console.error('[webhooks/vercel] Deployment checks failed:', eventData);

  // Store event for status endpoint
  addDeploymentEvent({
    eventId: metadata.eventId,
    eventType: 'deployment.checks.failed',
    deploymentId: payload.deployment?.id,
    projectId: payload.project?.id || payload.projectId,
    projectName: payload.project?.name,
    status: 'checks_failed',
    error: { failedChecks: eventData.failedChecks },
    createdAt: new Date(metadata.createdAt).toISOString(),
    region: metadata.region,
  });

  // Send to monitoring service if configured
  if (process.env.MONITORING_WEBHOOK_URL) {
    try {
      await fetch(process.env.MONITORING_WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'deployment_checks_failed',
          project: payload.project?.name,
          deploymentId: payload.deployment?.id,
          failedChecks: eventData.failedChecks,
          timestamp: new Date().toISOString(),
        }),
      });
    } catch (error) {
      console.error('[webhooks/vercel] Failed to send monitoring alert:', error);
    }
  }
}

export async function handleDeploymentChecksSucceeded(payload: any, metadata: EventMetadata) {
  const eventData = {
    deploymentId: payload.deployment?.id,
    projectId: payload.project?.id || payload.projectId,
    projectName: payload.project?.name,
    checks: payload.checks,
  };
  
  console.log('[webhooks/vercel] Deployment checks succeeded:', eventData);

  // Store event for status endpoint
  addDeploymentEvent({
    eventId: metadata.eventId,
    eventType: 'deployment.checks.succeeded',
    deploymentId: payload.deployment?.id,
    projectId: payload.project?.id || payload.projectId,
    projectName: payload.project?.name,
    status: 'checks_succeeded',
    createdAt: new Date(metadata.createdAt).toISOString(),
    region: metadata.region,
  });
}

export async function handleDeploymentCheckrunStart(payload: any, metadata: EventMetadata) {
  console.log('[webhooks/vercel] Deployment checkrun started:', {
    deploymentId: payload.deployment?.id,
    checkId: payload.check?.id,
    checkName: payload.check?.name,
    checkType: payload.check?.type,
  });
}

export async function handleDeploymentCheckrunCancel(payload: any, metadata: EventMetadata) {
  console.log('[webhooks/vercel] Deployment checkrun cancelled:', {
    deploymentId: payload.deployment?.id,
    checkId: payload.check?.id,
    checkName: payload.check?.name,
    userId: payload.user?.id,
  });
}

// ===== PROJECT EVENT HANDLERS =====

export async function handleProjectCreated(payload: any, metadata: EventMetadata) {
  console.log('[webhooks/vercel] Project created:', {
    projectId: payload.project?.id,
    projectName: payload.project?.name,
    userId: payload.user?.id,
    teamId: payload.team?.id,
  });
}

export async function handleProjectRemoved(payload: any, metadata: EventMetadata) {
  console.log('[webhooks/vercel] Project removed:', {
    projectId: payload.project?.id,
    projectName: payload.project?.name,
    userId: payload.user?.id,
    teamId: payload.team?.id,
  });
}

export async function handleProjectRenamed(payload: any, metadata: EventMetadata) {
  console.log('[webhooks/vercel] Project renamed:', {
    projectId: payload.project?.id,
    previousName: payload.previousName,
    newName: payload.project?.name,
    userId: payload.user?.id,
  });
}

export async function handleProjectDomainCreated(payload: any, metadata: EventMetadata) {
  console.log('[webhooks/vercel] Project domain created:', {
    projectId: payload.project?.id,
    domainName: payload.domain?.name,
  });
}

export async function handleProjectDomainDeleted(payload: any, metadata: EventMetadata) {
  console.log('[webhooks/vercel] Project domain deleted:', {
    projectId: payload.project?.id,
    domainName: payload.domain?.name,
  });
}

export async function handleProjectDomainMoved(payload: any, metadata: EventMetadata) {
  console.log('[webhooks/vercel] Project domain moved:', {
    domainName: payload.domain?.name,
    fromProjectId: payload.from?.projectId,
    toProjectId: payload.to?.projectId,
    isRedirect: payload.isRedirect,
  });
}

export async function handleProjectDomainUpdated(payload: any, metadata: EventMetadata) {
  console.log('[webhooks/vercel] Project domain updated:', {
    projectId: payload.project?.id,
    previous: payload.previous,
    next: payload.next,
  });
}

export async function handleProjectDomainVerified(payload: any, metadata: EventMetadata) {
  console.log('[webhooks/vercel] Project domain verified:', {
    projectId: payload.project?.id,
    domainName: payload.domain?.name,
  });
}

export async function handleProjectDomainUnverified(payload: any, metadata: EventMetadata) {
  console.log('[webhooks/vercel] Project domain unverified:', {
    projectId: payload.project?.id,
    domainName: payload.domain?.name,
  });
}

export async function handleRollingReleaseStarted(payload: any, metadata: EventMetadata) {
  console.log('[webhooks/vercel] Rolling release started:', {
    projectId: payload.project?.id,
    projectName: payload.project?.name,
    rollingRelease: payload.rollingRelease,
  });
}

export async function handleRollingReleaseApproved(payload: any, metadata: EventMetadata) {
  console.log('[webhooks/vercel] Rolling release approved:', {
    projectId: payload.project?.id,
    projectName: payload.project?.name,
    rollingRelease: payload.rollingRelease,
  });
}

export async function handleRollingReleaseCompleted(payload: any, metadata: EventMetadata) {
  console.log('[webhooks/vercel] Rolling release completed:', {
    projectId: payload.project?.id,
    projectName: payload.project?.name,
    rollingRelease: payload.rollingRelease,
  });
}

export async function handleRollingReleaseAborted(payload: any, metadata: EventMetadata) {
  console.log('[webhooks/vercel] Rolling release aborted:', {
    projectId: payload.project?.id,
    projectName: payload.project?.name,
    rollingRelease: payload.rollingRelease,
  });
}

// ===== DOMAIN EVENT HANDLERS =====

export async function handleDomainCreated(payload: any, metadata: EventMetadata) {
  console.log('[webhooks/vercel] Domain created:', {
    domainName: payload.domain?.name,
    delegated: payload.domain?.delegated,
  });
}

export async function handleDomainRenewal(payload: any, metadata: EventMetadata) {
  console.log('[webhooks/vercel] Domain renewal:', {
    domainName: payload.domain?.name,
    price: payload.price,
    expirationDate: payload.expirationDate,
    renewedAt: payload.renewedAt,
  });
}

export async function handleDomainRenewalFailed(payload: any, metadata: EventMetadata) {
  console.error('[webhooks/vercel] Domain renewal failed:', {
    domainName: payload.domain?.name,
    errorReason: payload.errorReason,
    failedAt: payload.failedAt,
  });
}

export async function handleDomainCertificateAdd(payload: any, metadata: EventMetadata) {
  console.log('[webhooks/vercel] Domain certificate added:', {
    cert: payload.cert,
  });
}

export async function handleDomainCertificateAddFailed(payload: any, metadata: EventMetadata) {
  console.error('[webhooks/vercel] Domain certificate add failed:', {
    dnsNames: payload.dnsNames,
  });
}

export async function handleDomainCertificateRenew(payload: any, metadata: EventMetadata) {
  console.log('[webhooks/vercel] Domain certificate renewed:', {
    cert: payload.cert,
  });
}

export async function handleDomainCertificateRenewFailed(payload: any, metadata: EventMetadata) {
  console.error('[webhooks/vercel] Domain certificate renew failed:', {
    dnsNames: payload.dnsNames,
  });
}

export async function handleDomainCertificateDeleted(payload: any, metadata: EventMetadata) {
  console.log('[webhooks/vercel] Domain certificate deleted:', {
    cert: payload.cert,
  });
}

export async function handleDomainDnsRecordsChanged(payload: any, metadata: EventMetadata) {
  console.log('[webhooks/vercel] Domain DNS records changed:', {
    zone: payload.zone,
    changes: payload.changes,
  });
}

export async function handleDomainAutoRenewChanged(payload: any, metadata: EventMetadata) {
  console.log('[webhooks/vercel] Domain auto-renew changed:', {
    domainName: payload.domain?.name,
    previous: payload.previous,
    next: payload.next,
  });
}

export async function handleDomainTransferInStarted(payload: any, metadata: EventMetadata) {
  console.log('[webhooks/vercel] Domain transfer in started:', {
    domainName: payload.domain?.name,
  });
}

export async function handleDomainTransferInCompleted(payload: any, metadata: EventMetadata) {
  console.log('[webhooks/vercel] Domain transfer in completed:', {
    domainName: payload.domain?.name,
  });
}

export async function handleDomainTransferInFailed(payload: any, metadata: EventMetadata) {
  console.error('[webhooks/vercel] Domain transfer in failed:', {
    domainName: payload.domain?.name,
  });
}

// ===== INTEGRATION EVENT HANDLERS =====

export async function handleIntegrationPermissionUpgraded(payload: any, metadata: EventMetadata) {
  console.log('[webhooks/vercel] Integration permission upgraded:', {
    configurationId: payload.configuration?.id,
    projectSelection: payload.configuration?.projectSelection,
    projectsAdded: payload.projects?.added,
    projectsRemoved: payload.projects?.removed,
  });
}

export async function handleIntegrationConfigurationRemoved(payload: any, metadata: EventMetadata) {
  console.log('[webhooks/vercel] Integration configuration removed:', {
    configurationId: payload.configuration?.id,
    projects: payload.configuration?.projects,
  });
}

export async function handleIntegrationScopeChangeConfirmed(payload: any, metadata: EventMetadata) {
  console.log('[webhooks/vercel] Integration scope change confirmed:', {
    configurationId: payload.configuration?.id,
    scopes: payload.configuration?.scopes,
  });
}

export async function handleIntegrationConfigurationTransferred(payload: any, metadata: EventMetadata) {
  console.log('[webhooks/vercel] Integration configuration transferred:', {
    configurationId: payload.configuration?.id,
    previousTeamId: payload.previousTeamId,
    newTeamId: payload.newTeamId,
  });
}

export async function handleIntegrationResourceProjectConnected(payload: any, metadata: EventMetadata) {
  console.log('[webhooks/vercel] Integration resource project connected:', {
    configurationId: payload.configuration?.id,
    resourceId: payload.resourceId,
    projectId: payload.project?.id,
    projectName: payload.project?.name,
    targets: payload.targets,
  });
}

export async function handleIntegrationResourceProjectDisconnected(payload: any, metadata: EventMetadata) {
  console.log('[webhooks/vercel] Integration resource project disconnected:', {
    configurationId: payload.configuration?.id,
    resourceId: payload.resourceId,
    projectId: payload.project?.id,
  });
}

// ===== MARKETPLACE EVENT HANDLERS =====

export async function handleMarketplaceInvoiceCreated(payload: any, metadata: EventMetadata) {
  console.log('[webhooks/vercel] Marketplace invoice created:', {
    configurationId: payload.configuration?.id,
    invoiceId: payload.invoiceId,
    externalInvoiceId: payload.externalInvoiceId,
    invoiceTotal: payload.invoiceTotal,
    period: payload.period,
  });
}

export async function handleMarketplaceInvoicePaid(payload: any, metadata: EventMetadata) {
  console.log('[webhooks/vercel] Marketplace invoice paid:', {
    configurationId: payload.configuration?.id,
    invoiceId: payload.invoiceId,
    invoiceTotal: payload.invoiceTotal,
  });
}

export async function handleMarketplaceInvoiceNotPaid(payload: any, metadata: EventMetadata) {
  console.warn('[webhooks/vercel] Marketplace invoice not paid:', {
    configurationId: payload.configuration?.id,
    invoiceId: payload.invoiceId,
    invoiceTotal: payload.invoiceTotal,
  });
}

export async function handleMarketplaceInvoiceRefunded(payload: any, metadata: EventMetadata) {
  console.log('[webhooks/vercel] Marketplace invoice refunded:', {
    configurationId: payload.configuration?.id,
    invoiceId: payload.invoiceId,
    amount: payload.amount,
    reason: payload.reason,
  });
}

export async function handleMarketplaceMemberChanged(payload: any, metadata: EventMetadata) {
  console.log('[webhooks/vercel] Marketplace member changed:', {
    configurationId: payload.configuration?.id,
    memberId: payload.memberId,
    role: payload.role,
    userEmail: payload.userEmail,
  });
}

// ===== ALERTS EVENT HANDLERS =====

export async function handleAlertsTriggered(payload: any, metadata: EventMetadata) {
  console.warn('[webhooks/vercel] Alert triggered:', {
    teamId: payload.teamId,
    projectId: payload.projectId,
    projectSlug: payload.projectSlug,
    startedAt: payload.startedAt,
    alerts: payload.alerts,
    links: payload.links,
  });

  // Send to monitoring service if configured
  if (process.env.MONITORING_WEBHOOK_URL) {
    try {
      await fetch(process.env.MONITORING_WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'vercel_alert',
          projectId: payload.projectId,
          projectSlug: payload.projectSlug,
          alerts: payload.alerts,
          timestamp: new Date().toISOString(),
        }),
      });
    } catch (error) {
      console.error('[webhooks/vercel] Failed to send alert notification:', error);
    }
  }
}

// ===== GENERIC HANDLER =====

export async function handleGenericEvent(
  eventType: string,
  payload: any,
  metadata: EventMetadata
) {
  console.log('[webhooks/vercel] Generic/unhandled event:', {
    eventType,
    payload: JSON.stringify(payload).substring(0, 500),
  });
}
