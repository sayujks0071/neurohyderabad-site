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
import TrustProof from '@/app/_components/TrustProof';
import { LocalPathways } from '@/src/components/locations/LocalPathways';
import { getServiceSources } from '../sources';
import { patientStories } from '@/src/content/stories';
import SurgeryComparisonTable from '@/src/components/SurgeryComparisonTable';
import CostTransparencySection from '@/src/components/CostTransparencySection';

const SERVICE_SLUG = 'uniportal-endoscopic-spine-surgery-hyderabad';

// Ensure page is statically generated
export const revalidate = 3600; // Revalidate every hour

const baseMetadata = makeMetadata({
  title: 'Uniportal Endoscopic Spine Surgery Hyderabad | Single Hole Surgery – Dr. Sayuj Krishnan',
  description:
    'Advanced Uniportal Endoscopic Spine Surgery (Single Hole) in Hyderabad by Dr. Sayuj Krishnan. True stitchless, minimally invasive spine surgery for slip disc. Day-care discharge.',
  canonicalPath: `/services/${SERVICE_SLUG}`,
});

export const metadata: Metadata = {
  ...baseMetadata,
  keywords: [
    'uniportal endoscopic spine surgery hyderabad',
    'single hole spine surgery hyderabad',
    'stitchless spine surgery hyderabad',
    'full endoscopic spine surgery',
    'keyhole disc surgery hyderabad',
    'dr sayuj krishnan',
    'yashoda hospital malakpet',
  ],
  openGraph: {
    title: 'Uniportal Endoscopic Spine Surgery | Single Hole Technique',
    description:
      'True "Single Hole" spine surgery in Hyderabad. Uniportal Endoscopy offers the least invasive approach for slip disc and stenosis. Walk same day.',
    url: `${SITE_URL}/services/${SERVICE_SLUG}`,
    siteName: 'Dr. Sayuj Krishnan - Neurosurgeon Hyderabad',
    locale: 'en_IN',
    type: 'website',
    images: [
      {
        url: `${SITE_URL}/api/og?title=${encodeURIComponent(
          'Uniportal Endoscopic Surgery'
        )}&subtitle=${encodeURIComponent('Single Hole - Day Care')}`,
        width: 1200,
        height: 630,
        alt: 'Uniportal Endoscopic Spine Surgery – Dr. Sayuj Krishnan',
      },
    ],
  },
};

const schema = buildLocalServiceSchema({
  slug: SERVICE_SLUG,
  name: 'Uniportal Endoscopic Spine Surgery in Hyderabad',
  description:
    'State-of-the-art Uniportal Endoscopic Spine Surgery program at Yashoda Hospital Malakpet. Single 8mm incision, no muscle cutting, rapid recovery.',
});

const ARTICLE_SOURCES = getServiceSources(SERVICE_SLUG);

const conditions = [
  'Herniated Disc (Slip Disc) L4-L5, L5-S1',
  'Sciatica with foot drop or weakness',
  'Lumbar Canal Stenosis (narrowing)',
  'Foraminal Stenosis causing nerve root pain',
];

const faqs = [
  {
    question: 'What is Uniportal Endoscopic Spine Surgery?',
    answer:
      'It is an ultra-minimally invasive technique where the entire surgery is performed through a single tiny incision (about 8mm). Both the camera and instruments pass through this single channel, minimising trauma to surrounding muscles compared to biportal or tubular methods.',
  },
  {
    question: 'How is it different from Biportal Endoscopy (UBE)?',
    answer:
      'Biportal endoscopy requires two incisions (one for camera, one for instruments). Uniportal uses only one "keyhole". This typically results in even less postoperative pain and a more cosmetic, virtually invisible scar.',
  },
  {
    question: 'Am I a candidate for this "Single Hole" surgery?',
    answer:
      'Most patients with sciatica, slip disc, or spinal stenosis who have not responded to 6 weeks of medication and physiotherapy are candidates. Dr. Sayuj will evaluate your MRI to confirm if the anatomy is suitable for this specific approach.',
  },
];

const COSTS = [
  {
    procedure: 'Uniportal Endoscopic Discectomy',
    range: '₹1,10,000 - ₹1,45,000',
    recovery: '1 Day',
    includes: ['Surgeon Fees', 'Specialised Scope Use', 'Standard Room', 'Medications']
  },
  {
    procedure: 'Uniportal Decompression (Stenosis)',
    range: 'Ask for Estimate',
    recovery: '1-2 Days',
    includes: ['Bone Drill Use', 'Neuromonitoring', 'Nursing Care']
  }
];

