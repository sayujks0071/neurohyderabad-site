/**
 * Middleware API Client
 * 
 * Provides programmatic access to Middleware APIs for:
 * - Dashboard/Widget management
 * - Alert configuration
 * - Agent management
 * - Metrics and data retrieval
 * 
 * Base URL: https://hjptv.middleware.io/api/v1
 */

const MIDDLEWARE_BASE_URL = process.env.MIDDLEWARE_API_URL || 'https://hjptv.middleware.io/api/v1';
const MIDDLEWARE_ACCESS_TOKEN = process.env.MIDDLEWARE_ACCESS_TOKEN || '';

interface MiddlewareApiOptions {
  baseUrl?: string;
  accessToken?: string;
}

class MiddlewareApiClient {
  private baseUrl: string;
  private accessToken: string;

  constructor(options: MiddlewareApiOptions = {}) {
    this.baseUrl = options.baseUrl || MIDDLEWARE_BASE_URL;
    this.accessToken = options.accessToken || MIDDLEWARE_ACCESS_TOKEN;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...options.headers as Record<string, string>,
    };

    // Try multiple authentication methods
    if (this.accessToken) {
      // First try Bearer token (for Access Tokens)
      headers['Authorization'] = `Bearer ${this.accessToken}`;
      // Also try X-API-Key header (for API Keys)
      headers['X-API-Key'] = this.accessToken;
    }

    const response = await fetch(url, {
      ...options,
      headers,
    });

    if (!response.ok) {
      const error = await response.text().catch(() => response.statusText);
      throw new Error(`Middleware API error (${response.status}): ${error}`);
    }

