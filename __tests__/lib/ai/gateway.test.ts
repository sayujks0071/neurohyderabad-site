import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

// Use vi.hoisted to ensure mocks are available before vi.mock calls
const { mockCreateOpenAI, mockOpenAIClient } = vi.hoisted(() => {
  const mockOpenAIClient = vi.fn((model) => `client-for-${model}`);
  const mockCreateOpenAI = vi.fn(() => mockOpenAIClient);
  return { mockCreateOpenAI, mockOpenAIClient };
});

vi.mock('@ai-sdk/openai', () => ({
  createOpenAI: mockCreateOpenAI,
}));

// Import the module under test AFTER mocking
import { getTextModel, getTextModelName, isAIGatewayConfigured } from '@/src/lib/ai/gateway';

describe('AI Gateway Configuration', () => {
  const originalEnv = process.env;

  beforeEach(() => {
    vi.resetModules();
    vi.clearAllMocks();
    process.env = { ...originalEnv };
  });

  afterEach(() => {
    process.env = originalEnv;
  });

  describe('When Gateway IS configured', () => {
    beforeEach(() => {
      // Mock environment variables for Gateway configuration
      vi.stubEnv('AI_GATEWAY_API_KEY', 'test-gateway-key');
      vi.stubEnv('AI_GATEWAY_BASE_URL', 'https://gateway.example.com');
      vi.stubEnv('VERCEL', '1');

      // Need to reset modules so env vars are picked up if they are read at top-level
      // But gateway.ts reads them at top level for constants, but functions check them dynamically.
      // Ideally we should verify if gateway.ts constants are affecting the tests.
      // The constants are:
      // const DEFAULT_PROVIDER = process.env.AI_GATEWAY_PROVIDER || 'openai';
      // const VERCEL_AI_GATEWAY_BASE_URL = process.env.AI_GATEWAY_BASE_URL || ...
    });

    it('isAIGatewayConfigured returns true', () => {
      expect(isAIGatewayConfigured()).toBe(true);
    });

    it('getTextModelName keeps provider prefix', () => {
      expect(getTextModelName('google/gemini-2.0-flash')).toBe('google/gemini-2.0-flash');
      expect(getTextModelName('openai/gpt-4')).toBe('openai/gpt-4');
    });

    it('getTextModelName adds default provider if missing', () => {
      expect(getTextModelName('gpt-4o-mini')).toBe('openai/gpt-4o-mini');
    });

    it('getTextModel uses the gateway client with correct model name', () => {
      getTextModel('google/gemini-2.0-flash');

      // Check if createOpenAI was called with gateway config
      // Note: We can't easily check createOpenAI args because it might be called once and cached?
      // No, createAIGatewayClient is called inside getAIClient.

      expect(mockCreateOpenAI).toHaveBeenCalledWith(expect.objectContaining({
        baseURL: 'https://gateway.example.com',
      }));

      // The client returned by createOpenAI is called with the model name
      expect(mockOpenAIClient).toHaveBeenCalledWith('google/gemini-2.0-flash');
    });
  });

  describe('When Gateway is NOT configured', () => {
    beforeEach(() => {
      vi.stubEnv('AI_GATEWAY_API_KEY', '');
      vi.stubEnv('AI_GATEWAY_BASE_URL', '');
      vi.stubEnv('VERCEL', ''); // Unset VERCEL to force false for isAIGatewayConfigured
    });

    it('isAIGatewayConfigured returns false', () => {
      expect(isAIGatewayConfigured()).toBe(false);
    });

    it('getTextModel throws an error', () => {
      expect(() => getTextModel('google/gemini-2.0-flash')).toThrow(
        'No AI provider configured. Set AI_GATEWAY_API_KEY (for Vercel AI Gateway) or OPENAI_API_KEY (for direct OpenAI).'
      );
    });
  });
});
