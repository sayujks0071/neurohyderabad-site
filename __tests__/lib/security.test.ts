import { verifyAdminAccess, secureCompare } from '@/src/lib/security';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { NextRequest } from 'next/server';
import { rateLimit } from '@/src/lib/rate-limit';

// Mock rate-limit module
vi.mock('@/src/lib/rate-limit', () => ({
  rateLimit: vi.fn(),
}));

describe('verifyAdminAccess', () => {
  const originalEnv = process.env;

  beforeEach(() => {
    vi.clearAllMocks();
    process.env = { ...originalEnv };
    // Default mock implementation: always success
    vi.mocked(rateLimit).mockReturnValue({
      success: true,
      limit: 60,
      remaining: 59,
      reset: Date.now() + 60000
    });
  });

  afterEach(() => {
    process.env = originalEnv;
  });

  it('should deny access if ADMIN_ACCESS_KEY is not set', async () => {
    delete process.env.ADMIN_ACCESS_KEY;
    const req = new NextRequest('http://localhost/api/test');

    const result = await verifyAdminAccess(req);

    expect(result.isAuthorized).toBe(false);
    expect(result.response?.status).toBe(500); // Fail secure
  });

  it('should authorize access with valid header', async () => {
    process.env.ADMIN_ACCESS_KEY = 'secret123';
    const req = new NextRequest('http://localhost/api/test', {
      headers: { 'x-admin-key': 'secret123' }
    });

    const result = await verifyAdminAccess(req);

    expect(result.isAuthorized).toBe(true);
    expect(result.response).toBeUndefined();
  });

  it('should deny access if key is provided only in query param', async () => {
    process.env.ADMIN_ACCESS_KEY = 'secret123';
    const req = new NextRequest('http://localhost/api/test?key=secret123');

    const result = await verifyAdminAccess(req);

    expect(result.isAuthorized).toBe(false);
    expect(result.response?.status).toBe(401);
  });

  it('should deny access with invalid key', async () => {
    process.env.ADMIN_ACCESS_KEY = 'secret123';
    const req = new NextRequest('http://localhost/api/test?key=wrong');

    const result = await verifyAdminAccess(req);

    expect(result.isAuthorized).toBe(false);
    expect(result.response?.status).toBe(401);
  });

  it('should deny access with missing key', async () => {
    process.env.ADMIN_ACCESS_KEY = 'secret123';
    const req = new NextRequest('http://localhost/api/test');

    const result = await verifyAdminAccess(req);

    expect(result.isAuthorized).toBe(false);
    expect(result.response?.status).toBe(401);
  });

  it('should return 429 if rate limit is exceeded', async () => {
    process.env.ADMIN_ACCESS_KEY = 'secret123';
    // Mock rate limit exceeded
    vi.mocked(rateLimit).mockReturnValue({
      success: false,
      limit: 60,
      remaining: 0,
      reset: Date.now() + 60000
    });

    const req = new NextRequest('http://localhost/api/test', {
      headers: { 'x-admin-key': 'secret123' }
    });

    const result = await verifyAdminAccess(req);

    expect(result.isAuthorized).toBe(false);
    expect(result.response?.status).toBe(429);

    // Verify JSON body
    const body = await result.response?.json();
    expect(body).toEqual(expect.objectContaining({
      error: 'Too Many Requests'
    }));
  });
});

describe('secureCompare', () => {
  it('should return true for identical strings', async () => {
    expect(await secureCompare('secret123', 'secret123')).toBe(true);
  });

  it('should return false for different strings', async () => {
    expect(await secureCompare('secret123', 'wrong')).toBe(false);
  });

  it('should return false for strings of different lengths', async () => {
    expect(await secureCompare('secret123', 'secret1234')).toBe(false);
  });

  it('should return false if either argument is not a string', async () => {
    // @ts-ignore
    expect(await secureCompare(null, 'secret')).toBe(false);
    // @ts-ignore
    expect(await secureCompare('secret', undefined)).toBe(false);
  });

  it('should reject extremely large payloads (DoS prevention)', async () => {
    const largePayload = 'a'.repeat(1024 * 1024); // 1MB
    const secret = 'secret123';
    expect(await secureCompare(largePayload, secret)).toBe(false);
  });
});
