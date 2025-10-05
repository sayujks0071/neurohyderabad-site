import { CLINIC } from '@/app/_lib/clinic';

export const physician = {
  '@type': 'Physician',
  name: 'Dr. Sayuj Krishnan S',
  medicalSpecialty: ['Neurosurgery', 'SpineSurgery'],
  affiliation: { '@type': 'Hospital', name: 'Yashoda Hospital, Malakpet' },
  telephone: CLINIC.phoneHuman,
  url: CLINIC.site,
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
