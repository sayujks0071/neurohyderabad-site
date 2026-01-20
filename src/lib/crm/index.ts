import { HubSpotCRM } from './hubspot-crm';
import { CRMProvider } from './types';

class UnconfiguredCRM implements CRMProvider {
  name = "CRMUnavailable";

  async addLead() {
    return {
      success: false,
      message: "HUBSPOT_ACCESS_TOKEN is not configured.",
    };
  }

  async updateLeadScore() {
    return {
      success: false,
      message: "HUBSPOT_ACCESS_TOKEN is not configured.",
    };
  }
}

// Factory to get the appropriate CRM provider
export const getCRM = (): CRMProvider => {
  // Check for HubSpot API key
  if (process.env.HUBSPOT_ACCESS_TOKEN) {
    return new HubSpotCRM(process.env.HUBSPOT_ACCESS_TOKEN);
  }

  console.error("HUBSPOT_ACCESS_TOKEN is not set; CRM integration disabled.");
  return new UnconfiguredCRM();
};

export const crm = getCRM();
export * from './types';
