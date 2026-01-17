import { SITE_URL } from "../../src/lib/seo";
import type { Metadata } from "next";
import NeuraLinkBookingApp from "./_components/neuralink/NeuraLinkBookingApp";
import AppointmentSchema from "./_components/AppointmentSchema";

export const metadata: Metadata = {
  title: "Book Appointment | Dr. Sayuj Krishnan - Top Neurosurgeon",
  description:
    "Schedule a consultation with Dr Sayuj Krishnan, the best neurosurgeon in Hyderabad. Book appointment for spine surgery, brain tumor surgery, and expert neurosurgical care.",
  keywords: [
    "Book Appointment",
    "Best Neurosurgeon Hyderabad",
    "Dr Sayuj Krishnan Appointment",
    "Neurosurgeon Appointment Hyderabad",
    "Spine Surgeon Appointment Hyderabad",
    "Yashoda Hospital Neurosurgeon Appointment"
  ],
  alternates: {
    canonical: "/appointments",
  },
  openGraph: {
    title: "Book Appointment | Dr. Sayuj Krishnan - Top Neurosurgeon",
    description:
      "Schedule a consultation with Dr Sayuj Krishnan, the best neurosurgeon in Hyderabad. Book appointment for spine surgery, brain tumor surgery, and expert neurosurgical care.",
    url: `${SITE_URL}/appointments`,
    siteName: 'Dr. Sayuj Krishnan - Neurosurgeon Hyderabad',
    locale: 'en_IN',
    type: 'website',
    images: [
      {
        url: `${SITE_URL}/api/og?title=${encodeURIComponent("Book Appointment | Dr Sayuj Krishnan")}&subtitle=${encodeURIComponent("Consultations in Hyderabad")}`,
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
    <>
      <AppointmentSchema />
      {/* Hidden H1 for SEO and Accessibility structure (visually handled by component) */}
      <h1 className="sr-only">Book Appointment with Dr. Sayuj Krishnan</h1>
      <NeuraLinkBookingApp />
    </>
  );
}
