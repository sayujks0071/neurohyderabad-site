import { Metadata } from 'next'
import { JsonLd } from '../../../src/lib/seo/jsonld'

export const metadata: Metadata = {
  title: 'Endoscopic Discectomy in Hyderabad | Slip Disc Relief',
  description: 'Tiny‑incision endoscopic discectomy for slip disc and sciatica in Hyderabad. Faster mobilization when appropriate. Book a consultation.',
  keywords: [
    'endoscopic discectomy hyderabad',
    'slip disc surgery hyderabad',
    'sciatica treatment hyderabad',
    'minimally invasive spine surgery',
    'herniated disc treatment',
    'endoscopic spine surgery'
  ],
  openGraph: {
    title: 'Endoscopic Discectomy in Hyderabad | Slip Disc Relief',
    description: 'Tiny‑incision endoscopic discectomy for slip disc and sciatica in Hyderabad. Faster mobilization when appropriate.',
    url: 'https://www.drsayuj.com/services/endoscopic-discectomy-hyderabad/',
    type: 'website',
    images: [
      {
        url: 'https://www.drsayuj.com/images/og-default.jpg',
        width: 1200,
        height: 630,
        alt: 'Endoscopic Discectomy - Dr. Sayuj Krishnan'
      }
    ]
  },
  alternates: {
    canonical: 'https://www.drsayuj.com/services/endoscopic-discectomy-hyderabad/'
  }
}

const medicalServiceSchema = {
  "@context": "https://schema.org",
  "@type": "MedicalService",
  "@id": "https://www.drsayuj.com/services/endoscopic-discectomy-hyderabad/#service",
  "name": "Endoscopic Discectomy",
  "description": "Minimally invasive endoscopic discectomy for herniated discs and sciatica relief in Hyderabad.",
  "url": "https://www.drsayuj.com/services/endoscopic-discectomy-hyderabad/",
  "areaServed": { "@type": "City", "name": "Hyderabad" },
  "provider": { "@id": "https://www.drsayuj.com/#physician" },
  "availableChannel": { "@type": "ServiceChannel", "serviceUrl": "https://www.drsayuj.com/appointments/" },
  "audience": { "@type": "MedicalAudience", "audienceType": ["Patients with sciatica", "Herniated disc", "Slip disc"] }
}

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is endoscopic discectomy?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Endoscopic discectomy is a minimally invasive procedure that uses a tiny 6-8mm incision and an endoscope to remove herniated disc material causing nerve compression and sciatica."
      }
    },
    {
      "@type": "Question",
      "name": "How long is recovery after endoscopic discectomy?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Most patients can walk the same day and return to desk work within 1-2 weeks. Full recovery typically takes 4-6 weeks with gradual return to normal activities."
      }
    },
    {
      "@type": "Question",
      "name": "Is endoscopic discectomy better than open surgery?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Endoscopic discectomy offers smaller incisions, less tissue damage, faster recovery, and lower risk of complications compared to traditional open surgery."
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
      "name": "Endoscopic Discectomy",
      "item": "https://www.drsayuj.com/services/endoscopic-discectomy-hyderabad/"
    }
  ]
}

