import { describe, it, expect, vi } from 'vitest';
import { analyzeReferral } from '@/lib/referral/analyze';

// Mock getClient and extractText
vi.mock('@/lib/gemini', () => ({
  getClient: vi.fn(() => ({
    models: {
      generateContent: vi.fn().mockResolvedValue({
        response: {
          text: () => JSON.stringify({
            patientName: "John Doe",
            referringDoctor: "Dr. Smith",
            diagnosis: "Headache",
            urgency: "Medium",
            summary: "Patient complains of persistent headache.",
            nextSteps: ["MRI Brain"]
          })
        }
      })
    }
  })),
  extractText: vi.fn((response) => response.text())
}));

describe('analyzeReferral', () => {
  it('should analyze referral text and return structured data', async () => {
    const text = "Referral for John Doe from Dr. Smith due to headache.";
    const result = await analyzeReferral(text);

    expect(result).toEqual({
      patientName: "John Doe",
      referringDoctor: "Dr. Smith",
      diagnosis: "Headache",
      urgency: "Medium",
      summary: "Patient complains of persistent headache.",
      nextSteps: ["MRI Brain"]
    });
  });
});
