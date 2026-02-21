import { expect, test, describe, vi, afterEach, beforeEach } from 'vitest'
import { scrapeContent } from '@/src/lib/scraping'

// Mock next/cache
vi.mock('next/cache', () => ({
  unstable_cache: (fn: any) => fn
}));

// Mock jsdom
vi.mock('jsdom', () => {
  return {
    JSDOM: class {
      window = {
        document: {
          querySelectorAll: () => ({ forEach: () => {} }),
          querySelector: (sel: string) => {
            if (sel === 'article') return { textContent: 'Mock Article Content' };
            return null;
          },
          body: { textContent: 'Mock Body Content' }
        }
      }
      constructor(html: string) {}
    }
  }
});

const fetchMock = vi.fn();
global.fetch = fetchMock;

describe('Scraping Library', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('scrapes content successfully', async () => {
    fetchMock.mockResolvedValue({
      ok: true,
      text: async () => '<html><body><article>Mock Article Content</article></body></html>'
    });

    const content = await scrapeContent('https://example.com/article');
    expect(content).toBe('Mock Article Content');
    expect(fetchMock).toHaveBeenCalledWith('https://example.com/article', expect.any(Object));
  });

  test('blocks local IP addresses', async () => {
    await expect(scrapeContent('http://localhost:3000')).rejects.toThrow('Restricted URL access');
    await expect(scrapeContent('http://127.0.0.1')).rejects.toThrow('Restricted URL access');
    await expect(scrapeContent('http://192.168.1.1')).rejects.toThrow('Restricted URL access');
  });

  test('blocks invalid protocols', async () => {
    await expect(scrapeContent('ftp://example.com')).rejects.toThrow('Invalid URL protocol');
  });

  test('handles fetch errors', async () => {
    fetchMock.mockResolvedValue({
      ok: false,
      status: 404,
      statusText: 'Not Found'
    });

    await expect(scrapeContent('https://example.com/404')).rejects.toThrow('Failed to fetch URL');
  });
});
