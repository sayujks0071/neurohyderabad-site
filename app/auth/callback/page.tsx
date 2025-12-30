import type { Metadata } from "next";
import { makeMetadata } from "@/app/_lib/meta";
import AuthCallbackClient from "./AuthCallbackClient";

export const metadata: Metadata = {
  ...makeMetadata({
    title: "Google OAuth Callback | Dr. Sayuj Krishnan",
    description: "Securely processing your Google authentication to return you to the neurosurgery portal.",
    canonicalPath: "/auth/callback",
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

export default function AuthCallback() {
  return <AuthCallbackClient />;
}
