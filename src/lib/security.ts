import { NextResponse, NextRequest } from 'next/server';
import { rateLimit } from './rate-limit';

/**
 * Constant-time string comparison using SHA-256 hashing.
 *
 * @param a First string (e.g., provided key)
 * @param b Second string (e.g., secret key)
 * @returns true if strings are equal, false otherwise
 */
export async function secureCompare(a: string, b: string): Promise<boolean> {
  if (typeof a !== 'string' || typeof b !== 'string') {
    return false;
  }

  // Use crypto.subtle.digest which is available in both Node.js (via globalThis.crypto) and Edge Runtime
  const encoder = new TextEncoder();
  const aBuf = encoder.encode(a);
  const bBuf = encoder.encode(b);

  // Hash both inputs to ensure constant length comparison
  const hashA = await crypto.subtle.digest('SHA-256', aBuf);
  const hashB = await crypto.subtle.digest('SHA-256', bBuf);

  const viewA = new DataView(hashA);
  const viewB = new DataView(hashB);

  // Constant-time comparison of hashes
  let result = 0;
  // SHA-256 produces 32 bytes, so byteLength is always 32
  for (let i = 0; i < hashA.byteLength; i++) {
    result |= viewA.getUint8(i) ^ viewB.getUint8(i);
  }

  return result === 0;
}

/**
 * Verifies that the request contains a valid admin access key.
 * Checks 'x-admin-key' header first, then 'key' query parameter.
 *
 * @param request The incoming request
 * @returns Object containing isAuthorized boolean and optional error response
 *
 * 🛡️ Sentinel: Used to secure admin-only API routes.
 */
export async function verifyAdminAccess(request: Request): Promise<{
  isAuthorized: boolean;
  response?: NextResponse;
}> {
  // 🛡️ Sentinel: Rate limiting protection against brute-force attacks
  // Try to get IP from NextRequest property or headers
  let ip = 'unknown';
  if ((request as any).ip) {
    ip = (request as any).ip;
  } else {
    const forwardedFor = request.headers.get('x-forwarded-for');
    if (forwardedFor) {
      ip = forwardedFor.split(',')[0].trim();
    }
  }

  // Apply rate limit: 60 requests per minute per IP
  // Allowing 60 req/min for admin tools/scripts seems reasonable while stopping aggressive brute force
  const limit = rateLimit(ip, 60, 60 * 1000);

  if (!limit.success) {
    return {
      isAuthorized: false,
      response: NextResponse.json(
        {
          error: 'Too Many Requests',
          message: 'Rate limit exceeded. Please try again later.'
        },
        {
          status: 429,
          headers: {
            'Retry-After': Math.ceil((limit.reset - Date.now()) / 1000).toString(),
            'X-RateLimit-Limit': limit.limit.toString(),
            'X-RateLimit-Remaining': limit.remaining.toString(),
            'X-RateLimit-Reset': Math.ceil(limit.reset / 1000).toString()
          }
        }
      ),
    };
  }

  const adminKey = process.env.ADMIN_ACCESS_KEY;

  // Fail secure: if no key is configured, deny everything
  if (!adminKey) {
    console.warn('Security: ADMIN_ACCESS_KEY not configured. Denying access.');
    return {
      isAuthorized: false,
      response: NextResponse.json(
        { error: 'Server misconfiguration: Auth not set up' },
        { status: 500 }
      ),
    };
  }

  // Check header (preferred for APIs)
  const headerKey = request.headers.get('x-admin-key');
  if (headerKey && await secureCompare(headerKey, adminKey)) {
    return { isAuthorized: true };
  }

  // Check query param (fallback/convenience)
  try {
    const url = new URL(request.url);
    const queryKey = url.searchParams.get('key');
    if (queryKey && await secureCompare(queryKey, adminKey)) {
      return { isAuthorized: true };
    }
  } catch (e) {
    // Invalid URL format
    console.error('Security: Failed to parse request URL', e);
  }

  // Deny access
  return {
    isAuthorized: false,
    response: NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    ),
  };
}
