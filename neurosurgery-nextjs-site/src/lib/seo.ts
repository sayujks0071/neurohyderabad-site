// Canonical host (enforced via middleware)
export const SITE_URL = "https://www.drsayuj.com";
export const CONTACT_EMAIL = process.env.NEXT_PUBLIC_CONTACT_EMAIL || "neurospinehyd@drsayuj.com";

// Helper: Build stable @id values for entities on a page
export function idFor(canonical: string, fragment: string) {
  // Always ensure canonical has trailing slash in callers if needed
  return `${canonical}#${fragment}`;
}
export const CONTACT_PHONE = "+91 9778280044";

interface ServiceJsonLdProps {
  name: string;
  description: string;
  url?: string;
  areaServed?: string;
  provider?: {
    "@id"?: string;
    name?: string;
    url?: string;
    sameAs?: string[];
    medicalSpecialty?: string[];
  };
  id?: string;
}

export function serviceJsonLd({ 
  name, 
  description, 
  url,
  areaServed = "Hyderabad, Telangana, India",
  provider = {
    name: "Dr Sayuj Krishnan",
    url: SITE_URL,
    sameAs: [
      "https://g.co/kgs/9366939683880052414",
      "https://www.google.com/maps/place/Dr+Sayuj+Krishnan",
      "https://www.yashodahospitals.com/doctor/dr-sayuj-krishnan/"
    ],
    medicalSpecialty: ["Neurosurgery", "Brain Surgery", "Spine Surgery"]
  },
  id
}: ServiceJsonLdProps) {
  const obj: any = {
    "@context": "https://schema.org",
    "@type": "MedicalService",
    name,
    description
  };
  if (url) obj.url = url;
  if (areaServed) obj.areaServed = {
    "@type": "Place",
    "name": areaServed
  };
  if (provider) obj.provider = {
    "@type": "Physician",
    ...provider
  };
  obj.audience = {
    "@type": "Patient"
  };
  if (id) obj["@id"] = id;
  return obj;
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
  id?: string;
}

export function contactPointJsonLd({
  phone = CONTACT_PHONE,
  contactType = "customer support",
  areaServed = "Hyderabad, Telangana, India",
  languages = ["en", "hi", "te"],
  id
}: ContactPointJsonLdProps = {}) {
  const obj: any = {
    "@context": "https://schema.org",
    "@type": "ContactPoint",
    telephone: phone,
    contactType,
    areaServed: {
      "@type": "Place",
      "name": areaServed
    },
    availableLanguage: languages
  };
  if (id) obj["@id"] = id;
  return obj;
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
  id?: string;
}

export function webPageJsonLd({
  name,
  description,
  url,
  datePublished,
  dateModified,
  mainEntity,
  about,
  mentions,
  id
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
  if (id) base["@id"] = id;
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
  logo: `${SITE_URL}/images/logo.png`,
  image: `${SITE_URL}/images/logo.png`,
  url: SITE_URL,
  sameAs: [
    "https://g.co/kgs/9366939683880052414",
    "https://www.google.com/maps/place/Dr+Sayuj+Krishnan",
    "https://www.yashodahospitals.com/doctor/dr-sayuj-krishnan/"
  ]
};

// Physician JSON-LD
export function physicianJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Physician",
    name: "Dr Sayuj Krishnan",
    url: SITE_URL,
    medicalSpecialty: ["Neurosurgery", "Brain Surgery", "Spine Surgery"],
    address: {
      "@type": "PostalAddress",
      streetAddress: "Room No 317, OPD Block, Yashoda Hospital, Malakpet",
      addressLocality: "Hyderabad",
      addressRegion: "Telangana",
      addressCountry: "IN"
    },
    telephone: CONTACT_PHONE,
    email: CONTACT_EMAIL
  };
}

// Breadcrumb JSON-LD
export function breadcrumbJsonLd(items: Array<{ name: string; url: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url
    }))
  };
}

// Condition JSON-LD
export function conditionJsonLd(name: string, alternateName?: string) {
  return {
    "@context": "https://schema.org",
    "@type": "MedicalCondition",
    name,
    ...(alternateName && { alternateName })
  };
}

// Procedure JSON-LD
export function procedureJsonLd({
  name,
  description,
  bodyLocation,
  preparation,
  procedureType,
  id
}: {
  name: string;
  description?: string;
  bodyLocation?: string;
  preparation?: string;
  procedureType?: string;
  id?: string;
}) {
  const obj: any = {
    "@context": "https://schema.org",
    "@type": "MedicalProcedure",
    name
  };
  if (description) obj.description = description;
  if (bodyLocation) obj.bodyLocation = bodyLocation;
  if (preparation) obj.preparation = preparation;
  if (procedureType) obj.procedureType = procedureType;
  if (id) obj["@id"] = id;
  return obj;
}
