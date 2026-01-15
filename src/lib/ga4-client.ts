import { google } from 'googleapis';

// Interface for GA4 analytics report
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
        scopes: ['https://www.googleapis.com/auth/analytics.readonly'],
      });
    } catch (e) {
      throw new Error('Failed to parse GOOGLE_INDEXING_KEY_JSON. Ensure it is valid JSON.');
    }
  }

  /**
   * Fetches the most visited pages for the specified date range
   */
  async getMostPopularPages(options: GAReportOptions = {}): Promise<GAPageView[]> {
    if (!this.propertyId) {
      throw new Error('GA4 Property ID is not configured. Set GA4_PROPERTY_ID env var or pass it to constructor.');
    }

    const analyticsData = google.analyticsdata({ version: 'v1beta', auth: this.auth });
    const startDate = options.startDate || '30daysAgo';
    const endDate = options.endDate || 'today';
    const limit = options.limit || 10;

    try {
      const response = await analyticsData.properties.runReport({
        property: `properties/${this.propertyId}`,
        requestBody: {
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
        },
      });

      const rows = response.data.rows || [];
      return rows.map((row) => ({
        path: row.dimensionValues?.[0]?.value || '/',
        views: parseInt(row.metricValues?.[0]?.value || '0', 10),
      }));
    } catch (error: any) {
      console.error('Error fetching GA4 data:', error.message);
      // Determine if it's a permission error or invalid property
      if (error.code === 403) {
        throw new Error(`Permission denied. Ensure the service account has 'Viewer' access to property ${this.propertyId}.`);
      }
      if (error.code === 404) {
        throw new Error(`Property ${this.propertyId} not found. Check the ID.`);
      }
      throw error;
    }
  }

  /**
   * Helper to list accessible properties (useful for setup/debugging)
   * Note: This uses the Analytics Admin API, not Data API
   */
  async listAccessibleProperties(): Promise<Array<{ name: string; displayName: string; createTime: string }>> {
    try {
        // We need the analytics.readonly scope which is already requested
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
}
