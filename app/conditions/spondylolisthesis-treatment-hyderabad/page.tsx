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
  title: 'Spondylolisthesis Treatment in Hyderabad | Spinal Fusion',
  description: 'Expert treatment for Spondylolisthesis (Slipped Vertebra) by Dr. Sayuj Krishnan. Minimally invasive fusion (TLIF) surgery options in Hyderabad.',
  canonicalPath: '/conditions/spondylolisthesis-treatment-hyderabad',
});

export const metadata: Metadata = {
  ...baseMetadata,
  alternates: {
    canonical: `${SITE_URL}/conditions/spondylolisthesis-treatment-hyderabad/`,
    languages: {
      'en-IN': `${SITE_URL}/conditions/spondylolisthesis-treatment-hyderabad/`,
      'x-default': `${SITE_URL}/conditions/spondylolisthesis-treatment-hyderabad/`,
    },
  },
};

const spineStories = patientStories
  .filter((story) => story.tags.includes('spine') || story.tags.includes('fusion') || story.tags.includes('listhesis'))
  .slice(0, 2);

const COSTS = [
  {
    procedure: 'MIS-TLIF (Keyhole Fusion)',
    range: '₹2,80,000 - ₹3,50,000',
    recovery: '4 weeks',
    includes: ['Surgeon Fees', 'Titanium Implants', '3-4 Days Hospital Stay']
  },
  {
    procedure: 'Open TLIF',
    range: '₹2,20,000 - ₹2,80,000',
    recovery: '6 weeks',
    includes: ['Standard Fusion', 'Titanium Implants', '5 Days Hospital Stay']
  },
  {
    procedure: 'Decompression (No Fusion)',
    range: '₹1,20,000 - ₹1,60,000',
    recovery: '2 weeks',
    includes: ['Bone Spur Removal', 'No Implants', '1-2 Days Stay']
  }
];

export default function SpondylolisthesisPage() {
  const faqs = [
    {
      question: 'What is spondylolisthesis?',
      answer: 'It is a condition where one vertebra slips forward over the one below it. This instability can pinch nerves, causing back pain and leg pain (sciatica).'
    },
    {
      question: 'Is surgery always needed for spondylolisthesis?',
      answer: 'No. Grade 1 (minor slip) can often be managed with physiotherapy and core strengthening. Surgery is advised for Grade 2 or higher slips, or if there is severe nerve compression causing foot weakness.'
    },
    {
      question: 'What is TLIF surgery?',
      answer: 'TLIF (Transforaminal Lumbar Interbody Fusion) is the gold standard surgery for this condition. We realign the slipped bone, free the nerves, and fuse the vertebrae using screws and a cage.'
    },
    {
      question: 'How long does it take to recover from spinal fusion?',
      answer: 'Patients walk the next day. You can return to light work in 3-4 weeks. Complete bone fusion takes 3-6 months, but implants hold the spine stable immediately.'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* PhysicianSchema removed as it's in layout */}
      <FAQPageSchema faqs={faqs} pageUrl={`${SITE_URL}/conditions/spondylolisthesis-treatment-hyderabad`} />

      <Section background="blue" className="pt-24 pb-12">
        <header className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">Spondylolisthesis Treatment in Hyderabad</h1>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto mb-8">
            Comprehensive care for Spinal Instability (Slipped Vertebra). Advanced minimally invasive fusion (TLIF) to restore stability and stop pain.
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
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Understanding the "Slipped Bone"</h2>
            <div className="prose max-w-none text-gray-700">
              <p className="text-lg mb-4">
                Spondylolisthesis occurs when a spinal bone (vertebra) slides forward out of place. This instability stretches the nerves and causes persistent low back pain that worsens when standing or walking.
              </p>
              <p className="mb-4">
                It is commonly caused by age-related wear (Degenerative) or a crack in the bone from youth (Isthmic). If untreated, the slip can progress, leading to severe nerve damage.
              </p>
            </div>
          </div>
          <div className="bg-gray-50 p-8 rounded-2xl border border-gray-100 shadow-sm">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Symptoms of Instability</h3>
            <ul className="space-y-3">
              {[
                "Lower back pain that feels 'broken' or 'loose'",
                "Pain radiating to buttocks and legs (Sciatica)",
                "Hamstring tightness (back of thighs)",
                "Difficulty standing or walking for long periods",
                "Waddling gait in severe cases"
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
            <h3 className="text-xl font-bold text-green-800 mb-4">Conservative Care</h3>
            <p className="text-gray-700 mb-4">For mild slips (Grade 1) with manageable pain.</p>
            <ul className="space-y-3 list-disc list-inside text-gray-700">
              <li><strong>Core Strengthening:</strong> Physiotherapy to stabilize the spine naturally with muscles.</li>
              <li><strong>Pain Management:</strong> Medication and occasional epidural injections.</li>
              <li><strong>Lifestyle Changes:</strong> Weight loss and avoiding hyperextension.</li>
            </ul>
          </div>

          <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm">
            <h3 className="text-xl font-bold text-blue-800 mb-4">Surgical Stabilization</h3>
            <p className="text-gray-700 mb-4">For unstable slips (Grade 2+) or nerve compression.</p>
            <ul className="space-y-3 list-disc list-inside text-gray-700">
              <li><strong>TLIF (Fusion):</strong> Realigning and fusing the bones with titanium screws and cages.</li>
              <li><strong>Decompression:</strong> Freeing the trapped nerves.</li>
              <li><strong>Minimally Invasive Option:</strong> Performing the fusion through keyhole incisions for faster recovery.</li>
            </ul>
          </div>
        </div>
      </Section>

      <CostTransparencySection costs={COSTS} />

      <OutcomeMetricsSection procedure="Spinal Fusion" />

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
          <h2 className="text-3xl font-bold mb-4">Don't Ignore Back Instability</h2>
          <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto">
            Spondylolisthesis can progress if untreated. Get a proper evaluation and treatment plan.
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
        <TeleconsultationForm pageSlug="/conditions/spondylolisthesis-treatment-hyderabad" service="Spondylolisthesis Treatment" />
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
          <SourceList sources={sources['sciatica-treatment-hyderabad'] || []} />
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
            "name": "Spondylolisthesis",
            "alternateName": "Slipped Vertebra",
            "associatedAnatomy": {
              "@type": "AnatomicalStructure",
              "name": "Lumbar Spine"
            },
            "possibleTreatment": [
              {
                "@type": "MedicalTherapy",
                "name": "Spinal Fusion Surgery"
              },
              {
                "@type": "MedicalTherapy",
                "name": "Physical Therapy"
              }
            ]
          })
        }}
      />
    </div>
  );
}
