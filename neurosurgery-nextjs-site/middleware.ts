import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const host = req.headers.get("host") || "";
  
  // Force www canonical: drsayuj.com -> www.drsayuj.com
  if (host === "drsayuj.com") {
    const url = req.nextUrl.clone();
    url.host = "www.drsayuj.com";
    return NextResponse.redirect(url, 308);
  }

  // Protect drafts route - redirect to home if accessed publicly
  if (req.nextUrl.pathname.startsWith('/drafts')) {
    // Check for admin access key in environment
    const adminKey = process.env.ADMIN_ACCESS_KEY;
    
    // If no admin key is set, block access
    if (!adminKey) {
      return NextResponse.redirect(new URL('/', req.url));
    }
    
    // Check for admin key in query params (simple auth)
    const providedKey = req.nextUrl.searchParams.get('key');
    if (providedKey !== adminKey) {
      return NextResponse.redirect(new URL('/', req.url));
    }
  }

  return NextResponse.next();
}

export const config = { matcher: "/:path*" };

