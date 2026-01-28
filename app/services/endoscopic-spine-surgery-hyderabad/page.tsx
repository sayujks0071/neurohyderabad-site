import type { Metadata } from 'next';
import Link from 'next/link';
import Breadcrumbs from '@/app/components/Breadcrumbs';
import JsonLd from '@/components/JsonLd';
import ReviewedBy from '@/app/_components/ReviewedBy';
import { makeMetadata } from '@/app/_lib/meta';
import { LocationNAPCard } from '@/src/components/locations/LocationNAPCard';
import { LocationMapEmbed } from '@/src/components/locations/LocationMapEmbed';
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

const SERVICE_SLUG = 'endoscopic-spine-surgery-hyderabad';

// Ensure page is statically generated
export const revalidate = 3600; // Revalidate every hour

const baseMetadata = makeMetadata({
  title: 'Endoscopic Spine Surgery Hyderabad | 90% Same-Day Discharge',
  description:
    'Expert endoscopic spine surgery in Hyderabad by Dr. Sayuj Krishnan. 90% same-day discharge. Minimally invasive keyhole surgery for slip disc & sciatica.',
  canonicalPath: `/services/${SERVICE_SLUG}`,
});

export const metadata: Metadata = {
  ...baseMetadata,
  title: 'Endoscopic Spine Surgery Hyderabad | Day Care Keyhole',
  description:
    'Advanced Endoscopic Spine Surgery in Hyderabad. 7mm incision, same-day discharge. Expert treatment for Slip Disc & Sciatica. Check packages.',
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
    title: 'Endoscopic Spine Surgery in Hyderabad | Keyhole Surgery Cost',
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

const faqs = [
  {
    question: 'How is this different from other minimally invasive spine surgeries?',
    answer:
      'Endoscopic surgery uses a high-definition camera through a “keyhole” incision that is typically less than 1 cm. This approach preserves muscle, reduces postoperative pain, and speeds recovery compared to tubular or open techniques.',
  },
  {
    question: 'What should I expect on the day of endoscopic spine surgery?',
    answer:
      'Most cases are day-care procedures. You arrive for pre-op checks, undergo the keyhole surgery, and begin walking within hours. Discharge is usually the same evening or next morning with a written recovery plan.',
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
  {
    question: 'Is endoscopic spine surgery the same as laser spine surgery?',
    answer: 'No. Laser surgery often refers to limited surface ablation. Endoscopic surgery is a comprehensive structural correction (removing bone spurs or disc fragments) under high-definition visualization, offering far superior long-term results than laser alone.'
  },
  {
    question: 'How does endoscopic spine surgery recovery compare to microscopic surgery?',
    answer: 'Endoscopic surgery typically offers a faster recovery. Since it uses a smaller incision (8mm vs 2-3cm) and avoids cutting muscle, most patients walk within 3 hours and return to work in 3-5 days, compared to 2-3 weeks for microscopic surgery.'
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
    range: '₹1,20,000 - ₹1,60,000',
    recovery: '2 Days',
    includes: ['Stenosis Decompression', 'Advanced Endoscope Use', 'Neuromonitoring']
  },
  {
    procedure: 'Cervical Endoscopic Decompression',
    range: '₹1,20,000 - ₹1,70,000',
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

const conditions = [
  { text: 'Lumbar disc herniation (slip disc)', href: '/conditions/slip-disc-treatment-hyderabad' },
  { text: 'Sciatica with leg pain', href: '/conditions/sciatica-pain-treatment-hyderabad' },
  { text: 'Spinal stenosis (narrowing)', href: '/conditions/spinal-stenosis-treatment-hyderabad' },
  { text: 'Foraminal stenosis' },
  { text: 'Cervical disc herniation', href: '/conditions/cervical-radiculopathy-treatment-hyderabad' },
  { text: 'Failed conservative treatment (6+ weeks)' },
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
    title: "Daycare Spine Surgery",
    description: "Our specialized protocol allows 90% of patients to walk within 3 hours and go home the same day, minimizing hospital acquired infection risks."
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
    description: "Gold-standard minimally invasive removal of disc fragments pressing on nerves, allowing same-day walking.",
    href: "/services/endoscopic-discectomy-hyderabad"
  },
  {
    title: "Awake Endoscopic Spine Surgery",
    description: "For elderly or high-risk patients, we perform the procedure under local anaesthesia with mild sedation, avoiding general anaesthesia risks.",
    href: "/services/awake-spine-surgery-hyderabad"
  }
];

const SURGERY_STEPS = [
  {
    step: "Step 1: Anesthesia",
    title: "Comfort & Safety",
    description: "The procedure is typically performed under local or regional anaesthesia with mild sedation. You remain comfortable but awake, allowing you to communicate with the surgeon if needed. General anaesthesia is available for anxious patients."
  },
  {
    step: "Step 2: The Keyhole",
    title: "Tiny Incision",
    description: "A small incision of about 7-8mm (less than 1 cm) is made. This is covered by a small Band-Aid after surgery, leaving minimal to no scarring."
  },
  {
    step: "Step 3: Access",
    title: "Muscle Preservation",
    description: "Instead of cutting through muscles (as in open surgery), we use a series of dilators to gently separate muscle fibres. This creates a tunnel to the spine without tissue damage."
  },
  {
    step: "Step 4: The Procedure",
    title: "High-Definition Decompression",
    description: "An endoscope with a 4K camera is inserted. Dr. Sayuj views the nerves on a large monitor and precisely removes the disc herniation or bone spurs pressing on the nerve using micro-instruments."
  },
  {
    step: "Step 5: Immediate Relief",
    title: "Closure & Recovery",
    description: "The instruments are removed, and the skin is closed with a single stitch or skin glue. Most patients feel immediate relief from leg pain and are encouraged to walk within 2-3 hours."
  }
];

// Google Business Profile JSON-LD for Endoscopic Spine Surgery

export default function EndoscopicSpineSurgeryHyderabadPage() {
  const relevantStories = patientStories.filter(story => {
    const tags = story.tags.join(' ').toLowerCase();
    return tags.includes('spine') || tags.includes('tlif');
  }).slice(0, 2);

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
              Endoscopic Spine Surgery in Hyderabad | Minimally Invasive Keyhole Surgery
            </h1>
            <AuthorByline
              publishedOn="2024-09-05"
              updatedOn="2025-02-20"
              className="mb-6"
            />
            <p className="text-lg text-gray-700 mb-6">
              Endoscopic—or “keyhole”—spine surgery provides fast, lasting relief from slip disc,{" "}
              <Link href="/conditions/sciatica-pain-treatment-hyderabad" className="text-blue-700 underline">
                sciatica
              </Link>
              , and foraminal stenosis
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
              "name": "What should I expect on the day of endoscopic spine surgery?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Most cases are day-care procedures. You arrive for pre-op checks, undergo keyhole surgery, and begin walking within hours. Discharge is usually the same evening or next morning with a recovery plan."
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

        <section className="mb-12 bg-green-50 border border-green-200 rounded-2xl p-6 shadow-sm">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h2 className="text-2xl font-bold text-green-900 mb-2">Free MRI Review & Second Opinion</h2>
              <p className="text-green-800">
                Not sure if you need surgery? Send us your MRI report on WhatsApp. Dr. Sayuj will personally review it to see if you are a candidate for <strong>Keyhole Endoscopic Surgery</strong>.
              </p>
            </div>
            <a
              href="https://wa.me/919778280044?text=Hi%20Dr%20Sayuj,%20I%20would%20like%20a%20free%20MRI%20review%20for%20endoscopic%20spine%20surgery"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center whitespace-nowrap rounded-full bg-green-600 px-6 py-3 text-white font-semibold hover:bg-green-700 transition-colors shadow-md"
            >
              WhatsApp MRI Now
            </a>
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-3xl font-bold text-blue-900 mb-6">Am I a Candidate for Endoscopic Spine Surgery?</h2>
          <p className="text-gray-700 mb-8">
            Endoscopic spine surgery is a targeted "keyhole" solution. It is most effective when the main problem is <strong>nerve compression</strong> (pinched nerve) rather than generalized back ache or spinal instability. Dr. Sayuj evaluates every patient individually, but generally:
          </p>
          <div className="mb-6 bg-blue-50 p-4 rounded-lg">
             <p className="text-sm text-blue-800">
               <strong>Related Symptoms:</strong> If you are experiencing <Link href="/symptoms/back-pain" className="underline font-semibold hover:text-blue-900">severe back pain</Link> or shooting leg pain (<Link href="/conditions/sciatica-pain-treatment-hyderabad" className="underline font-semibold hover:text-blue-900">sciatica</Link>), this minimally invasive option might be right for you.
             </p>
          </div>
          <ul className="grid md:grid-cols-2 gap-4 text-sm text-gray-700">
            {conditions.map((condition) => (
              <li key={condition.text} className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
                • {condition.href ? (
                  <Link href={condition.href} className="hover:text-blue-700 hover:underline">
                    {condition.text}
                  </Link>
                ) : (
                  condition.text
                )}
              </li>
            ))}
          </ul>
        </section>

        <section className="mb-16">
          <h2 className="text-3xl font-bold text-blue-900 mb-6">Advanced Endoscopic Techniques We Use</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {ADVANCED_TECHNIQUES.map((tech) => (
              <div key={tech.title} className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                <h3 className="text-lg font-semibold text-blue-800 mb-2">
                  {tech.href ? (
                    <Link href={tech.href} className="hover:text-blue-600 hover:underline">
                      {tech.title}
                    </Link>
                  ) : (
                    tech.title
                  )}
                </h3>
                <p className="text-sm text-gray-700 leading-relaxed">
                  {tech.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-3xl font-bold text-blue-900 mb-8">Inside the Operation Theatre: Step-by-Step</h2>
          <div className="relative border-l-2 border-blue-200 ml-3 space-y-10 pb-2">
            {SURGERY_STEPS.map((item, index) => (
              <div key={index} className="relative pl-8">
                {/* Timeline Dot */}
                <span className="absolute -left-[9px] top-1 h-5 w-5 rounded-full bg-blue-600 border-4 border-white shadow-sm ring-1 ring-blue-100"></span>

                <div className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                   <div className="text-xs font-bold text-blue-600 uppercase tracking-wide mb-1">{item.step}</div>
                   <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
                   <p className="text-gray-700 leading-relaxed">{item.description}</p>
                </div>
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
          <h2 className="text-3xl font-bold text-blue-900 mb-6">Step-by-Step: Inside the Operation Theatre</h2>
          <p className="text-gray-700 mb-8">
            Many patients feel anxious about what happens during the surgery. Because this is a conscious or lightly sedated procedure for many, transparency is key. Here is the exact 45-60 minute protocol we follow:
          </p>
          <div className="relative border-l-4 border-blue-200 ml-4 space-y-10">
            <div className="relative pl-8">
              <span className="absolute -left-[21px] top-0 flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 ring-4 ring-white">
                <span className="text-blue-600 font-bold">1</span>
              </span>
              <h3 className="text-xl font-semibold text-blue-900 mb-2">Anesthesia & Positioning</h3>
              <p className="text-gray-700">You lie face down on a comfortable gel frame. Local anaesthesia is applied to the skin, or mild sedation is given so you sleep but can still wake up if needed. You are comfortable throughout.</p>
            </div>
            <div className="relative pl-8">
              <span className="absolute -left-[21px] top-0 flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 ring-4 ring-white">
                <span className="text-blue-600 font-bold">2</span>
              </span>
              <h3 className="text-xl font-semibold text-blue-900 mb-2">Targeting the "Keyhole"</h3>
              <p className="text-gray-700">Using a live X-ray (C-arm), Dr. Sayuj marks the exact spot (accurate to the millimetre) on your skin. A tiny 7mm incision is made—about the size of a fingernail.</p>
            </div>
            <div className="relative pl-8">
              <span className="absolute -left-[21px] top-0 flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 ring-4 ring-white">
                <span className="text-blue-600 font-bold">3</span>
              </span>
              <h3 className="text-xl font-semibold text-blue-900 mb-2">The Endoscopic Work</h3>
              <p className="text-gray-700">A thin tube (endoscope) with a 4K camera is inserted. The herniated disc or bone spur pressing on the nerve is magnified on a large screen and carefully removed using micro-instruments.</p>
            </div>
            <div className="relative pl-8">
              <span className="absolute -left-[21px] top-0 flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 ring-4 ring-white">
                <span className="text-blue-600 font-bold">4</span>
              </span>
              <h3 className="text-xl font-semibold text-blue-900 mb-2">The "Free Nerve" Check</h3>
              <p className="text-gray-700">Dr. Sayuj visually confirms the nerve is floating freely. If you are awake, he may ask you to move your leg to confirm the pain is gone instantly.</p>
            </div>
             <div className="relative pl-8">
              <span className="absolute -left-[21px] top-0 flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 ring-4 ring-white">
                <span className="text-blue-600 font-bold">5</span>
              </span>
              <h3 className="text-xl font-semibold text-blue-900 mb-2">Closure & Walk</h3>
              <p className="text-gray-700">The tube is removed. No stitches are usually needed—just a small waterproof band-aid. You are shifted to the recovery room and can typically walk to the washroom within 2-3 hours.</p>
            </div>
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

          <div className="mt-8 bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
             <h3 className="text-xl font-bold text-blue-800 mb-4">Cost & Recovery Comparison</h3>
             <div className="overflow-x-auto">
               <table className="w-full text-sm text-left text-gray-700">
                 <thead className="bg-blue-50 text-blue-900 font-semibold">
                   <tr>
                     <th className="px-4 py-3 rounded-tl-lg">Feature</th>
                     <th className="px-4 py-3">Endoscopic Spine Surgery</th>
                     <th className="px-4 py-3">Microdiscectomy</th>
                     <th className="px-4 py-3 rounded-tr-lg">Open Spine Surgery</th>
                   </tr>
                 </thead>
                 <tbody className="divide-y divide-gray-100">
                   <tr>
                     <td className="px-4 py-3 font-medium">Incision Size</td>
                     <td className="px-4 py-3 text-green-700 font-semibold">8mm (Keyhole)</td>
                     <td className="px-4 py-3">2-3 cm</td>
                     <td className="px-4 py-3">5-10 cm</td>
                   </tr>
                   <tr>
                     <td className="px-4 py-3 font-medium">Hospital Stay</td>
                     <td className="px-4 py-3 text-green-700 font-semibold">Day Care (6-8 hours)</td>
                     <td className="px-4 py-3">1-2 Days</td>
                     <td className="px-4 py-3">3-5 Days</td>
                   </tr>
                   <tr>
                     <td className="px-4 py-3 font-medium">Return to Desk Work</td>
                     <td className="px-4 py-3 text-green-700 font-semibold">3-5 Days</td>
                     <td className="px-4 py-3">2-3 Weeks</td>
                     <td className="px-4 py-3">4-6 Weeks</td>
                   </tr>
                   <tr>
                     <td className="px-4 py-3 font-medium">Est. Cost (Self-Pay)</td>
                     <td className="px-4 py-3">₹1.3L - ₹1.8L*</td>
                     <td className="px-4 py-3">₹1.1L - ₹1.5L</td>
                     <td className="px-4 py-3">₹80k - ₹1.2L</td>
                   </tr>
                   <tr>
                     <td className="px-4 py-3 font-medium">Infection Risk</td>
                     <td className="px-4 py-3 text-green-700 font-semibold">&lt; 0.1%</td>
                     <td className="px-4 py-3">~1-2%</td>
                     <td className="px-4 py-3">~3-5%</td>
                   </tr>
                 </tbody>
               </table>
             </div>
             <p className="text-xs text-gray-500 mt-3">*Costs are approximate and vary by room category and implant needs. Higher initial cost of endoscopy is often offset by shorter hospital stay and faster return to work.</p>
          </div>
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

        {/* Red Flags Section */}
        <section className="mb-16 bg-red-50 border border-red-100 rounded-2xl p-8">
          <h2 className="text-2xl font-bold text-red-900 mb-4 flex items-center gap-2">
            <svg className="w-8 h-8 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            Red Flags: When is Surgery Urgent?
          </h2>
          <p className="text-gray-700 mb-6">
            Most spine conditions can wait for medication or therapy. However, immediate medical attention is required if you experience:
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white p-5 rounded-lg border-l-4 border-red-500 shadow-sm">
              <h3 className="font-bold text-red-800 mb-2">Cauda Equina Syndrome</h3>
              <p className="text-sm text-gray-700">Sudden loss of bowel or bladder control, or numbness in the groin/saddle area.</p>
            </div>
            <div className="bg-white p-5 rounded-lg border-l-4 border-red-500 shadow-sm">
              <h3 className="font-bold text-red-800 mb-2">Progressive Weakness</h3>
              <p className="text-sm text-gray-700">Rapidly worsening weakness in the foot (foot drop) or leg that affects walking.</p>
            </div>
            <div className="bg-white p-5 rounded-lg border-l-4 border-red-500 shadow-sm">
              <h3 className="font-bold text-red-800 mb-2">Intractable Pain</h3>
              <p className="text-sm text-gray-700">Severe pain that does not improve with rest or maximum medical management.</p>
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
            <LocationNAPCard locationId="hyderabad" className="bg-gray-50 border border-gray-200 rounded-xl p-6" />
            <div>
              <h3 className="text-xl font-semibold text-blue-800 mb-3">Map & Directions</h3>
              <LocationMapEmbed locationId="hyderabad" />
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
        <ReviewedBy lastReviewed="2025-02-20" />
      </main>
    </>
  );
}
