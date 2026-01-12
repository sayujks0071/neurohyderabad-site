import { permanentRedirect } from "next/navigation";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Brain Tumor Surgery Hyderabad | Dr. Sayuj Krishnan",
  description: "Advanced brain tumor surgery in Hyderabad by Dr. Sayuj Krishnan. Awake craniotomy and minimally invasive tumor removal expertise. Redirecting to services page.",
  robots: {
    index: false,
    follow: true,
  },
};

export default function BrainTumorSurgeryLegacyRoute() {
  permanentRedirect("/services/brain-tumor-surgery-hyderabad/");
}
