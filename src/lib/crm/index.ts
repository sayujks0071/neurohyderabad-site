import { MockCRM } from './mock-crm';
import { CRMProvider } from './types';

// In a real application, you might switch based on environment variables
// e.g. const crm: CRMProvider = process.env.CRM_PROVIDER === 'hubspot' ? new HubSpotCRM() : new MockCRM();

const crm: CRMProvider = new MockCRM();

export { crm };
export * from './types';
