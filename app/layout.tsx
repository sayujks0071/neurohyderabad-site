import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Script from "next/script";
import Header from "./components/Header";
import Footer from "./components/Footer";
import WebsiteSchema from "./components/schemas/WebsiteSchema";
import PhysicianSchema from "./components/schemas/PhysicianSchema";
import HospitalSchema from "./components/schemas/HospitalSchema";
import MyStatsig from "./my-statsig";
import TrustStrip from "./_components/TrustStrip";
import StickyCTA from "./_components/StickyCTA";
import ClientAnalytics from "./_components/ClientAnalytics";
import { SITE_URL } from "../src/lib/seo";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  preload: true,
  fallback: ['system-ui', 'arial'],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Dr. Sayuj Krishnan | Best Neurosurgeon in Hyderabad | Brain & Spine Surgery",
    template: "%s | Dr. Sayuj Krishnan - Neurosurgeon Hyderabad"
  },
  description: "Expert neurosurgeon Dr. Sayuj Krishnan in Hyderabad specializing in endoscopic spine surgery, brain tumor surgery, and minimally invasive procedures. Same-day discharge available. Book consultation at Yashoda Hospital Malakpet.",
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
    title: "Dr. Sayuj Krishnan | Best Neurosurgeon in Hyderabad | Brain & Spine Surgery",
    description: "Expert neurosurgeon Dr. Sayuj Krishnan in Hyderabad specializing in endoscopic spine surgery, brain tumor surgery, and minimally invasive procedures. Same-day discharge available.",
    url: SITE_URL,
    siteName: "Dr. Sayuj Krishnan - Neurosurgeon Hyderabad",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "/images/og-default.jpg",
        width: 1200,
        height: 630,
        alt: "Dr. Sayuj Krishnan — Best Neurosurgeon in Hyderabad",
        type: "image/jpeg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Dr. Sayuj Krishnan | Best Neurosurgeon in Hyderabad",
    description: "Expert neurosurgeon specializing in endoscopic spine surgery, brain tumor surgery, and minimally invasive procedures in Hyderabad.",
    images: ["/images/og-default.jpg"],
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
    google: process.env.GOOGLE_SITE_VERIFICATION || "TdmsCuJyE9lVQbJNVbvcOOAihK5dbKOmGwhlm1x9nnw",
  },
  icons: {
    icon: [
      { url: "/favicon.ico", type: "image/x-icon", sizes: "16x16" },
      { url: "/favicon-32x32.png", type: "image/png", sizes: "32x32" },
      { url: "/favicon-16x16.png", type: "image/png", sizes: "16x16" },
      { url: "/favicon.ico", sizes: "any" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180" },
    ],
    shortcut: "/favicon.ico",
  },
  manifest: "/site.webmanifest",
  category: "medical",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: "#2563eb",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
        <html lang="en">
          <head>
            {/* Critical resource hints for performance */}
            <link rel="preconnect" href="https://fonts.googleapis.com" crossOrigin="anonymous" />
            <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
            <link rel="preconnect" href="https://www.googletagmanager.com" crossOrigin="anonymous" />
            <link rel="preconnect" href="https://accounts.google.com" crossOrigin="anonymous" />
            <link rel="preconnect" href="https://i.ytimg.com" crossOrigin="anonymous" />
            
            {/* Preload critical resources with fetchpriority - only AVIF for best compression */}
            <link rel="preload" href="/images/logo.avif" as="image" type="image/avif" fetchPriority="high" />
            <link rel="preload" href="/images/logo.webp" as="image" type="image/webp" />
            <link rel="preload" href="/images/og-default.jpg" as="image" type="image/jpeg" />
            
            {/* DNS prefetch for external domains */}
            <link rel="dns-prefetch" href="//www.youtube.com" />
            <link rel="dns-prefetch" href="//www.google-analytics.com" />
            <link rel="dns-prefetch" href="//www.googletagmanager.com" />
            <link rel="dns-prefetch" href="//statsig.com" />
            <link rel="dns-prefetch" href="//wa.me" />
            <link rel="dns-prefetch" href="//www.google-analytics.com" />
            <link rel="dns-prefetch" href="//www.googletagmanager.com" />
            
            {/* Additional performance hints */}
            <meta name="format-detection" content="telephone=no" />
            <meta name="mobile-web-app-capable" content="yes" />
            <meta name="apple-mobile-web-app-capable" content="yes" />
            <meta name="apple-mobile-web-app-status-bar-style" content="default" />
            
            <Script src="https://accounts.google.com/gsi/client" strategy="lazyOnload" />
          </head>
      <body className={`${inter.variable} antialiased`}>
        <MyStatsig>
          <ClientAnalytics />
          <WebsiteSchema />
          <PhysicianSchema />
          <HospitalSchema />
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-1/2 focus:-translate-x-1/2 bg-blue-600 text-white px-4 py-2 rounded-md shadow-lg"
          >
            Skip to content
          </a>
          <Header />
          <TrustStrip />
          <div id="main-content" tabIndex={-1}>
            {children}
          </div>
          <Footer />
          <StickyCTA />
        </MyStatsig>
      </body>
    </html>
  );
}
