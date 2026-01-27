import { Metadata } from 'next';
import Link from 'next/link';
import AuthorByline from '@/app/_components/AuthorByline';
import SourceList from '@/app/_components/SourceList';
import ReviewedBy from '@/app/_components/ReviewedBy';
import NAP from '@/app/_components/NAP';
import { SITE_URL } from '../../../src/lib/seo';
import { sources } from '../../blog/sources';
import { makeMetadata } from '@/app/_lib/meta';
import Section from '@/app/_components/Section';
import { patientStories } from '../../../src/content/stories';
import { LocalPathways } from '@/src/components/locations/LocalPathways';
import CostTransparencySection from '@/src/components/CostTransparencySection';
import TeleconsultationForm from '@/components/TeleconsultationForm';
import OutcomeMetricsSection from '@/components/OutcomeMetricsSection';
import FAQPageSchema from '@/app/_components/FAQPageSchema';

const baseMetadata = makeMetadata({
  title: 'Scoliosis Treatment in Hyderabad | Spine Curvature Correction Surgery',
  description: 'Expert treatment for Scoliosis (Spine Deformity) by Dr. Sayuj Krishnan. Minimally invasive correction surgery costs and recovery in Hyderabad.',
  canonicalPath: '/conditions/scoliosis-treatment-hyderabad',
});

export const metadata: Metadata = {
  ...baseMetadata,
  alternates: {
    canonical: `${SITE_URL}/conditions/scoliosis-treatment-hyderabad/`,
    languages: {
      'en-IN': `${SITE_URL}/conditions/scoliosis-treatment-hyderabad/`,
      'x-default': `${SITE_URL}/conditions/scoliosis-treatment-hyderabad/`,
    },
  },
};

const spineStories = patientStories
  .filter((story) => story.tags.includes('spine') || story.tags.includes('fusion'))
  .slice(0, 2);

const COSTS = [
  {
    procedure: 'Scoliosis Correction (Deformity)',
    range: '₹4,00,000 - ₹6,00,000',
    recovery: '3-6 months',
    includes: ['Complex Implants', 'Neuromonitoring', '7-10 Days Hospital Stay', 'Rehabilitation']
  },
  {
    procedure: 'MIS Fusion (Mild Curves)',
    range: '₹3,00,000 - ₹4,00,000',
    recovery: '6-8 weeks',
    includes: ['Minimally Invasive Access', 'Titanium Implants', '4-5 Days Hospital Stay']
  },
  {
    procedure: 'Bracing (Conservative)',
    range: '₹15,000 - ₹40,000',
    recovery: 'N/A',
    includes: ['Custom Molded Brace', 'X-Ray Monitoring', 'Physiotherapy']
  }
];

