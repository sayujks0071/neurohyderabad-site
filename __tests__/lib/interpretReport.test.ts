import { describe, it, expect, vi } from 'vitest';
import { interpretReportText } from '@/lib/interpretReport';
import { generateObject } from 'ai';

// Mock dependencies
vi.mock('ai', () => ({
  generateObject: vi.fn(),
}));

vi.mock('@/src/lib/ai/gateway', () => ({
  getTextModel: vi.fn().mockReturnValue('mock-model'),
}));

describe('interpretReport', () => {
  it('should interpret report text successfully', async () => {
    const mockSummary = {
      plainEnglishSummary: 'This is a summary.',
      keyTakeaways: ['Point 1', 'Point 2', 'Point 3'],
    };

    (generateObject as any).mockResolvedValue({
      object: mockSummary,
    });

    const reportText = 'Medical jargon here.';
    const result = await interpretReportText(reportText);

    expect(generateObject).toHaveBeenCalledWith(expect.objectContaining({
      model: 'mock-model',
      prompt: expect.stringContaining(reportText),
    }));

    expect(result).toEqual(mockSummary);
  });

  it('should handle API failure', async () => {
    (generateObject as any).mockRejectedValue(new Error('AI Service Error'));

    const reportText = 'Medical jargon here.';
    await expect(interpretReportText(reportText)).rejects.toThrow('Failed to interpret report');
  });
});