const RECOVERY_STEPS = [
  { time: 'Day 0', milestone: 'Walk to restroom 2-3 hours after surgery. Diet resumed.' },
  { time: 'Day 1', milestone: 'Discharge home. Climb stairs with comfort.' },
  { time: 'Week 1', milestone: 'Light daily activities. Work from home possible.' },
  { time: 'Week 3', milestone: 'Return to driving and regular office commute.' },
];

// Google Business Profile JSON-LD

export default function UniportalPage() {
  const relevantStories = patientStories.filter(story => {
    const tags = story.tags.join(' ').toLowerCase();
    return tags.includes('spine') || tags.includes('sciatica');
  }).slice(0, 2);

  return (
    <>
      <JsonLd data={schema} />
      <main className="container mx-auto px-4 py-16">
        <Breadcrumbs
          items={[
            { name: 'Home', href: '/' },
            { name: 'Services', href: '/services/' },
            { name: 'Uniportal Endoscopic Surgery', href: `/services/${SERVICE_SLUG}/` },
          ]}
          disableSchema={true}
        />

        <header className="grid md:grid-cols-2 gap-10 items-start mb-16">
          <div>
            <p className="text-sm font-medium uppercase tracking-wide text-blue-600 mb-3">Single Hole • Stitchless • Day Care</p>
            <h1 className="text-4xl md:text-5xl font-bold text-blue-900 leading-tight mb-6">
              Uniportal Endoscopic Spine Surgery in Hyderabad
            </h1>
            <AuthorByline
              publishedOn="2025-11-15"
              updatedOn="2026-01-10"
              className="mb-6"
            />
            <p className="text-lg text-gray-700 mb-6">
              Experience the most advanced form of "Keyhole" surgery. Uniportal Endoscopy uses a single 8mm incision to remove disc herniations
              and relieve nerve pressure. Performed by Dr. Sayuj at Yashoda Hospital, Malakpet, this technique offers the fastest recovery
              with minimal tissue disruption.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/appointments/"
                className="inline-flex items-center justify-center rounded-full bg-blue-600 px-6 py-3 text-white font-semibold hover:bg-blue-700 transition-colors"
              >
                Book Uniportal Assessment
              </Link>
              <Link
                href="/about"
                className="inline-flex items-center justify-center rounded-full border border-blue-200 px-6 py-3 text-blue-700 font-semibold hover:border-blue-400 hover:text-blue-900 transition-colors"
              >
                Meet Dr. Sayuj
              </Link>
            </div>
          </div>
          <TrustProof serviceType="spine" className="mb-6" stories={relevantStories} />
          <div className="bg-blue-50 border border-blue-100 rounded-2xl p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-blue-800 mb-4">Why Uniportal?</h2>
            <ul className="space-y-3 text-gray-700">
              <li>• <strong>Single Incision (8mm):</strong> Less trauma than biportal or tubular methods.</li>
              <li>• <strong>Direct Visualization:</strong> High-def camera allows precise nerve decompression.</li>
              <li>• <strong>Stitchless:</strong> Often closed with just glue or a single suture.</li>
              <li>• <strong>Day Care:</strong> Admit morning, surgery noon, discharge evening (for many cases).</li>
            </ul>
          </div>
        </header>

      {/* FAQPage JSON-LD */}
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": faqs.map(f => ({
            "@type": "Question",
            "name": f.question,
            "acceptedAnswer": { "@type": "Answer", "text": f.answer }
          }))
        }}
      />

        <section className="mb-16">
          <h2 className="text-3xl font-bold text-blue-900 mb-6">Who Needs Uniportal Surgery?</h2>
          <p className="text-gray-700 mb-4">
            This technique is highly effective for patients suffering from nerve root compression who want to avoid the downtime and pain
            associated with open surgery.
          </p>
          <ul className="grid md:grid-cols-2 gap-4 text-sm text-gray-700">
            {conditions.map((condition) => (
              <li key={condition} className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">• {condition}</li>
            ))}
          </ul>
        </section>

        <section className="mb-16">
          <h2 className="text-3xl font-bold text-blue-900 mb-6">The "Single Hole" Advantage</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
              <h3 className="text-xl font-semibold text-blue-800 mb-3">Less Muscle Damage</h3>
              <p className="text-gray-700">
                Unlike open surgery which retracts muscle widely, or biportal which needs two paths, Uniportal works through a natural window. This preserves your back strength and reduces future back pain risks.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
              <h3 className="text-xl font-semibold text-blue-800 mb-3">Superior Vision</h3>
              <p className="text-gray-700">
                The endoscope brings the surgeon's eye within millimetres of the nerve. We can see and protect nerves better than with naked-eye or loupe-magnified surgery.
              </p>
            </div>
          </div>
        </section>

        <section className="mb-16 grid md:grid-cols-2 gap-10">
          <div>
            <h2 className="text-3xl font-bold text-blue-900 mb-4">Your Experience at Yashoda Malakpet</h2>
            <p className="text-gray-700 mb-6">
              Dr. Sayuj uses dedicated Wolf/Storz endoscopic systems. The surgery is usually done under spinal or general anaesthesia depending on the level. You wake up with a waterproof dressing on a tiny cut. Most patients are surprised by the lack of surgical pain.
            </p>
            <p className="text-gray-700">
              Recovery is rapid. You will be encouraged to walk to the washroom on your own a few hours after the anaesthesia wears off.
            </p>
          </div>
          <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
            <h3 className="text-xl font-semibold text-blue-800 mb-3">Patient Pathway</h3>
            <ol className="space-y-3 text-sm text-gray-700 list-decimal list-inside">
              <li>Detailed MRI review to plan the "trajectory".</li>
              <li>Admission and pre-op checks (blood, ECG).</li>
              <li>Surgery (approx 45-90 mins).</li>
              <li>Observation for 4-6 hours.</li>
              <li>Discharge with oral meds and walking instructions.</li>
            </ol>
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-3xl font-bold text-blue-900 mb-6">Recovery Milestones</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {RECOVERY_STEPS.map((step, idx) => (
              <div key={idx} className="bg-blue-50 border border-blue-100 rounded-xl p-4">
                <div className="text-sm font-semibold text-blue-600 mb-2 uppercase">{step.time}</div>
                <div className="text-gray-800 text-sm">{step.milestone}</div>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-3xl font-bold text-blue-900 mb-6">Comparison with Other Techniques</h2>
          <SurgeryComparisonTable />
        </section>

        <section className="mb-16">
          <h2 className="text-3xl font-bold text-blue-900 mb-6">Serving All of Hyderabad</h2>
          <p className="text-gray-700 mb-6">
            Located in Malakpet, we are easily accessible via the Metro (Malakpet Station) and main roads. We serve patients from across the city including Dilsukhnagar, LB Nagar, and the Old City.
          </p>
          <LocalPathways mode="service" className="mb-8" />
        </section>

        <CostTransparencySection
          costs={COSTS}
          disclaimer="Estimated package pricing. Costs may vary based on insurance room eligibility and medical comorbidity."
        />

        <section className="mb-16 grid lg:grid-cols-[1.2fr_1fr] gap-10 items-start">
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-blue-900">Visit Us</h2>
            <p className="text-gray-700">
              Yashoda Hospital Malakpet offers world-class infrastructure for advanced spine care.
            </p>
            <NAP className="bg-gray-50 border border-gray-200 rounded-xl p-6" />
            <div>
              <h3 className="text-xl font-semibold text-blue-800 mb-3">Location</h3>
              <MapEmbed />
            </div>
          </div>
          <div className="bg-blue-50 border border-blue-100 rounded-2xl p-6 shadow-sm space-y-5">
            <h3 className="text-xl font-semibold text-blue-800">Common Questions</h3>
            {faqs.map((faq) => (
              <div key={faq.question}>
                <p className="font-semibold text-blue-900">{faq.question}</p>
                <p className="text-sm text-blue-900/80 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
            <Link
              href="/appointments/"
              className="inline-flex items-center justify-center rounded-full bg-blue-600 px-5 py-2 text-white font-semibold hover:bg-blue-700 transition-colors"
            >
              Book Appointment
            </Link>
          </div>
        </section>

        <LocalPathways mode="service" />

        <SourceList sources={ARTICLE_SOURCES} heading="Scientific References" />
        <ReviewedBy lastReviewed="2026-01-10" />
      </main>
    </>
  );
}
