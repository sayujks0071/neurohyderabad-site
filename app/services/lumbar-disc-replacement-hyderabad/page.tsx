import { Metadata } from 'next';
import Link from 'next/link';
import { ShieldCheck, Microscope, HeartHandshake, Clock } from 'lucide-react';
import { SITE_URL } from '../../../src/lib/seo';
import OutcomeMetricsSection from '@/components/OutcomeMetricsSection';
import TeleconsultationForm from '@/components/TeleconsultationForm';
import { patientStories } from '../../../src/content/stories';
import ReviewedBy from '@/app/_components/ReviewedBy';
import NAP from '@/app/_components/NAP';
import { makeMetadata } from '@/app/_lib/meta';
import AuthorByline from '@/app/_components/AuthorByline';
import SourceList from '@/app/_components/SourceList';
import JsonLd from '@/components/JsonLd';
import BreadcrumbSchema from '@/app/components/schemas/BreadcrumbSchema';
import MedicalWebPageSchema from '@/app/components/schemas/MedicalWebPageSchema';
import FAQPageSchema from '@/app/_components/FAQPageSchema';
import { LocalPathways } from '@/src/components/locations/LocalPathways';
import CostTransparencySection from '@/src/components/CostTransparencySection';
import PatientJourneySection from '@/src/components/PatientJourneySection';

const baseMetadata = makeMetadata({
  title: 'Lumbar Disc Replacement Hyderabad | Artificial Disc Surgery',
  description: 'Motion preserving lumbar disc replacement in Hyderabad by Dr. Sayuj Krishnan. Best alternative to spinal fusion for young patients. Get Cost Estimate.',
  canonicalPath: '/services/lumbar-disc-replacement-hyderabad',
});

