import { SITE_URL, webPageJsonLd, medicalGuidelineJsonLd, serviceJsonLd, CONTACT_EMAIL, physicianJsonLd, breadcrumbJsonLd, contactPointJsonLd, itemListJsonLd } from "@/lib/seo";
import type { Metadata } from "next";

export const metadata: Metadata = {
  openGraph: {
    images: [
      {
        url: `${SITE_URL}/api/og?title=${encodeURIComponent("Minimally Invasive Spine Surgery (MISS) in Hyderabad")}&subtitle=${encodeURIComponent("Less pain, faster recovery")}`,
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
        url: `${SITE_URL}/api/og?title=${encodeURIComponent("Minimally Invasive Spine Surgery (MISS) in Hyderabad")}&subtitle=${encodeURIComponent("Less pain, faster recovery")}`,
        alt: "Minimally Invasive Spine Surgery — Dr. Sayuj Krishnan",
      },
    ],
  },
};