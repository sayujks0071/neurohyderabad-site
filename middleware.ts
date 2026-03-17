import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Simple in-memory rate limiting map for middleware (IP -> {count, timestamp})
const rateLimitMap = new Map<string, { count: number; timestamp: number }>();
const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 1 minute
const MAX_REQUESTS_PER_WINDOW = 60;

export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone()
  const isAdminRoute = url.pathname.startsWith('/admin')
  const isApiAdminRoute = url.pathname.startsWith('/api/admin')

  // Apply rate limiting or check keys for admin routes
  if (isAdminRoute || isApiAdminRoute) {
    // Apply rate limiting for admin routes
    const ip = request.ip || request.headers.get('x-forwarded-for') || '127.0.0.1';

    const now = Date.now();
    const windowStart = now - RATE_LIMIT_WINDOW_MS;

    // Clean up old entries
    for (const [key, data] of rateLimitMap.entries()) {
      if (data.timestamp < windowStart) {
        rateLimitMap.delete(key);
      }
    }

    const currentRate = rateLimitMap.get(ip);

    if (currentRate && currentRate.timestamp > windowStart) {
      if (currentRate.count >= MAX_REQUESTS_PER_WINDOW) {
        return new NextResponse(JSON.stringify({ error: 'Too Many Requests' }), {
          status: 429,
          headers: { 'Content-Type': 'application/json' }
        });
      }
      currentRate.count++;
      currentRate.timestamp = now;
    } else {
      rateLimitMap.set(ip, { count: 1, timestamp: now });
    }

    const key = request.nextUrl.searchParams.get('key') || request.headers.get('x-admin-key')
    const validKey = process.env.ADMIN_ACCESS_KEY

    // If an ADMIN_ACCESS_KEY is configured but not provided or doesn't match, block access
    if (validKey && key !== validKey) {
      if (isApiAdminRoute) {
        return new NextResponse('Unauthorized', { status: 401 })
      }
      url.pathname = '/'
      return NextResponse.redirect(url, { status: 307 })
    }
  }

  // Allow all other routes to proceed normally
  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*', '/api/admin/:path*'],
}
