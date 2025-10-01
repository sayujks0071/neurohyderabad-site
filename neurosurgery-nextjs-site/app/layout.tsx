import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import WebsiteSchema from "./components/schemas/WebsiteSchema";
import PhysicianSchema from "./components/schemas/PhysicianSchema";
import HospitalSchema from "./components/schemas/HospitalSchema";
import { SITE_URL } from "../src/lib/seo";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Neurosurgeon in Hyderabad | Endoscopic Spine Surgeon",
  description: "Endoscopic discectomy, foraminotomy, and minimally invasive spine surgery in Hyderabad. Same-day mobilization. Book a consultation.",
  keywords: "neurosurgeon hyderabad, brain surgeon, spine specialist, brain tumor surgery, spine surgery, dr sayuj krishnan",
  authors: [{ name: "Dr Sayuj Krishnan" }],
  creator: "Dr Sayuj Krishnan",
  publisher: "Dr Sayuj Krishnan",
  alternates: {
    canonical: SITE_URL,
    languages: {
      'en-IN': SITE_URL,
      'x-default': SITE_URL,
    },
  },
  openGraph: {
    title: "Dr Sayuj Krishnan | Full Endoscopic Spine Surgeon in Hyderabad",
    description: "Expert neurosurgeon in Hyderabad specializing in minimally invasive brain & spine surgery",
    url: SITE_URL,
    siteName: "Dr. Sayuj — Brain & Spine Care",
    locale: "en_IE",
    type: "website",
    images: [
      {
        url: "/images/og-default.jpg",
        width: 1200,
        height: 630,
        alt: "Dr Sayuj Krishnan — Neurosurgeon in Hyderabad",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Dr Sayuj Krishnan | Full Endoscopic Spine Surgeon in Hyderabad",
    description: "Expert neurosurgeon specializing in minimally invasive brain & spine surgery",
    images: ["/images/og-default.jpg"],
    site: "@drsayuj",
    creator: "@drsayuj",
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
    google: "your-google-verification-code",
  },
  icons: {
    icon: [
      { url: "/favicon.png", type: "image/png", sizes: "any" },
      { url: "/favicon.ico", type: "image/x-icon", sizes: "16x16" },
    ],
    apple: [
      { url: "/favicon.png", sizes: "180x180" },
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
      </head>
      <body className={`${inter.variable} antialiased`}>
        <WebsiteSchema />
        <PhysicianSchema />
        <HospitalSchema />
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
