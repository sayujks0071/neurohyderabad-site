import { describe, it, expect, vi } from 'vitest';
import { analyzeReferralText } from '@/lib/referral/analyze';

// Mock lib/gemini
vi.mock('@/lib/gemini', () => {
  return {
    getClient: vi.fn(() => ({
      models: {
        generateContent: vi.fn().mockResolvedValue({
          text: () => JSON.stringify({
            patientName: 'John Doe',
            referringDoctor: 'Dr. Smith',
            diagnosis: 'Herniated Disc',
            urgency: 'Medium',
            summary: 'Patient has back pain.',
            recommendedAction: 'MRI'
          }),
        }),
      },
    })),
  };
});

describe('analyzeReferralText', () => {
  it('should parse valid JSON response', async () => {
    const result = await analyzeReferralText('Some referral text');

    expect(result).toEqual({
      patientName: 'John Doe',
      referringDoctor: 'Dr. Smith',
      diagnosis: 'Herniated Disc',
      urgency: 'Medium',
      summary: 'Patient has back pain.',
      recommendedAction: 'MRI'
    });
  });
});
