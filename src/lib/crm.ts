export interface LeadScoreUpdate {
  /** The email address of the lead (used for lookup if leadId not provided) */
  email?: string;
  /** The CRM-specific ID of the lead */
  leadId?: string;
  /** The new calculated score */
  score: number;
  /** The previous score, if known (for differential updates) */
  previousScore?: number;
  /** Reason for the score update */
  reason?: string;
  /** Additional metadata associated with the update */
  metadata?: Record<string, any>;
}

export interface LeadProfile {
  id?: string;
  email: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  [key: string]: any;
}

export interface CRMProvider {
  name: string;

  /**
   * Updates the lead score in the CRM.
   * If the lead does not exist, it may optionally create it or return false.
   */
  updateLeadScore(update: LeadScoreUpdate): Promise<{ success: boolean; message?: string }>;

  /**
   * Create or update a lead profile
   */
  identifyLead(profile: LeadProfile): Promise<{ success: boolean; leadId?: string }>;
}

/**
 * A mock CRM implementation that logs to console.
 * Used when no specific CRM credentials are provided.
 */
class MockCRM implements CRMProvider {
  name = "MockCRM";

  async updateLeadScore(update: LeadScoreUpdate) {
    console.log(`[MockCRM] Updating lead score:`, JSON.stringify(update, null, 2));
    return { success: true, message: "Logged to console" };
  }

  async identifyLead(profile: LeadProfile) {
    console.log(`[MockCRM] Identifying lead:`, JSON.stringify(profile, null, 2));
    return { success: true, leadId: `mock_${Date.now()}` };
  }
}

/**
 * A basic HubSpot implementation using the HTTP API.
 * Requires HUBSPOT_ACCESS_TOKEN env var.
 */
class HubSpotCRM implements CRMProvider {
  name = "HubSpot";
  private accessToken: string;

  constructor(accessToken: string) {
    this.accessToken = accessToken;
  }

  private async request(endpoint: string, method: string, body?: any) {
    const response = await fetch(`https://api.hubapi.com/${endpoint}`, {
      method,
      headers: {
        'Authorization': `Bearer ${this.accessToken}`,
        'Content-Type': 'application/json'
      },
      body: body ? JSON.stringify(body) : undefined
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`HubSpot API error (${response.status}): ${errorText}`);
    }

    return response.json();
  }

  async updateLeadScore(update: LeadScoreUpdate) {
    try {
      // Logic would depend on whether we have an ID or Email
      // This is a simplified example assuming we have a custom property 'lead_score'

      let contactId = update.leadId;

      if (!contactId && update.email) {
        // Search for contact by email
        const searchResult = await this.request('crm/v3/objects/contacts/search', 'POST', {
          filterGroups: [{
            filters: [{
              propertyName: 'email',
              operator: 'EQ',
              value: update.email
            }]
          }]
        });

        if (searchResult.results && searchResult.results.length > 0) {
          contactId = searchResult.results[0].id;
        }
      }

      if (!contactId) {
        return { success: false, message: "Contact not found" };
      }

      await this.request(`crm/v3/objects/contacts/${contactId}`, 'PATCH', {
        properties: {
          lead_score: update.score.toString(), // Assuming property exists
          lead_score_reason: update.reason || 'Automated update'
        }
      });

      return { success: true };
    } catch (error) {
      console.error("[HubSpotCRM] Error updating lead score:", error);
      return { success: false, message: error instanceof Error ? error.message : "Unknown error" };
    }
  }

  async identifyLead(profile: LeadProfile) {
    try {
      // create or update contact
      const response = await this.request('crm/v3/objects/contacts', 'POST', {
        properties: {
          email: profile.email,
          firstname: profile.firstName,
          lastname: profile.lastName,
          phone: profile.phone
        }
      });
      return { success: true, leadId: response.id };
    } catch (error) {
       console.error("[HubSpotCRM] Error identifying lead:", error);
       return { success: false };
    }
  }
}

/**
 * Factory to get the configured CRM provider.
 */
export function getCRM(): CRMProvider {
  const hubspotToken = process.env.HUBSPOT_ACCESS_TOKEN;

  if (hubspotToken) {
    return new HubSpotCRM(hubspotToken);
  }

  // Fallback to Mock CRM
  return new MockCRM();
}
