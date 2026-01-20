import { SITE_URL } from "@/src/lib/seo";
import type { Metadata } from "next";
import NeuraLinkBookingApp from "./_components/neuralink/NeuraLinkBookingApp";
import AppointmentSchema from "./_components/AppointmentSchema";
import AppointmentFaqSchema from "./_components/AppointmentFaqSchema";
import BookingHeroContent from "./_components/neuralink/BookingHeroContent";
import BookingLocationInfo from "./_components/neuralink/BookingLocationInfo";

export const metadata: Metadata = {
  title: "Book Appointment | Best Neurosurgeon Hyderabad | Dr. Sayuj",
  description:
    "Schedule a consultation with Dr Sayuj Krishnan, the best neurosurgeon in Hyderabad. Book appointment for spine surgery & brain tumor surgery in Hyderabad.",
  keywords: [
    "Book Appointment",
    "Best Neurosurgeon Hyderabad",
    "Dr Sayuj Krishnan Appointment",
    "Neurosurgeon Appointment",
    "Neurosurgeon Appointment Hyderabad",
    "Spine Surgeon Appointment Hyderabad",
    "Yashoda Hospital Neurosurgeon Appointment"
  ],
  alternates: {
    canonical: "/appointments",
  },
  openGraph: {
    title: "Book Appointment | Best Neurosurgeon Hyderabad | Dr. Sayuj Krishnan",
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
      <AppointmentFaqSchema />
      {/*
        CWV Optimization:
        Main content (H1, Description) is now server-rendered via BookingHeroContent passed as children/props
        to the client wrapper. This improves LCP significantly compared to client-side rendering.
        Removed duplicate hidden H1 since BookingHeroContent renders the semantic H1.
      */}
      <NeuraLinkBookingApp
        heroContent={<BookingHeroContent />}
        locationInfo={<BookingLocationInfo />}
      />
    </>
  );
}
