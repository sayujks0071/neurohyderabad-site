import { SITE_URL, webPageJsonLd, serviceJsonLd, medicalGuidelineJsonLd, physicianJsonLd, breadcrumbJsonLd, contactPointJsonLd, procedureJsonLd, itemListJsonLd, idFor } from "../../../src/lib/seo";
import type { Metadata } from "next";
import RelatedContent from "../../../components/RelatedContent";
import Breadcrumbs from "../../components/Breadcrumbs";

export const metadata: Metadata = {
  title: "Endoscopic ULBD in Hyderabad | Lumbar Stenosis",
  description: "Tiny‑incision endoscopic ULBD for lumbar spinal stenosis in Hyderabad. Who qualifies, benefits/risks, recovery, and day‑care eligibility. Book a consultation.",
  keywords: [
    'endoscopic ULBD hyderabad',
    'unilateral laminotomy bilateral decompression',
    'lumbar spinal stenosis hyderabad',
    'minimally invasive spine surgery hyderabad',
    'neurogenic claudication treatment',
    'endoscopic spine surgery hyderabad'
  ],
  openGraph: {
    images: [
      {
        url: `${SITE_URL}/api/og?title=${encodeURIComponent("Endoscopic ULBD in Hyderabad")}&subtitle=${encodeURIComponent("Lumbar Stenosis • Tiny incision relief")}`,
        width: 1200,
        height: 630,
        alt: "Endoscopic ULBD - Dr. Sayuj Krishnan",
      },
    ],
  },
  alternates: {
    canonical: "/services/endoscopic-ulbd-hyderabad/",
    languages: {
      'en-IN': 'https://www.drsayuj.com/services/endoscopic-ulbd-hyderabad/',
      'x-default': 'https://www.drsayuj.com/services/endoscopic-ulbd-hyderabad/'
    }
  }
};

// ISR: Revalidate every 24 hours
export const revalidate = 86400;

