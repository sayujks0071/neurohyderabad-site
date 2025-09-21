import { SITE_URL, webPageJsonLd, medicalGuidelineJsonLd, physicianJsonLd, breadcrumbJsonLd, contactPointJsonLd, conditionJsonLd, itemListJsonLd } from "@/lib/seo";
import type { Metadata } from "next";

export const metadata: Metadata = {
  openGraph: {
    images: [
      {
        url: `${SITE_URL}/api/og?title=${encodeURIComponent("Trigeminal Neuralgia Treatment in Hyderabad")}&subtitle=${encodeURIComponent("MVD, radiosurgery, and rhizotomy options")}`,
        width: 1200,
        height: 630,
        alt: "Trigeminal Neuralgia Treatment — Dr. Sayuj Krishnan",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: [
      {
        url: `${SITE_URL}/api/og?title=${encodeURIComponent("Trigeminal Neuralgia Treatment in Hyderabad")}&subtitle=${encodeURIComponent("MVD, radiosurgery, and rhizotomy options")}`,
        alt: "Trigeminal Neuralgia Treatment — Dr. Sayuj Krishnan",
      },
    ],
  },
};