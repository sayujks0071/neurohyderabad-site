// next-seo.config.ts
import { DefaultSeoProps } from 'next-seo';

const SEO_CONFIG: DefaultSeoProps = {
  titleTemplate:
    '%s | Dr. Sayuj Krishnan - Neurosurgeon & Endoscopic Spine Surgeon in Hyderabad',
  defaultTitle:
    'Best Spine Surgeon at Yashoda Hospital Malakpet | Dr. Sayuj Krishnan, Neurosurgeon in Hyderabad',
  description:
    'Consultant neurosurgeon and full endoscopic spine surgeon in Hyderabad. Advanced spine (slip disc, stenosis, sciatica), brain tumor, epilepsy, trigeminal neuralgia, and 24/7 emergency neurosurgical care at Yashoda Hospital Malakpet.',
  canonical: 'https://www.drsayuj.info/',
  openGraph: {
    type: 'website',
    url: 'https://www.drsayuj.info/',
    title:
      'Endoscopic Spine Surgery & Advanced Brain Surgery in Hyderabad | Dr. Sayuj Krishnan',
    description:
      'Same-day-discharge spine surgery, awake neurosurgery, neuronavigation, intraoperative monitoring, and emergency neurotrauma care in Hyderabad.',
    images: [
      {
        url: 'https://www.drsayuj.info/og-default.png',
        width: 1200,
        height: 630,
        alt: 'Dr. Sayuj Krishnan - Neurosurgeon & Spine Surgeon, Hyderabad',
      },
    ],
  },
  twitter: {
    cardType: 'summary_large_image',
  },
};

export default SEO_CONFIG;
