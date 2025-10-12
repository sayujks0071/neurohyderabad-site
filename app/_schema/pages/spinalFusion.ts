import { CLINIC } from '@/app/_lib/clinic';
import { physician, breadcrumb, faq } from '@/app/_schema/builders';

export function spinalFusionSchemas(url: string) {
  const today = new Date().toISOString().slice(0, 10);

  const medicalWebPage = {
    '@context': 'https://schema.org',
    '@type': 'MedicalWebPage',
    '@id': `${url}#medical`,
    url,
    name: 'Spinal Fusion Surgery in Hyderabad | TLIF & ACDF',
    description: 'TLIF and ACDF for instability, recovery timelines, and insurance support with Dr. Sayuj Krishnan.',
    reviewedBy: { '@id': 'https://www.drsayuj.info/#physician' },
    lastReviewed: today,
    breadcrumb: { '@id': `${url}#breadcrumb` },
    mainEntity: [
      {
        '@type': 'MedicalProcedure',
        '@id': `${url}#procedure`,
        name: 'Spinal Fusion Surgery',
        procedureType: 'Surgical',
        bodyLocation: 'Spine',
        indication: [
          { '@type': 'MedicalCondition', name: 'Spondylolisthesis' },
          { '@type': 'MedicalCondition', name: 'Spinal Instability' },
          { '@type': 'MedicalCondition', name: 'Degenerative Disc Disease' }
        ],
        followup: 'Physiotherapy and imaging review at 6 weeks.'
      }
    ]
  };

  const tlif = {
    '@context': 'https://schema.org',
    '@type': 'MedicalProcedure',
    name: 'Transforaminal Lumbar Interbody Fusion (TLIF)',
    bodyLocation: 'Lumbar spine',
    procedureType: 'Surgical',
    url: `${url}#tlif`,
  };

  const acdf = {
    '@context': 'https://schema.org',
    '@type': 'MedicalProcedure',
    name: 'Anterior Cervical Discectomy and Fusion (ACDF)',
    bodyLocation: 'Cervical spine',
    procedureType: 'Surgical',
    url: `${url}#acdf`,
  };

  const crumbs = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    '@id': `${url}#breadcrumb`,
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${CLINIC.site}/` },
      { '@type': 'ListItem', position: 2, name: 'Services', item: `${CLINIC.site}/services` },
      { '@type': 'ListItem', position: 3, name: 'Spinal Fusion', item: url }
    ]
  };

  const faqs = faq([
    {
      q: 'How long is recovery after spinal fusion?',
      a: 'Most patients resume desk work in 2–4 weeks; full activity varies by case and surgeon advice.',
    },
    { q: 'Is fusion permanent?', a: 'Yes. The goal is to permanently stabilize a painful motion segment after diseased disc removal.' },
    { q: 'TLIF vs ACDF?', a: 'TLIF is used in lumbar spine; ACDF is a cervical procedure. Choice depends on level and symptoms.' },
  ]);

  return [medicalWebPage, tlif, acdf, crumbs, faqs];
}
