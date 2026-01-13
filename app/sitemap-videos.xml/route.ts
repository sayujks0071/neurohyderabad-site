import { SITE_URL } from "@/src/lib/seo";
import { mediaPublications } from "@/src/content/media";
import { patientStories } from "@/src/content/stories";

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

function extractYouTubeId(url: string): string | null {
  const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\s?/]+)/i);
  return match?.[1] ?? null;
}

type VideoEntry = {
  id: string;
  pageUrl: string;
  title: string;
  description: string;
  contentUrl: string;
  publicationDate?: string;
};

export async function GET() {
  const entries: VideoEntry[] = [];

  // Patient stories videos
  for (const story of patientStories) {
    if (!story.videoUrl) continue;
    const id = extractYouTubeId(story.videoUrl);
    if (!id) continue;
    entries.push({
      id,
      pageUrl: `${SITE_URL}/patient-stories`,
      title: story.title,
      description: story.summary,
      contentUrl: story.videoUrl,
      publicationDate: story.date,
    });
  }

  // Media publications (YouTube interviews/podcasts)
  for (const pub of mediaPublications) {
    const id = extractYouTubeId(pub.url);
    if (!id) continue;
    entries.push({
      id,
      pageUrl: `${SITE_URL}/media`,
      title: pub.title,
      description: pub.description,
      contentUrl: pub.url,
      publicationDate: pub.date,
    });
  }

  // De-dupe by video id (keep first occurrence)
  const seen = new Set<string>();
  const unique = entries.filter((e) => {
    if (seen.has(e.id)) return false;
    seen.add(e.id);
    return true;
  });

  let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
  xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">\n`;

  for (const v of unique) {
    xml += `  <url>\n`;
    xml += `    <loc>${escapeXml(v.pageUrl)}</loc>\n`;
    xml += `    <video:video>\n`;
    xml += `      <video:thumbnail_loc>${escapeXml(
      `https://img.youtube.com/vi/${v.id}/maxresdefault.jpg`
    )}</video:thumbnail_loc>\n`;
    xml += `      <video:title>${escapeXml(v.title || "Dr. Sayuj Krishnan - Neurosurgery Video")}</video:title>\n`;
    xml += `      <video:description>${escapeXml(
      v.description || "Educational video about neurosurgery and spine surgery by Dr. Sayuj Krishnan."
    )}</video:description>\n`;
    xml += `      <video:content_loc>${escapeXml(v.contentUrl)}</video:content_loc>\n`;
    xml += `      <video:player_loc>${escapeXml(`https://www.youtube.com/embed/${v.id}`)}</video:player_loc>\n`;
    if (v.publicationDate) {
      // Ensure ISO-ish; if it's already YYYY-MM-DD, append midnight UTC
      const iso = /^\d{4}-\d{2}-\d{2}$/.test(v.publicationDate)
        ? `${v.publicationDate}T00:00:00+00:00`
        : v.publicationDate;
      xml += `      <video:publication_date>${escapeXml(iso)}</video:publication_date>\n`;
    }
    xml += `      <video:family_friendly>yes</video:family_friendly>\n`;
    xml += `      <video:requires_subscription>no</video:requires_subscription>\n`;
    xml += `      <video:live>no</video:live>\n`;
    xml += `    </video:video>\n`;
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

