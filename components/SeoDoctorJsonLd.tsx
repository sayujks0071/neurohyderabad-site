export default function SeoDoctorJsonLd() {
  const physicianData = {
    '@context': 'https://schema.org',
    '@type': 'Physician',
    name: 'Dr. Sayuj Krishnan',
    honorificPrefix: 'Dr.',
    givenName: 'Sayuj',
    familyName: 'Krishnan',
    description:
      'Consultant neurosurgeon and full endoscopic spine surgeon in Hyderabad (Yashoda Hospital Malakpet). Minimally invasive spine surgery, awake brain surgery, epilepsy surgery, and 24/7 neurotrauma care.',
    medicalSpecialty: [
      'Neurosurgery',
      'Spine Surgery',
      'Endoscopic Spine Surgery',
      'Minimally Invasive Spine Surgery',
      'Brain Tumor Surgery',
      'Epilepsy Surgery',
      'Trigeminal Neuralgia Care',
      'Emergency Neurosurgery',
      'Neurotrauma',
    ],
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Room 317, OPD Block, Yashoda Hospital, Malakpet',
      addressLocality: 'Hyderabad',
      addressRegion: 'Telangana',
      postalCode: '500036',
      addressCountry: 'IN',
    },
    telephone: '+91-9778280044',
    email: 'hellodr@drsayuj.info',
    url: 'https://www.drsayuj.info/',
    image: 'https://www.drsayuj.info/images/og-default.jpg',
    priceRange: '₹₹₹',
    yearsOfExperience: 15,
    hospitalAffiliation: [
      {
        '@type': 'Hospital',
        name: 'Yashoda Hospital, Malakpet',
        address: {
          '@type': 'PostalAddress',
          streetAddress: 'Alexander Road, Malakpet',
          addressLocality: 'Hyderabad',
          addressRegion: 'Telangana',
          postalCode: '500036',
          addressCountry: 'IN',
        },
      },
    ],
    availableService: [
      {
        '@type': 'MedicalProcedure',
        name: 'Endoscopic Spine Surgery',
        description: 'Full endoscopic discectomy and decompression for herniated discs and spinal stenosis',
      },
      {
        '@type': 'MedicalProcedure',
        name: 'Brain Tumor Surgery',
        description: 'Microsurgical resection with neuronavigation and awake craniotomy techniques',
      },
      {
        '@type': 'MedicalProcedure',
        name: 'Microvascular Decompression',
        description: 'Surgical treatment for trigeminal neuralgia and hemifacial spasm',
      },
      {
        '@type': 'MedicalProcedure',
        name: 'Emergency Brain Bleed Evacuation',
        description: '24/7 emergency surgical management of intracerebral hemorrhage',
      },
      {
        '@type': 'MedicalProcedure',
        name: 'Cervical Myelopathy Decompression',
        description: 'Anterior and posterior approaches for spinal cord compression',
      },
    ],
    areaServed: [
      {
        '@type': 'City',
        name: 'Hyderabad',
        containedIn: {
          '@type': 'State',
          name: 'Telangana',
        },
      },
      'Malakpet',
      'Dilsukhnagar',
      'LB Nagar',
      'Charminar',
      'Jubilee Hills',
      'Banjara Hills',
      'Hi-Tech City',
      'Gachibowli',
      'Secunderabad',
      'Madhapur',
      'Kondapur',
    ],
    sameAs: [
      'https://www.drsayuj.info/',
      'https://www.linkedin.com/in/dr-sayuj-krishnan-s-275baa66',
    ],
    alumniOf: [
      {
        '@type': 'EducationalOrganization',
        name: 'DNB Neurosurgery (Direct 6 years)',
      },
      {
        '@type': 'EducationalOrganization',
        name: 'Fellowship in Minimally Invasive and Advanced Spine Surgery',
      },
      {
        '@type': 'EducationalOrganization',
        name: 'Observership in Full Endoscopic Spine Surgery, Germany',
      },
    ],
    memberOf: [
      {
        '@type': 'Organization',
        name: 'Neurological Society of India (NSI)',
        url: 'https://www.neurologyindia.com',
      },
      {
        '@type': 'Organization',
        name: 'Congress of Neurological Surgeons (CNS)',
      },
      {
        '@type': 'Organization',
        name: 'World Federation of Neurosurgical Societies (WFNS)',
      },
    ],
    award: [
      'German Fellowship in Full Endoscopic Spine Surgery',
      'DNB Neurosurgery - Direct 6 Year Programme',
    ],
    knowsAbout: [
      'Endoscopic Spine Surgery',
      'Minimally Invasive Neurosurgery',
      'Brain Tumor Surgery',
      'Awake Craniotomy',
      'Trigeminal Neuralgia Treatment',
      'Epilepsy Surgery',
      'Deep Brain Stimulation',
      'Spinal Stenosis Treatment',
      'Herniated Disc Treatment',
      'Neurotrauma Care',
    ],
  };

  const clinicData = {
    '@context': 'https://schema.org',
    '@type': 'MedicalClinic',
    '@id': 'https://www.drsayuj.info/#medicalclinic',
    name: 'Dr. Sayuj Krishnan - Brain & Spine Clinic, Yashoda Hospital Malakpet',
    description:
      'Specialized neurosurgery and spine surgery clinic offering endoscopic procedures, brain tumor surgery, and 24/7 emergency neurosurgical care in Hyderabad.',
    url: 'https://www.drsayuj.info/',
    image: 'https://www.drsayuj.info/images/og-default.jpg',
    priceRange: '₹₹₹',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Room 317, OPD Block, Yashoda Hospital, Alexander Road, Malakpet',
      addressLocality: 'Hyderabad',
      addressRegion: 'Telangana',
      postalCode: '500036',
      addressCountry: 'IN',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 17.375,
      longitude: 78.5147,
    },
    telephone: '+91-9778280044',
    email: 'hellodr@drsayuj.info',
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        opens: '10:00',
        closes: '16:00',
        description: 'Regular OPD Hours',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        opens: '00:00',
        closes: '23:59',
        description: '24/7 Emergency Neurosurgical Consultation',
      },
    ],
    areaServed: [
      {
        '@type': 'City',
        name: 'Hyderabad',
      },
      {
        '@type': 'State',
        name: 'Telangana',
      },
      'Jubilee Hills',
      'Banjara Hills',
      'Hi-Tech City',
      'Gachibowli',
      'Malakpet',
      'Secunderabad',
      'Madhapur',
      'Kondapur',
      'Dilsukhnagar',
      'LB Nagar',
    ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Neurosurgical Services',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'MedicalProcedure',
            name: 'Endoscopic Spine Surgery',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'MedicalProcedure',
            name: 'Brain Tumor Surgery',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'MedicalProcedure',
            name: 'Trigeminal Neuralgia Treatment',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'MedicalProcedure',
            name: 'Emergency Brain Bleed Evacuation',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'MedicalProcedure',
            name: 'Cervical Myelopathy Surgery',
          },
        },
      ],
    },
    paymentAccepted: ['Cash', 'Credit Card', 'Insurance'],
    currenciesAccepted: 'INR',
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(physicianData) }}
        suppressHydrationWarning
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(clinicData) }}
        suppressHydrationWarning
      />
    </>
  );
}
