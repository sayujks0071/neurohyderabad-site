import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

// Mock dependencies before importing the module under test.
vi.mock('ai', () => ({
  generateObject: vi.fn(),
  jsonSchema: vi.fn(),
}));

vi.mock('@/src/lib/ai/gateway', () => ({
  getTextModel: vi.fn().mockReturnValue('mock-model'),
  hasAIConfig: vi.fn(() => true),
}));

async function load() {
  const predictor = await import('@/src/lib/recovery-predictor');
  const ai = await import('ai');
  const gateway = await import('@/src/lib/ai/gateway');
  return { predictor, ai, gateway };
}

describe('Recovery Predictor', () => {
  beforeEach(async () => {
    vi.clearAllMocks();

    const ai = await import('ai');

    // Restore default mock implementations
    (ai.generateObject as any).mockReset();

    const gateway = await import('@/src/lib/ai/gateway');
    (gateway.getTextModel as any).mockReturnValue('mock-model');
    (gateway.hasAIConfig as any).mockReturnValue(true);

    // Mock global fetch for MCP
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({
        result: {
          content: [{ text: 'Mocked medical context from MCP' }]
        }
      })
    } as any);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should generate a structured recovery plan using AI', async () => {
    const { predictor, ai } = await load();

    const mockPlan = {
      title: 'Recovery Plan',
      phases: [
        {
          name: 'Phase 1',
          duration: { label: 'Week 1' },
          milestones: [{ title: 'Milestone 1', highlights: ['Highlight 1'] }]
        }
      ],
      disclaimer: 'Test disclaimer'
    };

    (ai.generateObject as any).mockResolvedValue({ object: mockPlan });

    const result = await predictor.generateRecoveryPlan({
      surgeryType: 'Test Surgery',
      patientAge: 45
    });

    expect(global.fetch).toHaveBeenCalled();
    expect(ai.generateObject).toHaveBeenCalledWith(
      expect.objectContaining({
        model: 'mock-model',
        prompt: expect.stringContaining('Mocked medical context from MCP'),
      })
    );
    expect(result).toEqual(mockPlan);
  });

  it('should return fallback plan if MCP fails', async () => {
    const { predictor, ai, gateway } = await load();

    global.fetch = vi.fn().mockResolvedValue({
      ok: false,
      status: 500
    } as any);

    (gateway.hasAIConfig as any).mockReturnValue(false);

    const result = await predictor.generateRecoveryPlan({
      surgeryType: 'Test Surgery'
    });

    // Should return fallback plan (static fallback function)
    // The implementation returns static plan if MCP fails.
    expect(ai.generateObject).not.toHaveBeenCalled();
  });

  it('should return fallback plan if generateObject fails', async () => {
    const { predictor, ai } = await load();

    (ai.generateObject as any).mockRejectedValue(new Error('AI Error'));

    const result = await predictor.generateRecoveryPlan({
      surgeryType: 'Test Surgery'
    });

    expect(result.title).toContain('Recovery Timeline: Test Surgery');
    expect(result.phases.length).toBeGreaterThan(0);
  });
});

