import { Metadata } from 'next';
import Link from 'next/link';
import { SITE_URL } from '../../src/lib/seo';
import MedicalReviewNotice from '../../src/components/MedicalReviewNotice';

export const metadata: Metadata = {
  title: 'Best Neurosurgeon in Hyderabad | Endoscopic Spine & Brain Surgery | Dr. Sayuj Krishnan',
  description: 'Best neurosurgeon in Hyderabad specializing in endoscopic spine surgery, brain tumor surgery, epilepsy surgery. OPD at Yashoda Malakpet. Book consultation with Dr. Sayuj Krishnan.',
  alternates: {
    canonical: `${SITE_URL}/neurosurgeon-hyderabad/`,
    languages: {
      'en-IN': `${SITE_URL}/neurosurgeon-hyderabad/`,
      'x-default': `${SITE_URL}/neurosurgeon-hyderabad/`
    }
  },
  openGraph: {
    title: 'Best Neurosurgeon in Hyderabad | Endoscopic Spine & Brain Surgery | Dr. Sayuj Krishnan',
    description: 'Best neurosurgeon in Hyderabad specializing in endoscopic spine surgery, brain tumor surgery, epilepsy surgery. OPD at Yashoda Malakpet. Book consultation.',
    url: `${SITE_URL}/neurosurgeon-hyderabad/`,
    siteName: 'Dr. Sayuj Krishnan - Neurosurgeon in Hyderabad',
    images: [
      {
        url: `${SITE_URL}/api/og?title=Best%20Neurosurgeon%20in%20Hyderabad&subtitle=Dr.%20Sayuj%20Krishnan`,
        width: 1200,
        height: 630,
        alt: 'Best Neurosurgeon in Hyderabad - Dr. Sayuj Krishnan',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
};

export default function NeurosurgeonHyderabadPage() {
  const services = [
    {
      title: 'Endoscopic Spine Surgery',
      description: 'Minimally invasive spine procedures with faster recovery',
      href: '/services/minimally-invasive-spine-surgery/',
      features: ['8-10mm incisions', 'Same-day discharge', 'Faster recovery', 'Less pain']
    },
    {
      title: 'Brain Tumor Surgery',
      description: 'Advanced neuronavigation-guided microsurgery',
      href: '/services/brain-tumor-surgery-hyderabad/',
      features: ['Neuronavigation', 'Neuromonitoring', 'Awake craniotomy', 'Multidisciplinary care']
    },
    {
      title: 'Epilepsy Surgery',
      description: 'Comprehensive treatment for drug-resistant epilepsy',
      href: '/services/epilepsy-surgery-hyderabad/',
      features: ['LITT', 'Resection surgery', 'VNS', 'Comprehensive evaluation']
    },
    {
      title: 'Trigeminal Neuralgia Treatment',
      description: 'Advanced MVD and radiosurgery techniques',
      href: '/conditions/trigeminal-neuralgia-treatment-hyderabad/',
      features: ['MVD', 'Radiosurgery', 'Percutaneous procedures', 'Medical therapy']
    }
  ];

  const locations = [
    { name: 'Jubilee Hills', href: '/neurosurgeon-jubilee-hills/' },
    { name: 'Banjara Hills', href: '/neurosurgeon-banjara-hills/' },
    { name: 'Hitech City', href: '/neurosurgeon-hitech-city/' },
    { name: 'Gachibowli', href: '/neurosurgeon-gachibowli/' },
    { name: 'Secunderabad', href: '/neurosurgeon-secunderabad/' },
    { name: 'Malakpet', href: '/locations/malakpet/' }
  ];

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-16">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">Best Neurosurgeon in Hyderabad</h1>
          <p className="text-lg text-gray-600">Dr. Sayuj Krishnan - Expert Endoscopic Spine & Brain Surgery</p>
        </header>

        <section className="bg-blue-50 p-6 rounded-lg mb-8">
          <p className="text-center">
            <strong>Contact:</strong>
            <a href="tel:+919778280044" className="text-blue-600 hover:underline ml-2">+91-9778280044</a> •
            <a href="mailto:neurospinehyd@drsayuj.com" className="text-blue-600 hover:underline ml-2">neurospinehyd@drsayuj.com</a> •
            <a href="/appointments" className="text-blue-600 hover:underline ml-2">Book Appointment</a>
          </p>
        </section>

        <MedicalReviewNotice />

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-blue-800 mb-6">Why Choose Dr. Sayuj Krishnan?</h2>
          <div className="prose max-w-none">
            <p className="text-lg text-gray-700 mb-6">
              Dr. Sayuj Krishnan is recognized as one of the best neurosurgeons in Hyderabad, specializing in minimally invasive 
              endoscopic spine surgery and advanced brain surgery techniques. With over 15 years of experience and specialized 
              training in endoscopic procedures, Dr. Sayuj offers patients the benefits of modern surgical techniques with 
              reduced trauma and quicker recovery.
            </p>
            <p className="text-gray-700 mb-6">
              Dr. Sayuj's expertise in endoscopic spine surgery has made him a preferred choice for patients seeking 
              advanced neurosurgical care in Hyderabad. His commitment to patient safety, evidence-based practice, 
              and continuous learning ensures optimal outcomes for every patient.
            </p>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-blue-800 mb-6">Specialized Services</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <div key={index} className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
                <h3 className="text-xl font-semibold text-blue-700 mb-3">{service.title}</h3>
                <p className="text-gray-700 mb-4">{service.description}</p>
                
                <div className="mb-4">
                  <h4 className="font-semibold text-gray-700 mb-2">Key Features:</h4>
                  <ul className="space-y-1">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="text-sm text-gray-600">• {feature}</li>
                    ))}
                  </ul>
                </div>
                
                <Link 
                  href={service.href}
                  className="inline-block bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition-colors"
                >
                  Learn More
                </Link>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-blue-800 mb-6">OPD Details & Location</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <h3 className="text-lg font-semibold mb-3 text-blue-700">Yashoda Hospital, Malakpet</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• <strong>Address:</strong> Yashoda Hospital, Malakpet, Hyderabad</li>
                <li>• <strong>OPD Days:</strong> Monday to Saturday</li>
                <li>• <strong>Timings:</strong> 9:00 AM - 5:00 PM</li>
                <li>• <strong>Emergency:</strong> 24/7 available</li>
                <li>• <strong>Parking:</strong> Free parking available</li>
                <li>• <strong>Metro:</strong> Malakpet Metro Station (5 min walk)</li>
              </ul>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <h3 className="text-lg font-semibold mb-3 text-blue-700">Insurance & Payment</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• Most major insurance providers accepted</li>
                <li>• Cashless treatment available</li>
                <li>• EMI options for major procedures</li>
                <li>• Transparent pricing</li>
                <li>• No hidden charges</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-blue-800 mb-6">Serving Areas in Hyderabad</h2>
          <div className="grid md:grid-cols-3 gap-4">
            {locations.map((location, index) => (
              <Link 
                key={index}
                href={location.href}
                className="bg-blue-50 p-4 rounded-lg text-center hover:bg-blue-100 transition-colors"
              >
                <span className="text-blue-700 font-medium">Neurosurgeon in {location.name}</span>
              </Link>
            ))}
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-blue-800 mb-6">Frequently Asked Questions</h2>
          <div className="space-y-6">
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-3 text-blue-700">What makes Dr. Sayuj the best neurosurgeon in Hyderabad?</h3>
              <p className="text-gray-700">Dr. Sayuj Krishnan combines extensive experience (15+ years) with specialized training in endoscopic spine surgery. His expertise in minimally invasive techniques, commitment to patient safety, and evidence-based approach make him a preferred choice for neurosurgical care in Hyderabad.</p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-3 text-blue-700">What is endoscopic spine surgery?</h3>
              <p className="text-gray-700">Endoscopic spine surgery uses small incisions (8-10mm) and specialized instruments to treat spine conditions. This minimally invasive approach results in less pain, faster recovery, and reduced risk of complications compared to traditional open surgery.</p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-3 text-blue-700">How do I book an appointment?</h3>
              <p className="text-gray-700">You can book an appointment by calling +91-9778280044, emailing neurospinehyd@drsayuj.com, or using our online booking system. OPD consultations are available Monday to Saturday at Yashoda Hospital, Malakpet.</p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-3 text-blue-700">Do you accept insurance?</h3>
              <p className="text-gray-700">Yes, we accept most major insurance providers including corporate insurance plans. Cashless treatment is available for eligible patients. Please bring your insurance card and referral letter for your consultation.</p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-3 text-blue-700">What should I bring to my consultation?</h3>
              <p className="text-gray-700">Please bring your MRI/CT scans, previous medical records, list of current medications, insurance card, and referral letter (if required). Having your imaging studies helps Dr. Sayuj provide a more accurate assessment.</p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-3 text-blue-700">How long is the recovery time for endoscopic procedures?</h3>
              <p className="text-gray-700">Recovery times vary by procedure, but most endoscopic spine surgeries allow patients to return to desk work within 1-2 weeks and full activities within 4-6 weeks. This is significantly faster than traditional open surgery.</p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-3 text-blue-700">Is emergency consultation available?</h3>
              <p className="text-gray-700">Yes, emergency consultations are available 24/7 for urgent neurosurgical cases. For emergencies, please call +91-9778280044 or visit the emergency department at Yashoda Hospital, Malakpet.</p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-3 text-blue-700">What are the success rates of endoscopic spine surgery?</h3>
              <p className="text-gray-700">Endoscopic spine surgery has success rates of 85-90% for appropriately selected patients. Success depends on proper patient selection, accurate diagnosis, and surgical technique. Dr. Sayuj discusses expected outcomes during consultation.</p>
            </div>
          </div>
        </section>

        <section className="bg-blue-50 p-8 rounded-lg text-center">
          <h2 className="text-2xl font-bold text-blue-800 mb-4">Ready to Consult Hyderabad's Best Neurosurgeon?</h2>
          <p className="text-gray-600 mb-6">
            Dr. Sayuj Krishnan provides expert neurosurgical care with advanced endoscopic techniques and personalized treatment plans.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/appointments/"
              className="bg-blue-600 text-white px-8 py-3 rounded-full hover:bg-blue-700 transition-colors"
            >
              Book Consultation
            </Link>
            <a 
              href="https://wa.me/919778280044"
              className="border-2 border-green-600 text-green-600 px-8 py-3 rounded-full hover:bg-green-600 hover:text-white transition-colors"
            >
              WhatsApp
            </a>
            <Link 
              href="/about/"
              className="border-2 border-blue-600 text-blue-600 px-8 py-3 rounded-full hover:bg-blue-600 hover:text-white transition-colors"
            >
              About Dr. Sayuj
            </Link>
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
            "mainEntityOfPage": `${SITE_URL}/neurosurgeon-hyderabad/`,
            "name": "Best Neurosurgeon in Hyderabad | Dr. Sayuj Krishnan",
            "description": "Best neurosurgeon in Hyderabad specializing in endoscopic spine surgery, brain tumor surgery, epilepsy surgery. OPD at Yashoda Malakpet.",
            "medicalSpecialty": "Neurosurgery",
            "about": [
              {
                "@type": "MedicalProcedure",
                "name": "Endoscopic Spine Surgery",
                "description": "Minimally invasive spine procedures with faster recovery"
              },
              {
                "@type": "MedicalProcedure",
                "name": "Brain Tumor Surgery", 
                "description": "Advanced neuronavigation-guided microsurgery"
              },
              {
                "@type": "MedicalProcedure",
                "name": "Epilepsy Surgery",
                "description": "Comprehensive treatment for drug-resistant epilepsy"
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
                  "name": "Best Neurosurgeon in Hyderabad",
                  "item": `${SITE_URL}/neurosurgeon-hyderabad/`
                }
              ]
            },
            "potentialAction": {
              "@type": "SeekToAction",
              "target": `${SITE_URL}/appointments`,
              "queryInput": "required name=query"
            },
            "hasPart": [
              {
                "@type": "FAQPage",
                "mainEntity": [
                  {
                    "@type": "Question",
                    "name": "What makes Dr. Sayuj the best neurosurgeon in Hyderabad?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "Dr. Sayuj Krishnan combines extensive experience (15+ years) with specialized training in endoscopic spine surgery. His expertise in minimally invasive techniques, commitment to patient safety, and evidence-based approach make him a preferred choice for neurosurgical care in Hyderabad."
                    }
                  },
                  {
                    "@type": "Question",
                    "name": "What is endoscopic spine surgery?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "Endoscopic spine surgery uses small incisions (8-10mm) and specialized instruments to treat spine conditions. This minimally invasive approach results in less pain, faster recovery, and reduced risk of complications compared to traditional open surgery."
                    }
                  },
                  {
                    "@type": "Question",
                    "name": "How do I book an appointment?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "You can book an appointment by calling +91-9778280044, emailing neurospinehyd@drsayuj.com, or using our online booking system. OPD consultations are available Monday to Saturday at Yashoda Hospital, Malakpet."
                    }
                  },
                  {
                    "@type": "Question",
                    "name": "Do you accept insurance?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "Yes, we accept most major insurance providers including corporate insurance plans. Cashless treatment is available for eligible patients. Please bring your insurance card and referral letter for your consultation."
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
