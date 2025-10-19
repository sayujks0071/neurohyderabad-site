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
import AuthorByline from '@/app/_components/AuthorByline';
import SourceList from '@/app/_components/SourceList';
import { getServiceSources } from '../sources';

const SERVICE_SLUG = 'endoscopic-spine-surgery-hyderabad';

const baseMetadata = makeMetadata({
  title: 'Endoscopic Spine Surgery in Hyderabad | Dr. Sayuj | Yashoda Malakpet',
  description:
    'Minimally invasive endoscopic spine surgery in Hyderabad. Dr. Sayuj performs "keyhole" procedures at Yashoda Hospital, Malakpet. Get rapid relief today.',
  canonicalPath: `/services/${SERVICE_SLUG}`,
});

export const metadata: Metadata = {
  ...baseMetadata,
  keywords: [
    'endoscopic spine surgery hyderabad',
    'full endoscopic discectomy hyderabad',
    'day care spine surgery hyderabad',
    'miss spine surgery hyderabad',
    'transforaminal endoscopic spine surgery hyderabad',
  ],
  openGraph: {
    title: 'Endoscopic Spine Surgery in Hyderabad | Dr. Sayuj Krishnan',
    description:
      'Minimally invasive “keyhole” spine surgery in Hyderabad with rapid recovery, performed by Dr. Sayuj at Yashoda Hospital Malakpet.',
    url: `${SITE_URL}/services/${SERVICE_SLUG}`,
    siteName: 'Dr. Sayuj Krishnan - Neurosurgeon Hyderabad',
    locale: 'en_IN',
    type: 'website',
    images: [
      {
        url: `${SITE_URL}/api/og?title=${encodeURIComponent(
          'Endoscopic Spine Surgery in Hyderabad'
        )}&subtitle=${encodeURIComponent('Day-Care MISS Program')}`,
        width: 1200,
        height: 630,
        alt: 'Endoscopic Spine Surgery in Hyderabad – Dr. Sayuj Krishnan',
      },
    ],
  },
};

const schema = buildLocalServiceSchema({
  slug: SERVICE_SLUG,
  name: 'Full Endoscopic Spine Surgery in Hyderabad',
  description:
    'Ultra-minimally invasive endoscopic spine surgery program at Yashoda Hospital Malakpet delivering keyhole decompression with day-care discharge.',
});

const ARTICLE_SOURCES = getServiceSources(SERVICE_SLUG);

const conditions = [
  'Lumbar disc herniation causing sciatica or leg weakness',
  'Foraminal stenosis with nerve compression',
  'Cervical disc prolapse with arm pain or numbness',
  'Synovial cysts and focal nerve root compression',
];

const faqs = [
  {
    question: 'How is this different from other minimally invasive spine surgeries?',
    answer:
      'Endoscopic surgery uses a high-definition camera through a “keyhole” incision that is typically less than 1 cm. This approach preserves muscle, reduces postoperative pain, and speeds recovery compared to tubular or open techniques.',
  },
  {
    question: 'Is Yashoda Hospital, Malakpet easy to reach for day-care surgery?',
    answer:
      'Yes. The hospital is centrally located in Malakpet, making it convenient for patients travelling from Dilsukhnagar, LB Nagar, Charminar, Koti, and other parts of Hyderabad. Parking and attendant lounges are available on-site.',
  },
  {
    question: 'Why choose Dr. Sayuj for this “keyhole” procedure?',
    answer:
      'Endoscopic spine surgery is a specialised skill. Dr. Sayuj has focused training in full endoscopic techniques and performs them regularly at Yashoda Hospital, ensuring precision, safety, and consistent patient outcomes.',
  },
];

