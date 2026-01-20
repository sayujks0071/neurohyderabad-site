import React from "react";
import { getLocationById } from "@/src/data/locations";
import { LocationNAPCard } from "@/src/components/locations/LocationNAPCard";
import { LocationCTAs } from "@/src/components/locations/LocationCTAs";
import { LocationMapEmbed } from "@/src/components/locations/LocationMapEmbed";
import { LocalPathways } from "@/src/components/locations/LocalPathways";
import { LocationSchema } from "@/src/components/locations/LocationSchema";
import { notFound } from "next/navigation";
import ReviewedBy from '@/app/_components/ReviewedBy';
import LocationPageTracker from '@/src/components/LocationPageTracker';

// Force static generation
export const dynamic = 'force-static';
export const dynamicParams = false;
export const revalidate = 86400;

export const metadata = {
  title: 'Brain & Spine Surgeon near HITEC City, Hyderabad',
  description: 'Neurosurgeon near HITEC City at Yashoda Hospital, Malakpet. Directions, parking, OPD timings, and appointments.',
  keywords: 'brain surgeon HITEC City, spine surgeon HITEC City, neurosurgeon near HITEC City, Yashoda Hospital Malakpet, Hyderabad',
  alternates: {
    canonical: 'https://www.drsayuj.info/locations/brain-spine-surgeon-hitec-city',
    languages: {
      'en-IN': 'https://www.drsayuj.info/locations/brain-spine-surgeon-hitec-city',
      'x-default': 'https://www.drsayuj.info/locations/brain-spine-surgeon-hitec-city',
    },
  },
  openGraph: {
    title: 'Brain & Spine Surgeon near HITEC City, Hyderabad',
    description: 'Neurosurgeon near HITEC City at Yashoda Hospital, Malakpet. Directions, parking, OPD timings, and appointments.',
    url: 'https://www.drsayuj.info/locations/brain-spine-surgeon-hitec-city',
    type: 'website',
  },
};

const FAQ = [
    {
      q: "Do you have a clinic in HITEC City?",
      a: "We consult at Yashoda Hospital, Malakpet. Teleconsultations may be arranged on a case-by-case basis."
    },
    {
      q: "What are the OPD timings?",
      a: "Please confirm current timings when booking. Urgent cases are accommodated where possible."
    },
    {
      q: "Is parking available?",
      a: "Yes, parking is available. Allow extra time during peak hours."
    },
    {
      q: "Do you offer cashless insurance?",
      a: "Many plans are supported with pre-authorization. Please bring your insurance details."
    }
];

export default function HITECCityLocationPage() {
  const location = getLocationById("hitech-city");

  if (!location) {
    return notFound();
  }

  const breadcrumb = [
     { name: "Brain & Spine Surgeon near HITEC City", item: `https://www.drsayuj.info/locations/brain-spine-surgeon-hitec-city` },
  ];

  return (
    <div className="min-h-screen bg-white">
      <LocationSchema location={location} breadcrumb={breadcrumb} faq={FAQ} />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-50 to-indigo-100 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Brain & Spine Surgeon near HITEC City, Hyderabad
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Advanced neurosurgical care with convenient access from HITEC City
            </p>
            <LocationCTAs mode="location" locationId={location.id} className="justify-center" />
          </div>
        </div>
      </section>

      {/* Overview */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Overview</h2>
          <p className="text-lg text-gray-700 leading-relaxed mb-6">
            Patients from <strong>{location.areaServedName}</strong> often visit our Malakpet OPD for minimally invasive spine surgery (endoscopic discectomy/ULBD),
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
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Getting Here from HITEC City</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Drive Time</h3>
              <p className="text-gray-700 mb-4">
                35–55 minutes outside peak via HITEC → Ameerpet → Nampally → Malakpet.
              </p>
              <LocationMapEmbed mode="location" locationId={location.id} />
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
              {location.address.streetAddress}, {location.address.addressLocality}
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
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Common Reasons Patients from HITEC City Choose Us</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Working Professionals</h3>
              <p className="text-gray-700">
                Young/mid-career professionals with sciatica/spinal stenosis seeking same-day or short-stay endoscopic options 
                to minimize downtime.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Convenient Access</h3>
              <p className="text-gray-700">
                Many use app-based cabs to avoid parking; schedule early morning slots to reduce travel time.
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
          <div className="space-y-4">
            {FAQ.map(({ q, a }) => (
              <details key={q} className="bg-white rounded-xl border p-4 shadow-sm">
                <summary className="font-bold text-gray-900 cursor-pointer">{q}</summary>
                <p className="mt-2 text-gray-700">{a}</p>
              </details>
            ))}
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
          <LocationCTAs mode="location" locationId={location.id} className="justify-center" />
        </div>
      </section>

      {/* Internal Links & Pathways */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <LocalPathways mode="location" locationId={location.id} />
      </div>

      {/* NAP Section */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <LocationNAPCard mode="location" locationId={location.id} />
        </div>
      </section>

      {/* Review Notice */}
      <section className="py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <ReviewedBy lastReviewed="2025-01-15" />
        </div>
      </section>

      {/* Location Page Tracking */}
      <LocationPageTracker location="hitech-city" />
    </div>
  );
}
