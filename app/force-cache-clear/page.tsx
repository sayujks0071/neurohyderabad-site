import type { Metadata } from "next";
import { makeMetadata } from "@/app/_lib/meta";

export const metadata: Metadata = {
  ...makeMetadata({
    title: "Force Cache Clear | Internal Diagnostics | Dr. Sayuj Krishnan",
    description: "Internal diagnostics route used to confirm cache clearing behaviour during deployments.",
    canonicalPath: "/force-cache-clear",
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

export default function ForceCacheClear() {
  return (
    <div>
      <h1>Cache Clear Test - {new Date().toISOString()}</h1>
      <p>This page forces a cache miss to test compression headers.</p>
      <p>Timestamp: {Date.now()}</p>
    </div>
  );
}
















