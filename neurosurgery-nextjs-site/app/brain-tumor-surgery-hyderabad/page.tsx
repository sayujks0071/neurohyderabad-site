import { SITE_URL, webPageJsonLd, serviceJsonLd, medicalGuidelineJsonLd, physicianJsonLd, breadcrumbJsonLd, contactPointJsonLd, procedureJsonLd, itemListJsonLd } from "@/lib/seo";
import type { Metadata } from "next";

export const metadata: Metadata = {
  openGraph: {
    images: [
      {
        url: `${SITE_URL}/api/og?title=${encodeURIComponent("Brain Tumor Surgery in Hyderabad")}`,
        width: 1200,
        height: 630,
        alt: "Brain Tumor Surgery — Dr. Sayuj Krishnan",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: [
      {
        url: `${SITE_URL}/api/og?title=${encodeURIComponent("Brain Tumor Surgery in Hyderabad")}`,
        alt: "Brain Tumor Surgery — Dr. Sayuj Krishnan",
      },
    ],
  },
};

export default function PageWrapper() {
  const canonical = `${SITE_URL}/brain-tumor-surgery-hyderabad/`;
  
  // Your existing page content...
  return (
    <main>
      <h1>Brain Tumor Surgery in Hyderabad</h1>
      {/* Rest of your page content */}
    </main>
  );
}