import { expect, test, describe, vi, afterEach, beforeEach } from 'vitest'
import { NextRequest } from 'next/server'

// Mock dependencies
vi.mock('@/src/lib/rate-limit', () => ({
  rateLimit: vi.fn().mockReturnValue({ success: true, limit: 10, remaining: 9, reset: 1000 })
}))

vi.mock('@/src/lib/ai/gateway', () => ({
  hasAIConfig: vi.fn().mockReturnValue(true),
  getTextModel: vi.fn()
}))

vi.mock('@/src/lib/scraping', () => ({
  scrapeContent: vi.fn()
}))

vi.mock('ai', () => ({
  streamText: vi.fn().mockReturnValue({
    toTextStreamResponse: vi.fn().mockReturnValue(new Response('Mock Stream'))
  })
}))

import { scrapeContent } from '@/src/lib/scraping'
import { streamText } from 'ai'
import { POST } from '@/app/api/ai/summarize/route'

describe('Summarize API', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('calls scrapeContent for URL requests', async () => {
    const scrapeMock = vi.mocked(scrapeContent);
    scrapeMock.mockResolvedValue('Mock Scraped Content');

    const req = new NextRequest('http://localhost/api/ai/summarize', {
      method: 'POST',
      body: JSON.stringify({ url: 'https://example.com' })
    });

    const res = await POST(req);

    expect(scrapeMock).toHaveBeenCalledWith('https://example.com');
    expect(streamText).toHaveBeenCalledWith(expect.objectContaining({
      prompt: expect.stringContaining('Mock Scraped Content')
    }));
    expect(res).toBeInstanceOf(Response);
  });

  test('handles scraping errors', async () => {
    const scrapeMock = vi.mocked(scrapeContent);
    scrapeMock.mockRejectedValue(new Error('Scrape Failed'));

    const req = new NextRequest('http://localhost/api/ai/summarize', {
      method: 'POST',
      body: JSON.stringify({ url: 'https://example.com' })
    });

    const res = await POST(req);
    expect(res.status).toBe(400);
    const body = await res.json();
    expect(body.error).toContain('Failed to fetch content');
  });

  test('handles direct content requests', async () => {
    const req = new NextRequest('http://localhost/api/ai/summarize', {
      method: 'POST',
      body: JSON.stringify({ content: 'Direct Content' })
    });

    await POST(req);

    expect(streamText).toHaveBeenCalledWith(expect.objectContaining({
      prompt: expect.stringContaining('Direct Content')
    }));
  });
});
