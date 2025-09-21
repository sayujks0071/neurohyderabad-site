// Canonical host (enforced via middleware)
export const SITE_URL = "https://www.drsayuj.com";
export const CONTACT_EMAIL = process.env.NEXT_PUBLIC_CONTACT_EMAIL || "contact@drsayujkrishnan.com";

// Helper: Build stable @id values for entities on a page
export function idFor(canonical: string, fragment: string) {
  // Always ensure canonical has trailing slash in callers if needed
  return `${canonical}#${fragment}`;
}
export const CONTACT_PHONE = "+91-98484-17094";

interface ServiceJsonLdProps {
  name: string;
  description: string;
  url: string;
  areaServed?: string[];
  provider?: {
    name: string;
    url: string;
    sameAs?: string[];
    medicalSpecialty?: string[];
  };
}

export function serviceJsonLd({ 
  name, 
  description, 
  url, 
  areaServed = ["Hyderabad", "Telangana", "India"],
  provider = {
    name: "Dr. Sayuj Krishnan",
    url: SITE_URL,
    sameAs: [
      "https://www.google.com/maps/place/Dr+Sayuj+Krishnan",
      "https://www.yashodahospitals.com/doctor/dr-sayuj-krishnan/"
    ],
    medicalSpecialty: ["Neurosurgery", "Brain Surgery", "Spine Surgery"]
  }
}: ServiceJsonLdProps) {
  return {
    "@context": "https://schema.org",
    "@type": "MedicalService",
    name,
    description,
    url,
    areaServed: areaServed.map(area => ({
      "@type": "State",
      name: area
    })),
    provider: {
      "@type": "Physician",
      name: provider.name,
      url: provider.url,
      sameAs: provider.sameAs,
      medicalSpecialty: provider.medicalSpecialty
    },
    audience: {
      "@type": "Patient"
    }
  };
}

interface MedicalGuidelineJsonLdProps {
  name: string;
  url: string;
  subject: {
    name: string;
    type: "MedicalCondition" | "MedicalProcedure";
  };
}

export function medicalGuidelineJsonLd({
  name,
  url,
  subject
}: MedicalGuidelineJsonLdProps) {
  return {
    "@context": "https://schema.org",
    "@type": "MedicalGuideline",
    name,
    url,
    guidelineSubject: {
      "@type": subject.type,
      name: subject.name
    }
  };
}

interface ContactPointJsonLdProps {
  phone?: string;
  contactType?: string;
  areaServed?: string;
  languages?: string[];
}

export function contactPointJsonLd({
  phone = CONTACT_PHONE,
  contactType = "customer support",
  areaServed = "IN",
  languages = ["en", "hi", "te"]
}: ContactPointJsonLdProps = {}) {
  return {
    "@context": "https://schema.org",
    "@type": "ContactPoint",
    telephone: phone,
    contactType,
    areaServed,
    availableLanguage: languages
  };
}

interface WebPageJsonLdProps {
  name: string;
  description?: string;
  url: string;
  datePublished?: string; // ISO
  dateModified?: string;  // ISO
  mainEntity?: any;       // Primary MedicalProcedure/MedicalCondition/Service JSON-LD
  about?: any;
  mentions?: any;
}

export function webPageJsonLd({
  name,
  description,
  url,
  datePublished,
  dateModified,
  mainEntity,
  about,
  mentions
}: WebPageJsonLdProps) {
  const base: any = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name,
    url
  };
  if (description) base.description = description;
  if (datePublished) base.datePublished = datePublished;
  if (dateModified) base.dateModified = dateModified;
  if (mainEntity) base.mainEntity = mainEntity;
  if (about) base.about = about;
  if (mentions) base.mentions = mentions;
  return base;
}

interface ItemListJsonLdProps {
  name?: string;
  items: Array<{
    name: string;
    url: string;
    description?: string;
  }>;
  id?: string;
  order?: "ItemListOrderAscending" | "ItemListOrderDescending" | "ItemListUnordered";
}

export function itemListJsonLd({ name, items, id, order }: ItemListJsonLdProps) {
  const obj: any = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    ...(name ? { name } : {}),
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "WebPage",
        name: item.name,
        url: item.url,
        ...(item.description && { description: item.description })
      }
    }))
  };
  if (id) obj["@id"] = id;
  if (order) obj.itemListOrder = `https://schema.org/${order}`;
  else obj.itemListOrder = "https://schema.org/ItemListOrderAscending";
  return obj;
}

export const ORGANIZATION_LOGO = {
  "@context": "https://schema.org",
  "@type": "Organization",
  logo: `${SITE_URL}/images/logo-512x512.png`,
  image: `${SITE_URL}/images/logo-512x512.png`,
  url: SITE_URL,
  sameAs: [
    "https://www.google.com/maps/place/Dr+Sayuj+Krishnan",
    "https://www.yashodahospitals.com/doctor/dr-sayuj-krishnan/"
  ]
};