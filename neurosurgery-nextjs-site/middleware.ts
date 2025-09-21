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
  return NextResponse.next();
}

export const config = { matcher: "/:path*" };
