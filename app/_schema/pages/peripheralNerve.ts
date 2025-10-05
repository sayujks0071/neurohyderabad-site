import { CLINIC } from '@/app/_lib/clinic';
import { physician, breadcrumb, faq } from '@/app/_schema/builders';

export function peripheralNerveSchemas(url: string) {
  const today = new Date().toISOString().slice(0, 10);

  const medicalWebPage = {
    '@context': 'https://schema.org',
    '@type': 'MedicalWebPage',
    url,
    name: 'Peripheral Nerve Surgery',
    about: { '@type': 'MedicalSpecialty', name: 'Peripheral nerve surgery' },
    reviewedBy: physician,
    lastReviewed: today,
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

  const crumbs = breadcrumb([
    { name: 'Home', url: `${CLINIC.site}/` },
    { name: 'Services', url: `${CLINIC.site}/services` },
    { name: 'Peripheral Nerve Surgery', url },
  ]);

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
