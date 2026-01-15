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
import CostTransparencySection from '@/src/components/CostTransparencySection';

const SERVICE_SLUG = 'cervical-endoscopic-spine-surgery-hyderabad';

const baseMetadata = makeMetadata({
  title: 'Cervical Endoscopic Spine Surgery in Hyderabad | Keyhole Neck Surgery',
  description:
    'Advanced endoscopic cervical spine surgery by Dr. Sayuj Krishnan at Yashoda Hospital. Minimally invasive relief for neck pain and radiculopathy with rapid recovery.',
  canonicalPath: `/services/${SERVICE_SLUG}`,
});

export const metadata: Metadata = {
  ...baseMetadata,
  keywords: [
    'cervical endoscopic spine surgery hyderabad',
    'posterior cervical foraminotomy',
    'endoscopic anterior cervical discectomy',
    'keyhole neck surgery',
    'neck pain specialist hyderabad',
    'cervical radiculopathy treatment',
  ],
  openGraph: {
    title: 'Cervical Endoscopic Spine Surgery | Keyhole Neck Surgery Hyderabad',
    description:
      'Minimally invasive endoscopic solutions for cervical disc herniation and stenosis. Dr. Sayuj Krishnan offers cutting-edge care at Yashoda Hospital Malakpet.',
    url: `${SITE_URL}/services/${SERVICE_SLUG}`,
    siteName: 'Dr. Sayuj Krishnan - Neurosurgeon Hyderabad',
    locale: 'en_IN',
    type: 'website',
    images: [
      {
        url: `${SITE_URL}/api/og?title=${encodeURIComponent(
          'Cervical Endoscopic Surgery'
        )}&subtitle=${encodeURIComponent('Keyhole Neck Solutions')}`,
        width: 1200,
        height: 630,
        alt: 'Cervical Endoscopic Spine Surgery – Dr. Sayuj Krishnan',
      },
    ],
  },
};

const schema = buildLocalServiceSchema({
  slug: SERVICE_SLUG,
  name: 'Cervical Endoscopic Spine Surgery',
  description:
    'Full endoscopic cervical spine surgery for disc herniation and foraminal stenosis using minimally invasive posterior or anterior approaches.',
});

const ARTICLE_SOURCES = getServiceSources(SERVICE_SLUG);

const indications = [
  'Cervical disc herniation causing arm pain (radiculopathy)',
  'Foraminal stenosis (narrowing of the nerve exit canal)',
  'Cervical myelopathy (in selected early cases)',
  'Failed previous neck surgery requiring revision',
];

const faqs = [
  {
    question: 'How is endoscopic cervical surgery different from ACDF?',
    answer:
      'ACDF involves fusion with plates and screws. Endoscopic posterior foraminotomy preserves motion, avoids implants, and does not require fusion, making it ideal for lateral disc herniations.',
  },
  {
    question: 'Is it safe to operate on the neck endoscopically?',
    answer:
      'Yes. The full-endoscopic technique uses high-definition vision and continuous irrigation, providing excellent visualization of nerves. It is a precise, targeted procedure with a high safety profile in experienced hands.',
  },
  {
    question: 'What is the recovery time?',
    answer:
      'Most patients experience immediate relief from arm pain. Neck soreness resolves in a few days. Desk work can often resume in 1–2 weeks, compared to 4–6 weeks for open fusion surgery.',
  },
];

const COSTS = [
  {
    procedure: 'Endoscopic Posterior Foraminotomy',
    range: '₹1,50,000 - ₹2,00,000',
    recovery: '1-2 Days',
    includes: ['Keyhole Surgery', 'Nerve Decompression', 'No Implants']
  },
  {
    procedure: 'Endoscopic Anterior Discectomy',
    range: '₹1,80,000 - ₹2,30,000',
    recovery: '1-2 Days',
    includes: ['Anterior Approach', 'Disc Removal', 'HD Visualization']
  },
  {
    procedure: 'ACDF (Fusion)',
    range: '₹2,50,000 - ₹3,50,000',
    recovery: '3-4 Days',
    includes: ['Implants (Cage/Plate)', 'Bone Graft', 'Hospital Stay']
  }
];

