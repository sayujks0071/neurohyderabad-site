import { POST } from '@/app/api/ai/sandbox/route';
import { NextRequest } from 'next/server';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

// Mock dependencies
vi.mock('@/src/lib/rate-limit', () => ({
  rateLimit: vi.fn(),
}));

vi.mock('@/src/lib/ai/gateway', () => ({
  hasAIConfig: vi.fn(),
  getTextModel: vi.fn(),
}));

vi.mock('ai', () => ({
  streamText: vi.fn(),
}));

import { rateLimit } from '@/src/lib/rate-limit';
import { hasAIConfig, getTextModel } from '@/src/lib/ai/gateway';
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

  it('should call streamText with correct model mapping', async () => {
    (rateLimit as any).mockReturnValue({ success: true });
    (hasAIConfig as any).mockReturnValue(true);

    // Mock getTextModel to return a dummy model object
    const mockModel = { id: 'mock-model' };
    (getTextModel as any).mockImplementation((name: string) => {
        if (name === 'gpt-4') return { id: 'mapped-gpt-4' };
        return { id: 'default-model' };
    });

    // Mock streamText to return a dummy response
    const mockToDataStreamResponse = vi.fn().mockReturnValue(new Response('stream data'));
    (streamText as any).mockReturnValue({
      toDataStreamResponse: mockToDataStreamResponse,
    });

    const req = new NextRequest('http://localhost/api/ai/sandbox', {
      method: 'POST',
      headers: { 'x-forwarded-for': '127.0.0.1' },
      body: JSON.stringify({
        messages: [{ role: 'user', content: 'hello' }],
        requestedModel: 'openai/gpt-5.2', // This should trigger the mapping logic
      }),
    });

    const res = await POST(req);

    // Check if getTextModel was called with 'gpt-4' because 'openai/gpt-5.2' maps to it in the route code
    expect(getTextModel).toHaveBeenCalledWith('gpt-4');

    expect(streamText).toHaveBeenCalledWith(expect.objectContaining({
      model: { id: 'mapped-gpt-4' }, // Checks if the mapped model object was passed
      messages: [{ role: 'user', content: 'hello' }],
    }));

    expect(mockToDataStreamResponse).toHaveBeenCalled();
  });

  it('should use default model if no requestedModel provided', async () => {
    (rateLimit as any).mockReturnValue({ success: true });
    (hasAIConfig as any).mockReturnValue(true);

    (getTextModel as any).mockReturnValue({ id: 'default-model' });

    const mockToDataStreamResponse = vi.fn().mockReturnValue(new Response('stream data'));
    (streamText as any).mockReturnValue({
      toDataStreamResponse: mockToDataStreamResponse,
    });

    const req = new NextRequest('http://localhost/api/ai/sandbox', {
      method: 'POST',
      body: JSON.stringify({
        messages: [{ role: 'user', content: 'hello' }],
      }),
    });

    await POST(req);

    // Should call getTextModel with no arguments (undefined), using default
    expect(getTextModel).toHaveBeenCalledWith();
  });
});
