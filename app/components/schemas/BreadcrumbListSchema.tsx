import { SITE_URL } from '../../../src/lib/seo';

interface BreadcrumbItem {
  name: string;
  href?: string;
  url?: string;
  path?: string;
}

interface BreadcrumbListSchemaProps {
  items: BreadcrumbItem[];
}

export default function BreadcrumbListSchema({ items }: BreadcrumbListSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => {
      // Support multiple property names: href, url, or path
      const itemUrl = item.href || item.url || item.path || '';
      const fullUrl = itemUrl.startsWith('http') ? itemUrl : `${SITE_URL}${itemUrl}`;
      
      return {
        "@type": "ListItem",
        "position": index + 1,
        "name": item.name,
        "item": fullUrl
      };
    })
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

