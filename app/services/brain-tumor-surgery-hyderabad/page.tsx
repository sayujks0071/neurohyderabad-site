import { SITE_URL } from "../../../src/lib/seo";
import type { Metadata } from "next";
import Link from "next/link";
import { analytics } from "../../../src/lib/analytics";
import ScrollDepthTracker from "../../../src/components/ScrollDepthTracker";
import Breadcrumbs from "../../components/Breadcrumbs";
import RelatedContent from "../../components/RelatedContent";
import OutcomeMetricsSection from "@/components/OutcomeMetricsSection";
import TeleconsultationForm from "@/components/TeleconsultationForm";
import { patientStories } from "../../../src/content/stories";
import ReviewedBy from '@/app/_components/ReviewedBy';
import NAP from '@/app/_components/NAP';
import { makeMetadata } from '@/app/_lib/meta';

const brainStory = patientStories.find((story) => story.tags.includes("brain"));

const baseMetadata = makeMetadata({
  title: 'Brain Tumor Surgery in Hyderabad | Microsurgery & Radiosurgery Care',
  description: 'Brain tumor surgery with neuronavigation and neuromonitoring in Hyderabad. Risks, recovery, and alternatives explained.',
  canonicalPath: '/services/brain-tumor-surgery-hyderabad',
});

