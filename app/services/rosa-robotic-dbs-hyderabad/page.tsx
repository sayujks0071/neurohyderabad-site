import type { Metadata } from 'next';
import Link from 'next/link';
import { SITE_URL } from '@/src/lib/seo';
import { makeMetadata } from '@/app/_lib/meta';
import BreadcrumbSchema from '@/app/components/schemas/BreadcrumbSchema';
import FAQPageSchema from '@/app/_components/FAQPageSchema';
import AuthorByline from '@/app/_components/AuthorByline';
import ReviewedBy from '@/app/_components/ReviewedBy';
import NAP from '@/app/_components/NAP';
import SourceList from '@/app/_components/SourceList';
import { getServiceSources } from '../sources';
import JsonLd from '@/components/JsonLd';
import { buildLocalServiceSchema } from '@/src/lib/schema/localService';

const SERVICE_SLUG = 'rosa-robotic-dbs-hyderabad';

const baseMetadata = makeMetadata({
  title: 'ROSA Robotic Deep Brain Stimulation (DBS) in Hyderabad | Parkinson’s & Tremor',
  description:
    'ROSA robotic DBS planning for Parkinson’s disease, essential tremor, and dystonia in Hyderabad. Learn candidacy, work-up, recovery, and cost ranges. Consult Dr. Sayuj Krishnan S at Yashoda Hospital, Malakpet.',
  canonicalPath: `/services/${SERVICE_SLUG}`,
});

