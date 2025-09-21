import { SITE_URL, webPageJsonLd, serviceJsonLd, medicalGuidelineJsonLd, physicianJsonLd, breadcrumbJsonLd, contactPointJsonLd, procedureJsonLd, itemListJsonLd } from "@/lib/seo";
import type { Metadata } from "next";

export const metadata: Metadata = {
  openGraph: {
    images: [
      {
        url: `${SITE_URL}/api/og?title=${encodeURIComponent("Brain Tumor Surgery in Hyderabad")}&subtitle=${encodeURIComponent("Microsurgery • Maximal safe resection")}`,
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
        url: `${SITE_URL}/api/og?title=${encodeURIComponent("Brain Tumor Surgery in Hyderabad")}&subtitle=${encodeURIComponent("Microsurgery • Maximal safe resection")}`,
        alt: "Brain Tumor Surgery — Dr. Sayuj Krishnan",
      },
    ],
  },
};