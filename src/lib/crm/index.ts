import { MockCRM } from './mock-crm';
import { HubSpotCRM } from './hubspot-crm';
import { CRMProvider } from './types';

// Factory to get the appropriate CRM provider
export const getCRM = (): CRMProvider => {
  // Check for HubSpot API key
  if (process.env.HUBSPOT_ACCESS_TOKEN) {
    return new HubSpotCRM(process.env.HUBSPOT_ACCESS_TOKEN);
  }

  // Fallback to Mock CRM for development/testing
  return new MockCRM();
};

export const crm = getCRM();
export * from './types';
