/**
 * SRE Logic for Vercel Webhooks
 *
 * Implements the Vercel Deployment SRE assistant logic:
 * - Parsing and classifying severity
 * - Correlating events
 * - Detecting failure patterns
 * - Providing root cause analysis and remediation
 * - Generating GitHub incident reports
 */

export type Severity = 'INFO' | 'WARNING' | 'CRITICAL';

export interface SREAnalysis {
  timestamp: string;
  severity: Severity;
  eventSummary: string;
  impact: string;
  probableCause: string;
  checksToRun: string[];
  immediateFix: string;
  rollbackDecision: string;
  preventiveActions: string[];
  githubCommentDraft: string;
  freshDeployRecommendation?: string;
}

export interface WebhookEventPayload {
  id: string;
  type: string; // e.g. deployment.error
  createdAt: number;
  payload: any;
  region?: string;
}

/**
 * Main entry point to analyze a Vercel webhook event
 */
export function analyzeEvent(eventType: string, payload: any): SREAnalysis {
  const severity = classifySeverity(eventType, payload);
  const timestamp = new Date().toISOString(); // Current analysis time (IST/UTC handling is usually done at display/log time, but we store ISO)

  let analysis: Partial<SREAnalysis> = {
    timestamp,
    severity,
  };

  switch (eventType) {
    case 'deployment.error':
      analysis = { ...analysis, ...analyzeDeploymentError(payload) };
      break;
    case 'deployment.checks.failed':
      analysis = { ...analysis, ...analyzeChecksFailed(payload) };
      break;
    case 'deployment.canceled':
      analysis = { ...analysis, ...analyzeDeploymentCanceled(payload) };
      break;
    case 'domain.renewal.failed':
    case 'domain.certificate.add.failed':
    case 'domain.certificate.renew.failed':
      analysis = { ...analysis, ...analyzeDomainFailure(eventType, payload) };
      break;
    case 'firewall-attack-blocked':
    case 'attack.detected': // Mapping for user prompt
      analysis = { ...analysis, ...analyzeAttackDetected(payload) };
      break;
    case 'alerts.triggered':
      analysis = { ...analysis, ...analyzeAlertsTriggered(payload) };
      break;
    default:
      analysis = { ...analysis, ...analyzeGenericEvent(eventType, payload) };
  }

  // Ensure all fields are populated with defaults if missing
  return {
    timestamp: analysis.timestamp || new Date().toISOString(),
    severity: analysis.severity || 'INFO',
    eventSummary: analysis.eventSummary || `Event ${eventType} received.`,
    impact: analysis.impact || 'None or unknown impact.',
    probableCause: analysis.probableCause || 'Routine operation or unknown cause.',
    checksToRun: analysis.checksToRun || ['Check Vercel Dashboard for details.'],
    immediateFix: analysis.immediateFix || 'No immediate action required.',
    rollbackDecision: analysis.rollbackDecision || 'N/A',
    preventiveActions: analysis.preventiveActions || ['Monitor for recurrence.'],
    githubCommentDraft: analysis.githubCommentDraft || `**Event:** ${eventType}\nStatus: Processed`,
    freshDeployRecommendation: analysis.freshDeployRecommendation,
  };
}

function classifySeverity(eventType: string, payload: any): Severity {
  if (
    eventType === 'deployment.error' ||
    eventType === 'domain.renewal.failed' ||
    eventType.includes('certificate.add.failed') ||
    eventType.includes('certificate.renew.failed') ||
    eventType === 'firewall-attack-blocked' ||
    eventType === 'attack.detected'
  ) {
    return 'CRITICAL';
  }

  if (
    eventType === 'deployment.checks.failed' ||
    eventType === 'alerts.triggered' ||
    eventType === 'domain.transfer.in.failed'
  ) {
    return 'WARNING';
  }

  return 'INFO';
}

function analyzeDeploymentError(payload: any): Partial<SREAnalysis> {
  const deployment = payload.deployment || {};
  const error = payload.error || {};
  const projectId = payload.project?.id || 'unknown';
  const commit = deployment.meta?.githubCommitSha || 'unknown';

  // Heuristics for probable cause
  let probableCause = 'Unknown build error.';
  let immediateFix = 'Check build logs.';
  let checks = ['View Build Logs in Vercel Dashboard'];
  let preventions = ['Review recent code changes.'];

  if (error.code === 'BUILD_FAILED') {
    probableCause = 'Build script failed (exit code non-zero). Likely compilation error or dependency issue.';
    immediateFix = 'Fix compilation errors in recent commit.';
    checks.push('Run `npm run build` locally.');
    preventions.push('Add pre-commit build check.');
  } else if (JSON.stringify(payload).includes('env')) { // Loose check for env var issues
    probableCause = 'Missing or invalid environment variable.';
    immediateFix = 'Verify Environment Variables in Vercel Settings.';
    checks.push('Check `.env.local` vs Production Env Vars.');
  }

  const impact = 'Production deployment halted. Previous version remains live (Atomic Deployments).';
  const rollbackDecision = 'No rollback needed (deployment failed before going live).';

  const githubComment = `
### 🚨 Deployment Failed
**Commit:** ${commit}
**Error Code:** ${error.code || 'Unknown'}
**Message:** ${error.message || 'No message provided'}

**Analysis:**
- **Cause:** ${probableCause}
- **Fix:** ${immediateFix}

[View Logs](${deployment.url || 'https://vercel.com'})
`;

  return {
    eventSummary: `Deployment ${deployment.id} failed with error: ${error.message}`,
    impact,
    probableCause,
    checksToRun: checks,
    immediateFix,
    rollbackDecision,
    preventiveActions: preventions,
    githubCommentDraft: githubComment,
  };
}

