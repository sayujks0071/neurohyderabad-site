// Next.js API route — normalizes upstream encoding to fix Safari
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const path = searchParams.get('path');
    
    if (!path) {
      return NextResponse.json({ error: 'Missing path parameter' }, { status: 400 });
    }

    const upstream = new URL(path, "https://api.drsayuj.com/"); // <- WordPress backend subdomain
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
