import { CLINIC } from '@/app/_lib/clinic';

export const CLINIC_INFO = {
  name: CLINIC.name,
  url: CLINIC.site,
  telephone: CLINIC.phoneHuman,
  rawTelephone: CLINIC.phone,
  email: CLINIC.email,
  streetAddress: CLINIC.street,
  addressLocality: CLINIC.locality,
  addressRegion: CLINIC.region,
  postalCode: CLINIC.postalCode,
  addressCountry: CLINIC.country,
  latitude: CLINIC.geo.lat,
  longitude: CLINIC.geo.lng,
};

export const CLINIC_OPENING_HOURS = [
  {
    dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    opens: '09:00',
    closes: '17:00',
  },
  {
    dayOfWeek: ['Saturday'],
    opens: '09:00',
    closes: '13:00',
  },
];

export const CLINIC_AGGREGATE_RATING = {
  '@type': 'AggregateRating',
  ratingValue: '4.9',
  reviewCount: '180',
  bestRating: '5',
  worstRating: '1',
};

interface ClinicSchemaOptions {
  includeContext?: boolean;
}

export function getMedicalClinicSchema({ includeContext = true }: ClinicSchemaOptions = {}) {
  return {
    ...(includeContext ? { '@context': 'https://schema.org' } : {}),
    '@type': 'MedicalClinic',
    name: CLINIC.name,
    url: CLINIC.site,
    telephone: CLINIC.phoneHuman,
    email: CLINIC.email,
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
    openingHoursSpecification: CLINIC_OPENING_HOURS.map(({ dayOfWeek, opens, closes }) => ({
      '@type': 'OpeningHoursSpecification',
      dayOfWeek,
      opens,
      closes,
    })),
    sameAs: [
      'https://www.yashodahospitals.com/doctor/dr-sayuj-krishnan/',
      'https://www.practo.com/hyderabad/doctor/dr-sayuj-krishnan-neurosurgeon',
      'https://g.co/kgs/9366939683880052414',
      'https://www.google.com/maps/place/Dr+Sayuj+Krishnan',
      'https://www.justdial.com/Hyderabad/Dr-Sayuj-Krishnan-Neurosurgeon',
    ],
  };
}
