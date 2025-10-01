import { SITE_URL, webPageJsonLd, serviceJsonLd, medicalGuidelineJsonLd, physicianJsonLd, breadcrumbJsonLd, contactPointJsonLd, procedureJsonLd, itemListJsonLd, idFor } from "../../../src/lib/seo";
import type { Metadata } from "next";
import RelatedContent from "../../../components/RelatedContent";
import Breadcrumbs from "../../components/Breadcrumbs";

export const metadata: Metadata = {
  title: "Microvascular Decompression (MVD) in Hyderabad",
  description: "MVD for trigeminal neuralgia in Hyderabad—who qualifies, MRI planning, benefits/risks vs radiosurgery and percutaneous options, recovery, and insurance. Book a consult.",
  keywords: [
    'microvascular decompression hyderabad',
    'MVD trigeminal neuralgia hyderabad',
    'trigeminal neuralgia surgery hyderabad',
    'facial pain surgery hyderabad',
    'microvascular decompression cost hyderabad',
    'trigeminal neuralgia treatment hyderabad'
  ],
  openGraph: {
    images: [
      {
        url: `${SITE_URL}/api/og?title=${encodeURIComponent("Microvascular Decompression (MVD) in Hyderabad")}&subtitle=${encodeURIComponent("Trigeminal Neuralgia • Microsurgical Treatment")}`,
        width: 1200,
        height: 630,
        alt: "Microvascular Decompression (MVD) - Dr Sayuj Krishnan",
      },
    ],
  },
  alternates: {
    canonical: "/services/microvascular-decompression-mvd-hyderabad/",
    languages: {
      'en-IN': 'https://www.drsayuj.com/services/microvascular-decompression-mvd-hyderabad/',
      'x-default': 'https://www.drsayuj.com/services/microvascular-decompression-mvd-hyderabad/'
    }
  }
};

// ISR: Revalidate every 24 hours
export const revalidate = 86400;

