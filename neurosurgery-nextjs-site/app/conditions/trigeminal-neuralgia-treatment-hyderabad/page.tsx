import { SITE_URL, webPageJsonLd, serviceJsonLd, medicalGuidelineJsonLd, physicianJsonLd, breadcrumbJsonLd, contactPointJsonLd, procedureJsonLd, itemListJsonLd, idFor } from "../../../src/lib/seo";
import type { Metadata } from "next";
import RelatedContent from "../../../components/RelatedContent";
import Breadcrumbs from "../../components/Breadcrumbs";

export const metadata: Metadata = {
  title: "Trigeminal Neuralgia Treatment in Hyderabad",
  description: "Medication optimization, microvascular decompression (MVD), radiosurgery, and percutaneous options for trigeminal neuralgia in Hyderabad. Evidence‑based, individualized care.",
  keywords: [
    'trigeminal neuralgia treatment hyderabad',
    'facial pain treatment hyderabad',
    'microvascular decompression hyderabad',
    'MVD surgery hyderabad',
    'radiosurgery hyderabad',
    'trigeminal neuralgia surgery'
  ],
  openGraph: {
    images: [
      {
        url: `${SITE_URL}/api/og?title=${encodeURIComponent("Trigeminal Neuralgia Treatment in Hyderabad")}&subtitle=${encodeURIComponent("Facial Pain Relief • MVD & Radiosurgery")}`,
        width: 1200,
        height: 630,
        alt: "Trigeminal Neuralgia Treatment - Dr. Sayuj Krishnan",
      },
    ],
  },
  alternates: {
    canonical: "/conditions/trigeminal-neuralgia-treatment-hyderabad/",
    languages: {
      'en-IN': 'https://www.drsayuj.com/conditions/trigeminal-neuralgia-treatment-hyderabad/',
      'x-default': 'https://www.drsayuj.com/conditions/trigeminal-neuralgia-treatment-hyderabad/'
    }
  }
};

// ISR: Revalidate every 24 hours
export const revalidate = 86400;

