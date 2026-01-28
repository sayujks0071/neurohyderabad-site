import { expect, test, describe, vi, afterEach } from 'vitest'
import { middleware } from '../middleware'
import { NextRequest, NextResponse } from 'next/server'

describe('Middleware Security Check', () => {
  const OLD_ENV = process.env;

  afterEach(() => {
    vi.resetAllMocks();
    process.env = { ...OLD_ENV };
  });

  test('should redirect /admin requests if no key provided', () => {
    const req = new NextRequest('https://www.drsayuj.info/admin/dashboard')
    req.headers.set('host', 'www.drsayuj.info')
    req.headers.set('x-forwarded-proto', 'https')

    process.env.ADMIN_ACCESS_KEY = 'secret123'

    const res = middleware(req)

    expect(res.status).toBe(307)
    expect(res.headers.get('location')).toBe('https://www.drsayuj.info/')
  })

  test('should allow /admin requests if key provided', () => {
    const req = new NextRequest('https://www.drsayuj.info/admin/dashboard?key=secret123')
    req.headers.set('host', 'www.drsayuj.info')
    req.headers.set('x-forwarded-proto', 'https')

    process.env.ADMIN_ACCESS_KEY = 'secret123'

    const res = middleware(req)
    expect(res.headers.get('x-middleware-next')).toBe('1')
  })

  test('should redirect /api/admin requests if no key provided', () => {
    const req = new NextRequest('https://www.drsayuj.info/api/admin/appointments')
    req.headers.set('host', 'www.drsayuj.info')
    req.headers.set('x-forwarded-proto', 'https')

    process.env.ADMIN_ACCESS_KEY = 'secret123'

    const res = middleware(req)

    // Expect 401 Unauthorized for API routes
    expect(res.status).toBe(401)
    // Verify JSON body would be correct (mocked response doesn't strictly parse body here easily without stream reading, but status is key)
  })

  test('should allow /api/admin requests if key provided in header', () => {
    const req = new NextRequest('https://www.drsayuj.info/api/admin/appointments')
    req.headers.set('host', 'www.drsayuj.info')
    req.headers.set('x-forwarded-proto', 'https')
    req.headers.set('x-admin-key', 'secret123')

    process.env.ADMIN_ACCESS_KEY = 'secret123'

    const res = middleware(req)

    // Should pass through (x-middleware-next: 1)
    expect(res.headers.get('x-middleware-next')).toBe('1')
  })
})
