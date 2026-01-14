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
import { PhysicianSchema } from "@/src/components/schema/PhysicianSchema";
import SurgeryComparisonTable from '@/src/components/SurgeryComparisonTable';
import CostTransparencySection from '@/src/components/CostTransparencySection';

const SERVICE_SLUG = 'endoscopic-spine-surgery-hyderabad';

// Ensure page is statically generated
export const revalidate = 3600; // Revalidate every hour

const baseMetadata = makeMetadata({
  title: 'Endoscopic Spine Surgery in Hyderabad | Minimally Invasive Keyhole Surgery – Dr. Sayuj Krishnan',
  description:
    'Endoscopic spine surgery in Hyderabad at Yashoda Hospital Malakpet. Dr. Sayuj Krishnan offers minimally invasive keyhole spine surgery for slip disc, sciatica, and spinal stenosis. Same-day discharge, faster recovery. Book consultation today.',
  canonicalPath: `/services/${SERVICE_SLUG}`,
});

export const metadata: Metadata = {
  ...baseMetadata,
  keywords: [
    'endoscopic spine surgery hyderabad',
    'minimally invasive spine surgery hyderabad',
    'keyhole spine surgery cost',
    'endoscopic discectomy hyderabad',
    'transforaminal endoscopic spine surgery hyderabad',
    'interlaminar endoscopic spine surgery',
    'spine surgeon yashoda hospital malakpet',
    'day care spine surgery',
  ],
  openGraph: {
    title: 'Endoscopic Spine Surgery in Hyderabad | Minimally Invasive Keyhole Surgery',
    description:
      'Endoscopic spine surgery in Hyderabad at Yashoda Hospital Malakpet. Minimally invasive keyhole surgery for slip disc, sciatica, and spinal stenosis. Same-day discharge available.',
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

const COSTS = [
  {
    procedure: 'Endoscopic Discectomy (Lumbar)',
    range: '₹95,000 - ₹1,35,000',
    recovery: '1-2 Days',
    includes: ['Surgeon Fees', 'OT & Nursing', 'Standard Room (1 Day)', 'Medications']
  },
  {
    procedure: 'Endoscopic Canal Decompression',
    range: 'Ask for Estimate',
    recovery: '2 Days',
    includes: ['Stenosis Decompression', 'Advanced Endoscope Use', 'Neuromonitoring']
  },
  {
    procedure: 'Cervical Endoscopic Decompression',
    range: 'Ask for Estimate',
    recovery: '2 Days',
    includes: ['Neck Surgery', 'High-Definition Optics', 'Specialised Instrumentation']
  }
];

const RECOVERY_STEPS = [
  { time: 'Day 0 (Surgery)', milestone: 'Walk to washroom with assistance 3 hours after surgery.' },
  { time: 'Day 1 (Discharge)', milestone: 'Climb a flight of stairs. Discharge with oral pain meds.' },
  { time: 'Week 1', milestone: 'Short walks outside. Desk work from home allowed.' },
  { time: 'Week 3-4', milestone: 'Resume driving and full-time office work.' },
];

const SUCCESS_RATES = [
  {
    condition: "Lumbar Disc Herniation",
    rate: "90-95%",
    description: "High success in relieving sciatica pain with low recurrence rates compared to open surgery."
  },
  {
    condition: "Spinal Stenosis",
    rate: "85-90%",
    description: "Effective decompression of the spinal canal with significant improvement in walking distance."
  },
  {
    condition: "Cervical Disc Herniation",
    rate: "90%+",
    description: "Excellent outcomes for arm pain (radiculopathy) with minimal neck muscle trauma."
  }
];

const ADVANCED_TECHNIQUES = [
  {
    title: "Transforaminal Endoscopy (TESS)",
    description: "Best for slip disc (herniation) affecting the nerve root. Accessed through the side (foramen) without cutting bone, avoiding instability."
  },
  {
    title: "Interlaminar Endoscopy (ILESS)",
    description: "Ideal for L5-S1 herniations and spinal stenosis. Accessed from the back through a tiny window, clearing thickened ligaments."
  },
  {
    title: "Endoscopic Cervical Decompression",
    description: "Posterior approach for neck disc herniations, avoiding fusion and preserving neck mobility."
  },
  {
    title: "Endoscopic Foraminal Decompression",
    description: "Targeted widening of the nerve exit canal to relieve 'pinched nerves' caused by bone spurs or collapse."
  },
  {
    title: "Endoscopic Lumbar Discectomy",
    description: "Gold-standard minimally invasive removal of disc fragments pressing on nerves, allowing same-day walking."
  }
];

// Google Business Profile JSON-LD for Endoscopic Spine Surgery
const gbpSchema = {
  "@context": "https://schema.org",
  "@type": "MedicalBusiness",
  "name": "Endoscopic Spine Surgery | Dr. Sayuj Krishnan",
  "url": "https://www.drsayuj.info/services/endoscopic-spine-surgery-hyderabad/?utm_source=google&utm_medium=organic&utm_campaign=gbp_endoscopic_spine_surgery_hyderabad",
  "image": "https://www.drsayuj.info/images/og-default.jpg",
  "description": "Advanced full endoscopic spine surgery by Dr. Sayuj Krishnan, Yashoda Hospital Hyderabad. Minimally invasive, rapid recovery, and day-care options for herniated disc and spinal decompression.",
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": "https://www.drsayuj.info/services/endoscopic-spine-surgery-hyderabad/"
  },
  "medicalSpecialty": "Spine Surgery",
  "areaServed": {
    "@type": "AdministrativeArea",
    "name": "Hyderabad, Telangana, India"
  },
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Room No. 317, OPD Block, Yashoda Hospital, Malakpet",
    "addressLocality": "Hyderabad",
    "addressRegion": "Telangana",
    "postalCode": "500036",
    "addressCountry": "IN"
  },
  "openingHours": "Mo-Sa 10:00-17:00",
  "telephone": "+91-97782-80044",
  "priceRange": "₹₹",
  "sameAs": [
    "https://www.instagram.com/drsayujneurohyd",
    "https://www.linkedin.com/in/drsayujkrishnan",
    "https://www.youtube.com/@drsayujneurohyd"
  ]
};

