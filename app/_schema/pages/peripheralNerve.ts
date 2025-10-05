import { CLINIC } from '@/app/_lib/clinic';
import { physician, breadcrumb, faq } from '@/app/_schema/builders';

export function peripheralNerveSchemas(url: string) {
  const today = new Date().toISOString().slice(0, 10);

  const medicalWebPage = {
    '@context': 'https://schema.org',
    '@type': 'MedicalWebPage',
    '@id': `${url}#medical`,
    url,
    name: 'Peripheral Nerve Surgery Hyderabad | Carpal & Ulnar',
    description: 'Day-care carpal tunnel, ulnar decompression, and nerve repair by Dr. Sayuj Krishnan at Yashoda Hospital Malakpet.',
    reviewedBy: { '@id': 'https://www.drsayuj.com/#physician' },
    lastReviewed: today,
    breadcrumb: { '@id': `${url}#breadcrumb` },
    mainEntity: [
      {
        '@type': 'MedicalProcedure',
        '@id': `${url}#procedure`,
        name: 'Peripheral Nerve Surgery',
        procedureType: 'Surgical',
        bodyLocation: 'Peripheral nerves',
        indication: [
          { '@type': 'MedicalCondition', name: 'Carpal Tunnel Syndrome' },
          { '@type': 'MedicalCondition', name: 'Cubital Tunnel Syndrome' },
          { '@type': 'MedicalCondition', name: 'Peripheral Nerve Compression' }
        ],
        followup: 'Hand therapy and ergonomic coaching are built into every recovery plan.'
      }
    ]
  };

  const carpal = {
    '@context': 'https://schema.org',
    '@type': 'MedicalProcedure',
    name: 'Carpal Tunnel Release',
    bodyLocation: 'Wrist / Median nerve',
    procedureType: 'Surgical',
    url: `${url}#carpal-tunnel`,
  };

  const ulnar = {
    '@context': 'https://schema.org',
    '@type': 'MedicalProcedure',
    name: 'Ulnar Nerve Decompression',
    bodyLocation: 'Elbow / Ulnar nerve',
    procedureType: 'Surgical',
    url: `${url}#ulnar-nerve`,
  };

  const crumbs = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    '@id': `${url}#breadcrumb`,
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${CLINIC.site}/` },
      { '@type': 'ListItem', position: 2, name: 'Services', item: `${CLINIC.site}/services` },
      { '@type': 'ListItem', position: 3, name: 'Peripheral Nerve Surgery', item: url }
    ]
  };

  const faqs = faq([
    {
      q: 'Do I need surgery for carpal tunnel?',
      a: 'Not always. Splints and activity modification help many. Surgery is considered when symptoms persist or weakness appears.',
    },
    { q: 'Day-care or admission?', a: 'Often day-care. Your plan depends on nerve involvement and comorbidities.' },
    { q: 'Recovery time?', a: 'Many desk workers resume light work in 1–2 weeks; grip strength recovers gradually.' },
  ]);

  return [medicalWebPage, carpal, ulnar, crumbs, faqs];
}
