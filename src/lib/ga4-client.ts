import { google, analyticsdata_v1beta, analyticsadmin_v1beta } from 'googleapis';

// Re-export types for convenience
export type RunReportRequest = analyticsdata_v1beta.Schema$RunReportRequest;
export type RunRealtimeReportRequest = analyticsdata_v1beta.Schema$RunRealtimeReportRequest;
export type RunReportResponse = analyticsdata_v1beta.Schema$RunReportResponse;
export type RunRealtimeReportResponse = analyticsdata_v1beta.Schema$RunRealtimeReportResponse;

// Interface for simple report options (backward compatibility)
export interface GAReportOptions {
  startDate?: string;
  endDate?: string;
  limit?: number;
}

export interface GAPageView {
  path: string;
  views: number;
}

/**
 * Server-side client for Google Analytics Data API (v1beta)
 * Uses the Service Account credentials from GOOGLE_INDEXING_KEY_JSON
 */
export class GA4Client {
  private auth: any;
  private propertyId: string;

  constructor(propertyId?: string) {
    this.propertyId = propertyId || process.env.GA4_PROPERTY_ID || '';

    // Initialize auth using the same method as the SEO scripts
    const keyJson = process.env.GOOGLE_INDEXING_KEY_JSON;
    if (!keyJson) {
      throw new Error('GOOGLE_INDEXING_KEY_JSON environment variable is missing.');
    }

    try {
      const credentials = JSON.parse(keyJson);
      this.auth = new google.auth.GoogleAuth({
        credentials,
        scopes: [
            'https://www.googleapis.com/auth/analytics.readonly',
        ],
      });
    } catch (e) {
      throw new Error('Failed to parse GOOGLE_INDEXING_KEY_JSON. Ensure it is valid JSON.');
    }
  }

  /**
   * Fetches the most visited pages for the specified date range
   * (Simplified wrapper around runReport)
   */
  async getMostPopularPages(options: GAReportOptions = {}): Promise<GAPageView[]> {
    const startDate = options.startDate || '30daysAgo';
    const endDate = options.endDate || 'today';
    const limit = options.limit || 10;

    const response = await this.runReport({
      dateRanges: [{ startDate, endDate }],
      dimensions: [{ name: 'pagePath' }],
      metrics: [{ name: 'screenPageViews' }],
      limit,
      orderBys: [
        {
          desc: true,
          metric: { metricName: 'screenPageViews' },
        },
      ],
    });

    const rows = response.rows || [];
    return rows.map((row) => ({
      path: row.dimensionValues?.[0]?.value || '/',
      views: parseInt(row.metricValues?.[0]?.value || '0', 10),
    }));
  }

  /**
   * Runs a core Google Analytics Data API report.
   * Mirrors the functionality of the MCP `run_report` tool.
   */
  async runReport(requestBody: Omit<RunReportRequest, 'property'>): Promise<RunReportResponse> {
    if (!this.propertyId) {
      throw new Error('GA4 Property ID is not configured. Set GA4_PROPERTY_ID env var or pass it to constructor.');
    }

    const analyticsData = google.analyticsdata({ version: 'v1beta', auth: this.auth });

    try {
      const response = await analyticsData.properties.runReport({
        property: `properties/${this.propertyId}`,
        requestBody,
      });

      return response.data;
    } catch (error: any) {
      this.handleError(error);
      throw error; // Should be unreachable due to handleError throwing
    }
  }

  /**
   * Runs a realtime Google Analytics report.
   * Mirrors the functionality of the MCP `run_realtime_report` tool.
   */
  async runRealtimeReport(requestBody: Omit<RunRealtimeReportRequest, 'property'>): Promise<RunRealtimeReportResponse> {
    if (!this.propertyId) {
      throw new Error('GA4 Property ID is not configured. Set GA4_PROPERTY_ID env var or pass it to constructor.');
    }

    const analyticsData = google.analyticsdata({ version: 'v1beta', auth: this.auth });

    try {
      const response = await analyticsData.properties.runRealtimeReport({
        property: `properties/${this.propertyId}`,
        requestBody,
      });

      return response.data;
    } catch (error: any) {
      this.handleError(error);
      throw error;
    }
  }

  /**
   * Retrieves metadata (custom dimensions and metrics) for the property.
   * Mirrors the MCP `get_custom_dimensions_and_metrics` tool.
   */
  async getMetadata(): Promise<analyticsdata_v1beta.Schema$Metadata> {
    if (!this.propertyId) {
      throw new Error('GA4 Property ID is not configured.');
    }

    const analyticsData = google.analyticsdata({ version: 'v1beta', auth: this.auth });

    try {
      const response = await analyticsData.properties.getMetadata({
        name: `properties/${this.propertyId}/metadata`,
      });
      return response.data;
    } catch (error: any) {
        this.handleError(error);
        throw error;
    }
  }

  /**
   * Helper to list accessible properties (useful for setup/debugging)
   * Note: This uses the Analytics Admin API, not Data API
   */
  async listAccessibleProperties(): Promise<Array<{ name: string; displayName: string; createTime: string }>> {
    try {
        const analyticsAdmin = google.analyticsadmin({ version: 'v1beta', auth: this.auth });

        // List account summaries which include properties
        const response = await analyticsAdmin.accountSummaries.list();

        const properties: Array<{ name: string; displayName: string; createTime: string }> = [];

        response.data.accountSummaries?.forEach(account => {
            account.propertySummaries?.forEach(prop => {
                properties.push({
                    name: prop.property || '', // e.g., "properties/123456"
                    displayName: prop.displayName || 'Unknown Property',
                    createTime: '' // Not available in summary, but acceptable
                });
            });
        });

        return properties;
    } catch (error: any) {
        console.error('Error listing properties:', error.message);
        throw error;
    }
  }

  private handleError(error: any) {
    console.error('GA4 API Error:', error.message);
    if (error.code === 403) {
      throw new Error(`Permission denied. Ensure the service account has 'Viewer' access to property ${this.propertyId}.`);
    }
    if (error.code === 404) {
      throw new Error(`Property ${this.propertyId} not found. Check the ID.`);
    }
    throw error;
  }
}
