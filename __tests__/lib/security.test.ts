import { verifyAdminAccess } from '@/src/lib/security';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { NextRequest } from 'next/server';

describe('verifyAdminAccess', () => {
  const originalEnv = process.env;

  beforeEach(() => {
    vi.resetModules();
    process.env = { ...originalEnv };
  });

  afterEach(() => {
    process.env = originalEnv;
  });

  it('should deny access if ADMIN_ACCESS_KEY is not set', () => {
    delete process.env.ADMIN_ACCESS_KEY;
    const req = new NextRequest('http://localhost/api/test');

    const result = verifyAdminAccess(req);

    expect(result.isAuthorized).toBe(false);
    expect(result.response?.status).toBe(500); // Fail secure
  });

  it('should authorize access with valid header', () => {
    process.env.ADMIN_ACCESS_KEY = 'secret123';
    const req = new NextRequest('http://localhost/api/test', {
      headers: { 'x-admin-key': 'secret123' }
    });

    const result = verifyAdminAccess(req);

    expect(result.isAuthorized).toBe(true);
    expect(result.response).toBeUndefined();
  });

  it('should authorize access with valid query param', () => {
    process.env.ADMIN_ACCESS_KEY = 'secret123';
    const req = new NextRequest('http://localhost/api/test?key=secret123');

    const result = verifyAdminAccess(req);

    expect(result.isAuthorized).toBe(true);
  });

  it('should deny access with invalid key', () => {
    process.env.ADMIN_ACCESS_KEY = 'secret123';
    const req = new NextRequest('http://localhost/api/test?key=wrong');

    const result = verifyAdminAccess(req);

    expect(result.isAuthorized).toBe(false);
    expect(result.response?.status).toBe(401);
  });

  it('should deny access with missing key', () => {
    process.env.ADMIN_ACCESS_KEY = 'secret123';
    const req = new NextRequest('http://localhost/api/test');

    const result = verifyAdminAccess(req);

    expect(result.isAuthorized).toBe(false);
    expect(result.response?.status).toBe(401);
  });
});
