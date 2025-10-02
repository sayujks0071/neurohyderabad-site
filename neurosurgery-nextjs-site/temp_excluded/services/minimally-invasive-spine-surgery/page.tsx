import { Metadata } from 'next'
import { JsonLd } from '../../../src/lib/seo/jsonld'

// ISR: Revalidate every 24 hours
export const revalidate = 86400;

export const metadata: Metadata = {
  title: 'Minimally Invasive Spine Surgery in Hyderabad',
  description: 'Tiny‑incision minimally invasive spine surgery in Hyderabad. Endoscopic discectomy/foraminotomy with faster recovery when appropriate. Book a consultation.',
  keywords: [
    'minimally invasive spine surgery hyderabad',
    'endoscopic spine surgery hyderabad',
    'MISS hyderabad',
    'endoscopic discectomy hyderabad',
    'endoscopic foraminotomy hyderabad',
    'spine surgery recovery hyderabad'
  ],
  openGraph: {
    title: 'Minimally Invasive Spine Surgery in Hyderabad | Endoscopic Options',
    description: 'Tiny‑incision minimally invasive spine surgery in Hyderabad. Endoscopic discectomy/foraminotomy with faster recovery when appropriate.',
    url: 'https://www.drsayuj.com/services/minimally-invasive-spine-surgery/',
    type: 'website',
    images: [
      {
        url: 'https://www.drsayuj.com/images/og-default.jpg',
        width: 1200,
        height: 630,
        alt: 'Minimally Invasive Spine Surgery - Dr Sayuj Krishnan'
      }
    ]
  },
  alternates: {
    canonical: 'https://www.drsayuj.com/services/minimally-invasive-spine-surgery/',
    languages: {
      'en-IN': 'https://www.drsayuj.com/services/minimally-invasive-spine-surgery/',
      'x-default': 'https://www.drsayuj.com/services/minimally-invasive-spine-surgery/'
    }
  }
}

const medicalServiceSchema = {
  "@context": "https://schema.org",
  "@type": "MedicalService",
  "@id": "https://www.drsayuj.com/services/minimally-invasive-spine-surgery/#service",
  "name": "Minimally Invasive Spine Surgery (MISS)",
  "description": "Tiny-incision approaches including endoscopic discectomy and foraminotomy for selected patients in Hyderabad.",
  "url": "https://www.drsayuj.com/services/minimally-invasive-spine-surgery/",
  "areaServed": { "@type": "City", "name": "Hyderabad" },
  "provider": { "@id": "https://www.drsayuj.com/#physician" },
  "availableChannel": { "@type": "ServiceChannel", "serviceUrl": "https://www.drsayuj.com/appointments/" },
  "audience": { "@type": "MedicalAudience", "audienceType": ["Patients with sciatica", "Spinal stenosis", "Herniated disc"] }
}

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Is MISS safe for older adults?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "With careful selection and medical optimization, many older adults do well with MISS. We assess anesthesia fitness, comorbidities, and support at home before recommending surgery."
      }
    },
    {
      "@type": "Question",
      "name": "How painful is recovery?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Smaller incisions often mean less early pain; multimodal analgesia and early mobilization are used."
      }
    },
    {
      "@type": "Question",
      "name": "Will I need physiotherapy?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, a graded plan after wound healing focuses on core stability and posture."
      }
    },
      {
        "@type": "Question",
      "name": "Can the disc re-herniate?",
      "acceptedAnswer": {
          "@type": "Answer",
        "text": "Recurrence can occur; we minimize risk with precise technique and guidance, but no approach eliminates risk."
        }
      },
      {
        "@type": "Question",
      "name": "What if endoscopy isn't possible on the day?",
      "acceptedAnswer": {
          "@type": "Answer",
        "text": "If visualization/access is limited, conversion to a microscopic approach may be advised for safety."
        }
      },
      {
        "@type": "Question",
      "name": "Is day-care discharge realistic?",
      "acceptedAnswer": {
          "@type": "Answer",
        "text": "Many qualify; if monitoring is safer, we recommend an overnight stay."
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
      "name": "Services",
      "item": "https://www.drsayuj.com/services/"
    },
    {
      "@type": "ListItem",
      "position": 3,
      "name": "Minimally Invasive Spine Surgery",
      "item": "https://www.drsayuj.com/services/minimally-invasive-spine-surgery/"
    }
  ]
}

