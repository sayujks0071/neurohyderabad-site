import { SITE_URL } from "../../src/lib/seo";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Breadcrumbs from "../components/Breadcrumbs";
import JsonLd from "@/components/JsonLd";
import MapEmbed from "@/components/MapEmbed";
import { CLINIC_INFO, getMedicalClinicSchema } from "../../src/lib/clinic";

const clinicSchema = getMedicalClinicSchema();

export const metadata: Metadata = {
  title: "Contact Dr Sayuj Krishnan | Neurosurgeon in Hyderabad",
  description: "Contact Dr Sayuj Krishnan for neurosurgical consultations. Phone: +91 9778280044, Email: neurospinehyd@drsayuj.com. Located at Yashoda Hospital, Malakpet.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Contact Dr Sayuj Krishnan | Neurosurgeon in Hyderabad",
    description: "Contact Dr Sayuj Krishnan for neurosurgical consultations. Phone: +91 9778280044, Email: neurospinehyd@drsayuj.com. Located at Yashoda Hospital, Malakpet.",
    url: `${SITE_URL}/contact`,
    siteName: 'Dr. Sayuj Krishnan - Neurosurgeon Hyderabad',
    locale: 'en_IN',
    type: 'website',
    images: [
      {
        url: `${SITE_URL}/api/og?title=${encodeURIComponent("Contact Dr Sayuj Krishnan")}&subtitle=${encodeURIComponent("Expert neurosurgical care")}`,
        width: 1200,
        height: 630,
        alt: "Contact Dr Sayuj Krishnan — Neurosurgeon in Hyderabad",
        type: 'image/jpeg'
      },
    ],
  },
};

