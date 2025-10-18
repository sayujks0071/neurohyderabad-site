import type { Metadata } from 'next';
import Link from 'next/link';
import Breadcrumbs from '@/app/components/Breadcrumbs';
import JsonLd from '@/components/JsonLd';
import NAP from '@/app/_components/NAP';
import ReviewedBy from '@/app/_components/ReviewedBy';
import MapEmbed from '@/components/MapEmbed';
import { makeMetadata } from '@/app/_lib/meta';
import { SITE_URL } from '@/src/lib/seo';
import { buildLocalServiceSchema } from '@/src/lib/schema/localService';

const SERVICE_SLUG = 'brain-tumor-surgery-hyderabad';

const baseMetadata = makeMetadata({
  title: 'Brain Tumor Surgery in Hyderabad | Neuronavigation & Advanced Care',
  description:
    'Comprehensive brain tumor surgery in Hyderabad with neuronavigation, neuromonitoring, and multidisciplinary oncology support at Yashoda Hospital Malakpet.',
  canonicalPath: `/services/${SERVICE_SLUG}`,
});

export const metadata: Metadata = {
  ...baseMetadata,
  keywords: [
    'brain tumor surgery hyderabad',
    'brain surgeon hyderabad',
    'neuronavigation surgery hyderabad',
    'awake craniotomy hyderabad',
    'yashoda hospital brain tumor specialist',
  ],
  openGraph: {
    title: 'Brain Tumor Surgery in Hyderabad | Dr. Sayuj Krishnan',
    description:
      'Advanced brain tumor surgery program in Hyderabad offering neuronavigation-guided microsurgery, awake craniotomy, and multidisciplinary oncology pathways.',
    url: `${SITE_URL}/services/${SERVICE_SLUG}`,
    siteName: 'Dr. Sayuj Krishnan - Neurosurgeon Hyderabad',
    locale: 'en_IN',
    type: 'website',
    images: [
      {
        url: `${SITE_URL}/api/og?title=${encodeURIComponent(
          'Brain Tumor Surgery in Hyderabad'
        )}&subtitle=${encodeURIComponent('Neuronavigation & Neuromonitoring')}`,
        width: 1200,
        height: 630,
        alt: 'Brain Tumor Surgery in Hyderabad – Dr. Sayuj Krishnan',
      },
    ],
  },
};

const schema = buildLocalServiceSchema({
  slug: SERVICE_SLUG,
  name: 'Advanced Brain Tumor Surgery in Hyderabad',
  description:
    'Neuronavigation-guided brain tumor surgery with neuromonitoring, awake craniotomy, and integrated oncology care at Yashoda Hospital Malakpet.',
});

const treatmentHighlights = [
  {
    title: 'Neuronavigation Microsurgery',
    description:
      'Real-time navigation systems ensure maximal safe tumor resection while preserving eloquent brain structures.',
  },
  {
    title: 'Awake Craniotomy & Functional Mapping',
    description:
      'Speech and motor mapping techniques protect critical pathways during tumor removal in eloquent cortex.',
  },
  {
    title: 'Multidisciplinary Tumor Board',
    description:
      'Collaborative care with neuro-oncology, radiation oncology, and rehabilitation teams for comprehensive plans.',
  },
];

const tumorTypes = [
  'Gliomas and astrocytomas (Grade I-IV)',
  'Meningiomas and skull base tumors',
  'Pituitary adenomas and sellar lesions',
  'Metastatic brain tumors and radiosurgery planning',
  'Acoustic neuromas and cranial nerve tumors',
];

const patientSupport = [
  'Second-opinion service for complex tumors and recurrent disease',
  'Pre-surgical counselling with caregiver briefing and digital resources',
  'Post-operative ICU monitored care with daily neurosurgeon rounds',
  'Rehabilitation pathways for speech, swallowing, and motor recovery',
  'Financial counselling for insurance and corporate approvals',
];

const faqs = [
  {
    question: 'How quickly can surgery be scheduled after diagnosis?',
    answer:
      'Urgent cases with progressive neurological deficits are prioritised within 48-72 hours. Elective cases are scheduled after tumour board discussions and pre-anaesthesia evaluation, often within 5-7 working days.',
  },
  {
    question: 'Do you treat patients referred from other hospitals?',
    answer:
      'Yes. We regularly handle referrals for complex skull base tumours and recurrent gliomas. Bring imaging, histopathology reports, and prior treatment summaries for a complete review.',
  },
  {
    question: 'Is a craniotomy always required?',
    answer:
      'Not always. Some lesions are best managed with stereotactic biopsy, radiosurgery, or endoscopic skull base approaches. Surgical planning is individualised based on tumour type, size, and location.',
  },
];

