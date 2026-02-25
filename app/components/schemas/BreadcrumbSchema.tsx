import { SITE_URL } from '../../../src/lib/seo';
import { serializeJsonLd } from '@/src/lib/seo/serialize';

interface BreadcrumbSchemaProps {
  items: Array<{
    name: string;
    path: string;
  }>;
}

export default function BreadcrumbSchema({ items }: BreadcrumbSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "item": {
        "@id": `${SITE_URL}${item.path}`,
        "name": item.name
      }
    }))
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: serializeJsonLd(schema) }}
    />
  );
}
