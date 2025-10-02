import { SITE_URL, webPageJsonLd, serviceJsonLd, medicalGuidelineJsonLd, physicianJsonLd, breadcrumbJsonLd, contactPointJsonLd, procedureJsonLd, itemListJsonLd, idFor } from "../../src/lib/seo";
import type { Metadata } from "next";
import RelatedContent from "../../../components/RelatedContent";
import Breadcrumbs from "../../components/Breadcrumbs";

export const metadata: Metadata = {
  title: "Cervical Radiculopathy Treatment in Hyderabad",
  description: "Causes, symptoms, diagnosis, and stepwise care for cervical radiculopathy in Hyderabad—from medicines and physio to endoscopic cervical discectomy/foraminotomy when indicated.",
  keywords: [
    'cervical radiculopathy treatment hyderabad',
    'neck pain arm pain hyderabad',
    'cervical disc herniation hyderabad',
    'endoscopic cervical discectomy hyderabad',
    'cervical foraminotomy hyderabad',
    'neck nerve compression hyderabad'
  ],
  openGraph: {
    images: [
      {
        url: `${SITE_URL}/api/og?title=${encodeURIComponent("Cervical Radiculopathy Treatment in Hyderabad")}&subtitle=${encodeURIComponent("Neck & Arm Pain Relief • Stepwise Care")}`,
        width: 1200,
        height: 630,
        alt: "Cervical Radiculopathy Treatment - Dr Sayuj Krishnan",
      },
    ],
  },
  alternates: {
    canonical: "/conditions/cervical-radiculopathy-treatment-hyderabad/",
    languages: {
      'en-IN': 'https://www.drsayuj.com/conditions/cervical-radiculopathy-treatment-hyderabad/',
      'x-default': 'https://www.drsayuj.com/conditions/cervical-radiculopathy-treatment-hyderabad/'
    }
  }
};

// ISR: Revalidate every 24 hours
export const revalidate = 86400;

