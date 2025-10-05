import { CLINIC } from '@/app/_lib/clinic';
import { physician, breadcrumb, faq } from '@/app/_schema/builders';

export function spinalFusionSchemas(url: string) {
  const today = new Date().toISOString().slice(0, 10);

  const medicalWebPage = {
    '@context': 'https://schema.org',
    '@type': 'MedicalWebPage',
    url,
    name: 'Spinal Fusion Surgery (TLIF/ACDF)',
    about: { '@type': 'MedicalProcedure', name: 'Spinal Fusion' },
    reviewedBy: physician,
    lastReviewed: today,
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

  const crumbs = breadcrumb([
    { name: 'Home', url: `${CLINIC.site}/` },
    { name: 'Services', url: `${CLINIC.site}/services` },
    { name: 'Spinal Fusion', url },
  ]);

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
