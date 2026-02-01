import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { generateRecoveryPlan } from '@/src/lib/recovery-predictor';
import * as ai from 'ai';

// Mock dependencies
vi.mock('ai', () => ({
  generateObject: vi.fn(),
  jsonSchema: vi.fn(),
}));

vi.mock('@/src/lib/ai/gateway', () => ({
  getTextModel: vi.fn(),
  hasAIConfig: vi.fn(() => true),
}));

describe('Recovery Predictor', () => {
  beforeEach(() => {
    vi.resetAllMocks();

    // Mock global fetch for MCP
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({
        result: {
          content: [{ text: 'Mocked medical context from MCP' }]
        }
      })
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should use generateObject when AI config is present', async () => {
    const mockPlan = {
      title: 'AI Generated Plan',
      description: 'Test description',
      phases: [
        {
          name: 'Phase 1',
          duration: { label: '1 week' },
          milestones: []
        }
      ]
    };

    // Mock generateObject response
    (ai.generateObject as any).mockResolvedValue({
      object: mockPlan
    });

    const request = {
      surgeryType: 'Test Surgery',
      severity: 'moderate' as const
    };

    const result = await generateRecoveryPlan(request);

    // Verify fetch was called for MCP
    expect(global.fetch).toHaveBeenCalledWith(
      expect.stringContaining('/api/mcp'),
      expect.objectContaining({
        method: 'POST',
        body: expect.stringContaining('get_medical_info')
      })
    );

    // Verify generateObject was called with the context
    expect(ai.generateObject).toHaveBeenCalledWith(
      expect.objectContaining({
        prompt: expect.stringContaining('Mocked medical context from MCP'),
        // Verify we are asking for specific surgery type
        // prompt should also contain the surgery type from request
      })
    );

    // Verify the result matches the mock object
    expect(result).toEqual(mockPlan);
  });

  it('should return fallback plan if MCP fails', async () => {
    // Mock fetch failure
    global.fetch = vi.fn().mockResolvedValue({
      ok: false,
      status: 500
    });

    const request = {
      surgeryType: 'Test Surgery'
    };

    const result = await generateRecoveryPlan(request);

    // Should return fallback plan
    expect(result.title).toContain('Recovery Timeline: Test Surgery');
    expect(result.phases.length).toBeGreaterThan(0);
    // Should NOT call generateObject because it failed before that step
    expect(ai.generateObject).not.toHaveBeenCalled();
  });

  it('should return fallback plan if generateObject fails', async () => {
    // Mock generateObject failure
    (ai.generateObject as any).mockRejectedValue(new Error('AI Error'));

    const request = {
      surgeryType: 'Test Surgery'
    };

    const result = await generateRecoveryPlan(request);

    // Should return fallback plan
    expect(result.title).toContain('Recovery Timeline: Test Surgery');
  });
});
