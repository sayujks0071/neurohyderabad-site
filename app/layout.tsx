import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import WebsiteSchema from "./components/schemas/WebsiteSchema";
import PhysicianSchema from "./components/schemas/PhysicianSchema";
import HospitalSchema from "./components/schemas/HospitalSchema";
import TrustStrip from "./_components/TrustStrip";
import ClientAnalytics from "./_components/ClientAnalytics";
import StickyCTA from "./_components/StickyCTA";
import ClientOnlyWrapper from "./_components/ClientOnlyWrapper";
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
            {/* Critical CSS inlined for fastest rendering */}
            <style dangerouslySetInnerHTML={{
              __html: `
                *,*::before,*::after{box-sizing:border-box}
                html{line-height:1.15;-webkit-text-size-adjust:100%}
                body{margin:0;font-family:Inter,ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans",sans-serif}
                .min-h-screen{min-height:100vh}
                .container{margin-left:auto;margin-right:auto;padding-left:1rem;padding-right:1rem}
                @media (min-width:640px){.container{max-width:640px}}
                @media (min-width:768px){.container{max-width:768px}}
                @media (min-width:1024px){.container{max-width:1024px}}
                @media (min-width:1280px){.container{max-width:1280px}}
                @media (min-width:1536px){.container{max-width:1536px}}
                .home-hero{background:linear-gradient(90deg,#2563eb 0%,#1e3a8a 100%);color:#f8fafc;padding-top:80px;padding-bottom:80px}
                .home-hero__title{font-size:2.25rem;font-weight:700;margin-bottom:1.5rem;line-height:1.1}
                .home-hero__subtitle{display:block;font-size:1.875rem;color:#dbeafe}
                .home-hero__lead{color:rgba(226,238,255,0.96);font-weight:500;line-height:1.55;max-width:40rem;margin:0 auto 1.5rem auto}
                .bg-white{background-color:#ffffff}
                .text-blue-600{color:#2563eb}
                .px-8{padding-left:2rem;padding-right:2rem}
                .py-4{padding-top:1rem;padding-bottom:1rem}
                .rounded-full{border-radius:9999px}
                .text-lg{font-size:1.125rem;line-height:1.75rem}
                .font-semibold{font-weight:600}
                .hover\\:bg-gray-100:hover{background-color:#f3f4f6}
                .transition-colors{transition-property:color,background-color,border-color,text-decoration-color,fill,stroke;transition-timing-function:cubic-bezier(0.4,0,0.2,1);transition-duration:150ms}
                .inline-block{display:inline-block}
                .grid{display:grid}
                .lg\\:grid-cols-2{grid-template-columns:repeat(1,minmax(0,1fr))}
                @media (min-width:1024px){.lg\\:grid-cols-2{grid-template-columns:repeat(2,minmax(0,1fr))}}
                .gap-12{gap:3rem}
                .items-center{align-items:center}
                .text-center{text-align:center}
                .lg\\:text-left{text-align:left}
                @media (min-width:1024px){.lg\\:text-left{text-align:left}}
                .mb-6{margin-bottom:1.5rem}
                .mb-4{margin-bottom:1rem}
                .ml-4{margin-left:1rem}
                @media (min-width:768px){
                  .home-hero__title{font-size:3.75rem}
                  .home-hero__subtitle{font-size:3rem}
                  .home-hero__lead{font-size:1.5rem}
                }
                .max-w-md{max-width:28rem}
                .mx-auto{margin-left:auto;margin-right:auto}
                .w-32{width:8rem}
                .h-32{height:8rem}
                .relative{position:relative}
                .overflow-hidden{overflow:hidden}
                .shadow-lg{box-shadow:0 10px 15px -3px rgba(0,0,0,0.1),0 4px 6px -2px rgba(0,0,0,0.05)}
                .object-cover{object-fit:cover}
                .w-full{width:100%}
                .h-full{height:100%}
                .text-blue-800{color:#1e40af}
                .text-blue-100{color:#dbeafe}
                .bg-green-600{background-color:#16a34a}
                .hover\\:bg-green-700:hover{background-color:#15803d}
                /* Critical image optimization */
                img{max-width:100%;height:auto}
                .object-cover{object-fit:cover}
                .rounded-full{border-radius:9999px}
              `
            }} />
            
            {/* Preload critical resources for fastest LCP */}
            <link rel="preload" href="https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hiJ-Ek-_EeA.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
            <link rel="preload" href="/images/dr-sayuj-krishnan-portrait.jpg" as="image" fetchPriority="high" />
            <link rel="preload" href="/images/dr-sayuj-krishnan-portrait.jpg?w=256&q=85" as="image" fetchPriority="high" />
            
            {/* Critical resource hints for performance - only essential ones */}
            <link rel="preconnect" href="https://fonts.googleapis.com" crossOrigin="anonymous" />
            <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
            
            {/* DNS prefetch for external domains - only critical ones */}
            <link rel="dns-prefetch" href="//www.googletagmanager.com" />
            
            {/* Additional performance hints */}
            <meta name="format-detection" content="telephone=no" />
            <meta name="mobile-web-app-capable" content="yes" />
            <meta name="apple-mobile-web-app-capable" content="yes" />
            <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      </head>
      <body className={`${inter.variable} antialiased`}>
        <ClientOnlyWrapper>
          <ClientAnalytics />
        </ClientOnlyWrapper>
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
        <main id="main-content" tabIndex={-1} role="main">
          {children}
        </main>
        <Footer />
        <ClientOnlyWrapper>
          <StickyCTA />
        </ClientOnlyWrapper>
      </body>
    </html>
  );
}
