import type { Metadata } from "next";
import { makeMetadata } from "@/app/_lib/meta";

export const metadata: Metadata = {
  ...makeMetadata({
    title: "Deployment Cache Test | Internal Tools | Dr. Sayuj Krishnan",
    description: "Internal page for verifying deployment cache invalidation and runtime behaviour.",
    canonicalPath: "/cache-test-new",
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

export default function CacheTestNew() {
  return (
    <div>
      <h1>Cache Test New - {new Date().toISOString()}</h1>
      <p>This is a new page to test if deployments are working.</p>
      <p>Timestamp: {Date.now()}</p>
      <p>Random: {Math.random()}</p>
    </div>
  );
}
















