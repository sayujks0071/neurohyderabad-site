import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const WWW_HOST = 'www.drsayuj.info'
const APEX_HOST = 'drsayuj.info'

export function middleware(req: NextRequest) {
  const url = req.nextUrl.clone()
  const host = req.headers.get('host') ?? ''
  const proto = req.headers.get('x-forwarded-proto') ?? 'https'

  // 1) Canonical host: apex -> www (force https in the same hop)
  if (host === APEX_HOST) {
    url.host = WWW_HOST
    url.protocol = 'https'
    return NextResponse.redirect(url, 308)
  }

  // 2) Protocol: ensure https on www subdomain
  if (host === WWW_HOST && proto === 'http') {
    url.protocol = 'https'
    return NextResponse.redirect(url, 308)
  }

  // Protect drafts route - redirect to home if accessed publicly
  if (req.nextUrl.pathname.startsWith('/drafts')) {
    // Check for admin access key in environment
    const adminKey = process.env.ADMIN_ACCESS_KEY || 'admin123'; // Default key for development
    
    // Check for admin key in query params (simple auth)
    const providedKey = req.nextUrl.searchParams.get('key');
    if (providedKey !== adminKey) {
      return NextResponse.redirect(new URL('/', req.url));
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    // skip static/assets for perf
    '/((?!_next|assets|images|favicon.ico|robots.txt|sitemap.xml|site.webmanifest).*)',
  ],
}

