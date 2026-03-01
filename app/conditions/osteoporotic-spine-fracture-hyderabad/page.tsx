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
  title: 'Osteoporotic Spine Fracture Treatment in Hyderabad | Vertebroplasty Cost',
  description: 'Expert treatment for Osteoporotic Compression Fractures. Minimally invasive Vertebroplasty & Kyphoplasty (Cement Injection) by Dr. Sayuj Krishnan.',
  canonicalPath: '/conditions/osteoporotic-spine-fracture-hyderabad',
});

export const metadata: Metadata = {
  ...baseMetadata,
  alternates: {
    canonical: `${SITE_URL}/conditions/osteoporotic-spine-fracture-hyderabad/`,
    languages: {
      'en-IN': `${SITE_URL}/conditions/osteoporotic-spine-fracture-hyderabad/`,
      'x-default': `${SITE_URL}/conditions/osteoporotic-spine-fracture-hyderabad/`,
    },
  },
};

const spineStories = patientStories
  .filter((story) => story.tags.includes('spine') || story.tags.includes('elderly'))
  .slice(0, 2);

const COSTS = [
  {
    procedure: 'Vertebroplasty (Cement)',
    range: '₹1,50,000 - ₹2,00,000',
    recovery: '1-2 days',
    includes: ['Bone Cement', 'C-Arm Guidance', '1 Day Hospital Stay']
  },
  {
    procedure: 'Kyphoplasty (Balloon)',
    range: '₹2,50,000 - ₹3,50,000',
    recovery: '1-2 days',
    includes: ['Balloon Kit', 'Bone Cement', 'Height Restoration', '1 Day Stay']
  },
  {
    procedure: 'Conservative (Brace)',
    range: '₹5,000 - ₹15,000',
    recovery: '6-8 weeks',
    includes: ['Custom Brace', 'Medication', 'Follow-up X-rays']
  }
];

export default function OsteoporoticFracturePage() {
  const faqs = [
    {
      question: 'What is a compression fracture?',
      answer: 'It is a collapse of a vertebra (back bone), usually caused by osteoporosis (weak bones). It often happens after a minor fall or even lifting something heavy in elderly patients.'
    },
    {
      question: 'What is Vertebroplasty (Cement Injection)?',
      answer: 'Vertebroplasty is a minimally invasive procedure where medical-grade bone cement is injected into the fractured vertebra to stabilize it and stop the pain immediately.'
    },
    {
      question: 'Is surgery always needed for spine fractures?',
      answer: 'No. Stable fractures without severe pain can heal with bed rest, bracing, and calcium medication. Surgery (Vertebroplasty) is advised if pain is severe or the bone collapse is worsening.'
    },
    {
      question: 'Is Vertebroplasty safe for elderly patients?',
      answer: 'Yes, it is specifically designed for the elderly. It is done under local anesthesia or mild sedation, takes less than an hour, and avoids major open surgery risks.'
    },
    {
      question: 'How fast is recovery after Kyphoplasty/Vertebroplasty?',
      answer: 'Pain relief is often immediate (within hours). Patients can usually walk the same evening and go home the next day.'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <FAQPageSchema faqs={faqs} pageUrl={`${SITE_URL}/conditions/osteoporotic-spine-fracture-hyderabad`} />

      <Section background="blue" className="pt-24 pb-12">
        <header className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">Osteoporotic Spine Fracture Treatment in Hyderabad</h1>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto mb-8">
            Immediate pain relief for elderly spine fractures using advanced Bone Cement (Vertebroplasty) techniques.
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
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Why Do Spine Fractures Happen?</h2>
            <div className="prose max-w-none text-gray-700">
              <p className="text-lg mb-4">
                As we age, bones lose density (Osteoporosis). This makes the vertebrae (spine bones) fragile. A simple stumble, a sudden sneeze, or lifting a grandchild can cause the bone to crack and collapse.
              </p>
              <p className="mb-4">
                These are called <strong>Osteoporotic Compression Fractures</strong>. Unlike traumatic fractures in young people, these often happen with minimal force but cause severe, debilitating pain that makes walking or even turning in bed difficult.
              </p>
            </div>
          </div>
          <div className="bg-gray-50 p-8 rounded-2xl border border-gray-100 shadow-sm">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Warning Signs</h3>
            <ul className="space-y-3">
              {[
                "Sudden, severe back pain in an elderly person",
                "Pain worsens when standing or walking",
                "Pain improves when lying down flat",
                "Height loss or stooped posture (Kyphosis)",
                "Limited spinal mobility"
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
        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Treatment Options</h2>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm">
            <h3 className="text-xl font-bold text-blue-800 mb-4">Vertebroplasty (Bone Cement)</h3>
            <p className="text-gray-700 mb-4">The gold standard for painful osteoporotic fractures.</p>
            <ul className="space-y-3 list-disc list-inside text-gray-700">
              <li><strong>Procedure:</strong> A needle is inserted into the fractured bone under X-ray guidance.</li>
              <li><strong>Action:</strong> Medical cement is injected, which hardens in 10 minutes.</li>
              <li><strong>Result:</strong> Stabilizes the fracture and stops pain instantly.</li>
              <li><strong>Stay:</strong> Day care or 24-hour stay.</li>
            </ul>
          </div>

          <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm">
            <h3 className="text-xl font-bold text-purple-800 mb-4">Kyphoplasty (Balloon)</h3>
            <p className="text-gray-700 mb-4">Advanced version of vertebroplasty to correct posture.</p>
            <ul className="space-y-3 list-disc list-inside text-gray-700">
              <li><strong>Procedure:</strong> A small balloon is inflated inside the collapsed bone first.</li>
              <li><strong>Action:</strong> Creates space and restores the height of the vertebra before injecting cement.</li>
              <li><strong>Benefit:</strong> Helps correct the "hunchback" deformity.</li>
            </ul>
          </div>
        </div>
      </Section>

      <CostTransparencySection costs={COSTS} />

      <OutcomeMetricsSection procedure="Vertebroplasty" />

      <Section background="gray">
        <div className="bg-blue-600 rounded-2xl p-8 md:p-12 text-center text-white shadow-xl mb-12">
          <h2 className="text-3xl font-bold mb-4">Is Your Parent in Severe Pain?</h2>
          <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto">
            Bed rest isn't the only option. Vertebroplasty can get them back on their feet in 24 hours.
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
        <LocalPathways mode="condition" currentSlug="osteoporotic-spine-fracture-hyderabad" />
      </Section>

      <Section>
        <TeleconsultationForm pageSlug="/conditions/osteoporotic-spine-fracture-hyderabad" service="Vertebroplasty Treatment" />
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
            publishedOn="2026-01-03"
            updatedOn="2026-01-03"
          />
          <SourceList sources={sources['osteoporotic-spine-fracture-hyderabad'] || []} />
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
            "name": "Osteoporotic Spinal Compression Fracture",
            "alternateName": "Vertebral Compression Fracture",
            "associatedAnatomy": {
              "@type": "AnatomicalStructure",
              "name": "Spine"
            },
            "possibleTreatment": [
              {
                "@type": "MedicalTherapy",
                "name": "Vertebroplasty"
              },
              {
                "@type": "MedicalTherapy",
                "name": "Kyphoplasty"
              }
            ]
          })
        }}
      />
    </div>
  );
}
