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

const SERVICE_SLUG = 'microdiscectomy-surgery-hyderabad';

// Ensure page is statically generated
export const revalidate = 3600; // Revalidate every hour

const baseMetadata = makeMetadata({
  title: 'Microdiscectomy Surgery Hyderabad | Microscopic Spine Surgery',
  description:
    'Gold standard microscopic spine surgery (Microdiscectomy) in Hyderabad by Dr. Sayuj Krishnan. High precision removal of slip disc using Zeiss operating microscope.',
  canonicalPath: `/services/${SERVICE_SLUG}`,
});

export const metadata: Metadata = {
  ...baseMetadata,
  title: 'Microdiscectomy Surgery Hyderabad | Microscopic Spine Surgery',
  description:
    'Expert Microdiscectomy Surgery in Hyderabad. Gold standard treatment for Slip Disc & Sciatica using high-magnification microscope. Proven results.',
  keywords: [
    'microdiscectomy surgery hyderabad',
    'microscopic spine surgery hyderabad',
    'microscopic lumbar discectomy',
    'best surgeon for microdiscectomy in hyderabad',
    'lumbar microdiscectomy recovery',
    'spine surgery microscope hyderabad',
  ],
  openGraph: {
    title: 'Microdiscectomy Surgery in Hyderabad | Microscopic Discectomy',
    description:
      'Microscopic spine surgery in Hyderabad at Yashoda Hospital Malakpet. Gold standard treatment for slip disc and sciatica with high precision.',
    url: `${SITE_URL}/services/${SERVICE_SLUG}`,
    siteName: 'Dr. Sayuj Krishnan - Neurosurgeon Hyderabad',
    locale: 'en_IN',
    type: 'website',
    images: [
      {
        url: `${SITE_URL}/api/og?title=${encodeURIComponent(
          'Microdiscectomy Surgery Hyderabad'
        )}&subtitle=${encodeURIComponent('Gold Standard Microscopic Care')}`,
        width: 1200,
        height: 630,
        alt: 'Microdiscectomy Surgery in Hyderabad – Dr. Sayuj Krishnan',
      },
    ],
  },
};

const schema = buildLocalServiceSchema({
  slug: SERVICE_SLUG,
  name: 'Microdiscectomy Surgery in Hyderabad',
  description:
    'Microscopic spine surgery program at Yashoda Hospital Malakpet delivering high-precision decompression using operating microscope.',
});

// Fallback to generic sources if specific ones don't exist
const ARTICLE_SOURCES = getServiceSources(SERVICE_SLUG) || getServiceSources('endoscopic-spine-surgery-hyderabad');

const faqs = [
  {
    question: 'What is Microdiscectomy?',
    answer:
      'Microdiscectomy is a minimally invasive spine surgery performed using a high-powered operating microscope. This allows the surgeon to see the nerves and disc in extreme detail through a small incision (2-3 cm), ensuring precise removal of the herniated disc material.',
  },
  {
    question: 'How is it different from open surgery?',
    answer:
      'Unlike traditional open surgery which requires large incisions and muscle cutting, microdiscectomy uses a small incision and special retractors. The microscope provides illumination and magnification, allowing the surgeon to work around muscles rather than cutting through them.',
  },
  {
    question: 'What is the recovery time for microdiscectomy?',
    answer:
      'Patients typically walk the same day or the next morning. Discharge is usually after 24 hours. Most patients return to desk work in 2-3 weeks and driving in 3 weeks, which is slightly longer than endoscopic surgery but still very quick.',
  },
  {
    question: 'Why choose Microdiscectomy over Endoscopic Surgery?',
    answer:
      'Microdiscectomy is the "Gold Standard" and has been used successfully for decades. It is sometimes preferred for complex herniations, recurrent discs, or when bony anatomy makes endoscopic access difficult. It offers excellent long-term results.',
  },
  {
    question: 'Is general anesthesia required?',
    answer: 'Yes, microdiscectomy is typically performed under general anesthesia to ensure you are completely still while the surgeon works with high magnification near delicate nerves.'
  },
  {
    question: 'How successful is this procedure?',
    answer: 'Microdiscectomy has a success rate of over 90-95% for relieving leg pain (sciatica) caused by disc herniation. It is one of the most successful procedures in spine surgery.'
  },
];

