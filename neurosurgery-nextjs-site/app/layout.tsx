import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import SitewideSchemas from "@/components/schemas/SitewideSchemas";
import { SITE_URL } from "@/lib/seo";
import Header from "@/components/Header";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://www.drsayuj.com'),
  icons: {
    icon: [
      { url: "/favicon-32x32.png", type: "image/png", sizes: "32x32" },
      { url: "/favicon-16x16.png", type: "image/png", sizes: "16x16" },
      { url: "/favicon.ico", sizes: "any" }
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }]
  },
  manifest: "/site.webmanifest",
  themeColor: "#2563eb",
  title: "Dr. Sayuj Krishnan | Best Neurosurgeon in Hyderabad | Brain & Spine Specialist",
  description: "Dr. Sayuj Krishnan is a highly skilled neurosurgeon in Hyderabad specializing in minimally invasive brain & spine surgery. Expert treatment for brain tumors, spine disorders & more.",
  keywords: "neurosurgeon hyderabad, brain surgeon, spine specialist, brain tumor surgery, spine surgery, dr sayuj krishnan",
  authors: [{ name: "Dr. Sayuj Krishnan" }],
  creator: "Dr. Sayuj Krishnan",
  publisher: "Dr. Sayuj Krishnan",
  openGraph: {
    type: "website",
    locale: "en_IE",
    url: SITE_URL,
    title: "Dr. Sayuj Krishnan | Best Neurosurgeon in Hyderabad",
    description: "Expert neurosurgeon in Hyderabad specializing in minimally invasive brain & spine surgery",
    siteName: "Dr. Sayuj — Brain & Spine Care",
    images: ['/images/og-default.jpg'],
  },
  twitter: {
    card: "summary_large_image",
    title: "Dr. Sayuj Krishnan | Neurosurgeon in Hyderabad",
    description: "Expert neurosurgeon specializing in minimally invasive brain & spine surgery",
    images: ['/images/og-default.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          rel="preconnect"
          href="https://fonts.googleapis.com"
          crossOrigin="anonymous"
        />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          rel="preconnect"
          href="https://www.googletagmanager.com"
          crossOrigin="anonymous"
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <SitewideSchemas />
        <Header />
        {children}
      </body>
    </html>
  );
}