export default function EndoscopicSpineSurgeryHyderabadPage() {
  return (
    <>
      <JsonLd data={schema} />
      <main className="container mx-auto px-4 py-16">
        <Breadcrumbs
          items={[
            { name: 'Home', href: '/' },
            { name: 'Services', href: '/services/' },
            { name: 'Endoscopic Spine Surgery in Hyderabad', href: `/services/${SERVICE_SLUG}/` },
          ]}
        />

        <header className="grid md:grid-cols-2 gap-10 items-start mb-16">
          <div>
            <p className="text-sm font-medium uppercase tracking-wide text-blue-600 mb-3">Ultra-MINIMALLY INVASIVE CARE</p>
            <h1 className="text-4xl md:text-5xl font-bold text-blue-900 leading-tight mb-6">
              Advanced Endoscopic Spine Surgery in Hyderabad
            </h1>
            <AuthorByline
              publishedOn="2025-09-05"
              updatedOn="2025-10-19"
              className="mb-6"
            />
            <p className="text-lg text-gray-700 mb-6">
              Endoscopic—or “keyhole”—spine surgery provides fast, lasting relief from slip disc, sciatica, and foraminal stenosis
              with almost no muscle disruption. Performed by Dr. Sayuj at Yashoda Hospital, Malakpet, this approach helps you walk
              the same day and return to normal life sooner.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/appointments/"
                className="inline-flex items-center justify-center rounded-full bg-blue-600 px-6 py-3 text-white font-semibold hover:bg-blue-700 transition-colors"
              >
                Book an Endoscopic Consult
              </Link>
              <Link
                href="/blog/day-care-endoscopic-spine-surgery-eligibility/"
                className="inline-flex items-center justify-center rounded-full border border-blue-200 px-6 py-3 text-blue-700 font-semibold hover:border-blue-400 hover:text-blue-900 transition-colors"
              >
                Learn About Day-Care MISS
              </Link>
            </div>
          </div>
          <div className="bg-blue-50 border border-blue-100 rounded-2xl p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-blue-800 mb-4">Why Choose Malakpet for “Keyhole” Surgery?</h2>
            <ul className="space-y-3 text-gray-700">
              <li>• Consultant-led programme with advanced endoscopic training</li>
              <li>• Dedicated 4K endoscopic tower and neuromonitoring in Yashoda Malakpet</li>
              <li>• Most patients walk within hours and often go home the same evening</li>
              <li>• Post-operative physiotherapy and return-to-work planning in the same campus</li>
            </ul>
          </div>
        </header>

        <section className="mb-16">
          <h2 className="text-3xl font-bold text-blue-900 mb-6">Conditions Treated with Endoscopic Surgery</h2>
          <p className="text-gray-700 mb-4">
            Endoscopic surgery is recommended when nerve compression is localised and the spine remains stable. It allows precise
            removal of the offending disc or tissue without wider muscle detachment or bone removal.
          </p>
          <ul className="grid md:grid-cols-2 gap-4 text-sm text-gray-700">
            {conditions.map((condition) => (
              <li key={condition} className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">• {condition}</li>
            ))}
          </ul>
        </section>

        <section className="mb-16 grid md:grid-cols-2 gap-10">
          <div>
            <h2 className="text-3xl font-bold text-blue-900 mb-4">What to Expect at Yashoda Hospital, Malakpet</h2>
            <p className="text-gray-700 mb-6">
              After reviewing your MRI, Dr. Sayuj confirms whether a “keyhole” decompression will relieve the nerve pressure. The
              procedure is typically performed under spinal anaesthesia, and patients begin walking within hours. Because muscles are
              not stripped away, discomfort is markedly lower than with conventional surgery.
            </p>
            <p className="text-gray-700">
              Before discharge you receive a written plan covering wound care, physiotherapy milestones, and the timeline for driving,
              office work, and more strenuous activity. Follow-ups happen in our Malakpet clinic or via teleconsult to track your
              recovery closely.
            </p>
          </div>
          <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
            <h3 className="text-xl font-semibold text-blue-800 mb-3">Patient Journey</h3>
            <ol className="space-y-3 text-sm text-gray-700 list-decimal list-inside">
              <li>Consult in Malakpet with MRI/CT scans for eligibility assessment.</li>
              <li>Undergo day-care surgery through a 1 cm incision with minimal blood loss.</li>
              <li>Walk with assistance within 2-3 hours and discharge the same evening or next morning.</li>
              <li>Follow personalised rehab and return-to-work guidelines shared before discharge.</li>
            </ol>
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-3xl font-bold text-blue-900 mb-4">Serving Patients Across Hyderabad</h2>
          <p className="text-gray-700 mb-6">
            Our Malakpet location is convenient for patients travelling from Dilsukhnagar, LB Nagar, Charminar, Koti, and other
            neighbourhoods. We help with corporate approvals, insurance paperwork, and travel coordination for families who support
            you during the procedure.
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-blue-50 border border-blue-100 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-blue-800 mb-3">Pre-Surgery Preparation</h3>
              <ul className="space-y-2 text-sm text-blue-900">
                <li>• Bring MRI/CT scans and prior reports for review</li>
                <li>• Inform us about blood thinners, diabetes medications, or cardiac history</li>
                <li>• Arrange an attendant to accompany you home after day-care discharge</li>
              </ul>
            </div>
            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-blue-800 mb-3">Post-Surgery Care</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>• First dressing change at 48 hours in the Malakpet clinic</li>
                <li>• Physiotherapy-guided exercises begin Day 2</li>
                <li>• Follow-up visit in 7-10 days with wound inspection and rehab plan</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="mb-16 grid lg:grid-cols-[1.2fr_1fr] gap-10 items-start">
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-blue-900">Clinic Location & Day-Care Support</h2>
            <p className="text-gray-700">
              Procedures are performed at Yashoda Hospital, Malakpet in a dedicated endoscopic suite. Our team coordinates pre-admission
              tests, insurance approvals, and same-day discharge protocols tailored to your travel plans.
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
              href="/blog/day-care-spine-surgery-insurance-hyderabad/"
              className="inline-flex items-center justify-center rounded-full bg-blue-600 px-5 py-2 text-white font-semibold hover:bg-blue-700 transition-colors"
            >
              Understand Insurance Support
            </Link>
          </div>
        </section>

        <SourceList sources={ARTICLE_SOURCES} heading="Clinical References" />
        <ReviewedBy lastReviewed="2025-10-19" />
      </main>
    </>
  );
}