export default function ScoliosisPage() {
  const faqs = [
    {
      question: 'Does every scoliosis patient need surgery?',
      answer: 'No. Surgery is only recommended for curves greater than 40-50 degrees that are progressing or causing lung/heart issues. Mild curves are managed with observation and bracing.'
    },
    {
      question: 'What is the cost of scoliosis surgery in Hyderabad?',
      answer: 'Complex scoliosis correction typically ranges from ₹4 Lakhs to ₹6 Lakhs depending on the number of levels fused and the type of implants used. This includes IONM (nerve monitoring) for safety.'
    },
    {
      question: 'Can scoliosis be corrected in adults?',
      answer: 'Yes. While it is often treated in adolescents, adult degenerative scoliosis can also be corrected surgically to relieve pain and improve posture.'
    },
    {
      question: 'How long is the recovery after scoliosis surgery?',
      answer: 'Patients usually walk within 2-3 days. Return to school/desk work takes 4-6 weeks. Full bone fusion and return to sports may take 6-12 months.'
    },
    {
      question: 'Is the surgery safe?',
      answer: 'Modern scoliosis surgery uses Neuromonitoring (IONM) to monitor nerve function in real-time during the operation, significantly increasing safety and reducing risks.'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <FAQPageSchema faqs={faqs} pageUrl={`${SITE_URL}/conditions/scoliosis-treatment-hyderabad`} />

      <Section background="blue" className="pt-24 pb-12">
        <header className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">Scoliosis Treatment in Hyderabad</h1>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto mb-8">
            Advanced correction for "curved spine" – restoring balance and posture with modern techniques.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/appointments/"
              className="bg-blue-600 text-white px-8 py-3 rounded-full hover:bg-blue-700 transition-colors font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all"
            >
              Book Consultation
            </Link>
            <a
              href="tel:+919778280044"
              className="bg-white text-blue-600 px-8 py-3 rounded-full hover:bg-gray-50 transition-colors border border-blue-200 font-medium"
            >
              Call +91-9778280044
            </a>
          </div>
        </header>
      </Section>

      <Section>
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">What is Scoliosis?</h2>
            <div className="prose max-w-none text-gray-700">
              <p className="text-lg mb-4">
                Scoliosis is an abnormal sideways curvature of the spine. Instead of a straight line, the spine looks like an "S" or "C" shape.
                It can affect people of any age, from children (Idiopathic) to older adults (Degenerative).
              </p>
              <p className="mb-4">
                Severe curves can cause uneven shoulders, waist asymmetry, back pain, and in rare cases, can compress the lungs or heart.
                Early detection and monitoring are crucial.
              </p>
            </div>
          </div>
          <div className="bg-gray-50 p-8 rounded-2xl border border-gray-100 shadow-sm">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Signs to Watch For</h3>
            <ul className="space-y-3">
              {[
                "Uneven shoulders (one higher than the other)",
                "One shoulder blade that sticks out more",
                "Uneven waist or hips",
                "Leaning to one side",
                "Back pain or fatigue after standing"
              ].map((symptom, i) => (
                <li key={i} className="flex gap-3 items-start text-gray-700">
                  <span className="mt-1.5 w-1.5 h-1.5 bg-blue-600 rounded-full flex-shrink-0" />
                  <span>{symptom}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      <Section background="gray">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Types of Scoliosis</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { title: "Idiopathic", desc: "Most common type, usually diagnosed in adolescence. Cause is unknown." },
            { title: "Degenerative", desc: "Occurs in adults due to wear and tear of discs and joints." },
            { title: "Congenital", desc: "Present at birth due to bone formation issues." }
          ].map((item, i) => (
            <div key={i} className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 text-center">
              <div className="text-xl font-bold text-blue-600 mb-2">{item.title}</div>
              <p className="text-gray-600">{item.desc}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section>
        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Treatment Options</h2>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-green-50/50 p-8 rounded-2xl border border-green-100">
            <h3 className="text-xl font-bold text-green-800 mb-4">Observation & Bracing</h3>
            <p className="text-gray-700 mb-4">For mild curves (less than 25-40 degrees) in growing children.</p>
            <ul className="space-y-3 list-disc list-inside text-gray-700">
              <li><strong>Regular X-Rays:</strong> To monitor if the curve is worsening.</li>
              <li><strong>Bracing:</strong> Wearing a custom brace to stop progression while growing.</li>
              <li><strong>Physiotherapy:</strong> Schroth exercises to improve posture and strength.</li>
            </ul>
          </div>

          <div className="bg-blue-50/50 p-8 rounded-2xl border border-blue-100">
            <h3 className="text-xl font-bold text-blue-800 mb-4">Surgical Correction</h3>
            <p className="text-gray-700 mb-4">For severe curves (&gt;45 degrees) or progressive deformity.</p>
            <ul className="space-y-3 list-disc list-inside text-gray-700">
              <li><strong>Spinal Fusion:</strong> Using rods and screws to straighten the spine and fuse it in the correct position.</li>
              <li><strong>Deformity Correction:</strong> Realignment procedures (Osteotomies) for rigid curves.</li>
              <li><strong>Safety First:</strong> We use Intraoperative Neuromonitoring to protect nerves.</li>
            </ul>
             <div className="mt-4 pt-4 border-t border-blue-200">
                <Link href="/services/spinal-fusion-surgery-hyderabad" className="text-blue-600 font-semibold hover:underline">
                    Learn about Spinal Fusion Procedure →
                </Link>
             </div>
          </div>
        </div>
      </Section>

      <CostTransparencySection costs={COSTS} />

      <OutcomeMetricsSection procedure="Scoliosis Correction" />

       {/* Patient Stories Section */}
      <Section background="gray">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Patient Success Stories</h2>
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {spineStories.map((story) => (
            <article key={story.id} className="bg-white rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow border border-gray-100">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold text-lg">
                  {story.patientInitials.charAt(0)}
                </div>
                <div className="ml-4">
                  <div className="font-bold text-gray-900">{story.title}</div>
                  <div className="text-sm text-gray-500">{story.procedure}</div>
                </div>
              </div>
              <blockquote className="text-gray-700 italic text-lg mb-6 border-l-4 border-blue-200 pl-4">
                {story.quote}
              </blockquote>
              <Link
                href={`/patient-stories/${story.slug}`}
                className="text-blue-600 font-semibold hover:text-blue-800 flex items-center gap-2 group"
              >
                Read full story
                <span className="transform group-hover:translate-x-1 transition-transform">→</span>
              </Link>
            </article>
          ))}
        </div>
      </Section>

      <Section>
        <div className="bg-blue-600 rounded-2xl p-8 md:p-12 text-center text-white shadow-xl mb-12">
          <h2 className="text-3xl font-bold mb-4">Worried About Spine Curvature?</h2>
          <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto">
            Early detection is key for Scoliosis. Get a comprehensive evaluation today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/appointments/"
              className="bg-white text-blue-600 px-8 py-4 rounded-full hover:bg-gray-100 transition-colors font-bold text-lg shadow-lg"
            >
              Book Consultation
            </Link>
          </div>
        </div>
        <LocalPathways mode="condition" />
      </Section>

      <Section background="gray">
        <TeleconsultationForm pageSlug="/conditions/scoliosis-treatment-hyderabad" service="Scoliosis Treatment" />
      </Section>

      <Section>
        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Frequently Asked Questions</h2>
        <div className="max-w-3xl mx-auto space-y-6">
          {faqs.map((faq) => (
            <article key={faq.question} className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">{faq.question}</h3>
              <p className="text-gray-700">{faq.answer}</p>
            </article>
          ))}
        </div>
      </Section>

      <Section>
        <div className="space-y-6">
          <AuthorByline
            publishedOn="2026-01-26"
            updatedOn="2026-01-26"
          />
          <SourceList sources={sources['sciatica-pain-treatment-hyderabad'] || []} />
          <ReviewedBy />
          <NAP />
        </div>
      </Section>

      {/* MedicalCondition Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "MedicalCondition",
            "name": "Scoliosis",
            "alternateName": "Spine Curvature",
            "associatedAnatomy": {
              "@type": "AnatomicalStructure",
              "name": "Spine"
            },
            "possibleTreatment": [
              {
                "@type": "MedicalTherapy",
                "name": "Spinal Fusion Surgery"
              },
              {
                "@type": "MedicalTherapy",
                "name": "Bracing"
              }
            ]
          })
        }}
      />
    </div>
  );
}
