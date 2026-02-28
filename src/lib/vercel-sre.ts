/**
 * Vercel Deployment SRE Assistant
 *
 * Logic for analyzing webhook events and generating actionable reports.
 */

import { DeploymentEvent } from '@/app/api/webhooks/vercel/status/store';

export type Severity = 'INFO' | 'WARNING' | 'CRITICAL';

export interface SREReport {
  eventSummary: string;
  severity: Severity;
  impact: string;
  probableCause?: string;
  checksToRun?: string[];
  immediateFix?: string;
  rollbackDecision?: string;
  preventiveActions?: string[];
  githubCommentDraft?: string;
  timestampIST: string;
  timestampUTC: string;
}

/**
 * Analyze a Vercel webhook event and generate an SRE report.
 */
export function analyzeEvent(
  eventType: string,
  payload: any,
  history: DeploymentEvent[]
): SREReport {
  const now = new Date();
  const timestampUTC = now.toISOString();
  const timestampIST = new Date(now.getTime() + (5.5 * 60 * 60 * 1000)).toISOString().replace('Z', '+05:30');

  // Default Report Structure
  const report: SREReport = {
    eventSummary: `Event: ${eventType}`,
    severity: 'INFO',
    impact: 'None',
    timestampIST,
    timestampUTC,
  };

  const deploymentId = payload.deployment?.id;
  const projectName = payload.project?.name || payload.deployment?.name || 'Unknown Project';
  const url = payload.deployment?.url ? `https://${payload.deployment.url}` : 'N/A';
  const region = payload.region || 'N/A';

  // --- 1. Classify Severity & Impact ---
  if (eventType.includes('error') || eventType.includes('failed')) {
    report.severity = 'CRITICAL';
    report.impact = `Deployment ${deploymentId} failed. Production may be stale or broken if promoted.`;
  } else if (eventType.includes('canceled') || eventType.includes('cancelled')) {
    report.severity = 'WARNING';
    report.impact = `Deployment ${deploymentId} canceled. No immediate production impact, but investigate why.`;
  } else if (eventType.includes('succeeded') || eventType.includes('ready')) {
    report.severity = 'INFO';
    report.impact = `Deployment ${deploymentId} is live/ready.`;
  } else {
    report.severity = 'INFO';
    report.impact = 'Routine operation.';
  }

  // --- 2. Analyze Specific Event Types ---

  // A. Deployment Error / Failure
  if (eventType === 'deployment.error' || eventType === 'deployment.checks.failed') {
    const errorDetails = payload.error || payload.checks || 'No error details provided';
    const isBuildError = JSON.stringify(errorDetails).toLowerCase().includes('build');
    const isTimeout = JSON.stringify(errorDetails).toLowerCase().includes('timeout');

    report.eventSummary = `🚨 Deployment Failed: ${projectName} (${deploymentId})`;

    if (isBuildError) {
        report.probableCause = '1. Build script failure (e.g., TypeScript error, missing dependency).\n2. Environment variable missing or incorrect.\n3. Node.js version mismatch.';
        report.immediateFix = 'Check build logs for specific error message. Verify environment variables.';
    } else if (isTimeout) {
        report.probableCause = '1. Build took too long (stalled process).\n2. Serverless function timeout.\n3. External API dependency hanging.';
        report.immediateFix = 'Increase timeout settings or optimize build process.';
    } else {
         report.probableCause = '1. Runtime error during checks.\n2. Integration test failure.\n3. Vercel platform issue.';
         report.immediateFix = 'Review deployment logs and check run details.';
    }

    report.checksToRun = [
        'npm run build',
        'npm run check:schemas',
        'npm run verify:deployment'
    ];

    report.rollbackDecision = 'NO - Failed deployment was not promoted. Current production is safe. Fix forward.';

    report.preventiveActions = [
        'Add stricter pre-commit hooks.',
        'Review recent dependency updates.',
        'Ensure all env vars are synced.'
    ];

    report.githubCommentDraft = `
**Deployment Failed** ❌
- **ID:** ${deploymentId}
- **Project:** ${projectName}
- **Error:** ${typeof errorDetails === 'string' ? errorDetails : JSON.stringify(errorDetails).slice(0, 100)}...
- **Action:** Please review the build logs.
    `;
  }

  // B. Deployment Succeeded (Recovery Analysis)
  else if (eventType === 'deployment.succeeded' || eventType === 'deployment.ready') {
      report.eventSummary = `✅ Deployment Succeeded: ${projectName} (${deploymentId})`;

      // Check history for recent failures
      const recentFailures = history.filter(e =>
          (e.eventType === 'deployment.error' || e.eventType === 'deployment.checks.failed') &&
          e.projectId === payload.project?.id
      );

      if (recentFailures.length > 0) {
          const lastFailure = recentFailures[0];
          report.impact += ` Recovered from previous failure (Event: ${lastFailure.eventId}).`;
      }

      report.checksToRun = ['npm run verify:deployment'];
      report.immediateFix = 'None needed. Monitor for regression.';
      report.rollbackDecision = 'N/A';
  }

  // C. Deployment Canceled
  else if (eventType === 'deployment.canceled' || eventType === 'deployment.cancelled') {
      report.eventSummary = `⚠️ Deployment Canceled: ${projectName} (${deploymentId})`;
      report.probableCause = '1. User manually canceled.\n2. New commit triggered auto-cancel of redundant build.\n3. System timeout/resource limit.';
      report.checksToRun = ['Check if a newer deployment is in progress.'];
      report.immediateFix = 'Trigger a new deploy if this was unintentional.';
      report.rollbackDecision = 'N/A';
  }

  // D. Domain Events
  else if (eventType.startsWith('domain.')) {
      report.eventSummary = `🌐 Domain Event: ${eventType} - ${payload.domain?.name}`;
      if (eventType.includes('failed')) {
          report.severity = 'CRITICAL';
          report.impact = 'Domain verification or renewal failed. Site may become inaccessible.';
          report.probableCause = '1. DNS configuration mismatch.\n2. Registrar payment failure.\n3. SSL certificate generation error.';
          report.immediateFix = 'Check Vercel Domain settings and DNS provider immediately.';
          report.checksToRun = ['dig +trace ' + payload.domain?.name];
      }
  }

  return report;
}

