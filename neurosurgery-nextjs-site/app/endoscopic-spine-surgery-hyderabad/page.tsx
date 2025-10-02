import { Metadata } from 'next';
import Link from 'next/link';
import { SITE_URL } from '../../src/lib/seo';
import MedicalReviewNotice from '../../src/components/MedicalReviewNotice';

export const metadata: Metadata = {
  title: 'Endoscopic Spine Surgery in Hyderabad | Dr. Sayuj Krishnan | Minimally Invasive Techniques',
  description: 'Expert endoscopic spine surgery in Hyderabad. Advanced minimally invasive techniques for disc herniation, stenosis, and nerve compression. Faster recovery, less pain. Book consultation.',
  alternates: {
    canonical: `${SITE_URL}/endoscopic-spine-surgery-hyderabad/`,
    languages: {
      'en-IN': `${SITE_URL}/endoscopic-spine-surgery-hyderabad/`,
      'x-default': `${SITE_URL}/endoscopic-spine-surgery-hyderabad/`
    }
  },
  openGraph: {
    title: 'Endoscopic Spine Surgery in Hyderabad | Dr. Sayuj Krishnan',
    description: 'Expert endoscopic spine surgery in Hyderabad. Advanced minimally invasive techniques for disc herniation, stenosis, and nerve compression. Faster recovery, less pain.',
    url: `${SITE_URL}/endoscopic-spine-surgery-hyderabad/`,
    siteName: 'Dr. Sayuj Krishnan - Neurosurgeon in Hyderabad',
    images: [
      {
        url: `${SITE_URL}/api/og?title=Endoscopic%20Spine%20Surgery%20in%20Hyderabad&subtitle=Dr.%20Sayuj%20Krishnan`,
        width: 1200,
        height: 630,
        alt: 'Endoscopic Spine Surgery in Hyderabad - Dr. Sayuj Krishnan',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
};

export default function EndoscopicSpineSurgeryHyderabadPage() {
  const techniques = [
    {
      title: 'Inside-Out Technique',
      description: 'Endoscopic access through the spinal canal for central disc herniations',
      benefits: ['Direct visualization', 'Minimal tissue damage', 'Precise decompression', 'Lower complication rate'],
      indications: 'Central disc herniations, spinal stenosis'
    },
    {
      title: 'Outside-In Technique', 
      description: 'Endoscopic access through the intervertebral foramen for lateral disc herniations',
      benefits: ['Foraminal access', 'Preserved stability', 'Quick recovery', 'Reduced scarring'],
      indications: 'Lateral disc herniations, foraminal stenosis'
    }
  ];

  const procedures = [
    {
      title: 'Endoscopic Discectomy',
      description: 'Removal of herniated disc material through small incisions',
      recovery: '1-2 weeks',
      success: '85-90%'
    },
    {
      title: 'Endoscopic Foraminotomy',
      description: 'Decompression of nerve roots through enlarged foraminal openings',
      recovery: '2-3 weeks', 
      success: '80-85%'
    },
    {
      title: 'ULBD (Unilateral Laminotomy Bilateral Decompression)',
      description: 'Bilateral decompression for spinal stenosis using unilateral approach',
      recovery: '2-4 weeks',
      success: '85-90%'
    },
    {
      title: 'Cervical Endoscopic Procedures',
      description: 'Minimally invasive cervical discectomy and foraminotomy',
      recovery: '1-2 weeks',
      success: '80-90%'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-16">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">Endoscopic Spine Surgery in Hyderabad</h1>
          <p className="text-lg text-gray-600">Dr. Sayuj Krishnan - Advanced Minimally Invasive Techniques</p>
        </header>

        <section className="bg-blue-50 p-6 rounded-lg mb-8">
          <p className="text-center">
            <strong>Contact:</strong>
            <a href="tel:+919778280044" className="text-blue-600 hover:underline ml-2">+91-9778280044</a> •
            <a href="mailto:neurospinehyd@drsayuj.com" className="text-blue-600 hover:underline ml-2">neurospinehyd@drsayuj.com</a> •
            <a href="/appointments" className="text-blue-600 hover:underline ml-2">Book Consultation</a>
          </p>
        </section>

        <MedicalReviewNotice />

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-blue-800 mb-6">What is Endoscopic Spine Surgery?</h2>
          <div className="prose max-w-none">
            <p className="text-lg text-gray-700 mb-6">
              Endoscopic spine surgery is a revolutionary minimally invasive technique that uses small incisions (8-10mm) 
              and specialized endoscopic instruments to treat various spine conditions. Dr. Sayuj Krishnan is a leading 
              expert in endoscopic spine surgery in Hyderabad, offering patients the benefits of modern surgical techniques 
              with significantly reduced trauma and faster recovery.
            </p>
            <p className="text-gray-700 mb-6">
              Unlike traditional open surgery, endoscopic procedures preserve muscle and ligament structures while 
              providing excellent visualization and precise treatment of spinal conditions. This approach results in 
              less post-operative pain, reduced blood loss, and quicker return to normal activities.
            </p>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-blue-800 mb-6">Advanced Techniques</h2>
          <div className="space-y-8">
            {techniques.map((technique, index) => (
              <div key={index} className="bg-white border border-gray-200 rounded-lg p-8 shadow-sm">
                <h3 className="text-2xl font-semibold text-blue-700 mb-4">{technique.title}</h3>
                <p className="text-gray-600 mb-6">{technique.description}</p>
                
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="font-semibold text-gray-700 mb-3">Benefits:</h4>
                    <ul className="space-y-2">
                      {technique.benefits.map((benefit, idx) => (
                        <li key={idx} className="text-gray-600">• {benefit}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-700 mb-3">Best Suited For:</h4>
                    <p className="text-gray-600">{technique.indications}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-blue-800 mb-6">Procedures We Offer</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {procedures.map((procedure, index) => (
              <div key={index} className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                <h3 className="text-xl font-semibold text-blue-700 mb-3">{procedure.title}</h3>
                <p className="text-gray-600 mb-4">{procedure.description}</p>
                
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="bg-blue-50 p-3 rounded">
                    <div className="font-semibold text-blue-700">Recovery Time</div>
                    <div className="text-gray-600">{procedure.recovery}</div>
                  </div>
                  <div className="bg-green-50 p-3 rounded">
                    <div className="font-semibold text-green-700">Success Rate</div>
                    <div className="text-gray-600">{procedure.success}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-blue-800 mb-6">Indications for Endoscopic Spine Surgery</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <h3 className="text-lg font-semibold mb-3 text-blue-700">Lumbar Conditions</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• Herniated lumbar discs (L4-L5, L5-S1)</li>
                <li>• Lumbar spinal stenosis</li>
                <li>• Foraminal stenosis</li>
                <li>• Nerve root compression</li>
                <li>• Failed conservative treatment</li>
              </ul>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <h3 className="text-lg font-semibold mb-3 text-blue-700">Cervical Conditions</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• Herniated cervical discs</li>
                <li>• Cervical radiculopathy</li>
                <li>• Cervical foraminal stenosis</li>
                <li>• Cervical myelopathy (selected cases)</li>
                <li>• Neck and arm pain</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-blue-800 mb-6">Recovery Timeline</h2>
          <div className="bg-white p-8 rounded-lg shadow-sm border">
            <div className="grid md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-blue-600">0</span>
                </div>
                <h3 className="font-semibold text-blue-700 mb-2">Day 0</h3>
                <p className="text-sm text-gray-600">Same-day discharge or 1-night stay</p>
              </div>
              <div className="text-center">
                <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-blue-600">1</span>
                </div>
                <h3 className="font-semibold text-blue-700 mb-2">Week 1</h3>
                <p className="text-sm text-gray-600">Light walking, wound care</p>
              </div>
              <div className="text-center">
                <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-blue-600">2</span>
                </div>
                <h3 className="font-semibold text-blue-700 mb-2">Week 2</h3>
                <p className="text-sm text-gray-600">Return to desk work</p>
              </div>
              <div className="text-center">
                <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-blue-600">4</span>
                </div>
                <h3 className="font-semibold text-blue-700 mb-2">Week 4</h3>
                <p className="text-sm text-gray-600">Full activity, driving</p>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-blue-800 mb-6">Cost & Insurance</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <h3 className="text-lg font-semibold mb-3 text-blue-700">Procedure Costs</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• Endoscopic Discectomy: ₹1.5-2.5 lakhs</li>
                <li>• Endoscopic Foraminotomy: ₹1.8-2.8 lakhs</li>
                <li>• ULBD: ₹2.0-3.0 lakhs</li>
                <li>• Cervical Procedures: ₹1.8-2.8 lakhs</li>
                <li>• <em>Costs may vary based on complexity</em></li>
              </ul>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <h3 className="text-lg font-semibold mb-3 text-blue-700">Insurance Coverage</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• Most major insurance providers accepted</li>
                <li>• Cashless treatment available</li>
                <li>• Corporate insurance plans</li>
                <li>• EMI options for major procedures</li>
                <li>• Transparent pricing with no hidden charges</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-blue-800 mb-6">Frequently Asked Questions</h2>
          <div className="space-y-6">
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-3 text-blue-700">Who is a candidate for endoscopic spine surgery?</h3>
              <p className="text-gray-700">Candidates include patients with herniated discs, spinal stenosis, or nerve compression who have failed conservative treatment. Ideal candidates have MRI-confirmed pathology that matches their symptoms and no significant spinal instability.</p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-3 text-blue-700">Endoscopic vs microdiscectomy—which is safer and recovery time?</h3>
              <p className="text-gray-700">Endoscopic surgery is generally safer with smaller incisions (8-10mm vs 3-4cm), less muscle damage, and faster recovery (1-2 weeks vs 3-4 weeks). However, patient selection is crucial for optimal outcomes.</p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-3 text-blue-700">What is the success rate and possible complications for endoscopic spine surgery?</h3>
              <p className="text-gray-700">Success rates are 85-90% for appropriately selected patients. Possible complications include infection (1-2%), nerve injury (rare), and reherniation (5-10%). Dr. Sayuj discusses all risks during consultation.</p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-3 text-blue-700">How soon can I return to work after endoscopic spine surgery?</h3>
              <p className="text-gray-700">Most patients can return to desk work within 1-2 weeks and full activities within 4-6 weeks. Manual labor may require 6-8 weeks. Recovery depends on the specific procedure and individual healing.</p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-3 text-blue-700">What anesthesia is used for endoscopic spine surgery?</h3>
              <p className="text-gray-700">Endoscopic spine surgery is performed under general anesthesia for patient comfort and safety. The procedure typically takes 45-90 minutes depending on complexity.</p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-3 text-blue-700">Can endoscopic surgery be repeated if needed?</h3>
              <p className="text-gray-700">Yes, endoscopic surgery can be repeated if necessary. The minimally invasive nature means less scar tissue formation, making revision surgery technically easier than after open procedures.</p>
            </div>
          </div>
        </section>

        <section className="bg-blue-50 p-8 rounded-lg text-center">
          <h2 className="text-2xl font-bold text-blue-800 mb-4">Ready to Discuss Endoscopic Spine Surgery?</h2>
          <p className="text-gray-600 mb-6">
            Dr. Sayuj Krishnan provides expert evaluation and personalized treatment plans for endoscopic spine surgery.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/appointments/"
              className="bg-blue-600 text-white px-8 py-3 rounded-full hover:bg-blue-700 transition-colors"
            >
              Book Consultation
            </Link>
            <Link 
              href="/services/minimally-invasive-spine-surgery/"
              className="border-2 border-blue-600 text-blue-600 px-8 py-3 rounded-full hover:bg-blue-600 hover:text-white transition-colors"
            >
              All Spine Services
            </Link>
            <a 
              href="https://wa.me/919778280044"
              className="border-2 border-green-600 text-green-600 px-8 py-3 rounded-full hover:bg-green-600 hover:text-white transition-colors"
            >
              WhatsApp
            </a>
          </div>
        </section>
      </div>

      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "MedicalWebPage",
            "mainEntityOfPage": `${SITE_URL}/endoscopic-spine-surgery-hyderabad/`,
            "name": "Endoscopic Spine Surgery in Hyderabad | Dr. Sayuj Krishnan",
            "description": "Expert endoscopic spine surgery in Hyderabad. Advanced minimally invasive techniques for disc herniation, stenosis, and nerve compression. Faster recovery, less pain.",
            "medicalSpecialty": "Neurosurgery",
            "about": [
              {
                "@type": "MedicalProcedure",
                "name": "Endoscopic Discectomy",
                "description": "Removal of herniated disc material through small incisions"
              },
              {
                "@type": "MedicalProcedure",
                "name": "Endoscopic Foraminotomy",
                "description": "Decompression of nerve roots through enlarged foraminal openings"
              },
              {
                "@type": "MedicalProcedure",
                "name": "ULBD",
                "description": "Unilateral laminotomy bilateral decompression for spinal stenosis"
              }
            ],
            "author": {
              "@id": `${SITE_URL}/#physician`
            },
            "publisher": {
              "@id": `${SITE_URL}/#organization`
            },
            "datePublished": "2023-01-01T00:00:00+05:30",
            "dateModified": new Date().toISOString(),
            "breadcrumb": {
              "@type": "BreadcrumbList",
              "itemListElement": [
                {
                  "@type": "ListItem",
                  "position": 1,
                  "name": "Home",
                  "item": `${SITE_URL}/`
                },
                {
                  "@type": "ListItem",
                  "position": 2,
                  "name": "Endoscopic Spine Surgery in Hyderabad",
                  "item": `${SITE_URL}/endoscopic-spine-surgery-hyderabad/`
                }
              ]
            },
            "hasPart": [
              {
                "@type": "FAQPage",
                "mainEntity": [
                  {
                    "@type": "Question",
                    "name": "Who is a candidate for endoscopic spine surgery?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "Candidates include patients with herniated discs, spinal stenosis, or nerve compression who have failed conservative treatment. Ideal candidates have MRI-confirmed pathology that matches their symptoms and no significant spinal instability."
                    }
                  },
                  {
                    "@type": "Question",
                    "name": "Endoscopic vs microdiscectomy—which is safer and recovery time?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "Endoscopic surgery is generally safer with smaller incisions (8-10mm vs 3-4cm), less muscle damage, and faster recovery (1-2 weeks vs 3-4 weeks). However, patient selection is crucial for optimal outcomes."
                    }
                  },
                  {
                    "@type": "Question",
                    "name": "What is the success rate and possible complications for endoscopic spine surgery?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "Success rates are 85-90% for appropriately selected patients. Possible complications include infection (1-2%), nerve injury (rare), and reherniation (5-10%). Dr. Sayuj discusses all risks during consultation."
                    }
                  },
                  {
                    "@type": "Question",
                    "name": "How soon can I return to work after endoscopic spine surgery?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "Most patients can return to desk work within 1-2 weeks and full activities within 4-6 weeks. Manual labor may require 6-8 weeks. Recovery depends on the specific procedure and individual healing."
                    }
                  }
                ]
              }
            ]
          })
        }}
      />
    </div>
  );
}
