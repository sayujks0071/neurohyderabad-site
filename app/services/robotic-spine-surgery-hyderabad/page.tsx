import { Metadata } from 'next';
import Link from 'next/link';
import { ShieldCheck, Crosshair, Cpu, CheckCircle } from 'lucide-react';
import { SITE_URL } from '../../../src/lib/seo';
import OutcomeMetricsSection from '@/components/OutcomeMetricsSection';
import TeleconsultationForm from '@/components/TeleconsultationForm';
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
import PatientJourneySection from '@/src/components/PatientJourneySection';

const baseMetadata = makeMetadata({
  title: 'Robotic Spine Surgery Hyderabad | Dr. Sayuj Krishnan',
  description: 'Advanced robotic spine surgery in Hyderabad. High precision, minimal radiation, and faster recovery with AI-driven surgical planning at Yashoda Hospital.',
  canonicalPath: '/services/robotic-spine-surgery-hyderabad',
});

export const metadata: Metadata = {
  ...baseMetadata,
  openGraph: {
    title: baseMetadata.title,
    description: baseMetadata.description,
    url: `${SITE_URL}/services/robotic-spine-surgery-hyderabad`,
    siteName: 'Dr. Sayuj Krishnan - Neurosurgeon in Hyderabad',
    images: [
      {
        url: `${SITE_URL}/api/og?title=Robotic%20Spine%20Surgery&subtitle=Precision%20Navigation%20in%20Hyderabad`,
        width: 1200,
        height: 630,
        alt: 'Robotic Spine Surgery - Dr. Sayuj Krishnan',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
};

const ARTICLE_SOURCES = getServiceSources('robotic-spine-surgery-hyderabad');


const JOURNEY_STEPS = [
  {
    title: 'CT Scan Planning',
    description: 'A pre-op CT scan is used to create a 3D blueprint of your spine.'
  },
  {
    title: 'Robotic Setup',
    description: 'The robotic arm is calibrated to your spine anatomy using AI algorithms.'
  },
  {
    title: 'Precise Execution',
    description: 'The surgeon guides the robotic arm to place implants with sub-millimeter accuracy.'
  },
  {
    title: 'Verification',
    description: 'Real-time imaging confirms perfect placement before you leave the OT.'
  },
  {
    title: 'Rapid Recovery',
    description: 'Less tissue damage means you get out of bed sooner, often the same day.'
  }
];

export default function RoboticSpineSurgeryPage() {
  const faqs = [
    {
      question: 'What is robotic spine surgery?',
      answer:
        'Robotic spine surgery involves using a robotic arm to assist the surgeon in placing spinal implants (like screws) with extreme precision. The robot does not perform the surgery on its own; it acts as a high-tech guide, enhancing the surgeon’s accuracy and control.'
    },
    {
      question: 'Is robotic spine surgery safer than traditional surgery?',
      answer:
        'Yes, studies show that robotic guidance significantly improves the accuracy of screw placement (up to 99.9%), reducing the risk of nerve injury and revision surgeries. It also lowers radiation exposure for both the patient and the surgical team.'
    },
    {
      question: 'Does robotic surgery mean the robot does the operation?',
      answer:
        'No. Dr. Sayuj Krishnan is in full control at all times. The robot is a tool that provides a rigid, precise trajectory for instruments, preventing human tremor or fatigue-related errors during critical steps.'
    },
    {
      question: 'Who is a candidate for robotic spine surgery?',
      answer:
        'It is ideal for patients requiring spinal fusion, scoliosis correction, tumor surgery, or revision spine surgery. It is especially beneficial for complex anatomies where freehand surgery might be risky.'
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
        pageSlug="/services/robotic-spine-surgery-hyderabad"
        title="Robotic Spine Surgery Hyderabad | Dr. Sayuj Krishnan"
        description="Advanced robotic spine surgery in Hyderabad. High precision, minimal radiation, and faster recovery with AI-driven surgical planning."
        serviceOrCondition="Robotic Spine Surgery"
        lastReviewed="2026-01-19"
      />
      <BreadcrumbSchema
        items={[
          { name: 'Home', path: '/' },
          { name: 'Services', path: '/services' },
          { name: 'Robotic Spine Surgery', path: '/services/robotic-spine-surgery-hyderabad' },
        ]}
      />
      <FAQPageSchema faqs={faqs} pageUrl={`${SITE_URL}/services/robotic-spine-surgery-hyderabad`} />
      <div className="min-h-screen bg-white">
        <div className="container mx-auto px-4 py-16">
          <header className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-4">Robotic Spine Surgery in Hyderabad</h1>
            <AuthorByline
              publishedOn="2026-01-19"
              updatedOn="2026-01-19"
              className="justify-center mb-4"
            />
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              The future of spinal care is here. Experience <strong>sub-millimeter precision</strong> with
              AI-guided robotic technology for safer, faster, and more effective outcomes.
            </p>
          </header>

          <section className="bg-blue-50 p-6 rounded-lg mb-8 border border-blue-100 shadow-sm text-center">
            <p className="text-gray-800 text-lg mb-4">
              <strong>Yashoda Hospital, Malakpet</strong> • Advanced Robotic Spine Center
            </p>
            <div className="flex flex-wrap justify-center gap-6 text-sm font-medium">
               <a href="tel:+919778280044" className="flex items-center text-blue-700 hover:text-blue-900 bg-white px-4 py-2 rounded-full shadow-sm hover:shadow-md transition-all">
                 📞 +91-9778280044
               </a>
               <Link href="/appointments" className="flex items-center text-white bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-full shadow-sm hover:shadow-md transition-all">
                 Check Robotic Availability
               </Link>
            </div>
          </section>

          <section className="mb-12">
              <LocalPathways mode="service" currentSlug="robotic-spine-surgery-hyderabad" />
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-blue-800 mb-6">Why Robotic Spine Surgery?</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                <Crosshair className="w-10 h-10 text-blue-600 mb-4" />
                <h3 className="font-semibold text-lg mb-2">99.9% Accuracy</h3>
                <p className="text-gray-600">Robotic arms eliminate human tremor, ensuring implants are placed exactly as planned.</p>
              </div>
              <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                <ShieldCheck className="w-10 h-10 text-blue-600 mb-4" />
                <h3 className="font-semibold text-lg mb-2">Enhanced Safety</h3>
                <p className="text-gray-600">Reduced risk of nerve damage or vascular injury due to precise, pre-planned trajectories.</p>
              </div>
              <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                <Cpu className="w-10 h-10 text-blue-600 mb-4" />
                <h3 className="font-semibold text-lg mb-2">AI Planning</h3>
                <p className="text-gray-600">Sophisticated software analyzes your anatomy to create the perfect surgical blueprint.</p>
              </div>
              <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                <CheckCircle className="w-10 h-10 text-blue-600 mb-4" />
                <h3 className="font-semibold text-lg mb-2">Faster Recovery</h3>
                <p className="text-gray-600">Minimally invasive incisions + less tissue manipulation = quicker return to life.</p>
              </div>
            </div>
          </section>

          <section className="mb-12 bg-gray-50 p-8 rounded-lg border border-gray-200">
            <h2 className="text-3xl font-bold text-blue-800 mb-6">Robotic Precision vs. Traditional Surgery</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left bg-white rounded-lg shadow-sm">
                <thead>
                  <tr className="bg-blue-100 border-b border-blue-200">
                    <th className="p-4 font-semibold text-blue-800">Feature</th>
                    <th className="p-4 font-semibold text-blue-800">Traditional Open Surgery</th>
                    <th className="p-4 font-semibold text-blue-800">Robotic Spine Surgery</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  <tr>
                    <td className="p-4 font-medium text-gray-700">Accuracy</td>
                    <td className="p-4 text-gray-600">Dependent on surgeon's hand & 2D X-rays (90-95%)</td>
                    <td className="p-4 text-green-700 font-bold">Sub-millimeter precision (99.9%)</td>
                  </tr>
                  <tr>
                    <td className="p-4 font-medium text-gray-700">Radiation Exposure</td>
                    <td className="p-4 text-gray-600">High (Frequent X-rays needed)</td>
                    <td className="p-4 text-green-700 font-bold">Minimal (Pre-planned trajectory)</td>
                  </tr>
                  <tr>
                    <td className="p-4 font-medium text-gray-700">Incision Size</td>
                    <td className="p-4 text-gray-600">Large (To visualize anatomy)</td>
                    <td className="p-4 text-green-700 font-bold">Small (Keyhole access)</td>
                  </tr>
                  <tr>
                    <td className="p-4 font-medium text-gray-700">Muscle Damage</td>
                    <td className="p-4 text-gray-600">Significant (Muscles stripped from bone)</td>
                    <td className="p-4 text-green-700 font-bold">Minimal (Muscles dilated gently)</td>
                  </tr>
                  <tr>
                    <td className="p-4 font-medium text-gray-700">Recovery Time</td>
                    <td className="p-4 text-gray-600">Weeks to Months</td>
                    <td className="p-4 text-green-700 font-bold">Days to Weeks</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="mt-4 text-sm text-gray-600 italic text-center">
              *Comparison based on average clinical outcomes. Individual results may vary.
            </p>
          </section>

          <PatientJourneySection title="Robotic Surgery Workflow" steps={JOURNEY_STEPS} />

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-blue-800 mb-6">Who Needs Robotic Spine Surgery?</h2>
            <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
               <p className="text-gray-700 mb-4">
                 While many simple spine conditions can be treated with standard endoscopic techniques, robotic assistance is a game-changer for complex cases.
               </p>
               <ul className="grid md:grid-cols-2 gap-4">
                 <li className="flex items-start">
                   <span className="text-green-600 mr-2 font-bold">✓</span>
                   <span><strong>Spinal Deformities:</strong> Scoliosis or Kyphosis correction.</span>
                 </li>
                 <li className="flex items-start">
                   <span className="text-green-600 mr-2 font-bold">✓</span>
                   <span><strong>Complex Fractures:</strong> Stabilizing broken vertebrae with high precision.</span>
                 </li>
                 <li className="flex items-start">
                   <span className="text-green-600 mr-2 font-bold">✓</span>
                   <span><strong>Revision Surgery:</strong> When previous surgeries have altered the anatomy.</span>
                 </li>
                 <li className="flex items-start">
                   <span className="text-green-600 mr-2 font-bold">✓</span>
                   <span><strong>Spondylolisthesis:</strong> Stabilizing slipped vertebrae (Grade 2 or higher).</span>
                 </li>
               </ul>
            </div>
          </section>

          <OutcomeMetricsSection procedure="Robotic Spine Surgery" />

          <section className="mb-12">
            <TeleconsultationForm pageSlug="/services/robotic-spine-surgery-hyderabad" service="Robotic Spine Surgery" />
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

          <SourceList sources={ARTICLE_SOURCES} heading="Scientific References" />

          <section className="mt-12 space-y-6">
            <ReviewedBy lastReviewed="2026-01-19" />
            <NAP />
          </section>
        </div>
      </div>
    </>
  );
}
