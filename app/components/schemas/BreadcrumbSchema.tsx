'use client';

import { usePathname } from 'next/navigation';
import { SITE_URL } from '@/src/lib/seo';

interface BreadcrumbItem {
  name: string;
  path: string;
}

interface BreadcrumbSchemaProps {
  items?: BreadcrumbItem[];
}

export default function BreadcrumbSchema({ items: customItems }: BreadcrumbSchemaProps = {}) {
  const pathname = usePathname();

  // If custom items provided, use them
  if (customItems && customItems.length > 0) {
    const itemListElement = customItems.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.path.startsWith('http') ? item.path : `${SITE_URL}${item.path}`
    }));

    const schema = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": itemListElement
    };

    return (
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
    );
  }

  // Auto-generation logic
  // Don't render on home page if no custom items (Home usually doesn't need breadcrumb schema self-ref unless part of site structure)
  if (pathname === '/') return null;

  // Exclude routes that provide their own server-side breadcrumb schema to avoid duplication
  const EXCLUDED_PREFIXES = ['/locations', '/services', '/conditions'];
  if (EXCLUDED_PREFIXES.some(prefix => pathname.startsWith(prefix))) {
    return null;
  }

  const pathSegments = pathname.split('/').filter(Boolean);

  const items = [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": SITE_URL
    }
  ];

  let currentPath = '';
  pathSegments.forEach((segment, index) => {
    currentPath += `/${segment}`;

    // Format segment for display (e.g., "about-us" -> "About Us")
    const name = segment
      .replace(/-/g, ' ')
      .replace(/\b\w/g, char => char.toUpperCase());

    items.push({
      "@type": "ListItem",
      "position": index + 2,
      "name": name,
      "item": `${SITE_URL}${currentPath}`
    });
  });

  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
