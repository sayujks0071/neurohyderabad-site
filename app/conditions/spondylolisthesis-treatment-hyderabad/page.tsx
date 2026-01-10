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
import { PhysicianSchema } from "@/src/components/schema/PhysicianSchema";
import CostTransparencySection from '@/src/components/CostTransparencySection';
import TeleconsultationForm from '@/components/TeleconsultationForm';
import OutcomeMetricsSection from '@/components/OutcomeMetricsSection';
import FAQPageSchema from '@/app/_components/FAQPageSchema';

const baseMetadata = makeMetadata({
  title: 'Spondylolisthesis Treatment in Hyderabad | Slipped Vertebra Surgery Cost',
  description: 'Expert treatment for Spondylolisthesis (Slipped Vertebra) by Dr. Sayuj Krishnan. Minimally invasive fusion (MIS-TLIF) costs and recovery in Hyderabad.',
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
  .filter((story) => story.tags.includes('spine') || story.tags.includes('fusion'))
  .slice(0, 2);

const COSTS = [
  {
    procedure: 'MIS TLIF (Fusion)',
    range: '₹2,50,000 - ₹3,50,000',
    recovery: '4-6 weeks',
    includes: ['Titanium Implants', 'Minimally Invasive Access', '4 Days Hospital Stay', 'Physiotherapy']
  },
  {
    procedure: 'Open TLIF (Fusion)',
    range: '₹2,00,000 - ₹2,80,000',
    recovery: '6-8 weeks',
    includes: ['Standard Incision', 'Implants & Graft', '5-6 Days Hospital Stay']
  },
  {
    procedure: 'Laminectomy (Decompression)',
    range: '₹1,20,000 - ₹1,60,000',
    recovery: '2-3 weeks',
    includes: ['Nerve Release Only', 'No Implants', '2 Days Hospital Stay']
  }
];

export default function SpondylolisthesisPage() {
  const faqs = [
    {
      question: 'Do I really need surgery for spondylolisthesis?',
      answer: 'Not always. Surgery is usually recommended only if you have Grade 3/4 slips, or if you have Grade 1/2 slips with persistent nerve pain/weakness that hasn\'t improved after 6 weeks of rehabilitation and medication.'
    },
    {
      question: 'What is the cost of spondylolisthesis surgery in Hyderabad?',
      answer: 'The cost typically ranges from ₹2.5 Lakhs to ₹3.5 Lakhs for Minimally Invasive TLIF (Fusion). This includes hospital stay, implants, and surgeon fees. Open surgery may cost slightly less, but recovery is longer.'
    },
    {
      question: 'How long is the recovery after spinal fusion?',
      answer: 'With MIS-TLIF, patients usually walk the next day. Desk work can often resume in 3-4 weeks. Complete bone fusion takes 3-6 months, during which heavy lifting is restricted.'
    },
    {
      question: 'Can spondylolisthesis be cured with exercise?',
      answer: 'Grade 1 slips can often be stabilized with core strengthening exercises. While the slip itself won\'t reverse, the pain can vanish completely, avoiding the need for surgery.'
    },
    {
      question: 'Is MIS TLIF better than open surgery?',
      answer: 'Yes, for most patients. MIS TLIF involves smaller incisions, less muscle cutting, less blood loss, and a shorter hospital stay compared to traditional open fusion.'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <PhysicianSchema />
      <FAQPageSchema faqs={faqs} pageUrl={`${SITE_URL}/conditions/spondylolisthesis-treatment-hyderabad`} />

      <Section background="blue" className="pt-24 pb-12">
        <header className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">Spondylolisthesis Treatment in Hyderabad</h1>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto mb-8">
            Advanced care for "slipped vertebrae" – stabilizing your spine with modern, minimally invasive techniques.
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
            <h2 className="text-3xl font-bold text-gray-900 mb-6">What is Spondylolisthesis?</h2>
            <div className="prose max-w-none text-gray-700">
              <p className="text-lg mb-4">
                Spondylolisthesis (spon-di-lo-lis-thee-sis) is a spinal condition where one of the lower vertebrae slips forward onto the bone directly beneath it.
                This is different from a "slip disc" (which involves the soft cushion). Here, the <strong>bone itself shifts position</strong>.
              </p>
              <p className="mb-4">
                This slippage can compress the spinal cord or nerves, leading to lower back pain, leg pain (sciatica), and hamstring tightness.
                It is common in older adults (degenerative) but can also occur in young athletes (isthmic).
              </p>
            </div>
          </div>
          <div className="bg-gray-50 p-8 rounded-2xl border border-gray-100 shadow-sm">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Common Symptoms</h3>
            <ul className="space-y-3">
              {[
                "Persistent lower back pain that worsens with standing/walking",
                "Pain radiating down the legs (Sciatica)",
                "Tight hamstrings (back of thighs)",
                "Stiffness in the back, especially in the morning",
                "Difficulty standing for long periods"
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
        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Grades of Slippage</h2>
        <p className="text-center max-w-2xl mx-auto mb-8 text-gray-700">Doctors classify the severity based on how much the bone has slipped forward.</p>
        <div className="grid md:grid-cols-4 gap-4">
          {[
            { grade: "Grade 1", desc: "Less than 25% slip. Often treated without surgery." },
            { grade: "Grade 2", desc: "25% to 50% slip. May cause significant pain." },
            { grade: "Grade 3", desc: "50% to 75% slip. Usually requires stabilization." },
            { grade: "Grade 4", desc: "More than 75% slip. Severe instability." }
          ].map((item, i) => (
            <div key={i} className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 text-center">
              <div className="text-2xl font-bold text-blue-600 mb-2">{item.grade}</div>
              <p className="text-gray-600">{item.desc}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section>
        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Treatment Options</h2>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-green-50/50 p-8 rounded-2xl border border-green-100">
            <h3 className="text-xl font-bold text-green-800 mb-4">Conservative Care</h3>
            <p className="text-gray-700 mb-4">For Grade 1 and mild symptoms, we always start here.</p>
            <ul className="space-y-3 list-disc list-inside text-gray-700">
              <li><strong>Core Strengthening:</strong> Specific exercises to stabilize the spine.</li>
              <li><strong>Activity Modification:</strong> Avoiding heavy lifting and hyperextension.</li>
              <li><strong>Bracing:</strong> Temporary back brace to provide support.</li>
              <li><strong>Pain Management:</strong> Medications and nerve blocks.</li>
            </ul>
          </div>

          <div className="bg-blue-50/50 p-8 rounded-2xl border border-blue-100">
            <h3 className="text-xl font-bold text-blue-800 mb-4">Surgical Stabilization</h3>
            <p className="text-gray-700 mb-4">For higher grades or when nerve pain persists.</p>
            <ul className="space-y-3 list-disc list-inside text-gray-700">
              <li><strong>Spinal Fusion (TLIF):</strong> Joining the vertebrae together using screws and a cage to stop the slipping.</li>
              <li><strong>Minimally Invasive Fusion (MIS-TLIF):</strong> Doing the fusion through small incisions for faster recovery.</li>
              <li><strong>Decompression:</strong> Removing bone spurs pressing on nerves.</li>
            </ul>
             <div className="mt-4 pt-4 border-t border-blue-200">
                <Link href="/services/spinal-fusion-surgery-hyderabad" className="text-blue-600 font-semibold hover:underline">
                    Learn about Spinal Fusion Cost & Procedure →
                </Link>
             </div>
          </div>
        </div>
      </Section>

      <CostTransparencySection costs={COSTS} />

      <OutcomeMetricsSection procedure="Spinal Fusion (TLIF)" />

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
