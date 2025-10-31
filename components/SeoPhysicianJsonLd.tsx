export default function SeoPhysicianJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Physician",
    name: "Dr. Sayuj Krishnan",
    description:
      "Consultant Neurosurgeon & Full Endoscopic Spine Surgeon in Hyderabad, specializing in awake spine surgery, daycare slip disc surgery, minimally invasive brain surgery and complex brain & spine trauma care.",
    medicalSpecialty: [
      "Neurosurgery",
      "Endoscopic Spine Surgery",
      "Minimally Invasive Spine Surgery",
      "Awake Spine Surgery",
      "Brain Tumor Surgery",
      "Trauma & Critical Care Neurosurgery",
    ],
    address: {
      "@type": "PostalAddress",
      addressLocality: "Hyderabad",
      addressRegion: "Telangana",
      addressCountry: "India",
    },
    telephone: "+91-70346-49268",
    url: "https://www.drsayuj.info/",
    sameAs: [
      "https://www.drsayuj.info/",
      "https://www.linkedin.com/in/dr-sayuj-krishnan-s-275baa66",
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
