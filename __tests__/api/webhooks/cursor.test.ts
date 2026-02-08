import { POST } from '../../../app/api/webhooks/cursor/route';
import { NextRequest } from 'next/server';
import crypto from 'crypto';
import { describe, it, expect, vi, beforeEach, afterAll } from 'vitest';

// Mock process.env
const originalEnv = process.env;

describe('POST /api/webhooks/cursor', () => {
  beforeEach(() => {
    vi.resetModules();
    process.env = { ...originalEnv };
    process.env.CURSOR_WEBHOOK_SECRET = 'test-secret';
    // Silence logs
    vi.spyOn(console, 'error').mockImplementation(() => {});
    vi.spyOn(console, 'warn').mockImplementation(() => {});
    vi.spyOn(console, 'log').mockImplementation(() => {});
  });

  afterAll(() => {
    process.env = originalEnv;
  });

  it('should return 500 if CURSOR_WEBHOOK_SECRET is not configured', async () => {
    delete process.env.CURSOR_WEBHOOK_SECRET;

    const req = new NextRequest('http://localhost/api/webhooks/cursor', {
      method: 'POST',
      body: JSON.stringify({ event: 'test' }),
    });

    const res = await POST(req);
    expect(res.status).toBe(500);
    const body = await res.json();
    expect(body.error).toContain('Auth not set up');
  });

  it('should return 401 if signature is missing', async () => {
    const req = new NextRequest('http://localhost/api/webhooks/cursor', {
      method: 'POST',
      body: JSON.stringify({ event: 'test' }),
    });

    const res = await POST(req);
    expect(res.status).toBe(401);
    const body = await res.json();
    expect(body.error).toContain('Missing signature');
  });

  it('should return 401 if signature is invalid', async () => {
    const payload = JSON.stringify({ event: 'test' });
    const req = new NextRequest('http://localhost/api/webhooks/cursor', {
      method: 'POST',
      headers: {
        'x-cursor-signature': 'invalid-signature',
      },
      body: payload,
    });

    const res = await POST(req);
    expect(res.status).toBe(401);
    const body = await res.json();
    expect(body.error).toContain('Invalid signature');
  });

  it('should return 200 if signature is valid', async () => {
    const payload = JSON.stringify({ event: 'test' });
    const secret = 'test-secret';
    const signature = crypto
      .createHmac('sha256', secret)
      .update(payload)
      .digest('hex');

    const req = new NextRequest('http://localhost/api/webhooks/cursor', {
      method: 'POST',
      headers: {
        'x-cursor-signature': signature,
      },
      body: payload,
    });

    const res = await POST(req);
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body.status).toBe('success');
  });

  it('should return 200 if signature is valid with sha256= prefix', async () => {
    const payload = JSON.stringify({ event: 'test' });
    const secret = 'test-secret';
    const signature = crypto
      .createHmac('sha256', secret)
      .update(payload)
      .digest('hex');

    const req = new NextRequest('http://localhost/api/webhooks/cursor', {
      method: 'POST',
      headers: {
        'x-cursor-signature': `sha256=${signature}`,
      },
      body: payload,
    });

    const res = await POST(req);
    expect(res.status).toBe(200);
  });
});
