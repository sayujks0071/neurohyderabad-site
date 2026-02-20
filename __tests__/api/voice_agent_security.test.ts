import { expect, test, describe, vi, afterEach, beforeEach } from 'vitest'
import { NextRequest } from 'next/server'

// Mock dependencies
vi.mock('@/src/lib/rate-limit', () => ({
  rateLimit: vi.fn()
}))

// Use hoisted variable for mutable mock
const mocks = vi.hoisted(() => ({
  isAIGatewayConfigured: vi.fn().mockReturnValue(false)
}))

vi.mock('@/src/lib/ai/gateway', () => ({
  isAIGatewayConfigured: mocks.isAIGatewayConfigured,
  getGatewayModel: (m: string) => `openai/${m}`,
  getGatewayBaseUrl: () => 'https://ai-gateway.vercel.sh/v1'
}))

// Mock fetch
const fetchMock = vi.fn()
global.fetch = fetchMock

// Import rateLimit to mock return values
import { rateLimit } from '@/src/lib/rate-limit'

// Import the route handler AFTER mocking
import { POST } from '@/app/api/voice-agent/session/route'

describe('Voice Agent Security', () => {
  beforeEach(() => {
    process.env.OPENAI_API_KEY = 'mock-key';
    // Reset gateway config to false by default
    mocks.isAIGatewayConfigured.mockReturnValue(false);
  });

  afterEach(() => {
    vi.clearAllMocks();
    delete process.env.OPENAI_API_KEY;
    delete process.env.AI_GATEWAY_API_KEY;
  });

  test('blocks requests when rate limit exceeded', async () => {
    const rateLimitMock = vi.mocked(rateLimit);
    rateLimitMock.mockReturnValue({ success: false, limit: 10, remaining: 0, reset: 1000 });

    const req = new NextRequest('http://localhost/api/voice-agent/session', {
      method: 'POST',
      headers: { 'x-forwarded-for': '1.2.3.4' }
    });

    const res = await POST(req);
    expect(res.status).toBe(429);

    const body = await res.json();
    expect(body.error).toContain('Too many requests');
  });

  test('validates and sanitizes input parameters', async () => {
    const rateLimitMock = vi.mocked(rateLimit);
    rateLimitMock.mockReturnValue({ success: true, limit: 10, remaining: 9, reset: 1000 });

    fetchMock.mockResolvedValue({
      ok: true,
      json: async () => ({ id: 'sess_123', client_secret: { url: 'ws://test' }, expires_at: 123456 })
    });

    // Create instructions longer than 5000 chars to test truncation
    const longInstructions = 'A'.repeat(6000);

    const req = new NextRequest('http://localhost/api/voice-agent/session', {
      method: 'POST',
      body: JSON.stringify({
        instructions: longInstructions,
        voice: 'invalid-voice-should-fallback',
        model: 'invalid-model-should-fallback'
      })
    });

    await POST(req);

    expect(fetchMock).toHaveBeenCalled();
    const callArgs = fetchMock.mock.calls[0];
    const callBody = JSON.parse(callArgs[1].body);

    // Verify instructions truncated to 5000 chars (updated from 2000)
    expect(callBody.instructions.length).toBe(5000);

    // Verify voice fallback to 'alloy'
    expect(callBody.voice).toBe('alloy');

    // Verify model fallback to 'gpt-4o-realtime-preview'
    // Since gateway is false (default), it uses bare model name
    expect(callBody.model).toBe('gpt-4o-realtime-preview');
  });

  test('uses Vercel AI Gateway when configured', async () => {
    const rateLimitMock = vi.mocked(rateLimit);
    rateLimitMock.mockReturnValue({ success: true, limit: 10, remaining: 9, reset: 1000 });

    // Enable Gateway
    mocks.isAIGatewayConfigured.mockReturnValue(true);
    process.env.AI_GATEWAY_API_KEY = 'gateway-key';

    fetchMock.mockResolvedValue({
      ok: true,
      json: async () => ({ id: 'sess_gateway', client_secret: { url: 'ws://gateway' }, expires_at: 123456 })
    });

    const req = new NextRequest('http://localhost/api/voice-agent/session', {
      method: 'POST',
      body: JSON.stringify({
        instructions: 'test',
        voice: 'alloy',
        model: 'gpt-4o-realtime-preview'
      })
    });

    await POST(req);

    expect(fetchMock).toHaveBeenCalled();
    const callArgs = fetchMock.mock.calls[0];
    const url = callArgs[0];
    const callBody = JSON.parse(callArgs[1].body);

    // Verify Gateway URL is used
    expect(url).toBe('https://ai-gateway.vercel.sh/v1/realtime/sessions');

    // Verify model has provider prefix for Gateway
    expect(callBody.model).toBe('openai/gpt-4o-realtime-preview');
  });

  test('falls back to direct OpenAI when Gateway fails', async () => {
    const rateLimitMock = vi.mocked(rateLimit);
    rateLimitMock.mockReturnValue({ success: true, limit: 10, remaining: 9, reset: 1000 });

    // Enable Gateway
    mocks.isAIGatewayConfigured.mockReturnValue(true);
    // Set both keys to allow fallback
    process.env.AI_GATEWAY_API_KEY = 'gateway-key';
    process.env.OPENAI_API_KEY = 'direct-key';

    // Mock first call (Gateway) failure, second call (Direct) success
    fetchMock
      .mockResolvedValueOnce({
        ok: false,
        status: 500,
        text: async () => 'Gateway Error'
      })
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({ id: 'sess_fallback', client_secret: { url: 'ws://direct' }, expires_at: 123456 })
      });

    const req = new NextRequest('http://localhost/api/voice-agent/session', {
      method: 'POST',
      body: JSON.stringify({
        instructions: 'test',
        voice: 'alloy',
        model: 'gpt-4o-realtime-preview'
      })
    });

    const res = await POST(req);
    const body = await res.json();

    expect(fetchMock).toHaveBeenCalledTimes(2);

    // First call: Gateway
    const firstCall = fetchMock.mock.calls[0];
    expect(firstCall[0]).toBe('https://ai-gateway.vercel.sh/v1/realtime/sessions');
    expect(JSON.parse(firstCall[1].body).model).toBe('openai/gpt-4o-realtime-preview');

    // Second call: Direct OpenAI fallback
    const secondCall = fetchMock.mock.calls[1];
    expect(secondCall[0]).toBe('https://api.openai.com/v1/realtime/sessions');
    // Direct call uses bare model name
    expect(JSON.parse(secondCall[1].body).model).toBe('gpt-4o-realtime-preview');
    // Verify fallback authorization header uses direct key
    expect(secondCall[1].headers['Authorization']).toBe('Bearer direct-key');

    // Verify successful response from fallback
    expect(res.status).toBe(200);
    expect(body.sessionId).toBe('sess_fallback');
  });
});
