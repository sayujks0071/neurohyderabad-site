/**
 * @vitest-environment node
 */
import { POST } from '@/app/api/webhooks/middleware/route';
import { NextRequest } from 'next/server';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

describe('Middleware Webhook API', () => {
  const originalEnv = process.env;

  beforeEach(() => {
    process.env = { ...originalEnv };
    process.env.MIDDLEWARE_WEBHOOK_SECRET = 'test-secret';
    // Mock console to keep output clean
    vi.spyOn(console, 'log').mockImplementation(() => {});
    vi.spyOn(console, 'error').mockImplementation(() => {});
    vi.spyOn(console, 'warn').mockImplementation(() => {});
  });

  afterEach(() => {
    process.env = originalEnv;
    vi.restoreAllMocks();
  });

  it('should return 401 when no secret is provided', async () => {
    const req = new NextRequest('http://localhost/api/webhooks/middleware', {
      method: 'POST',
      body: JSON.stringify({
        id: 'alert-123',
        name: 'High Error Rate',
        severity: 'critical',
        metric: 'error.rate',
        value: 0.05,
        threshold: 0.01,
        condition: '>',
        timestamp: new Date().toISOString(),
      }),
    });
    const response = await POST(req);

    expect(response.status).toBe(401);
    const data = await response.json();
    expect(data.error).toBe('Unauthorized');
  });

  it('should return 401 when invalid secret is provided', async () => {
    const req = new NextRequest('http://localhost/api/webhooks/middleware', {
      method: 'POST',
      headers: { 'x-middleware-secret': 'wrong-secret' },
      body: JSON.stringify({
        id: 'alert-123',
        name: 'High Error Rate',
        severity: 'critical',
        metric: 'error.rate',
        value: 0.05,
        threshold: 0.01,
        condition: '>',
        timestamp: new Date().toISOString(),
      }),
    });
    const response = await POST(req);

    expect(response.status).toBe(401);
  });

  it('should return 200 when valid secret is provided', async () => {
    const req = new NextRequest('http://localhost/api/webhooks/middleware', {
      method: 'POST',
      headers: { 'x-middleware-secret': 'test-secret' },
      body: JSON.stringify({
        id: 'alert-123',
        name: 'High Error Rate',
        severity: 'critical',
        metric: 'error.rate',
        value: 0.05,
        threshold: 0.01,
        condition: '>',
        timestamp: new Date().toISOString(),
      }),
    });
    const response = await POST(req);

    expect(response.status).toBe(200);
    const data = await response.json();
    expect(data.received).toBe(true);
  });

  it('should return 500 if MIDDLEWARE_WEBHOOK_SECRET is not configured', async () => {
    delete process.env.MIDDLEWARE_WEBHOOK_SECRET;
    const req = new NextRequest('http://localhost/api/webhooks/middleware', {
      method: 'POST',
      body: JSON.stringify({}),
    });
    const response = await POST(req);

    expect(response.status).toBe(500);
    const data = await response.json();
    expect(data.error).toContain('Server misconfiguration');
  });
});
