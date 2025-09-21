import { SITE_URL, webPageJsonLd, medicalGuidelineJsonLd, physicianJsonLd, breadcrumbJsonLd, contactPointJsonLd, conditionJsonLd, itemListJsonLd } from "@/lib/seo";
import type { Metadata } from "next";

export const metadata: Metadata = {
  openGraph: {
    images: [
      {
        url: `${SITE_URL}/api/og?title=${encodeURIComponent("Slip Disc (Herniated Disc) Treatment in Hyderabad")}`,
        width: 1200,
        height: 630,
        alt: "Slip Disc (Herniated Disc) Treatment — Dr. Sayuj Krishnan",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: [
      {
        url: `${SITE_URL}/api/og?title=${encodeURIComponent("Slip Disc (Herniated Disc) Treatment in Hyderabad")}`,
        alt: "Slip Disc (Herniated Disc) Treatment — Dr. Sayuj Krishnan",
      },
    ],
  },
};

export default function PageWrapper() {
  const canonical = `${SITE_URL}/slip-disc-treatment-hyderabad/`;
  
  // Your existing page content...
  return (
    <main>
      <h1>Slip Disc Treatment in Hyderabad</h1>
      {/* Rest of your page content */}
    </main>
  );
}