    return response.json();
  }

  // ===== DASHBOARDS =====

  /**
   * Get all dashboards (reports)
   */
  async getDashboards(reportKey?: string): Promise<any[]> {
    const endpoint = reportKey 
      ? `/builder/report/${reportKey}`
      : '/builder/report';
    return this.request<any[]>(endpoint);
  }

  /**
   * Create or update a dashboard
   */
  async createDashboard(dashboard: any): Promise<any> {
    return this.request('/builder/report', {
      method: 'POST',
      body: JSON.stringify(dashboard),
    });
  }

  /**
   * Update a dashboard by ID
   */
  async updateDashboard(id: string, dashboard: any): Promise<any> {
    return this.request(`/builder/report/${id}`, {
      method: 'PUT',
      body: JSON.stringify(dashboard),
    });
  }

  /**
   * Delete a dashboard
   */
  async deleteDashboard(id: string): Promise<void> {
    return this.request(`/builder/report/${id}`, {
      method: 'DELETE',
    });
  }

  /**
   * Clone a dashboard
   */
  async cloneDashboard(cloneData: { sourceId: string; name?: string }): Promise<any> {
    return this.request('/builder/report/clone', {
      method: 'POST',
      body: JSON.stringify(cloneData),
    });
  }

  /**
   * Mark dashboard as favorite/unfavorite
   */
  async toggleFavorite(reportId: string, favorite: boolean): Promise<void> {
    return this.request(`/builder/report/favourite/${reportId}/${favorite}`, {
      method: 'GET',
    });
  }

  // ===== WIDGETS =====

  /**
   * Get all widgets
   */
  async getWidgets(): Promise<any[]> {
    return this.request('/builder/widget');
  }

  /**
   * Create or update a widget
   */
  async createWidget(widget: any): Promise<any> {
    return this.request('/builder/widget', {
      method: 'POST',
      body: JSON.stringify(widget),
    });
  }

  /**
   * Get widget data
   */
  async getWidgetData(widgetConfig: any): Promise<any> {
    return this.request('/builder/widget/data', {
      method: 'POST',
      body: JSON.stringify(widgetConfig),
    });
  }

  /**
   * Get data for multiple widgets
   */
  async getMultiWidgetData(widgets: any[]): Promise<any> {
    return this.request('/builder/widget/multi-data', {
      method: 'POST',
      body: JSON.stringify(widgets),
    });
  }

  /**
   * Delete a widget
   */
  async deleteWidget(builderId: string): Promise<void> {
    return this.request(`/builder/widget/${builderId}`, {
      method: 'DELETE',
    });
  }

  /**
   * Update widget layouts
   */
  async updateWidgetLayouts(layouts: any): Promise<void> {
    return this.request('/builder/widget/scope/layouts', {
      method: 'PUT',
      body: JSON.stringify(layouts),
    });
  }

  // ===== METRICS =====

  /**
   * Get metrics, filters, or groupby tags
   */
  async getMetrics(query: {
    metrics?: string[];
    filters?: any[];
    groupBy?: string[];
    timeRange?: { start: number; end: number };
  }): Promise<any> {
    return this.request('/builder/metrics-v2', {
      method: 'POST',
      body: JSON.stringify(query),
    });
  }

  /**
   * Get resources
   */
  async getResources(): Promise<any[]> {
    return this.request('/builder/resources');
  }

  // ===== ALERTS =====

  /**
   * Get all alert rules
   */
  async getRules(): Promise<any[]> {
    return this.request('/rules');
  }

  /**
   * Get alerts by rule ID
   */
  async getAlertsByRule(ruleId: string): Promise<any[]> {
    return this.request(`/rules/${ruleId}/alerts`);
  }

  /**
   * Create alert by rule ID
   */
  async createAlert(ruleId: string, alert: any): Promise<any> {
    return this.request(`/rules/${ruleId}/alerts`, {
      method: 'POST',
      body: JSON.stringify(alert),
    });
  }

  /**
   * Get alert statistics by rule ID
   */
  async getAlertStats(ruleId: string): Promise<any> {
    return this.request(`/rules/${ruleId}/alerts/stats`);
  }

  // ===== AGENT MANAGEMENT =====

  /**
   * Get list of agent hosts
   */
  async getAgentHosts(): Promise<any[]> {
    return this.request('/agent/hosts');
  }

  /**
   * Get agent configuration for a host
   */
  async getAgentConfig(hostId: string): Promise<any> {
    return this.request(`/agent/setting/${hostId}`);
  }

  /**
   * Update agent configuration for a host
   */
  async updateAgentConfig(hostId: string, config: any): Promise<any> {
    return this.request(`/agent/setting/${hostId}`, {
      method: 'POST',
      body: JSON.stringify(config),
    });
  }

  /**
   * Get enabled integrations for a host/cluster
   */
  async getHostIntegrations(hostId: string): Promise<any[]> {
    return this.request(`/agent/setting/${hostId}/integrations`);
  }

  /**
   * Get configuration groups
   */
  async getConfigGroups(): Promise<any[]> {
    return this.request('/agent/setting/config-groups');
  }

  /**
   * Create or update configuration group
   */
  async createConfigGroup(groupName: string, config: any): Promise<any> {
    return this.request(`/agent/setting/config-groups/${groupName}`, {
      method: 'POST',
      body: JSON.stringify(config),
    });
  }

  /**
   * Assign configuration group to hosts
   */
  async assignConfigGroup(groupName: string, hostIds: string[]): Promise<void> {
    return this.request(`/agent/setting/config-groups/${groupName}`, {
      method: 'PUT',
      body: JSON.stringify({ hostIds }),
    });
  }

  /**
   * Get client tokens
   */
  async getClientTokens(): Promise<any[]> {
    return this.request('/agent/client-tokens');
  }

  /**
   * Generate new client token
   */
  async generateClientToken(tokenData: {
    name: string;
    description?: string;
  }): Promise<any> {
    return this.request('/agent/generate-client-token', {
      method: 'POST',
      body: JSON.stringify(tokenData),
    });
  }

  // ===== ERROR AND INCIDENT MANAGEMENT =====

  /**
   * List all errors and incidents with filtering and pagination
   * Uses the query endpoint to fetch error data
   * Includes clickable issue_url for each incident
   */
  async listErrors(options?: {
    limit?: number;
    offset?: number;
    filters?: Record<string, any>;
    timeRange?: { start: number; end: number };
  }): Promise<any[]> {
    const timeRange = options?.timeRange || {
      start: Date.now() - (24 * 60 * 60 * 1000), // Last 24 hours
      end: Date.now(),
    };

    // Use query endpoint to fetch errors
    return this.query({
      query: {
        metric: 'error.count',
        filters: [
          ...(options?.filters ? Object.entries(options.filters).map(([k, v]) => ({ key: k, value: v })) : []),
        ],
        groupBy: ['error_message', 'error_type', 'service'],
        timeRange,
        limit: options?.limit || 50,
        offset: options?.offset || 0,
      },
    });
  }

  /**
   * Get detailed information about a specific error or incident by fingerprint
   * Uses query endpoint with fingerprint filter
   */
  async getErrorDetails(fingerprint: string): Promise<any> {
    return this.query({
      query: {
        metric: 'error.details',
        filters: [
          { key: 'fingerprint', value: fingerprint },
        ],
        timeRange: {
          start: Date.now() - (7 * 24 * 60 * 60 * 1000), // Last 7 days
          end: Date.now(),
        },
      },
    });
  }

  /**
   * Execute flexible queries to retrieve logs, metrics, traces, and other data
   */
  async query(queryConfig: {
    query: {
      metric?: string;
      filters?: Array<{ key: string; value: any }>;
      groupBy?: string[];
      timeRange?: { start: number; end: number };
      limit?: number;
      offset?: number;
    };
  }): Promise<any> {
    return this.request('/builder/query', {
      method: 'POST',
      body: JSON.stringify(queryConfig),
    });
  }
}

// Export singleton instance
export const middlewareApi = new MiddlewareApiClient();

// Export class for custom instances
export { MiddlewareApiClient };

// Export types
export interface Dashboard {
  id?: string;
  name: string;
  description?: string;
  widgets?: any[];
  layout?: any;
}

export interface Widget {
  builder_id?: string;
  name: string;
  type: string;
  query: any;
  visualization?: any;
}

export interface Alert {
  ruleId: string;
  name: string;
  condition: any;
  actions?: any[];
}
