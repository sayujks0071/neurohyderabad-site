import { describe, it, expect, vi, afterEach } from 'vitest';
import { getGatewayModel, isAIGatewayConfigured, hasAIConfig } from '../gateway';

describe('AI Gateway Configuration', () => {
  const originalEnv = process.env;

  afterEach(() => {
    process.env = { ...originalEnv };
    vi.restoreAllMocks();
  });

  it('should detect Gateway configuration via API Key', () => {
    process.env.AI_GATEWAY_API_KEY = 'test-key';
    expect(isAIGatewayConfigured()).toBe(true);
  });

  it('should detect Gateway configuration via Vercel env + Base URL', () => {
    delete process.env.AI_GATEWAY_API_KEY;
    process.env.VERCEL = '1';
    process.env.AI_GATEWAY_BASE_URL = 'https://ai-gateway.vercel.sh/v1';
    expect(isAIGatewayConfigured()).toBe(true);
  });

  it('should correctly format model names for Gateway', () => {
    process.env.AI_GATEWAY_PROVIDER = 'openai';

    // Default provider prepend
    expect(getGatewayModel('gpt-4o-mini')).toBe('openai/gpt-4o-mini');

    // Already formatted
    expect(getGatewayModel('anthropic/claude-3-5-sonnet')).toBe('anthropic/claude-3-5-sonnet');

    // Custom provider via env
    process.env.AI_GATEWAY_PROVIDER = 'google';
    expect(getGatewayModel('gemini-1.5-pro')).toBe('google/gemini-1.5-pro');
  });

  it('hasAIConfig should be true if OpenAI key is present', () => {
    process.env.OPENAI_API_KEY = 'sk-test';
    delete process.env.AI_GATEWAY_API_KEY;
    delete process.env.VERCEL;
    expect(hasAIConfig()).toBe(true);
  });
});
