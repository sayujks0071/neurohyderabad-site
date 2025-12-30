import { CLINIC } from '@/app/_lib/clinic';
import { physician, breadcrumb, faq } from '@/app/_schema/builders';

export function awakeCraniotomySchemas(url: string) {
  const today = new Date().toISOString().slice(0, 10);

  const medicalWebPage = {
    '@context': 'https://schema.org',
    '@type': 'MedicalWebPage',
    '@id': `${url}#medical`,
    url,
    name: 'Awake Craniotomy Guide Hyderabad | Dr. Sayuj',
    description: 'Why awake brain surgery is chosen, mapping process, recovery, and FAQs for Hyderabad patients.',
    reviewedBy: { '@id': 'https://www.drsayuj.info/#physician' },
    lastReviewed: today,
    breadcrumb: { '@id': `${url}#breadcrumb` },
    mainEntity: [
      {
        '@type': 'MedicalProcedure',
        '@id': `${url}#procedure`,
        name: 'Awake Craniotomy',
        procedureType: 'Surgical',
        bodyLocation: 'Brain',
        indication: [
          { '@type': 'MedicalCondition', name: 'Brain Tumors' },
          { '@type': 'MedicalCondition', name: 'Epilepsy' },
          { '@type': 'MedicalCondition', name: 'Arteriovenous Malformations' }
        ],
        followup: 'Most patients go home in 3–4 days and begin light activity once fatigue settles.'
      }
    ]
  };

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

  const crumbs = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    '@id': `${url}#breadcrumb`,
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${CLINIC.site}/` },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: `${CLINIC.site}/blog` },
      { '@type': 'ListItem', position: 3, name: 'Awake Craniotomy', item: url }
    ]
  };

  const faqs = faq([
    { q: 'Why keep the patient awake?', a: 'It helps protect speech and movement areas by checking function during surgery.' },
    { q: 'Is it painful?', a: 'No. The scalp is numbed and sedation is tailored; you should not feel surgical pain.' },
    { q: 'How long is hospital stay?', a: 'Typically 2–4 days, depending on recovery and pathology.' },
  ]);

  return [medicalWebPage, blog, crumbs, faqs];
}
