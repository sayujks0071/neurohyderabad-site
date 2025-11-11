export interface LocalBusinessInput {
  name: string;
  url: string;
  telephone?: string;
  priceRange?: string;
  image?: string;
  sameAs?: string[];
  address: {
    streetAddress: string;
    addressLocality: string;
    addressRegion: string;
    postalCode: string;
  };
  geo?: {
    latitude: number;
    longitude: number;
  };
  openingHours?: string[];
}

export function buildLocalBusinessSchema(input: LocalBusinessInput) {
  const {
    name,
    url,
    telephone,
    priceRange,
    image,
    sameAs = [],
    address,
    geo,
    openingHours = [],
  } = input;

  return {
    '@context': 'https://schema.org',
    '@type': 'MedicalBusiness',
    name,
    url,
    telephone,
    priceRange,
    image,
    sameAs,
    address: {
      '@type': 'PostalAddress',
      ...address,
    },
    geo: geo
      ? {
          '@type': 'GeoCoordinates',
          ...geo,
        }
      : undefined,
    openingHoursSpecification: openingHours
      .map((range) => {
        const hyphenCount = (range.match(/-/g) || []).length;
        if (hyphenCount !== 1) {
          // Invalid format, skip this entry or set opens/closes to undefined
          return undefined;
        }
        const [opens, closes] = range.split('-');
        return {
          '@type': 'OpeningHoursSpecification',
          opens,
          closes,
        };
      })
      .filter(Boolean),
  };
}
