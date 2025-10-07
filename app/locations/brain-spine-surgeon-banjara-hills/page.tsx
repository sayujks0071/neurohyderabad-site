import { Metadata } from 'next';
import Link from 'next/link';
import StandardCTA from '@/app/_components/StandardCTA';
import NAP from '@/app/_components/NAP';
import ReviewedBy from '@/app/_components/ReviewedBy';
import SchemaScript from '@/app/_components/SchemaScript';

export const metadata: Metadata = {
  title: 'Brain & Spine Surgeon near Banjara Hills, Hyderabad',
  description: 'Advanced brain and spine care near Banjara Hills, Hyderabad. Directions to Yashoda Hospital, Malakpet. Parking, timings, and appointment info.',
  keywords: 'brain surgeon Banjara Hills, spine surgeon Banjara Hills, neurosurgeon near Banjara Hills, Yashoda Hospital Malakpet, Hyderabad',
  alternates: {
    canonical: 'https://www.drsayuj.com/locations/brain-spine-surgeon-banjara-hills',
    languages: {
      'en-IN': 'https://www.drsayuj.com/locations/brain-spine-surgeon-banjara-hills',
      'x-default': 'https://www.drsayuj.com/locations/brain-spine-surgeon-banjara-hills',
    },
  },
  openGraph: {
    title: 'Brain & Spine Surgeon near Banjara Hills, Hyderabad',
    description: 'Advanced brain and spine care near Banjara Hills, Hyderabad. Directions to Yashoda Hospital, Malakpet. Parking, timings, and appointment info.',
    type: 'website',
  },
};

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Dr. Sayuj Krishnan - Neurosurgeon",
  "image": "https://www.drsayuj.com/images/og-default.jpg",
  "url": "https://www.drsayuj.com/locations/brain-spine-surgeon-banjara-hills",
  "telephone": "+919778280044",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "OPD Block, Room No 317, Yashoda Hospital, Malakpet",
    "addressLocality": "Hyderabad",
    "addressRegion": "Telangana",
    "postalCode": "500036",
    "addressCountry": "IN"
  },
  "areaServed": {
    "@type": "City",
    "name": "Hyderabad"
  },
  "department": {
    "@type": "Hospital",
    "name": "Yashoda Hospital - Malakpet"
  }
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Do you have a clinic in Banjara Hills?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "We consult at Yashoda Hospital, Malakpet. Teleconsultations may be arranged on a case-by-case basis."
      }
    },
    {
      "@type": "Question",
      "name": "What are the OPD timings?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Please confirm current timings when booking. Urgent cases are accommodated where possible."
      }
    },
    {
      "@type": "Question",
      "name": "Is parking available?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, parking is available. Allow extra time during peak hours."
      }
    },
    {
      "@type": "Question",
      "name": "Do you offer cashless insurance?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Many plans are supported with pre-authorization. Please bring your insurance details."
      }
    }
  ]
};

