import { CRMProvider, Lead, CRMResult } from './types';

export class HubSpotCRM implements CRMProvider {
  name = 'HubSpot';
  private accessToken: string;

  constructor(accessToken: string) {
    this.accessToken = accessToken;
  }

  private async request(endpoint: string, method: string, body?: any) {
    const response = await fetch(`https://api.hubapi.com/crm/v3/${endpoint}`, {
      method,
      headers: {
        'Authorization': `Bearer ${this.accessToken}`,
        'Content-Type': 'application/json',
      },
      body: body ? JSON.stringify(body) : undefined,
    });

    if (!response.ok) {
        let errorText = await response.text();
        try {
            const errorJson = JSON.parse(errorText);
            errorText = errorJson.message || errorText;
        } catch (e) {
            // ignore JSON parse error
        }
        throw new Error(`HubSpot API error: ${response.status} ${response.statusText} - ${errorText}`);
    }

    // Some endpoints return 204 No Content
    if (response.status === 204) {
        return {};
    }

    return response.json();
  }

  async addLead(lead: Lead): Promise<CRMResult> {
    try {
        // First check if contact exists to avoid duplicates
        // POST /crm/v3/objects/contacts/search
        const searchResponse = await this.request('objects/contacts/search', 'POST', {
            filterGroups: [{
                filters: [{
                    propertyName: 'email',
                    operator: 'EQ',
                    value: lead.email
                }]
            }]
        });

        if (searchResponse.results && searchResponse.results.length > 0) {
            // Contact exists
            const contactId = searchResponse.results[0].id;
             return {
                success: true,
                id: contactId,
                message: 'Contact already exists in HubSpot'
            };
        }

        // Create new contact
        // Note: Standard properties. Custom properties like 'medical_condition' need to be defined in HubSpot.
        // We will attempt to send them, but if they don't exist, HubSpot might throw an error if validation is strict.
        // However, usually it's better to stick to standard or well-known custom ones.
        // We'll map to what we can.

        const properties: Record<string, string | undefined> = {
            email: lead.email,
            firstname: lead.firstName,
            lastname: lead.lastName,
            phone: lead.phone,
            hs_lead_status: 'NEW', // Default status if available
            // If the user has created these custom properties, they will work.
            // Otherwise, we might want to catch the error or inspect the HubSpot schema first (too complex for now).
            // We will include them and if it fails, we might need to fallback to description?
            // For now, let's include them as it's the most useful integration.
            medical_condition: lead.condition,
            urgency: lead.urgency,
            source: lead.source
        };

        // Remove undefined values
        Object.keys(properties).forEach(key => properties[key] === undefined && delete properties[key]);

        try {
            const createResponse = await this.request('objects/contacts', 'POST', {
                properties
            });

            return {
                success: true,
                id: createResponse.id,
                message: 'Lead added to HubSpot'
            };
        } catch (e: any) {
             // If it fails due to property not existing, we retry with only standard properties
             if (e.message.includes('Property') && e.message.includes('does not exist')) {
                 console.warn('HubSpot custom property error, retrying with standard properties only', e.message);
                 const standardProperties = {
                    email: lead.email,
                    firstname: lead.firstName,
                    lastname: lead.lastName,
                    phone: lead.phone,
                 };
                 Object.keys(standardProperties).forEach(key => (standardProperties as any)[key] === undefined && delete (standardProperties as any)[key]);

                 const retryResponse = await this.request('objects/contacts', 'POST', {
                     properties: standardProperties
                 });

                 return {
                     success: true,
                     id: retryResponse.id,
                     message: 'Lead added to HubSpot (standard fields only)'
                 };
             }
             throw e;
        }

    } catch (error: any) {
        console.error('HubSpot addLead error:', error);
        return {
            success: false,
            message: error.message
        };
    }
  }

  async updateLeadScore(email: string, score: number): Promise<CRMResult> {
      try {
        // Search for contact
         const searchResponse = await this.request('objects/contacts/search', 'POST', {
            filterGroups: [{
                filters: [{
                    propertyName: 'email',
                    operator: 'EQ',
                    value: email
                }]
            }]
        });

        if (!searchResponse.results || searchResponse.results.length === 0) {
            return {
                success: false,
                message: 'Contact not found for score update'
            };
        }

        const contactId = searchResponse.results[0].id;

        // Update custom lead score property
        // Assuming 'custom_lead_score' or similar.
        // If it doesn't exist, we might fail.
        // We'll try 'lead_score' which is a common custom field name,
        // as 'hubspot_score' is usually read-only.

        try {
             await this.request(`objects/contacts/${contactId}`, 'PATCH', {
                properties: {
                    lead_score: score.toString()
                }
            });
            return { success: true, message: 'Lead score updated' };
        } catch (e: any) {
            console.warn('Failed to update lead_score, property might not exist.', e.message);
            return { success: false, message: 'Could not update lead score (field might be missing)' };
        }

      } catch (error: any) {
          console.error('HubSpot updateLeadScore error:', error);
          return {
              success: false,
              message: error.message
          };
      }
  }
}