const COSTS = [
  {
    procedure: 'Microdiscectomy (Lumbar)',
    range: '₹1,10,000 - ₹1,50,000',
    recovery: '2 Days',
    includes: ['Surgeon Fees', 'OT & Microscope Charges', 'Standard Room (2 Days)', 'Medications']
  },
  {
    procedure: 'Microscopic Decompression',
    range: '₹1,25,000 - ₹1,65,000',
    recovery: '2-3 Days',
    includes: ['Stenosis Decompression', 'High-End Microscope', 'Neuromonitoring']
  },
  {
    procedure: 'Cervical Microdiscectomy',
    range: '₹1,30,000 - ₹1,80,000',
    recovery: '2-3 Days',
    includes: ['Neck Surgery', 'Microscope Usage', 'Specialised Instrumentation']
  }
];

const RECOVERY_STEPS = [
  { time: 'Day 1 (Surgery)', milestone: 'Walk to washroom with assistance 6 hours after surgery.' },
  { time: 'Day 2 (Discharge)', milestone: 'Discharge from hospital. Walk independently.' },
  { time: 'Week 2', milestone: 'Short walks outside. Sutures removal (if any).' },
  { time: 'Week 3-4', milestone: 'Resume driving and desk work.' },
];

const SUCCESS_RATES = [
  {
    condition: "Lumbar Disc Herniation",
    rate: "95%",
    description: "The gold standard procedure for sciatica relief with decades of proven data."
  },
  {
    condition: "Recurrent Disc Herniation",
    rate: "90%",
    description: "Excellent visualisation makes it safe for re-do surgeries where scar tissue is present."
  },
  {
    condition: "Spinal Stenosis",
    rate: "90%",
    description: "Effective decompression of the spinal canal (Micro-laminectomy) for walking difficulty."
  }
];

const conditions = [
  'Lumbar disc herniation (slip disc)',
  'Severe Sciatica',
  'Cauda Equina Syndrome',
  'Spinal stenosis (narrowing)',
  'Recurrent disc herniation',
  'Calcified disc fragments',
];

const ADVANCED_TECHNIQUES = [
  {
    title: "High-Magnification Zeiss Optics",
    description: "We use advanced Zeiss operating microscopes that provide 3D visualization and deep illumination, ensuring nerves are protected at all times."
  },
  {
    title: "Tubular Microdiscectomy",
    description: "A variation where a tube is used to split muscles, combining the benefits of microscopy with minimal muscle trauma."
  },
  {
    title: "Micro-Laminectomy",
    description: "For spinal stenosis, we remove bone spurs compressing the nerves while preserving the stability of the spine (unlike open laminectomy)."
  },
  {
    title: "Ligament Preservation",
    description: "Microscopic techniques allow us to preserve the supraspinous and interspinous ligaments, maintaining the spine's natural tension band."
  }
];

const SURGERY_STEPS = [
  {
    step: "Step 1: Anesthesia",
    title: "General Anesthesia",
    description: "You will be asleep under general anesthesia. This ensures safety and immobility while we work with high-power magnification."
  },
  {
    step: "Step 2: Incision",
    title: "Small Incision",
    description: "A 2-3 cm incision is made in the midline of the back. This is significantly smaller than open surgery (5-10 cm)."
  },
  {
    step: "Step 3: Microscope Setup",
    title: "High-Definition View",
    description: "The operating microscope is brought in. It magnifies the nerve roots and disc material 10-20 times, making them clearly visible."
  },
  {
    step: "Step 4: Decompression",
    title: "Precise Removal",
    description: "Using micro-instruments, a small window is made in the bone (laminotomy) and the herniated disc fragment pressing the nerve is removed."
  },
  {
    step: "Step 5: Closure",
    title: "Hidden Sutures",
    description: "The muscles are allowed to fall back into place. The skin is closed with absorbable sutures that do not need removal."
  }
];

