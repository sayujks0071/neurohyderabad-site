import type { Metadata, Viewport } from "next";
import { Inter, Merriweather } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

declare global {
  interface Window {
    dataLayer?: unknown[];
  }
}
import Header from "./components/HeaderRefactored";
import Footer from "./components/Footer";
import WebsiteSchema from "./components/schemas/WebsiteSchema";
import PhysicianSchema from "./components/schemas/PhysicianSchema";
import HospitalSchema from "./components/schemas/HospitalSchema";
import TrustStrip from "./_components/TrustStrip";
import ClientAnalytics from "./_components/ClientAnalytics";
import StickyCTA from "./_components/StickyCTA";
import ClientOnlyWrapper from "./_components/ClientOnlyWrapper";
import HypertuneProvider from "./providers/hypertune-provider";
import { SITE_URL } from "../src/lib/seo";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  preload: true,
  fallback: ['system-ui', 'arial'],
  weight: ['400', '500', '600', '700'],
});

const merriweather = Merriweather({
  subsets: ["latin"],
  variable: "--font-merriweather",
  display: "swap",
  weight: ['400', '700'],
  fallback: ['Georgia', 'serif'],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Neurosurgeon & Endoscopic Spine Specialist Hyderabad | Dr. Sayuj Krishnan S",
    template: "%s | Dr. Sayuj Krishnan S"
  },
  description:
    "German-trained neurosurgeon in Hyderabad for minimally invasive spine and brain surgery with same-day discharge at Yashoda Hospital, Malakpet.",
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
  authors: [{ name: "Dr. Sayuj Krishnan S", url: SITE_URL }],
  creator: "Dr. Sayuj Krishnan S",
  publisher: "Dr. Sayuj Krishnan S",
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
    title: "Dr. Sayuj Krishnan S | Best Neurosurgeon in Hyderabad | Brain & Spine Surgery",
    description: "Expert neurosurgeon Dr. Sayuj Krishnan in Hyderabad specializing in endoscopic spine surgery, brain tumor surgery, and minimally invasive procedures. Same-day discharge available. 1,000+ endoscopic procedures performed.",
    url: SITE_URL,
    siteName: "Dr. Sayuj Krishnan - Neurosurgeon Hyderabad",
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
    google: "CUX_NejezcAvodKjX_CDYrMMn1hMAtdpQqKJMWKWEuo",
  },
  icons: {
    icon: [
      { url: "/favicon.ico", type: "image/x-icon" },
      { url: "/favicon-16x16.png", type: "image/png", sizes: "16x16" },
      { url: "/favicon-32x32.png", type: "image/png", sizes: "32x32" },
      { url: "/favicon-48x48.png", type: "image/png", sizes: "48x48" },
      { url: "/favicon-192x192.png", type: "image/png", sizes: "192x192" },
      { url: "/favicon-512x512.png", type: "image/png", sizes: "512x512" },
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
    shortcut: ["/favicon.ico"],
  },
  manifest: "/site.webmanifest",
  category: "medical",
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
      <html lang="en">
      <head>
        <link rel="dns-prefetch" href="https://edge.hypertune.com" />
        <link rel="preconnect" href="https://edge.hypertune.com" crossOrigin="anonymous" />
      </head>
      <body className={`${inter.variable} ${merriweather.variable} antialiased`}>
        <ClientAnalytics />
        <WebsiteSchema />
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
        <HypertuneProvider>
          <main id="main-content" tabIndex={-1} role="main">
            {children}
          </main>
        </HypertuneProvider>
        <Footer />
        <ClientOnlyWrapper>
          <StickyCTA />
        </ClientOnlyWrapper>
        {process.env.VERCEL ? <Analytics /> : null}
      </body>
    </html>
  );
}
