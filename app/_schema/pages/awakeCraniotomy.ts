import { CLINIC } from '@/app/_lib/clinic';
import { physician, breadcrumb, faq } from '@/app/_schema/builders';

export function awakeCraniotomySchemas(url: string) {
  const today = new Date().toISOString().slice(0, 10);

  const blog = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    mainEntityOfPage: url,
    headline: 'Awake Craniotomy: A Patient Guide (Hyderabad)',
    datePublished: today,
    dateModified: today,
    author: { '@type': 'Person', name: 'Dr. Sayuj Krishnan S' },
    reviewedBy: physician,
    publisher: { '@type': 'Organization', name: 'Dr. Sayuj – Brain & Spine' },
    wordCount: 1200,
    mentions: [
      { '@type': 'MedicalProcedure', name: 'Awake Craniotomy' },
      { '@type': 'MedicalSpecialty', name: 'Neurosurgery' },
    ],
    url,
  };

  const crumbs = breadcrumb([
    { name: 'Home', url: `${CLINIC.site}/` },
    { name: 'Blog', url: `${CLINIC.site}/blog` },
    { name: 'Awake Craniotomy', url },
  ]);

  const faqs = faq([
    { q: 'Why keep the patient awake?', a: 'It helps protect speech and movement areas by checking function during surgery.' },
    { q: 'Is it painful?', a: 'No. The scalp is numbed and sedation is tailored; you should not feel surgical pain.' },
    { q: 'How long is hospital stay?', a: 'Typically 2–4 days, depending on recovery and pathology.' },
  ]);

  return [blog, crumbs, faqs];
}
