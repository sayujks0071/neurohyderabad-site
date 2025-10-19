import type { Metadata } from "next";
import { makeMetadata } from "@/app/_lib/meta";
import TestInngestClient from "./TestInngestClient";

export const metadata: Metadata = {
  ...makeMetadata({
    title: "Inngest Test Dashboard | Internal Tools | Dr. Sayuj Krishnan",
    description: "Internal QA dashboard to trigger Inngest workflows and verify event pipelines for the neurosurgery practice.",
    canonicalPath: "/test-inngest",
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

export default function TestInngestPage() {
  return <TestInngestClient />;
}
