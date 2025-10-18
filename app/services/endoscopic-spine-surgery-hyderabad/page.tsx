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

const SERVICE_SLUG = 'endoscopic-spine-surgery-hyderabad';

const baseMetadata = makeMetadata({
  title: 'Endoscopic Spine Surgery in Hyderabad | Day-Care MISS Program',
  description:
    'Full endoscopic spine surgery in Hyderabad for sciatica, lumbar canal stenosis, and cervical disc prolapse with same-day discharge protocols.',
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
      'Dedicated endoscopic spine surgery suite in Hyderabad providing transforaminal and interlaminar approaches with rapid recovery.',
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
    'Transforaminal and interlaminar full endoscopic spine surgery program at Yashoda Hospital Malakpet with day-care discharge and rapid recovery.',
});

const techniques = [
  {
    title: 'Transforaminal Endoscopic Discectomy (TESSYS)',
    description:
      'Lateral approach under local anaesthesia for lumbar slip disc with leg pain. Suitable for L4-L5 and L5-S1 herniations.',
  },
  {
    title: 'Interlaminar Endoscopic Decompression (ILESSYS)',
    description:
      'Posterior approach for central and lateral recess stenosis with ligamentum flavum hypertrophy causing claudication.',
  },
  {
    title: 'Cervical Endoscopic Discectomy',
    description:
      'Anterior or posterior endoscopic removal of cervical disc fragments compressing nerve roots or spinal cord.',
  },
];

const programHighlights = [
  'Dedicated MISS OT with 4K endoscopic tower and neuromonitoring support',
  'Average incision 8-10 mm with cosmetic closure and minimal blood loss',
  'Same-day mobilisation and discharge for most discectomy and stenosis cases',
  'Structured physiotherapy and return-to-work guidance for tech and manual professions',
];

const eligibilityChecklist = [
  'MRI-confirmed disc herniation or foraminal stenosis correlating with symptoms',
  'Failure of 6-8 weeks of guided physiotherapy and medical therapy',
  'No major spinal instability or high-grade spondylolisthesis',
  'No severe comorbidities that contraindicate day-care anaesthesia',
];

const faqs = [
  {
    question: 'Is endoscopic spine surgery painful?',
    answer:
      'Most lumbar procedures are performed under spinal anaesthesia with conscious sedation. Patients feel pressure but not pain during the procedure and are able to walk within 2-3 hours.',
  },
  {
    question: 'When can I return to office work or driving?',
    answer:
      'Desk professionals typically resume remote work in 5-7 days and office visits in 10-14 days. Driving is usually allowed after 2 weeks once leg strength and reflexes stabilise.',
  },
  {
    question: 'What if my insurance needs admission for approval?',
    answer:
      'We coordinate with TPA teams to secure cashless approval. If overnight observation is mandated, a short stay suite is arranged while following the enhanced recovery protocol.',
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
            <p className="text-sm font-medium uppercase tracking-wide text-blue-600 mb-3">Day-Care MISS Program</p>
            <h1 className="text-4xl md:text-5xl font-bold text-blue-900 leading-tight mb-6">
              Endoscopic Spine Surgery in Hyderabad with Day-Care Recovery
            </h1>
            <p className="text-lg text-gray-700 mb-6">
              Dr. Sayuj Krishnan&apos;s full endoscopic spine program at Yashoda Hospital Malakpet delivers rapid relief for disc
              herniation and spinal stenosis with minimal tissue trauma. Patients walk within hours and return home the same day in
              most cases.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/appointments/"
                className="inline-flex items-center justify-center rounded-full bg-blue-600 px-6 py-3 text-white font-semibold hover:bg-blue-700 transition-colors"
              >
                Check Day-Care Eligibility
              </Link>
              <Link
                href="/blog/day-care-endoscopic-spine-surgery-eligibility/"
                className="inline-flex items-center justify-center rounded-full border border-blue-200 px-6 py-3 text-blue-700 font-semibold hover:border-blue-400 hover:text-blue-900 transition-colors"
              >
                Learn About the Protocol
              </Link>
            </div>
          </div>
          <div className="bg-blue-50 border border-blue-100 rounded-2xl p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-blue-800 mb-4">
              What Makes Our Endoscopic Program Different?
            </h2>
            <ul className="space-y-2 text-gray-700">
              {programHighlights.map((highlight) => (
                <li key={highlight}>• {highlight}</li>
              ))}
            </ul>
          </div>
        </header>

        <section className="mb-16">
          <h2 className="text-3xl font-bold text-blue-900 mb-6">Endoscopic Techniques Offered in Hyderabad</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {techniques.map((item) => (
              <div key={item.title} className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-blue-700 mb-3">{item.title}</h3>
                <p className="text-sm text-gray-700">{item.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-16 grid md:grid-cols-2 gap-10">
          <div>
            <h2 className="text-3xl font-bold text-blue-900 mb-4">Who Qualifies for Endoscopic Spine Surgery?</h2>
            <p className="text-gray-700 mb-4">
              Endoscopic surgery suits patients with isolated nerve compression without significant instability. Careful patient
              selection ensures dependable outcomes and helps avoid unnecessary fusion procedures.
            </p>
            <ul className="space-y-2 text-sm text-gray-700">
              {eligibilityChecklist.map((item) => (
                <li key={item}>• {item}</li>
              ))}
            </ul>
          </div>
          <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
            <h3 className="text-xl font-semibold text-blue-800 mb-3">Common Conditions Treated</h3>
            <ul className="space-y-2 text-sm text-gray-700">
              <li>• Lumbar disc prolapse causing sciatica</li>
              <li>• Recurrent disc herniation after prior surgery</li>
              <li>• Foraminal stenosis with leg pain and numbness</li>
              <li>• Cervical disc prolapse with arm radiculopathy</li>
            </ul>
            <Link href="/blog/endoscopic-vs-microdiscectomy-hyderabad/" className="text-blue-600 hover:underline text-sm">
              Compare Endoscopic & Microdiscectomy →
            </Link>
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-3xl font-bold text-blue-900 mb-4">Serving Patients Across the Twin Cities</h2>
          <p className="text-gray-700 mb-6">
            Hyderabad&apos;s tech workforce, logistics teams, and manual labourers benefit from the rapid recovery offered by endoscopic
            spine surgery. We support patients travelling from Jubilee Hills, Gachibowli, Uppal, and Kukatpally with streamlined
            scheduling and tele-follow-ups.
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-blue-50 border border-blue-100 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-blue-800 mb-3">Pre-Surgery Preparation</h3>
              <ul className="space-y-2 text-sm text-blue-900">
                <li>• Bring MRI/CT scans and prior spine surgery notes if any</li>
                <li>• Inform us about blood thinners, diabetes medications, or cardiac history</li>
                <li>• Arrange an attendant for the ride home post day-care discharge</li>
              </ul>
            </div>
            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-blue-800 mb-3">Post-Surgery Care</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>• First dressing change at 48 hours</li>
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

        <ReviewedBy lastReviewed="2025-10-01" />
      </main>
    </>
  );
}