export default function CervicalRadiculopathyTreatmentPage() {
  const medicalWebPageSchema = {
    "@context": "https://schema.org",
    "@type": "MedicalWebPage",
    "mainEntityOfPage": "https://www.drsayuj.com/conditions/cervical-radiculopathy-treatment-hyderabad/",
    "url": "https://www.drsayuj.com/conditions/cervical-radiculopathy-treatment-hyderabad/",
    "name": "Cervical Radiculopathy Treatment in Hyderabad",
    "description": "Causes, symptoms, diagnosis, and stepwise care for cervical radiculopathy in Hyderabad—from conservative care to endoscopic decompression when indicated.",
    "datePublished": "2025-10-01",
    "dateModified": "2025-10-01",
    "about": {
      "@type": "MedicalCondition",
      "name": "Cervical Radiculopathy",
      "signOrSymptom": ["Neck pain","Arm pain","Numbness","Weakness"],
      "possibleTreatment": [
        {"@type": "MedicalTherapy", "name": "Physiotherapy"},
        {"@type": "MedicalTherapy", "name": "Medication"},
        {"@type": "MedicalProcedure", "name": "Endoscopic cervical discectomy"},
        {"@type": "MedicalProcedure", "name": "Foraminotomy"},
        {"@type": "MedicalProcedure", "name": "ACDF (fusion)"}
      ]
    },
    "provider": { "@id": "https://www.drsayuj.com/#physician" }
  };

  const faqSchema = {
    "@context":"https://schema.org",
    "@type":"FAQPage",
    "mainEntity":[
      {"@type":"Question","name":"Will this go away on its own?","acceptedAnswer":{"@type":"Answer","text":"Many cases improve with conservative care. If pain or weakness persists, we reassess for decompression options."}},
      {"@type":"Question","name":"Is endoscopic always better than fusion?","acceptedAnswer":{"@type":"Answer","text":"Not always. If instability or broad removal is needed, ACDF may be safer. We tailor the approach to your MRI and goals."}},
      {"@type":"Question","name":"How long until I can work?","acceptedAnswer":{"@type":"Answer","text":"Desk work often 2–4 weeks; manual roles 4–8+ weeks with a graded plan."}}
    ]
  };

  const breadcrumbSchema = {
    "@context":"https://schema.org",
    "@type":"BreadcrumbList",
    "itemListElement":[
      {"@type":"ListItem","position":1,"name":"Home","item":"https://www.drsayuj.com/"},
      {"@type":"ListItem","position":2,"name":"Conditions","item":"https://www.drsayuj.com/conditions/"},
      {"@type":"ListItem","position":3,"name":"Cervical Radiculopathy Treatment in Hyderabad","item":"https://www.drsayuj.com/conditions/cervical-radiculopathy-treatment-hyderabad/"}
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
            { name: 'Home', href: '/' },
            { name: 'Conditions', href: '/conditions/' },
            { name: 'Cervical Radiculopathy Treatment in Hyderabad', href: '/conditions/cervical-radiculopathy-treatment-hyderabad/' }
          ]} 
        />
        
        <article className="prose lg:prose-lg mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">
            Cervical Radiculopathy Treatment in Hyderabad: Symptoms, Diagnosis, and Options
          </h1>
          
          <p className="text-gray-700 mb-8">
            Cervical radiculopathy happens when a neck nerve is pinched, causing pain that travels into the arm, with numbness or weakness in the shoulder, arm, or hand. Most patients improve with conservative care. If pain persists or weakness appears, minimally invasive or endoscopic decompression may be considered—based on MRI, symptoms, and safety.
          </p>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Symptoms and red flags</h2>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>Neck pain with arm pain, tingling, or numbness in a specific nerve pattern</li>
              <li>Weak grip, difficulty lifting the arm, or fine‑motor clumsiness</li>
              <li>Pain worse with certain neck movements; relief with rest or support</li>
            </ul>
            <div className="bg-red-50 border-l-4 border-red-400 p-4 mt-4">
              <h3 className="font-semibold text-red-800 mb-2">Urgent review needed if you notice:</h3>
              <p className="text-red-700">Fever with neck pain, rapidly worsening weakness, gait imbalance, or bowel/bladder issues.</p>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Common causes</h2>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>Cervical disc herniation pressing on a nerve root</li>
              <li>Foraminal stenosis from bone spurs and ligament thickening</li>
              <li>Less commonly: cysts, prior surgery changes, or instability</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">How we diagnose</h2>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>Clinical exam: strength, sensation, reflexes, Spurling test, gait</li>
              <li>MRI: shows nerve compression level/side; X‑rays for alignment or instability</li>
              <li>When needed: diagnostic/therapeutic injections to localize the pain source</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Conservative treatment (first line)</h2>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>Medicines: short courses as appropriate; nerve pain control when indicated</li>
              <li>Physiotherapy: posture correction, deep neck flexor training, scapular/shoulder strengthening, neural mobility</li>
              <li>Ergonomics: screen height, phone/laptop setup, frequent micro‑breaks</li>
              <li>Activity modification: avoid prolonged flexion; graded walking and gentle mobility</li>
            </ul>
            <p className="text-gray-700 mt-4">
              Reassess after a defined trial. If pain persists or weakness progresses, we discuss intervention.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Interventional options (case‑by‑case)</h2>
            
            <div className="space-y-6">
              <div className="border-l-4 border-blue-500 pl-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Endoscopic cervical discectomy (posterior approach in selected cases)</h3>
                <p className="text-gray-700">
                  Through a tiny incision, the herniated fragment is removed under endoscopic visualization to free the nerve, aiming to preserve motion where feasible.
                </p>
              </div>

              <div className="border-l-4 border-green-500 pl-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Endoscopic/microscopic foraminotomy</h3>
                <p className="text-gray-700">
                  Enlarges the nerve's exit corridor if foraminal narrowing is the main issue.
                </p>
              </div>

              <div className="border-l-4 border-purple-500 pl-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">ACDF (Anterior Cervical Discectomy and Fusion)</h3>
                <p className="text-gray-700">
                  Considered when broader removal and stabilization are safer or necessary; reduces motion at the treated level.
                </p>
              </div>
            </div>
            
            <p className="text-gray-700 mt-4">
              We recommend the approach that safely achieves decompression for your anatomy and goals.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Recovery timeline (typical ranges; individualized)</h2>
            <div className="space-y-4">
              <div className="border-l-4 border-blue-500 pl-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Day 0–2</h3>
                <p className="text-gray-700">Gentle walking; support the neck; avoid extreme ranges</p>
              </div>
              <div className="border-l-4 border-green-500 pl-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Week 1</h3>
                <p className="text-gray-700">Light self‑care; short desk tasks with frequent micro‑breaks</p>
              </div>
              <div className="border-l-4 border-yellow-500 pl-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Weeks 2–4</h3>
                <p className="text-gray-700">Resume desk work as tolerated; begin guided rehab after review</p>
              </div>
              <div className="border-l-4 border-purple-500 pl-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Weeks 4–8</h3>
                <p className="text-gray-700">Gradual return to field/manual work with a structured plan</p>
              </div>
            </div>
            <div className="bg-red-50 border-l-4 border-red-400 p-4 mt-4">
              <h3 className="font-semibold text-red-800 mb-2">Red flags</h3>
              <p className="text-red-700">Fever, worsening weakness, new gait imbalance, or wound issues—contact the clinic promptly.</p>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Costs and insurance (Hyderabad)</h2>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>Many policies cover indicated in‑patient procedures after pre‑authorization</li>
              <li>Day‑care may be possible for selected endoscopic cases</li>
              <li>Written estimates follow your evaluation and policy review</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Local care and access</h2>
            <p className="text-gray-700">
              Patients visit us from Malakpet, Koti, Charminar, Himayat Nagar, Banjara Hills, and Hitech City. Bring prior imaging to reduce duplicate tests.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">FAQs</h2>
            <div className="space-y-4">
              <div className="bg-blue-50 border-l-4 border-blue-400 p-4">
                <h3 className="font-semibold text-blue-800 mb-2">Will this go away on its own?</h3>
                <p className="text-blue-700">Many improve with medicines, physiotherapy, and ergonomics. If pain or weakness persists, we reassess for decompression.</p>
              </div>
              <div className="bg-green-50 border-l-4 border-green-400 p-4">
                <h3 className="font-semibold text-green-800 mb-2">Is endoscopic always better than fusion?</h3>
                <p className="text-green-700">Not always. If instability or broader removal is needed, ACDF may be safer. We tailor the approach to your MRI and goals.</p>
              </div>
              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
                <h3 className="font-semibold text-yellow-800 mb-2">How long until I can work?</h3>
                <p className="text-yellow-700">Desk work often 2–4 weeks; manual roles 4–8+ weeks with a graded plan.</p>
              </div>
            </div>
          </section>

          <section className="mb-8 text-center">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Book a Consultation</h2>
            <p className="text-gray-700 mb-6">
              Book a consultation at Yashoda Hospitals – Malakpet. Bring your MRI and medication list to plan safe, stepwise recovery.
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
              <li><a href="/services/endoscopic-cervical-discectomy-hyderabad/" className="hover:text-blue-800">Endoscopic Cervical Discectomy</a></li>
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
                  NHS — Cervical radiculopathy
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
                Educational content only; treatment decisions are individualized after exam and imaging. No outcome is guaranteed.
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
              title: "Endoscopic Cervical Discectomy", 
              description: "Motion-preserving endoscopic cervical discectomy for selected radiculopathy cases",
              href: "/services/endoscopic-cervical-discectomy-hyderabad/",
              category: "procedure" as const
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