export default function EndoscopicSpineSurgeryHyderabadPage() {
  const relevantStories = patientStories.filter(story => {
    const tags = story.tags.join(' ').toLowerCase();
    return tags.includes('spine') || tags.includes('tlif');
  }).slice(0, 2);

  return (
    <>
      <JsonLd data={schema} />
      <JsonLd data={gbpSchema} />
      <PhysicianSchema />
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
              Endoscopic Spine Surgery in Hyderabad | Minimally Invasive Keyhole Surgery
            </h1>
            <AuthorByline
              publishedOn="2025-09-05"
              updatedOn="2026-01-10"
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
                href="/about"
                className="inline-flex items-center justify-center rounded-full border border-blue-200 px-6 py-3 text-blue-700 font-semibold hover:border-blue-400 hover:text-blue-900 transition-colors"
              >
                About Dr. Sayuj
              </Link>
            </div>
          </div>
          <TrustProof serviceType="spine" className="mb-6" stories={relevantStories} />
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

      {/* FAQPage JSON-LD for this page */}
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": [
            {
              "@type": "Question",
              "name": "When should I see a neurosurgeon for back pain?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "If you have persistent back or leg pain, numbness or weakness that isn’t improving with rest and physiotherapy, or if you experience loss of bowel or bladder control, consult a neurosurgeon. Early evaluation in Hyderabad can prevent nerve damage and may allow for minimally invasive treatment."
              }
            },
            {
              "@type": "Question",
              "name": "Is endoscopic spine surgery painful?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Endoscopic spine surgery uses tiny incisions and causes less tissue disruption than traditional open surgery. Most patients report manageable discomfort controlled with oral pain medication and are able to walk the same day."
              }
            },
            {
              "@type": "Question",
              "name": "How soon can I walk after endoscopic disc surgery?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Patients typically begin walking within a few hours of endoscopic discectomy. Many return to desk work within 1–2 weeks, while heavy labour may require 4–8 weeks of graded recovery."
              }
            },
            {
              "@type": "Question",
              "name": "What is the success rate of endoscopic discectomy?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "For appropriately selected patients, endoscopic discectomy has a high success rate (around 85–95%) in relieving leg pain and numbness. Success depends on proper diagnosis, surgeon experience and adherence to post‑operative care instructions."
              }
            }
          ]
        }}
      />

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

        <section className="mb-16">
          <h2 className="text-3xl font-bold text-blue-900 mb-6">Advanced Endoscopic Techniques We Use</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {ADVANCED_TECHNIQUES.map((tech) => (
              <div key={tech.title} className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                <h3 className="text-lg font-semibold text-blue-800 mb-2">{tech.title}</h3>
                <p className="text-sm text-gray-700 leading-relaxed">
                  {tech.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-3xl font-bold text-blue-900 mb-6">Clinical Success Rates</h2>
          <div className="bg-blue-900 rounded-2xl p-8 text-white shadow-xl">
            <p className="mb-8 text-blue-100 max-w-3xl">
              Endoscopic spine surgery has evolved to become the gold standard for many spinal conditions.
              Success is defined as significant pain relief, return to function, and no need for further surgery.
            </p>
            <div className="grid md:grid-cols-3 gap-8">
              {SUCCESS_RATES.map((item) => (
                <div key={item.condition} className="bg-blue-800/50 rounded-xl p-6 border border-blue-700 backdrop-blur-sm">
                  <div className="text-4xl font-bold text-blue-300 mb-2">{item.rate}</div>
                  <div className="text-lg font-semibold text-white mb-2">{item.condition}</div>
                  <p className="text-sm text-blue-200 leading-relaxed">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
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
          <h2 className="text-3xl font-bold text-blue-900 mb-6">Recovery Timeline</h2>
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
          <h2 className="text-3xl font-bold text-blue-900 mb-6">Endoscopic vs. Traditional Spine Surgery</h2>
          <p className="text-gray-700 mb-6">
            Many patients ask why endoscopic surgery is preferred over traditional open methods. The key difference lies in how we approach the spine—preserving your natural anatomy rather than cutting through it.
          </p>
          <SurgeryComparisonTable />
        </section>

        <section className="mb-16">
          <h2 className="text-3xl font-bold text-blue-900 mb-6">Serving Patients Across Hyderabad</h2>
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

        <CostTransparencySection
          costs={COSTS}
          disclaimer="Approximate package estimates for self-pay patients at Yashoda Hospital Malakpet. Final cost depends on room category (General/Sharing/Private), insurance approvals, and specific implant requirements. We offer full assistance with insurance pre-authorization."
        />

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

        {/* Added bottom Pathways */}
        <LocalPathways mode="service" />

        <SourceList sources={ARTICLE_SOURCES} heading="Clinical References" />
        <ReviewedBy lastReviewed="2026-01-10" />
      </main>
    </>
  );
}
