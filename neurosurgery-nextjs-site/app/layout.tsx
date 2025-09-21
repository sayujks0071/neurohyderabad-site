import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Dr. Sayuj Krishnan | Best Neurosurgeon in Hyderabad | Brain & Spine Specialist",
  description: "Dr. Sayuj Krishnan is a highly skilled neurosurgeon in Hyderabad specializing in minimally invasive brain & spine surgery. Expert treatment for brain tumors, spine disorders & more.",
  keywords: "neurosurgeon hyderabad, brain surgeon, spine specialist, brain tumor surgery, spine surgery, dr sayuj krishnan",
  authors: [{ name: "Dr. Sayuj Krishnan" }],
  creator: "Dr. Sayuj Krishnan",
  publisher: "Dr. Sayuj Krishnan",
  openGraph: {
    type: "website",
    locale: "en_IE",
    url: "https://www.drsayuj.com",
    title: "Dr. Sayuj Krishnan | Best Neurosurgeon in Hyderabad",
    description: "Expert neurosurgeon in Hyderabad specializing in minimally invasive brain & spine surgery",
    siteName: "Dr. Sayuj Krishnan - Neurosurgeon",
    images: [{
      url: "https://www.drsayuj.com/og-image.jpg",
      width: 1200,
      height: 630,
      alt: "Dr. Sayuj Krishnan - Neurosurgeon in Hyderabad"
    }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Dr. Sayuj Krishnan | Neurosurgeon in Hyderabad",
    description: "Expert neurosurgeon specializing in minimally invasive brain & spine surgery",
    images: ["https://www.drsayuj.com/twitter-image.jpg"],
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
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