export default function MinimallyInvasiveSpineSurgeryPage() {
  return (
    <>
      <JsonLd json={medicalServiceSchema} />
      <JsonLd json={faqSchema} />
      <JsonLd json={breadcrumbSchema} />
      
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumbs */}
        <nav className="mb-6" aria-label="Breadcrumb">
          <ol className="flex items-center space-x-2 text-sm text-gray-600">
            <li><a href="/" className="hover:text-blue-600">Home</a></li>
            <li className="text-gray-400">/</li>
            <li><a href="/services/" className="hover:text-blue-600">Services</a></li>
            <li className="text-gray-400">/</li>
            <li className="text-gray-900 font-medium">Minimally Invasive Spine Surgery</li>
          </ol>
        </nav>

        <article className="max-w-4xl mx-auto">
          <header className="mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Minimally Invasive Spine Surgery (MISS) in Hyderabad
            </h1>
        </header>

          <div className="prose prose-lg max-w-none">
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">What is MISS?</h2>
              <p className="mb-4">
                Minimally invasive spine surgery (MISS) uses small incisions and tubular or endoscopic portals to reach the target safely while minimizing muscle disruption. In appropriate cases—such as endoscopic discectomy or foraminotomy—MISS can reduce early pain and shorten hospital stay compared with open approaches. The choice of technique is individualized; safety and long‑term outcomes remain the priority.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Who is a candidate?</h2>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>Herniated (slip) disc with radiating leg pain/sciatica not improving with conservative care</li>
                <li>Foraminal stenosis compressing the exiting nerve root</li>
                <li>Select recurrent herniated discs</li>
                <li>Some lumbar stenosis patterns amenable to endoscopic ULBD (unilateral approach to bilateral decompression)</li>
              </ul>
              <p>
                When conservative therapy is likely to help, we continue non‑surgical care first. If imaging shows instability or deformity, other techniques may be advised instead of pure MISS.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Endoscopic vs microscopic: choosing the best approach</h2>
              <div className="grid md:grid-cols-2 gap-6 mb-4">
                <div className="border rounded-lg p-4">
                  <h3 className="text-xl font-medium text-gray-900 mb-3">Endoscopic</h3>
                  <p>A 6–8 mm portal with a high‑definition endoscope provides magnified visualization. Useful for targeted fragment removal and foraminal decompression while preserving stabilizers when feasible.</p>
                </div>
                <div className="border rounded-lg p-4">
                  <h3 className="text-xl font-medium text-gray-900 mb-3">Microscopic</h3>
                  <p>A small incision under an operating microscope. Preferred when broader exposure is safer or if endoscopic access is limited by anatomy.</p>
                </div>
              </div>
              <p>
                If intraoperative visualization is inadequate for safety, we may convert to an alternative technique—this possibility is discussed during consent.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Step‑by‑step (example: endoscopic discectomy)</h2>
              <ol className="list-decimal pl-6 space-y-3">
                <li><strong>Pre‑op evaluation:</strong> exam, MRI review, and anesthesia fitness</li>
                <li><strong>Anesthesia and positioning</strong></li>
                <li><strong>6–8 mm skin incision,</strong> working channel placement under imaging guidance</li>
                <li><strong>Endoscopic visualization</strong> of the herniation; fragment removal to decompress the nerve</li>
                <li><strong>Hemostasis and closure;</strong> early mobilization plan</li>
              </ol>
              <p className="mt-4">
                Duration varies (about 30–90 minutes) based on anatomy and complexity.
          </p>
        </section>

          <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Benefits and risks</h2>
              
              <div className="mb-6">
                <h3 className="text-xl font-medium text-gray-900 mb-3">Potential benefits</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Smaller incisions and less muscle disruption</li>
                  <li>Earlier mobilization and shorter hospital stay in suitable patients</li>
                  <li>Lower blood loss and reduced wound discomfort</li>
                </ul>
              </div>

              <div className="mb-6">
                <h3 className="text-xl font-medium text-gray-900 mb-3">Risks (no surgery is risk‑free)</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Infection, bleeding, nerve root injury, CSF leak, recurrent herniation</li>
                  <li>Incomplete relief if the pain generator differs from imaging</li>
                  <li>Need to convert to another approach for safety</li>
                </ul>
              </div>

              <p>
                We discuss your personalized risk–benefit profile, alternatives, and expected timelines before making a decision.
            </p>
          </section>

          <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Recovery and return to activity</h2>
              
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h3 className="text-xl font-medium text-gray-900 mb-3">Recovery Timeline</h3>
                  <ul className="space-y-2 text-sm">
                    <li><strong>Day 0:</strong> Walking begins with supervision once fully awake</li>
                    <li><strong>Days 1–7:</strong> Gentle walking; avoid heavy lifting, bending, twisting; wound care as instructed</li>
                    <li><strong>Weeks 2–4:</strong> Gradual return to desk work; progressive core stabilization and posture training after wound healing</li>
                    <li><strong>Weeks 4–8:</strong> Graded increase in activity; manual workers follow a phased plan</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-medium text-gray-900 mb-3">Red Flags</h3>
                  <p className="text-sm text-red-600 font-medium">
                    Fever, new/increasing weakness, wound drainage, severe leg pain—contact the team promptly
                  </p>
                </div>
              </div>

              <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-6">
                <h3 className="text-xl font-medium text-gray-900 mb-3">Return‑to‑work guidance (typical ranges; individualized)</h3>
                <ul className="space-y-2">
                  <li><strong>Desk/remote roles:</strong> 1–2 weeks</li>
                  <li><strong>Light field work:</strong> 2–4 weeks</li>
                  <li><strong>Heavy/manual work:</strong> 4–8+ weeks with graded re‑entry</li>
            </ul>
              </div>
          </section>

          <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Costs and insurance</h2>
              <p>
                We provide a written estimate after evaluation. Many policies cover indicated in‑patient procedures with pre‑authorization. Day‑care discharge is feasible for some patients when safety criteria are met; otherwise, an overnight stay is recommended. Bring your policy details and MRI to streamline planning.
              </p>
          </section>

          <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">When MISS may not be preferred</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>Overt spinal instability or deformity requiring stabilization</li>
                <li>Extensive canal compromise needing wider decompression</li>
                <li>Early in conservative care when non‑surgical therapy is still likely to work</li>
            </ul>
          </section>

          <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Why choose Dr Sayuj Krishnan at Yashoda Hospitals – Malakpet</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>Expertise in Full Endoscopic Spine Surgery and minimally invasive techniques</li>
                <li>Safety‑first protocols with neuronavigation and neuromonitoring where indicated</li>
                <li>Clear counseling, realistic expectations, and structured follow‑up</li>
                <li>Patients visit from Malakpet, Charminar, Koti, Himayat Nagar, Abids, Secunderabad, Hitech City, Banjara Hills, Gachibowli, and LB Nagar</li>
            </ul>
          </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Frequently Asked Questions</h2>
              
              <div className="space-y-6">
                <div className="border-b pb-4">
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Is MISS safe for older adults?</h3>
                  <p className="text-gray-700">With careful selection and medical optimization, many older adults do well with MISS. We assess anesthesia fitness, comorbidities, and support at home before recommending surgery.</p>
                </div>

                <div className="border-b pb-4">
                  <h3 className="text-lg font-medium text-gray-900 mb-2">How painful is recovery?</h3>
                  <p className="text-gray-700">Discomfort varies, but smaller incisions often mean less early pain. We use multimodal pain control and early mobilization to help you recover comfortably.</p>
                </div>

                <div className="border-b pb-4">
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Will I need physiotherapy?</h3>
                  <p className="text-gray-700">Yes. After wound healing, a graded plan focuses on core stabilization, posture, and safe returns to daily tasks and work.</p>
                </div>

                <div className="border-b pb-4">
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Can the disc re‑herniate?</h3>
                  <p className="text-gray-700">Recurrence can happen after any decompression. We minimize risk with precise technique and clear activity guidance, but no approach can eliminate risk completely.</p>
                </div>

                <div className="border-b pb-4">
                  <h3 className="text-lg font-medium text-gray-900 mb-2">What if endoscopy isn't possible on the day?</h3>
                  <p className="text-gray-700">Safety comes first. If visualization/access is limited, we may convert to a microscopic approach—this is discussed in advance during consent.</p>
                </div>

                <div className="border-b pb-4">
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Is day‑care discharge realistic?</h3>
                  <p className="text-gray-700">Many patients qualify. If pain control, mobilization, or monitoring needs suggest otherwise, we recommend overnight observation.</p>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Related Services</h2>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="border rounded-lg p-4">
                  <h3 className="font-semibold mb-2">
                    <a href="/services/endoscopic-foraminotomy-hyderabad/" className="text-blue-600 hover:text-blue-800">
                      Endoscopic Foraminotomy
                    </a>
                  </h3>
                  <p className="text-sm text-gray-600">Minimally invasive nerve decompression for foraminal stenosis</p>
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
                    <a href="/services/brain-tumor-surgery-hyderabad/" className="text-blue-600 hover:text-blue-800">
                      Brain Tumor Surgery
                    </a>
                  </h3>
                  <p className="text-sm text-gray-600">Advanced neurosurgical techniques</p>
                </div>
              </div>
          </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Related Conditions</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="border rounded-lg p-4">
                  <h3 className="font-semibold mb-2">
                    <a href="/conditions/spinal-stenosis-treatment-hyderabad/" className="text-blue-600 hover:text-blue-800">
                      Spinal Stenosis Treatment
                    </a>
                  </h3>
                  <p className="text-sm text-gray-600">Comprehensive treatment for spinal canal narrowing</p>
                </div>
                <div className="border rounded-lg p-4">
                  <h3 className="font-semibold mb-2">
                    <a href="/conditions/slip-disc-treatment-hyderabad/" className="text-blue-600 hover:text-blue-800">
                      Slip Disc Treatment
                    </a>
                  </h3>
                  <p className="text-sm text-gray-600">Advanced treatment for herniated discs</p>
                </div>
              </div>
          </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Call to action</h2>
              <div className="bg-blue-50 border-l-4 border-blue-400 p-6">
                <p className="text-lg text-blue-800 mb-4">
                  Book a consultation at Yashoda Hospitals – Malakpet. Bring prior imaging and policy details to confirm candidacy and a tailored plan.
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
              <ul className="list-disc pl-6 space-y-2 text-sm">
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
                  <a href="https://www.mayoclinic.org/diseases-conditions/herniated-disk/symptoms-causes/syc-20354095" className="text-blue-600 hover:text-blue-800" target="_blank" rel="noopener noreferrer">
                    Mayo Clinic: Herniated Disk
                  </a>
                </li>
              </ul>
            </section>

            {/* Concluding Paragraph */}
            <section className="border-t pt-6 mb-6">
              <div className="bg-blue-50 border-l-4 border-blue-400 p-6">
                <p className="text-lg text-blue-800 leading-relaxed">
                  MISS is one of several safe, evidence‑based options for selected patients. After examining you and reviewing your MRI, we'll confirm if endoscopic or microscopic decompression—or continued conservative care—is the best next step. Book a consultation at Yashoda Hospitals – Malakpet to receive a personalized plan and timeline.
                </p>
              </div>
            </section>

            <section className="border-t pt-6">
              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
                <h3 className="font-semibold text-yellow-800 mb-2">Disclaimer</h3>
                <p className="text-yellow-700 text-sm">
                  This page is educational, not a substitute for medical advice. Decisions are made after clinical evaluation and imaging review. Outcomes are not guaranteed.
                </p>
              </div>
          </section>
        </div>
      </article>
      </div>
    </>
  )
}