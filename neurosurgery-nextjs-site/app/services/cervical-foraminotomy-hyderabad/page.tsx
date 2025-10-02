import { SITE_URL, webPageJsonLd, serviceJsonLd, medicalGuidelineJsonLd, physicianJsonLd, breadcrumbJsonLd, contactPointJsonLd, procedureJsonLd, itemListJsonLd, idFor } from "../../src/lib/seo";
import type { Metadata } from "next";
import RelatedContent from "../../../components/RelatedContent";
import Breadcrumbs from "../../components/Breadcrumbs";

export const metadata: Metadata = {
  title: "Cervical Foraminotomy in Hyderabad",
  description: "Endoscopic/microscopic cervical foraminotomy for arm pain from foraminal stenosis in Hyderabad. Who qualifies, benefits/risks, recovery, and day‑care eligibility. Book a consultation.",
  keywords: [
    'cervical foraminotomy hyderabad',
    'endoscopic cervical foraminotomy hyderabad',
    'microscopic cervical foraminotomy hyderabad',
    'cervical foraminal stenosis hyderabad',
    'arm pain surgery hyderabad',
    'cervical radiculopathy surgery hyderabad'
  ],
  openGraph: {
    images: [
      {
        url: `${SITE_URL}/api/og?title=${encodeURIComponent("Cervical Foraminotomy in Hyderabad")}&subtitle=${encodeURIComponent("Endoscopic & Microscopic Options • Arm Pain Relief")}`,
        width: 1200,
        height: 630,
        alt: "Cervical Foraminotomy - Dr Sayuj Krishnan",
      },
    ],
  },
  alternates: {
    canonical: "/services/cervical-foraminotomy-hyderabad/",
    languages: {
      'en-IN': 'https://www.drsayuj.com/services/cervical-foraminotomy-hyderabad/',
      'x-default': 'https://www.drsayuj.com/services/cervical-foraminotomy-hyderabad/'
    }
  }
};

// ISR: Revalidate every 24 hours
export const revalidate = 86400;

