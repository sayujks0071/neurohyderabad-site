// Next.js API route — normalizes upstream encoding to fix Safari
import { NextRequest, NextResponse } from 'next/server';

const UPSTREAM_BASE = "https://api.drsayuj.com/";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const path = searchParams.get('path');
    
    if (!path) {
      return NextResponse.json({ error: 'Missing path parameter' }, { status: 400 });
    }

    // 🛡️ Sentinel: Prevent SSRF by ensuring the resolved URL stays on the expected origin.
    // An attacker might pass "https://evil.com" as path, which new URL() would accept as the new base.
    const upstream = new URL(path, UPSTREAM_BASE);

    if (upstream.origin !== new URL(UPSTREAM_BASE).origin) {
       console.warn(`[Security] Blocked SSRF attempt to: ${upstream.href}`);
       return NextResponse.json({ error: 'Invalid path: specific origin required' }, { status: 400 });
    }

    const u = upstream.toString();

    const r = await fetch(u, {
      headers: {
        // Force origin to return identity (no gzip/br) to avoid double encoding at edge
        "Accept-Encoding": "identity",
        "User-Agent": "drsayuj-vercel-proxy"
      },
      // Optional: revalidate frequently for WP content
      cache: "no-store"
    });

    const buf = Buffer.from(await r.arrayBuffer());
    // Forward MIME if sane; otherwise default to text/html
    const ct = r.headers.get("content-type") || "text/html; charset=utf-8";

    const response = new NextResponse(buf, {
      status: r.status,
      headers: {
        "Content-Type": ct,
        "Cache-Control": "public, max-age=60",
        // DO NOT set Content-Encoding — we are sending identity
      }
    });

    return response;
  } catch (e) {
    return NextResponse.json({ 
      error: "WP proxy failed", 
      detail: String(e) 
    }, { status: 502 });
  }
}
