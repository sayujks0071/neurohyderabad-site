import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { secureCompare } from '@/src/lib/security'

// NOTE:
// We intentionally keep this middleware narrowly scoped via `config.matcher`
// to avoid running on public pages/assets (Edge Requests reduction).

const ALLOWED_CRAWLER_UA = [
  /Googlebot/i,
  /bingbot/i,
  /BingPreview/i,
  /DuckDuckBot/i,
  /Slurp/i, // Yahoo
]

// Common abusive scrapers/scanners. Keep this conservative to avoid false positives.
const BLOCKED_UA_SUBSTRINGS = [
  'ahrefsbot',
  'semrushbot',
  'mj12bot',
  'dotbot',
  'bytespider',
  'petalbot',
  'serpstatbot',
  'seznambot',
  'censysinspect',
  'zgrab',
  'masscan',
  'sqlmap',
  'nikto',
  'nmap',
  'gobuster',
  'dirbuster',
  'acunetix',
  'nessus',
  'python-requests',
  'aiohttp',
  'httpx',
  'okhttp',
  'go-http-client',
  'node-fetch',
  'curl',
  'wget',
  'libwww-perl',
  'scrapy',
]

function isAllowedCrawler(userAgent: string) {
  return ALLOWED_CRAWLER_UA.some((re) => re.test(userAgent))
}

function isBlockedUserAgent(userAgent: string) {
  const ua = userAgent.toLowerCase()
  return BLOCKED_UA_SUBSTRINGS.some((substr) => ua.includes(substr))
}

export async function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname
  const userAgent = req.headers.get('user-agent') ?? ''

  // Basic bad-bot blocking for sensitive paths only.
  // We explicitly allow major search crawlers to prevent SEO impact.
  if (userAgent && !isAllowedCrawler(userAgent) && isBlockedUserAgent(userAgent)) {
    if (pathname.startsWith('/api/')) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }
    return new NextResponse('Forbidden', { status: 403 })
  }

  // Protect drafts and admin routes - redirect to home if accessed publicly
  if (pathname.startsWith('/drafts') || pathname.startsWith('/admin') || pathname.startsWith('/api/admin')) {
    // Check for admin access key in environment
    // 🛡️ Sentinel: Removed default fallback to prevent unauthorized access in production if env var is missing.
    const adminKey = process.env.ADMIN_ACCESS_KEY;

    // Check for admin key in query params (simple auth)
    const providedKey = req.nextUrl.searchParams.get('key');
    // Check for admin key in headers (API auth)
    const headerKey = req.headers.get('x-admin-key');

    // 🛡️ Sentinel: Use constant-time comparison to prevent timing attacks
    const isProvidedValid = providedKey && adminKey ? await secureCompare(providedKey, adminKey) : false;
    const isHeaderValid = headerKey && adminKey ? await secureCompare(headerKey, adminKey) : false;

    // If adminKey is not configured (undefined/empty) OR provided keys do not match, deny access.
    // This ensures that if the secret is missing in production, the route is closed by default (fail secure).
    if (!adminKey || (!isProvidedValid && !isHeaderValid)) {
      if (pathname.startsWith('/api/')) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
      }
      return NextResponse.redirect(new URL('/', req.url));
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    // Keep middleware off public pages/assets to reduce Edge Requests.
    '/admin/:path*',
    '/drafts/:path*',
    '/api/admin/:path*',
    '/api/wp-proxy/:path*',
    '/utm-links/:path*',
  ],
}
