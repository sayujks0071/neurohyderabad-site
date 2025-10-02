import { SITE_URL, webPageJsonLd, serviceJsonLd, medicalGuidelineJsonLd, physicianJsonLd, breadcrumbJsonLd, contactPointJsonLd, procedureJsonLd, itemListJsonLd, idFor } from "../../../src/lib/seo";
import type { Metadata } from "next";
import RelatedContent from "../../../components/RelatedContent";
import Breadcrumbs from "../../components/Breadcrumbs";

export const metadata: Metadata = {
  title: "Endoscopic Cervical Discectomy in Hyderabad",
  description: "Motion‑preserving endoscopic cervical discectomy for selected radiculopathy cases in Hyderabad. Who qualifies, benefits/risks, recovery, and day‑care eligibility. Book a consultation.",
  keywords: [
    'endoscopic cervical discectomy hyderabad',
    'cervical radiculopathy surgery hyderabad',
    'neck pain surgery hyderabad',
    'cervical disc herniation surgery',
    'minimally invasive cervical surgery hyderabad',
    'cervical foraminotomy hyderabad'
  ],
  openGraph: {
    images: [
      {
        url: `${SITE_URL}/api/og?title=${encodeURIComponent("Endoscopic Cervical Discectomy in Hyderabad")}&subtitle=${encodeURIComponent("Neck & Arm Pain Relief • Tiny incision")}`,
        width: 1200,
        height: 630,
        alt: "Endoscopic Cervical Discectomy - Dr Sayuj Krishnan",
      },
    ],
  },
  alternates: {
    canonical: "/services/endoscopic-cervical-discectomy-hyderabad/",
    languages: {
      'en-IN': 'https://www.drsayuj.com/services/endoscopic-cervical-discectomy-hyderabad/',
      'x-default': 'https://www.drsayuj.com/services/endoscopic-cervical-discectomy-hyderabad/'
    }
  }
};

// ISR: Revalidate every 24 hours
export const revalidate = 86400;

