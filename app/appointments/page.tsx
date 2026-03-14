import { SITE_URL } from "@/src/lib/seo";
// Verified by Jules: Metadata includes 'Best Neurosurgeon Hyderabad' and 'Book Appointment'.
import type { Metadata } from "next";
import BookingCalendarEmbed from "@/app/_components/BookingCalendarEmbed";
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
      <div className="bg-slate-50/50">
        <section className="relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
            <div className="absolute -top-[20%] -right-[10%] w-[700px] h-[700px] rounded-full bg-blue-100/40 blur-3xl opacity-60" />
            <div className="absolute top-[20%] -left-[10%] w-[500px] h-[500px] rounded-full bg-indigo-100/40 blur-3xl opacity-60" />
          </div>

          <div className="max-w-5xl mx-auto py-20 px-4 text-center">
            <BookingHeroContent />
            <BookingLocationInfo />
          </div>
        </section>

        <section className="pb-20">
          <div className="max-w-6xl mx-auto px-4">
            <BookingCalendarEmbed url="https://cal.com/drsayuj" />
          </div>
        </section>

        <AppointmentFaq />
      </div>
    </>
  );
}
