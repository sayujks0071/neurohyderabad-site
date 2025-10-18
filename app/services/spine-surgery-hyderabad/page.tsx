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

const SERVICE_SLUG = 'spine-surgery-hyderabad';

const baseMetadata = makeMetadata({
  title: 'Spine Surgery in Hyderabad | Minimally Invasive & Complex Care',
  description:
    'Comprehensive spine surgery in Hyderabad covering minimally invasive, endoscopic, and complex reconstruction procedures at Yashoda Hospital Malakpet.',
  canonicalPath: `/services/${SERVICE_SLUG}`,
});

export const metadata: Metadata = {
  ...baseMetadata,
  keywords: [
    'spine surgery hyderabad',
    'spine surgeon near me',
    'minimally invasive spine surgery hyderabad',
    'spine specialist yashoda hospital',
    'endoscopic spine surgery hyderabad',
    'spine surgery consultation hyderabad',
  ],
  openGraph: {
    title: 'Spine Surgery in Hyderabad | Dr. Sayuj Krishnan',
    description:
      'Advanced spine surgery in Hyderabad for slip disc, spinal stenosis, deformity correction, and complex revision procedures with minimally invasive options.',
    url: `${SITE_URL}/services/${SERVICE_SLUG}`,
    siteName: 'Dr. Sayuj Krishnan - Neurosurgeon Hyderabad',
    locale: 'en_IN',
    type: 'website',
    images: [
      {
        url: `${SITE_URL}/api/og?title=${encodeURIComponent(
          'Spine Surgery in Hyderabad'
        )}&subtitle=${encodeURIComponent('MISS, Endoscopic & Complex Reconstruction')}`,
        width: 1200,
        height: 630,
        alt: 'Spine Surgery in Hyderabad – Dr. Sayuj Krishnan',
      },
    ],
  },
};

const schema = buildLocalServiceSchema({
  slug: SERVICE_SLUG,
  name: 'Comprehensive Spine Surgery in Hyderabad',
  description:
    'Full-spectrum spine surgery including minimally invasive, endoscopic and complex reconstruction care delivered at Yashoda Hospital, Malakpet by Dr. Sayuj Krishnan.',
});

const localAreas = [
  'Somajiguda & Begumpet – 15 mins via NH65',
  'HITEC City & Gachibowli – 30 mins via PV Narasimha Rao Expressway',
  'Uppal & LB Nagar – 20 mins via Inner Ring Road',
  'Secunderabad Cantonment – 25 mins via Tank Bund',
];

const procedureHighlights = [
  {
    title: 'Minimally Invasive Spine Surgery (MISS)',
    details: [
      'Endoscopic discectomy for sciatica and slip disc',
      'Tubular decompression for lumbar canal stenosis',
      'Percutaneous stabilization for traumatic fractures',
    ],
  },
  {
    title: 'Comprehensive Deformity & Reconstruction',
    details: [
      'Spondylolisthesis reduction with TLIF / PLIF',
      'Kyphosis and scoliosis correction',
      'Revision surgeries for failed back syndrome',
    ],
  },
  {
    title: 'Day-Care & Enhanced Recovery',
    details: [
      'Same-day discharge for select endoscopic cases',
      'Physiotherapy-led mobilisation pathways',
      'Return-to-work planning for desk and manual roles',
    ],
  },
];

const indications = [
  {
    condition: 'Lumbar & Cervical Disc Herniation',
    description:
      'Severe radiating leg or arm pain with numbness or weakness that persists despite medication and physiotherapy.',
  },
  {
    condition: 'Spinal Canal Stenosis',
    description:
      'Neurogenic claudication causing walking intolerance, typically relieved by forward bending or sitting.',
  },
  {
    condition: 'Spinal Instability & Spondylolisthesis',
    description:
      'Abnormal vertebral movement producing mechanical back pain and nerve compression requiring stabilization.',
  },
  {
    condition: 'Spinal Deformity & Failed Back Surgery',
    description:
      'Progressive deformity, prior instrumentation failure, or recurrent symptoms after earlier surgery.',
  },
];

const faqs = [
  {
    question: 'How do I know if I need spine surgery instead of physiotherapy?',
    answer:
      'If pain persists beyond 6-8 weeks of guided physiotherapy, causes progressive weakness, or interferes with bladder/bowel control, advanced imaging and surgical consultation are essential. Dr. Sayuj reviews MRI findings personally to explain conservative versus surgical options.',
  },
  {
    question: 'What is the recovery time after minimally invasive spine surgery?',
    answer:
      'Most minimally invasive lumbar decompressions allow assisted walking within 3-4 hours and discharge within 24 hours. Desk professionals generally resume work within 10-14 days, while manual workers may require 4-6 weeks and a staged return-to-work protocol.',
  },
  {
    question: 'Do you treat patients from outside Hyderabad?',
    answer:
      'Yes. Our coordination team assists patients travelling from across Telangana, Andhra Pradesh, and neighbouring states with scheduling, accommodation, and follow-up teleconsultations.',
  },
];

