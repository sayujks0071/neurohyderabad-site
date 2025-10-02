import { SITE_URL, webPageJsonLd, serviceJsonLd, medicalGuidelineJsonLd, physicianJsonLd, breadcrumbJsonLd, contactPointJsonLd, procedureJsonLd, itemListJsonLd, idFor } from "../../../src/lib/seo";
import type { Metadata } from "next";
import RelatedContent from "../../../components/RelatedContent";
import Breadcrumbs from "../../components/Breadcrumbs";

export const metadata: Metadata = {
  title: "Radiosurgery (Gamma Knife) in Hyderabad",
  description: "Non‑incisional radiosurgery for selected brain tumors and trigeminal neuralgia in Hyderabad. Indications, benefits/risks, recovery, and insurance guidance. Book a consult.",
  keywords: [
    'radiosurgery hyderabad',
    'gamma knife hyderabad',
    'stereotactic radiosurgery hyderabad',
    'brain tumor radiosurgery hyderabad',
    'trigeminal neuralgia radiosurgery hyderabad',
    'non-invasive brain surgery hyderabad'
  ],
  openGraph: {
    images: [
      {
        url: `${SITE_URL}/api/og?title=${encodeURIComponent("Radiosurgery (Gamma Knife) in Hyderabad")}&subtitle=${encodeURIComponent("Non-Incisional • Brain Tumors & Trigeminal Neuralgia")}`,
        width: 1200,
        height: 630,
        alt: "Radiosurgery (Gamma Knife) - Dr Sayuj Krishnan",
      },
    ],
  },
  alternates: {
    canonical: "/services/radiosurgery-gamma-knife-hyderabad/",
    languages: {
      'en-IN': 'https://www.drsayuj.com/services/radiosurgery-gamma-knife-hyderabad/',
      'x-default': 'https://www.drsayuj.com/services/radiosurgery-gamma-knife-hyderabad/'
    }
  }
};

// ISR: Revalidate every 24 hours
export const revalidate = 86400;

