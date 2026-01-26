/**
 * Deployment event store
 * 
 * In-memory store for recent deployment events
 * In production, consider using a database or Redis
 */

export interface DeploymentEvent {
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
      checks_failed: ['deployment.checks.failed'],
      checks_succeeded: ['deployment.checks.succeeded'],
    };
    const eventTypes = statusMap[filters.status] || [];
    filtered = filtered.filter(e => eventTypes.includes(e.eventType));
  }

  return filtered.slice(0, limit);
}

/**
 * Get total number of events stored
 */
export function getTotalEvents(): number {
  return recentEvents.length;
}

/**
 * Get all events (for debugging)
 */
export function getAllEvents(): DeploymentEvent[] {
  return [...recentEvents];
}
