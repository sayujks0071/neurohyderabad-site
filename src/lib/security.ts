import { NextResponse } from 'next/server';

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
  if (headerKey === adminKey) {
    return { isAuthorized: true };
  }

  // Check query param (fallback/convenience)
  try {
    const url = new URL(request.url);
    const queryKey = url.searchParams.get('key');
    if (queryKey === adminKey) {
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
