import { expect, test, describe, vi, afterEach, beforeEach } from 'vitest'
import { NextRequest } from 'next/server'

// Mock dependencies
vi.mock('@/src/lib/rate-limit', () => ({
  rateLimit: vi.fn(),
  getClientIp: vi.fn().mockReturnValue('127.0.0.1')
}))

// Mock the gateway module including the new helper
vi.mock('@/src/lib/ai/gateway', () => ({
  isAIGatewayConfigured: vi.fn(),
  getGatewayModel: vi.fn(),
  getGatewayBaseUrl: vi.fn(),
  createRealtimeSession: vi.fn()
}))

// Import mocked functions
import { rateLimit } from '@/src/lib/rate-limit'
import { createRealtimeSession } from '@/src/lib/ai/gateway'
import { POST } from '@/app/api/voice-agent/session/route'

describe('Voice Agent Security', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('blocks requests when rate limit exceeded', async () => {
    const rateLimitMock = vi.mocked(rateLimit);
    rateLimitMock.mockReturnValue({ success: false, limit: 10, remaining: 0, reset: 1000 });

    const req = new NextRequest('http://localhost/api/voice-agent/session', {
      method: 'POST',
      body: JSON.stringify({})
    });

    const res = await POST(req);
    expect(res.status).toBe(429);

    const body = await res.json();
    expect(body.error).toContain('Too many requests');
  });

  test('validates input and calls createRealtimeSession', async () => {
    const rateLimitMock = vi.mocked(rateLimit);
    rateLimitMock.mockReturnValue({ success: true, limit: 10, remaining: 9, reset: 1000 });

    const createSessionMock = vi.mocked(createRealtimeSession);
    createSessionMock.mockResolvedValue({
      sessionId: 'sess_123',
      sessionUrl: 'ws://test',
      expiresAt: '123456'
    });

    const longInstructions = 'A'.repeat(6000);
    const req = new NextRequest('http://localhost/api/voice-agent/session', {
      method: 'POST',
      body: JSON.stringify({
        instructions: longInstructions,
        voice: 'invalid-voice',
        model: 'invalid-model'
      })
    });

    const res = await POST(req);
    expect(res.status).toBe(200);

    expect(createSessionMock).toHaveBeenCalledWith(expect.objectContaining({
      voice: 'alloy', // Fallback
      model: 'gpt-4o-realtime-preview', // Fallback
    }));

    // Check instruction length in the call
    const calledConfig = createSessionMock.mock.calls[0][0];
    expect(calledConfig.instructions.length).toBe(5000);
  });

  test('returns 500 when createRealtimeSession fails', async () => {
    const rateLimitMock = vi.mocked(rateLimit);
    rateLimitMock.mockReturnValue({ success: true, limit: 10, remaining: 9, reset: 1000 });

    const createSessionMock = vi.mocked(createRealtimeSession);
    createSessionMock.mockRejectedValue(new Error('Gateway Error'));

    const req = new NextRequest('http://localhost/api/voice-agent/session', {
      method: 'POST',
      body: JSON.stringify({ instructions: 'test' })
    });

    const res = await POST(req);
    expect(res.status).toBe(500);
    const body = await res.json();
    expect(body.error).toBe('Failed to create voice session');
  });
});
