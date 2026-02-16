import { describe, it, expect, vi } from 'vitest';
import { analyzeSymptoms, buildFallbackAnalysis } from '@/src/lib/ai/symptoms';
import * as gateway from '@/src/lib/ai/gateway';

vi.mock('@/src/lib/ai/gateway', () => ({
  getTextModel: vi.fn(),
  hasAIConfig: vi.fn(),
}));

// Mock ai-sdk
vi.mock('ai', () => ({
  generateObject: vi.fn(),
  jsonSchema: vi.fn(),
}));

describe('analyzeSymptoms', () => {
  it('should use fallback if AI config is missing', async () => {
    vi.mocked(gateway.hasAIConfig).mockReturnValue(false);

    const result = await analyzeSymptoms('headache');

    expect(result.analysis.urgency).toBe('routine');
    expect(result.disclaimer).toBeDefined();
  });

  it('should detect emergency in fallback', async () => {
    vi.mocked(gateway.hasAIConfig).mockReturnValue(false);

    const result = await analyzeSymptoms('stroke');

    expect(result.analysis.urgency).toBe('emergency');
  });
});
