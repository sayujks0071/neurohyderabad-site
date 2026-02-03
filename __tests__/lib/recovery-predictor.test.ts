import { describe, it, expect, vi, beforeEach } from 'vitest';
import { generateRecoveryPlan } from '@/src/lib/recovery-predictor';
import { generateObject } from 'ai';

// Mock the 'ai' module
vi.mock('ai', () => ({
  generateObject: vi.fn(),
}));

// Mock the gateway module to avoid environment variable issues
vi.mock('@/src/lib/ai/gateway', () => ({
  getTextModel: vi.fn().mockReturnValue('mock-model'),
  isAIGatewayConfigured: vi.fn().mockReturnValue(true),
}));

describe('generateRecoveryPlan', () => {
  beforeEach(() => {
    vi.clearAllMocks();

    // Mock global fetch
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({
        result: {
          content: [{ text: 'Mock clinical context' }]
        }
      })
    } as Response);
  });

  it('should generate a structured recovery plan using AI', async () => {
    const mockPlan = {
      title: 'Recovery Plan',
      phases: [
        {
          name: 'Phase 1',
          duration: { label: 'Week 1' },
          milestones: [{ title: 'Milestone 1', highlights: ['Highlight 1'] }]
        }
      ]
    };

    (generateObject as any).mockResolvedValue({ object: mockPlan });

    const result = await generateRecoveryPlan({
      surgeryType: 'Spine Surgery',
      patientAge: 45
    });

    // Check if fetch was called (MCP context)
    expect(global.fetch).toHaveBeenCalled();

    // Check if generateObject was called
    expect(generateObject).toHaveBeenCalledWith(expect.objectContaining({
      model: 'mock-model',
      schema: expect.any(Object), // Zod schema
      system: expect.stringContaining('Dr. Sayuj Krishnan'),
      prompt: expect.stringContaining('Mock clinical context'),
    }));

    expect(result).toEqual(mockPlan);
  });

  it('should fallback if AI generation fails', async () => {
    (generateObject as any).mockRejectedValue(new Error('AI Error'));

    const result = await generateRecoveryPlan({
      surgeryType: 'Spine Surgery'
    });

    expect(result.title).toContain('Recovery Timeline: Spine Surgery');
    expect(result.phases.length).toBeGreaterThan(0);
  });
});