export default function ContactPage() {
  const { telephone, rawTelephone, email, streetAddress, addressLocality, addressRegion, postalCode } = CLINIC_INFO;
  const telephoneHref = `tel:${rawTelephone}`;

  return (
    <>
      <JsonLd data={clinicSchema} />
      <Breadcrumbs
        items={[
          { name: "Home", href: "/" },
          { name: "Contact", href: "/contact/" }
        ]}
      />
      <main className="container mx-auto px-4 py-16">
        <div className="max-w-5xl mx-auto mb-12">
          <div className="grid gap-10 md:grid-cols-[minmax(0,320px),1fr] items-center">
            <figure className="flex flex-col items-center">
              <div className="w-48 h-48 md:w-56 md:h-56 rounded-3xl overflow-hidden shadow-2xl ring-4 ring-blue-100">
                <Image
                  src="/images/dr-sayuj-krishnan-portrait.jpg"
                  alt="Dr. Sayuj Krishnan — Consultant Neurosurgeon & Spine Surgeon"
                  width={320}
                  height={320}
                  className="object-cover w-full h-full"
                  priority
                  quality={95}
                  sizes="(max-width: 768px) 192px, 320px"
                />
              </div>
              <figcaption className="mt-4 text-center">
                <p className="text-lg font-semibold text-blue-800">Dr. Sayuj Krishnan</p>
                <p className="text-sm text-blue-600">Consultant Brain & Spine Surgeon • Yashoda Hospital, Malakpet</p>
              </figcaption>
            </figure>
            <div className="text-center md:text-left">
              <h1 className="text-4xl font-bold mb-6">Contact Dr Sayuj Krishnan</h1>
              <p className="text-xl text-gray-700">
                Reach the neurosurgical care team directly for consultations, second opinions, or urgent support. 
                We prioritise rapid access for complex spine and brain conditions and coordinate admission at Yashoda Hospital, Malakpet.
              </p>
            </div>
          </div>
        </div>
      
      <div className="max-w-4xl mx-auto">
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-6 text-blue-700">Get in Touch</h2>
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold text-lg mb-2">Phone</h3>
                <a href={telephoneHref} className="text-blue-600 hover:underline text-lg">
                  {telephone}
                </a>
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2">Email</h3>
                <a href={`mailto:${email}`} className="text-blue-600 hover:underline">
                  {email}
                </a>
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2">Location</h3>
                <div className="text-gray-600">
                  <p>{streetAddress}</p>
                  <p>{addressLocality}, {addressRegion}</p>
                  <p>{postalCode}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-6 text-blue-700">Office Hours</h2>
            <div className="space-y-4 text-gray-600">
              <div className="flex justify-between">
                <span>Monday - Friday</span>
                <span>9:00 AM - 5:00 PM</span>
              </div>
              <div className="flex justify-between">
                <span>Saturday</span>
                <span>9:00 AM - 1:00 PM</span>
              </div>
              <div className="flex justify-between">
                <span>Sunday</span>
                <span>Emergency Only</span>
              </div>
            </div>
            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <p className="text-sm text-blue-800">
                <strong>Emergency Cases:</strong> Available 24/7 for urgent neurosurgical emergencies.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white p-8 rounded-lg shadow-md mb-8">
          <h2 className="text-2xl font-semibold mb-6 text-blue-700">How to Reach Us</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-semibold text-lg mb-3">By Appointment</h3>
              <p className="text-gray-600 mb-4">
                For consultations and appointments, please call us directly or use our online booking system.
              </p>
              <Link 
                href="/appointments"
                className="inline-block bg-blue-600 text-white px-6 py-3 rounded-full hover:bg-blue-700 transition-colors"
              >
                Book Appointment
              </Link>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-3">Emergency Contact</h3>
              <p className="text-gray-600 mb-4">
                For urgent neurosurgical emergencies, call our emergency line immediately.
              </p>
              <a 
                href={telephoneHref}
                className="inline-block bg-red-600 text-white px-6 py-3 rounded-full hover:bg-red-700 transition-colors"
              >
                Emergency: {telephone}
              </a>
            </div>
          </div>
        </div>

        <div className="bg-white p-8 rounded-lg shadow-md mb-8">
          <h2 className="text-2xl font-semibold mb-6 text-blue-700">Convenient Locations</h2>
          <p className="text-gray-600 mb-6">
            Dr. Sayuj Krishnan serves patients from across Hyderabad. Find travel information and directions from your area:
          </p>
          <div className="grid md:grid-cols-3 gap-4">
            <Link 
              href="/locations/brain-spine-surgeon-jubilee-hills"
              className="block bg-blue-50 border border-blue-200 rounded-lg p-4 hover:bg-blue-100 transition-colors"
            >
              <h3 className="font-semibold text-blue-700 mb-2">Near Jubilee Hills</h3>
              <p className="text-sm text-gray-600">Travel time: 15-20 minutes</p>
            </Link>
            <Link 
              href="/locations/brain-spine-surgeon-banjara-hills"
              className="block bg-blue-50 border border-blue-200 rounded-lg p-4 hover:bg-blue-100 transition-colors"
            >
              <h3 className="font-semibold text-blue-700 mb-2">Near Banjara Hills</h3>
              <p className="text-sm text-gray-600">Travel time: 20-25 minutes</p>
            </Link>
            <Link 
              href="/locations/brain-spine-surgeon-hitec-city"
              className="block bg-blue-50 border border-blue-200 rounded-lg p-4 hover:bg-blue-100 transition-colors"
            >
              <h3 className="font-semibold text-blue-700 mb-2">Near HITEC City</h3>
              <p className="text-sm text-gray-600">Travel time: 25-30 minutes</p>
            </Link>
          </div>
        </div>

        <div className="bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-6 text-blue-700">Location Details</h2>
          <div className="grid lg:grid-cols-2 gap-8 items-start">
            <div className="text-gray-600 space-y-4">
              <p>
                Dr Sayuj Krishnan practices at Yashoda Hospital, one of Hyderabad&apos;s leading healthcare facilities, 
                providing comprehensive neurosurgical care with state-of-the-art equipment and critical care support.
              </p>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">Full Address</h4>
                <p>{streetAddress}</p>
                <p>{addressLocality}, {addressRegion}</p>
                <p>{postalCode}</p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Map & Directions</h4>
                <p>
                  Use the interactive map to plan your visit or share directions with family members.
                </p>
              </div>
            </div>
            <MapEmbed />
          </div>
        </div>
      </div>
      </main>
    </>
  );
}
