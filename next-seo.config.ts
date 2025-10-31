import { DefaultSeoProps } from "next-seo";

const config: DefaultSeoProps = {
  titleTemplate:
    "%s | Dr. Sayuj Krishnan - Neurosurgeon & Full Endoscopic Spine Surgeon in Hyderabad",
  defaultTitle:
    "Best Neurosurgeon & Full Endoscopic Spine Surgeon in Hyderabad | Dr. Sayuj Krishnan",
  description:
    "Dr. Sayuj Krishnan is a consultant neurosurgeon and full endoscopic spine surgeon in Hyderabad, Telangana, specializing in awake spine surgery, daycare slip disc surgery, minimally invasive brain tumor and trauma care.",
  canonical: "https://www.drsayuj.info/",
  openGraph: {
    type: "website",
    url: "https://www.drsayuj.info/",
    title:
      "Full Endoscopic Spine Surgery & Minimally Invasive Brain Surgery in Hyderabad",
    description:
      "Advanced awake spine surgery, endoscopic disc/stenosis decompression, and complex brain & spine trauma care by Dr. Sayuj Krishnan in Hyderabad.",
    images: [
      {
        url: "https://www.drsayuj.info/og-default.png",
        width: 1200,
        height: 630,
        alt: "Dr. Sayuj Krishnan - Neurosurgeon & Spine Surgeon in Hyderabad",
      },
    ],
  },
  twitter: {
    cardType: "summary_large_image",
  },
  additionalMetaTags: [
    {
      name: "keywords",
      content:
        "neurosurgeon hyderabad, brain surgery hyderabad, spine specialist hyderabad, endoscopic spine surgery hyderabad, awake spine surgery, daycare spine surgery, minimally invasive spine surgery, dr sayuj krishnan, yashoda hospital malakpet",
    },
  ],
};

export default config;
