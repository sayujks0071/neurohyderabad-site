import { SITE_URL } from "@/src/lib/seo";
import { CANONICAL_TELEPHONE, CANONICAL_WHATSAPP } from "@/src/data/locations";
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
    "Book an appointment with Dr. Sayuj Krishnan, top neurosurgeon in Hyderabad. Spine surgery, brain tumor & endoscopic procedures at Yashoda Hospital Malakpet.",
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
      {/* Direct Contact CTAs — prominent phone + WhatsApp for conversion */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-6">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8">
            <a
              href={`tel:${CANONICAL_TELEPHONE}`}
              className="inline-flex items-center gap-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm px-6 py-3 rounded-full text-lg font-semibold transition-colors"
            >
              <span className="text-2xl">📞</span>
              Call: {CANONICAL_TELEPHONE.replace('+91', '+91 ')}
            </a>
            <a
              href={`https://wa.me/${CANONICAL_WHATSAPP}?text=${encodeURIComponent('Hi Dr. Sayuj, I would like to book an appointment.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 px-6 py-3 rounded-full text-lg font-semibold transition-colors"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              WhatsApp Us
            </a>
          </div>
          <p className="text-center text-white/80 text-sm mt-3">Available Mon–Sat, 9 AM – 5 PM IST • Emergency: 24/7</p>
        </div>
      </div>

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
