import { SITE_URL, webPageJsonLd, physicianJsonLd, breadcrumbJsonLd, itemListJsonLd } from "@/lib/seo";
import type { Metadata } from "next";

export const metadata: Metadata = {
  openGraph: {
    images: [
      {
        url: `${SITE_URL}/api/og?title=${encodeURIComponent("Book an Appointment | Dr. Sayuj Krishnan")}`,
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
        url: `${SITE_URL}/api/og?title=${encodeURIComponent("Book an Appointment | Dr. Sayuj Krishnan")}`,
        alt: "Book an Appointment — Dr. Sayuj Krishnan",
      },
    ],
  },
};

export default function PageWrapper() {
  const canonical = `${SITE_URL}/appointments/`;
  
  // Your existing page content...
  return (
    <main>
      <h1>Book an Appointment</h1>
      {/* Rest of your page content */}
    </main>
  );
}
