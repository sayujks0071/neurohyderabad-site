import Script from 'next/script'
import {
  CANONICAL_TELEPHONE,
  YASHODA_MALAKPET_ADDRESS,
  CANONICAL_PHYSICIAN_NAME,
  SOCIAL_PROFILES
} from '@/src/data/locations'

export function OrgJsonLd() {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': 'https://www.drsayuj.info/#org',
    name: 'Dr. Sayuj Krishnan — Brain & Spine Surgeon',
    url: 'https://www.drsayuj.info',
    logo: 'https://www.drsayuj.info/images/logo.png',
    sameAs: SOCIAL_PROFILES,
    address: {
      '@type': 'PostalAddress',
      streetAddress: YASHODA_MALAKPET_ADDRESS.streetAddress,
      addressLocality: YASHODA_MALAKPET_ADDRESS.addressLocality,
      addressRegion: YASHODA_MALAKPET_ADDRESS.addressRegion,
      postalCode: YASHODA_MALAKPET_ADDRESS.postalCode,
      addressCountry: YASHODA_MALAKPET_ADDRESS.addressCountry
    },
    telephone: CANONICAL_TELEPHONE,
    email: 'hellodr@drsayuj.info'
  }
  return <Script id="org-jsonld" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
}

export function PhysicianJsonLd() {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'Physician',
    '@id': 'https://www.drsayuj.info/#physician',
    name: CANONICAL_PHYSICIAN_NAME,
    url: 'https://www.drsayuj.info',
    image: 'https://www.drsayuj.info/images/og-default.jpg',
    medicalSpecialty: ['Neurosurgery','SpineSurgery','EndoscopicSpineSurgery'],
    address: { 
      '@type': 'PostalAddress', 
      streetAddress: YASHODA_MALAKPET_ADDRESS.streetAddress,
      addressLocality: YASHODA_MALAKPET_ADDRESS.addressLocality,
      addressRegion: YASHODA_MALAKPET_ADDRESS.addressRegion,
      postalCode: YASHODA_MALAKPET_ADDRESS.postalCode,
      addressCountry: YASHODA_MALAKPET_ADDRESS.addressCountry
    },
    areaServed: 'Hyderabad',
    telephone: CANONICAL_TELEPHONE,
    email: 'hellodr@drsayuj.info',
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
