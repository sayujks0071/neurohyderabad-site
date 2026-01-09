import { SITE_URL } from "../../src/lib/seo";
import type { Metadata } from "next";
import Link from "next/link";
import { AppointmentFormExperience } from "@/packages/appointment-form";
import AppointmentFormTracker from "../../src/components/AppointmentFormTracker";
import PhoneClickTracker from "../../src/components/PhoneClickTracker";
import OpenAIAgentsBookingWrapper from "../_components/OpenAIAgentsBookingWrapper";

export const metadata: Metadata = {
  title: "Book an Appointment | Dr Sayuj Krishnan",
  description: "Schedule a consultation with Dr Sayuj Krishnan, leading neurosurgeon in Hyderabad. Expert treatment for brain and spine conditions.",
  alternates: {
    canonical: "/appointments",
  },
  openGraph: {
    title: "Book an Appointment | Dr Sayuj Krishnan",
    description: "Schedule a consultation with Dr Sayuj Krishnan, leading neurosurgeon in Hyderabad. Expert treatment for brain and spine conditions.",
    url: `${SITE_URL}/appointments`,
    siteName: 'Dr. Sayuj Krishnan - Neurosurgeon Hyderabad',
    locale: 'en_IN',
    type: 'website',
    images: [
      {
        url: `${SITE_URL}/api/og?title=${encodeURIComponent("Book an Appointment | Dr Sayuj Krishnan")}&subtitle=${encodeURIComponent("Consultations in Hyderabad")}`,
        width: 1200,
        height: 630,
        alt: "Book an Appointment — Dr Sayuj Krishnan",
        type: 'image/jpeg'
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: [
      {
        url: `${SITE_URL}/api/og?title=${encodeURIComponent("Book an Appointment | Dr Sayuj Krishnan")}&subtitle=${encodeURIComponent("Consultations in Hyderabad")}`,
        width: 1200,
        height: 630,
        alt: "Book an Appointment — Dr Sayuj Krishnan",
      },
    ],
  },
};

export default function AppointmentsPage() {
  return (
    <main className="container mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold text-center mb-6">Book an Appointment with Dr. Sayuj Krishnan</h1>
      <p className="text-lg text-gray-600 text-center max-w-2xl mx-auto mb-12">
        Choose your preferred booking method. Our AI assistant can help you book instantly, or use the traditional form below.
      </p>

      {/* AI Booking Agent Section */}
      <section className="mb-16">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-blue-800 mb-4">🤖 AI-Powered Booking Assistant</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Chat with our intelligent assistant to book your appointment. It can understand your symptoms, 
            detect emergencies, and guide you through the booking process naturally.
          </p>
        </div>
        <OpenAIAgentsBookingWrapper pageSlug="/appointments" service="general" />
      </section>

      {/* Divider */}
      <div className="flex items-center my-12">
        <div className="flex-1 border-t border-gray-300"></div>
        <div className="px-4 text-gray-500">OR</div>
        <div className="flex-1 border-t border-gray-300"></div>
      </div>

      {/* Traditional Form Section */}
      <section>
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-blue-800 mb-4">📝 Traditional Appointment Form</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Prefer to fill out a form? Use our detailed appointment request form below.
          </p>
        </div>
        
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <AppointmentFormExperience />
            <div className="hidden" aria-hidden>
              <AppointmentFormTracker pageSlug="/appointments" />
              <PhoneClickTracker />
            </div>
          </div>

          <aside className="space-y-6">
            <div className="bg-blue-50 border border-blue-100 rounded-2xl p-6">
              <h2 className="text-xl font-semibold text-blue-800 mb-4">Clinic Contact</h2>
              <dl className="text-sm text-blue-900 space-y-3">
                <div>
                  <dt className="font-semibold text-blue-700">Phone</dt>
                  <dd><a href="tel:+919778280044" className="underline">+91 9778280044</a></dd>
                </div>
                <div>
                  <dt className="font-semibold text-blue-700">Email</dt>
                  <dd><a href="mailto:hellodr@drsayuj.info" className="underline">hellodr@drsayuj.info</a></dd>
                </div>
                <div>
                  <dt className="font-semibold text-blue-700">Location</dt>
                  <dd>
                    Yashoda Hospital, Room 317<br />
                    Malakpet, Hyderabad 500036
                  </dd>
                </div>
              </dl>
            </div>

            <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">What happens next?</h2>
              <ol className="list-decimal pl-5 text-sm text-gray-700 space-y-2">
                <li>Clinical coordinator reviews your details & reports.</li>
                <li>We call to confirm slot (teleconsult or in-person).</li>
                <li>Payment + consultation link shared over WhatsApp/email.</li>
              </ol>
            </div>

            <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Travel Information</h2>
              <p className="text-sm text-gray-700 mb-4">
                Find directions and travel times from your area:
              </p>
              <div className="space-y-3">
                <Link
                  href="/locations/brain-spine-surgeon-jubilee-hills"
                  className="block text-sm text-blue-600 hover:text-blue-700 font-medium"
                >
                  → From Jubilee Hills (15-20 min)
                </Link>
                <Link
                  href="/locations/brain-spine-surgeon-banjara-hills"
                  className="block text-sm text-blue-600 hover:text-blue-700 font-medium"
                >
                  → From Banjara Hills (20-25 min)
                </Link>
                <Link
                  href="/locations/brain-spine-surgeon-hitec-city"
                  className="block text-sm text-blue-600 hover:text-blue-700 font-medium"
                >
                  → From HITEC City (25-30 min)
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}
