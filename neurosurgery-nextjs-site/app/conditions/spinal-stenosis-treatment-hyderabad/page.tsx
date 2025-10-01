import { Metadata } from 'next'
import { JsonLd } from '../../../src/lib/seo/jsonld'

export const metadata: Metadata = {
  title: 'Spinal Stenosis Treatment in Hyderabad',
  description: 'Learn symptoms, diagnosis, conservative care, and when endoscopic ULBD helps for spinal stenosis in Hyderabad. Safety‑first, individualized plans. Book a consultation.',
  keywords: [
    'spinal stenosis treatment hyderabad',
    'lumbar spinal stenosis hyderabad',
    'endoscopic ULBD hyderabad',
    'spinal stenosis symptoms hyderabad',
    'neurogenic claudication hyderabad',
    'spinal decompression hyderabad'
  ],
  openGraph: {
    title: 'Spinal Stenosis Treatment in Hyderabad',
    description: 'Learn symptoms, diagnosis, conservative care, and when endoscopic ULBD helps for spinal stenosis in Hyderabad. Safety‑first, individualized plans.',
    url: 'https://www.drsayuj.com/conditions/spinal-stenosis-treatment-hyderabad/',
    type: 'website',
    images: [
      {
        url: 'https://www.drsayuj.com/images/og-default.jpg',
        width: 1200,
        height: 630,
        alt: 'Spinal Stenosis Treatment - Dr. Sayuj Krishnan'
      }
    ]
  },
  alternates: {
    canonical: 'https://www.drsayuj.com/conditions/spinal-stenosis-treatment-hyderabad/',
    languages: {
      'en-IN': 'https://www.drsayuj.com/conditions/spinal-stenosis-treatment-hyderabad/',
      'x-default': 'https://www.drsayuj.com/conditions/spinal-stenosis-treatment-hyderabad/'
    }
  }
}

const medicalWebPageSchema = {
  "@context": "https://schema.org",
  "@type": "MedicalWebPage",
  "mainEntityOfPage": "https://www.drsayuj.com/conditions/spinal-stenosis-treatment-hyderabad/",
  "url": "https://www.drsayuj.com/conditions/spinal-stenosis-treatment-hyderabad/",
  "name": "Spinal Stenosis Treatment in Hyderabad",
  "description": "Symptoms, diagnosis, conservative care, and when endoscopic ULBD helps for lumbar spinal stenosis in Hyderabad.",
  "datePublished": "2025-10-01",
  "dateModified": "2025-10-01",
  "about": {
    "@type": "MedicalCondition",
    "name": "Lumbar Spinal Stenosis",
    "url": "https://www.ninds.nih.gov/health-information/disorders",
    "signOrSymptom": ["Neurogenic claudication", "Leg pain", "Numbness"],
    "possibleTreatment": [
      {"@type": "MedicalTherapy", "name": "Physiotherapy"},
      {"@type": "MedicalProcedure", "name": "Endoscopic ULBD"},
      {"@type": "MedicalProcedure", "name": "Microscopic decompression"}
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
      "name": "Is stenosis the same as sciatica?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Stenosis often causes walking intolerance in both legs, while sciatica follows a single nerve. MRI helps distinguish."
      }
    },
    {
      "@type": "Question",
      "name": "Will physiotherapy alone cure stenosis?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Many improve with therapy. If walking remains limited, decompression may be considered after evaluation."
      }
    },
    {
      "@type": "Question",
      "name": "Is endoscopic always better?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Not always. Approach depends on your MRI and safety. Endoscopic or microscopic may be advised."
      }
    },
    {
      "@type": "Question",
      "name": "Can stenosis recur?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Degenerative changes can progress. Rehab and posture help maintain results but do not stop aging."
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
      "name": "Spinal Stenosis Treatment in Hyderabad",
      "item": "https://www.drsayuj.com/conditions/spinal-stenosis-treatment-hyderabad/"
    }
  ]
}

