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
import { ConditionLocationLinks } from '@/src/components/locations/ConditionLocationLinks';
import { PhysicianSchema } from "@/src/components/schema/PhysicianSchema";

const baseMetadata = makeMetadata({
  title: 'Sciatica Treatment in Hyderabad | Expert Pain Relief & Surgery',
  description: 'Conservative care, injections, and endoscopic surgery for sciatica tailored by Dr. Sayuj Krishnan in Hyderabad. Book your consultation today.',
  canonicalPath: '/conditions/sciatica-treatment-hyderabad',
});

export const metadata: Metadata = {
  ...baseMetadata,
  alternates: {
    canonical: `${SITE_URL}/conditions/sciatica-treatment-hyderabad/`,
    languages: {
      'en-IN': `${SITE_URL}/conditions/sciatica-treatment-hyderabad/`,
      'x-default': `${SITE_URL}/conditions/sciatica-treatment-hyderabad/`,
    },
  },
};

const spineStories = patientStories
  .filter((story) => story.tags.includes('spine'))
  .slice(0, 2);

export default function SciaticaTreatmentPage() {
  return (
    <div className="min-h-screen bg-white">
      <PhysicianSchema />
      <Section background="blue" className="pt-24 pb-12">
        <header className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">Sciatica Treatment in Hyderabad</h1>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto mb-8">
            Comprehensive care for sciatic nerve pain—from advanced conservative management to minimally invasive endoscopic solutions.
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

        <div className="bg-white/50 p-6 rounded-xl text-center max-w-4xl mx-auto backdrop-blur-sm border border-blue-100">
          <p className="text-sm text-gray-600 mb-2 font-medium uppercase tracking-wide">Related Expert Services</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/services/minimally-invasive-spine-surgery" className="text-blue-700 hover:text-blue-900 text-sm font-medium bg-blue-100/50 px-3 py-1 rounded-full hover:bg-blue-100 transition-colors">
              Endoscopic Spine Surgery
            </Link>
            <Link href="/services/peripheral-nerve-surgery-hyderabad" className="text-blue-700 hover:text-blue-900 text-sm font-medium bg-blue-100/50 px-3 py-1 rounded-full hover:bg-blue-100 transition-colors">
              Peripheral Nerve Surgery
            </Link>
            <Link href="/conditions/slip-disc-treatment-hyderabad" className="text-blue-700 hover:text-blue-900 text-sm font-medium bg-blue-100/50 px-3 py-1 rounded-full hover:bg-blue-100 transition-colors">
              Slip Disc Treatment
            </Link>
          </div>
        </div>
      </Section>

      <Section>
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">What is Sciatica?</h2>
            <div className="prose max-w-none text-gray-700">
              <p className="text-lg mb-4">
                Sciatica is not a condition itself, but a symptom of an underlying problem involving the <strong>sciatic nerve</strong>.
                This nerve is the longest and thickest in the body, running from your lower back, through your hips and buttocks, and down each leg.
              </p>
              <p className="mb-4">
                The pain typically affects one side of the body and can range from a mild ache to a sharp, burning sensation or excruciating pain.
                It may feel like a jolt or electric shock.
              </p>
              <p>
                Dr. Sayuj Krishnan specializes in identifying the root cause of your sciatica to provide targeted relief, whether through
                medication, therapy, or advanced endoscopic procedures.
              </p>
            </div>
          </div>
          <div className="bg-gray-50 p-8 rounded-2xl border border-gray-100 shadow-sm">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Common Symptoms</h3>
            <ul className="space-y-3">
              {[
                "Pain radiating from lower back to buttock and down the leg",
                "Numbness, tingling, or muscle weakness in the affected leg",
                "Sharp pain that may make it difficult to stand up or walk",
                "Pain that worsens when sitting, coughing, or sneezing",
                "Current-like sensation shooting down the leg"
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
        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Causes & Risk Factors</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              title: "Herniated Disc",
              desc: "The most common cause. A slipped disc presses on the nerve root in the lower back."
            },
            {
              title: "Spinal Stenosis",
              desc: "Narrowing of the spinal canal reduces space for the nerve, often due to aging."
            },
            {
              title: "Spondylolisthesis",
              desc: "One vertebra slips forward over another, pinching the nerve."
            },
            {
              title: "Piriformis Syndrome",
              desc: "The piriformis muscle in the buttocks spasms and irritates the sciatic nerve."
            },
            {
              title: "Bone Spurs",
              desc: "Overgrowth of bone on the vertebrae can compress the nerves."
            },
            {
              title: "Trauma or Injury",
              desc: "Accidents or falls can injure the lumbar spine or nerve roots."
            }
          ].map((item, i) => (
            <div key={i} className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
              <h3 className="text-lg font-bold text-blue-800 mb-2">{item.title}</h3>
              <p className="text-gray-600">{item.desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 bg-red-50 p-6 rounded-xl border border-red-100 max-w-4xl mx-auto">
          <div className="flex gap-4 items-start">
            <span className="text-3xl">⚠️</span>
            <div>
              <h3 className="text-lg font-bold text-red-800 mb-2">Red Flags: When to Seek Immediate Care</h3>
              <p className="text-gray-700 mb-2">
                Seek immediate medical attention if you experience:
              </p>
              <ul className="grid md:grid-cols-2 gap-x-8 gap-y-2 list-disc list-inside text-gray-700 text-sm">
                <li>Sudden, severe pain in your low back or leg</li>
                <li>Numbness or muscle weakness in your leg</li>
                <li>Loss of bladder or bowel control (Cauda Equina Syndrome)</li>
                <li>Pain following a violent injury, such as a traffic accident</li>
              </ul>
            </div>
          </div>
        </div>
      </Section>

      <Section>
        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Diagnosis & Treatment Approach</h2>

        <div className="mb-12">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">How We Diagnose Sciatica</h3>
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <p className="text-gray-700 mb-4">
              Accurate diagnosis is key to effective treatment. Dr. Sayuj Krishnan uses a combination of:
            </p>
            <ul className="grid md:grid-cols-3 gap-6">
              <li className="flex flex-col gap-2">
                <span className="font-semibold text-blue-700">1. Physical Examination</span>
                <span className="text-gray-600 text-sm">Checking muscle strength, reflexes, and performing the straight leg raise test to reproduce pain.</span>
              </li>
              <li className="flex flex-col gap-2">
                <span className="font-semibold text-blue-700">2. Medical History</span>
                <span className="text-gray-600 text-sm">Reviewing your symptoms, pain patterns, and any past injuries or conditions.</span>
              </li>
              <li className="flex flex-col gap-2">
                <span className="font-semibold text-blue-700">3. Advanced Imaging</span>
                <span className="text-gray-600 text-sm">MRI scans are the gold standard to visualize nerve compression. CT scans or X-rays may also be used.</span>
              </li>
            </ul>
          </div>
        </div>

        <h3 className="text-2xl font-bold text-gray-900 mb-6">Comprehensive Treatment Options</h3>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-green-50/50 p-8 rounded-2xl border border-green-100">
            <h3 className="text-xl font-bold text-green-800 mb-4 flex items-center gap-2">
              <span className="bg-green-100 p-2 rounded-lg">🌿</span> Conservative Treatment
            </h3>
            <p className="text-gray-700 mb-4 font-medium">Most cases resolve with non-surgical care within 4-6 weeks.</p>
            <ul className="space-y-4">
              <li className="bg-white p-4 rounded-lg shadow-sm">
                <strong className="block text-gray-900 mb-1">Medication Management</strong>
                <span className="text-gray-600 text-sm">Anti-inflammatories, muscle relaxants, and neuropathic pain medications to reduce symptoms.</span>
              </li>
              <li className="bg-white p-4 rounded-lg shadow-sm">
                <strong className="block text-gray-900 mb-1">Physical Therapy</strong>
                <span className="text-gray-600 text-sm">Targeted exercises to improve posture, strengthen back muscles, and improve flexibility.</span>
              </li>
              <li className="bg-white p-4 rounded-lg shadow-sm">
                <strong className="block text-gray-900 mb-1">Pain Interventions</strong>
                <span className="text-gray-600 text-sm">Epidural steroid injections or nerve blocks to reduce inflammation around the irritated nerve.</span>
              </li>
            </ul>
          </div>

          <div className="bg-blue-50/50 p-8 rounded-2xl border border-blue-100">
            <h3 className="text-xl font-bold text-blue-800 mb-4 flex items-center gap-2">
              <span className="bg-blue-100 p-2 rounded-lg">🔬</span> Surgical Solutions
            </h3>
            <p className="text-gray-700 mb-4 font-medium">Recommended when conservative care fails or neurological deficits are present.</p>
            <ul className="space-y-4">
              <li className="bg-white p-4 rounded-lg shadow-sm border-l-4 border-blue-500">
                <strong className="block text-blue-700 mb-1">Endoscopic Discectomy</strong>
                <span className="text-gray-600 text-sm">
                  Dr. Sayuj's specialty. A keyhole procedure (&lt;8mm incision) to remove the herniated disc fragment.
                  <Link href="/services/minimally-invasive-spine-surgery" className="text-blue-600 hover:underline ml-1">Learn more about endoscopic surgery.</Link>
                </span>
              </li>
              <li className="bg-white p-4 rounded-lg shadow-sm">
                <strong className="block text-gray-900 mb-1">Microdiscectomy</strong>
                <span className="text-gray-600 text-sm">Removing disc material using a microscope through a small incision.</span>
              </li>
              <li className="bg-white p-4 rounded-lg shadow-sm">
                <strong className="block text-gray-900 mb-1">Laminectomy / Decompression</strong>
                <span className="text-gray-600 text-sm">Creating space for the nerve by removing part of the vertebra (lamina).</span>
              </li>
            </ul>
          </div>
        </div>
      </Section>

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
              <div className="text-sm text-gray-600 mb-4 bg-gray-50 p-4 rounded-lg">
                <strong>Outcome:</strong> {story.summary}
              </div>
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
          <h2 className="text-3xl font-bold mb-4">Start Your Journey to Pain-Free Living</h2>
          <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto">
            Don't let sciatica control your life. Get an expert opinion from Dr. Sayuj Krishnan and explore your treatment options today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/appointments/"
              className="bg-white text-blue-600 px-8 py-4 rounded-full hover:bg-gray-100 transition-colors font-bold text-lg shadow-lg"
            >
              Book Consultation
            </Link>
            <a
              href="https://wa.me/919778280044?text=Hi%20Dr%20Sayuj,%20I%20need%20help%20with%20sciatica"
              className="bg-green-500 text-white px-8 py-4 rounded-full hover:bg-green-600 transition-colors font-bold text-lg shadow-lg flex items-center justify-center gap-2"
            >
              <span>WhatsApp Us</span>
            </a>
          </div>
        </div>

         <ConditionLocationLinks />
      </Section>

      <Section className="border-t border-gray-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
        <div className="space-y-4 max-w-4xl mx-auto">
          {[
            {
              q: "What is the fastest way to cure sciatica?",
              a: "There is no instant cure, but relief can be accelerated. Rest for 1-2 days (not more), use ice/heat packs, take prescribed anti-inflammatories, and perform gentle stretching. If pain persists, consult a specialist for targeted injections or therapy."
            },
            {
              q: "Can sciatica go away on its own?",
              a: "Yes, mild sciatica often resolves within 4-6 weeks with self-care. However, if the pain is severe, causes weakness, or lasts longer than 6 weeks, medical intervention is necessary to prevent permanent nerve damage."
            },
            {
              q: "Is walking good for sciatica?",
              a: "Yes, walking is generally good for sciatica as it improves blood flow and reduces inflammation. However, listen to your body—take short walks and stop if the pain worsens. Avoid high-impact activities."
            },
            {
              q: "How do I know if I need surgery for sciatica?",
              a: "Surgery is typically considered if: 1) You have significant muscle weakness or loss of bowel/bladder control (emergency), 2) Pain is unbearable despite conservative treatment, or 3) Symptoms persist for more than 6-12 weeks and affect your quality of life."
            },
            {
              q: "What is the success rate of endoscopic spine surgery for sciatica?",
              a: "Endoscopic discectomy has a high success rate (over 90%) for relieving leg pain caused by disc herniation. It offers faster recovery and less pain compared to open surgery."
            }
          ].map((faq, i) => (
            <details key={i} className="group bg-white border border-gray-200 rounded-lg p-4 open:bg-gray-50 transition-colors">
              <summary className="font-semibold text-gray-900 cursor-pointer list-none flex justify-between items-center">
                {faq.q}
                <span className="text-gray-400 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="mt-3 text-gray-700 leading-relaxed">{faq.a}</p>
            </details>
          ))}
        </div>
      </Section>

      <Section>
        <div className="space-y-6">
          <AuthorByline 
            publishedOn="2025-02-15"
            updatedOn="2025-10-25"
          />
          <SourceList sources={sources['sciatica-treatment-hyderabad'] || []} />
          <ReviewedBy />
          <NAP />
        </div>
      </Section>
      
      {/* FAQ Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "What is the fastest way to cure sciatica?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "There is no instant cure, but relief can be accelerated. Rest for 1-2 days (not more), use ice/heat packs, take prescribed anti-inflammatories, and perform gentle stretching. If pain persists, consult a specialist for targeted injections or therapy."
                }
              },
              {
                "@type": "Question",
                "name": "Can sciatica go away on its own?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes, mild sciatica often resolves within 4-6 weeks with self-care. However, if the pain is severe, causes weakness, or lasts longer than 6 weeks, medical intervention is necessary to prevent permanent nerve damage."
                }
              },
              {
                "@type": "Question",
                "name": "Is walking good for sciatica?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes, walking is generally good for sciatica as it improves blood flow and reduces inflammation. However, listen to your body—take short walks and stop if the pain worsens. Avoid high-impact activities."
                }
              },
              {
                "@type": "Question",
                "name": "How do I know if I need surgery for sciatica?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Surgery is typically considered if: 1) You have significant muscle weakness or loss of bowel/bladder control (emergency), 2) Pain is unbearable despite conservative treatment, or 3) Symptoms persist for more than 6-12 weeks and affect your quality of life."
                }
              },
               {
                "@type": "Question",
                "name": "What is the success rate of endoscopic spine surgery for sciatica?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Endoscopic discectomy has a high success rate (over 90%) for relieving leg pain caused by disc herniation. It offers faster recovery and less pain compared to open surgery."
                }
              }
            ]
          })
        }}
      />
      {/* MedicalCondition Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "MedicalCondition",
            "name": "Sciatica",
            "alternateName": "Sciatic Nerve Pain",
            "associatedAnatomy": {
              "@type": "AnatomicalStructure",
              "name": "Sciatic Nerve"
            },
            "differentialDiagnosis": {
              "@type": "DDxElement",
              "diagnosis": {
                "@type": "MedicalCondition",
                "name": "Herniated Disc"
              },
              "distinguishingSign": {
                "@type": "MedicalSign",
                "name": "Leg pain radiating below the knee"
              }
            },
            "possibleTreatment": [
              {
                "@type": "MedicalTherapy",
                "name": "Physical Therapy"
              },
              {
                "@type": "MedicalTherapy",
                "name": "Epidural Steroid Injection"
              },
              {
                "@type": "MedicalProcedure",
                "name": "Endoscopic Discectomy"
              }
            ]
          })
        }}
      />
    </div>
  );
}