export const metadata: Metadata = {
  ...baseMetadata,
  openGraph: {
    title: baseMetadata.title,
    description: baseMetadata.description,
    url: `${SITE_URL}/services/${SERVICE_SLUG}`,
    siteName: 'Dr. Sayuj Krishnan S - Neurosurgeon in Hyderabad',
    images: [
      {
        url: `${SITE_URL}/api/og?title=${encodeURIComponent('ROSA Robotic DBS in Hyderabad')}&subtitle=${encodeURIComponent(
          'Precision planning for Parkinson’s & Tremor'
        )}`,
        width: 1200,
        height: 630,
        alt: 'ROSA Robotic DBS in Hyderabad – Dr. Sayuj Krishnan S',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: baseMetadata.title,
    description: baseMetadata.description,
    images: [
      `${SITE_URL}/api/og?title=${encodeURIComponent('ROSA Robotic DBS in Hyderabad')}&subtitle=${encodeURIComponent(
        'Precision planning for Parkinson’s & Tremor'
      )}`,
    ],
  },
};

const ARTICLE_SOURCES = getServiceSources(SERVICE_SLUG);

const FAQS = [
  {
    question: 'What is ROSA robotic DBS?',
    answer:
      'DBS (deep brain stimulation) places thin electrodes in specific brain targets to help control symptoms of Parkinson’s disease, essential tremor, and selected dystonias. “ROSA” is a robotic guidance platform that helps plan and execute trajectories with high precision alongside MRI/CT-based navigation.',
  },
  {
    question: 'Who is a good candidate for DBS?',
    answer:
      'Patients with Parkinson’s disease who respond to levodopa but have disabling tremor, fluctuations, or dyskinesias; patients with medication-refractory essential tremor; and selected dystonia patients. Final candidacy depends on clinical exam, imaging, and a multidisciplinary evaluation.',
  },
  {
    question: 'Does robotic DBS mean the robot performs the surgery?',
    answer:
      'No. The surgeon performs the procedure. Robotics and navigation support planning and accurate instrument guidance, but surgical decisions and execution remain clinician-led.',
  },
  {
    question: 'How long does recovery take after DBS surgery?',
    answer:
      'Most patients are mobilised early and discharge timing depends on medical status and the staged workflow. DBS requires post-operative programming (device “tuning”) over several visits; symptom improvement is typically optimised over weeks.',
  },
  {
    question: 'What is the cost range for DBS in Hyderabad?',
    answer:
      'DBS costs vary significantly based on the device type (rechargeable vs non-rechargeable), number of electrodes, hospital stay, and investigations. A broad self-pay planning range is commonly ₹12–₹25 lakh. After reviewing reports, we provide a written estimate and discuss insurance options where applicable.',
  },
  {
    question: 'Is DBS covered by insurance?',
    answer:
      'Coverage depends on the insurer and policy. Many plans cover hospitalisation and surgical components; device and consumables coverage varies. Our team helps with pre-authorisation and documentation once eligibility is confirmed.',
  },
];

const schema = buildLocalServiceSchema({
  slug: SERVICE_SLUG,
  name: 'ROSA Robotic Deep Brain Stimulation (DBS) in Hyderabad',
  description:
    'Robotic planning and navigation-guided DBS pathway for Parkinson’s disease, essential tremor, and dystonia at Yashoda Hospital, Malakpet.',
});

const medicalWebPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'MedicalWebPage',
  '@id': `${SITE_URL}/services/${SERVICE_SLUG}#webpage`,
  url: `${SITE_URL}/services/${SERVICE_SLUG}`,
  name: 'ROSA Robotic DBS in Hyderabad',
  description:
    'Candidacy, work-up, recovery expectations, and cost/insurance overview for DBS with robotic planning in Hyderabad.',
  medicalSpecialty: 'Neurosurgery',
  about: [
    { '@type': 'MedicalProcedure', name: 'Deep Brain Stimulation (DBS)' },
    { '@type': 'MedicalDevice', name: 'Neurostimulator (DBS device)' },
  ],
  author: { '@id': `${SITE_URL}/#physician` },
  publisher: { '@id': `${SITE_URL}/#organization` },
  mainEntityOfPage: `${SITE_URL}/services/${SERVICE_SLUG}`,
};

export default function RosaRoboticDbsHyderabadPage() {
  const pageUrl = `${SITE_URL}/services/${SERVICE_SLUG}`;

  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: 'Home', path: '/' },
          { name: 'Services', path: '/services' },
          { name: 'ROSA Robotic DBS', path: `/services/${SERVICE_SLUG}` },
        ]}
      />
      <FAQPageSchema faqs={FAQS} pageUrl={pageUrl} />
      <JsonLd id="rosa-dbs-local-service" data={schema} />
      <JsonLd id="rosa-dbs-medical-webpage" data={medicalWebPageSchema} />

      <main className="prose mx-auto max-w-5xl px-4 py-12">
        <header className="not-prose mb-10">
          <p className="text-sm font-medium uppercase tracking-wide text-blue-600 mb-3">Functional Neurosurgery</p>
          <h1 className="text-4xl font-bold text-blue-900">ROSA Robotic DBS in Hyderabad</h1>
          <p className="mt-4 text-lg text-gray-700">
            If medications no longer give stable control for Parkinson’s disease or tremor, DBS can help reduce symptoms and improve
            quality of life. This page explains candidacy, the evaluation pathway, what “robotic planning” means, recovery expectations,
            and realistic cost/insurance considerations in Hyderabad.
          </p>
          <AuthorByline publishedOn="2025-12-15" updatedOn="2025-12-15" className="mt-4" />
        </header>

        <section className="not-prose mb-10 rounded-xl border border-blue-100 bg-blue-50 p-6">
          <h2 className="text-xl font-semibold text-blue-900">Fast triage: who should consider a DBS evaluation</h2>
          <ul className="mt-3 space-y-2 text-gray-800">
            <li>• Parkinson’s symptoms respond to levodopa, but you have “on–off” fluctuations, dyskinesias, or disabling tremor.</li>
            <li>• Essential tremor that remains function-limiting despite optimised medications.</li>
            <li>• Selected dystonia patients where neurology teams recommend DBS consideration.</li>
          </ul>
          <p className="mt-4 text-sm text-gray-700">
            DBS is a specialist decision that depends on your exam, imaging, and neuropsychological assessment. We’ll guide you through
            eligibility step-by-step.
          </p>
        </section>

        <h2 className="text-2xl font-semibold text-blue-800">What DBS does (in plain language)</h2>
        <p>
          DBS uses a small implanted system: thin electrodes placed in specific brain targets, connected to a pulse generator (battery)
          usually placed under the skin near the chest. The system delivers controlled electrical stimulation that can reduce tremor,
          stiffness, slowness, and medication-related fluctuations in carefully selected patients.
        </p>

        <h2 className="text-2xl font-semibold text-blue-800">What “ROSA robotic” adds</h2>
        <p>
          “Robotic DBS” does not mean an autonomous robot. It means we use a robotic guidance platform integrated with imaging and
          navigation to plan trajectories and support consistent, precise targeting. This is especially valuable when millimetre-level
          accuracy matters for symptom control and side-effect minimisation.
        </p>

        <h2 className="text-2xl font-semibold text-blue-800">DBS work-up pathway (what to expect)</h2>
        <div className="grid gap-6 md:grid-cols-2 not-prose">
          <div className="rounded-lg border border-gray-200 p-5">
            <h3 className="text-lg font-semibold text-blue-800">Before surgery</h3>
            <ul className="mt-2 space-y-2 text-gray-700">
              <li>• Neurology + neurosurgery consultation to confirm symptom pattern and medication response.</li>
              <li>• MRI/CT imaging to plan safe targets and trajectories.</li>
              <li>• Cognitive/psychiatric screening when indicated.</li>
              <li>• Medical optimisation for diabetes, blood pressure, and cardiac risk.</li>
            </ul>
          </div>
          <div className="rounded-lg border border-gray-200 p-5">
            <h3 className="text-lg font-semibold text-blue-800">After surgery</h3>
            <ul className="mt-2 space-y-2 text-gray-700">
              <li>• Early mobilisation and wound checks.</li>
              <li>• First programming visit (device tuning) followed by refinement sessions.</li>
              <li>• Medication adjustments coordinated with neurology.</li>
              <li>• Long-term follow-up for battery checks and symptom optimisation.</li>
            </ul>
          </div>
        </div>

        <h2 className="text-2xl font-semibold text-blue-800">Cost and insurance (transparent, realistic)</h2>
        <p>
          DBS is device-dependent. Costs vary by device model, rechargeable vs non-rechargeable systems, hospital stay, and investigations.
          A broad self-pay planning range is commonly <strong>₹12–₹25 lakh</strong>. After reviewing your reports, we provide a written
          estimate and help you understand which parts may be covered by insurance.
        </p>
        <ul className="space-y-2 text-gray-700">
          <li>• Insurance eligibility varies by policy (device coverage differs significantly).</li>
          <li>• We support pre-authorisation documents once candidacy is confirmed.</li>
          <li>• You will receive a line-item estimate (device, OT, stay, imaging, follow-ups).</li>
        </ul>

        <section className="not-prose mt-10 rounded-xl border border-green-100 bg-green-50 p-6">
          <h3 className="text-lg font-semibold text-green-800">Book a DBS evaluation</h3>
          <p className="text-gray-700">
            Bring your neurology notes, medication list, and recent imaging. If you don’t have imaging, we’ll guide you on what is needed
            for a DBS work-up in Hyderabad.
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <Link
              href="/appointments"
              className="rounded-full bg-blue-600 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-700"
            >
              Book Consultation
            </Link>
            <Link
              href="/services/spine-surgery-cost-hyderabad"
              className="rounded-full border border-blue-200 px-5 py-3 text-sm font-semibold text-blue-700 hover:bg-blue-50"
            >
              See our cost transparency format →
            </Link>
          </div>
        </section>

        <SourceList sources={ARTICLE_SOURCES} heading="Clinical References" />
        <ReviewedBy lastReviewed="2025-12-15" reviewerName="Dr. Sayuj Krishnan S" />
        <NAP />
      </main>
    </>
  );
}

