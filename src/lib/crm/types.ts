export interface Lead {
  email: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  source?: string;
  condition?: string;
  urgency?: 'low' | 'medium' | 'high';
  customFields?: Record<string, any>;
}

export interface CRMResult {
  success: boolean;
  id?: string;
  message?: string;
}

export interface CRMProvider {
  name: string;
  addLead(lead: Lead): Promise<CRMResult>;
  updateLeadScore(email: string, score: number): Promise<CRMResult>;
}
