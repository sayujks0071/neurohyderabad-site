import Script from 'next/script'

export function OrgJsonLd() {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': 'https://www.drsayuj.info/#org',
    name: 'Dr. Sayuj Krishnan — Brain & Spine Surgeon',
    url: 'https://www.drsayuj.info',
    logo: 'https://www.drsayuj.info/images/logo-optimized.png',
    sameAs: [
      'https://www.instagram.com/TheSpineDoc/',
      'https://www.youtube.com/@drsayujneurohyd',
      'https://x.com/drsayuj',
      'https://www.facebook.com/drsayuj/'
    ],
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Room No 317, OPD Block, Yashoda Hospital, Malakpet',
      addressLocality: 'Hyderabad',
      addressRegion: 'Telangana',
      postalCode: '500036',
      addressCountry: 'IN'
    },
    telephone: '+91-9778280044',
    email: 'neurospinehyd@drsayuj.com'
  }
  return <Script id="org-jsonld" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
}

export function PhysicianJsonLd() {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'Physician',
    '@id': 'https://www.drsayuj.info/#physician',
    name: 'Dr Sayuj Krishnan',
    url: 'https://www.drsayuj.info',
    image: 'https://www.drsayuj.info/images/og-default.jpg',
    medicalSpecialty: ['Neurosurgery','SpineSurgery','EndoscopicSpineSurgery'],
    address: { 
      '@type': 'PostalAddress', 
      streetAddress: 'Room No 317, OPD Block, Yashoda Hospital, Malakpet', 
      addressLocality: 'Hyderabad', 
      addressRegion: 'Telangana', 
      postalCode: '500036', 
      addressCountry: 'IN' 
    },
    areaServed: 'Hyderabad',
    telephone: '+91-9778280044',
    email: 'neurospinehyd@drsayuj.com',
    credential: 'MBBS, DNB Neurosurgery (Direct 6 years)',
    affiliation: {
      '@type': 'Organization',
      name: 'Yashoda Hospitals',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Malakpet',
        addressLocality: 'Hyderabad',
        addressRegion: 'Telangana',
        addressCountry: 'IN'
      }
    }
  }
  return <Script id="physician-jsonld" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
}

export function HospitalJsonLd() {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'Hospital',
    '@id': 'https://www.drsayuj.info/#hospital',
    name: 'Yashoda Hospitals - Malakpet',
    url: 'https://www.yashodahospitals.com',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Malakpet',
      addressLocality: 'Hyderabad',
      addressRegion: 'Telangana',
      postalCode: '500036',
      addressCountry: 'IN'
    },
    telephone: '+91-40-45674567',
    medicalSpecialty: ['Neurosurgery', 'Spine Surgery', 'General Medicine'],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Neurosurgical Services',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'MedicalProcedure',
            name: 'Endoscopic Spine Surgery'
          }
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'MedicalProcedure',
            name: 'Brain Tumor Surgery'
          }
        }
      ]
    }
  }
  return <Script id="hospital-jsonld" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
}