export const metadata: Metadata = {
  ...baseMetadata,
  openGraph: {
    title: baseMetadata.title,
    description: baseMetadata.description,
    url: `${SITE_URL}/services/lumbar-disc-replacement-hyderabad`,
    siteName: 'Dr. Sayuj Krishnan - Neurosurgeon in Hyderabad',
    images: [
      {
        url: `${SITE_URL}/api/og?title=Lumbar%20Disc%20Replacement&subtitle=Motion%20Preservation%20Surgery`,
        width: 1200,
        height: 630,
        alt: 'Lumbar Disc Replacement - Dr. Sayuj Krishnan',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: baseMetadata.title,
    description: baseMetadata.description,
    images: [`${SITE_URL}/api/og?title=Lumbar%20Disc%20Replacement&subtitle=Motion%20Preservation%20Surgery`],
  },
};

const spineStoryHighlights = patientStories
  .filter((story) => story.tags.includes('spine') || story.tags.includes('replacement'))
  .slice(0, 2);

const ARTICLE_SOURCES = [
  {
    label: "Lumbar Total Disc Replacement",
    href: "https://www.spine-health.com/treatment/back-surgery/lumbar-total-disc-replacement",
  },
  {
    label: "Artificial Disc Replacement: MedlinePlus",
    href: "https://medlineplus.gov/ency/article/007259.htm",
  }
];

const COSTS = [
  {
    procedure: 'Lumbar Disc Replacement (Single Level)',
    range: '₹3,50,000 - ₹4,50,000',
    recovery: '3-4 weeks',
    includes: ['Imported Artificial Disc', 'Surgeon fees', 'Hospital stay (3-4 days)', 'Physiotherapy']
  },
  {
    procedure: 'Hybrid Surgery (Fusion + Replacement)',
    range: '₹4,00,000 - ₹5,00,000',
    recovery: '4-6 weeks',
    includes: ['Implants', 'Complex reconstruction', 'Hospital stay (5 days)']
  }
];

const JOURNEY_STEPS = [
  {
    title: 'Candidate Evaluation',
    description: 'Detailed MRI and X-ray analysis to ensure your facet joints are healthy enough for replacement.'
  },
  {
    title: 'Implant Selection',
    description: 'Selection of the best FDA-approved artificial disc (M6-L, ProDisc-L) matched to your anatomy.'
  },
  {
    title: 'The Procedure',
    description: 'Anterior approach surgery (from the front) to access the disc space without cutting back muscles.'
  },
  {
    title: 'Mobilization',
    description: 'Walking the next day. No rigid fixation means natural movement is preserved.'
  },
  {
    title: 'Discharge',
    description: 'Home in 3-4 days. Resume light activities immediately.'
  },
  {
    title: 'Rehabilitation',
    description: 'Specific core strengthening program to support your new mobile spine.'
  }
];

export default function LumbarDiscReplacementPage() {
  const procedures = [
    {
      title: 'Total Disc Replacement (TDR)',
      description: 'Complete replacement of the damaged disc with a mobile artificial implant that mimics natural movement.',
      benefits: ['Preserves motion', 'Prevents adjacent segment disease', 'No bone grafting needed', 'Quick recovery'],
      recovery: '3-4 weeks'
    },
    {
      title: 'Hybrid Surgery',
      description: 'Combining fusion at one level with replacement at another to treat multi-level disease optimally.',
      benefits: ['Customized solution', 'Balances stability & motion', 'Treats complex degeneration'],
      recovery: '4-6 weeks'
    }
  ];

  const faqs = [
    {
      question: 'What is Lumbar Disc Replacement?',
      answer:
        'Lumbar Disc Replacement (LDR) or Artificial Disc Replacement (ADR) involves removing a damaged spinal disc and replacing it with an artificial device that allows motion. Unlike fusion, which locks bones together, LDR preserves natural spinal flexibility.'
    },
    {
      question: 'Am I a candidate for Lumbar Disc Replacement?',
      answer:
        'Ideal candidates are typically younger (under 60), have single-level disc degeneration, and healthy facet joints. It is an excellent option for those wanting to maintain an active lifestyle and avoid spinal fusion limitations.'
    },
    {
      question: 'Is Disc Replacement better than Spinal Fusion?',
      answer:
        'For the right patient, yes. Disc replacement maintains motion and reduces stress on adjacent discs (preventing "adjacent segment disease"), which is a common long-term issue with spinal fusion. However, fusion is still better for patients with instability or severe arthritis.'
    },
    {
      question: 'How long does the artificial disc last?',
      answer:
        'Modern artificial discs are designed to last 40-50 years. They are made of durable medical-grade titanium and polyethylene or viscoelastic polymers that mimic the natural disc\'s cushioning.'
    },
    {
      question: 'What is the recovery time?',
      answer:
        'Most patients stand and walk within 24 hours. Hospital stay is 3-4 days. Desk work can resume in 2-3 weeks, and full sports activities in 3 months. Recovery is generally faster than fusion surgery.'
    }
  ];

  return (
    <>
      <MedicalWebPageSchema
        pageType="service"
        pageSlug="/services/lumbar-disc-replacement-hyderabad"
        title="Lumbar Disc Replacement Hyderabad | Dr. Sayuj Krishnan"
        description="Expert lumbar artificial disc replacement surgery in Hyderabad. Motion preservation technique by Dr. Sayuj Krishnan."
        serviceOrCondition="Lumbar Disc Replacement"
        lastReviewed="2026-02-03"
      />
      <BreadcrumbSchema
        items={[
          { name: 'Home', path: '/' },
          { name: 'Services', path: '/services' },
          { name: 'Lumbar Disc Replacement', path: '/services/lumbar-disc-replacement-hyderabad' },
        ]}
      />
      <FAQPageSchema faqs={faqs} pageUrl={`${SITE_URL}/services/lumbar-disc-replacement-hyderabad`} />
      <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-16">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">Lumbar Artificial Disc Replacement in Hyderabad</h1>
          <AuthorByline
            publishedOn="2026-02-03"
            updatedOn="2026-02-03"
            className="justify-center mb-4"
          />
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            Preserve your spine's natural motion with <strong>Artificial Disc Replacement (ADR)</strong>.
            The advanced alternative to spinal fusion for <span className="text-blue-700 font-semibold">active lives</span>.
          </p>
        </header>

        <section className="bg-blue-50 p-6 rounded-lg mb-8 border border-blue-100 shadow-sm text-center">
          <p className="text-gray-800 text-lg mb-4">
            <strong>Yashoda Hospital, Malakpet</strong> • Room No. 317, OPD Block
          </p>
          <div className="flex flex-wrap justify-center gap-6 text-sm font-medium">
             <a href="tel:+919778280044" className="flex items-center text-blue-700 hover:text-blue-900 bg-white px-4 py-2 rounded-full shadow-sm hover:shadow-md transition-all">
               📞 +91-9778280044
             </a>
             <Link href="/appointments" className="flex items-center text-white bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-full shadow-sm hover:shadow-md transition-all">
               Check Suitability
             </Link>
          </div>
        </section>

        <section className="mb-12">
            <LocalPathways mode="service" />
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-blue-800 mb-6">Why Choose Disc Replacement Over Fusion?</h2>
          <div className="prose max-w-none">
            <p className="text-lg text-gray-700 mb-6">
              Traditionally, severe disc damage was treated with spinal fusion, which locks two vertebrae together and stops motion. While effective for pain, it can put extra stress on the discs above and below.
            </p>
            <p className="text-gray-700 mb-6">
              <strong>Lumbar Disc Replacement</strong> is a modern motion-preserving surgery. We replace the worn-out disc with a high-tech artificial implant that mimics the natural movement of a healthy spine. This allows you to bend, twist, and maintain a normal range of motion.
            </p>
          </div>
        </section>

        <PatientJourneySection title="Your Journey to Motion Preservation" steps={JOURNEY_STEPS} />

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-blue-800 mb-6">Who is a Candidate?</h2>
          <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-green-700 mb-3">Ideal Candidates</h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start"><span className="text-green-600 mr-2">✓</span> Chronic back pain from 1 or 2 discs.</li>
                  <li className="flex items-start"><span className="text-green-600 mr-2">✓</span> No significant facet joint arthritis.</li>
                  <li className="flex items-start"><span className="text-green-600 mr-2">✓</span> Failed conservative treatment (physio/meds).</li>
                  <li className="flex items-start"><span className="text-green-600 mr-2">✓</span> Younger, active patients (typically &lt; 60).</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-red-700 mb-3">Not Suitable For</h3>
                 <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start"><span className="text-red-600 mr-2">✗</span> Severe osteoporosis (weak bones).</li>
                  <li className="flex items-start"><span className="text-red-600 mr-2">✗</span> Significant spinal instability (spondylolisthesis).</li>
                  <li className="flex items-start"><span className="text-red-600 mr-2">✗</span> Severe facet joint disease.</li>
                  <li className="flex items-start"><span className="text-red-600 mr-2">✗</span> Spinal deformity (scoliosis).</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-blue-800 mb-6">Types of Procedures</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {procedures.map((procedure, index) => (
              <div key={index} className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                <h3 className="text-xl font-semibold text-blue-700 mb-3">{procedure.title}</h3>
                <p className="text-gray-600 mb-4">{procedure.description}</p>
                <div className="mb-4">
                  <h4 className="font-semibold text-gray-700 mb-2">Benefits:</h4>
                  <ul className="space-y-1">
                    {procedure.benefits.map((benefit, idx) => (
                      <li key={idx} className="text-sm text-gray-600">• {benefit}</li>
                    ))}
                  </ul>
                </div>
                <div className="text-sm text-blue-600 font-medium">
                  Typical Recovery: {procedure.recovery}
                </div>
              </div>
            ))}
          </div>
        </section>

        <CostTransparencySection costs={COSTS} />

        <OutcomeMetricsSection procedure="Lumbar Disc Replacement" />

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-blue-800 mb-6 text-center">Patient Success Stories</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {spineStoryHighlights.map((story) => (
              <article key={story.id} className="bg-white rounded-lg p-6 shadow-sm border-l-4 border-blue-500">
                <div className="flex items-center mb-4">
                   <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-blue-600 font-bold text-lg">{story.patientInitials.charAt(0)}</span>
                  </div>
                  <div className="ml-4">
                    <div className="font-semibold text-gray-800">{story.patientInitials}</div>
                    <div className="text-sm text-gray-600">{story.procedure}</div>
                  </div>
                </div>
                <p className="text-gray-700 italic">“{story.quote}”</p>
                 <Link href={`/patient-stories/${story.slug}`} className="mt-4 inline-flex items-center text-blue-600 font-semibold hover:text-blue-700">
                  Read full story <span aria-hidden className="ml-2">→</span>
                </Link>
              </article>
            ))}
          </div>
        </section>

        <section className="mb-12">
          <TeleconsultationForm pageSlug="/services/lumbar-disc-replacement-hyderabad" service="Lumbar Disc Replacement" />
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-blue-800 mb-6">Frequently Asked Questions</h2>
          <div className="space-y-6">
            {faqs.map((faq) => (
              <article key={faq.question} className="bg-white border border-blue-100 rounded-lg p-6 shadow-sm">
                <h3 className="text-xl font-semibold text-blue-700 mb-3">{faq.question}</h3>
                <p className="text-gray-700">{faq.answer}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="bg-blue-50 p-8 rounded-lg text-center">
          <h2 className="text-2xl font-bold text-blue-800 mb-4">Are You a Candidate for Motion Preservation?</h2>
          <p className="text-gray-600 mb-6">
            Find out if you can avoid spinal fusion. Dr. Sayuj Krishnan specializes in identifying the right patients for artificial disc replacement.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/appointments/" className="bg-blue-600 text-white px-8 py-3 rounded-full hover:bg-blue-700 transition-colors">
              Book Evaluation
            </Link>
          </div>
        </section>

        <SourceList sources={ARTICLE_SOURCES} heading="Medical References" />

        <section className="mt-12 space-y-6">
          <ReviewedBy lastReviewed="2026-02-03" />
          <NAP />
        </section>
      </div>
    </div>
    </>
  );
}
