// next-seo.config.ts
import { DefaultSeoProps } from 'next-seo';

const SEO_CONFIG: DefaultSeoProps = {
  titleTemplate:
    '%s | Dr. Sayuj Krishnan - Neurosurgeon & Endoscopic Spine Surgeon in Hyderabad',
  defaultTitle:
    'Best Spine Surgeon at Yashoda Hospital Malakpet | Dr. Sayuj Krishnan, Neurosurgeon in Hyderabad',
  description:
    'Consultant neurosurgeon and full endoscopic spine surgeon in Hyderabad. Advanced spine (slip disc, stenosis, sciatica), brain tumor, epilepsy, trigeminal neuralgia, and 24/7 emergency neurosurgical care at Yashoda Hospital Malakpet. 1,000+ endoscopic procedures performed.',
  canonical: 'https://www.drsayuj.info/',
  openGraph: {
    type: 'website',
    url: 'https://www.drsayuj.info/',
    title:
      'Endoscopic Spine Surgery & Advanced Brain Surgery in Hyderabad | Dr. Sayuj Krishnan',
    description:
      'Same-day-discharge spine surgery, awake neurosurgery, neuronavigation, intraoperative monitoring, and emergency neurotrauma care in Hyderabad. German-trained neurosurgeon with 1,000+ endoscopic procedures.',
    siteName: 'Dr. Sayuj Krishnan - Neurosurgeon Hyderabad',
    locale: 'en_IN',
    images: [
      {
        url: 'https://www.drsayuj.info/images/og-default.jpg',
        width: 1200,
        height: 630,
        alt: 'Dr. Sayuj Krishnan - Neurosurgeon & Spine Surgeon, Hyderabad | Yashoda Hospital Malakpet',
        type: 'image/jpeg',
      },
    ],
  },
  twitter: {
    cardType: 'summary_large_image',
    site: '@drsayuj',
  },
  additionalMetaTags: [
    {
      name: 'geo.region',
      content: 'IN-TG',
    },
    {
      name: 'geo.placename',
      content: 'Hyderabad',
    },
    {
      name: 'geo.position',
      content: '17.3850;78.4867',
    },
    {
      name: 'ICBM',
      content: '17.3850, 78.4867',
    },
  ],
};

export default SEO_CONFIG;