export default function CervicalForaminotomyPage() {
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "MedicalService",
    "@id": "https://www.drsayuj.com/services/cervical-foraminotomy-hyderabad/#service",
    "name": "Cervical Foraminotomy",
    "description": "Endoscopic and microscopic cervical foraminotomy for foraminal stenosis and radiculopathy in Hyderabad.",
    "url": "https://www.drsayuj.com/services/cervical-foraminotomy-hyderabad/",
    "areaServed": { "@type": "City", "name": "Hyderabad" },
    "provider": { "@id": "https://www.drsayuj.com/#physician" },
    "availableChannel": { "@type": "ServiceChannel", "serviceUrl": "https://www.drsayuj.com/appointments/" },
    "audience": { "@type": "MedicalAudience", "audienceType": ["Cervical radiculopathy","Foraminal stenosis"] }
  };

  const faqSchema = {
    "@context":"https://schema.org",
    "@type":"FAQPage",
    "mainEntity":[
      {"@type":"Question","name":"Who is a candidate for cervical foraminotomy?","acceptedAnswer":{"@type":"Answer","text":"Patients with MRI-confirmed foraminal stenosis or lateral disc herniation and persistent symptoms despite conservative care, without gross instability."}},
      {"@type":"Question","name":"Is endoscopic better than microscopic?","acceptedAnswer":{"@type":"Answer","text":"Not always. We choose the approach that safely reaches your nerve and achieves adequate decompression based on your anatomy."}},
      {"@type":"Question","name":"What is the typical recovery time?","acceptedAnswer":{"@type":"Answer","text":"Desk work often resumes in 2–4 weeks; manual roles may take 4–8+ weeks with a graded plan, individualized to your exam and progress."}}
    ]
  };

  const breadcrumbSchema = {
    "@context":"https://schema.org",
    "@type":"BreadcrumbList",
    "itemListElement":[
      {"@type":"ListItem","position":1,"name":"Home","item":"https://www.drsayuj.com/"},
      {"@type":"ListItem","position":2,"name":"Services","item":"https://www.drsayuj.com/services/"},
      {"@type":"ListItem","position":3,"name":"Cervical Foraminotomy in Hyderabad","item":"https://www.drsayuj.com/services/cervical-foraminotomy-hyderabad/"}
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
            { name: 'Cervical Foraminotomy in Hyderabad', href: '/services/cervical-foraminotomy-hyderabad/' }
          ]} 
        />
        
        <article className="prose lg:prose-lg mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">
            Cervical Foraminotomy in Hyderabad: Endoscopic and Microscopic Options
          </h1>
          
          <p className="text-gray-700 mb-8">
            Cervical foraminotomy enlarges the nerve's exit corridor (foramen) in the neck to relieve arm pain, numbness, or weakness caused by foraminal stenosis or a lateral cervical disc fragment. In selected patients, an endoscopic approach can achieve targeted decompression through a tiny incision; in others, a microscopic approach is preferred. Your MRI and exam guide the safest option.
          </p>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Who is a candidate?</h2>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>MRI‑confirmed foraminal stenosis or lateral/foraminal disc herniation matching symptoms</li>
              <li>Persistent pain or weakness despite appropriate conservative care (medicines, physiotherapy, ergonomic changes)</li>
              <li>No gross instability or deformity that would require fusion (ACDF)</li>
              <li>Anatomy that allows safe access to the foramen</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">How the procedure works</h2>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>Through a small posterior incision, a working channel is placed under imaging guidance.</li>
              <li>Endoscopic or microscopic visualization is used to remove impinging bone/soft tissue and free the nerve root.</li>
              <li>If visualization/access is inadequate for safety, conversion to an alternative approach is discussed in consent.</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Endoscopic vs microscopic vs ACDF</h2>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-blue-50 border-l-4 border-blue-400 p-4">
                <h3 className="font-semibold text-blue-800 mb-2">Endoscopic foraminotomy</h3>
                <p className="text-blue-700">Tiny incision, magnified camera view; aims to preserve motion when feasible.</p>
              </div>
              <div className="bg-green-50 border-l-4 border-green-400 p-4">
                <h3 className="font-semibold text-green-800 mb-2">Microscopic foraminotomy</h3>
                <p className="text-green-700">Small incision under microscope; used when access or anatomy favors microscope.</p>
              </div>
              <div className="bg-purple-50 border-l-4 border-purple-400 p-4">
                <h3 className="font-semibold text-purple-800 mb-2">ACDF (fusion)</h3>
                <p className="text-purple-700">Selected when broader removal and stabilization are safer or needed; reduces motion at the treated level.</p>
              </div>
            </div>
            <p className="text-gray-700 mt-4">
              We recommend the approach that safely achieves decompression for your anatomy and goals.
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
                  <li>Earlier mobilization for eligible patients</li>
                  <li>Some qualify for day‑care discharge</li>
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
            <p className="text-gray-700 mt-4">
              No surgery is risk‑free.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Recovery and return to work (typical; individualized)</h2>
            <div className="space-y-4">
              <div className="border-l-4 border-blue-500 pl-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Day 0</h3>
                <p className="text-gray-700">Short supervised walks; neck support as advised.</p>
              </div>
              <div className="border-l-4 border-green-500 pl-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Week 1</h3>
                <p className="text-gray-700">Light tasks at home; avoid heavy lifting, twisting, or extreme neck ranges.</p>
              </div>
              <div className="border-l-4 border-yellow-500 pl-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Weeks 2–4</h3>
                <p className="text-gray-700">Desk work as tolerated with micro‑breaks; begin guided rehab after review.</p>
              </div>
              <div className="border-l-4 border-purple-500 pl-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Weeks 4–8</h3>
                <p className="text-gray-700">Progressive activity; manual roles with a graded plan.</p>
              </div>
            </div>
            <div className="bg-red-50 border-l-4 border-red-400 p-4 mt-4">
              <h3 className="font-semibold text-red-800 mb-2">Red flags</h3>
              <p className="text-red-700">Fever, wound drainage, worsening weakness, new gait imbalance—contact the clinic promptly.</p>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Costs and insurance (Hyderabad)</h2>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>Many policies cover indicated in‑patient decompression with pre‑authorization.</li>
              <li>Day‑care may be possible in selected endoscopic cases.</li>
              <li>Final costs depend on room category and policy caps; we provide a written estimate after evaluation and MRI review.</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Why choose Dr Sayuj Krishnan</h2>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>Expertise across endoscopic and microscopic cervical decompressions and motion‑preserving strategies.</li>
              <li>Safety‑first protocols, clear counseling, and structured follow‑up at Yashoda Hospitals – Malakpet.</li>
              <li>Patients visit from Malakpet, Koti, Charminar, Himayat Nagar, Banjara Hills, Gachibowli, and Secunderabad.</li>
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
              <li><a href="/services/endoscopic-cervical-discectomy-hyderabad/" className="hover:text-blue-800">Endoscopic Cervical Discectomy</a></li>
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
                Educational content only; treatment decisions are individualized after clinical evaluation and imaging review. Outcomes vary; no guarantees.
              </p>
            </div>
          </section>

          <div className="mt-8 text-sm text-gray-500 text-center">
            <p>Last medically reviewed: October 1, 2025 — Medical reviewer: Dr Sayuj Krishnan, MBBS, DNB (Neurosurgery), Fellowship in Minimally Invasive and Advanced Spine Surgery.</p>
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
              title: "Endoscopic Cervical Discectomy", 
              description: "Motion-preserving endoscopic cervical discectomy for selected radiculopathy cases",
              href: "/services/endoscopic-cervical-discectomy-hyderabad/",
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

