import { POST } from '@/app/api/ai/sandbox/route';
import { NextRequest } from 'next/server';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

// Mock dependencies
vi.mock('@/src/lib/rate-limit', () => ({
  rateLimit: vi.fn(),
}));

vi.mock('@/src/lib/ai/gateway', () => ({
  hasAIConfig: vi.fn(),
  getAIClient: vi.fn(),
}));

vi.mock('ai', async (importOriginal) => {
  const actual = await importOriginal<typeof import('ai')>();
  return {
    ...actual,
    streamText: vi.fn(),
  };
});

import { rateLimit } from '@/src/lib/rate-limit';
import { hasAIConfig, getAIClient } from '@/src/lib/ai/gateway';
import { streamText } from 'ai';

describe('AI Sandbox API', () => {
  const originalEnv = process.env;

  beforeEach(() => {
    vi.clearAllMocks();
    process.env = { ...originalEnv };
  });

  afterEach(() => {
    process.env = originalEnv;
  });

  it('should return 429 if rate limit exceeded', async () => {
    (rateLimit as any).mockReturnValue({ success: false, limit: 10, remaining: 0, reset: 123 });

    const req = new NextRequest('http://localhost/api/ai/sandbox', {
      method: 'POST',
      headers: { 'x-forwarded-for': '127.0.0.1' },
    });

    const res = await POST(req);
    expect(res.status).toBe(429);
    const body = await res.json();
    expect(body.error).toBe('Too many requests. Please try again later.');
  });

  it('should return 500 if AI Gateway is not configured', async () => {
    (rateLimit as any).mockReturnValue({ success: true });
    (hasAIConfig as any).mockReturnValue(false);

    const req = new NextRequest('http://localhost/api/ai/sandbox', {
      method: 'POST',
      headers: { 'x-forwarded-for': '127.0.0.1' },
    });

    const res = await POST(req);
    expect(res.status).toBe(500);
    const body = await res.json();
    expect(body.error).toBe('AI Gateway is not configured.');
  });

  it('should call streamText with correct model wrapped in getAIClient', async () => {
    (rateLimit as any).mockReturnValue({ success: true });
    (hasAIConfig as any).mockReturnValue(true);

    // Mock getAIClient
    const mockClientFn = vi.fn().mockReturnValue({ id: 'mocked-openai/gpt-5.2' });
    (getAIClient as any).mockReturnValue(mockClientFn);

    // Mock streamText to return a dummy response
    const mockToDataStreamResponse = vi.fn().mockReturnValue(new Response('stream data'));
    (streamText as any).mockReturnValue({
      toDataStreamResponse: mockToDataStreamResponse,
    });

    const req = new NextRequest('http://localhost/api/ai/sandbox', {
      method: 'POST',
      headers: { 'x-forwarded-for': '127.0.0.1' },
      body: JSON.stringify({
        messages: [{ role: 'user', content: 'hello' }]
      }),
    });

    const res = await POST(req);

    // Check if getAIClient was called and used to wrap 'openai/gpt-5.2'
    expect(getAIClient).toHaveBeenCalled();
    expect(mockClientFn).toHaveBeenCalledWith('openai/gpt-5.2');

    expect(streamText).toHaveBeenCalledWith(expect.objectContaining({
      model: { id: 'mocked-openai/gpt-5.2' },
      messages: [{ role: 'user', content: 'hello' }],
    }));

    expect(mockToDataStreamResponse).toHaveBeenCalled();
  });
});
