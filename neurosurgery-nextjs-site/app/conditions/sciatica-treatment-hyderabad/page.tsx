import { Metadata } from 'next'
import { JsonLd } from '../../../src/lib/seo/jsonld'

export const metadata: Metadata = {
  title: 'Sciatica Treatment in Hyderabad',
  description: 'Causes, symptoms, diagnosis, and stepwise treatment for sciatica in Hyderabad—from medicines and physio to endoscopic discectomy when indicated. Book a consultation.',
  keywords: [
    'sciatica treatment hyderabad',
    'sciatica pain hyderabad',
    'endoscopic discectomy hyderabad',
    'sciatica symptoms hyderabad',
    'herniated disc treatment hyderabad',
    'nerve pain treatment hyderabad'
  ],
  openGraph: {
    title: 'Sciatica Treatment in Hyderabad',
    description: 'Causes, symptoms, diagnosis, and stepwise treatment for sciatica in Hyderabad—from conservative care to endoscopic discectomy when indicated.',
    url: 'https://www.drsayuj.com/conditions/sciatica-treatment-hyderabad/',
    type: 'website',
    images: [
      {
        url: 'https://www.drsayuj.com/images/og-default.jpg',
        width: 1200,
        height: 630,
        alt: 'Sciatica Treatment - Dr. Sayuj Krishnan'
      }
    ]
  },
  alternates: {
    canonical: 'https://www.drsayuj.com/conditions/sciatica-treatment-hyderabad/',
    languages: {
      'en-IN': 'https://www.drsayuj.com/conditions/sciatica-treatment-hyderabad/',
      'x-default': 'https://www.drsayuj.com/conditions/sciatica-treatment-hyderabad/'
    }
  }
}

const medicalWebPageSchema = {
  "@context": "https://schema.org",
  "@type": "MedicalWebPage",
  "mainEntityOfPage": "https://www.drsayuj.com/conditions/sciatica-treatment-hyderabad/",
  "url": "https://www.drsayuj.com/conditions/sciatica-treatment-hyderabad/",
  "name": "Sciatica Treatment in Hyderabad",
  "description": "Causes, symptoms, diagnosis, and stepwise treatment for sciatica in Hyderabad—from conservative care to endoscopic discectomy when indicated.",
  "datePublished": "2025-10-01",
  "dateModified": "2025-10-01",
  "about": {
    "@type": "MedicalCondition",
    "name": "Sciatica",
    "signOrSymptom": ["Leg pain", "Numbness", "Tingling", "Weakness"],
    "possibleTreatment": [
      {"@type": "MedicalTherapy", "name": "Physiotherapy"},
      {"@type": "MedicalTherapy", "name": "Medication"},
      {"@type": "MedicalProcedure", "name": "Endoscopic discectomy"},
      {"@type": "MedicalProcedure", "name": "Endoscopic foraminotomy"}
    ]
  },
  "provider": { "@id": "https://www.drsayuj.com/#physician" }
}

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Will sciatica go away on its own?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Many cases improve with time and therapy. If pain persists or weakness appears, we reassess options."
      }
    },
    {
      "@type": "Question",
      "name": "Is bed rest recommended?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Prolonged bed rest rarely helps. Gentle walking and guided rehab usually work better."
      }
    },
    {
      "@type": "Question",
      "name": "Is endoscopic recovery always faster?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Many eligible patients mobilize sooner, but recovery varies. We choose the safest option for your MRI and health."
      }
    },
    {
      "@type": "Question",
      "name": "Can sciatica come back?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Recurrence can occur. Exercise, posture, and safe lifting reduce risk but cannot eliminate it."
      }
    }
  ]
}

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://www.drsayuj.com/"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Conditions",
      "item": "https://www.drsayuj.com/conditions/"
    },
    {
      "@type": "ListItem",
      "position": 3,
      "name": "Sciatica Treatment in Hyderabad",
      "item": "https://www.drsayuj.com/conditions/sciatica-treatment-hyderabad/"
    }
  ]
}

