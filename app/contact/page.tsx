import { SITE_URL } from "../../src/lib/seo";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Breadcrumbs from "../components/Breadcrumbs";
import JsonLd from "@/components/JsonLd";
import MapEmbed from "@/components/MapEmbed";
import { CLINIC_INFO, getMedicalClinicSchema } from "../../src/lib/clinic";
import Section from "../_components/Section";
import Card from "../_components/Card";
import Button from "../_components/Button";
import LeadForm from "@/components/LeadForm";

const clinicSchema = getMedicalClinicSchema();

export const metadata: Metadata = {
  title: "Contact Dr Sayuj Krishnan | Neurosurgeon in Hyderabad",
  description: "Contact Dr Sayuj Krishnan for neurosurgical consultations. Phone: +91 9778280044, Email: hellodr@drsayuj.info. Located at Yashoda Hospital, Malakpet.",
  keywords: [
    "contact neurosurgeon hyderabad",
    "dr sayuj krishnan contact",
    "neurosurgeon hyderabad phone number",
    "yashoda hospital malakpet neurosurgeon",
    "book appointment neurosurgeon hyderabad",
    "emergency neurosurgeon hyderabad",
    "spine surgeon hyderabad contact",
    "brain surgeon hyderabad consultation"
  ],
  alternates: {
    canonical: `${SITE_URL}/contact`,
    languages: {
      'en-IN': `${SITE_URL}/contact`,
      'x-default': `${SITE_URL}/contact`
    }
  },
  openGraph: {
    title: "Contact Dr Sayuj Krishnan | Neurosurgeon in Hyderabad",
    description: "Contact Dr Sayuj Krishnan for neurosurgical consultations. Phone: +91 9778280044, Email: hellodr@drsayuj.info. Located at Yashoda Hospital, Malakpet.",
    url: `${SITE_URL}/contact`,
    siteName: 'Dr. Sayuj Krishnan - Neurosurgeon Hyderabad',
    locale: 'en_IN',
    type: 'website',
    images: [
      {
        url: `${SITE_URL}/images/og-default.jpg`,
        width: 1200,
        height: 630,
        alt: "Contact Dr Sayuj Krishnan — Neurosurgeon in Hyderabad",
        type: 'image/jpeg'
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Contact Dr Sayuj Krishnan | Neurosurgeon in Hyderabad",
    description: "Contact Dr Sayuj Krishnan for neurosurgical consultations. Phone: +91 9778280044, Email: hellodr@drsayuj.info. Located at Yashoda Hospital, Malakpet.",
    images: [`${SITE_URL}/images/og-default.jpg`],
    site: '@drsayuj',
    creator: '@drsayuj'
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
      <main>
        {/* Header Section */}
        <Section background="none" className="py-12 md:py-16">
          <div className="max-w-5xl mx-auto">
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
        </Section>

        <Section background="gray" className="py-12 md:py-16">
          <div className="max-w-5xl mx-auto space-y-12">

            {/* New Lead Form Section */}
            <div className="grid lg:grid-cols-2 gap-10">
              <div className="order-2 lg:order-1">
                 <LeadForm />
              </div>
              <div className="order-1 lg:order-2 space-y-6">
                 <div>
                    <h2 className="text-3xl font-bold mb-4 text-slate-800">We are here to help</h2>
                    <p className="text-lg text-slate-600 mb-6">
                      Whether you have a question about a procedure, need a second opinion, or want to schedule a visit, our team is ready to assist you.
                    </p>
                 </div>

                 <Card padding="lg" className="shadow-md bg-blue-50/50 border-blue-100">
                    <h3 className="text-xl font-semibold mb-4 text-blue-800">Contact Details</h3>
                    <div className="space-y-4">
                      <div>
                        <p className="font-semibold text-blue-900">Phone</p>
                        <a href={telephoneHref} className="text-blue-700 hover:underline text-lg">
                          {telephone}
                        </a>
                      </div>
                      <div>
                        <p className="font-semibold text-blue-900">Email</p>
                        <a href={`mailto:${email}`} className="text-blue-700 hover:underline">
                          {email}
                        </a>
                      </div>
                      <div>
                        <p className="font-semibold text-blue-900">Address</p>
                        <p className="text-slate-700">
                          {streetAddress}<br/>
                          {addressLocality}, {addressRegion} {postalCode}
                        </p>
                      </div>
                    </div>
                 </Card>
              </div>
            </div>

            <div className="border-t border-slate-200 pt-10">
              <h3 className="text-2xl font-bold text-center mb-8 text-slate-700">Additional Information</h3>
              <div className="grid md:grid-cols-2 gap-8">
                <Card padding="lg" className="shadow-md">
                  <h2 className="text-xl font-semibold mb-4 text-blue-700">Office Hours</h2>
                  <div className="space-y-3 text-gray-600">
                    <div className="flex justify-between border-b border-gray-100 pb-2">
                      <span>Monday - Friday</span>
                      <span>9:00 AM - 5:00 PM</span>
                    </div>
                    <div className="flex justify-between border-b border-gray-100 pb-2">
                      <span>Saturday</span>
                      <span>9:00 AM - 1:00 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-red-600 font-medium">Sunday</span>
                      <span>Emergency Only</span>
                    </div>
                  </div>
                  <div className="mt-6 p-4 bg-red-50 rounded-lg border border-red-100">
                    <p className="text-sm text-red-800 flex items-center gap-2">
                      <span className="text-xl">🚑</span>
                      <strong>24/7 Emergency Support Available</strong>
                    </p>
                  </div>
                </Card>

                <Card padding="lg" className="shadow-md">
                  <h2 className="text-xl font-semibold mb-4 text-blue-700">How to Reach Us</h2>
                  <div className="space-y-6">
                    <div>
                      <h3 className="font-semibold text-md mb-2">By Appointment</h3>
                      <p className="text-gray-600 text-sm mb-3">
                        For consultations, please use the form above or call us directly.
                      </p>
                    </div>
                    <div>
                      <h3 className="font-semibold text-md mb-2">Emergency</h3>
                      <Button
                        href={telephoneHref}
                        className="w-full justify-center bg-red-600 text-white hover:bg-red-700 border-none"
                      >
                        Call Emergency: {telephone}
                      </Button>
                    </div>
                  </div>
                </Card>
              </div>
            </div>

            <Card padding="lg" className="shadow-md">
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
            </Card>

            <Card padding="lg" className="shadow-md">
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
            </Card>
          </div>
        </Section>
      </main>
    </>
  );
}
