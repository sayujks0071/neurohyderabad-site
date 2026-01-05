import { SITE_URL } from '../seo';
import { getLocationById } from '@/src/data/locations';

// We default to Malakpet as the main clinic location for services
const DEFAULT_LOCATION_ID = 'malakpet';

interface LocalServiceSchemaOptions {
  slug: string;
  name: string;
  description: string;
  areaServed?: string[];
}

export function buildLocalServiceSchema({
  slug,
  name,
  description,
  areaServed = ['Hyderabad', 'Telangana'],
}: LocalServiceSchemaOptions) {
  const serviceUrl = `${SITE_URL}/services/${slug}`;

  const location = getLocationById(DEFAULT_LOCATION_ID);

  // If location data is missing, we return a minimal schema or throw error.
  // For safety, we'll return what we can or rely on existing fallbacks if needed.
  if (!location) {
      console.error(`Default location ${DEFAULT_LOCATION_ID} not found for schema generation.`);
      return {};
  }

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: SITE_URL,
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Services',
            item: `${SITE_URL}/services/`,
          },
          {
            '@type': 'ListItem',
            position: 3,
            name,
            item: serviceUrl,
          },
        ],
      },
      {
        '@type': 'MedicalService',
        '@id': `${serviceUrl}#service`,
        name,
        description,
        serviceType: name,
        url: serviceUrl,
        provider: {
          '@id': `${SITE_URL}/#physician`,
          '@type': 'Physician',
          name: location.canonical_display_name,
        },
        areaServed: areaServed.map((area) => ({
          '@type': 'AdministrativeArea',
          name: area,
        })),
        availableAtOrFrom: {
          '@type': 'MedicalClinic',
          name: location.name,
          address: {
            '@type': 'PostalAddress',
            streetAddress: location.address.streetAddress,
            addressLocality: location.address.addressLocality,
            addressRegion: location.address.addressRegion,
            postalCode: location.address.postalCode,
            addressCountry: location.address.addressCountry,
          },
          ...(location.geo && {
            geo: {
                '@type': 'GeoCoordinates',
                latitude: location.geo.latitude,
                longitude: location.geo.longitude,
            }
          }),
          telephone: location.telephone,
          url: SITE_URL,
        },
      },
      {
        '@type': 'MedicalProcedure',
        '@id': `${serviceUrl}#procedure`,
        name,
        description,
        url: serviceUrl,
        procedureType: 'https://schema.org/TherapeuticProcedure',
        provider: {
          '@id': `${SITE_URL}/#physician`,
          '@type': 'Physician',
          name: location.canonical_display_name,
        },
        areaServed: areaServed.map((area) => ({
          '@type': 'AdministrativeArea',
          name: area,
        })),
        availableAtOrFrom: {
          '@id': `${SITE_URL}/#medicalclinic`, // Consistent ID with PhysicianSchema
          '@type': 'MedicalClinic',
          name: location.name,
        },
      },
    ],
  };
}
