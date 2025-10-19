import type { Metadata } from "next";
import { makeMetadata } from "@/app/_lib/meta";
import StatsigTestClient from "./StatsigTestClient";

export const metadata: Metadata = {
  ...makeMetadata({
    title: "Statsig Event Test Harness | Internal Tools | Dr. Sayuj Krishnan",
    description: "Internal diagnostics interface to validate Statsig event instrumentation for the neurosurgery website.",
    canonicalPath: "/statsig-test",
  }),
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },
};

export default function StatsigTestPage() {
  return <StatsigTestClient />;
}
