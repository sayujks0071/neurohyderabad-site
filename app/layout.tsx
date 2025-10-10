import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import WebsiteSchema from "./components/schemas/WebsiteSchema";
import PhysicianSchema from "./components/schemas/PhysicianSchema";
import HospitalSchema from "./components/schemas/HospitalSchema";
import GoogleAnalytics from "../src/components/GoogleAnalytics";
import WebVitals from "../src/components/WebVitals";
import MyStatsig from "./my-statsig";
import StatsigSessionReplay from "../src/components/StatsigSessionReplay";
import StatsigAnalytics from "../src/components/StatsigAnalytics";
import PhoneClickTracker from "../src/components/PhoneClickTracker";
import SEOOptimizer from "../src/components/SEOOptimizer";
import FloatingWhatsApp from "../src/components/FloatingWhatsApp";
import CookieConsent from "../src/components/CookieConsent";
import TrustStrip from "./_components/TrustStrip";
import StickyCTA from "./_components/StickyCTA";
import Script from "next/script";
import { SITE_URL } from "../src/lib/seo";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Dr. Sayuj Krishnan | Best Neurosurgeon in Hyderabad | Brain & Spine Surgery",
  description: "Expert neurosurgeon in Hyderabad specializing in minimally invasive brain & spine surgery. 15+ years experience. Book consultation at Yashoda Hospital.",
  keywords: "neurosurgeon hyderabad, brain surgeon hyderabad, spine specialist hyderabad, brain tumor surgery hyderabad, spine surgery hyderabad, dr sayuj krishnan, endoscopic spine surgery, minimally invasive neurosurgery, yashoda hospital neurosurgeon, best neurosurgeon hyderabad",
  authors: [{ name: "Dr. Sayuj Krishnan", url: SITE_URL }],
  creator: "Dr. Sayuj Krishnan",
  publisher: "Dr. Sayuj Krishnan",
  alternates: {
    canonical: SITE_URL,
    languages: {
      'en-IN': SITE_URL,
      'x-default': SITE_URL,
    },
  },
  openGraph: {
    title: "Dr. Sayuj Krishnan | Best Neurosurgeon in Hyderabad | Brain & Spine Surgery",
    description: "Expert neurosurgeon in Hyderabad specializing in minimally invasive brain & spine surgery. 15+ years experience. Book consultation at Yashoda Hospital.",
    url: SITE_URL,
    siteName: "Dr. Sayuj Krishnan — Brain & Spine Care",
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
    description: "Expert neurosurgeon specializing in minimally invasive brain & spine surgery. 15+ years experience.",
    images: ["/images/og-default.jpg"],
    creator: "@drsayujkrishnan",
    site: "@drsayujkrishnan",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION || "google596c27148477e4ee",
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
  },
  manifest: "/site.webmanifest",
};

export const viewport: Viewport = {
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
            <link rel="preconnect" href="https://fonts.googleapis.com" crossOrigin="anonymous" />
            <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
            <link rel="preconnect" href="https://www.googletagmanager.com" crossOrigin="anonymous" />
            <link rel="preconnect" href="https://accounts.google.com" crossOrigin="anonymous" />
            <Script src="https://accounts.google.com/gsi/client" strategy="afterInteractive" />
          </head>
      <body className={`${inter.variable} antialiased`}>
        <MyStatsig>
          <GoogleAnalytics />
          <WebVitals />
          <StatsigAnalytics />
          <StatsigSessionReplay />
          <PhoneClickTracker />
          <SEOOptimizer pageType="home" pageSlug="/" />
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
          <FloatingWhatsApp />
          <CookieConsent />
        </MyStatsig>
      </body>
    </html>
  );
}
