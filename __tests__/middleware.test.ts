import { expect, test, describe, vi, afterEach } from 'vitest'
import { middleware } from '../middleware'
import { NextRequest, NextResponse } from 'next/server'

describe('Middleware Security Check', () => {
  const OLD_ENV = process.env;

  afterEach(() => {
    vi.resetAllMocks();
    process.env = { ...OLD_ENV };
  });

  test('should redirect /admin requests if no key provided', async () => {
    const req = new NextRequest('https://www.drsayuj.info/admin/dashboard')
    req.headers.set('host', 'www.drsayuj.info')
    req.headers.set('x-forwarded-proto', 'https')

    process.env.ADMIN_ACCESS_KEY = 'secret123'

    const res = await middleware(req)

    expect(res.status).toBe(307)
    expect(res.headers.get('location')).toBe('https://www.drsayuj.info/')
  })

  test('should allow /admin requests if key provided', async () => {
    const req = new NextRequest('https://www.drsayuj.info/admin/dashboard?key=secret123')
    req.headers.set('host', 'www.drsayuj.info')
    req.headers.set('x-forwarded-proto', 'https')

    process.env.ADMIN_ACCESS_KEY = 'secret123'

    const res = await middleware(req)
    expect(res.headers.get('x-middleware-next')).toBe('1')
  })

  test('should redirect /api/admin requests if no key provided', async () => {
    const req = new NextRequest('https://www.drsayuj.info/api/admin/appointments')
    req.headers.set('host', 'www.drsayuj.info')
    req.headers.set('x-forwarded-proto', 'https')

    process.env.ADMIN_ACCESS_KEY = 'secret123'

    const res = await middleware(req)

    // Expect 401 Unauthorized for API routes
    expect(res.status).toBe(401)
  })

  test('should allow /api/admin requests if key provided in header', async () => {
    const req = new NextRequest('https://www.drsayuj.info/api/admin/appointments')
    req.headers.set('host', 'www.drsayuj.info')
    req.headers.set('x-forwarded-proto', 'https')
    req.headers.set('x-admin-key', 'secret123')

    process.env.ADMIN_ACCESS_KEY = 'secret123'

    const res = await middleware(req)

    // Should pass through (x-middleware-next: 1)
    expect(res.headers.get('x-middleware-next')).toBe('1')
  })
})