export default function BanjaraHillsLocationPage() {
  return (
    <div className="min-h-screen bg-white">
      <SchemaScript data={localBusinessSchema} />
      <SchemaScript data={faqSchema} />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-50 to-indigo-100 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Brain & Spine Surgeon near Banjara Hills, Hyderabad
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Advanced neurosurgical care with convenient access from Banjara Hills
            </p>
            <StandardCTA />
          </div>
        </div>
      </section>

      {/* Overview */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Overview</h2>
          <p className="text-lg text-gray-700 leading-relaxed mb-6">
            Patients from Banjara Hills often visit our Malakpet OPD for minimally invasive spine surgery (endoscopic discectomy/ULBD), 
            trigeminal neuralgia (MVD/radiosurgery), brain tumor surgery, and epilepsy surgery.
          </p>
          <p className="text-lg text-gray-700 leading-relaxed">
            Our location at Yashoda Hospital, Malakpet provides specialized neurosurgical care with state-of-the-art facilities 
            and experienced medical professionals.
          </p>
        </div>
      </section>

      {/* Getting Here */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Getting Here from Banjara Hills</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Drive Time</h3>
              <p className="text-gray-700 mb-4">
                20–35 minutes outside peak via Banjara Hills Rd → Nampally → Malakpet.
              </p>
              <Link 
                href="https://maps.google.com/?q=Yashoda+Hospital+Malakpet+Hyderabad"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium"
              >
                Get Directions on Google Maps
                <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </Link>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Transportation Options</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• App-based cabs (Ola/Uber)</li>
                <li>• Private vehicle with parking available</li>
                <li>• Public transport connections available</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Parking and OPD Details */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Parking and OPD Block Details</h2>
          <div className="bg-blue-50 p-6 rounded-lg">
            <h3 className="text-xl font-bold text-blue-900 mb-4">Location</h3>
            <p className="text-blue-800 mb-4">
              OPD Block, Room No 317, Yashoda Hospital, Malakpet
            </p>
            <p className="text-blue-800">
              Parking options available. Best times to avoid peak congestion are early morning slots (8-10 AM) 
              or late afternoon (4-6 PM).
            </p>
          </div>
        </div>
      </section>

      {/* What to Bring */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">What to Bring</h2>
          <ul className="space-y-4 text-lg text-gray-700">
            <li className="flex items-start">
              <span className="text-blue-500 mr-3 mt-1">•</span>
              <span>MRI/CT scans (bring films or CD)</span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-500 mr-3 mt-1">•</span>
              <span>EMG/NCS reports (if nerve/spine related)</span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-500 mr-3 mt-1">•</span>
              <span>Current medication list</span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-500 mr-3 mt-1">•</span>
              <span>Previous consultation notes</span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-500 mr-3 mt-1">•</span>
              <span>Insurance details (if applicable)</span>
            </li>
          </ul>
        </div>
      </section>

      {/* Common Reasons */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Common Reasons Patients from Banjara Hills Choose Us</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Specialized Consultations</h3>
              <p className="text-gray-700">
                Trigeminal neuralgia evaluations and second opinions for brain tumor surgery; 
                clarification on awake craniotomy vs radiosurgery.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Convenient Access</h3>
              <p className="text-gray-700">
                Convenient to complete MRI at nearby centers and bring films to OPD.
              </p>
            </div>
          </div>
          <div className="mt-8 bg-green-50 p-6 rounded-lg">
            <h3 className="text-xl font-bold text-green-900 mb-4">Our Approach</h3>
            <ul className="space-y-2 text-green-800">
              <li>• Same-day discharge for select endoscopic spine procedures</li>
              <li>• Doctor-led, minimally invasive-first approach</li>
              <li>• Clear counseling on risks, recovery, and alternatives</li>
            </ul>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Frequently Asked Questions</h2>
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-bold text-gray-900 mb-3">Do you have a clinic in Banjara Hills?</h3>
              <p className="text-gray-700">We see patients at Yashoda Hospital, Malakpet; teleconsults may be arranged case-by-case.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-bold text-gray-900 mb-3">What are the OPD timings?</h3>
              <p className="text-gray-700">Confirm current schedule when booking; urgent cases accommodated where possible.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-bold text-gray-900 mb-3">Is parking available?</h3>
              <p className="text-gray-700">Yes; allow extra time during peak hours.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-bold text-gray-900 mb-3">Do you offer cashless insurance?</h3>
              <p className="text-gray-700">Many plans supported with pre-authorization; bring insurance details.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-50 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Book Your Consultation
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Schedule your appointment with Dr. Sayuj Krishnan
          </p>
          <StandardCTA />
        </div>
      </section>

      {/* Internal Links */}
      <section className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Related Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link 
              href="/services"
              className="block bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6"
            >
              <h3 className="text-lg font-bold text-gray-900 mb-2">Our Services</h3>
              <p className="text-gray-600 text-sm">Explore all neurosurgical services</p>
            </Link>
            <Link 
              href="/appointments"
              className="block bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6"
            >
              <h3 className="text-lg font-bold text-gray-900 mb-2">Book Appointment</h3>
              <p className="text-gray-600 text-sm">Schedule your consultation</p>
            </Link>
            <Link 
              href="/patient-stories"
              className="block bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6"
            >
              <h3 className="text-lg font-bold text-gray-900 mb-2">Patient Stories</h3>
              <p className="text-gray-600 text-sm">Read success stories</p>
            </Link>
          </div>
        </div>
      </section>

      {/* NAP Section */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <NAP />
        </div>
      </section>

      {/* Review Notice */}
      <section className="py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <ReviewedBy lastReviewed="2025-01-15" />
        </div>
      </section>
    </div>
  );
}
