import { Metadata } from 'next'
import { JsonLd } from '../../../src/lib/seo/jsonld'

export const metadata: Metadata = {
  title: 'Endoscopic Cervical Discectomy in Hyderabad | Neck/Arm Pain',
  description: 'Motion‑preserving endoscopic cervical discectomy for selected radiculopathy cases. Multidisciplinary planning and clear rehab.',
  keywords: [
    'endoscopic cervical discectomy hyderabad',
    'neck pain treatment hyderabad',
    'cervical radiculopathy hyderabad',
    'arm pain treatment hyderabad',
    'cervical spine surgery hyderabad',
    'minimally invasive neck surgery'
  ],
  openGraph: {
    title: 'Endoscopic Cervical Discectomy in Hyderabad | Neck/Arm Pain',
    description: 'Motion‑preserving endoscopic cervical discectomy for selected radiculopathy cases. Multidisciplinary planning and clear rehab.',
    url: 'https://www.drsayuj.com/services/endoscopic-cervical-discectomy-hyderabad/',
    type: 'website',
    images: [
      {
        url: 'https://www.drsayuj.com/images/og-default.jpg',
        width: 1200,
        height: 630,
        alt: 'Endoscopic Cervical Discectomy - Dr Sayuj Krishnan'
      }
    ]
  },
  alternates: {
    canonical: 'https://www.drsayuj.com/services/endoscopic-cervical-discectomy-hyderabad/'
  }
}

const medicalServiceSchema = {
  "@context": "https://schema.org",
  "@type": "MedicalService",
  "@id": "https://www.drsayuj.com/services/endoscopic-cervical-discectomy-hyderabad/#service",
  "name": "Endoscopic Cervical Discectomy",
  "description": "Motion-preserving endoscopic cervical discectomy for cervical radiculopathy and neck/arm pain in Hyderabad.",
  "url": "https://www.drsayuj.com/services/endoscopic-cervical-discectomy-hyderabad/",
  "areaServed": { "@type": "City", "name": "Hyderabad" },
  "provider": { "@id": "https://www.drsayuj.com/#physician" },
  "availableChannel": { "@type": "ServiceChannel", "serviceUrl": "https://www.drsayuj.com/appointments/" },
  "audience": { "@type": "MedicalAudience", "audienceType": ["Patients with cervical radiculopathy", "Neck pain", "Arm pain"] }
}

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is endoscopic cervical discectomy?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Endoscopic cervical discectomy is a minimally invasive procedure that removes herniated disc material from the cervical spine through a small incision, preserving neck motion while relieving nerve compression."
      }
    },
    {
      "@type": "Question",
      "name": "Who is a candidate for cervical discectomy?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Patients with cervical radiculopathy (arm pain, numbness, weakness) due to herniated discs who have failed conservative treatment and have MRI-confirmed nerve compression."
      }
    },
    {
      "@type": "Question",
      "name": "How long is recovery after cervical discectomy?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Most patients can return to light activities within 1-2 weeks and full activities within 4-6 weeks. Neck motion is preserved, allowing for faster recovery compared to fusion procedures."
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
      "name": "Endoscopic Cervical Discectomy",
      "item": "https://www.drsayuj.com/services/endoscopic-cervical-discectomy-hyderabad/"
    }
  ]
}

