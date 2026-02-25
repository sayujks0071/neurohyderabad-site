import { SITE_URL } from '../../../src/lib/seo';
import { serializeJsonLd } from '@/src/lib/seo/serialize';

interface VideoObjectSchemaProps {
  videoId: string;
  title: string;
  description: string;
  thumbnailUrl?: string;
  uploadDate?: string;
  duration?: string;
}

export default function VideoObjectSchema({
  videoId,
  title,
  description,
  thumbnailUrl,
  uploadDate,
  duration,
}: VideoObjectSchemaProps) {
  const videoUrl = `https://www.youtube.com/watch?v=${videoId}`;
  const embedUrl = `https://www.youtube.com/embed/${videoId}`;
  const defaultThumbnail = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;

  const schema = {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    "name": title,
    "description": description,
    "thumbnailUrl": thumbnailUrl || defaultThumbnail,
    "uploadDate": uploadDate || new Date().toISOString(),
    "duration": duration,
    "contentUrl": videoUrl,
    "embedUrl": embedUrl,
    "publisher": {
      "@type": "Organization",
      "name": "Dr. Sayuj Krishnan - Neurosurgeon",
      "logo": {
        "@type": "ImageObject",
        "url": `${SITE_URL}/images/logo.png`
      }
    },
    "potentialAction": {
      "@type": "WatchAction",
      "target": videoUrl
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: serializeJsonLd(schema) }}
    />
  );
}

