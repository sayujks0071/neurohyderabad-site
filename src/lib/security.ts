import { NextResponse } from 'next/server';
import crypto from 'crypto';

/**
 * Constant-time string comparison using SHA-256 hashing to prevent timing attacks.
 * @param a First string (e.g., provided key)
 * @param b Second string (e.g., secret key)
 * @returns true if strings are equal, false otherwise
 */
function secureCompare(a: string, b: string): boolean {
  if (typeof a !== 'string' || typeof b !== 'string') {
    return false;
  }

  // Create hashes for both strings
  const hashA = crypto.createHash('sha256').update(a).digest();
  const hashB = crypto.createHash('sha256').update(b).digest();

  // Compare hashes using timingSafeEqual
  // timingSafeEqual requires buffers of the same length, which SHA-256 guarantees (32 bytes)
  return crypto.timingSafeEqual(hashA, hashB);
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
export function verifyAdminAccess(request: Request): {
  isAuthorized: boolean;
  response?: NextResponse;
} {
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
  if (headerKey && secureCompare(headerKey, adminKey)) {
    return { isAuthorized: true };
  }

  // Check query param (fallback/convenience)
  try {
    const url = new URL(request.url);
    const queryKey = url.searchParams.get('key');
    if (queryKey && secureCompare(queryKey, adminKey)) {
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