export default function EndoscopicULBDPage() {
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "MedicalService",
    "@id": "https://www.drsayuj.com/services/endoscopic-ulbd-hyderabad/#service",
    "name": "Endoscopic ULBD (Unilateral Laminotomy for Bilateral Decompression)",
    "description": "Tiny-incision endoscopic ULBD for selected patients with lumbar spinal stenosis in Hyderabad.",
    "url": "https://www.drsayuj.com/services/endoscopic-ulbd-hyderabad/",
    "areaServed": { "@type": "City", "name": "Hyderabad" },
    "provider": { "@id": "https://www.drsayuj.com/#physician" },
    "availableChannel": { "@type": "ServiceChannel", "serviceUrl": "https://www.drsayuj.com/appointments/" },
    "audience": { "@type": "MedicalAudience", "audienceType": ["Lumbar spinal stenosis","Neurogenic claudication"] }
  };

  const faqSchema = {
    "@context":"https://schema.org",
    "@type":"FAQPage",
    "mainEntity":[
      {"@type":"Question","name":"Who is a candidate for endoscopic ULBD?","acceptedAnswer":{"@type":"Answer","text":"Patients with MRI-confirmed central/lateral recess stenosis and limited function despite conservative care, without significant instability or deformity."}},
      {"@type":"Question","name":"Is endoscopic better than microscopic ULBD?","acceptedAnswer":{"@type":"Answer","text":"Not always. We choose the approach that safely achieves adequate decompression for your anatomy."}},
      {"@type":"Question","name":"What is the typical recovery time?","acceptedAnswer":{"@type":"Answer","text":"Walking begins day 0; desk work often resumes in 2–4 weeks; manual roles may take 4–8+ weeks with a graded plan."}}
    ]
  };

  const breadcrumbSchema = {
    "@context":"https://schema.org",
    "@type":"BreadcrumbList",
    "itemListElement":[
      {"@type":"ListItem","position":1,"name":"Home","item":"https://www.drsayuj.com/"},
      {"@type":"ListItem","position":2,"name":"Services","item":"https://www.drsayuj.com/services/"},
      {"@type":"ListItem","position":3,"name":"Endoscopic ULBD in Hyderabad","item":"https://www.drsayuj.com/services/endoscopic-ulbd-hyderabad/"}
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
            { name: 'Endoscopic ULBD in Hyderabad', href: '/services/endoscopic-ulbd-hyderabad/' }
          ]} 
        />
        
        <article className="prose lg:prose-lg mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">
            Endoscopic ULBD (Unilateral Laminotomy for Bilateral Decompression) in Hyderabad
          </h1>
          
          <p className="text-gray-700 mb-8">
            Endoscopic ULBD is a minimally invasive technique for selected patients with lumbar spinal stenosis. Through a small incision on one side, we decompress both sides of the canal under endoscopic visualization, aiming to relieve pressure on the nerves while preserving stabilizing structures when feasible. Your MRI and symptoms guide whether ULBD is appropriate, and safety remains the first priority.
          </p>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Who is a candidate?</h2>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>Neurogenic claudication (leg pain/heaviness with walking, relief with sitting/leaning forward)</li>
              <li>MRI showing central or lateral recess stenosis at one or more levels</li>
              <li>Functional limitation despite appropriate conservative care (medicines, physiotherapy, posture training; injections in select cases)</li>
              <li>No significant instability or deformity that would change the surgical plan</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">How the procedure works</h2>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>A 6–8 mm incision is made on one side.</li>
              <li>Under X‑ray guidance, a working channel is placed.</li>
              <li>The endoscope provides magnified visualization; thickened ligament and bony overgrowth are removed to free the nerve canals on both sides.</li>
              <li>Hemostasis and closure follow; early walking is encouraged when safe.</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Benefits and risks</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-green-50 border-l-4 border-green-400 p-4">
                <h3 className="font-semibold text-green-800 mb-2">Potential Benefits</h3>
                <ul className="list-disc pl-6 space-y-1 text-green-700">
                  <li>Smaller incision</li>
                  <li>Less muscle disruption</li>
                  <li>Earlier mobilization in appropriate patients</li>
                  <li>Some qualify for day‑care discharge</li>
                </ul>
              </div>
              <div className="bg-red-50 border-l-4 border-red-400 p-4">
                <h3 className="font-semibold text-red-800 mb-2">Risks</h3>
                <ul className="list-disc pl-6 space-y-1 text-red-700">
                  <li>Infection, bleeding</li>
                  <li>Nerve/root injury</li>
                  <li>CSF leak</li>
                  <li>Incomplete relief</li>
                  <li>Recurrence</li>
                  <li>Conversion to alternative approach if safety requires</li>
                </ul>
              </div>
            </div>
            <p className="text-gray-700 mt-4">We discuss all alternatives in advance.</p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Endoscopic vs microscopic ULBD</h2>
            <p className="text-gray-700">
              Both approaches aim to decompress the canal. Endoscopic ULBD uses a tiny portal and camera; microscopic ULBD uses a small incision and operating microscope. We recommend the approach that safely achieves adequate decompression for your anatomy.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Recovery and return to work (typical ranges; individualized)</h2>
            <div className="space-y-4">
              <div className="border-l-4 border-blue-500 pl-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Day 0</h3>
                <p className="text-gray-700">Walk with supervision once fully awake.</p>
              </div>
              <div className="border-l-4 border-green-500 pl-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Week 1</h3>
                <p className="text-gray-700">Gentle walking; avoid heavy lifting, bending, twisting; incision care as advised.</p>
              </div>
              <div className="border-l-4 border-yellow-500 pl-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Weeks 2–4</h3>
                <p className="text-gray-700">Increase walking distance; begin guided core and hip‑glute rehab after wound check.</p>
              </div>
              <div className="border-l-4 border-purple-500 pl-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Weeks 4–8</h3>
                <p className="text-gray-700">Gradual return to field/manual work with a structured plan.</p>
              </div>
            </div>
            <div className="bg-red-50 border-l-4 border-red-400 p-4 mt-4">
              <h3 className="font-semibold text-red-800 mb-2">Red flags</h3>
              <p className="text-red-700">Fever, new/worsening weakness, wound drainage—contact the clinic promptly.</p>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Costs and insurance (Hyderabad)</h2>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>Many policies cover indicated in‑patient decompression after pre‑authorization.</li>
              <li>Day‑care can reduce costs in eligible cases; room category and policy caps influence the final bill.</li>
              <li>We provide a written estimate after your evaluation and MRI review.</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">When ULBD may not be preferred</h2>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>Significant instability or deformity on imaging</li>
              <li>Stenosis patterns requiring a different technique for safe, complete decompression</li>
              <li>Early in conservative care when non‑surgical therapy is likely to help</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Why choose Dr. Sayuj Krishnan</h2>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>Expertise in endoscopic and minimally invasive decompression techniques</li>
              <li>Safety‑first protocols with detailed pre‑op planning and structured follow‑up</li>
              <li>Patients visit from Malakpet, Koti, Charminar, Himayat Nagar, Abids, Secunderabad, Hitech City, Banjara Hills, Gachibowli, and LB Nagar</li>
            </ul>
          </section>

          <section className="mb-8 text-center">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Book a Consultation</h2>
            <p className="text-gray-700 mb-6">
              If walking distance is limited by spinal stenosis, we'll help confirm whether endoscopic ULBD or another approach is best for you. Book a consultation at Yashoda Hospitals – Malakpet and bring your MRI for a tailored plan and recovery timeline.
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
              <li><a href="/conditions/spinal-stenosis-treatment-hyderabad/" className="hover:text-blue-800">Spinal Stenosis Treatment</a></li>
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
                <a href="https://www.nhs.uk/conditions/spinal-stenosis/" className="text-blue-600 hover:text-blue-800" target="_blank" rel="noopener noreferrer">
                  NHS — Spinal Stenosis
                </a>
              </li>
              <li>
                <a href="https://www.mayoclinic.org/diseases-conditions/spinal-stenosis" className="text-blue-600 hover:text-blue-800" target="_blank" rel="noopener noreferrer">
                  Mayo Clinic — Spinal Stenosis
                </a>
              </li>
            </ul>
          </section>

          <section className="border-t pt-6">
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
              <h3 className="font-semibold text-yellow-800 mb-2">Disclaimer</h3>
              <p className="text-yellow-700 text-sm">
                Educational content only; treatment decisions are individualized after clinical evaluation and imaging review. No outcome is guaranteed.
              </p>
            </div>
          </section>

          <div className="mt-8 text-sm text-gray-500 text-center">
            <p>Last medically reviewed: October 1, 2025 — Medical reviewer: Dr. Sayuj Krishnan, MBBS, MS, MCh (Neurosurgery)</p>
          </div>
        </article>

        <RelatedContent 
          services={[
            { title: "Minimally Invasive Spine Surgery", href: "/services/minimally-invasive-spine-surgery/" },
            { title: "Endoscopic Discectomy", href: "/services/endoscopic-discectomy-hyderabad/" },
            { title: "Endoscopic Foraminotomy", href: "/services/endoscopic-foraminotomy-hyderabad/" }
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