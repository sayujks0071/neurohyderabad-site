import type { Metadata } from "next";
import { makeMetadata } from "@/app/_lib/meta";

export const metadata: Metadata = {
  ...makeMetadata({
    title: "Force Redeploy Test | Internal Diagnostics | Dr. Sayuj Krishnan",
    description: "Internal page to confirm redeploy events and cache-busting logic for the neurosurgery site.",
    canonicalPath: "/force-redeploy-test",
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

export default function ForceRedeployTest() {
  return (
    <div>
      <h1>Force Redeploy Test - {new Date().toISOString()}</h1>
      <p>This page was created to force a cache miss and test deployment.</p>
      <p>Timestamp: {Date.now()}</p>
      <p>Random: {Math.random()}</p>
      <p>Deployment: {process.env.VERCEL_GIT_COMMIT_SHA || 'local'}</p>
    </div>
  );
}
















