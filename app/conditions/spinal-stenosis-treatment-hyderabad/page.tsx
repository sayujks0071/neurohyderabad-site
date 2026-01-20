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
  title: 'Lumbar Canal Stenosis Treatment in Hyderabad | Walking Pain Surgery',
  description: 'Expert treatment for Lumbar Canal Stenosis (Spinal Narrowing) by Dr. Sayuj Krishnan. Decompressive Laminectomy costs and recovery in Hyderabad.',
  canonicalPath: '/conditions/spinal-stenosis-treatment-hyderabad',
});

export const metadata: Metadata = {
  ...baseMetadata,
  alternates: {
    canonical: `${SITE_URL}/conditions/spinal-stenosis-treatment-hyderabad/`,
    languages: {
      'en-IN': `${SITE_URL}/conditions/spinal-stenosis-treatment-hyderabad/`,
      'x-default': `${SITE_URL}/conditions/spinal-stenosis-treatment-hyderabad/`,
    },
  },
};

const spineStories = patientStories
  .filter((story) => story.tags.includes('spine') || story.tags.includes('stenosis') || story.tags.includes('sciatica'))
  .slice(0, 2);

const COSTS = [
  {
    procedure: 'Micro-Decompression (ULBD)',
    range: '₹1,50,000 - ₹2,20,000',
    recovery: '2 weeks',
    includes: ['Microscope Use', 'Nerve Decompression', '2 Days Hospital Stay']
  },
  {
    procedure: 'Laminectomy (Open)',
    range: '₹1,20,000 - ₹1,80,000',
    recovery: '3-4 weeks',
    includes: ['Standard Incision', 'Bone Removal', '3-4 Days Hospital Stay']
  },
  {
    procedure: 'Endoscopic Decompression',
    range: '₹1,80,000 - ₹2,50,000',
    recovery: '1 week',
    includes: ['Keyhole Surgery', 'HD Camera', '1 Day Hospital Stay']
  }
];

export default function SpinalStenosisPage() {
  const faqs = [
    {
      question: 'What is lumbar canal stenosis?',
      answer: 'It is a narrowing of the spinal canal in the lower back. This narrowing squeezes the nerves that travel to your legs, causing pain, heaviness, or numbness when walking.'
    },
    {
      question: 'Why do my legs hurt only when I walk?',
      answer: 'This is called "Neurogenic Claudication". When you stand or walk, your spine arches slightly, narrowing the canal further and pinching the nerves. Sitting or bending forward opens the canal and relieves the pain.'
    },
    {
      question: 'Is surgery necessary for stenosis?',
      answer: 'Surgery is advised if your walking distance is significantly reduced (e.g., you can\'t walk more than 10 minutes) or if you have numbness/weakness. Mild cases can be managed with medication and exercises.'
    },
    {
      question: 'What is the success rate of stenosis surgery?',
      answer: 'Decompression surgery has a very high success rate (over 90%) for relieving leg pain and improving walking ability. Back pain relief varies depending on other factors.'
    },
    {
      question: 'How is Micro-Decompression different from Laminectomy?',
      answer: 'Micro-decompression uses a microscope and a smaller incision to remove only the bone spur pressing the nerve, preserving spinal stability. Traditional laminectomy removes more bone and muscle.'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <FAQPageSchema faqs={faqs} pageUrl={`${SITE_URL}/conditions/spinal-stenosis-treatment-hyderabad`} />

      <Section background="blue" className="pt-24 pb-12">
        <header className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">Lumbar Canal Stenosis Treatment in Hyderabad</h1>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto mb-8">
            Relief from leg heaviness and walking pain. Advanced Micro-Decompression surgery to free your nerves.
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
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Can't Walk for More Than 10 Minutes?</h2>
            <div className="prose max-w-none text-gray-700">
              <p className="text-lg mb-4">
                If you feel fine while sitting, but experience heavy, painful, or numb legs after walking a short distance, you likely have **Lumbar Canal Stenosis**.
              </p>
              <p className="mb-4">
                This is a "wear and tear" condition where thickened ligaments and bone spurs crowd the spinal canal, choking the nerves. It is the most common reason for spine surgery in people over 60.
              </p>
            </div>
          </div>
          <div className="bg-gray-50 p-8 rounded-2xl border border-gray-100 shadow-sm">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Typical Symptoms</h3>
            <ul className="space-y-3">
              {[
                "Leg heaviness or cramping when walking (Claudication)",
                "Relief when sitting or bending forward (Shopping Cart Sign)",
                "Numbness or tingling in feet",
                "Lower back pain (often mild compared to leg pain)",
                "Weakness in legs in severe cases"
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
            <h3 className="text-xl font-bold text-green-800 mb-4">Non-Surgical Care</h3>
            <p className="text-gray-700 mb-4">Effective for mild to moderate symptoms.</p>
            <ul className="space-y-3 list-disc list-inside text-gray-700">
              <li><strong>Medication:</strong> Gabapentin/Pregabalin to calm nerve pain.</li>
              <li><strong>Physiotherapy:</strong> Flexion exercises to open the canal.</li>
              <li><strong>Epidural Steroid Injections:</strong> To reduce inflammation around nerves.</li>
            </ul>
          </div>

          <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm">
            <h3 className="text-xl font-bold text-blue-800 mb-4">Surgical Decompression</h3>
            <p className="text-gray-700 mb-4">When walking becomes too difficult.</p>
            <ul className="space-y-3 list-disc list-inside text-gray-700">
              <li><strong>Micro-Decompression:</strong> Removing the bone spur compressing the nerve using a microscope.</li>
              <li><strong>ULBD (Over-the-top):</strong> Decompressing both sides through a single small incision.</li>
              <li><strong>Fusion:</strong> Only added if the spine is also unstable (spondylolisthesis).</li>
            </ul>
          </div>
        </div>
      </Section>

      <CostTransparencySection costs={COSTS} />

      <OutcomeMetricsSection procedure="Spinal Decompression" />

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
          <h2 className="text-3xl font-bold mb-4">Walk Freely Again</h2>
          <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto">
            Don't let spinal stenosis limit your life. A simple 45-minute procedure can restore your mobility.
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
        <TeleconsultationForm pageSlug="/conditions/spinal-stenosis-treatment-hyderabad" service="Spinal Stenosis Treatment" />
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
          <SourceList sources={sources['spinal-stenosis-treatment-hyderabad'] || []} />
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
            "name": "Lumbar Spinal Stenosis",
            "associatedAnatomy": {
              "@type": "AnatomicalStructure",
              "name": "Spinal Canal"
            },
            "possibleTreatment": [
              {
                "@type": "MedicalTherapy",
                "name": "Decompressive Laminectomy"
              },
              {
                "@type": "MedicalTherapy",
                "name": "Epidural Steroid Injection"
              }
            ]
          })
        }}
      />
    </div>
  );
}