export const metadata: Metadata = {
  ...baseMetadata,
  openGraph: {
    title: baseMetadata.title,
    description: baseMetadata.description,
    url: `${SITE_URL}/services/brain-tumor-surgery-hyderabad`,
    images: [
      {
        url: `${SITE_URL}/api/og?title=${encodeURIComponent('Brain Tumor Surgery in Hyderabad')}&subtitle=${encodeURIComponent('Microsurgery & Radiosurgery')}`,
        width: 1200,
        height: 630,
        alt: 'Brain Tumor Surgery — Dr Sayuj Krishnan',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: baseMetadata.title,
    description: baseMetadata.description,
    images: [
      {
        url: `${SITE_URL}/api/og?title=${encodeURIComponent('Brain Tumor Surgery in Hyderabad')}&subtitle=${encodeURIComponent('Microsurgery & Radiosurgery')}`,
        alt: 'Brain Tumor Surgery — Dr Sayuj Krishnan',
      },
    ],
  },
};

export const revalidate = 86400; // ISR: Revalidate every 24 hours

export default function BrainTumorSurgeryPage() {
  // Track page view
  if (typeof window !== 'undefined') {
    analytics.pageView('/services/brain-tumor-surgery-hyderabad/', 'service', 'brain_tumor_surgery');
  }

  const relatedItems = [
    {
      title: "Epilepsy Surgery",
      description: "Comprehensive surgical treatment for drug-resistant epilepsy with advanced techniques.",
      href: "/services/epilepsy-surgery-hyderabad",
      category: "procedure" as const
    },
    {
      title: "Trigeminal Neuralgia Treatment",
      description: "Advanced treatment options including microvascular decompression and radiosurgery.",
      href: "/conditions/trigeminal-neuralgia-treatment-hyderabad",
      category: "condition" as const
    },
    {
      title: "Minimally Invasive Spine Surgery",
      description: "Endoscopic and microdiscectomy procedures for spine conditions.",
      href: "/services/minimally-invasive-spine-surgery",
      category: "procedure" as const
    }
  ];

  return (
    <>
      <ScrollDepthTracker pageSlug="/services/brain-tumor-surgery-hyderabad/" />
      <Breadcrumbs
        items={[
          { name: "Home", href: "/" },
          { name: "Services", href: "/services/" },
          { name: "Brain Tumor Surgery", href: "/services/brain-tumor-surgery-hyderabad/" }
        ]}
      />
      <main className="container mx-auto px-4 py-16">
        <article className="max-w-4xl mx-auto">
          <header className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-4">Brain Tumor Surgery in Hyderabad</h1>
            <p className="text-lg text-gray-600">Neuronavigation-guided microsurgery with multidisciplinary care</p>
          </header>

          <section className="bg-blue-50 p-6 rounded-lg mb-8">
            <p className="text-center">
              <strong>Contact:</strong>
              <a href="tel:+919778280044" className="text-blue-600 hover:underline ml-2">+91-9778280044</a> •
              <a href="mailto:neurospinehyd@drsayuj.com" className="text-blue-600 hover:underline ml-2">neurospinehyd@drsayuj.com</a> •
              <a href="/appointments" className="text-blue-600 hover:underline ml-2">Appointments</a>
            </p>
          </section>

          <div className="prose max-w-none">
            <ReviewedBy date="October 1, 2025" className="mb-8" />


            <section className="mb-8">
              <h2>When is Surgery Recommended?</h2>
              <p>
                Surgery for brain tumors aims for maximal safe resection—removing as much tumor as possible while protecting brain function. We consider surgery when:
              </p>
              <ul className="space-y-2">
                <li>• Imaging suggests a resectable lesion with potential to improve survival or symptoms</li>
                <li>• Tissue diagnosis is needed to plan further treatment (radiation/chemotherapy)</li>
                <li>• Mass effect, hydrocephalus, or seizures require decompression</li>
                <li>• The tumor is accessible and surgery can be performed safely</li>
              </ul>
              <p>
                Some tumors are better treated primarily with radiosurgery or radiation. For deep, small lesions (e.g., some metastases, vestibular schwannomas), radiosurgery may be preferred. We individualize the plan after MRI review and multidisciplinary discussion.
              </p>
            </section>

            <section className="mb-8">
              <h2>Pre-operative Planning</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-lg shadow-sm border">
                  <h3 className="text-lg font-semibold mb-3 text-blue-700">Clinical Assessment</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li>• Detailed neurological exam and seizure history</li>
                    <li>• Functional mapping if near eloquent areas</li>
                    <li>• Anesthetic fitness optimization</li>
                    <li>• DVT and infection risk assessment</li>
                  </ul>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-sm border">
                  <h3 className="text-lg font-semibold mb-3 text-blue-700">Imaging & Preparation</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li>• MRI brain with contrast ± diffusion/tractography</li>
                    <li>• CT when needed for bone assessment</li>
                    <li>• Steroids/antiepileptics when indicated</li>
                    <li>• Pre-operative counseling and consent</li>
                  </ul>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2>Surgical Techniques and Safety</h2>
              <div className="space-y-6">
                <div className="bg-white p-6 rounded-lg shadow-sm border">
                  <h3 className="text-lg font-semibold mb-3 text-blue-700">Neuronavigation</h3>
                  <p>
                    Maps your MRI to guide precise craniotomy and resection trajectory. This technology acts like GPS for the brain, helping Dr Sayuj locate the exact position of the tumor during surgery and plan the safest approach.
                  </p>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm border">
                  <h3 className="text-lg font-semibold mb-3 text-blue-700">Microsurgery with Neuromonitoring</h3>
                  <p>
                    Continuous monitoring of motor/sensory pathways during surgery. Special monitoring equipment watches brain function in real-time, helping protect important areas that control speech, movement, and thinking.
                  </p>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm border">
                  <h3 className="text-lg font-semibold mb-3 text-blue-700">Awake Craniotomy</h3>
                  <p>
                    For tumors near language/motor areas, you may be awake during part of the surgery. This allows Dr Sayuj to test brain function while removing the tumor safely, ensuring critical functions are preserved.
                  </p>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm border">
                  <h3 className="text-lg font-semibold mb-3 text-blue-700">Tissue Analysis</h3>
                  <p>
                    Tissue sent for rapid and final histopathology to guide on-table decisions when appropriate. This helps determine the exact type of tumor and guides any additional treatment needed.
                  </p>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2>What to Expect in Hospital</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-lg shadow-sm border">
                  <h3 className="text-lg font-semibold mb-3 text-blue-700">Immediate Post-Operative Care</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li>• ICU observation initially</li>
                    <li>• Pain control and early mobilization as appropriate</li>
                    <li>• Imaging within the first 24–72 hours to assess extent of resection</li>
                    <li>• Close neurological monitoring</li>
                  </ul>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-sm border">
                  <h3 className="text-lg font-semibold mb-3 text-blue-700">Recovery Planning</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li>• Multidisciplinary plan for adjuvant therapy if indicated</li>
                    <li>• Rehab planning for speech/physical/occupational therapy</li>
                    <li>• Medication management and seizure control</li>
                    <li>• Family education and support</li>
                  </ul>
                </div>
              </div>
            </section>

            <OutcomeMetricsSection procedure="Brain Tumor Surgery" />

            {brainStory ? (
              <section className="mb-8">
                <h2>Patient Story Highlight</h2>
                <div className="bg-white border border-blue-100 rounded-xl shadow-sm p-6">
                  <p className="text-sm font-semibold text-blue-600 uppercase tracking-wide">{brainStory.procedure}</p>
                  <h3 className="text-2xl font-bold text-blue-900 mt-2">{brainStory.title}</h3>
                  <blockquote className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded mt-4">
                    <p className="text-blue-900 italic">“{brainStory.quote}”</p>
                    <footer className="mt-2 text-sm text-blue-700">— {brainStory.patientInitials}</footer>
                  </blockquote>
                  <p className="text-gray-700 mt-4">{brainStory.summary}</p>
                  <ul className="mt-4 space-y-2 text-sm text-gray-700">
                    {brainStory.outcomes.slice(0, 3).map((item) => (
                      <li key={item} className="flex items-start">
                        <span className="mt-1 mr-2 inline-flex h-2 w-2 rounded-full bg-blue-500" aria-hidden />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <Link
                    href={`/patient-stories/${brainStory.slug}`}
                    className="mt-4 inline-flex items-center text-blue-600 font-semibold hover:text-blue-700"
                  >
                    Read full story
                    <span aria-hidden className="ml-2">→</span>
                  </Link>
                </div>
              </section>
            ) : null}

            <section className="mb-8">
              <h2>Risks and Complications</h2>
              <p>
                Risks vary by tumor type and location. We discuss individualized risk-benefit and alternatives before any decision:
              </p>
              <div className="grid md:grid-cols-2 gap-6 mt-4">
                <div className="bg-red-50 p-6 rounded-lg shadow-sm border">
                  <h3 className="text-lg font-semibold mb-3 text-red-700">Surgical Risks</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li>• Bleeding, infection, seizures</li>
                    <li>• CSF leak or fluid collection</li>
                    <li>• New or worsened neurological deficits</li>
                    <li>• Speech/weakness/vision changes</li>
                  </ul>
                </div>
                <div className="bg-orange-50 p-6 rounded-lg shadow-sm border">
                  <h3 className="text-lg font-semibold mb-3 text-orange-700">Medical Risks</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li>• Venous thrombosis</li>
                    <li>• Medical/anesthetic complications</li>
                    <li>• Prolonged hospital stay</li>
                    <li>• Need for additional procedures</li>
                  </ul>
                </div>
              </div>
              <p className="mt-4">
                <strong>Important:</strong> Dr Sayuj uses advanced techniques to minimize these risks and maximize your safety. Every precaution is taken to ensure the best possible outcome.
              </p>
            </section>

            <section className="mb-8">
              <h2>Recovery and Return to Activity</h2>
              <p>
                <strong>Typical ranges (individualized for each patient):</strong>
              </p>
              <div className="space-y-4 mt-4">
                <div className="flex items-start">
                  <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-4 mt-1">1</div>
                  <div>
                    <h3 className="font-semibold">Hospital Stay</h3>
                    <p>A few days to over a week depending on complexity, tumor type, and recovery progress.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-4 mt-1">2</div>
                  <div>
                    <h3 className="font-semibold">First 2 Weeks</h3>
                    <p>Wound care, rest, gentle walking. Focus on healing and gradual activity increase.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-4 mt-1">3</div>
                  <div>
                    <h3 className="font-semibold">Weeks 2–6</h3>
                    <p>Gradual return to routine; driving and desk work depend on recovery and seizure control.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-4 mt-1">4</div>
                  <div>
                    <h3 className="font-semibold">Adjuvant Therapy</h3>
                    <p>Coordinated with oncology and radiation oncology when indicated for comprehensive care.</p>
                  </div>
                </div>
              </div>
              <div className="mt-6 p-4 bg-red-50 rounded-lg">
                <p className="text-sm text-red-800">
                  <strong>Red flags:</strong> Fever, severe headache, confusion, new weakness/speech problems, 
                  wound drainage—contact the team urgently.
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h2>Alternatives and Adjuncts</h2>
              <div className="space-y-6">
                <div className="bg-white p-6 rounded-lg shadow-sm border">
                  <h3 className="text-lg font-semibold mb-3 text-blue-700">Radiosurgery (Gamma Knife)</h3>
                  <p>
                    Non-incisional, outpatient treatment suitable for small/deep lesions or selected vestibular schwannomas/meningiomas/metastases. This may be preferred for certain tumor types or locations.
                  </p>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm border">
                  <h3 className="text-lg font-semibold mb-3 text-blue-700">Biopsy Procedures</h3>
                  <p>
                    Open biopsy or stereotactic biopsy when resection is unsafe. This allows for tissue diagnosis to guide treatment planning without the risks of major surgery.
                  </p>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm border">
                  <h3 className="text-lg font-semibold mb-3 text-blue-700">Radiation/Chemotherapy</h3>
                  <p>
                    Per tumor type (e.g., gliomas, metastases) guided by tumor board. Often used in combination with surgery for optimal outcomes.
                  </p>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2>Costs and Insurance</h2>
              <div className="bg-green-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold mb-3 text-green-700">Insurance Coverage</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• Most indicated procedures are covered after pre-authorization</li>
                  <li>• Written estimates provided after evaluation and imaging review</li>
                  <li>• Final costs depend on room category, ICU needs, adjuvant therapy coordination</li>
                  <li>• We work with most major insurance providers and TPAs</li>
                </ul>
              </div>
            </section>

            <section className="mb-8">
              <h2>Why Choose Dr. Sayuj Krishnan</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-lg shadow-sm border">
                  <h3 className="text-lg font-semibold mb-3 text-blue-700">Experience & Expertise</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li>• Experience with neuronavigation-guided microsurgery</li>
                    <li>• Safety-first protocols and advanced techniques</li>
                    <li>• 15+ years of neurosurgical experience</li>
                  </ul>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-sm border">
                  <h3 className="text-lg font-semibold mb-3 text-blue-700">Patient Care</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li>• Honest counseling on expected outcomes</li>
                    <li>• Clear recovery and rehab timelines</li>
                    <li>• Multidisciplinary coordination for comprehensive care</li>
                  </ul>
                </div>
              </div>
            </section>

            <section id="faqs" className="mb-8">
              <h2>Frequently Asked Questions</h2>
              <div className="space-y-6">
                <div className="bg-white p-6 rounded-lg shadow-sm border">
                  <h3 className="text-lg font-semibold mb-3 text-blue-700">Do all brain tumors need surgery?</h3>
                  <p>
                    No. Some are observed or treated with radiosurgery/radiation/chemotherapy depending on type and location. 
                    Each case is evaluated individually to determine the best treatment approach.
                  </p>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm border">
                  <h3 className="text-lg font-semibold mb-3 text-blue-700">How soon will I recover?</h3>
                  <p>
                    Simple cases may discharge in a few days; complex cases and functional deficits may require longer stays and rehab. 
                    Recovery is individualized based on tumor type, location, and your overall health.
                  </p>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm border">
                  <h3 className="text-lg font-semibold mb-3 text-blue-700">Will I need radiation or chemotherapy after surgery?</h3>
                  <p>
                    It depends on the tumor type and final pathology. We coordinate a tumor board plan if needed, 
                    involving oncologists and radiation specialists for comprehensive care.
                  </p>
                </div>
              </div>
            </section>

            <section className="mb-8 bg-blue-50 p-6 rounded-lg text-center">
              <h3 className="text-lg font-semibold mb-4">Ready to Discuss Your Brain Tumor Treatment Options?</h3>
              <p className="mb-4">
                Dr Sayuj Krishnan provides expert evaluation and personalized treatment plans for brain tumors.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href="/appointments" className="bg-blue-600 text-white px-6 py-3 rounded-full hover:bg-blue-700 transition-colors">
                  Book Consultation
                </a>
                <a href="/about" className="border-2 border-blue-600 text-blue-600 px-6 py-3 rounded-full hover:bg-blue-600 hover:text-white transition-colors">
                  About Dr Sayuj
                </a>
              </div>
            </section>

            <section className="mb-8">
              <TeleconsultationForm pageSlug="/services/brain-tumor-surgery-hyderabad" service="Brain Tumor Surgery" />
            </section>

            <section className="mb-8">
              <h2>Clinic details</h2>
              <NAP />
            </section>

            <section className="mb-8">
              <h2>Medical disclaimer</h2>
              <p>Educational only; not medical advice. Decisions require clinical exam and comprehensive review.</p>
            </section>
          </div>
        </article>

        <RelatedContent items={relatedItems} />

        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "MedicalWebPage",
              "mainEntityOfPage": "https://www.drsayuj.com/services/brain-tumor-surgery-hyderabad",
              "name": "Brain Tumor Surgery in Hyderabad | Microsurgery & Radiosurgery",
              "description": "Neuronavigation-guided brain tumor surgery with neuromonitoring and multidisciplinary care in Hyderabad. When surgery is recommended, risks, recovery, and alternatives.",
              "medicalSpecialty": "Neurosurgery",
              "about": {
                "@type": "MedicalProcedure",
                "name": "Brain Tumor Surgery",
                "indication": [{"@type": "MedicalIndication", "name": "Brain tumor"}]
              },
              "author": { "@id": `${SITE_URL}/#physician` },
              "publisher": { "@id": `${SITE_URL}/#organization` },
              "datePublished": "2023-01-01T00:00:00+05:30",
              "dateModified": new Date().toISOString(),
              "breadcrumb": {
                "@type": "BreadcrumbList",
                "itemListElement": [
                  {
                    "@type": "ListItem",
                    "position": 1,
                    "name": "Home",
                    "item": SITE_URL
                  },
                  {
                    "@type": "ListItem",
                    "position": 2,
                    "name": "Services",
                    "item": `${SITE_URL}/services/`
                  },
                  {
                    "@type": "ListItem",
                    "position": 3,
                    "name": "Brain Tumor Surgery",
                    "item": `${SITE_URL}/services/brain-tumor-surgery-hyderabad/`
                  }
                ]
              },
              "potentialAction": {
                "@type": "SeekToAction",
                "target": `${SITE_URL}/appointments`,
                "queryInput": "required name=query"
              },
              "hasPart": [
                {
                  "@type": "FAQPage",
                  "mainEntity": [
                    {
                      "@type": "Question",
                      "name": "Do all brain tumors need surgery?",
                      "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "No. Some are observed or treated with radiosurgery/radiation/chemotherapy depending on type and location. Each case is evaluated individually to determine the best treatment approach."
                      }
                    },
                    {
                      "@type": "Question",
                      "name": "How soon will I recover?",
                      "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "Simple cases may discharge in a few days; complex cases and functional deficits may require longer stays and rehab. Recovery is individualized based on tumor type, location, and your overall health."
                      }
                    },
                    {
                      "@type": "Question",
                      "name": "Will I need radiation or chemotherapy after surgery?",
                      "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "It depends on the tumor type and final pathology. We coordinate a tumor board plan if needed, involving oncologists and radiation specialists for comprehensive care."
                      }
                    }
                  ]
                }
              ]
            })
          }}
        />
      </main>
    </>
  );
}
