import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: {
    template: '%s | NeuroHyderabad - Best Neurosurgeon in Hyderabad',
    default: 'NeuroHyderabad - Best Neurosurgeon in Hyderabad | Advanced Brain & Spine Surgery',
  },
  description: 'Leading neurosurgery practice in Hyderabad offering advanced brain surgery, spine surgery, and neurological treatments. Expert neurosurgeons with state-of-the-art facilities.',
  keywords: [
    'neurosurgeon hyderabad',
    'brain surgery hyderabad',
    'spine surgery hyderabad',
    'neurologist hyderabad',
    'best neurosurgeon hyderabad',
    'neurosurgery clinic hyderabad',
    'brain tumor surgery',
    'spinal cord surgery',
    'minimally invasive neurosurgery'
  ],
  authors: [{ name: 'NeuroHyderabad Medical Team' }],
  creator: 'NeuroHyderabad',
  publisher: 'NeuroHyderabad',
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
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://neurohyderabad.com',
    siteName: 'NeuroHyderabad',
    title: 'NeuroHyderabad - Best Neurosurgeon in Hyderabad',
    description: 'Leading neurosurgery practice in Hyderabad offering advanced brain surgery, spine surgery, and neurological treatments.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'NeuroHyderabad - Advanced Neurosurgery Care',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NeuroHyderabad - Best Neurosurgeon in Hyderabad',
    description: 'Leading neurosurgery practice in Hyderabad offering advanced brain surgery, spine surgery, and neurological treatments.',
    images: ['/twitter-image.jpg'],
  },
  verification: {
    google: 'your-google-verification-code',
  },
  alternates: {
    canonical: 'https://neurohyderabad.com',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="canonical" href="https://neurohyderabad.com" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "MedicalOrganization",
              "name": "NeuroHyderabad",
              "url": "https://neurohyderabad.com",
              "logo": "https://neurohyderabad.com/logo.png",
              "description": "Leading neurosurgery practice in Hyderabad offering advanced brain surgery, spine surgery, and neurological treatments.",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "Road No. 36, Jubilee Hills",
                "addressLocality": "Hyderabad",
                "addressRegion": "Telangana",
                "postalCode": "500033",
                "addressCountry": "IN"
              },
              "telephone": "+91-40-1234-5678",
              "email": "contact@neurohyderabad.com",
              "medicalSpecialty": "Neurosurgery",
              "availableService": [
                {
                  "@type": "MedicalTherapy",
                  "name": "Brain Surgery"
                },
                {
                  "@type": "MedicalTherapy", 
                  "name": "Spine Surgery"
                },
                {
                  "@type": "MedicalTherapy",
                  "name": "Neurological Treatments"
                }
              ]
            })
          }}
        />
      </head>
      <body className="font-sans antialiased">
        {children}
      </body>
    </html>
  );
}