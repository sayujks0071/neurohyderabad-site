export interface BreadcrumbItem {
  name: string;
  item: string;
  position: number;
}

export function buildBreadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map(({ name, item, position }) => ({
      '@type': 'ListItem',
      position,
      name,
      item,
    })),
  };
}
