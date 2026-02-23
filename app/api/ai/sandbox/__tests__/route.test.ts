import { POST } from '../route';
import { NextRequest } from 'next/server';
import { describe, it, expect, vi, beforeEach } from 'vitest';

// Mock dependencies
vi.mock('ai', () => ({
  streamText: vi.fn(() => ({
    toTextStreamResponse: vi.fn(() => new Response('mock-stream')),
  })),
}));

vi.mock('@/src/lib/ai/gateway', () => ({
  getTextModel: vi.fn((model) => model || 'mock-default-model'),
  hasAIConfig: vi.fn(() => true),
}));

vi.mock('@/src/lib/rate-limit', () => ({
  rateLimit: vi.fn(() => ({
    success: true,
    limit: 20,
    remaining: 19,
    reset: 1000,
  })),
}));

describe('AI Sandbox API', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('returns 429 if rate limit is exceeded', async () => {
    const { rateLimit } = await import('@/src/lib/rate-limit');
    vi.mocked(rateLimit).mockReturnValueOnce({
      success: false,
      limit: 20,
      remaining: 0,
      reset: 1000,
    });

    const req = new NextRequest('http://localhost/api/ai/sandbox', {
      method: 'POST',
      headers: { 'x-forwarded-for': '127.0.0.1' },
      body: JSON.stringify({ messages: [] }),
    });

    const res = await POST(req);
    expect(res.status).toBe(429);
    const body = await res.json();
    expect(body.error).toBe('Too many requests. Please try again later.');
  });

  it('returns 500 if AI config is missing', async () => {
    const { hasAIConfig } = await import('@/src/lib/ai/gateway');
    vi.mocked(hasAIConfig).mockReturnValueOnce(false);

    const req = new NextRequest('http://localhost/api/ai/sandbox', {
      method: 'POST',
      headers: { 'x-forwarded-for': '127.0.0.1' },
      body: JSON.stringify({ messages: [] }),
    });

    const res = await POST(req);
    expect(res.status).toBe(500);
    const body = await res.json();
    expect(body.error).toBe('AI Gateway is not configured.');
  });

  it('calls streamText with correct parameters and returns stream', async () => {
    const { streamText } = await import('ai');

    const req = new NextRequest('http://localhost/api/ai/sandbox', {
      method: 'POST',
      headers: { 'x-forwarded-for': '127.0.0.1' },
      body: JSON.stringify({ messages: [{ role: 'user', content: 'hello' }] }),
    });

    const res = await POST(req);
    expect(res.status).toBe(200);

    expect(streamText).toHaveBeenCalledWith(expect.objectContaining({
      messages: [{ role: 'user', content: 'hello' }],
      temperature: 0.7,
      maxOutputTokens: 1000,
    }));
  });

  it('maps requestedModel correctly', async () => {
    const { getTextModel } = await import('@/src/lib/ai/gateway');

    const req = new NextRequest('http://localhost/api/ai/sandbox', {
      method: 'POST',
      headers: { 'x-forwarded-for': '127.0.0.1' },
      body: JSON.stringify({
        messages: [],
        requestedModel: 'openai/gpt-5.2'
      }),
    });

    await POST(req);

    expect(getTextModel).toHaveBeenCalledWith('gpt-4');
  });
});
