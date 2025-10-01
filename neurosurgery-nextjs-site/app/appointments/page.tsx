import { SITE_URL, webPageJsonLd, physicianJsonLd, breadcrumbJsonLd, itemListJsonLd } from "../../src/lib/seo";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Book an Appointment | Dr. Sayuj Krishnan",
  description: "Schedule a consultation with Dr. Sayuj Krishnan, leading neurosurgeon in Hyderabad. Expert treatment for brain and spine conditions.",
  alternates: {
    canonical: "/appointments",
  },
  openGraph: {
    images: [
      {
        url: `${SITE_URL}/api/og?title=${encodeURIComponent("Book an Appointment | Dr. Sayuj Krishnan")}&subtitle=${encodeURIComponent("Consultations in Hyderabad")}`,
        width: 1200,
        height: 630,
        alt: "Book an Appointment — Dr. Sayuj Krishnan",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: [
      {
        url: `${SITE_URL}/api/og?title=${encodeURIComponent("Book an Appointment | Dr. Sayuj Krishnan")}&subtitle=${encodeURIComponent("Consultations in Hyderabad")}`,
        alt: "Book an Appointment — Dr. Sayuj Krishnan",
      },
    ],
  },
};

export default function AppointmentsPage() {
  return (
    <main className="container mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold text-center mb-8">Book an Appointment</h1>
      <div className="max-w-2xl mx-auto">
        <p className="text-lg text-gray-600 mb-8 text-center">
          Schedule a consultation with Dr. Sayuj Krishnan for expert neurosurgical care.
        </p>
        <div className="bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-6">Contact Information</h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold">Phone:</h3>
              <p className="text-blue-600">+91 9778280044</p>
            </div>
            <div>
              <h3 className="font-semibold">Email:</h3>
              <p className="text-blue-600">neurospinehyd@drsayuj.com</p>
            </div>
            <div>
              <h3 className="font-semibold">Location:</h3>
              <p className="text-gray-600">
                Yashoda Hospital<br />
                Room No 317, OPD Block<br />
                Malakpet<br />
                Hyderabad, Telangana
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}