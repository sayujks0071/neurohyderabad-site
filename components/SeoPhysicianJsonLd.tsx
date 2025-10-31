// SeoPhysicianJsonLd.tsx
// Simplified Physician structured data for SEO
// This component provides focused JSON-LD for physician information
// Complementary to the comprehensive PhysicianSchema in app/components/schemas/

export default function SeoPhysicianJsonLd() {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'Physician',
    name: 'Dr. Sayuj Krishnan',
    description:
      'Consultant Neurosurgeon & Full Endoscopic Spine Surgeon in Hyderabad, specializing in awake spine surgery, daycare slip disc surgery, minimally invasive brain surgery and complex brain & spine trauma care.',
    medicalSpecialty: [
      'Neurosurgery',
      'Endoscopic Spine Surgery',
      'Minimally Invasive Spine Surgery',
      'Awake Spine Surgery',
      'Brain Tumor Surgery',
      'Trauma & Critical Care Neurosurgery',
    ],
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Room No 317, OPD Block, Yashoda Hospital',
      addressLocality: 'Malakpet',
      addressRegion: 'Telangana',
      postalCode: '500036',
      addressCountry: 'India',
    },
    telephone: '+91-9778280044',
    email: 'neurospinehyd@drsayuj.com',
    url: 'https://www.drsayuj.info/',
    sameAs: [
      'https://www.drsayuj.info/',
      'https://www.linkedin.com/in/dr-sayuj-krishnan-s-275baa66',
      'https://www.yashodahospitals.com/doctor/dr-sayuj-krishnan/',
      'https://g.co/kgs/9366939683880052414',
    ],
    hospitalAffiliation: {
      '@type': 'Hospital',
      name: 'Yashoda Hospital',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Nalgonda X Roads, Malakpet',
        addressLocality: 'Hyderabad',
        addressRegion: 'Telangana',
        postalCode: '500036',
        addressCountry: 'India',
      },
    },
    availableService: [
      {
        '@type': 'MedicalProcedure',
        name: 'Full Endoscopic Spine Surgery',
        description: 'Minimally invasive spine surgery using endoscopic techniques',
      },
      {
        '@type': 'MedicalProcedure',
        name: 'Awake Spine Surgery',
        description: 'Advanced awake craniotomy and spine procedures',
      },
      {
        '@type': 'MedicalProcedure',
        name: 'Daycare Spine Surgery',
        description: 'Same-day discharge minimally invasive procedures',
      },
      {
        '@type': 'MedicalProcedure',
        name: 'Brain Tumor Surgery',
        description: 'Microsurgical removal of brain tumors',
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
