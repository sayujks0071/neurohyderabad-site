import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { getOpenAIBaseUrl } from './gateway';

describe('getOpenAIBaseUrl', () => {
  const originalEnv = process.env;

  beforeEach(() => {
    vi.resetModules();
    process.env = { ...originalEnv };
  });

  afterEach(() => {
    process.env = originalEnv;
  });

  it('should return OpenAI API URL when no gateway config is present', () => {
    delete process.env.AI_GATEWAY_API_KEY;
    delete process.env.VERCEL;
    // We need to re-import the module to pick up env changes if they are read at top level
    // But gateway.ts reads env vars inside functions, so it should be fine.
    expect(getOpenAIBaseUrl()).toBe('https://api.openai.com/v1');
  });

  it('should return Gateway URL when AI_GATEWAY_API_KEY is present', () => {
    process.env.AI_GATEWAY_API_KEY = 'test-key';
    expect(getOpenAIBaseUrl()).toBe('https://ai-gateway.vercel.sh/v1');
  });

  it('should return custom Gateway URL when AI_GATEWAY_BASE_URL is present', () => {
    process.env.AI_GATEWAY_API_KEY = 'test-key';
    process.env.AI_GATEWAY_BASE_URL = 'https://custom-gateway.com/v1';
    expect(getOpenAIBaseUrl()).toBe('https://custom-gateway.com/v1');
  });

  it('should return Gateway URL when on Vercel', () => {
    process.env.VERCEL = '1';
    expect(getOpenAIBaseUrl()).toBe('https://ai-gateway.vercel.sh/v1');
  });
});
