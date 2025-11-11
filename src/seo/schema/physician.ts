export interface PhysicianSchemaInput {
  name: string;
  url: string;
  image?: string;
  description?: string;
  sameAs?: string[];
  medicalSpecialty?: string[];
  alumniOf?: string[];
  addressLocality?: string;
  addressRegion?: string;
  postalCode?: string;
  telephone?: string;
}

export function buildPhysicianSchema(input: PhysicianSchemaInput) {
  const {
    name,
    url,
    image,
    description,
    sameAs = [],
    medicalSpecialty = [],
    alumniOf = [],
    addressLocality,
    addressRegion,
    postalCode,
    telephone,
  } = input;

  return {
    '@context': 'https://schema.org',
    '@type': 'Physician',
    name,
    url,
    image,
    description,
    sameAs,
    medicalSpecialty,
    alumniOf: alumniOf.map((institution) => ({
      '@type': 'CollegeOrUniversity',
      name: institution,
    })),
    address: addressLocality
      ? {
          '@type': 'PostalAddress',
          addressLocality,
          addressRegion,
          postalCode,
        }
      : undefined,
    telephone,
  };
}