export default function BrainTumorSurgeryHyderabadPage() {
  return (
    <>
      <JsonLd data={schema} />
      <main className="container mx-auto px-4 py-16">
        <Breadcrumbs
          items={[
            { name: 'Home', href: '/' },
            { name: 'Services', href: '/services/' },
            { name: 'Brain Tumor Surgery in Hyderabad', href: `/services/${SERVICE_SLUG}/` },
          ]}
        />

        <header className="grid md:grid-cols-2 gap-10 items-start mb-16">
          <div>
            <p className="text-sm font-medium uppercase tracking-wide text-blue-600 mb-3">Neurosurgical Oncology</p>
            <h1 className="text-4xl md:text-5xl font-bold text-blue-900 leading-tight mb-6">
              Brain Tumor Surgery in Hyderabad with Neuronavigation Precision
            </h1>
            <p className="text-lg text-gray-700 mb-6">
              Dr. Sayuj Krishnan leads a dedicated brain tumor program at Yashoda Hospital Malakpet, combining meticulous
              microsurgical technique with advanced mapping and multidisciplinary oncology care. Every case is reviewed with a
              tumour board to ensure the safest, most effective treatment plan.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/appointments/"
                className="inline-flex items-center justify-center rounded-full bg-blue-600 px-6 py-3 text-white font-semibold hover:bg-blue-700 transition-colors"
              >
                Book a Neuro-Oncology Consult
              </Link>
              <Link
                href="/blog/brain-tumor-surgery-cost-hyderabad/"
                className="inline-flex items-center justify-center rounded-full border border-blue-200 px-6 py-3 text-blue-700 font-semibold hover:border-blue-400 hover:text-blue-900 transition-colors"
              >
                Understand Treatment Pathways
              </Link>
            </div>
          </div>
          <div className="bg-blue-50 border border-blue-100 rounded-2xl p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-blue-800 mb-4">
              What to Expect During Tumor Surgery Planning
            </h2>
            <ol className="space-y-3 text-gray-700 list-decimal list-inside">
              <li>Comprehensive MRI / functional imaging review with family briefing.</li>
              <li>Personalised plan outlining extent of resection, risks, and rehabilitation goals.</li>
              <li>Pre-anaesthesia and neuropsychological assessment for eloquent cortex tumors.</li>
              <li>Coordinated ICU and ward stay with daily updates from the neurosurgical team.</li>
            </ol>
          </div>
        </header>

        <section className="mb-16">
          <h2 className="text-3xl font-bold text-blue-900 mb-6">Advanced Surgical Techniques in Hyderabad</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {treatmentHighlights.map((item) => (
              <div key={item.title} className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-blue-700 mb-3">{item.title}</h3>
                <p className="text-sm text-gray-700">{item.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-16 grid md:grid-cols-2 gap-10">
          <div>
            <h2 className="text-3xl font-bold text-blue-900 mb-4">Tumor Types We Manage</h2>
            <p className="text-gray-700 mb-4">
              From benign meningiomas to high-grade gliomas, each tumour requires a tailored approach. The goal is maximal safe
              resection while preserving neurological function, followed by adjuvant therapy when indicated.
            </p>
            <ul className="space-y-2 text-sm text-gray-700">
              {tumorTypes.map((type) => (
                <li key={type}>• {type}</li>
              ))}
            </ul>
          </div>
          <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
            <h3 className="text-xl font-semibold text-blue-800 mb-3">Support for Patients & Families</h3>
            <ul className="space-y-2 text-sm text-gray-700">
              {patientSupport.map((support) => (
                <li key={support}>• {support}</li>
              ))}
            </ul>
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-3xl font-bold text-blue-900 mb-4">Trusted by Patients Across Telangana & AP</h2>
          <p className="text-gray-700 mb-6">
            We routinely handle referrals from oncology centres in Secunderabad, Warangal, Nalgonda, Guntur, and Vishakhapatnam.
            Our coordination team assists with medical visas, accommodation, and digital follow-up, ensuring continuity of care no
            matter where you live.
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-blue-50 border border-blue-100 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-blue-800 mb-3">Pre-Visit Checklist</h3>
              <ul className="space-y-2 text-sm text-blue-900">
                <li>• Latest MRI brain with contrast and CT angiogram if available</li>
                <li>• Histopathology reports or biopsy slides for review</li>
                <li>• Blood investigations and comorbidity records (diabetes, hypertension)</li>
                <li>• Insurance documentation for cashless admissions</li>
              </ul>
            </div>
            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-blue-800 mb-3">Post-Operative Follow-Up</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>• In-person visits at 1 week, 1 month, and 3 months</li>
                <li>• Teleconsults for outstation and international patients</li>
                <li>• Coordination with local oncologists for adjuvant therapy</li>
                <li>• Rehabilitation and neuropsychology referrals as needed</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="mb-16 grid lg:grid-cols-[1.2fr_1fr] gap-10 items-start">
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-blue-900">Clinic Location & Neuro-Oncology Desk</h2>
            <p className="text-gray-700">
              Brain tumor surgeries are performed at Yashoda Hospital, Malakpet, Hyderabad, equipped with hybrid OTs, intraoperative
              neuromonitoring, and 24/7 critical care. For urgent evaluations, call ahead and our neuro-oncology desk will facilitate
              immediate imaging review.
            </p>
            <NAP className="bg-gray-50 border border-gray-200 rounded-xl p-6" />
            <div>
              <h3 className="text-xl font-semibold text-blue-800 mb-3">Map & Directions</h3>
              <MapEmbed />
            </div>
          </div>
          <div className="bg-blue-50 border border-blue-100 rounded-2xl p-6 shadow-sm space-y-5">
            <h3 className="text-xl font-semibold text-blue-800">Frequently Asked Questions</h3>
            {faqs.map((faq) => (
              <div key={faq.question}>
                <p className="font-semibold text-blue-900">{faq.question}</p>
                <p className="text-sm text-blue-900/80 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
            <Link
              href="/blog/brain-tumor-surgery-cost-hyderabad/"
              className="inline-flex items-center justify-center rounded-full bg-blue-600 px-5 py-2 text-white font-semibold hover:bg-blue-700 transition-colors"
            >
              Explore Brain Tumor Resources
            </Link>
          </div>
        </section>

        <ReviewedBy lastReviewed="2025-10-01" />
      </main>
    </>
  );
}