export default function MicrodiscectomySurgeryPage() {
  const relevantStories = patientStories.filter(story => {
    const tags = story.tags.join(' ').toLowerCase();
    return tags.includes('spine') || tags.includes('micro') || tags.includes('sciatica');
  }).slice(0, 2);

  return (
    <>
      <JsonLd data={schema} />
      <main className="container mx-auto px-4 py-16">
        <Breadcrumbs
          items={[
            { name: 'Home', href: '/' },
            { name: 'Services', href: '/services/' },
            { name: 'Microdiscectomy Surgery Hyderabad', href: `/services/${SERVICE_SLUG}` },
          ]}
        />

        <header className="grid md:grid-cols-2 gap-10 items-start mb-16">
          <div>
            <p className="text-sm font-medium uppercase tracking-wide text-blue-600 mb-3">GOLD STANDARD SPINE CARE</p>
            <h1 className="text-4xl md:text-5xl font-bold text-blue-900 leading-tight mb-6">
              Microdiscectomy Surgery in Hyderabad | Microscopic Precision
            </h1>
            <AuthorByline
              publishedOn="2026-01-27"
              updatedOn="2026-01-27"
              className="mb-6"
            />
            <p className="text-lg text-gray-700 mb-6">
              Microdiscectomy is the globally accepted "Gold Standard" for treating slip disc and{" "}
              <Link href="/conditions/sciatica-pain-treatment-hyderabad" className="text-blue-700 underline">
                sciatica
              </Link>.
              Performed by Dr. Sayuj using high-end Zeiss microscopes at Yashoda Hospital, Malakpet, this procedure ensures maximum safety and high success rates.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/appointments/"
                className="inline-flex items-center justify-center rounded-full bg-blue-600 px-6 py-3 text-white font-semibold hover:bg-blue-700 transition-colors"
              >
                Book Consultation
              </Link>
              <Link
                href="/services/endoscopic-spine-surgery-hyderabad"
                className="inline-flex items-center justify-center rounded-full border border-blue-200 px-6 py-3 text-blue-700 font-semibold hover:border-blue-400 hover:text-blue-900 transition-colors"
              >
                Compare with Endoscopic
              </Link>
            </div>
          </div>
          <TrustProof serviceType="spine" className="mb-6" stories={relevantStories} />
          <div className="bg-blue-50 border border-blue-100 rounded-2xl p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-blue-800 mb-4">Why Microscopic Surgery?</h2>
            <ul className="space-y-3 text-gray-700">
              <li>• <strong>Proven Track Record:</strong> The most widely performed and studied spine surgery.</li>
              <li>• <strong>Safety:</strong> 3D visualization helps avoid nerve injury.</li>
              <li>• <strong>Versatility:</strong> Suitable for complex, calcified, or migrated discs.</li>
              <li>• <strong>Cost-Effective:</strong> Slightly more affordable than endoscopic kits in some cases.</li>
            </ul>
          </div>
        </header>

      {/* FAQPage JSON-LD for this page */}
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": faqs.map(faq => ({
            "@type": "Question",
            "name": faq.question,
            "acceptedAnswer": {
              "@type": "Answer",
              "text": faq.answer
            }
          }))
        }}
      />

        <section className="mb-12 bg-green-50 border border-green-200 rounded-2xl p-6 shadow-sm">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h2 className="text-2xl font-bold text-green-900 mb-2">Free MRI Review</h2>
              <p className="text-green-800">
                Dr. Sayuj will review your MRI to determine if <strong>Microdiscectomy</strong> or Endoscopic Surgery is better for you.
              </p>
            </div>
            <a
              href="https://wa.me/919778280044?text=Hi%20Dr%20Sayuj,%20I%20would%20like%20a%20free%20MRI%20review%20for%20spine%20surgery"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center whitespace-nowrap rounded-full bg-green-600 px-6 py-3 text-white font-semibold hover:bg-green-700 transition-colors shadow-md"
            >
              WhatsApp MRI Now
            </a>
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-3xl font-bold text-blue-900 mb-6">Conditions Treated with Microdiscectomy</h2>
          <p className="text-gray-700 mb-8">
            Microdiscectomy is ideal for patients with significant leg pain (sciatica) who have not improved with 6 weeks of conservative therapy (medicines/physio).
          </p>
          <ul className="grid md:grid-cols-2 gap-4 text-sm text-gray-700">
            {conditions.map((condition) => (
              <li key={condition} className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">• {condition}</li>
            ))}
          </ul>
        </section>

        <section className="mb-16">
          <h2 className="text-3xl font-bold text-blue-900 mb-6">Advanced Microscopic Techniques</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-6">
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
          <h2 className="text-3xl font-bold text-blue-900 mb-8">How is Microdiscectomy Performed?</h2>
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
          <h2 className="text-3xl font-bold text-blue-900 mb-6">Success Rates</h2>
          <div className="bg-blue-900 rounded-2xl p-8 text-white shadow-xl">
            <p className="mb-8 text-blue-100 max-w-3xl">
              With thousands of procedures performed worldwide annually, Microdiscectomy sets the benchmark for success in spine surgery.
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
           <h2 className="text-3xl font-bold text-blue-900 mb-6">Microdiscectomy vs. Endoscopic Surgery</h2>
           <p className="text-gray-700 mb-6">
             Both are minimally invasive options. Endoscopic uses a camera; Microdiscectomy uses a microscope. Here is a comparison:
           </p>
           {/* Reusing the table component - it might need context adjustment but usually works for general comparisons */}
           <SurgeryComparisonTable />
           <p className="mt-4 text-sm text-gray-600">
             *Dr. Sayuj performs both procedures and will recommend the best one based on your specific MRI findings.
           </p>
        </section>

        <CostTransparencySection
          costs={COSTS}
          disclaimer="Estimates for self-pay patients at Yashoda Hospital Malakpet. Includes surgeon fees, hospital charges, and standard room. Implants (if needed) are extra."
        />

        <section className="mb-16 bg-white border border-blue-100 rounded-2xl p-8 shadow-sm">
          <div className="grid md:grid-cols-[2fr_1fr] gap-8 items-center">
            <div>
              <h2 className="text-3xl font-bold text-blue-900 mb-4">Insurance & Cashless Facility</h2>
              <p className="text-gray-700 mb-4">
                We understand that spine surgery is a significant financial decision. At Yashoda Hospital Malakpet, we accept <strong>all major health insurance providers and TPAs</strong>.
              </p>
              <ul className="space-y-2 mb-6 text-gray-700">
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  <span><strong>Cashless Treatment:</strong> Available for eligible policies (Star, HDFC Ergo, Bajaj Allianz, etc.)</span>
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  <span><strong>Government Schemes:</strong> We accept EHS (State Govt) and other notified schemes.</span>
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  <span><strong>Hassle-Free Process:</strong> Our dedicated Insurance Desk handles pre-authorization paperwork for you.</span>
                </li>
              </ul>
              <p className="text-sm text-gray-500 italic">
                *Please bring your Insurance Card and ID proof during consultation for eligibility check.
              </p>
            </div>
            <div className="bg-blue-50 p-6 rounded-xl text-center border border-blue-100">
              <h3 className="font-semibold text-blue-800 mb-2">Need Insurance Guidance?</h3>
              <p className="text-sm text-gray-600 mb-4">Our coordinators can help check your policy coverage.</p>
              <a
                href="tel:+919778280044"
                className="inline-block w-full bg-blue-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                Call Insurance Desk
              </a>
            </div>
          </div>
        </section>

        <section className="mb-16 grid lg:grid-cols-[1.2fr_1fr] gap-10 items-start">
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-blue-900">Expert Care at Yashoda Malakpet</h2>
            <p className="text-gray-700">
              Dr. Sayuj Krishnan is a highly experienced neurosurgeon specializing in microscopic and endoscopic spine surgeries.
              Surgery is performed in state-of-the-art operation theatres equipped with the latest Zeiss microscopes.
            </p>
            <NAP className="bg-gray-50 border border-gray-200 rounded-xl p-6" />
            <div>
              <h3 className="text-xl font-semibold text-blue-800 mb-3">Location</h3>
              <MapEmbed />
            </div>
          </div>
          <div className="bg-blue-50 border border-blue-100 rounded-2xl p-6 shadow-sm space-y-5">
            <h3 className="text-xl font-semibold text-blue-800">FAQs</h3>
            {faqs.map((faq) => (
              <div key={faq.question}>
                <p className="font-semibold text-blue-900">{faq.question}</p>
                <p className="text-sm text-blue-900/80 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Added bottom Pathways */}
        <LocalPathways mode="service" />

        <SourceList sources={ARTICLE_SOURCES} heading="Medical References" />
        <ReviewedBy lastReviewed="2026-01-27" />
      </main>
    </>
  );
}
