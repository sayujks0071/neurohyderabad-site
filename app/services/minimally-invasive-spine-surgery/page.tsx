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
import { getServiceSources } from '../sources';
import JsonLd from '@/components/JsonLd';
import BreadcrumbSchema from '@/app/components/schemas/BreadcrumbSchema';
import MedicalWebPageSchema from '@/app/components/schemas/MedicalWebPageSchema';
import FAQPageSchema from '@/app/_components/FAQPageSchema';
import { LocalPathways } from '@/src/components/locations/LocalPathways';
import CostTransparencySection from '@/src/components/CostTransparencySection';
import PatientJourneySection from '@/src/components/PatientJourneySection';
import SurgeryComparisonTable from '@/src/components/SurgeryComparisonTable';
import EndoscopicProcedureSteps from '@/src/components/EndoscopicProcedureSteps';

const baseMetadata = makeMetadata({
  title: 'Minimally Invasive Spine Surgery Hyderabad | Day Care | Dr Sayuj',
  description: 'Minimally Invasive Spine Surgery Hyderabad: Day Care procedure with same-day discharge. 1000+ successful endoscopic surgeries by Dr Sayuj. Book Consult.',
  canonicalPath: '/services/minimally-invasive-spine-surgery',
});

export const metadata: Metadata = {
  ...baseMetadata,
  openGraph: {
    title: baseMetadata.title,
    description: baseMetadata.description,
    url: `${SITE_URL}/services/minimally-invasive-spine-surgery`,
    siteName: 'Dr. Sayuj Krishnan - Neurosurgeon in Hyderabad',
    images: [
      {
        url: `${SITE_URL}/api/og?title=Minimally%20Invasive%20Spine%20Surgery&subtitle=Endoscopic%20Procedures%20in%20Hyderabad`,
        width: 1200,
        height: 630,
        alt: 'Minimally Invasive Spine Surgery - Dr. Sayuj Krishnan',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: baseMetadata.title,
    description: baseMetadata.description,
    images: [`${SITE_URL}/api/og?title=Minimally%20Invasive%20Spine%20Surgery&subtitle=Endoscopic%20Procedures%20in%20Hyderabad`],
  },
};

const spineStoryHighlights = patientStories
  .filter((story) => story.tags.includes('spine') || story.tags.includes('endoscopic'))
  .slice(0, 2);

const ARTICLE_SOURCES = getServiceSources('minimally-invasive-spine-surgery');

// Google Business Profile JSON-LD for Minimally Invasive Spine Surgery

const COSTS = [
  {
    procedure: 'Endoscopic Discectomy (Lumbar)',
    range: '₹95,000 - ₹1,35,000',
    recovery: '1-2 weeks',
    includes: ['Surgeon fees', 'OT charges', 'Implants', 'Follow-up visits']
  },
  {
    procedure: 'Endoscopic ULBD (Stenosis)',
    range: '₹1,20,000 - ₹1,60,000',
    recovery: '2-3 weeks',
    includes: ['Bilateral decompression', 'Hospital stay (1-2 days)', 'Medications']
  },
  {
    procedure: 'Cervical Endoscopic Discectomy',
    range: '₹1,20,000 - ₹1,70,000',
    recovery: '2-3 weeks',
    includes: ['Anterior/Posterior approach', 'Neck brace', 'Physiotherapy guidance']
  },
  {
    procedure: 'MIS TLIF (Spinal Fusion)',
    range: '₹2,50,000 - ₹3,50,000',
    recovery: '4-6 weeks',
    includes: ['Implants (Screws/Cage)', 'Minimally Invasive access', 'Hospital stay (3-4 days)']
  },
  {
    procedure: 'Vertebroplasty (Cement)',
    range: '₹1,10,000 - ₹1,50,000',
    recovery: '1 week',
    includes: ['Bone cement', 'Fluoroscopy charges', 'Day care stay']
  }
];

const JOURNEY_STEPS = [
  {
    title: 'Initial Assessment',
    description: 'MRI review and clinical exam. Secure tele-consult available for outstation patients.'
  },
  {
    title: 'Pre-Op Planning',
    description: 'Fitness check and anaesthesia clearance. Option for Awake Spine Surgery protocol.'
  },
  {
    title: 'The Procedure',
    description: '45-90 mins endoscopic surgery through a keyhole (8mm) incision.'
  },
  {
    title: 'Immediate Recovery',
    description: 'Walk within 2 hours. Liquid diet within 1 hour. Minimal pain.'
  },
  {
    title: 'Discharge',
    description: 'Go home the same day or next morning. No bed rest required.'
  },
  {
    title: 'Rehabilitation',
    description: 'Week 1: Rest & Walk. Week 2: Desk work. Week 6: Gym & exercises.'
  }
];

export default function MinimallyInvasiveSpineSurgeryPage() {
  const procedures = [
    {
      title: 'Transforaminal Endoscopic Spine Surgery (TESS)',
      description: 'Ideally suited for paracentral and foraminal disc herniations. Accessed from the side (flank) under local anaesthesia, avoiding the spinal canal entirely.',
      benefits: ['Local anaesthesia', 'No bone removal', 'Walk immediately', 'Suture-less (Stitch-less)'],
      recovery: '3-5 days'
    },
    {
      title: 'Interlaminar Endoscopic Spine Surgery (IESS)',
      description: 'Best for L5-S1 disc herniations and spinal stenosis. Accessed from the back through the natural interlaminar window.',
      benefits: ['Familiar posterior approach', 'Treats stenosis & disc', 'Minimal muscle dilation', 'High success rate'],
      recovery: '1-2 weeks'
    },
    {
      title: 'Endoscopic Foraminotomy',
      description: 'Decompression of nerve roots through enlarged foraminal openings using endoscopic techniques.',
      benefits: ['Nerve decompression', 'Minimal tissue disruption', 'Quick return to activity', 'Lower infection risk'],
      recovery: '2-3 weeks'
    },
    {
      title: 'Endoscopic ULBD',
      description: 'Unilateral laminotomy bilateral decompression for spinal stenosis using endoscopic approach.',
      benefits: ['Bilateral decompression', 'Preserved stability', 'Reduced blood loss', 'Shorter hospital stay'],
      recovery: '2-4 weeks'
    },
    {
      title: 'Cervical Procedures',
      description: 'Endoscopic cervical discectomy and foraminotomy for neck and arm pain relief.',
      benefits: ['Anterior approach', 'Preserved motion', 'Minimal scarring', 'Quick mobilization'],
      recovery: '1-2 weeks'
    },
    {
      title: 'MIS TLIF (Fusion)',
      description: 'Minimally Invasive Transforaminal Lumbar Interbody Fusion for instability or spondylolisthesis.',
      benefits: ['Small incisions', 'Less blood loss', 'Faster fusion', 'Reduced hospital stay'],
      recovery: '4-6 weeks',
      url: '/services/spinal-fusion-surgery-hyderabad'
    }
  ];

  const faqs = [
    {
      question: 'What is Minimally Invasive Spine Surgery?',
      answer:
        'Minimally invasive spine surgery (MISS) uses smaller incisions and endoscopic or microscopic instruments to reach the spine while gently moving muscles instead of cutting them. This approach reduces tissue trauma, pain, and blood loss compared to traditional open surgery.'
    },
    {
      question: 'What conditions can be treated with Minimally Invasive Spine Surgery?',
      answer:
        'MISS is recommended when conservative treatments no longer control symptoms from conditions such as herniated discs, spinal stenosis, foraminal stenosis, spinal deformities like scoliosis, and spondylolisthesis. The specific technique is chosen based on the level and nature of the pathology.'
    },
    {
      question: 'What are the core patient benefits of choosing Minimally Invasive Spine Surgery?',
      answer:
        'Patients typically experience less postoperative pain, reduced blood loss, minimal scarring, and faster recovery because the muscles and supporting tissues are preserved. Many MISS procedures allow a shorter hospital stay and an earlier return to normal activity.'
    },
    {
      question: 'How long does endoscopic spine surgery take?',
      answer:
        'Most endoscopic spine procedures take 1-3 hours depending on the complexity. Endoscopic discectomy typically takes 60-90 minutes, while more complex procedures like endoscopic ULBD may take 2-3 hours. The shorter operative time contributes to faster recovery.'
    },
    {
      question: 'What is the success rate of minimally invasive spine surgery?',
      answer:
        'Endoscopic spine surgery has success rates of 85-95% for appropriate candidates. Success depends on proper patient selection, accurate diagnosis, and surgeon experience. Dr. Sayuj Krishnan has performed over 500 endoscopic procedures with excellent outcomes.'
    },
    {
      question: 'When can I return to work after endoscopic spine surgery?',
      answer:
        'Most patients can return to desk work within 1-2 weeks after endoscopic spine surgery. Manual labor may require 4-6 weeks. Recovery time varies based on the specific procedure, your overall health, and the physical demands of your job.'
    },
    {
      question: 'Is endoscopic spine surgery covered by insurance?',
      answer:
        'Yes, endoscopic spine surgery is typically covered by most insurance plans when medically necessary. We provide detailed medical estimates and work with insurance companies for pre-authorization. Cashless insurance approvals are available at Yashoda Hospital.'
    },
    {
      question: 'What are the risks of minimally invasive spine surgery?',
      answer:
        'Endoscopic spine surgery has lower risks compared to open surgery, including reduced infection risk, less blood loss, and minimal muscle damage. Potential risks include nerve injury, bleeding, or infection, but these are significantly lower than traditional open procedures.'
    }
  ];

  const faqSchema = {
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
  };

  return (
    <>
      <MedicalWebPageSchema
        pageType="service"
        pageSlug="/services/minimally-invasive-spine-surgery"
        title="Minimally Invasive Spine Surgery Hyderabad | Day Care | Dr Sayuj"
        description="Minimally Invasive Spine Surgery Hyderabad: Day Care procedure with same-day discharge. 1000+ successful endoscopic surgeries by Dr Sayuj. Book Consult."
        serviceOrCondition="Minimally Invasive Spine Surgery"
        lastReviewed="2025-10-19"
      />
      <BreadcrumbSchema
        items={[
          { name: 'Home', path: '/' },
          { name: 'Services', path: '/services' },
          { name: 'Minimally Invasive Spine Surgery', path: '/services/minimally-invasive-spine-surgery' },
        ]}
      />
      <FAQPageSchema faqs={faqs} pageUrl={`${SITE_URL}/services/minimally-invasive-spine-surgery`} />
      <div className="min-h-screen bg-white">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      <div className="container mx-auto px-4 py-16">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">Endoscopic & Minimally Invasive Spine Surgery Hyderabad</h1>
          <AuthorByline
            publishedOn="2025-09-10"
            updatedOn="2025-10-19"
            className="justify-center mb-4"
          />
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            Advanced <strong>endoscopic spine surgery</strong> in Hyderabad.
            Experience <span className="text-blue-700 font-semibold">Day Care</span> procedures,
            <span className="text-blue-700 font-semibold"> Same-Day Discharge</span>, and
            <span className="text-blue-700 font-semibold"> Awake Spine Surgery</span> options for faster recovery.
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
               Book Appointment
             </Link>
          </div>
        </section>

        <section className="mb-12">
            <LocalPathways mode="service" />
        </section>

        <section className="mb-10 rounded-lg border border-green-200 bg-green-50 p-6">
          <h2 className="text-2xl font-semibold text-green-800 mb-3">For high-risk or elderly patients</h2>
          <p className="text-gray-700 mb-3">
            If you need to avoid general anaesthesia because of cardiac, lung, or metabolic risks, we offer an <strong>awake endoscopic spine pathway</strong> using spinal/epidural blocks with light sedation.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link href="/services/awake-spine-surgery-hyderabad" className="rounded-full bg-green-700 px-5 py-2 text-sm font-semibold text-white hover:bg-green-800">
              See Awake Spine Surgery
            </Link>
            <a
              href="https://wa.me/919778280044"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-green-300 px-5 py-2 text-sm font-semibold text-green-800 hover:bg-green-100"
            >
              Share MRI on WhatsApp
            </a>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-blue-800 mb-6">What is Minimally Invasive Spine Surgery?</h2>
          <div className="prose max-w-none">
            <p className="text-lg text-gray-700 mb-6">
              Minimally invasive spine surgery (MISS) uses advanced endoscopic techniques to treat spine conditions through smaller incisions, 
              resulting in less muscle damage, reduced pain, and faster recovery compared to traditional open surgery.
            </p>
            <p className="text-gray-700 mb-6">
              Dr. Sayuj Krishnan specializes in endoscopic spine procedures, offering patients the benefits of modern surgical techniques 
              with reduced trauma and quicker return to daily activities. <Link href="/services/endoscopic-spine-surgery-hyderabad/" className="text-blue-600 hover:underline">Learn more about our local patient journey for endoscopic spine surgery in Hyderabad.</Link>
            </p>
          </div>

          <EndoscopicProcedureSteps />

          <div className="mt-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Compare: Endoscopic vs. Traditional Surgery</h3>
            <p className="text-gray-600 mb-4">See why patients prefer the endoscopic approach for safer, faster recovery.</p>
            <SurgeryComparisonTable />
          </div>
        </section>

        <PatientJourneySection title="Your Treatment Journey" steps={JOURNEY_STEPS} />

        {/* Diagnosis Section - Added to match competitor depth */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-blue-800 mb-6">Diagnosis & Eligibility</h2>
          <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
            <p className="text-gray-700 mb-4">
              Accurate diagnosis is the first step towards successful treatment. At Yashoda Hospital, we use advanced imaging and clinical evaluation to determine if you are a candidate for endoscopic surgery.
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-blue-700 mb-3">Diagnostic Tests We Use</h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2 mt-1">•</span>
                    <span><strong>MRI Spine:</strong> Essential to visualize disc herniation and nerve compression.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2 mt-1">•</span>
                    <span><strong>Dynamic X-Rays:</strong> To check for spinal instability (slippage) during movement.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2 mt-1">•</span>
                    <span><strong>CT Scan:</strong> Detailed bone imaging for fractures or bony spurs.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2 mt-1">•</span>
                    <span><strong>Nerve Conduction Studies (NCS):</strong> To confirm nerve damage if diagnosis is unclear.</span>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-blue-700 mb-3">Who is a Candidate?</h3>
                 <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2 mt-1">✓</span>
                    <span>Patients with radiating leg pain (sciatica) or arm pain.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2 mt-1">✓</span>
                    <span>Those who have failed 6 weeks of physiotherapy and medication.</span>
                  </li>
                   <li className="flex items-start">
                    <span className="text-green-600 mr-2 mt-1">✓</span>
                    <span>Difficulty walking due to spinal stenosis (claudication).</span>
                  </li>
                   <li className="flex items-start">
                    <span className="text-green-600 mr-2 mt-1">✓</span>
                    <span>Presence of progressive numbness or muscle weakness.</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-blue-800 mb-6">Post-Operative Care Guide</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-blue-50 p-6 rounded-lg border border-blue-100">
               <h3 className="text-lg font-semibold text-blue-800 mb-3">Diet & Hydration</h3>
               <ul className="space-y-2 text-gray-700 text-sm">
                 <li>• Drink plenty of water (3-4 liters)</li>
                 <li>• High protein diet for healing</li>
                 <li>• High fiber to prevent constipation</li>
               </ul>
            </div>
            <div className="bg-blue-50 p-6 rounded-lg border border-blue-100">
               <h3 className="text-lg font-semibold text-blue-800 mb-3">Wound Care</h3>
               <ul className="space-y-2 text-gray-700 text-sm">
                 <li>• Keep incision dry for 3 days</li>
                 <li>• Change dressing if soaked</li>
                 <li>• No swimming/tub bath for 2 weeks</li>
               </ul>
            </div>
            <div className="bg-blue-50 p-6 rounded-lg border border-blue-100">
               <h3 className="text-lg font-semibold text-blue-800 mb-3">Do's & Don'ts</h3>
               <ul className="space-y-2 text-gray-700 text-sm">
                 <li>• <strong>Do:</strong> Short walks every hour</li>
                 <li>• <strong>Don't:</strong> Lift &gt;5kg for 3 weeks</li>
                 <li>• <strong>Don't:</strong> Twist or bend excessively</li>
               </ul>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-blue-800 mb-6">Procedures We Offer</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {procedures.map((procedure, index) => (
              <div key={index} className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                <h3 className="text-xl font-semibold text-blue-700 mb-3">
                  {procedure.url ? (
                    <Link href={procedure.url} className="hover:underline">
                      {procedure.title}
                    </Link>
                  ) : (
                    procedure.title
                  )}
                </h3>
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

        <section className="mb-12 bg-white rounded-lg border border-blue-100 shadow-sm p-8">
          <h2 className="text-3xl font-bold text-blue-800 mb-8 text-center">Why Choose Dr. Sayuj Krishnan?</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Microscope className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Endoscopic Expert</h3>
              <p className="text-sm text-gray-600">Specialized training in full endoscopic spine surgery techniques.</p>
            </div>
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <ShieldCheck className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Advanced Safety</h3>
              <p className="text-sm text-gray-600">Neuro-navigation and neuromonitoring for maximum safety.</p>
            </div>
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Rapid Recovery</h3>
              <p className="text-sm text-gray-600">Day-care procedures with same-day walking and discharge.</p>
            </div>
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <HeartHandshake className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Ethical Care</h3>
              <p className="text-sm text-gray-600">Transparent pricing and honest surgical indications.</p>
            </div>
          </div>
        </section>

        {/* Safety for Elderly Section */}
        <section className="mb-12 bg-gradient-to-r from-green-50 to-white p-8 rounded-lg border border-green-100 shadow-sm">
          <h2 className="text-3xl font-bold text-green-900 mb-6">Is Endoscopic Spine Surgery Safe for Elderly Patients?</h2>
          <div className="grid md:grid-cols-2 gap-8 items-center">
             <div>
                <p className="text-lg text-gray-800 mb-4">
                  Yes, it is often a <strong>safer option for patients over 60</strong> compared to open surgery.
                  Traditional open spine surgery carries risks due to general anesthesia and blood loss.
                  Our endoscopic technique mitigates these risks significantly.
                </p>
                <ul className="space-y-3">
                   <li className="flex items-start">
                      <span className="text-green-600 font-bold mr-2">✓</span>
                      <span className="text-gray-700"><strong>Local Anesthesia/Sedation:</strong> Avoids the cardiac stress of general anesthesia.</span>
                   </li>
                   <li className="flex items-start">
                      <span className="text-green-600 font-bold mr-2">✓</span>
                      <span className="text-gray-700"><strong>Minimal Blood Loss:</strong> Crucial for patients on blood thinners (managed carefully).</span>
                   </li>
                   <li className="flex items-start">
                      <span className="text-green-600 font-bold mr-2">✓</span>
                      <span className="text-gray-700"><strong>Early Mobilization:</strong> Reduces risk of pneumonia and DVT (clots).</span>
                   </li>
                </ul>
             </div>
             <div className="bg-white p-6 rounded-xl shadow-md border border-green-200">
                <h3 className="font-bold text-green-800 mb-2">Second Opinion for Senior Citizens</h3>
                <p className="text-sm text-gray-600 mb-4">
                  If your parent has been advised major spine surgery, bring them for an evaluation.
                  We often find that a targeted 45-minute endoscopic procedure can resolve the pain without major surgery.
                </p>
                <Link href="/appointments" className="block w-full text-center bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors">
                  Book Senior Citizen Consult
                </Link>
             </div>
          </div>
        </section>

        <CostTransparencySection costs={COSTS} />

        <OutcomeMetricsSection procedure="Minimally Invasive Spine Surgery" />

        {/* Patient Testimonials Section */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-blue-800 mb-6 text-center">Patient Success Stories</h2>
          <p className="text-gray-700 mb-6">
            See how minimally invasive techniques provide effective <Link href="/conditions/sciatica-pain-treatment-hyderabad" className="text-blue-600 underline">sciatica leg pain relief</Link> and help patients with back pain return to their active lives.
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            {spineStoryHighlights.map((story) => (
              <article key={story.id} className="bg-white rounded-lg p-6 shadow-sm border-l-4 border-blue-500">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-blue-600 font-bold text-lg">
                      {story.patientInitials.charAt(0)}
                    </span>
                  </div>
                  <div className="ml-4">
                    <div className="font-semibold text-gray-800">{story.patientInitials}</div>
                    <div className="text-sm text-gray-600">{story.procedure}</div>
                  </div>
                </div>
                <p className="text-gray-700 italic">“{story.quote}”</p>
                <div className="mt-3 text-sm text-gray-600">
                  <strong>Condition:</strong> {story.condition}
                  {story.recoveryTime ? (
                    <>
                      {" "}• <strong>Recovery:</strong> {story.recoveryTime}
                    </>
                  ) : null}
                </div>
                <Link
                  href={`/patient-stories/${story.slug}`}
                  className="mt-4 inline-flex items-center text-blue-600 font-semibold hover:text-blue-700"
                >
                  Read full story
                  <span aria-hidden className="ml-2">→</span>
                </Link>
              </article>
            ))}
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-blue-800 mb-6">When is MISS Recommended?</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <h3 className="text-lg font-semibold mb-3 text-blue-700">Suitable Conditions</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• Herniated discs (lumbar/cervical)</li>
                <li>• Spinal stenosis</li>
                <li>• Foraminal stenosis</li>
                <li>• Nerve root compression</li>
                <li>• Failed conservative treatment</li>
              </ul>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <h3 className="text-lg font-semibold mb-3 text-blue-700">Patient Selection</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• MRI-confirmed pathology</li>
                <li>• Symptoms match imaging findings</li>
                <li>• Failed 6+ weeks conservative care</li>
                <li>• No significant instability</li>
                <li>• Realistic expectations</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <TeleconsultationForm pageSlug="/services/minimally-invasive-spine-surgery" service="Minimally Invasive Spine Surgery" />
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

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-blue-800 mb-6">Recovery and Return to Activity</h2>
          <div className="bg-white p-8 rounded-lg shadow-sm border">
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-blue-600">1</span>
                </div>
                <h3 className="font-semibold text-blue-700 mb-2">Week 1-2</h3>
                <p className="text-sm text-gray-600">Light walking, wound care, pain management</p>
              </div>
              <div className="text-center">
                <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-blue-600">2</span>
                </div>
                <h3 className="font-semibold text-blue-700 mb-2">Week 2-4</h3>
                <p className="text-sm text-gray-600">Gradual activity increase, return to desk work</p>
              </div>
              <div className="text-center">
                <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-blue-600">3</span>
                </div>
                <h3 className="font-semibold text-blue-700 mb-2">Week 4-8</h3>
                <p className="text-sm text-gray-600">Full activity, physical therapy if needed</p>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-blue-800 mb-6">Common Concerns</h2>
          <div className="space-y-6">
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-3 text-blue-700">Is endoscopic surgery always better than open surgery?</h3>
              <p className="text-gray-700">Not always. We choose the approach that safely achieves the best outcome for your specific condition. Each case is evaluated individually.</p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-3 text-blue-700">How long is the hospital stay?</h3>
              <p className="text-gray-700">Most endoscopic procedures are day-care or require only 1-2 nights in the hospital, compared to 3-5 nights for traditional surgery.</p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-3 text-blue-700">When can I return to work?</h3>
              <p className="text-gray-700">Desk work can often resume within 1-2 weeks, while manual labor may require 4-6 weeks depending on the procedure and your recovery.</p>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-blue-800 mb-6">Red Flag Symptoms (When to see a doctor urgently)</h2>
          <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-r-lg">
            <p className="text-lg font-semibold text-red-800 mb-3">
              Seek immediate medical attention if you experience:
            </p>
            <ul className="space-y-2 text-red-700">
              <li className="flex items-start">
                <span className="font-bold mr-2">•</span>
                <span><strong>Cauda Equina Syndrome signs:</strong> Loss of bladder or bowel control, or numbness in the groin/saddle area.</span>
              </li>
              <li className="flex items-start">
                <span className="font-bold mr-2">•</span>
                <span><strong>Progressive weakness:</strong> Sudden inability to lift your foot (foot drop) or leg weakness that gets worse.</span>
              </li>
              <li className="flex items-start">
                <span className="font-bold mr-2">•</span>
                <span><strong>History of cancer:</strong> If you have a history of cancer and develop new, severe back pain.</span>
              </li>
            </ul>
            <p className="mt-4 text-sm text-red-600 italic">
              *These symptoms may indicate serious nerve compression requiring urgent evaluation to prevent permanent damage.
            </p>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-blue-800 mb-6">Related Conditions & Symptoms</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <h3 className="text-xl font-semibold text-blue-700 mb-3">Spine Conditions We Treat</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/conditions/spinal-stenosis-treatment-hyderabad" className="text-blue-600 hover:text-blue-800 hover:underline">
                    Spinal Stenosis Treatment
                  </Link>
                  <span className="text-gray-600 text-sm ml-2">- Narrowing of spinal canal</span>
                </li>
                <li>
                  <Link href="/conditions/slip-disc-treatment-hyderabad" className="text-blue-600 hover:text-blue-800 hover:underline">
                    Slip Disc / Herniated Disc
                  </Link>
                  <span className="text-gray-600 text-sm ml-2">- Microdiscectomy & endoscopic options</span>
                </li>
                <li>
                  <Link href="/conditions/spine-tumor-surgery-hyderabad" className="text-blue-600 hover:text-blue-800 hover:underline">
                    Spine Tumor Surgery
                  </Link>
                  <span className="text-gray-600 text-sm ml-2">- Removal of spinal cord tumors</span>
                </li>
              </ul>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <h3 className="text-xl font-semibold text-blue-700 mb-3">Related Symptoms</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/conditions/sciatica-pain-treatment-hyderabad" className="text-blue-600 hover:text-blue-800 hover:underline">
                    Sciatica (Leg Pain)
                  </Link>
                  <span className="text-gray-600 text-sm ml-2">- Shooting pain down the leg</span>
                </li>
                <li>
                  <Link href="/conditions/cervical-radiculopathy-treatment-hyderabad" className="text-blue-600 hover:text-blue-800 hover:underline">
                    Cervical Radiculopathy
                  </Link>
                  <span className="text-gray-600 text-sm ml-2">- Pinched nerve in the neck</span>
                </li>
                <li>
                  <Link href="/conditions/cervical-myelopathy-decompression-hyderabad" className="text-blue-600 hover:text-blue-800 hover:underline">
                    Cervical Myelopathy
                  </Link>
                  <span className="text-gray-600 text-sm ml-2">- Cord compression symptoms</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-blue-800 mb-6">Patient Success Stories</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
              <h3 className="text-xl font-semibold mb-3 text-blue-700">
                <Link
                  href="/stories/endoscopic-discectomy-same-day-hyderabad"
                  className="underline underline-offset-4 decoration-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-sm"
                >
                  Same-Day Endoscopic Discectomy
                </Link>
              </h3>
              <p className="text-gray-700 mb-4">
                Read about a patient who achieved same-day discharge after endoscopic discectomy for severe sciatica.
              </p>
              <Link 
                href="/stories/endoscopic-discectomy-same-day-hyderabad"
                className="text-blue-600 hover:text-blue-700 font-medium"
              >
                Read story →
              </Link>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
              <h3 className="text-xl font-semibold mb-3 text-blue-700">
                <Link
                  href="/stories/endoscopic-ulbd-stenosis-hyderabad"
                  className="underline underline-offset-4 decoration-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-sm"
                >
                  Endoscopic ULBD for Lumbar Stenosis
                </Link>
              </h3>
              <p className="text-gray-700 mb-4">
                Learn how endoscopic ULBD improved walking distance and leg pain for a patient with spinal stenosis.
              </p>
              <Link 
                href="/stories/endoscopic-ulbd-stenosis-hyderabad"
                className="text-blue-600 hover:text-blue-700 font-medium"
              >
                Read story →
              </Link>
            </div>
          </div>
        </section>

        <section className="bg-blue-50 p-8 rounded-lg text-center">
          <h2 className="text-2xl font-bold text-blue-800 mb-4">Ready to Discuss Your Treatment Options?</h2>
          <p className="text-gray-600 mb-6">
            Dr. Sayuj Krishnan provides expert evaluation and personalized treatment plans for spine conditions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/appointments/"
              className="bg-blue-600 text-white px-8 py-3 rounded-full hover:bg-blue-700 transition-colors"
            >
              Book Consultation
            </Link>
            <Link 
              href="/about/"
              className="border-2 border-blue-600 text-blue-600 px-8 py-3 rounded-full hover:bg-blue-600 hover:text-white transition-colors"
            >
              About Dr Sayuj
            </Link>
          </div>
        </section>

        <SourceList sources={ARTICLE_SOURCES} heading="Clinical References" />

        <section className="mt-12 space-y-6">
          <ReviewedBy lastReviewed="2025-10-19" />
          <NAP />
        </section>
      </div>
    </div>
    </>
  );
}