export default function EndoscopicDiscectomyPage() {
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
            <li className="text-gray-900 font-medium">Endoscopic Discectomy</li>
          </ol>
        </nav>

        <article className="max-w-4xl mx-auto">
          <header className="mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Endoscopic Discectomy in Hyderabad
            </h1>
            <p className="text-lg text-gray-700">
              Minimally invasive treatment for herniated discs and sciatica with tiny incisions and faster recovery
            </p>
          </header>

          <div className="prose prose-lg max-w-none">
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">What is Endoscopic Discectomy?</h2>
              <p className="mb-4">
                Endoscopic discectomy is a minimally invasive surgical procedure that removes herniated disc material through a tiny 6-8mm incision using an endoscope. This advanced technique provides targeted relief for sciatica and nerve compression while preserving surrounding healthy tissue.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Who is a Candidate?</h2>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>Herniated disc causing severe leg pain (sciatica)</li>
                <li>Failed conservative treatment (medications, physiotherapy)</li>
                <li>Nerve compression confirmed by MRI</li>
                <li>Leg-dominant pain with minimal back pain</li>
                <li>Progressive weakness or numbness in legs</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Procedure Overview</h2>
              <ol className="list-decimal pl-6 space-y-3">
                <li><strong>Pre-operative evaluation:</strong> MRI review, clinical assessment, and anesthesia consultation</li>
                <li><strong>Positioning and anesthesia:</strong> Patient positioned for optimal access</li>
                <li><strong>Tiny incision:</strong> 6-8mm skin incision under imaging guidance</li>
                <li><strong>Endoscopic access:</strong> Working channel placement with endoscope insertion</li>
                <li><strong>Disc removal:</strong> Precise removal of herniated disc material</li>
                <li><strong>Verification:</strong> Confirmation of nerve decompression</li>
                <li><strong>Closure:</strong> Minimal sutures and early mobilization</li>
              </ol>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Benefits of Endoscopic Discectomy</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-xl font-medium text-gray-900 mb-3">Surgical Advantages</h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Tiny 6-8mm incision</li>
                    <li>Minimal muscle disruption</li>
                    <li>Reduced blood loss</li>
                    <li>Lower infection risk</li>
                    <li>Preserved spinal stability</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-medium text-gray-900 mb-3">Recovery Benefits</h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Same-day walking</li>
                    <li>Faster return to work</li>
                    <li>Less post-operative pain</li>
                    <li>Minimal scarring</li>
                    <li>Reduced hospital stay</li>
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
                      <li><strong>Day 0:</strong> Walking with assistance, pain management</li>
                      <li><strong>Day 1:</strong> Independent walking, discharge planning</li>
                      <li><strong>Week 1:</strong> Light activities, wound care</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-xl font-medium text-gray-900 mb-3">Return to Activities</h3>
                    <ul className="space-y-2 text-sm">
                      <li><strong>Week 2:</strong> Desk work, light driving</li>
                      <li><strong>Week 4:</strong> Light lifting, gentle exercise</li>
                      <li><strong>Week 6:</strong> Full activities, sports</li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Risks and Considerations</h2>
              <p className="mb-4">
                While endoscopic discectomy is generally safe, potential risks include:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Bleeding or infection</li>
                <li>Nerve root injury</li>
                <li>Dural tear (rare)</li>
                <li>Recurrent disc herniation</li>
                <li>Incomplete pain relief</li>
              </ul>
              <p className="mt-4">
                Dr. Sayuj Krishnan discusses all risks and benefits during consultation to ensure informed decision-making.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Frequently Asked Questions</h2>
              
              <div className="space-y-6">
                <div className="border-b pb-4">
                  <h3 className="text-lg font-medium text-gray-900 mb-2">What is endoscopic discectomy?</h3>
                  <p className="text-gray-700">Endoscopic discectomy is a minimally invasive procedure that uses a tiny 6-8mm incision and an endoscope to remove herniated disc material causing nerve compression and sciatica.</p>
                </div>

                <div className="border-b pb-4">
                  <h3 className="text-lg font-medium text-gray-900 mb-2">How long is recovery after endoscopic discectomy?</h3>
                  <p className="text-gray-700">Most patients can walk the same day and return to desk work within 1-2 weeks. Full recovery typically takes 4-6 weeks with gradual return to normal activities.</p>
                </div>

                <div className="border-b pb-4">
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Is endoscopic discectomy better than open surgery?</h3>
                  <p className="text-gray-700">Endoscopic discectomy offers smaller incisions, less tissue damage, faster recovery, and lower risk of complications compared to traditional open surgery.</p>
                </div>

                <div className="border-b pb-4">
                  <h3 className="text-lg font-medium text-gray-900 mb-2">When can I return to work?</h3>
                  <p className="text-gray-700">Desk work can often resume within 1-2 weeks, while physical jobs may require 4-6 weeks with a gradual return plan.</p>
                </div>

                <div className="border-b pb-4">
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Is the procedure covered by insurance?</h3>
                  <p className="text-gray-700">Most insurance providers cover endoscopic discectomy when medically indicated. Our team helps with pre-authorization and cost estimates.</p>
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
                    <a href="/services/endoscopic-foraminotomy-hyderabad/" className="text-blue-600 hover:text-blue-800">
                      Endoscopic Foraminotomy
                    </a>
                  </h3>
                  <p className="text-sm text-gray-600">Minimally invasive nerve decompression for foraminal stenosis</p>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Related Conditions</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="border rounded-lg p-4">
                  <h3 className="font-semibold mb-2">
                    <a href="/conditions/slip-disc-treatment-hyderabad/" className="text-blue-600 hover:text-blue-800">
                      Sciatica Treatment
                    </a>
                  </h3>
                  <p className="text-sm text-gray-600">Comprehensive treatment for sciatica and herniated discs</p>
                </div>
                <div className="border rounded-lg p-4">
                  <h3 className="font-semibold mb-2">
                    <a href="/conditions/spinal-stenosis-treatment-hyderabad/" className="text-blue-600 hover:text-blue-800">
                      Spinal Stenosis Treatment
                    </a>
                  </h3>
                  <p className="text-sm text-gray-600">Advanced treatment for spinal canal narrowing</p>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Why Choose Dr. Sayuj Krishnan?</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>Expertise in advanced endoscopic spine surgery techniques</li>
                <li>Safety-first approach with comprehensive pre-operative evaluation</li>
                <li>Clear communication and realistic expectations</li>
                <li>Structured follow-up and rehabilitation planning</li>
                <li>Patients from across Hyderabad: Malakpet, Charminar, Koti, Himayat Nagar, Abids, Secunderabad, Hitech City, Banjara Hills, Gachibowli, and LB Nagar</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Call to Action</h2>
              <div className="bg-blue-50 border-l-4 border-blue-400 p-6">
                <p className="text-lg text-blue-800 mb-4">
                  If you're experiencing sciatica or herniated disc symptoms, schedule a consultation with Dr. Sayuj Krishnan at Yashoda Hospitals – Malakpet. Bring your MRI and medical history for a comprehensive evaluation.
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
