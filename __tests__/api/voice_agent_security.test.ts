import { expect, test, describe, vi, afterEach, beforeEach } from 'vitest'
import { NextRequest } from 'next/server'

// Mock dependencies
vi.mock('@/src/lib/rate-limit', () => ({
  rateLimit: vi.fn()
}))

vi.mock('@/src/lib/ai/gateway', () => ({
  isAIGatewayConfigured: () => false,
  getGatewayModel: (m: string) => m,
  getGatewayBaseUrl: () => 'https://api.openai.com/v1'
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
  });

  afterEach(() => {
    vi.clearAllMocks();
    delete process.env.OPENAI_API_KEY;
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

    const longInstructions = 'A'.repeat(3000);

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

    // Verify instructions truncated to 2000 chars
    expect(callBody.instructions.length).toBe(2000);

    // Verify voice fallback to 'alloy'
    expect(callBody.voice).toBe('alloy');

    // Verify model fallback to 'gpt-4o-realtime-preview'
    expect(callBody.model).toBe('gpt-4o-realtime-preview');
  });
});
