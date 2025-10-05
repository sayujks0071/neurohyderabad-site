import { SITE_URL } from "../../src/lib/seo";
import type { Metadata } from "next";
import TeleconsultationForm from "@/components/TeleconsultationForm";
import AppointmentFormTracker from "../../src/components/AppointmentFormTracker";

export const metadata: Metadata = {
  title: "Book an Appointment | Dr Sayuj Krishnan",
  description: "Schedule a consultation with Dr Sayuj Krishnan, leading neurosurgeon in Hyderabad. Expert treatment for brain and spine conditions.",
  alternates: {
    canonical: "/appointments",
  },
  openGraph: {
    images: [
      {
        url: `${SITE_URL}/api/og?title=${encodeURIComponent("Book an Appointment | Dr Sayuj Krishnan")}&subtitle=${encodeURIComponent("Consultations in Hyderabad")}`,
        width: 1200,
        height: 630,
        alt: "Book an Appointment — Dr Sayuj Krishnan",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: [
      {
        url: `${SITE_URL}/api/og?title=${encodeURIComponent("Book an Appointment | Dr Sayuj Krishnan")}&subtitle=${encodeURIComponent("Consultations in Hyderabad")}`,
        alt: "Book an Appointment — Dr Sayuj Krishnan",
      },
    ],
  },
};

export default function AppointmentsPage() {
  return (
    <main className="container mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold text-center mb-6">Request an Appointment</h1>
      <p className="text-lg text-gray-600 text-center max-w-2xl mx-auto mb-12">
        Share your clinical details and preferred schedule. Our coordinator will call within one working day to confirm a
        teleconsultation or clinic visit with Dr. Sayuj Krishnan.
      </p>

      <section className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <TeleconsultationForm pageSlug="/appointments" />
          <div className="hidden" aria-hidden>
            <AppointmentFormTracker pageSlug="/appointments" />
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
                <dd><a href="mailto:neurospinehyd@drsayuj.com" className="underline">neurospinehyd@drsayuj.com</a></dd>
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

          <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Emergency?</h2>
            <p className="text-sm text-gray-700 mb-3">
              For acute brain or spine emergencies, call our 24/7 hotline. The appointment request form is monitored during
              working hours.
            </p>
            <a
              href="tel:+919778280044"
              className="inline-flex items-center justify-center w-full rounded-full bg-red-600 text-white font-semibold px-4 py-3 hover:bg-red-700"
            >
              🚨 Call Emergency: +91 9778280044
            </a>
          </div>

          <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">What happens next?</h2>
            <ol className="list-decimal pl-5 text-sm text-gray-700 space-y-2">
              <li>Clinical coordinator reviews your details & reports.</li>
              <li>We call to confirm slot (teleconsult or in-person).</li>
              <li>Payment + consultation link shared over WhatsApp/email.</li>
            </ol>
          </div>
        </aside>
      </section>
    </main>
  );
}
