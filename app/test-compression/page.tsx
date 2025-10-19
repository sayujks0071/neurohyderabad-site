import type { Metadata } from "next";
import { makeMetadata } from "@/app/_lib/meta";

export const metadata: Metadata = {
  ...makeMetadata({
    title: "Compression Diagnostics | Internal Tools | Dr. Sayuj Krishnan",
    description: "Internal diagnostics page used to verify response compression and caching headers.",
    canonicalPath: "/test-compression",
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

export default function TestCompression() {
  return (
    <div>
      <h1>Compression Test</h1>
      <p>This is a simple test page to check compression.</p>
      <p>Timestamp: {new Date().toISOString()}</p>
    </div>
  );
}
















