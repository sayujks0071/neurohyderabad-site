import { NextResponse } from "next/server";
import { readFileSync, existsSync } from "fs";
import { join } from "path";

// Cache for a day
export const revalidate = 86400;

export async function GET() {
  try {
    // Read the generated sitemap from next-sitemap output
    // In Vercel, public/ files are available in the filesystem during serverless function execution
    // Try multiple possible paths to handle different deployment scenarios
    const possiblePaths = [
      join(process.cwd(), "public", "sitemap.xml"),
      join(process.cwd(), ".next", "server", "app", "public", "sitemap.xml"),
      "/var/task/public/sitemap.xml", // Vercel Lambda path
    ];

    let sitemapContent: string | null = null;
    for (const sitemapPath of possiblePaths) {
      if (existsSync(sitemapPath)) {
        sitemapContent = readFileSync(sitemapPath, "utf-8");
        break;
      }
    }

    if (!sitemapContent) {
      throw new Error("Sitemap file not found in any expected location");
    }

    // CRITICAL FIX: Ensure the urlset opening tag is on a single line with no line breaks
    // Google Search Console requires the opening tag to be properly formatted
    // Replace any malformed opening tags with a clean single-line version
    sitemapContent = sitemapContent.replace(
      /<urlset\s+([^>]*?)\s*>/gs,
      (match) => {
        // Extract all attributes and rebuild the tag on a single line
        const attrs = match.match(/\s+(\w+(?::\w+)?)="([^"]+)"/g) || [];
        const cleanAttrs = attrs.map(attr => attr.trim()).join(" ");
        return `<urlset ${cleanAttrs}>`;
      }
    );

    // Ensure XML declaration and urlset are properly separated
    sitemapContent = sitemapContent.replace(
      /<\?xml[^>]*\?>\s*/,
      '<?xml version="1.0" encoding="UTF-8"?>\n'
    );

    // Final cleanup: ensure urlset tag is immediately after XML declaration (no extra line breaks)
    sitemapContent = sitemapContent.replace(
      /<\?xml[^>]*\?>\s*\n\s*<urlset/,
      '<?xml version="1.0" encoding="UTF-8"?>\n<urlset'
    );

    return new NextResponse(sitemapContent, {
      status: 200,
      headers: {
        "Content-Type": "application/xml; charset=utf-8",
        "Cache-Control": "public, max-age=3600, s-maxage=3600",
      },
    });
  } catch (error) {
    console.error("Failed to read sitemap:", error);

    // Fallback: return a minimal valid sitemap
    const now = new Date().toISOString();
    const fallbackXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://www.drsayuj.info/</loc>
    <lastmod>${now}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>`;

    return new NextResponse(fallbackXml, {
      status: 200,
      headers: {
        "Content-Type": "application/xml; charset=utf-8",
        "Cache-Control": "public, max-age=3600, s-maxage=3600",
      },
    });
  }
}
