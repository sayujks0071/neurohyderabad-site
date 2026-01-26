/**
 * GET /api/webhooks/vercel/status
 * 
 * Check deployment status via webhook events and Vercel API
 * 
 * Query parameters:
 * - limit: Number of recent deployments to return (default: 10)
 * - project: Filter by project name/ID
 * - status: Filter by status (created, ready, succeeded, error, canceled)
 */

import { NextRequest, NextResponse } from 'next/server';

// In-memory store for recent deployment events
// In production, consider using a database or Redis
interface DeploymentEvent {
  eventId: string;
  eventType: string;
  deploymentId?: string;
  projectId?: string;
  projectName?: string;
  url?: string;
  target?: string;
  status?: string;
  createdAt: string;
  region?: string | null;
  error?: any;
}

// Store recent events (last 100)
const recentEvents: DeploymentEvent[] = [];
const MAX_EVENTS = 100;

/**
 * Add a deployment event to the store
 * Called by webhook handlers
 */
export function addDeploymentEvent(event: DeploymentEvent) {
  recentEvents.unshift(event);
  if (recentEvents.length > MAX_EVENTS) {
    recentEvents.pop();
  }
}

/**
 * Get recent deployment events
 */
export function getRecentDeployments(limit: number = 10, filters?: {
  projectId?: string;
  projectName?: string;
  status?: string;
}): DeploymentEvent[] {
  let filtered = [...recentEvents];

  if (filters?.projectId) {
    filtered = filtered.filter(e => e.projectId === filters.projectId);
  }
  if (filters?.projectName) {
    filtered = filtered.filter(e => 
      e.projectName?.toLowerCase().includes(filters.projectName!.toLowerCase())
    );
  }
  if (filters?.status) {
    const statusMap: Record<string, string[]> = {
      created: ['deployment.created', 'deployment'],
      ready: ['deployment.ready'],
      succeeded: ['deployment.succeeded'],
      error: ['deployment.error'],
      canceled: ['deployment.canceled', 'deployment.cancelled'],
    };
    const eventTypes = statusMap[filters.status] || [];
    filtered = filtered.filter(e => eventTypes.includes(e.eventType));
  }

  return filtered.slice(0, limit);
}

/**
 * GET endpoint to check deployment status
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '10', 10);
    const projectId = searchParams.get('projectId') || undefined;
    const projectName = searchParams.get('projectName') || undefined;
    const status = searchParams.get('status') || undefined;
    const includeVercelApi = searchParams.get('vercelApi') === 'true';

    // Get recent deployments from webhook events
    const recentDeployments = getRecentDeployments(limit, {
      projectId,
      projectName,
      status,
    });

    // Optionally query Vercel API for current deployment status
    let vercelApiStatus = null;
    if (includeVercelApi && process.env.VERCEL_API_TOKEN) {
      try {
        // Query Vercel API for latest deployments
        const vercelResponse = await fetch(
          `https://api.vercel.com/v6/deployments?limit=${limit}&projectId=${projectId || ''}`,
          {
            headers: {
              'Authorization': `Bearer ${process.env.VERCEL_API_TOKEN}`,
            },
          }
        );

        if (vercelResponse.ok) {
          const vercelData = await vercelResponse.json();
          vercelApiStatus = {
            deployments: vercelData.deployments || [],
            pagination: vercelData.pagination,
          };
        }
      } catch (error) {
        console.error('[webhooks/vercel/status] Vercel API error:', error);
      }
    }

    return NextResponse.json({
      status: 'ok',
      timestamp: new Date().toISOString(),
      source: 'webhook_events',
      totalEvents: recentEvents.length,
      recentDeployments,
      vercelApi: vercelApiStatus,
      filters: {
        limit,
        projectId,
        projectName,
        status,
      },
      note: includeVercelApi && !process.env.VERCEL_API_TOKEN
        ? 'Set VERCEL_API_TOKEN to query Vercel API directly'
        : undefined,
    });
  } catch (error) {
    console.error('[webhooks/vercel/status] Error:', error);
    return NextResponse.json(
      {
        error: 'Failed to fetch deployment status',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
