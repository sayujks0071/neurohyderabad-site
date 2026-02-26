import { describe, it, expect, vi } from 'vitest';
import { NextRequest, NextResponse } from 'next/server';

// Mock dependencies before importing the module under test
vi.mock('@/src/lib/ai/gateway', () => ({
  getTextModel: vi.fn(() => 'mock-model'),
  hasAIConfig: vi.fn(() => true),
}));

vi.mock('@/src/lib/rate-limit', () => ({
  rateLimit: vi.fn(() => ({ success: true, limit: 10, remaining: 9, reset: 0 })),
}));

// Mock streamText from ai
const mockToDataStreamResponse = vi.fn(() => new Response('mock-stream-response'));
vi.mock('ai', () => ({
  streamText: vi.fn(() => ({
    toDataStreamResponse: mockToDataStreamResponse,
  })),
}));

// Import the route handler after mocks are set up
import { POST } from './route';

describe('Sandbox API Route', () => {
  it('should process request and return stream response', async () => {
    // Create a mock request
    const req = new NextRequest('http://localhost:3000/api/ai/sandbox', {
      method: 'POST',
      body: JSON.stringify({
        messages: [{ role: 'user', content: 'Hello' }],
        requestedModel: 'openai/gpt-5.2',
      }),
    });

    // Call the route handler
    const response = await POST(req);

    // Verify response
    expect(response).toBeInstanceOf(Response);
    expect(await response.text()).toBe('mock-stream-response');

    // Verify streamText was called correctly
    const { streamText } = await import('ai');
    expect(streamText).toHaveBeenCalled();
  });

  it('should return 429 if rate limit exceeded', async () => {
    // Mock rate limit failure
    const { rateLimit } = await import('@/src/lib/rate-limit');
    vi.mocked(rateLimit).mockReturnValueOnce({ success: false, limit: 10, remaining: 0, reset: 1000 });

    const req = new NextRequest('http://localhost:3000/api/ai/sandbox', {
      method: 'POST',
      body: JSON.stringify({ messages: [] }),
    });

    const response = await POST(req);
    expect(response.status).toBe(429);
    const body = await response.json();
    expect(body.error).toContain('Too many requests');
  });

  it('should return 500 if AI config is missing', async () => {
    // Mock AI config missing
    const { hasAIConfig } = await import('@/src/lib/ai/gateway');
    vi.mocked(hasAIConfig).mockReturnValueOnce(false);

    const req = new NextRequest('http://localhost:3000/api/ai/sandbox', {
      method: 'POST',
      body: JSON.stringify({ messages: [] }),
    });

    const response = await POST(req);
    expect(response.status).toBe(500);
    const body = await response.json();
    expect(body.error).toBe('AI Gateway is not configured.');
  });
});