export default function TrigeminalNeuralgiaTreatmentPage() {
  const medicalWebPageSchema = {
    "@context": "https://schema.org",
    "@type": "MedicalWebPage",
    "mainEntityOfPage": "https://www.drsayuj.com/conditions/trigeminal-neuralgia-treatment-hyderabad/",
    "url": "https://www.drsayuj.com/conditions/trigeminal-neuralgia-treatment-hyderabad/",
    "name": "Trigeminal Neuralgia Treatment in Hyderabad",
    "description": "Medication optimization, microvascular decompression, radiosurgery, and percutaneous options for trigeminal neuralgia in Hyderabad.",
    "datePublished": "2025-10-01",
    "dateModified": "2025-10-01",
    "about": {
      "@type": "MedicalCondition",
      "name": "Trigeminal Neuralgia",
      "signOrSymptom": ["Facial pain","Triggered by touch/chewing","Shock-like attacks"],
      "possibleTreatment": [
        {"@type": "MedicalTherapy", "name": "Medication (carbamazepine, oxcarbazepine)"},
        {"@type": "MedicalProcedure", "name": "Microvascular decompression"},
        {"@type": "MedicalProcedure", "name": "Stereotactic radiosurgery"},
        {"@type": "MedicalProcedure", "name": "Percutaneous rhizotomy"}
      ]
    },
    "provider": { "@id": "https://www.drsayuj.com/#physician" }
  };

  const faqSchema = {
    "@context":"https://schema.org",
    "@type":"FAQPage",
    "mainEntity":[
      {"@type":"Question","name":"Which treatment is best for me?","acceptedAnswer":{"@type":"Answer","text":"It depends on MRI findings, age/health, medication response, and preferences. Options include medicines, MVD, radiosurgery, and percutaneous procedures."}},
      {"@type":"Question","name":"Does radiosurgery work immediately?","acceptedAnswer":{"@type":"Answer","text":"Pain relief can take weeks. It is non-incisional with minimal initial downtime."}},
      {"@type":"Question","name":"What are MVD risks?","acceptedAnswer":{"@type":"Answer","text":"Risks include infection, bleeding, CSF leak, hearing changes, facial weakness, stroke (rare), and anesthesia risks."}}
    ]
  };

  const breadcrumbSchema = {
    "@context":"https://schema.org",
    "@type":"BreadcrumbList",
    "itemListElement":[
      {"@type":"ListItem","position":1,"name":"Home","item":"https://www.drsayuj.com/"},
      {"@type":"ListItem","position":2,"name":"Conditions","item":"https://www.drsayuj.com/conditions/"},
      {"@type":"ListItem","position":3,"name":"Trigeminal Neuralgia Treatment in Hyderabad","item":"https://www.drsayuj.com/conditions/trigeminal-neuralgia-treatment-hyderabad/"}
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(medicalWebPageSchema)
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
            { label: 'Home', href: '/' },
            { label: 'Conditions', href: '/conditions/' },
            { label: 'Trigeminal Neuralgia Treatment in Hyderabad', href: '/conditions/trigeminal-neuralgia-treatment-hyderabad/' }
          ]} 
        />
        
        <article className="prose lg:prose-lg mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">
            Trigeminal Neuralgia Treatment in Hyderabad: Medicines, MVD, and Radiosurgery
          </h1>
          
          <p className="text-gray-700 mb-8">
            Trigeminal neuralgia (TN) causes sudden, electric shock–like facial pain in one or more branches of the trigeminal nerve. Attacks can be triggered by touch, chewing, or even wind. Most patients start with medicines. If pain persists or side effects limit dosing, procedures such as microvascular decompression (MVD), stereotactic radiosurgery, or percutaneous rhizotomy may help—chosen to fit your MRI, health, and goals.
          </p>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Symptoms</h2>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>Severe, brief, stabbing facial pain, often unilateral</li>
              <li>Triggered by light touch, brushing teeth, shaving, or chewing</li>
              <li>Pain‑free intervals between attacks (typical TN); less typical variants can be more constant</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Diagnosis</h2>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>Clinical history and exam</li>
              <li>MRI (with sequences to assess for vascular contact/compression and to rule out other causes such as multiple sclerosis)</li>
              <li>Dental and ENT evaluations when indicated to exclude local pathology</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Stepwise treatment</h2>
            
            <div className="space-y-6">
              <div className="border-l-4 border-blue-500 pl-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">1) Medicines (first line)</h3>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li>Carbamazepine or oxcarbazepine are commonly used; others may include baclofen or lamotrigine in select cases.</li>
                  <li>Monitoring: blood counts, sodium, drug interactions, and side effects per guidelines.</li>
                </ul>
              </div>

              <div className="border-l-4 border-green-500 pl-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">2) Microvascular decompression (MVD)</h3>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li>For classic TN with vascular compression in medically fit patients.</li>
                  <li>Goal: separate the offending vessel from the nerve with a cushion, aiming to treat the root cause.</li>
                  <li>Benefits: high rates of durable pain control in suitable candidates; no nerve injury intended.</li>
                  <li>Risks: infection, bleeding, CSF leak, hearing changes, facial weakness, stroke (rare but serious), anesthesia risks.</li>
                </ul>
              </div>

              <div className="border-l-4 border-yellow-500 pl-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">3) Stereotactic radiosurgery (Gamma Knife)</h3>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li>Non‑incisional outpatient option that focuses radiation on the nerve root entry zone.</li>
                  <li>Pain relief can be delayed by weeks; some develop facial numbness.</li>
                </ul>
              </div>

              <div className="border-l-4 border-purple-500 pl-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">4) Percutaneous rhizotomy (radiofrequency/balloon/glycerol)</h3>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li>Image‑guided procedures targeting the nerve for pain relief.</li>
                  <li>Often used when rapid relief is needed, or when surgery/radiosurgery is unsuitable.</li>
                  <li>Trade‑off: higher chance of facial numbness; durability varies.</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Choosing the right option</h2>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>MRI findings (vascular loop vs none)</li>
              <li>Age, comorbidities, and anesthesia fitness</li>
              <li>Pain pattern, side effects from medicines, and personal preferences</li>
            </ul>
            <p className="text-gray-700 mt-4">
              We discuss the benefits, risks, and expected timelines for each route, then individualize your plan.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Recovery timelines (typical ranges)</h2>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-blue-50 border-l-4 border-blue-400 p-4">
                <h3 className="font-semibold text-blue-800 mb-2">MVD</h3>
                <p className="text-blue-700">2–4 days in hospital; gradual return to routine in 2–3 weeks if recovery is smooth.</p>
              </div>
              <div className="bg-green-50 border-l-4 border-green-400 p-4">
                <h3 className="font-semibold text-green-800 mb-2">Radiosurgery</h3>
                <p className="text-green-700">Day‑care; pain relief may take weeks; minimal down time initially.</p>
              </div>
              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
                <h3 className="font-semibold text-yellow-800 mb-2">Percutaneous</h3>
                <p className="text-yellow-700">Usually day‑care; rapid recovery; facial numbness is more common.</p>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Costs and insurance (Hyderabad)</h2>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>Medicines are OPD costs; procedures are typically covered for indicated cases after pre‑authorization.</li>
              <li>Written estimates provided after evaluation and MRI review.</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">When to seek urgent care</h2>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>Persistent fever, severe headache, fluid from incision (after MVD)</li>
              <li>New neurological deficits (double vision, weakness), or uncontrolled pain</li>
            </ul>
          </section>

          <section className="mb-8 text-center">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Book a Consultation</h2>
            <p className="text-gray-700 mb-6">
              TN is highly treatable. We'll help you optimize medicines and discuss MVD, radiosurgery, or percutaneous options when appropriate. Book a consultation at Yashoda Hospitals – Malakpet and bring your MRI and medication list for a personalized plan.
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
              <li><a href="/appointments/" className="hover:text-blue-800">Appointments</a></li>
              <li><a href="/services/" className="hover:text-blue-800">Services</a></li>
              <li><a href="/conditions/" className="hover:text-blue-800">Conditions</a></li>
            </ul>
            <p className="text-gray-600 mt-4 text-sm">
              <em>Future service pages: Microvascular Decompression, Radiosurgery (when created)</em>
            </p>
          </section>

          <section className="mb-8 border-t pt-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">References</h2>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>
                <a href="https://www.aan.com/Guidelines/Home/ByTopic?topicId=15" className="text-blue-600 hover:text-blue-800" target="_blank" rel="noopener noreferrer">
                  AAN guideline summaries on trigeminal neuralgia
                </a>
              </li>
              <li>
                <a href="https://www.ninds.nih.gov/health-information/disorders" className="text-blue-600 hover:text-blue-800" target="_blank" rel="noopener noreferrer">
                  NINDS — Health Information
                </a>
              </li>
              <li>
                <a href="https://www.nhs.uk/conditions/trigeminal-neuralgia/" className="text-blue-600 hover:text-blue-800" target="_blank" rel="noopener noreferrer">
                  NHS — Trigeminal Neuralgia
                </a>
              </li>
              <li>
                <a href="https://www.mayoclinic.org/diseases-conditions/trigeminal-neuralgia" className="text-blue-600 hover:text-blue-800" target="_blank" rel="noopener noreferrer">
                  Mayo Clinic — Trigeminal Neuralgia
                </a>
              </li>
            </ul>
          </section>

          <section className="border-t pt-6">
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
              <h3 className="font-semibold text-yellow-800 mb-2">Disclaimer</h3>
              <p className="text-yellow-700 text-sm">
                Educational content only; decisions are individualized after evaluation and imaging. Risks and benefits vary by patient.
              </p>
            </div>
          </section>

          <div className="mt-8 text-sm text-gray-500 text-center">
            <p>Last medically reviewed: October 1, 2025 — Medical reviewer: Dr. Sayuj Krishnan, MBBS, MS, MCh (Neurosurgery)</p>
          </div>
        </article>

        <RelatedContent 
          services={[
            { title: "Brain Tumor Surgery", href: "/services/brain-tumor-surgery-hyderabad/" },
            { title: "Epilepsy Surgery", href: "/services/epilepsy-surgery-hyderabad/" }
          ]}
          conditions={[
            { title: "Spinal Stenosis Treatment", href: "/conditions/spinal-stenosis-treatment-hyderabad/" },
            { title: "Sciatica Treatment", href: "/conditions/sciatica-treatment-hyderabad/" }
          ]}
        />
      </main>
    </>
  );
}