export default function EndoscopicCervicalDiscectomyPage() {
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
            <li className="text-gray-900 font-medium">Endoscopic Cervical Discectomy</li>
          </ol>
        </nav>

        <article className="max-w-4xl mx-auto">
          <header className="mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Endoscopic Cervical Discectomy in Hyderabad
            </h1>
            <p className="text-lg text-gray-700">
              Motion-preserving minimally invasive treatment for cervical radiculopathy and neck/arm pain
            </p>
          </header>

          <div className="prose prose-lg max-w-none">
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">What is Endoscopic Cervical Discectomy?</h2>
              <p className="mb-4">
                Endoscopic cervical discectomy is a minimally invasive surgical procedure that removes herniated disc material from the cervical spine through a small incision. This advanced technique preserves neck motion while providing targeted relief for cervical radiculopathy (arm pain, numbness, weakness) caused by nerve compression.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Who is a Candidate?</h2>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>Cervical radiculopathy with arm pain, numbness, or weakness</li>
                <li>Herniated cervical disc confirmed by MRI</li>
                <li>Failed conservative treatment (medications, physiotherapy, injections)</li>
                <li>Progressive neurological symptoms</li>
                <li>Single-level disc herniation (in most cases)</li>
                <li>No significant neck instability</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Procedure Overview</h2>
              <ol className="list-decimal pl-6 space-y-3">
                <li><strong>Pre-operative evaluation:</strong> MRI review, neurological assessment, and anesthesia consultation</li>
                <li><strong>Positioning:</strong> Patient positioned for optimal cervical spine access</li>
                <li><strong>Small incision:</strong> 8-10mm skin incision in the front of the neck</li>
                <li><strong>Endoscopic access:</strong> Working channel placement with endoscope insertion</li>
                <li><strong>Disc removal:</strong> Precise removal of herniated disc material</li>
                <li><strong>Nerve decompression:</strong> Verification of nerve root relief</li>
                <li><strong>Closure:</strong> Minimal sutures and early mobilization</li>
              </ol>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Benefits of Endoscopic Approach</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-xl font-medium text-gray-900 mb-3">Motion Preservation</h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Maintains normal neck movement</li>
                    <li>No fusion required</li>
                    <li>Preserves adjacent disc health</li>
                    <li>Reduces risk of adjacent level disease</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-medium text-gray-900 mb-3">Recovery Advantages</h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Smaller incision</li>
                    <li>Less tissue disruption</li>
                    <li>Faster healing</li>
                    <li>Reduced post-operative pain</li>
                    <li>Earlier return to activities</li>
                  </ul>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Recovery Timeline</h2>
              <div className="bg-blue-50 border-l-4 border-blue-400 p-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-xl font-medium text-gray-900 mb-3">Immediate Recovery</h3>
                    <ul className="space-y-2 text-sm">
                      <li><strong>Day 0:</strong> Neck support, pain management</li>
                      <li><strong>Day 1:</strong> Gentle neck movement, discharge planning</li>
                      <li><strong>Week 1:</strong> Light activities, wound care</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-xl font-medium text-gray-900 mb-3">Return to Activities</h3>
                    <ul className="space-y-2 text-sm">
                      <li><strong>Week 2:</strong> Desk work, light driving</li>
                      <li><strong>Week 4:</strong> Normal neck movement, light exercise</li>
                      <li><strong>Week 6:</strong> Full activities, sports</li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Risks and Considerations</h2>
              <p className="mb-4">
                While endoscopic cervical discectomy is generally safe, potential risks include:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Bleeding or infection</li>
                <li>Nerve root injury</li>
                <li>Dural tear (rare)</li>
                <li>Recurrent disc herniation</li>
                <li>Voice changes (temporary, rare)</li>
                <li>Swallowing difficulties (temporary)</li>
              </ul>
              <p className="mt-4">
                Dr Sayuj Krishnan discusses all risks and benefits during consultation to ensure informed decision-making.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Multidisciplinary Planning</h2>
              <p className="mb-4">
                Our approach includes comprehensive evaluation and planning:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Detailed neurological examination</li>
                <li>Advanced imaging review (MRI, CT if needed)</li>
                <li>Anesthesia consultation for airway assessment</li>
                <li>Physical therapy planning for post-operative rehabilitation</li>
                <li>Clear communication of expectations and recovery timeline</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Frequently Asked Questions</h2>
              
              <div className="space-y-6">
                <div className="border-b pb-4">
                  <h3 className="text-lg font-medium text-gray-900 mb-2">What is endoscopic cervical discectomy?</h3>
                  <p className="text-gray-700">Endoscopic cervical discectomy is a minimally invasive procedure that removes herniated disc material from the cervical spine through a small incision, preserving neck motion while relieving nerve compression.</p>
                </div>

                <div className="border-b pb-4">
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Who is a candidate for cervical discectomy?</h3>
                  <p className="text-gray-700">Patients with cervical radiculopathy (arm pain, numbness, weakness) due to herniated discs who have failed conservative treatment and have MRI-confirmed nerve compression.</p>
                </div>

                <div className="border-b pb-4">
                  <h3 className="text-lg font-medium text-gray-900 mb-2">How long is recovery after cervical discectomy?</h3>
                  <p className="text-gray-700">Most patients can return to light activities within 1-2 weeks and full activities within 4-6 weeks. Neck motion is preserved, allowing for faster recovery compared to fusion procedures.</p>
                </div>

                <div className="border-b pb-4">
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Will I lose neck movement after surgery?</h3>
                  <p className="text-gray-700">No, endoscopic cervical discectomy preserves normal neck movement. Unlike fusion procedures, this technique maintains the natural motion of the cervical spine.</p>
                </div>

                <div className="border-b pb-4">
                  <h3 className="text-lg font-medium text-gray-900 mb-2">When can I drive after cervical discectomy?</h3>
                  <p className="text-gray-700">Most patients can resume driving within 1-2 weeks, once neck movement is comfortable and pain is well-controlled. Your surgeon will provide specific guidance based on your recovery.</p>
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
                  <p className="text-sm text-gray-600">Comprehensive MISS techniques for various spine conditions</p>
                </div>
                <div className="border rounded-lg p-4">
                  <h3 className="font-semibold mb-2">
                    <a href="/services/endoscopic-discectomy-hyderabad/" className="text-blue-600 hover:text-blue-800">
                      Endoscopic Discectomy
                    </a>
                  </h3>
                  <p className="text-sm text-gray-600">Minimally invasive treatment for lumbar herniated discs</p>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Why Choose Dr Sayuj Krishnan?</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>Expertise in advanced endoscopic cervical spine surgery</li>
                <li>Motion-preserving techniques for optimal outcomes</li>
                <li>Comprehensive pre-operative evaluation and planning</li>
                <li>Clear communication and realistic expectations</li>
                <li>Structured rehabilitation and follow-up care</li>
                <li>Patients from across Hyderabad: Malakpet, Charminar, Koti, Himayat Nagar, Abids, Secunderabad, Hitech City, Banjara Hills, Gachibowli, and LB Nagar</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Call to Action</h2>
              <div className="bg-blue-50 border-l-4 border-blue-400 p-6">
                <p className="text-lg text-blue-800 mb-4">
                  If you're experiencing cervical radiculopathy or neck/arm pain, schedule a consultation with Dr Sayuj Krishnan at Yashoda Hospitals – Malakpet. Bring your MRI and medical history for a comprehensive evaluation.
                </p>
                <a 
                  href="/appointments/" 
                  className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                >
                  Schedule Consultation
                </a>
              </div>
            </section>

            <section className="border-t pt-6">
              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
                <h3 className="font-semibold text-yellow-800 mb-2">Disclaimer</h3>
                <p className="text-yellow-700 text-sm">
                  This page is educational and not a substitute for medical advice. Treatment decisions are made after clinical evaluation and imaging review. Outcomes are not guaranteed.
                </p>
              </div>
            </section>
          </div>
        </article>
      </div>
    </>
  )
}
