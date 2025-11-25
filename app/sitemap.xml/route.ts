import { NextResponse } from "next/server";
import sitemapFunction from "../sitemap";

export const revalidate = 86400; // daily

export async function GET() {
  const entries = await sitemapFunction();

  const xml = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...entries.map((entry) => {
      const lastmod =
        entry.lastModified instanceof Date
          ? entry.lastModified.toISOString()
          : entry.lastModified;
      return [
        "<url>",
        `<loc>${entry.url}</loc>`,
        `<lastmod>${lastmod}</lastmod>`,
        `<changefreq>${entry.changeFrequency}</changefreq>`,
        `<priority>${entry.priority?.toFixed(1) ?? "0.7"}</priority>`,
        "</url>",
      ].join("");
    }),
    "</urlset>",
  ].join("");

  return new NextResponse(xml, {
    status: 200,
    headers: {
      "Content-Type": "application/xml",
    },
  });
}