export default function RadiosurgeryGammaKnifePage() {
  const serviceSchema = {
    "@context":"https://schema.org",
    "@type":"MedicalService",
    "@id":"https://www.drsayuj.com/services/radiosurgery-gamma-knife-hyderabad/#service",
    "name":"Radiosurgery (Gamma Knife)",
    "description":"Non-incisional stereotactic radiosurgery for selected brain tumors, AVMs, and trigeminal neuralgia in Hyderabad.",
    "url":"https://www.drsayuj.com/services/radiosurgery-gamma-knife-hyderabad/",
    "areaServed":{"@type":"City","name":"Hyderabad"},
    "provider":{"@id":"https://www.drsayuj.com/#physician"},
    "availableChannel":{"@type":"ServiceChannel","serviceUrl":"https://www.drsayuj.com/appointments/"},
    "audience":{"@type":"MedicalAudience","audienceType":["Brain tumors","AVM","Trigeminal neuralgia"]}
  };

  const faqSchema = {
    "@context":"https://schema.org",
    "@type":"FAQPage",
    "mainEntity":[
      {"@type":"Question","name":"What conditions does radiosurgery treat?","acceptedAnswer":{"@type":"Answer","text":"Selected brain metastases, vestibular schwannoma, meningioma, AVMs, and trigeminal neuralgia—based on imaging and multidisciplinary review."}},
      {"@type":"Question","name":"How soon will I see results?","acceptedAnswer":{"@type":"Answer","text":"Tumor control is assessed over months with MRI. Trigeminal neuralgia pain relief may take weeks after treatment."}},
      {"@type":"Question","name":"Is radiosurgery covered by insurance?","acceptedAnswer":{"@type":"Answer","text":"Yes, often covered for indicated cases with pre-authorization. We provide a written estimate after evaluation."}}
    ]
  };

  const breadcrumbSchema = {
    "@context":"https://schema.org",
    "@type":"BreadcrumbList",
    "itemListElement":[
      {"@type":"ListItem","position":1,"name":"Home","item":"https://www.drsayuj.com/"},
      {"@type":"ListItem","position":2,"name":"Services","item":"https://www.drsayuj.com/services/"},
      {"@type":"ListItem","position":3,"name":"Radiosurgery (Gamma Knife) in Hyderabad","item":"https://www.drsayuj.com/services/radiosurgery-gamma-knife-hyderabad/"}
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
            { name: 'Radiosurgery (Gamma Knife) in Hyderabad', href: '/services/radiosurgery-gamma-knife-hyderabad/' }
          ]} 
        />
        
        <article className="prose lg:prose-lg mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">
            Radiosurgery (Gamma Knife) in Hyderabad
          </h1>
          
          <p className="text-gray-700 mb-8">
            Stereotactic radiosurgery (SRS), often known as Gamma Knife, delivers highly focused radiation to selected brain targets without an incision. It's used for certain small brain tumors, metastases, vestibular schwannomas, arteriovenous malformations (AVMs), and trigeminal neuralgia. Suitability depends on size, location, diagnosis, and overall health.
          </p>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Who may benefit</h2>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>Brain metastases (selected sizes and number)</li>
              <li>Benign tumors such as vestibular schwannoma and some meningiomas</li>
              <li>Arteriovenous malformations (AVMs) in selected cases</li>
              <li>Trigeminal neuralgia (nerve root entry zone target)</li>
            </ul>
            <p className="text-gray-700 mt-4">
              We confirm diagnosis, size, and exact location with imaging and multidisciplinary review to determine if SRS is appropriate.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Planning and procedure</h2>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>Imaging (MRI ± CT) for precise target mapping</li>
              <li>Frame or frameless positioning system</li>
              <li>Outpatient, non-incisional treatment; actual beam-on time varies by target</li>
              <li>Post-procedure observation and discharge instructions</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Benefits and risks</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-green-50 border-l-4 border-green-400 p-4">
                <h3 className="font-semibold text-green-800 mb-2">Potential Benefits</h3>
                <ul className="list-disc pl-6 space-y-1 text-green-700">
                  <li>No incision, minimal downtime for most patients</li>
                  <li>Outpatient or day-care workflow</li>
                  <li>Option for lesions in deep or eloquent locations not amenable to open surgery</li>
                </ul>
              </div>
              <div className="bg-red-50 border-l-4 border-red-400 p-4">
                <h3 className="font-semibold text-red-800 mb-2">Risks/Limitations</h3>
                <ul className="list-disc pl-6 space-y-1 text-red-700">
                  <li>Delayed response: tumor control may take months; TN pain relief may take weeks</li>
                  <li>Edema/swelling risk requiring medications; rare radiation necrosis</li>
                  <li>Not suitable for all lesion sizes/types; may require staged or alternative therapy</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Recovery and follow-up</h2>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>Most patients resume light activity within 24–48 hours</li>
              <li>MRI follow-up at defined intervals to track response</li>
              <li>TN patients receive a taper plan for medicines as pain control evolves</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">When SRS may not be preferred</h2>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>Large tumors needing rapid decompression or causing mass effect</li>
              <li>Lesions requiring tissue diagnosis (biopsy/resection)</li>
              <li>TN cases where MVD is safer/better aligned with goals and MRI shows vascular compression</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Costs and insurance (Hyderabad)</h2>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>Typically covered for indicated cases after pre-authorization</li>
              <li>Written estimate after evaluation and imaging review</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Why choose Dr Sayuj Krishnan</h2>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>Experience across surgical and non-surgical options with multidisciplinary planning</li>
              <li>Safety-first counseling with clear expectations and follow-up schedules</li>
            </ul>
          </section>

          <section className="mb-8 text-center">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Book a Consultation</h2>
            <p className="text-gray-700 mb-6">
              We'll help you decide between microsurgery, radiosurgery, or combined approaches based on diagnosis and goals. Book a consultation at Yashoda Hospitals – Malakpet and bring your MRI and reports for a personalized plan.
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
              <li><a href="/services/brain-tumor-surgery-hyderabad/" className="hover:text-blue-800">Brain Tumor Surgery</a></li>
              <li><a href="/conditions/trigeminal-neuralgia-treatment-hyderabad/" className="hover:text-blue-800">Trigeminal Neuralgia Treatment</a></li>
              <li><a href="/appointments/" className="hover:text-blue-800">Appointments</a></li>
            </ul>
          </section>

          <section className="mb-8 border-t pt-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">References</h2>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>
                <a href="https://www.cancer.gov/about-cancer/treatment/types/radiation-therapy/stereotactic" className="text-blue-600 hover:text-blue-800" target="_blank" rel="noopener noreferrer">
                  NCI: Stereotactic Radiosurgery
                </a>
              </li>
              <li>
                <a href="https://www.aans.org/patients/conditions-and-treatments/gamma-knife" className="text-blue-600 hover:text-blue-800" target="_blank" rel="noopener noreferrer">
                  AANS: Gamma Knife
                </a>
              </li>
              <li>
                <a href="https://www.nhs.uk/conditions/radiotherapy/what-happens/radiosurgery/" className="text-blue-600 hover:text-blue-800" target="_blank" rel="noopener noreferrer">
                  NHS: Radiosurgery
                </a>
              </li>
              <li>
                <a href="https://www.mayoclinic.org/tests-procedures/gamma-knife-radiosurgery" className="text-blue-600 hover:text-blue-800" target="_blank" rel="noopener noreferrer">
                  Mayo Clinic: Gamma Knife
                </a>
              </li>
            </ul>
          </section>

          <section className="border-t pt-6">
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
              <h3 className="font-semibold text-yellow-800 mb-2">Disclaimer</h3>
              <p className="text-yellow-700 text-sm">
                Educational only; not a substitute for medical advice. Treatment is individualized. Outcomes vary; no guarantees.
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
              title: "Microvascular Decompression (MVD)", 
              description: "Microsurgical treatment for classic trigeminal neuralgia",
              href: "/services/microvascular-decompression-mvd-hyderabad/",
              category: "procedure" as const
            },
            { 
              title: "Brain Tumor Surgery", 
              description: "Neuronavigation-guided microsurgery with neuromonitoring",
              href: "/services/brain-tumor-surgery-hyderabad/",
              category: "procedure" as const
            },
            { 
              title: "Trigeminal Neuralgia Treatment", 
              description: "Comprehensive treatment options for trigeminal neuralgia",
              href: "/conditions/trigeminal-neuralgia-treatment-hyderabad/",
              category: "condition" as const
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

