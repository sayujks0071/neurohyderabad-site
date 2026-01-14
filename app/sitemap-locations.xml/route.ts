import type { MetadataRoute } from "next";
import sitemapLocations from "../sitemap-locations";

export const runtime = "nodejs";
// Regenerate weekly
export const revalidate = 604800;

function escapeXml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

function toSitemapXml(entries: MetadataRoute.Sitemap): string {
  let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
  xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

  for (const entry of entries) {
    xml += `  <url>\n`;
    xml += `    <loc>${escapeXml(entry.url)}</loc>\n`;
    if (entry.lastModified) {
      const lastmod =
        typeof entry.lastModified === "string"
          ? entry.lastModified
          : entry.lastModified.toISOString();
      xml += `    <lastmod>${escapeXml(lastmod)}</lastmod>\n`;
    }
    if (entry.changeFrequency) {
      xml += `    <changefreq>${escapeXml(entry.changeFrequency)}</changefreq>\n`;
    }
    if (typeof entry.priority === "number") {
      xml += `    <priority>${entry.priority.toFixed(1)}</priority>\n`;
    }
    xml += `  </url>\n`;
  }

  xml += `</urlset>\n`;
  return xml;
}

export async function GET() {
  const entries = sitemapLocations();
  const xml = toSitemapXml(entries);

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
