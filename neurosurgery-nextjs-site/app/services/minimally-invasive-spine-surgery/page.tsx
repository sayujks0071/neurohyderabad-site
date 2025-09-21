import { SITE_URL, webPageJsonLd, medicalGuidelineJsonLd, serviceJsonLd, CONTACT_EMAIL, physicianJsonLd, breadcrumbJsonLd, contactPointJsonLd, itemListJsonLd } from "@/lib/seo";
import type { Metadata } from "next";

export const metadata: Metadata = {
  openGraph: {
    images: [
      {
        url: `${SITE_URL}/api/og?title=${encodeURIComponent("Minimally Invasive Spine Surgery (MISS) in Hyderabad")}`,
        width: 1200,
        height: 630,
        alt: "Minimally Invasive Spine Surgery — Dr. Sayuj Krishnan",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: [
      {
        url: `${SITE_URL}/api/og?title=${encodeURIComponent("Minimally Invasive Spine Surgery (MISS) in Hyderabad")}`,
        alt: "Minimally Invasive Spine Surgery — Dr. Sayuj Krishnan",
      },
    ],
  },
};

export default function PageWrapper() {
  const canonical = `${SITE_URL}/services/minimally-invasive-spine-surgery/`;
  
  // Your existing page content...
  return (
    <main>
      <h1>Minimally Invasive Spine Surgery (MISS) in Hyderabad</h1>
      {/* Rest of your page content */}
    </main>
  );
}