export default function EndoscopicCervicalDiscectomyPage() {
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "MedicalService",
    "@id": "https://www.drsayuj.com/services/endoscopic-cervical-discectomy-hyderabad/#service",
    "name": "Endoscopic Cervical Discectomy",
    "description": "Motion-preserving endoscopic cervical discectomy for selected radiculopathy cases in Hyderabad.",
    "url": "https://www.drsayuj.com/services/endoscopic-cervical-discectomy-hyderabad/",
    "areaServed": { "@type": "City", "name": "Hyderabad" },
    "provider": { "@id": "https://www.drsayuj.com/#physician" },
    "availableChannel": { "@type": "ServiceChannel", "serviceUrl": "https://www.drsayuj.com/appointments/" },
    "audience": { "@type": "MedicalAudience", "audienceType": ["Cervical radiculopathy","Neck and arm pain"] }
  };

  const faqSchema = {
    "@context":"https://schema.org",
    "@type":"FAQPage",
    "mainEntity":[
      {"@type":"Question","name":"Who is a candidate for endoscopic cervical discectomy?","acceptedAnswer":{"@type":"Answer","text":"Patients with MRI-confirmed soft disc herniation matching symptoms, after conservative care, and anatomy suitable for safe endoscopic access."}},
      {"@type":"Question","name":"How does it compare with ACDF?","acceptedAnswer":{"@type":"Answer","text":"Endoscopic aims to preserve motion in selected cases; ACDF fuses the level and is chosen when broader removal or stabilization is safer."}},
      {"@type":"Question","name":"What is the typical recovery time?","acceptedAnswer":{"@type":"Answer","text":"Desk work often resumes in 2–4 weeks; manual roles may take 4–8+ weeks with a graded plan, individualized by exam and symptoms."}}
    ]
  };

  const breadcrumbSchema = {
    "@context":"https://schema.org",
    "@type":"BreadcrumbList",
    "itemListElement":[
      {"@type":"ListItem","position":1,"name":"Home","item":"https://www.drsayuj.com/"},
      {"@type":"ListItem","position":2,"name":"Services","item":"https://www.drsayuj.com/services/"},
      {"@type":"ListItem","position":3,"name":"Endoscopic Cervical Discectomy in Hyderabad","item":"https://www.drsayuj.com/services/endoscopic-cervical-discectomy-hyderabad/"}
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
            { name: 'Endoscopic Cervical Discectomy in Hyderabad', href: '/services/endoscopic-cervical-discectomy-hyderabad/' }
          ]} 
        />
        
        <article className="prose lg:prose-lg mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">
            Endoscopic Cervical Discectomy in Hyderabad
          </h1>
          
          <p className="text-gray-700 mb-8">
            Endoscopic cervical discectomy is a tiny‑incision technique to remove a herniated fragment pressing on a cervical nerve root in selected patients. The goal is to free the nerve with minimal disruption and, when feasible, preserve normal motion. It is not suitable for everyone; your MRI and symptoms guide the safest approach.
          </p>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Who is a candidate?</h2>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>MRI‑confirmed soft disc herniation matching arm pain/numbness/weakness</li>
              <li>Limited response to appropriate conservative care</li>
              <li>No gross instability or deformity requiring fusion</li>
              <li>Anatomy that allows safe endoscopic access (posterior foraminotomy/discectomy corridor)</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">How the procedure works</h2>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>A small incision is made; a working channel is placed under imaging guidance.</li>
              <li>The endoscope provides magnified visualization of the foramen/disc space.</li>
              <li>The herniated fragment is carefully removed to decompress the nerve.</li>
              <li>If visualization/access is inadequate for safety, we may convert to a microscopic approach after informed consent.</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Endoscopic vs ACDF/Microdiscectomy</h2>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-blue-50 border-l-4 border-blue-400 p-4">
                <h3 className="font-semibold text-blue-800 mb-2">Endoscopic (posterior)</h3>
                <p className="text-blue-700">Tiny incision; aims to preserve motion; suitable for selected herniations/foraminal stenosis.</p>
              </div>
              <div className="bg-green-50 border-l-4 border-green-400 p-4">
                <h3 className="font-semibold text-green-800 mb-2">Microdiscectomy/Foraminotomy</h3>
                <p className="text-green-700">Similar goals via microscope; small incision.</p>
              </div>
              <div className="bg-purple-50 border-l-4 border-purple-400 p-4">
                <h3 className="font-semibold text-purple-800 mb-2">ACDF</h3>
                <p className="text-purple-700">Anterior approach with fusion; chosen when broader removal and stabilization are safer or needed.</p>
              </div>
            </div>
            <p className="text-gray-700 mt-4">
              We recommend the option that safely achieves decompression for your anatomy and goals.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Benefits and risks</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-green-50 border-l-4 border-green-400 p-4">
                <h3 className="font-semibold text-green-800 mb-2">Potential Benefits</h3>
                <ul className="list-disc pl-6 space-y-1 text-green-700">
                  <li>Small incision</li>
                  <li>Minimal muscle disruption</li>
                  <li>Earlier mobilization in selected cases</li>
                  <li>Possible day‑care discharge</li>
                </ul>
              </div>
              <div className="bg-red-50 border-l-4 border-red-400 p-4">
                <h3 className="font-semibold text-red-800 mb-2">Risks</h3>
                <ul className="list-disc pl-6 space-y-1 text-red-700">
                  <li>Infection, bleeding</li>
                  <li>Nerve injury</li>
                  <li>CSF leak</li>
                  <li>Persistent or recurrent symptoms</li>
                  <li>Neck stiffness</li>
                  <li>Conversion to another approach for safety</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Recovery and return to work (typical ranges; individualized)</h2>
            <div className="space-y-4">
              <div className="border-l-4 border-blue-500 pl-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Day 0</h3>
                <p className="text-gray-700">Short assisted walks; neck support as instructed</p>
              </div>
              <div className="border-l-4 border-green-500 pl-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Week 1</h3>
                <p className="text-gray-700">Light desk tasks with micro‑breaks; wound care</p>
              </div>
              <div className="border-l-4 border-yellow-500 pl-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Weeks 2–4</h3>
                <p className="text-gray-700">Gradual return to desk work; begin guided rehab after review</p>
              </div>
              <div className="border-l-4 border-purple-500 pl-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Weeks 4–8</h3>
                <p className="text-gray-700">Progressive activity; manual roles with graded plan</p>
              </div>
            </div>
            <div className="bg-red-50 border-l-4 border-red-400 p-4 mt-4">
              <h3 className="font-semibold text-red-800 mb-2">Red flags</h3>
              <p className="text-red-700">Fever, worsening weakness, new gait imbalance, wound drainage—contact the clinic promptly.</p>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Costs and insurance (Hyderabad)</h2>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>Many policies cover indicated in‑patient procedures after pre‑authorization</li>
              <li>Day‑care may apply to selected patients; room category and policy caps affect final bill</li>
              <li>A written estimate follows evaluation and policy review</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Why choose Dr Sayuj Krishnan</h2>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>Expertise in endoscopic and minimally invasive cervical decompression</li>
              <li>Safety‑first protocols with clear counseling and structured follow‑up</li>
              <li>Patients visit from Malakpet, Koti, Charminar, Himayat Nagar, Banjara Hills, Gachibowli, and Secunderabad</li>
            </ul>
          </section>

          <section className="mb-8 text-center">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Book a Consultation</h2>
            <p className="text-gray-700 mb-6">
              We'll help you choose the safest, most effective option—endoscopic, microscopic, or fusion—based on your MRI and goals. Book a consultation at Yashoda Hospitals – Malakpet and bring your MRI for a personalized plan.
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
              <li><a href="/conditions/cervical-radiculopathy-treatment-hyderabad/" className="hover:text-blue-800">Cervical Radiculopathy Treatment</a></li>
              <li><a href="/services/endoscopic-foraminotomy-hyderabad/" className="hover:text-blue-800">Endoscopic Foraminotomy</a></li>
              <li><a href="/services/minimally-invasive-spine-surgery/" className="hover:text-blue-800">Minimally Invasive Spine Surgery</a></li>
              <li><a href="/appointments/" className="hover:text-blue-800">Appointments</a></li>
            </ul>
          </section>

          <section className="mb-8 border-t pt-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">References</h2>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>
                <a href="https://www.aans.org/patients/conditions-and-treatments" className="text-blue-600 hover:text-blue-800" target="_blank" rel="noopener noreferrer">
                  AANS — Conditions and Treatments
                </a>
              </li>
              <li>
                <a href="https://www.ninds.nih.gov/health-information/disorders" className="text-blue-600 hover:text-blue-800" target="_blank" rel="noopener noreferrer">
                  NINDS — Health Information
                </a>
              </li>
              <li>
                <a href="https://www.nhs.uk/conditions/neck-pain-and-stiff-neck/" className="text-blue-600 hover:text-blue-800" target="_blank" rel="noopener noreferrer">
                  NHS — Neck/arm pain
                </a>
              </li>
              <li>
                <a href="https://www.mayoclinic.org/diseases-conditions/pinched-nerve" className="text-blue-600 hover:text-blue-800" target="_blank" rel="noopener noreferrer">
                  Mayo Clinic — Pinched nerve
                </a>
              </li>
            </ul>
          </section>

          <section className="border-t pt-6">
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
              <h3 className="font-semibold text-yellow-800 mb-2">Disclaimer</h3>
              <p className="text-yellow-700 text-sm">
                Educational content only; treatment decisions are individualized after exam and imaging. Outcomes vary; no guarantees.
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
              title: "Cervical Radiculopathy Treatment", 
              description: "Comprehensive treatment options for cervical radiculopathy",
              href: "/conditions/cervical-radiculopathy-treatment-hyderabad/",
              category: "condition" as const
            },
            { 
              title: "Endoscopic Foraminotomy", 
              description: "Targeted endoscopic decompression for foraminal stenosis",
              href: "/services/endoscopic-foraminotomy-hyderabad/",
              category: "procedure" as const
            },
            { 
              title: "Minimally Invasive Spine Surgery", 
              description: "Comprehensive minimally invasive spine surgery options",
              href: "/services/minimally-invasive-spine-surgery/",
              category: "procedure" as const
            },
            { 
              title: "Spinal Stenosis Treatment", 
              description: "Comprehensive treatment options for spinal stenosis",
              href: "/conditions/spinal-stenosis-treatment-hyderabad/",
              category: "condition" as const
            },
            { 
              title: "Sciatica Treatment", 
              description: "Stepwise treatment approach for sciatica relief",
              href: "/conditions/sciatica-treatment-hyderabad/",
              category: "condition" as const
            }
          ]}
        />
      </main>
    </>
  );
}