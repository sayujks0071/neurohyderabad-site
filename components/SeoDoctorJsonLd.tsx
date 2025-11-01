export default function SeoDoctorJsonLd() {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'Physician',
    name: 'Dr. Sayuj Krishnan',
    description:
      'Consultant neurosurgeon and full endoscopic spine surgeon in Hyderabad (Yashoda Hospital Malakpet). Minimally invasive spine surgery, awake brain surgery, epilepsy surgery, and 24/7 neurotrauma care.',
    medicalSpecialty: [
      'Neurosurgery',
      'Endoscopic Spine Surgery',
      'Minimally Invasive Spine Surgery',
      'Brain Tumor Surgery',
      'Epilepsy Surgery',
      'Trigeminal Neuralgia Care',
    ],
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Hyderabad',
      addressRegion: 'Telangana',
      addressCountry: 'India',
    },
    telephone: '+91-9778280044',
    hospitalAffiliation: {
      '@type': 'Hospital',
      name: 'Yashoda Hospital, Malakpet',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Malakpet, Hyderabad',
        addressRegion: 'Telangana',
        addressCountry: 'India',
      },
    },
    areaServed: [
      'Hyderabad',
      'Malakpet',
      'Dilsukhnagar',
      'LB Nagar',
      'Charminar',
      'Jubilee Hills',
      'Banjara Hills',
      'Hi-Tech City',
      'Gachibowli',
    ],
    sameAs: [
      'https://www.drsayuj.info/',
      'https://www.linkedin.com/in/dr-sayuj-krishnan-s-275baa66',
    ],
    url: 'https://www.drsayuj.info/',
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
