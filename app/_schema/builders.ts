import { CLINIC } from '@/app/_lib/clinic';

export const physician = {
  '@type': 'Physician',
  '@id': 'https://www.drsayuj.info/#physician',
  name: 'Dr. Sayuj Krishnan S',
  medicalSpecialty: ['Neurosurgery', 'SpineSurgery'],
  affiliation: { 
    '@type': 'Hospital', 
    name: 'Yashoda Hospital, Malakpet',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Yashoda Hospital, Room 317, OPD Block',
      addressLocality: 'Malakpet',
      addressRegion: 'Telangana',
      postalCode: '500036',
      addressCountry: 'IN'
    }
  },
  telephone: CLINIC.phoneHuman,
  url: CLINIC.site,
  sameAs: [
    'https://www.yashodahospitals.com/doctor/dr-sayuj-krishnan/',
    'https://www.linkedin.com/in/dr-sayuj-krishnan'
  ]
};

export function breadcrumb(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: it.name,
      item: it.url,
    })),
  };
}

export function faq(entries: { q: string; a: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: entries.map((entry) => ({
      '@type': 'Question',
      name: entry.q,
      acceptedAnswer: { '@type': 'Answer', text: entry.a },
    })),
  };
}
