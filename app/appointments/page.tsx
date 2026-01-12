import { SITE_URL } from "../../src/lib/seo";
import type { Metadata } from "next";
import Link from "next/link";
import NeuraLinkChat from "./_components/neuralink/NeuraLinkChat";

export const metadata: Metadata = {
  title: "AI Instant Appointment Booking | Dr Sayuj Krishnan",
  description: "Book your appointment instantly with Dr. Sayuj Krishnan using our NeuraLink AI assistant. 24/7 availability for brain and spine consultations.",
  alternates: {
    canonical: "/appointments",
  },
  openGraph: {
    title: "AI Instant Appointment Booking | Dr Sayuj Krishnan",
    description: "Schedule a consultation instantly with NeuraLink AI. Expert treatment for brain and spine conditions in Hyderabad.",
    url: `${SITE_URL}/appointments`,
    siteName: 'Dr. Sayuj Krishnan - Neurosurgeon Hyderabad',
    locale: 'en_IN',
    type: 'website',
    images: [
      {
        url: `${SITE_URL}/api/og?title=${encodeURIComponent("Instant AI Booking")}&subtitle=${encodeURIComponent("Dr Sayuj Krishnan")}`,
        width: 1200,
        height: 630,
        alt: "AI Appointment Booking — Dr Sayuj Krishnan",
        type: 'image/jpeg'
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: [
      {
        url: `${SITE_URL}/api/og?title=${encodeURIComponent("Instant AI Booking")}&subtitle=${encodeURIComponent("Dr Sayuj Krishnan")}`,
        width: 1200,
        height: 630,
        alt: "AI Appointment Booking — Dr Sayuj Krishnan",
      },
    ],
  },
};

export default function AppointmentsPage() {
  return (
    <main className="container mx-auto px-4 py-12 md:py-16">
      <div className="text-center mb-10">
        <h1 className="text-3xl md:text-5xl font-bold text-slate-900 mb-4">
          Instant Appointment Booking
        </h1>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
          Use our <span className="text-blue-600 font-semibold">NeuraLink AI Assistant</span> to schedule your consultation in seconds.
          No waiting, no phone tag.
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8 items-start">
        {/* Main Chat Interface */}
        <div className="lg:col-span-2 space-y-6">
          <NeuraLinkChat />

          <div className="bg-blue-50/50 border border-blue-100 rounded-xl p-4 text-sm text-blue-800 flex gap-3 items-start">
            <span className="text-xl">🛡️</span>
            <p>
              <strong>Privacy Guaranteed:</strong> Your conversation is secure. We use this information solely to schedule your appointment and prepare Dr. Sayuj for your visit.
            </p>
          </div>
        </div>

        {/* Sidebar Info */}
        <aside className="space-y-6">
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-slate-800 mb-4">Clinic Contact</h2>
            <dl className="text-sm text-slate-700 space-y-3">
              <div>
                <dt className="font-semibold text-slate-900">Phone & Emergency</dt>
                <dd><a href="tel:+919778280044" className="text-blue-600 hover:underline font-medium">+91 9778280044</a></dd>
              </div>
              <div>
                <dt className="font-semibold text-slate-900">Email</dt>
                <dd><a href="mailto:hellodr@drsayuj.info" className="text-blue-600 hover:underline">hellodr@drsayuj.info</a></dd>
              </div>
              <div>
                <dt className="font-semibold text-slate-900">Location</dt>
                <dd className="leading-relaxed">
                  Yashoda Hospital, Room 317<br />
                  Malakpet, Hyderabad 500036
                </dd>
              </div>
            </dl>
          </div>

          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6">
            <h2 className="text-xl font-semibold text-slate-800 mb-4">What happens next?</h2>
            <ol className="list-decimal pl-5 text-sm text-slate-700 space-y-3">
              <li><strong>AI Verification:</strong> NeuraLink checks slot availability instantly.</li>
              <li><strong>Confirmation:</strong> You receive a booking ID and payment link via WhatsApp.</li>
              <li><strong>Consultation:</strong> Arrive 15 mins early with your reports.</li>
            </ol>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-slate-800 mb-4">Travel Directions</h2>
            <div className="space-y-3">
              <Link
                href="/locations/brain-spine-surgeon-jubilee-hills"
                className="block text-sm text-slate-600 hover:text-blue-600 font-medium transition-colors"
              >
                → From Jubilee Hills (15-20 min)
              </Link>
              <Link
                href="/locations/brain-spine-surgeon-banjara-hills"
                className="block text-sm text-slate-600 hover:text-blue-600 font-medium transition-colors"
              >
                → From Banjara Hills (20-25 min)
              </Link>
              <Link
                href="/locations/brain-spine-surgeon-hitec-city"
                className="block text-sm text-slate-600 hover:text-blue-600 font-medium transition-colors"
              >
                → From HITEC City (25-30 min)
              </Link>
            </div>
          </div>
        </aside>
      </div>
    </main>
  );
}
