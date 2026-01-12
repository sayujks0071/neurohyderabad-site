import { SITE_URL } from "../../src/lib/seo";
import type { Metadata } from "next";
import NeuraLinkBookingApp from "./_components/neuralink/NeuraLinkBookingApp";

export const metadata: Metadata = {
  title: "Book an Appointment | Dr Sayuj Krishnan",
  description:
    "Schedule a consultation with Dr Sayuj Krishnan, leading neurosurgeon in Hyderabad. AI-assisted booking, symptom triage, and report interpretation included.",
  alternates: {
    canonical: "/appointments",
  },
  openGraph: {
    title: "Book an Appointment | Dr Sayuj Krishnan",
    description:
      "Schedule a consultation with Dr Sayuj Krishnan, leading neurosurgeon in Hyderabad. AI-assisted booking, symptom triage, and report interpretation included.",
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
  return <NeuraLinkBookingApp />;
}
