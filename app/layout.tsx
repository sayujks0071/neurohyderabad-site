import type { Metadata, Viewport } from "next";
import { Analytics } from "@vercel/analytics/next";
import { Inter, Merriweather } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  // 'swap' ensures text is visible immediately (LCP) and eventually loads the custom font (UX).
  // next/font automatically adjusts fallback metrics to minimize CLS.
  display: "swap",
});

const merriweather = Merriweather({
  subsets: ["latin"],
  variable: "--font-merriweather",
  weight: ["400", "700"],
  // 'swap' ensures text is visible immediately (LCP) and eventually loads the custom font (UX).
  // next/font automatically adjusts fallback metrics to minimize CLS.
  display: "swap",
});

declare global {
  interface Window {
    dataLayer?: unknown[];
  }
}
import Header from "./components/HeaderRefactored";
import Breadcrumbs from "./_components/Breadcrumbs";
import Footer from "./components/Footer";
import WebsiteSchema from "./components/schemas/WebsiteSchema";
import BreadcrumbSchema from "./components/schemas/BreadcrumbSchema";
import { PhysicianSchema } from "../src/components/schema/PhysicianSchema";
import HospitalSchema from "./components/schemas/HospitalSchema";
import TrustStrip from "./_components/TrustStrip";
import ClientAnalytics from "./_components/ClientAnalytics";
import GoogleAnalytics from "../src/components/GoogleAnalytics";
import DynamicStickyCTA from "./_components/DynamicStickyCTA";
import FloatingChatWidget from "./_components/DynamicFloatingChatWidget";
import FlagValuesEmitter from "./_components/FlagValuesEmitter";
import StandaloneFlagValues from "./_components/StandaloneFlagValues";
import MiddlewareRUM from "./_components/MiddlewareRUM";
import HypertuneWrapper from "./providers/hypertune-wrapper";
import { SITE_URL } from "../src/lib/seo";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Best Neurosurgeon Hyderabad | Dr. Sayuj Krishnan",
    template: "%s"
  },
  description:
    "German-trained neurosurgeon in Hyderabad. Minimally invasive spine & brain surgery. Same-day discharge at Yashoda Hospital, Malakpet.",
  keywords: [
    "neurosurgeon hyderabad",
    "brain surgeon hyderabad", 
    "spine specialist hyderabad",
    "endoscopic spine surgery hyderabad",
    "brain tumor surgery hyderabad",
    "minimally invasive spine surgery",
    "dr sayuj krishnan",
    "yashoda hospital malakpet",
    "slip disc treatment hyderabad",
    "sciatica treatment hyderabad",
    "trigeminal neuralgia treatment",
    "epilepsy surgery hyderabad",
    "spine surgery hyderabad",
    "neurosurgery hyderabad",
    "best neurosurgeon hyderabad"
  ],
  authors: [{ name: "Dr. Sayuj Krishnan", url: SITE_URL }],
  creator: "Dr. Sayuj Krishnan",
  publisher: "Dr. Sayuj Krishnan",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    languages: {
      'en-IN': SITE_URL,
      'x-default': SITE_URL,
    },
  },
  openGraph: {
    title: "Best Neurosurgeon in Hyderabad | Dr. Sayuj Krishnan",
    description: "Expert neurosurgeon in Hyderabad. Endoscopic spine & brain tumor surgery. Same-day discharge available. 1,000+ procedures.",
    url: SITE_URL,
    siteName: "Dr. Sayuj Krishnan",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: `${SITE_URL}/images/og-default.jpg`,
        width: 1200,
        height: 630,
        alt: "Dr Sayuj Krishnan — Neurosurgeon & Endoscopic Spine Surgeon in Hyderabad | Yashoda Hospital Malakpet",
        type: "image/jpeg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Dr. Sayuj Krishnan S | Best Neurosurgeon in Hyderabad",
    description: "German-trained neurosurgeon specializing in endoscopic spine surgery, brain tumor surgery, and minimally invasive procedures. 1,000+ endoscopic procedures. Same-day discharge available.",
    images: [`${SITE_URL}/images/og-default.jpg`],
    site: "@drsayuj",
    creator: "@drsayuj",
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "google13e56c5ec4ac7344",
  },
  icons: {
    icon: [
      { url: "/favicon.ico", type: "image/x-icon" },
      { url: "/favicon-16x16.png", type: "image/png", sizes: "16x16" },
      { url: "/favicon-32x32.png", type: "image/png", sizes: "32x32" },
      { url: "/favicon-48x48.png", type: "image/png", sizes: "48x48" },
      { url: "/favicon-192x192.png", type: "image/png", sizes: "192x192" },
      { url: "/favicon-512x512.png", type: "image/png", sizes: "512x512" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
    shortcut: ["/favicon.ico"],
  },
  manifest: "/site.webmanifest",
  category: "medical",
  classification: "Health and Wellness",
  other: {
    subject: "Neurosurgery and Spine Surgery",
    rating: "General",
    distribution: "Global",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: "#0B2E4E",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <html lang="en" prefix="og: https://ogp.me/ns# article: https://ogp.me/ns/article#">
      <head>
        <link rel="dns-prefetch" href="https://edge.hypertune.com" />
        <link rel="preconnect" href="https://edge.hypertune.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="preconnect" href="https://www.google-analytics.com" />
        <link rel="preconnect" href="https://cdnjs.middleware.io" />
        <link rel="preconnect" href="https://hjptv.middleware.io" />
      </head>
      <body className={`antialiased ${inter.variable} ${merriweather.variable}`}>
        <MiddlewareRUM />
        <GoogleAnalytics />
        <ClientAnalytics />
        <WebsiteSchema />
        <BreadcrumbSchema />
        <PhysicianSchema />
        <HospitalSchema />
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-1/2 focus:-translate-x-1/2 bg-blue-600 text-white px-4 py-2 rounded-md shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 z-50"
          aria-label="Skip to main content"
        >
          Skip to content
        </a>
        <Header />
        <TrustStrip />
        <main id="main-content" tabIndex={-1} role="main">
          <Breadcrumbs />
          {children}
        </main>
        <Footer />
        {/*
          HypertuneWrapper is placed at the end to prevent blocking LCP of the main content.
          Components inside <main> that use Hypertune hooks will use fallback values during SSR/initial render.
          Floating widgets that strictly require Hypertune context are kept inside the wrapper here.
        */}
        <HypertuneWrapper>
          <FlagValuesEmitter />
          <FloatingChatWidget />
          <DynamicStickyCTA />
        </HypertuneWrapper>
        <StandaloneFlagValues />
        {process.env.VERCEL ? <Analytics /> : null}
      </body>
    </html>
  );
}