/**
 * Format the SRE report for Slack or Console output.
 */
export function formatSlackMessage(report: SREReport): string {
    const icon = report.severity === 'CRITICAL' ? '🔴' : report.severity === 'WARNING' ? 'jq' : '🔵'; // 'jq' is not a standard emoji, assuming '🟡' meant or similar. Using '⚠️' for warning.
    const severityIcon = report.severity === 'CRITICAL' ? '🔴' : report.severity === 'WARNING' ? '⚠️' : 'ℹ️';

    let message = `*${severityIcon} Vercel SRE Report: ${report.severity}*\n\n`;
    message += `*Event Summary:* ${report.eventSummary}\n`;
    message += `*Impact:* ${report.impact}\n`;
    message += `*Timestamps:* IST: ${report.timestampIST} | UTC: ${report.timestampUTC}\n`;

    if (report.probableCause) {
        message += `\n*🔍 Probable Cause:*\n${report.probableCause}\n`;
    }

    if (report.checksToRun && report.checksToRun.length > 0) {
        message += `\n*🛠 Checks to Run Now:*\n`;
        report.checksToRun.forEach(check => message += `- \`${check}\`\n`);
    }

    if (report.immediateFix) {
        message += `\n*🚑 Immediate Fix:* ${report.immediateFix}\n`;
    }

    if (report.rollbackDecision) {
        message += `\n*🔙 Rollback Decision:* ${report.rollbackDecision}\n`;
    }

    if (report.preventiveActions && report.preventiveActions.length > 0) {
        message += `\n*🛡 Preventive Actions:*\n`;
        report.preventiveActions.forEach(action => message += `- ${action}\n`);
    }

    if (report.githubCommentDraft) {
        message += `\n*📝 GitHub Comment Draft:*\n\`\`\`${report.githubCommentDraft}\`\`\`\n`;
    }

    return message;
}
