import { NextResponse } from "next/server";

// Cache for a day like the primary sitemap
export const revalidate = 86400;

export function GET() {
  return NextResponse.redirect("https://www.drsayuj.info/sitemap.xml", {
    status: 301,
  });
}

export function HEAD() {
  return NextResponse.redirect("https://www.drsayuj.info/sitemap.xml", {
    status: 301,
  });
}
