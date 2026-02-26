import { describe, it, expect, vi, beforeEach } from 'vitest';
import { middlewareApi } from './api-client';

// Mock fetch globally
const globalFetch = vi.fn();
global.fetch = globalFetch;

describe('MiddlewareApiClient', () => {
  beforeEach(() => {
    globalFetch.mockClear();
    // Reset singleton if needed, but for now we test the instance method
  });

  it('getRules calls the correct endpoint', async () => {
    const mockResponse = [{ id: 'rule-1', name: 'Test Rule' }];
    globalFetch.mockResolvedValue({
      ok: true,
      json: async () => mockResponse,
    });

    const rules = await middlewareApi.getRules();

    expect(globalFetch).toHaveBeenCalledWith(
      expect.stringContaining('/rules'),
      expect.objectContaining({
        headers: expect.objectContaining({
          'Content-Type': 'application/json',
        }),
      })
    );
    expect(rules).toEqual(mockResponse);
  });
});