export default function SpinalStenosisTreatmentPage() {
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
            <li className="text-gray-900 font-medium">Spinal Stenosis Treatment</li>
          </ol>
        </nav>

        <article className="max-w-4xl mx-auto">
          <header className="mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Spinal Stenosis Treatment in Hyderabad: Symptoms, Diagnosis, and Options
            </h1>
            <p className="text-lg text-gray-700">
              Comprehensive treatment approach for lumbar spinal stenosis with conservative-first care and minimally invasive options
            </p>
            <div className="mt-4 text-sm text-gray-500">
              Last medically reviewed: October 1, 2025 by Dr. Sayuj Krishnan
            </div>
          </header>

          <div className="prose prose-lg max-w-none">
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Overview</h2>
              <p className="mb-4">
                Spinal stenosis is a narrowing of the spinal canal that can pinch the nerves, leading to leg pain, heaviness, numbness, or walking intolerance. Many patients improve with medicines and physiotherapy. When daily life remains limited, minimally invasive or endoscopic decompression may be considered—if your MRI and symptoms match. Our approach at Yashoda Hospitals – Malakpet is conservative‑first, with a clear focus on safety.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Common Symptoms</h2>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>Leg pain, numbness, tingling, or weakness</li>
                <li>Neurogenic claudication: pain/heaviness with walking, relief with sitting or leaning forward</li>
                <li>Lower back aching or stiffness</li>
                <li>Reduced walking distance; frequent need to rest</li>
              </ul>
              <div className="bg-red-50 border-l-4 border-red-400 p-4">
                <p className="text-red-800 font-semibold">Seek urgent medical attention if you notice:</p>
                <ul className="list-disc pl-6 mt-2 text-red-700">
                  <li>Fever with back pain</li>
                  <li>Rapidly worsening weakness</li>
                  <li>Loss of bowel/bladder control</li>
                </ul>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Why Stenosis Occurs</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Age‑related changes:</strong> thickened ligaments (ligamentum flavum), facet joint overgrowth</li>
                <li><strong>Disc bulges or herniations</strong></li>
                <li><strong>Spondylolisthesis (slippage)</strong> in some patients</li>
                <li><strong>Less commonly:</strong> cysts, prior surgery, or congenital narrowing</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">How We Diagnose</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Clinical exam:</strong> strength, sensation, reflexes, walking tolerance</li>
                <li><strong>Imaging:</strong> MRI to confirm the level and severity; X‑rays for alignment/instability</li>
                <li><strong>When needed:</strong> diagnostic injections to localize the pain generator</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Conservative Treatment (First Line for Many)</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Medicines:</strong> short courses as appropriate; targeted pain control</li>
                <li><strong>Physiotherapy:</strong> core strengthening, hip‑glute training, posture and gait retraining</li>
                <li><strong>Activity modification</strong> and ergonomic coaching</li>
                <li><strong>Image‑guided injections</strong> in selected cases</li>
              </ul>
              <p className="mt-4">
                We reassess after a defined trial. If function is still limited or progressive weakness appears, we review minimally invasive options.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Endoscopic ULBD (Unilateral Approach to Bilateral Decompression)</h2>
              
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-medium text-gray-900 mb-2">What it is:</h3>
                  <p>Through a small incision on one side, an endoscope helps remove the tissue compressing the nerves on both sides of the canal. The aim is to free the nerves while preserving stabilizing structures when feasible.</p>
                </div>

                <div>
                  <h3 className="text-xl font-medium text-gray-900 mb-2">Who may benefit:</h3>
                  <p>Patients with central or lateral recess stenosis on MRI, without significant instability or deformity, who did not improve with conservative care.</p>
                </div>

                <div>
                  <h3 className="text-xl font-medium text-gray-900 mb-2">Benefits:</h3>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Smaller incision</li>
                    <li>Less muscle disruption</li>
                    <li>Earlier mobilization in selected patients</li>
                    <li>Potential day‑care eligibility</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-medium text-gray-900 mb-2">Risks:</h3>
                  <p>Infection, bleeding, nerve injury, CSF leak, incomplete relief, recurrence, or conversion to another approach for safety. We discuss risks and alternatives in detail.</p>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">When MISS or Other Techniques Are Preferred</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>If endoscopic access is limited by anatomy, a microscopic approach may be safer</li>
                <li>If instability or deformity exists, a different plan may be needed</li>
              </ul>
              <p className="mt-4">
                Your MRI and exam guide the approach—there is no "one size fits all."
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Recovery Roadmap (Typical Ranges; Individualized)</h2>
              <div className="space-y-4">
                <div className="border-l-4 border-blue-500 pl-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Day 0</h3>
                  <p>Walk with supervision once fully alert</p>
                </div>
                <div className="border-l-4 border-green-500 pl-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Week 1</h3>
                  <p>Gentle walking; protect the back from heavy lifting, bending, twisting</p>
                </div>
                <div className="border-l-4 border-yellow-500 pl-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Weeks 2–4</h3>
                  <p>Increase walking distance; start guided core and hip‑glute rehab after wound check</p>
                </div>
                <div className="border-l-4 border-purple-500 pl-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Weeks 4–8</h3>
                  <p>Return to light field/manual work with a graded plan</p>
                </div>
              </div>
              <div className="mt-6 bg-red-50 border-l-4 border-red-400 p-4">
                <p className="text-red-800 font-semibold">Red flags:</p>
                <p className="text-red-700">Fever, new/worsening weakness, wound drainage—contact the clinic promptly</p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Costs and Insurance (Hyderabad)</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>Many policies cover indicated in‑patient decompression after pre‑authorization</li>
                <li>Day‑care may reduce costs in eligible cases</li>
                <li>We provide a written estimate after evaluation and MRI review</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Local Care and Access</h2>
              <p>
                Patients commonly visit from Malakpet, Koti, Charminar, Himayat Nagar, and Secunderabad. We streamline imaging review and insurance assistance to minimize extra visits.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Frequently Asked Questions</h2>
              
              <div className="space-y-6">
                <div className="border-b pb-4">
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Is stenosis the same as sciatica?</h3>
                  <p className="text-gray-700">Not exactly. Stenosis often affects both legs with walking intolerance. Sciatica usually follows a single nerve due to disc herniation. MRI clarifies the cause.</p>
                </div>

                <div className="border-b pb-4">
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Will physiotherapy alone cure stenosis?</h3>
                  <p className="text-gray-700">Many improve with structured therapy. If walking remains limited, we reassess for decompression options.</p>
                </div>

                <div className="border-b pb-4">
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Is endoscopic always better?</h3>
                  <p className="text-gray-700">Not always. We choose the safest and most effective approach—endoscopic or microscopic—based on your MRI and goals.</p>
                </div>

                <div className="border-b pb-4">
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Can stenosis recur?</h3>
                  <p className="text-gray-700">Degeneration continues with age. Rehab and posture help maintain results, but future changes can occur.</p>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Related Services</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="border rounded-lg p-4">
                  <h3 className="font-semibold mb-2">
                    <a href="/services/minimally-invasive-spine-surgery/" className="text-blue-600 hover:text-blue-800">
                      Minimally Invasive Spine Surgery
                    </a>
                  </h3>
                  <p className="text-sm text-gray-600">Comprehensive MISS techniques and options</p>
                </div>
                <div className="border rounded-lg p-4">
                  <h3 className="font-semibold mb-2">
                    <a href="/services/endoscopic-ulbd-hyderabad/" className="text-blue-600 hover:text-blue-800">
                      Endoscopic ULBD
                    </a>
                  </h3>
                  <p className="text-sm text-gray-600">Unilateral approach to bilateral decompression</p>
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
                  Book a consultation at Yashoda Hospitals – Malakpet. Bring your MRI and prior reports to get a clear plan and recovery timeline.
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
                  <a href="https://www.nhs.uk/conditions/spinal-stenosis/" className="text-blue-600 hover:text-blue-800" target="_blank" rel="noopener noreferrer">
                    NHS: Spinal Stenosis
                  </a>
                </li>
                <li>
                  <a href="https://www.mayoclinic.org/diseases-conditions/spinal-stenosis" className="text-blue-600 hover:text-blue-800" target="_blank" rel="noopener noreferrer">
                    Mayo Clinic: Spinal Stenosis
                  </a>
                </li>
              </ul>
            </section>

            <section className="border-t pt-6">
              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
                <h3 className="font-semibold text-yellow-800 mb-2">Disclaimer</h3>
                <p className="text-yellow-700 text-sm">
                  Educational content only; not a substitute for clinical evaluation. Treatment is individualized after exam and imaging. No outcome is guaranteed.
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