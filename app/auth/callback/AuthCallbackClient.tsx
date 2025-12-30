"use client";

import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { analytics } from "@/src/lib/analytics";

function AuthCallbackContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const handleCallback = async () => {
      try {
        const code = searchParams.get("code");
        const error = searchParams.get("error");
        const state = searchParams.get("state");

        if (error) {
          setStatus("error");
          setMessage(`Authentication failed: ${error}`);

          analytics.track("Google_OAuth_Callback_Error", {
            error,
            state: state || "unknown",
            timestamp: Date.now(),
          });
          return;
        }

        if (!code) {
          setStatus("error");
          setMessage("No authorization code received");
          return;
        }

        analytics.track("Google_OAuth_Callback_Success", {
          has_code: !!code,
          state: state || "unknown",
          timestamp: Date.now(),
        });

        console.log("Authorization code received:", code);

        setStatus("success");
        setMessage("Authentication successful! Redirecting...");

        setTimeout(() => {
          router.push("/");
        }, 2000);
      } catch (error) {
        console.error("Error handling OAuth callback:", error);
        setStatus("error");
        setMessage("An error occurred during authentication");

        analytics.track("Google_OAuth_Callback_Exception", {
          error_message: error instanceof Error ? error.message : "Unknown error",
          timestamp: Date.now(),
        });
      }
    };

    handleCallback();
  }, [router, searchParams]);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8 text-center">
        <div className="mb-6">
          {status === "loading" && (
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto" />
          )}
          {status === "success" && <div className="text-green-600 text-4xl mb-4">✓</div>}
          {status === "error" && <div className="text-red-600 text-4xl mb-4">✗</div>}
        </div>

        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          {status === "loading" && "Processing Authentication..."}
          {status === "success" && "Authentication Successful!"}
          {status === "error" && "Authentication Failed"}
        </h1>

        <p className="text-gray-600 mb-6">
          {status === "loading" && "Please wait while we verify your Google account."}
          {status === "success" && message}
          {status === "error" && message}
        </p>

        {status === "error" && (
          <button
            onClick={() => router.push("/")}
            className="bg-blue-600 text-white px-6 py-3 rounded-full hover:bg-blue-700 transition-colors"
          >
            Return to Homepage
          </button>
        )}

        {status === "success" && (
          <p className="text-sm text-gray-500">You will be redirected automatically...</p>
        )}
      </div>
    </div>
  );
}

export default function AuthCallbackClient() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <AuthCallbackContent />
    </Suspense>
  );
}