export default function SciaticaTreatmentPage() {
  return (
    <>
      <JsonLd json={medicalWebPageSchema} />
      <JsonLd json={faqSchema} />
      <JsonLd json={breadcrumbSchema} />
      
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumbs */}
        <nav className="mb-6" aria-label="Breadcrumb">
          <ol className="flex items-center space-x-2 text-sm text-gray-600">
            <li><a href="/" className="hover:text-blue-600">Home</a></li>
            <li className="text-gray-400">/</li>
            <li><a href="/conditions/" className="hover:text-blue-600">Conditions</a></li>
            <li className="text-gray-400">/</li>
            <li className="text-gray-900 font-medium">Sciatica Treatment</li>
          </ol>
        </nav>

        <article className="max-w-4xl mx-auto">
          <header className="mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Sciatica Treatment in Hyderabad: Stepwise Relief and Safe Options
            </h1>
            <p className="text-lg text-gray-700">
              Comprehensive treatment approach for sciatica with conservative-first care and minimally invasive surgical options
            </p>
            <div className="mt-4 text-sm text-gray-500">
              Last medically reviewed: October 1, 2025 by Dr. Sayuj Krishnan
            </div>
          </header>

          <div className="prose prose-lg max-w-none">
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Overview</h2>
              <p className="mb-4">
                Sciatica is nerve pain that travels from the lower back into the leg, often due to a herniated (slip) disc or foraminal narrowing. Most patients improve with conservative care. If pain persists or weakness appears, minimally invasive or endoscopic decompression may be considered—based on MRI and safety. Our team at Yashoda Hospitals – Malakpet focuses on clear diagnosis, conservative‑first care, and realistic recovery timelines.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Symptoms and Red Flags</h2>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>Sharp, burning, or electric pain down the leg; numbness or tingling</li>
                <li>Pain worse with cough/sneeze or certain movements</li>
                <li>Possible weakness in foot or ankle</li>
              </ul>
              <div className="bg-red-50 border-l-4 border-red-400 p-4">
                <p className="text-red-800 font-semibold">Seek urgent medical attention if you develop:</p>
                <ul className="list-disc pl-6 mt-2 text-red-700">
                  <li>Loss of bowel/bladder control</li>
                  <li>Severe or rapidly worsening weakness</li>
                  <li>Fever with back pain</li>
                </ul>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Common Causes</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Herniated lumbar disc</strong> pressing on a nerve root</li>
                <li><strong>Foraminal stenosis</strong> from bone/ligament thickening</li>
                <li><strong>Less commonly:</strong> cysts, prior surgery changes, or spinal instability</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Diagnosis</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Clinical exam:</strong> strength, sensation, reflexes, straight‑leg raise, gait</li>
                <li><strong>MRI:</strong> confirms disc level and side; looks for nerve compression</li>
                <li><strong>When needed:</strong> targeted injections to localize pain</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Conservative Treatment (First Line)</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Medicines:</strong> short courses as appropriate; nerve pain control when indicated</li>
                <li><strong>Physiotherapy:</strong> core stabilization, hip‑glute strength, neural mobility, posture retraining</li>
                <li><strong>Ergonomics:</strong> sit‑stand alternation, micro‑breaks, safe lifting techniques</li>
                <li><strong>Activity modification:</strong> gradual walking program; avoid heavy lifting/twisting early</li>
              </ul>
              <p className="mt-4">
                If symptoms ease and function returns, continue rehab. If pain persists, or there is progressive weakness, we reassess for intervention.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Endoscopic Discectomy (When Indicated)</h2>
              
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-medium text-gray-900 mb-2">What it is:</h3>
                  <p>Through a 6–8 mm portal, the herniated fragment is removed under endoscopic visualization to free the nerve.</p>
                </div>

                <div>
                  <h3 className="text-xl font-medium text-gray-900 mb-2">Who may benefit:</h3>
                  <p>Confirmed disc herniation matching symptoms, limited response to conservative care, and MRI anatomy that allows safe endoscopic access.</p>
                </div>

                <div>
                  <h3 className="text-xl font-medium text-gray-900 mb-2">Benefits:</h3>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Tiny incision</li>
                    <li>Minimal muscle disruption</li>
                    <li>Earlier mobilization in selected patients</li>
                    <li>Some qualify for day‑care discharge</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-medium text-gray-900 mb-2">Risks:</h3>
                  <p>Infection, bleeding, nerve injury, CSF leak, recurrence, or conversion to a microscopic approach if safety requires.</p>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Endoscopic Foraminotomy (For Foraminal Sciatica)</h2>
              <p>
                Enlarges the nerve's exit corridor if foraminal narrowing is the primary cause. Considered when MRI shows bony/soft tissue impingement at the foramen.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Recovery Timeline (Typical Ranges; Individualized)</h2>
              <div className="space-y-4">
                <div className="border-l-4 border-blue-500 pl-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Day 0</h3>
                  <p>Walk with supervision once fully awake</p>
                </div>
                <div className="border-l-4 border-green-500 pl-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Week 1</h3>
                  <p>Gentle walking, wound care; avoid bending/twisting/heavy lifting</p>
                </div>
                <div className="border-l-4 border-yellow-500 pl-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Weeks 2–4</h3>
                  <p>Desk work may resume with micro‑breaks; begin guided rehab after wound check</p>
                </div>
                <div className="border-l-4 border-purple-500 pl-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Weeks 4–8</h3>
                  <p>Progress activity; manual work returns with graded loads</p>
                </div>
              </div>
              <div className="mt-6 bg-red-50 border-l-4 border-red-400 p-4">
                <p className="text-red-800 font-semibold">Red flags:</p>
                <p className="text-red-700">Fever, wound drainage, new/worsening weakness—contact clinic promptly</p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Costs and Insurance (Hyderabad)</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>Many policies cover indicated in‑patient decompression after pre‑authorization</li>
                <li>Day‑care can reduce costs for eligible endoscopic cases</li>
                <li>Written estimates provided after evaluation</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Local Care and Access</h2>
              <p>
                We serve patients across Hyderabad, including Banjara Hills, Hitech City, Gachibowli, LB Nagar, and Secunderabad. Bring prior imaging to reduce duplicate tests and streamline planning.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Frequently Asked Questions</h2>
              
              <div className="space-y-6">
                <div className="border-b pb-4">
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Will sciatica go away on its own?</h3>
                  <p className="text-gray-700">Many cases improve with time and therapy. If pain persists or weakness appears, we reassess options.</p>
                </div>

                <div className="border-b pb-4">
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Is bed rest recommended?</h3>
                  <p className="text-gray-700">Prolonged bed rest rarely helps. Gentle walking and guided rehab usually work better.</p>
                </div>

                <div className="border-b pb-4">
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Is endoscopic recovery always faster?</h3>
                  <p className="text-gray-700">Many eligible patients mobilize sooner, but recovery varies. We choose the safest option for your MRI and health.</p>
                </div>

                <div className="border-b pb-4">
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Can sciatica come back?</h3>
                  <p className="text-gray-700">Recurrence can occur. Exercise, posture, and safe lifting reduce risk but cannot eliminate it.</p>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Related Services</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="border rounded-lg p-4">
                  <h3 className="font-semibold mb-2">
                    <a href="/services/endoscopic-discectomy-hyderabad/" className="text-blue-600 hover:text-blue-800">
                      Endoscopic Discectomy
                    </a>
                  </h3>
                  <p className="text-sm text-gray-600">Minimally invasive treatment for herniated discs</p>
                </div>
                <div className="border rounded-lg p-4">
                  <h3 className="font-semibold mb-2">
                    <a href="/services/endoscopic-foraminotomy-hyderabad/" className="text-blue-600 hover:text-blue-800">
                      Endoscopic Foraminotomy
                    </a>
                  </h3>
                  <p className="text-sm text-gray-600">Foraminal stenosis relief</p>
                </div>
                <div className="border rounded-lg p-4">
                  <h3 className="font-semibold mb-2">
                    <a href="/services/minimally-invasive-spine-surgery/" className="text-blue-600 hover:text-blue-800">
                      Minimally Invasive Spine Surgery
                    </a>
                  </h3>
                  <p className="text-sm text-gray-600">Comprehensive MISS techniques</p>
                </div>
                <div className="border rounded-lg p-4">
                  <h3 className="font-semibold mb-2">
                    <a href="/appointments/" className="text-blue-600 hover:text-blue-800">
                      Book Consultation
                    </a>
                  </h3>
                  <p className="text-sm text-gray-600">Get personalized treatment plan</p>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Call to Action</h2>
              <div className="bg-blue-50 border-l-4 border-blue-400 p-6">
                <p className="text-lg text-blue-800 mb-4">
                  Book a consultation at Yashoda Hospitals – Malakpet. Bring your MRI and medication list so we can plan a safe, stepwise recovery.
                </p>
                <a 
                  href="/appointments/" 
                  className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                >
                  Schedule Consultation
                </a>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">References</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <a href="https://www.aans.org/patients/conditions-and-treatments" className="text-blue-600 hover:text-blue-800" target="_blank" rel="noopener noreferrer">
                    AANS: Conditions and Treatments
                  </a>
                </li>
                <li>
                  <a href="https://www.ninds.nih.gov/health-information/disorders" className="text-blue-600 hover:text-blue-800" target="_blank" rel="noopener noreferrer">
                    NINDS: Neurological Disorders
                  </a>
                </li>
                <li>
                  <a href="https://www.nhs.uk/conditions/sciatica/treatment/" className="text-blue-600 hover:text-blue-800" target="_blank" rel="noopener noreferrer">
                    NHS: Sciatica Treatment
                  </a>
                </li>
                <li>
                  <a href="https://www.mayoclinic.org/diseases-conditions/herniated-disk" className="text-blue-600 hover:text-blue-800" target="_blank" rel="noopener noreferrer">
                    Mayo Clinic: Herniated Disk
                  </a>
                </li>
              </ul>
            </section>

            <section className="border-t pt-6">
              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
                <h3 className="font-semibold text-yellow-800 mb-2">Disclaimer</h3>
                <p className="text-yellow-700 text-sm">
                  Educational content only; decisions are individualized after exam and imaging. No outcome is guaranteed.
                </p>
                <p className="text-yellow-700 text-sm mt-2">
                  Last medically reviewed: October 1, 2025 by Dr. Sayuj Krishnan
                </p>
              </div>
            </section>
          </div>
        </article>
      </div>
    </>
  )
}
