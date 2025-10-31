// next-seo.config.ts
// Global SEO configuration for enhanced Open Graph and Twitter metadata
// Note: This is used in conjunction with Next.js App Router metadata API

export interface NextSeoConfig {
  titleTemplate: string;
  defaultTitle: string;
  description: string;
  canonical: string;
  openGraph: {
    type: string;
    url: string;
    title: string;
    description: string;
    images: Array<{
      url: string;
      width: number;
      height: number;
      alt: string;
    }>;
    site_name: string;
    locale: string;
  };
  twitter: {
    cardType: string;
    site?: string;
    creator?: string;
  };
  additionalMetaTags?: Array<{
    name: string;
    content: string;
  }>;
}

const config: NextSeoConfig = {
  titleTemplate: '%s | Dr. Sayuj Krishnan - Neurosurgeon & Full Endoscopic Spine Surgeon in Hyderabad',
  defaultTitle: 'Best Neurosurgeon & Full Endoscopic Spine Surgeon in Hyderabad | Dr. Sayuj Krishnan',
  description:
    'Dr. Sayuj Krishnan is a consultant neurosurgeon and full endoscopic spine surgeon in Hyderabad, Telangana, specializing in awake spine surgery, daycare slip disc surgery, minimally invasive brain tumor and trauma care.',
  canonical: 'https://www.drsayuj.info/',
  openGraph: {
    type: 'website',
    url: 'https://www.drsayuj.info/',
    title: 'Full Endoscopic Spine Surgery & Minimally Invasive Brain Surgery in Hyderabad',
    description:
      'Advanced awake spine surgery, endoscopic disc/stenosis decompression, and complex brain & spine trauma care by Dr. Sayuj Krishnan in Hyderabad.',
    images: [
      {
        url: 'https://www.drsayuj.info/images/og-default.jpg',
        width: 1200,
        height: 630,
        alt: 'Dr. Sayuj Krishnan - Neurosurgeon & Spine Surgeon in Hyderabad',
      },
    ],
    site_name: 'Dr. Sayuj Krishnan - Neurosurgeon Hyderabad',
    locale: 'en_IN',
  },
  twitter: {
    cardType: 'summary_large_image',
    site: '@drsayuj',
    creator: '@drsayuj',
  },
  additionalMetaTags: [
    {
      name: 'viewport',
      content: 'width=device-width, initial-scale=1, maximum-scale=5',
    },
    {
      name: 'keywords',
      content: 'neurosurgeon hyderabad, full endoscopic spine surgery, awake spine surgery, brain tumor surgery, minimally invasive spine surgery, daycare spine surgery, dr sayuj krishnan',
    },
  ],
};

export default config;
