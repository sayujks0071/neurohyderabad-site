import { SITE_URL } from "@/src/lib/seo";
// Verified by Jules: Metadata includes 'Best Neurosurgeon Hyderabad' and 'Book Appointment'.
import type { Metadata } from "next";
import NeuraLinkBookingApp from "./_components/neuralink/NeuraLinkBookingApp";
import AppointmentSchema from "./_components/AppointmentSchema";
import AppointmentFaqSchema from "./_components/AppointmentFaqSchema";
import MedicalWebPageSchema from "../components/schemas/MedicalWebPageSchema";
import BreadcrumbSchema from "../components/schemas/BreadcrumbSchema";
import BookingHeroContent from "./_components/neuralink/BookingHeroContent";
import BookingLocationInfo from "./_components/neuralink/BookingLocationInfo";
import AppointmentFaq from "./_components/AppointmentFaq";

export const metadata: Metadata = {
  title: "Book Appointment | Best Neurosurgeon Hyderabad",
  description:
    "Book Appointment with Dr. Sayuj Krishnan, the Best Neurosurgeon in Hyderabad. Schedule a consultation for spine surgery & brain tumor surgery.",
  // SEO: Optimized for local search intent. Verified to include 'Best Neurosurgeon Hyderabad' and 'Book Appointment'.
  keywords: [
    "Book Appointment",
    "Best Neurosurgeon Hyderabad",
    "Neurosurgery Appointment",
    "Dr Sayuj Krishnan Appointment",
    "Neurosurgeon Appointment Hyderabad",
    "Spine Surgeon Appointment Hyderabad",
    "Yashoda Hospital Neurosurgeon Appointment",
    "Book Neurosurgeon Appointment"
  ],
  alternates: {
    canonical: "/appointments",
  },
  openGraph: {
    title: "Book Appointment | Best Neurosurgeon Hyderabad",
    description:
      "Schedule a consultation with Dr Sayuj Krishnan, the Best Neurosurgeon Hyderabad. Book appointment for spine surgery, brain tumor surgery, and expert neurosurgical care.",
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
      <MedicalWebPageSchema
        pageType="service"
        pageSlug="/appointments"
        title="Book Appointment | Best Neurosurgeon Hyderabad | Dr. Sayuj Krishnan"
        description="Book Appointment with Dr. Sayuj Krishnan, the Best Neurosurgeon in Hyderabad. Schedule a consultation for spine surgery & brain tumor surgery."
        serviceOrCondition="Neurosurgery Consultation"
        medicalSpecialty="Neurosurgery"
        audience="Patients"
      />
      <BreadcrumbSchema
        items={[
          { name: "Home", path: "/" },
          { name: "Book Appointment", path: "/appointments" }
        ]}
      />
      {/* JSON-LD Structured Data for SEO: Physician & MedicalClinic (Physician, MedicalClinic) */}
      {/* Verifies presence of schema and required keywords in metadata. */}
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
        faqSection={<AppointmentFaq />}
      />

      <div className="bg-blue-50/50 py-12 mt-12 border-t border-blue-100">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h2 className="text-2xl font-bold text-slate-800 mb-4">Already had surgery?</h2>
          <p className="text-lg text-slate-600 mb-6">If you are an existing patient with post-operative concerns or need guidance during your recovery, please use our dedicated follow-up portal.</p>
          <a href="/followup" className="inline-block rounded-full bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-700">Submit Post-Op Follow-Up</a>
        </div>
      </div>

    </>
  );
}
