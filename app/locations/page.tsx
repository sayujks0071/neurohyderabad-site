import type { Metadata } from "next";
import Link from "next/link";
import SchemaScript from "@/app/_components/SchemaScript";
import { LocationNAPCard } from "@/src/components/locations/LocationNAPCard";
import YMYLAttribution from "@/app/_components/YMYLAttribution";
import { SITE_URL } from "@/src/lib/seo";
import { locations } from "@/src/data/locations";

// Static generation with 24-hour revalidation
export const revalidate = 86400;
export const dynamic = 'error';

const CANONICAL = `${SITE_URL}/locations`;

const schemaData = [
  {
    "@context": "https://schema.org",
    "@type": "MedicalWebPage",
    "inLanguage": "en-IN",
    "name": "Neurosurgeon Locations in Hyderabad",
    "url": CANONICAL,
    "about": {
      "@type": "MedicalSpecialty",
      "name": "Neurosurgery"
    }
  },
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": SITE_URL
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Locations",
        "item": CANONICAL
      }
    ]
  }
];

export const metadata: Metadata = {
  title: "Neurosurgeon Locations in Hyderabad | Dr. Sayuj Krishnan",
  description: "Expert neurosurgeon Dr. Sayuj Krishnan serves patients across Hyderabad including Banjara Hills, Hitec City, Jubilee Hills, and Malakpet. Book consultation.",
  keywords: "neurosurgeon hyderabad, brain surgeon locations, spine specialist hyderabad, banjara hills, hitec city, jubilee hills, malakpet",
  alternates: {
    canonical: CANONICAL,
    languages: {
      'en-IN': CANONICAL,
      'x-default': CANONICAL,
    },
  },
  openGraph: {
    title: "Neurosurgeon Locations in Hyderabad | Dr. Sayuj Krishnan",
    description: "Expert neurosurgeon Dr. Sayuj Krishnan serves patients across Hyderabad including Banjara Hills, Hitec City, Jubilee Hills, and Malakpet.",
    url: CANONICAL,
    siteName: "Dr. Sayuj — Brain & Spine Care",
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Neurosurgeon Locations in Hyderabad | Dr. Sayuj Krishnan",
    description: "Expert neurosurgeon Dr. Sayuj Krishnan serves patients across Hyderabad including Banjara Hills, Hitec City, Jubilee Hills, and Malakpet.",
  },
};

export default function LocationsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-4xl px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Neurosurgeon Locations in Hyderabad
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Dr. Sayuj Krishnan provides expert neurosurgery care across multiple locations in Hyderabad, 
            ensuring convenient access to world-class brain and spine treatment.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 mb-12">
          {locations.map((location) => {
            const href = location.slug.startsWith('/') ? location.slug : `/${location.slug}`;
            return (
              <div key={location.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow flex flex-col h-full">
                <h2 className="text-2xl font-semibold text-gray-900 mb-3">
                  {location.areaServedName}
                </h2>
                <p className="text-gray-600 mb-4 flex-grow">
                  Advanced neurosurgery and spine care services for patients in {location.areaServedName}.
                </p>
                <Link
                  href={href}
                  className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors text-center mt-auto"
                >
                  View Details
                </Link>
              </div>
            );
          })}
        </div>

        <div className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">
            Why Choose Our Locations?
          </h2>
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                State-of-the-Art Facilities
              </h3>
              <p className="text-gray-600">
                Each location is equipped with the latest neurosurgery technology including 
                advanced imaging, minimally invasive surgical tools, and dedicated ICU facilities.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Expert Care Team
              </h3>
              <p className="text-gray-600">
                Our multidisciplinary team includes neurosurgeons, neurologists, 
                anesthesiologists, and specialized nursing staff.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Convenient Access
              </h3>
              <p className="text-gray-600">
                Strategically located across Hyderabad to ensure easy access for patients 
                from all areas of the city and surrounding regions.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Emergency Services
              </h3>
              <p className="text-gray-600">
                24/7 emergency neurosurgery services available at Yashoda Hospital, Malakpet
                for urgent brain and spine conditions.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-12 text-center">
          <Link 
            href="/appointments"
            className="inline-block bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            Book Consultation
          </Link>
        </div>

        <div className="mt-12">
           <LocationNAPCard locationId="malakpet" />
        </div>

        <YMYLAttribution lastReviewed="2024-12-19" />
      </div>
      
      <SchemaScript data={schemaData} />
    </div>
  );
}
