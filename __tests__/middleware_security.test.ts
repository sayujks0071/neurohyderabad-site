import { expect, test, describe, vi, afterEach } from 'vitest'
import { middleware } from '../middleware'
import { NextRequest } from 'next/server'

describe('Middleware Security Rate Limiting', () => {
  const OLD_ENV = process.env;

  afterEach(() => {
    vi.resetAllMocks();
    process.env = { ...OLD_ENV };
  });

  test('should rate limit requests to /admin after 60 attempts', async () => {
    // Setup environment
    process.env.ADMIN_ACCESS_KEY = 'secret123'

    // Mock IP
    const ip = '10.0.0.1';

    // We need to construct requests with a specific IP.
    // Since NextRequest constructor doesn't easily allow setting IP,
    // we rely on the middleware using req.ip or fallback.
    // But req.ip is read-only.
    // We can try to mock the property on the instance.

    const createRequest = () => {
      const req = new NextRequest('https://www.drsayuj.info/admin/dashboard')
      // Define property directly on the instance to override
      Object.defineProperty(req, 'ip', {
        get() { return ip },
        configurable: true
      });
      return req;
    }

    // Send 60 requests - should succeed (either 307 or 401, but NOT 429)
    for (let i = 0; i < 60; i++) {
      const req = createRequest();
      const res = await middleware(req);
      if (res.status === 429) {
        throw new Error(`Request ${i + 1} was rate limited unexpectedly`);
      }
    }

    // Send 61st request - should fail with 429
    const req = createRequest();
    const res = await middleware(req);

    expect(res.status).toBe(429);
    const data = await res.json();
    expect(data.error).toBe('Too Many Requests');
  });
});
