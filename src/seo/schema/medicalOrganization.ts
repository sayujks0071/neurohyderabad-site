export interface MedicalOrganizationInput {
  name: string;
  url: string;
  description?: string;
  logo?: string;
  sameAs?: string[];
  address: {
    streetAddress: string;
    addressLocality: string;
    addressRegion: string;
    postalCode: string;
  };
  telephone?: string;
  geo?: {
    latitude: number;
    longitude: number;
  };
  openingHours?: string[];
}

export function buildMedicalOrganizationSchema(input: MedicalOrganizationInput) {
  const {
    name,
    url,
    description,
    logo,
    sameAs = [],
    address,
    telephone,
    geo,
    openingHours = [],
  } = input;

  return {
    '@context': 'https://schema.org',
    '@type': 'MedicalOrganization',
    name,
    url,
    description,
    logo,
    sameAs,
    address: {
      '@type': 'PostalAddress',
      ...address,
    },
    telephone,
    geo: geo
      ? {
          '@type': 'GeoCoordinates',
          ...geo,
        }
      : undefined,
    openingHoursSpecification: openingHours
      .map((spec) => {
        const parts = spec.split('-');
        if (parts.length !== 2) {
          // Optionally, log a warning here if desired
          return null;
        }
        return {
          '@type': 'OpeningHoursSpecification',
          opens: parts[0],
          closes: parts[1],
        };
      })
      .filter(Boolean),
  };
}
