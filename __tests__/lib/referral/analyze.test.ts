import { describe, it, expect, vi, beforeEach } from 'vitest';
import { analyzeReferralText } from '../../../lib/referral/analyze';

// Mock the gemini module
vi.mock('../../../lib/gemini', () => {
  return {
    getClient: vi.fn(),
    extractText: vi.fn()
  };
});

import { getClient, extractText } from '../../../lib/gemini';

describe('analyzeReferralText', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it('should analyze referral text correctly using Gemini', async () => {
    const mockResponseText = JSON.stringify({
      patientName: 'John Doe',
      referringDoctor: 'Dr. Smith',
      diagnosis: 'Herniated Disc',
      urgency: 'High',
      summary: 'Patient has severe pain.',
      recommendedAction: 'Immediate consultation'
    });

    const mockResponse = {
       text: () => mockResponseText
    };

    const mockClient = {
      models: {
        generateContent: vi.fn().mockResolvedValue(mockResponse)
      }
    };

    (getClient as any).mockReturnValue(mockClient);
    (extractText as any).mockReturnValue(mockResponseText);

    const result = await analyzeReferralText('Referral for John Doe...');

    expect(getClient).toHaveBeenCalled();
    // Verify that the client was called with expected prompt
    const generateContentMock = mockClient.models.generateContent;
    expect(generateContentMock).toHaveBeenCalledWith(expect.objectContaining({
      model: 'gemini-2.0-flash',
      contents: expect.stringContaining('Referral for John Doe...')
    }));

    expect(result).toEqual({
      patientName: 'John Doe',
      referringDoctor: 'Dr. Smith',
      diagnosis: 'Herniated Disc',
      urgency: 'High',
      summary: 'Patient has severe pain.',
      recommendedAction: 'Immediate consultation'
    });
  });

  it('should handle invalid JSON response', async () => {
     const mockResponseText = 'Invalid JSON';

     const mockResponse = {
        text: () => mockResponseText
     };

     const mockClient = {
        models: {
           generateContent: vi.fn().mockResolvedValue(mockResponse)
        }
     };

     (getClient as any).mockReturnValue(mockClient);
     (extractText as any).mockReturnValue(mockResponseText);

     await expect(analyzeReferralText('bad text')).rejects.toThrow();
  });
});