export default function CervicalEndoscopicSpineSurgeryPage() {
  const relevantStories = patientStories.filter(story => {
    const tags = story.tags.join(' ').toLowerCase();
    return tags.includes('cervical') || tags.includes('neck');
  }).slice(0, 2);

  return (
    <>
      <JsonLd data={schema} />
      {/* PhysicianSchema removed as it's in layout */}
      <main className="container mx-auto px-4 py-16">
        <Breadcrumbs
          items={[
            { name: 'Home', href: '/' },
            { name: 'Services', href: '/services/' },
            { name: 'Cervical Endoscopic Spine Surgery', href: `/services/${SERVICE_SLUG}/` },
          ]}
        />

        <header className="grid md:grid-cols-2 gap-10 items-start mb-16">
          <div>
            <p className="text-sm font-medium uppercase tracking-wide text-blue-600 mb-3">Neck Pain Solutions</p>
            <h1 className="text-4xl md:text-5xl font-bold text-blue-900 leading-tight mb-6">
              Cervical Endoscopic Spine Surgery in Hyderabad
            </h1>
            <AuthorByline
              publishedOn="2025-09-15"
              updatedOn="2026-01-10"
              className="mb-6"
            />
            <p className="text-lg text-gray-700 mb-6">
              Suffering from radiating arm pain or neck stiffness? Endoscopic cervical surgery offers a
              <strong> "fusion-free" alternative</strong> to traditional neck surgery. Dr. Sayuj Krishnan uses advanced
              keyhole techniques to relieve nerve pressure while preserving natural neck motion.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/appointments/"
                className="inline-flex items-center justify-center rounded-full bg-blue-600 px-6 py-3 text-white font-semibold hover:bg-blue-700 transition-colors"
              >
                Book Neck Consultation
              </Link>
              <Link
                href="/about"
                className="inline-flex items-center justify-center rounded-full border border-blue-200 px-6 py-3 text-blue-700 font-semibold hover:border-blue-400 hover:text-blue-900 transition-colors"
              >
                Dr. Sayuj's Expertise
              </Link>
            </div>
          </div>
          <TrustProof serviceType="spine" className="mb-6" stories={relevantStories} />
          <div className="bg-blue-50 border border-blue-100 rounded-2xl p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-blue-800 mb-4">Why Consider Endoscopic Neck Surgery?</h2>
            <ul className="space-y-3 text-gray-700">
              <li>• <strong>No Fusion Required:</strong> Maintains natural neck movement.</li>
              <li>• <strong>Tiny Incision:</strong> Less than 8mm, minimizing scar tissue.</li>
              <li>• <strong>Rapid Recovery:</strong> Often a day-care or overnight procedure.</li>
              <li>• <strong>Less Pain:</strong> Minimal muscle dissection compared to open surgery.</li>
            </ul>
          </div>
        </header>

      {/* FAQPage JSON-LD for this page */}
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": faqs.map((faq) => ({
            "@type": "Question",
            "name": faq.question,
            "acceptedAnswer": {
              "@type": "Answer",
              "text": faq.answer
            }
          }))
        }}
      />

        <section className="mb-16">
          <h2 className="text-3xl font-bold text-blue-900 mb-6">Conditions Treated</h2>
          <p className="text-gray-700 mb-4">
            This advanced technique is highly effective for specific cervical spine problems where nerve roots are compressed.
          </p>
          <ul className="grid md:grid-cols-2 gap-4 text-sm text-gray-700">
            {indications.map((condition) => (
              <li key={condition} className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">• {condition}</li>
            ))}
          </ul>
        </section>

        <section className="mb-16 grid md:grid-cols-2 gap-10">
          <div>
            <h2 className="text-3xl font-bold text-blue-900 mb-4">The Procedure: What Happens?</h2>
            <p className="text-gray-700 mb-6">
              The most common endoscopic approach is the <strong>Posterior Cervical Foraminotomy</strong>. It is performed
              from the back of the neck. A small tube is inserted to the target area. Using high-definition endoscopy
              and a high-speed drill, a small amount of bone and ligament is removed to open the nerve channel (foramen).
              The disc herniation is then carefully removed, freeing the nerve.
            </p>
            <p className="text-gray-700">
              Since the disc itself is preserved (unlike ACDF where it is removed entirely), spinal stability is maintained
              without the need for screws or plates.
            </p>
          </div>
          <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
            <h3 className="text-xl font-semibold text-blue-800 mb-3">Recovery Timeline</h3>
            <ol className="space-y-3 text-sm text-gray-700 list-decimal list-inside">
              <li><strong>Day 0:</strong> Surgery (approx 60-90 mins). Mobilize within 2-3 hours.</li>
              <li><strong>Day 1:</strong> Discharge. Minimal neck collar usage (soft collar for comfort).</li>
              <li><strong>Week 1:</strong> Light activities. Wound check.</li>
              <li><strong>Week 2-3:</strong> Return to desk work and driving.</li>
            </ol>
          </div>
        </section>

        <CostTransparencySection
          costs={COSTS}
          disclaimer="Estimates for self-pay patients. Implants (if needed for fusion) are charged additionally at MRP. Insurance usually covers these procedures."
        />

        <section className="mb-16 grid lg:grid-cols-[1.2fr_1fr] gap-10 items-start">
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-blue-900">Expert Care at Yashoda Malakpet</h2>
            <p className="text-gray-700">
              Dr. Sayuj Krishnan is among the few neurosurgeons in Hyderabad proficient in Full Endoscopic Cervical Spine Surgery.
              The procedure is performed in a state-of-the-art suite with dedicated endoscopic towers and safety equipment.
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
              href="/blog/cervical-spine-surgery-recovery-tips/"
              className="inline-flex items-center justify-center rounded-full bg-blue-600 px-5 py-2 text-white font-semibold hover:bg-blue-700 transition-colors"
            >
              Read Recovery Guide
            </Link>
          </div>
        </section>

        <LocalPathways mode="service" />

        <SourceList sources={ARTICLE_SOURCES} heading="Clinical References" />
        <ReviewedBy lastReviewed="2026-01-10" />
      </main>
    </>
  );
}
