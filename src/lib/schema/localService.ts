import { SITE_URL } from '../seo';
import { CLINIC } from '@/app/_lib/clinic';

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
          name: 'Dr Sayuj Krishnan',
        },
        areaServed: areaServed.map((area) => ({
          '@type': 'AdministrativeArea',
          name: area,
        })),
        availableAtOrFrom: {
          '@type': 'MedicalClinic',
          name: CLINIC.name,
          address: {
            '@type': 'PostalAddress',
            streetAddress: CLINIC.street,
            addressLocality: CLINIC.locality,
            addressRegion: CLINIC.region,
            postalCode: CLINIC.postalCode,
            addressCountry: 'IN',
          },
          geo: {
            '@type': 'GeoCoordinates',
            latitude: CLINIC.geo.lat,
            longitude: CLINIC.geo.lng,
          },
          telephone: CLINIC.phoneHuman,
          url: SITE_URL,
        },
      },
    ],
  };
}