export default function SpineSurgeryHyderabadPage() {
  return (
    <>
      <JsonLd data={schema} />
      <main className="container mx-auto px-4 py-16">
        <Breadcrumbs
          items={[
            { name: 'Home', href: '/' },
            { name: 'Services', href: '/services/' },
            { name: 'Spine Surgery in Hyderabad', href: `/services/${SERVICE_SLUG}/` },
          ]}
        />

        <header className="grid md:grid-cols-2 gap-10 items-start mb-16">
          <div>
            <p className="text-sm font-medium uppercase tracking-wide text-blue-600 mb-3">
              Comprehensive Spine Surgery
            </p>
            <h1 className="text-4xl md:text-5xl font-bold text-blue-900 leading-tight mb-6">
              Spine Surgery in Hyderabad at Yashoda Hospital, Malakpet
            </h1>
            <p className="text-lg text-gray-700 mb-6">
              Dr. Sayuj Krishnan offers complete spine solutions in Hyderabad—from full endoscopic procedures to complex fusion
              reconstruction—delivering rapid relief while preserving mobility. Every plan is individualised and backed by
              dedicated physiotherapy and rehabilitation teams.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/appointments/"
                className="inline-flex items-center justify-center rounded-full bg-blue-600 px-6 py-3 text-white font-semibold hover:bg-blue-700 transition-colors"
              >
                Book a Spine Consultation
              </Link>
              <Link
                href="/patient-stories/"
                className="inline-flex items-center justify-center rounded-full border border-blue-200 px-6 py-3 text-blue-700 font-semibold hover:border-blue-400 hover:text-blue-900 transition-colors"
              >
                View Spine Case Stories
              </Link>
            </div>
          </div>
          <div className="bg-blue-50 border border-blue-100 rounded-2xl p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-blue-800 mb-4">
              Why Hyderabad Patients Choose Dr. Sayuj
            </h2>
            <ul className="space-y-3 text-gray-700">
              <li>• Fellowship-trained spine surgeon with advanced endoscopic credentials</li>
              <li>• Same-day MRI review and treatment planning for acute cases</li>
              <li>• Dedicated MISS OT at Yashoda Hospital with neuromonitoring support</li>
              <li>• Integrated rehab protocols and return-to-work counselling</li>
            </ul>
          </div>
        </header>

        <section className="mb-16">
          <h2 className="text-3xl font-bold text-blue-900 mb-6">Procedures Available in Hyderabad</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {procedureHighlights.map((item) => (
              <div key={item.title} className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-blue-700 mb-3">{item.title}</h3>
                <ul className="space-y-2 text-sm text-gray-700">
                  {item.details.map((detail) => (
                    <li key={detail}>• {detail}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-16 grid md:grid-cols-2 gap-10">
          <div>
            <h2 className="text-3xl font-bold text-blue-900 mb-4">Who Needs Spine Surgery?</h2>
            <p className="text-gray-700 mb-6">
              Most patients across Hyderabad start with structured physiotherapy and pain management. When symptoms persist or
              neurological deficits develop, surgical decompression or stabilization becomes the safest way to protect the
              spinal cord and nerves. During consultation, Dr. Sayuj reviews MRI imaging personally, demonstrates the pathology,
              and explains the least invasive option that can deliver durable relief.
            </p>
            <p className="text-gray-700">
              Whenever possible we favour full endoscopic or tubular approaches. When the spine is unstable or deformity is
              present, advanced fusion constructs with navigation-guided screw placement ensure accurate alignment and
              long-term stability.
            </p>
          </div>
          <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
            <h3 className="text-xl font-semibold text-blue-800 mb-4">Common Indications We Treat</h3>
            <div className="space-y-4">
              {indications.map((item) => (
                <div key={item.condition}>
                  <h4 className="font-semibold text-gray-800">{item.condition}</h4>
                  <p className="text-sm text-gray-600">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-3xl font-bold text-blue-900 mb-4">Serving Patients Across Hyderabad & Telangana</h2>
          <p className="text-gray-700 mb-6">
            Located at Yashoda Hospital, Malakpet, our spine surgery program welcomes patients from across the twin cities and
            neighbouring districts. Travel coordination, medical visa letters, and post-operative teleconsults are available on
            request.
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-blue-50 border border-blue-100 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-blue-800 mb-3">Travel Times</h3>
              <ul className="space-y-2 text-sm text-blue-900">
                {localAreas.map((area) => (
                  <li key={area}>• {area}</li>
                ))}
              </ul>
            </div>
            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-blue-800 mb-3">Pre-Visit Preparation</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>• Carry MRI/CT scans (digital or films) and prior surgical notes</li>
                <li>• Share comorbidity records (diabetes, hypertension) for anaesthesia planning</li>
                <li>• Corporate and insurance patients receive cashless assistance for approvals</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="mb-16 grid lg:grid-cols-[1.2fr_1fr] gap-10 items-start">
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-blue-900">Clinic Location & Contact</h2>
            <p className="text-gray-700">
              Consultations and surgeries are performed at Yashoda Hospital, Malakpet—equipped with dedicated neurosurgical OT
              suites, neurocritical care, and intraoperative neuromonitoring. Call ahead for MRI review clinics or to schedule a
              second opinion on prior surgical plans.
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
              href="/blog/return-to-work-after-endoscopic-discectomy-hyderabad/"
              className="inline-flex items-center justify-center rounded-full bg-blue-600 px-5 py-2 text-white font-semibold hover:bg-blue-700 transition-colors"
            >
              Read Recovery Guidance
            </Link>
          </div>
        </section>

        <ReviewedBy lastReviewed="2025-10-01" />
      </main>
    </>
  );
}
