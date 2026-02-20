import { describe, it, expect, vi } from 'vitest';
import { analyzeReferralText } from '@/lib/referral/analyze';
import { generateObject } from 'ai';

// Mock dependencies
vi.mock('ai', () => ({
  generateObject: vi.fn(),
}));

vi.mock('@/src/lib/ai/gateway', () => ({
  getTextModel: vi.fn().mockReturnValue('mock-model'),
}));

describe('analyzeReferralText', () => {
  it('should extract structured referral data successfully', async () => {
    const mockReferralData = {
      patientName: 'John Doe',
      patientDob: '1980-01-01',
      referringDoctor: 'Dr. Smith',
      urgency: 'Routine',
      suspectedDiagnosis: 'Herniated Disc',
      reasonForReferral: 'MRI shows disc bulge',
      insurance: 'Aetna',
    };

    (generateObject as any).mockResolvedValue({
      object: mockReferralData,
    });

    const referralText = 'Referral letter content...';
    const result = await analyzeReferralText(referralText);

    expect(generateObject).toHaveBeenCalledWith(expect.objectContaining({
      model: 'mock-model',
      prompt: expect.stringContaining(referralText),
    }));

    expect(result).toEqual(mockReferralData);
  });

  it('should handle API failure', async () => {
    (generateObject as any).mockRejectedValue(new Error('AI Service Error'));

    const referralText = 'Referral letter content...';
    await expect(analyzeReferralText(referralText)).rejects.toThrow('Failed to analyze referral text');
  });
});
