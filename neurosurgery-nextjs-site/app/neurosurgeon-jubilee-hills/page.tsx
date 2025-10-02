import { Metadata } from 'next';
import Link from 'next/link';
import { SITE_URL } from '../../src/lib/seo';
import MedicalReviewNotice from '../../src/components/MedicalReviewNotice';

export const metadata: Metadata = {
  title: 'Best Neurosurgeon in Jubilee Hills | Dr. Sayuj Krishnan | Endoscopic Spine Surgery',
  description: 'Expert neurosurgeon in Jubilee Hills, Hyderabad. Endoscopic spine surgery, brain tumor surgery, epilepsy surgery. OPD at Yashoda Malakpet. Book consultation.',
  alternates: {
    canonical: `${SITE_URL}/neurosurgeon-jubilee-hills/`,
    languages: {
      'en-IN': `${SITE_URL}/neurosurgeon-jubilee-hills/`,
      'x-default': `${SITE_URL}/neurosurgeon-jubilee-hills/`
    }
  },
  openGraph: {
    title: 'Best Neurosurgeon in Jubilee Hills | Dr. Sayuj Krishnan',
    description: 'Expert neurosurgeon in Jubilee Hills, Hyderabad. Endoscopic spine surgery, brain tumor surgery, epilepsy surgery. OPD at Yashoda Malakpet.',
    url: `${SITE_URL}/neurosurgeon-jubilee-hills/`,
    siteName: 'Dr. Sayuj Krishnan - Neurosurgeon in Hyderabad',
    images: [
      {
        url: `${SITE_URL}/api/og?title=Neurosurgeon%20in%20Jubilee%20Hills&subtitle=Dr.%20Sayuj%20Krishnan`,
        width: 1200,
        height: 630,
        alt: 'Neurosurgeon in Jubilee Hills - Dr. Sayuj Krishnan',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
};

export default function NeurosurgeonJubileeHillsPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-16">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">Best Neurosurgeon in Jubilee Hills</h1>
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
          <h2 className="text-3xl font-bold text-blue-800 mb-6">Neurosurgeon Services in Jubilee Hills</h2>
          <div className="prose max-w-none">
            <p className="text-lg text-gray-700 mb-6">
              Dr. Sayuj Krishnan provides expert neurosurgical care for patients in Jubilee Hills and surrounding areas. 
              Specializing in minimally invasive endoscopic spine surgery and advanced brain surgery techniques, 
              Dr. Sayuj offers world-class treatment with faster recovery times and better outcomes.
            </p>
            <p className="text-gray-700 mb-6">
              Located conveniently for Jubilee Hills residents, Dr. Sayuj's OPD is at Yashoda Hospital Malakpet, 
              easily accessible via the Outer Ring Road and Metro connectivity.
            </p>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-blue-800 mb-6">Location & Accessibility</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <h3 className="text-lg font-semibold mb-3 text-blue-700">From Jubilee Hills</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• <strong>Distance:</strong> 12-15 km (25-30 minutes)</li>
                <li>• <strong>Route:</strong> Jubilee Hills → Outer Ring Road → Malakpet</li>
                <li>• <strong>Metro:</strong> Jubilee Hills Metro → Malakpet Metro (20 minutes)</li>
                <li>• <strong>Parking:</strong> Free parking available at Yashoda Malakpet</li>
              </ul>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <h3 className="text-lg font-semibold mb-3 text-blue-700">OPD Details</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• <strong>Hospital:</strong> Yashoda Hospital, Malakpet</li>
                <li>• <strong>Days:</strong> Monday to Saturday</li>
                <li>• <strong>Timings:</strong> 9:00 AM - 5:00 PM</li>
                <li>• <strong>Emergency:</strong> 24/7 available</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-blue-800 mb-6">Specialized Services</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <h3 className="text-lg font-semibold mb-3 text-blue-700">Endoscopic Spine Surgery</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• <Link href="/services/endoscopic-discectomy-hyderabad/" className="text-blue-600 hover:underline">Endoscopic Discectomy</Link></li>
                <li>• <Link href="/services/minimally-invasive-spine-surgery/" className="text-blue-600 hover:underline">Endoscopic Foraminotomy</Link></li>
                <li>• <Link href="/services/minimally-invasive-spine-surgery/" className="text-blue-600 hover:underline">ULBD (Lumbar Canal Stenosis)</Link></li>
                <li>• <Link href="/services/minimally-invasive-spine-surgery/" className="text-blue-600 hover:underline">Cervical Endoscopic Procedures</Link></li>
              </ul>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <h3 className="text-lg font-semibold mb-3 text-blue-700">Brain Surgery</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• <Link href="/services/brain-tumor-surgery-hyderabad/" className="text-blue-600 hover:underline">Brain Tumor Surgery</Link></li>
                <li>• <Link href="/services/epilepsy-surgery-hyderabad/" className="text-blue-600 hover:underline">Epilepsy Surgery</Link></li>
                <li>• <Link href="/conditions/trigeminal-neuralgia-treatment-hyderabad/" className="text-blue-600 hover:underline">Trigeminal Neuralgia Treatment</Link></li>
                <li>• <Link href="/conditions/trigeminal-neuralgia-treatment-hyderabad/" className="text-blue-600 hover:underline">MVD & Radiosurgery</Link></li>
              </ul>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-blue-800 mb-6">Frequently Asked Questions</h2>
          <div className="space-y-6">
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-3 text-blue-700">How do I reach Dr. Sayuj from Jubilee Hills?</h3>
              <p className="text-gray-700">The easiest route is via Outer Ring Road to Malakpet. You can also take the Metro from Jubilee Hills Metro Station to Malakpet Metro Station, which takes about 20 minutes.</p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-3 text-blue-700">Is parking available at Yashoda Malakpet?</h3>
              <p className="text-gray-700">Yes, Yashoda Hospital Malakpet has free parking facilities for patients and visitors. The parking area is well-maintained and secure.</p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-3 text-blue-700">What are the consultation timings?</h3>
              <p className="text-gray-700">Dr. Sayuj's OPD runs Monday to Saturday from 9:00 AM to 5:00 PM. Emergency consultations are available 24/7 for urgent cases.</p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-3 text-blue-700">Do you accept insurance for consultations?</h3>
              <p className="text-gray-700">Yes, we accept most major insurance providers. Please bring your insurance card and referral letter (if required) for your consultation.</p>
            </div>
          </div>
        </section>

        <section className="bg-blue-50 p-8 rounded-lg text-center">
          <h2 className="text-2xl font-bold text-blue-800 mb-4">Ready to Book Your Consultation?</h2>
          <p className="text-gray-600 mb-6">
            Dr. Sayuj Krishnan provides expert neurosurgical care for patients in Jubilee Hills and surrounding areas.
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
            "mainEntityOfPage": `${SITE_URL}/neurosurgeon-jubilee-hills/`,
            "name": "Best Neurosurgeon in Jubilee Hills | Dr. Sayuj Krishnan",
            "description": "Expert neurosurgeon in Jubilee Hills, Hyderabad. Endoscopic spine surgery, brain tumor surgery, epilepsy surgery. OPD at Yashoda Malakpet.",
            "medicalSpecialty": "Neurosurgery",
            "about": {
              "@type": "MedicalProcedure",
              "name": "Neurosurgery Services",
              "description": "Endoscopic spine surgery and brain surgery services"
            },
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
                  "name": "Neurosurgeon in Jubilee Hills",
                  "item": `${SITE_URL}/neurosurgeon-jubilee-hills/`
                }
              ]
            },
            "hasPart": [
              {
                "@type": "FAQPage",
                "mainEntity": [
                  {
                    "@type": "Question",
                    "name": "How do I reach Dr. Sayuj from Jubilee Hills?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "The easiest route is via Outer Ring Road to Malakpet. You can also take the Metro from Jubilee Hills Metro Station to Malakpet Metro Station, which takes about 20 minutes."
                    }
                  },
                  {
                    "@type": "Question",
                    "name": "Is parking available at Yashoda Malakpet?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "Yes, Yashoda Hospital Malakpet has free parking facilities for patients and visitors. The parking area is well-maintained and secure."
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