function analyzeChecksFailed(payload: any): Partial<SREAnalysis> {
  const checks = payload.checks || [];
  const failedChecks = checks.filter((c: any) => c.status === 'completed' && c.conclusion === 'failure');
  const failedNames = failedChecks.map((c: any) => c.name).join(', ');

  return {
    eventSummary: `Deployment checks failed: ${failedNames}`,
    impact: 'Deployment may be unsafe to promote. Potential regression.',
    probableCause: `Failed checks: ${failedNames}. Likely linting, testing, or performance regression.`,
    checksToRun: ['Run tests locally (`npm test`)', 'Run linter (`npm run lint`)'],
    immediateFix: 'Fix the failing tests or lint errors.',
    rollbackDecision: 'N/A (Deployment not yet promoted).',
    preventiveActions: ['Update CI pipeline to catch these earlier.'],
    githubCommentDraft: `
### ⚠️ Checks Failed
The following checks failed during deployment:
- ${failedNames}

Please investigate before merging/promoting.
`,
  };
}

function analyzeDeploymentCanceled(payload: any): Partial<SREAnalysis> {
    return {
        eventSummary: `Deployment ${payload.deployment?.id} was canceled.`,
        impact: 'Deployment stopped by user or system.',
        probableCause: 'Manual cancellation or newer commit pushed immediately.',
        checksToRun: ['Check if a newer deployment is in progress.'],
        immediateFix: 'No action required if superseded.',
        rollbackDecision: 'N/A',
        preventiveActions: [],
        githubCommentDraft: `**Note:** Deployment canceled.`,
    };
}


function analyzeDomainFailure(eventType: string, payload: any): Partial<SREAnalysis> {
  const domain = payload.domain?.name || 'unknown';
  const isRenewal = eventType.includes('renewal');
  const isCert = eventType.includes('certificate');

  return {
    eventSummary: `Domain/Certificate failure for ${domain}: ${eventType}`,
    impact: 'Site may become inaccessible or show security warnings (SSL error).',
    probableCause: isRenewal ? 'Payment failure or registrar issue.' : 'CAA record blocking issuance or validation failure.',
    checksToRun: ['Check Vercel Domains tab', 'Verify DNS configuration', 'Check Payment Method'],
    immediateFix: 'Renew manually or update payment method. Verify DNS.',
    rollbackDecision: 'N/A',
    preventiveActions: ['Enable auto-renewal', 'Monitor expiration dates.'],
    githubCommentDraft: `
### 🚨 CRITICAL: Domain Issue
**Domain:** ${domain}
**Event:** ${eventType}

**Action Required:** Verify domain status in Vercel Dashboard immediately.
`,
  };
}

function analyzeAttackDetected(payload: any): Partial<SREAnalysis> {
  // Assuming payload structure for firewall-attack-blocked
  const attackType = payload.attack?.type || 'Unknown'; // e.g., 'ddos', 'rule'
  const ip = payload.attack?.ip || 'Unknown';

  return {
    eventSummary: `Attack detected and blocked: ${attackType} from IP ${ip}`,
    impact: 'Malicious traffic blocked. legitimate traffic likely unaffected.',
    probableCause: 'DDoS attempt or scraping bot.',
    checksToRun: ['Check Firewall Logs', 'Analyze traffic patterns'],
    immediateFix: 'None required (blocked). Consider tightening WAF rules if frequent.',
    rollbackDecision: 'N/A',
    preventiveActions: ['Review WAF rules', 'Enable "Under Attack Mode" if severe.'],
    githubCommentDraft: `
### 🛡️ Security Alert
**Attack Blocked:** ${attackType}
**Source:** ${ip}
`,
  };
}

function analyzeAlertsTriggered(payload: any): Partial<SREAnalysis> {
    const alerts = payload.alerts || [];
    const alertNames = alerts.map((a: any) => a.name || 'Unknown Alert').join(', ');

    return {
        eventSummary: `Monitoring alerts triggered: ${alertNames}`,
        impact: 'Performance degradation or error spike detected.',
        probableCause: 'High traffic, memory leak, or increased error rate.',
        checksToRun: ['Check Application Logs', 'Check Analytics'],
        immediateFix: 'Scale resources or revert recent problematic deployment.',
        rollbackDecision: 'Consider rollback if error rate is critical.',
        preventiveActions: ['Optimize code', 'Increase resources'],
        githubCommentDraft: `
### ⚠️ Alerts Triggered
**Alerts:** ${alertNames}

Please investigate application performance.
`,
    };
}

function analyzeGenericEvent(eventType: string, payload: any): Partial<SREAnalysis> {
    return {
        eventSummary: `Received event: ${eventType}`,
        impact: 'Operational event.',
        probableCause: 'Routine platform activity.',
    };
}
