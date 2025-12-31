import { CRMProvider, Lead, CRMResult } from './types';

export class MockCRM implements CRMProvider {
  name = 'MockCRM';

  async addLead(lead: Lead): Promise<CRMResult> {
    console.log(`[MockCRM] Adding lead: ${lead.email}`, lead);
    // Simulate API latency
    await new Promise(resolve => setTimeout(resolve, 500));
    return {
      success: true,
      id: `mock_lead_${Date.now()}`,
      message: 'Lead added to Mock CRM'
    };
  }

  async updateLeadScore(email: string, score: number): Promise<CRMResult> {
    console.log(`[MockCRM] Updating lead score for ${email} to ${score}`);
    await new Promise(resolve => setTimeout(resolve, 300));
    return {
      success: true,
      message: `Lead score updated to ${score}`
    };
  }
}
