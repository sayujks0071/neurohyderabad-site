"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

const ADS_ID = "AW-17680191922";
const SEND_TO = {
  whatsapp: `${ADS_ID}/wkGLCIbvptAbELKjye5B`,
  phone: `${ADS_ID}/-yhfCIPvptAbELKjye5B`,
  thankYou: `${ADS_ID}/PjKNCNbWptAbELKjye5B`,
} as const;

let gtagLoadPromise: Promise<void> | null = null;

function ensureGtagLoaded(): Promise<void> {
  if (typeof window === "undefined") return Promise.resolve();
  if ((window as any).gtag) return Promise.resolve();
  if (gtagLoadPromise) return gtagLoadPromise;

  gtagLoadPromise = new Promise<void>((resolve, reject) => {
    // If another part of the page already injected it, just init.
    const existing = document.querySelector<HTMLScriptElement>(
      `script[src="https://www.googletagmanager.com/gtag/js?id=${ADS_ID}"]`
    );
    if (existing) {
      (window as any).dataLayer = (window as any).dataLayer || [];
      (window as any).gtag =
        (window as any).gtag ||
        function gtag() {
          (window as any).dataLayer.push(arguments);
        };
      (window as any).gtag("js", new Date());
      (window as any).gtag("config", ADS_ID);
      resolve();
      return;
    }

    const script = document.createElement("script");
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${ADS_ID}`;
    script.onload = () => {
      (window as any).dataLayer = (window as any).dataLayer || [];
      (window as any).gtag =
        (window as any).gtag ||
        function gtag() {
          (window as any).dataLayer.push(arguments);
        };
      (window as any).gtag("js", new Date());
      (window as any).gtag("config", ADS_ID);
      resolve();
    };
    script.onerror = () => reject(new Error("Failed to load gtag.js"));
    document.head.appendChild(script);
  });

  return gtagLoadPromise;
}

function hasAnalyticsConsent(): boolean {
  try {
    const analyticsConsent = localStorage.getItem("analytics-consent");
    const legacyConsent = localStorage.getItem("cookie-consent");
    return analyticsConsent === "true" || legacyConsent === "accepted";
  } catch {
    return false;
  }
}

export default function GoogleAdsConversions() {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!hasAnalyticsConsent()) return;

    const fireConversion = async (sendTo: string) => {
      try {
        await ensureGtagLoaded();
        (window as any).gtag?.("event", "conversion", { send_to: sendTo });
      } catch {
        // no-op: avoid breaking user navigation on script failures
      }
    };

    const onClick = (e: MouseEvent) => {
      const target = e.target as Element | null;
      if (!target) return;

      const link = target.closest("a[href]") as HTMLAnchorElement | null;
      if (!link) return;

      const href = link.getAttribute("href") || "";
      if (href.startsWith("tel:")) {
        void fireConversion(SEND_TO.phone);
        return;
      }
      if (href.includes("https://wa.me/") || href.startsWith("https://wa.me/") || href.includes("wa.me/")) {
        void fireConversion(SEND_TO.whatsapp);
      }
    };

    const opts: AddEventListenerOptions = { capture: true, passive: true };
    document.addEventListener("click", onClick, opts);
    return () => document.removeEventListener("click", onClick, true);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!hasAnalyticsConsent()) return;
    if (!pathname) return;

    if (pathname.includes("/thank-you")) {
      void (async () => {
        try {
          await ensureGtagLoaded();
          (window as any).gtag?.("event", "conversion", { send_to: SEND_TO.thankYou });
        } catch {
          // no-op
        }
      })();
    }
  }, [pathname]);

  return null;
}

