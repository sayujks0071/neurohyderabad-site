import { SITE_URL, webPageJsonLd, medicalGuidelineJsonLd, physicianJsonLd, breadcrumbJsonLd, contactPointJsonLd, conditionJsonLd, itemListJsonLd } from "@/lib/seo";
import type { Metadata } from "next";

export const metadata: Metadata = {
  openGraph: {
    images: [
      {
        url: `${SITE_URL}/api/og?title=${encodeURIComponent("Slip Disc (Herniated Disc) Treatment in Hyderabad")}&subtitle=${encodeURIComponent("Endoscopic/MISS options for leg-dominant pain")}`,
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
        url: `${SITE_URL}/api/og?title=${encodeURIComponent("Slip Disc (Herniated Disc) Treatment in Hyderabad")}&subtitle=${encodeURIComponent("Endoscopic/MISS options for leg-dominant pain")}`,
        alt: "Slip Disc (Herniated Disc) Treatment — Dr. Sayuj Krishnan",
      },
    ],
  },
};