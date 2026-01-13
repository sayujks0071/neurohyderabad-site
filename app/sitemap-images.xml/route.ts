import fs from "node:fs";
import path from "node:path";
import { SITE_URL } from "@/src/lib/seo";

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

function listPublicImages(): string[] {
  const imagesDir = path.join(process.cwd(), "public", "images");
  if (!fs.existsSync(imagesDir)) return [];
  return fs
    .readdirSync(imagesDir)
    .filter((file) => /\.(png|jpe?g|webp|avif)$/i.test(file))
    .map((file) => `${SITE_URL}/images/${file}`);
}

export async function GET() {
  const images = [
    `${SITE_URL}/images/og-default.jpg`,
    `${SITE_URL}/images/dr-sayuj-krishnan-portrait-optimized.jpg`,
    `${SITE_URL}/images/logo-optimized.png`,
    ...listPublicImages(),
  ];

  // De-dupe while preserving order
  const uniqueImages = Array.from(new Set(images));

  const urlToImages: Array<{ loc: string; images: string[] }> = [
    { loc: `${SITE_URL}/`, images: uniqueImages.slice(0, 25) },
    {
      loc: `${SITE_URL}/about`,
      images: uniqueImages.filter((img) => /portrait/i.test(img)).slice(0, 10),
    },
  ].filter((entry) => entry.images.length > 0);

  let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
  xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n`;

  for (const entry of urlToImages) {
    xml += `  <url>\n`;
    xml += `    <loc>${escapeXml(entry.loc)}</loc>\n`;
    for (const img of entry.images) {
      xml += `    <image:image>\n`;
      xml += `      <image:loc>${escapeXml(img)}</image:loc>\n`;
      xml += `    </image:image>\n`;
    }
    xml += `  </url>\n`;
  }

  xml += `</urlset>\n`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}

