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
    openingHoursSpecification: openingHours.map((range) => ({
      '@type': 'OpeningHoursSpecification',
      opens: range.split('-')[0],
      closes: range.split('-')[1],
    })),
  };
}