export default function MicrovascularDecompressionPage() {
  const serviceSchema = {
    "@context":"https://schema.org",
    "@type":"MedicalService",
    "@id":"https://www.drsayuj.com/services/microvascular-decompression-mvd-hyderabad/#service",
    "name":"Microvascular Decompression (MVD)",
    "description":"Microsurgical treatment for classic trigeminal neuralgia in Hyderabad when MRI shows vascular compression and medicines are insufficient.",
    "url":"https://www.drsayuj.com/services/microvascular-decompression-mvd-hyderabad/",
    "areaServed":{"@type":"City","name":"Hyderabad"},
    "provider":{"@id":"https://www.drsayuj.com/#physician"},
    "availableChannel":{"@type":"ServiceChannel","serviceUrl":"https://www.drsayuj.com/appointments/"},
    "audience":{"@type":"MedicalAudience","audienceType":["Trigeminal neuralgia"]}
  };

  const faqSchema = {
    "@context":"https://schema.org",
    "@type":"FAQPage",
    "mainEntity":[
      {"@type":"Question","name":"Who is a candidate for MVD?","acceptedAnswer":{"@type":"Answer","text":"Patients with classic trigeminal neuralgia, MRI evidence of vascular compression, persistent pain or medication side effects, and fitness for anesthesia."}},
      {"@type":"Question","name":"What are MVD risks?","acceptedAnswer":{"@type":"Answer","text":"Risks include bleeding, infection, CSF leak, hearing changes, facial weakness or numbness, stroke (rare), and anesthesia risks."}},
      {"@type":"Question","name":"What are the alternatives to MVD?","acceptedAnswer":{"@type":"Answer","text":"Radiosurgery and percutaneous rhizotomy are alternatives; medication optimization may also help. Choice depends on MRI, health, and preferences."}}
    ]
  };

  const breadcrumbSchema = {
    "@context":"https://schema.org",
    "@type":"BreadcrumbList",
    "itemListElement":[
      {"@type":"ListItem","position":1,"name":"Home","item":"https://www.drsayuj.com/"},
      {"@type":"ListItem","position":2,"name":"Services","item":"https://www.drsayuj.com/services/"},
      {"@type":"ListItem","position":3,"name":"Microvascular Decompression (MVD) in Hyderabad","item":"https://www.drsayuj.com/services/microvascular-decompression-mvd-hyderabad/"}
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(serviceSchema)
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema)
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema)
        }}
      />
      
      <main className="container mx-auto px-4 py-16 max-w-4xl">
        <Breadcrumbs 
          items={[
            { name: 'Home', href: '/' },
            { name: 'Services', href: '/services/' },
            { name: 'Microvascular Decompression (MVD) in Hyderabad', href: '/services/microvascular-decompression-mvd-hyderabad/' }
          ]} 
        />
        
        <article className="prose lg:prose-lg mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">
            Microvascular Decompression (MVD) in Hyderabad
          </h1>
          
          <p className="text-gray-700 mb-8">
            Microvascular decompression (MVD) is a microsurgical procedure used in selected patients with classic trigeminal neuralgia (TN), where a blood vessel presses on the trigeminal nerve. The goal is to separate the vessel from the nerve using a small cushion, aiming for durable pain relief without intentionally injuring the nerve. Suitability depends on your symptoms, MRI findings, and overall fitness.
          </p>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Who is a candidate?</h2>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>Classic, shock-like facial pain in V1/V2/V3 distributions with pain-free intervals</li>
              <li>MRI suggests vascular contact/compression at the trigeminal root entry zone</li>
              <li>Adequate trial of medicines (e.g., carbamazepine/oxcarbazepine) with persistent pain or side effects</li>
              <li>Medically fit for general anesthesia and craniotomy</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Pre-operative workup</h2>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>Clinical evaluation to confirm TN pattern and rule out other causes</li>
              <li>MRI brain with trigeminal sequences to assess vascular compression and exclude secondary causes</li>
              <li>Anesthesia assessment and optimization of comorbidities</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">How MVD works (summary)</h2>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>Small craniotomy behind the ear under general anesthesia</li>
              <li>Microscope-guided separation of the offending artery/vein from the nerve</li>
              <li>Placement of a cushion (e.g., Teflon) between vessel and nerve to prevent re-compression</li>
              <li>Closure and monitored recovery</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Benefits and risks</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-green-50 border-l-4 border-green-400 p-4">
                <h3 className="font-semibold text-green-800 mb-2">Potential Benefits</h3>
                <ul className="list-disc pl-6 space-y-1 text-green-700">
                  <li>High rates of durable pain control in appropriate candidates</li>
                  <li>Motion and sensation of the face are preserved (nerve not intentionally injured)</li>
                </ul>
              </div>
              <div className="bg-red-50 border-l-4 border-red-400 p-4">
                <h3 className="font-semibold text-red-800 mb-2">Risks</h3>
                <ul className="list-disc pl-6 space-y-1 text-red-700">
                  <li>Bleeding, infection, CSF leak</li>
                  <li>Hearing changes, facial weakness or numbness</li>
                  <li>Stroke (rare), anesthesia risks</li>
                  <li>Pain recurrence over time can occur</li>
                </ul>
              </div>
            </div>
            <p className="text-gray-700 mt-4">
              No surgery is risk-free. Alternatives exist if needed.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Alternatives we discuss</h2>
            <div className="space-y-4">
              <div className="border-l-4 border-blue-500 pl-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Stereotactic radiosurgery (Gamma Knife)</h3>
                <p className="text-gray-700">Non-incisional; pain relief may take weeks; facial numbness can occur</p>
              </div>
              <div className="border-l-4 border-green-500 pl-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Percutaneous procedures</h3>
                <p className="text-gray-700">Radiofrequency/balloon/glycerol rhizotomy: day-care; often rapid relief; higher chance of facial numbness; durability varies</p>
              </div>
              <div className="border-l-4 border-purple-500 pl-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Medication optimization</h3>
                <p className="text-gray-700">Dose adjustments or adjuncts when tolerated</p>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Recovery timeline (typical ranges; individualized)</h2>
            <div className="space-y-4">
              <div className="border-l-4 border-blue-500 pl-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Hospital</h3>
                <p className="text-gray-700">Usually 2–4 days</p>
              </div>
              <div className="border-l-4 border-green-500 pl-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">First 2 weeks</h3>
                <p className="text-gray-700">Rest, wound care, gentle walks; avoid heavy lifting/straining</p>
              </div>
              <div className="border-l-4 border-yellow-500 pl-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Weeks 2–4</h3>
                <p className="text-gray-700">Gradual return to routine; we taper medicines as appropriate</p>
              </div>
            </div>
            <div className="bg-red-50 border-l-4 border-red-400 p-4 mt-4">
              <h3 className="font-semibold text-red-800 mb-2">Red flags</h3>
              <p className="text-red-700">Fever, severe headache, wound fluid, hearing changes, double vision, new weakness—contact the team promptly.</p>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Costs and insurance (Hyderabad)</h2>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>Typically covered for indicated cases after pre-authorization</li>
              <li>Written estimate provided after evaluation and MRI review</li>
              <li>Final cost depends on room category, policy caps, and clinical needs</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Why choose Dr Sayuj Krishnan</h2>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>Expertise in TN evaluation and comprehensive management across MVD, radiosurgery, and percutaneous options</li>
              <li>Safety-first protocols and clear counseling on benefits/risks and alternatives</li>
              <li>Care at Yashoda Hospitals – Malakpet with structured follow-up</li>
            </ul>
          </section>

          <section className="mb-8 text-center">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Book a Consultation</h2>
            <p className="text-gray-700 mb-6">
              TN is highly treatable. We'll help you choose MVD, radiosurgery, or a percutaneous option based on your MRI and health. Book a consultation at Yashoda Hospitals – Malakpet and bring your MRI and medication list for a personalized plan.
            </p>
            <a
              href="/appointments/"
              className="inline-block bg-blue-600 text-white px-8 py-3 rounded-full hover:bg-blue-700 transition-colors text-lg font-semibold"
            >
              Book Consultation
            </a>
          </section>

          <section className="mb-8 border-t pt-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Internal links</h2>
            <ul className="list-disc pl-6 space-y-2 text-blue-600">
              <li><a href="/conditions/trigeminal-neuralgia-treatment-hyderabad/" className="hover:text-blue-800">Trigeminal Neuralgia Treatment</a></li>
              <li><a href="/appointments/" className="hover:text-blue-800">Appointments</a></li>
            </ul>
          </section>

          <section className="mb-8 border-t pt-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">References</h2>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>
                <a href="https://www.aans.org/patients/conditions-and-treatments/trigeminal-neuralgia" className="text-blue-600 hover:text-blue-800" target="_blank" rel="noopener noreferrer">
                  AANS: Trigeminal Neuralgia
                </a>
              </li>
              <li>
                <a href="https://www.ninds.nih.gov/health-information/disorders/trigeminal-neuralgia" className="text-blue-600 hover:text-blue-800" target="_blank" rel="noopener noreferrer">
                  NINDS: Trigeminal Neuralgia
                </a>
              </li>
              <li>
                <a href="https://www.nhs.uk/conditions/trigeminal-neuralgia/" className="text-blue-600 hover:text-blue-800" target="_blank" rel="noopener noreferrer">
                  NHS: Trigeminal Neuralgia
                </a>
              </li>
              <li>
                <a href="https://www.mayoclinic.org/diseases-conditions/trigeminal-neuralgia" className="text-blue-600 hover:text-blue-800" target="_blank" rel="noopener noreferrer">
                  Mayo Clinic: Trigeminal Neuralgia
                </a>
              </li>
            </ul>
          </section>

          <section className="border-t pt-6">
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
              <h3 className="font-semibold text-yellow-800 mb-2">Disclaimer</h3>
              <p className="text-yellow-700 text-sm">
                Educational only; not a substitute for medical advice. Treatment is individualized after clinical evaluation and imaging. Outcomes vary; no guarantees.
              </p>
            </div>
          </section>

          <div className="mt-8 text-sm text-gray-500 text-center">
            <p>Last medically reviewed: October 1, 2025 — Medical reviewer: Dr Sayuj Krishnan, MBBS, DNB Neurosurgery (Direct 6 years)</p>
          </div>
        </article>

        <RelatedContent 
          items={[
            { 
              title: "Trigeminal Neuralgia Treatment", 
              description: "Comprehensive treatment options for trigeminal neuralgia",
              href: "/conditions/trigeminal-neuralgia-treatment-hyderabad/",
              category: "condition" as const
            },
            { 
              title: "Radiosurgery (Gamma Knife)", 
              description: "Non-incisional radiosurgery for selected brain tumors and trigeminal neuralgia",
              href: "/services/radiosurgery-gamma-knife-hyderabad/",
              category: "procedure" as const
            },
            { 
              title: "Brain Tumor Surgery", 
              description: "Neuronavigation-guided microsurgery with neuromonitoring",
              href: "/services/brain-tumor-surgery-hyderabad/",
              category: "procedure" as const
            },
            { 
              title: "Minimally Invasive Spine Surgery", 
              description: "Comprehensive minimally invasive spine surgery options",
              href: "/services/minimally-invasive-spine-surgery/",
              category: "procedure" as const
            },
            { 
              title: "Endoscopic Cervical Discectomy", 
              description: "Motion-preserving endoscopic cervical discectomy for selected radiculopathy cases",
              href: "/services/endoscopic-cervical-discectomy-hyderabad/",
              category: "procedure" as const
            }
          ]}
        />
      </main>
    </>
  );
}
