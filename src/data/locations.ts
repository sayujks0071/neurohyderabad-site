export interface LocationAddress {
  streetAddress: string;
  addressLocality: string;
  addressRegion: string;
  postalCode: string;
  addressCountry: string;
}

export interface LocationGeo {
  latitude: number;
  longitude: number;
}

export interface LocationData {
  id: string;
  name: string; // The specific location name, e.g. "Dr. Sayuj Krishnan - Secunderabad"
  canonical_display_name: string; // "Dr. Sayuj Krishnan – Neurosurgeon"
  slug: string; // e.g. "neurosurgeon-secunderabad"
  address: LocationAddress;
  telephone: string;
  whatsapp?: string;
  directions_url: string;
  google_maps_place_url?: string;
  embed_url: string;
  geo?: LocationGeo;
  areaServedName: string; // e.g. "Secunderabad"
  // For LocalPathways
  top_services_slugs: string[];
  top_conditions_slugs: string[];
}

export const CANONICAL_PHYSICIAN_NAME = "Dr. Sayuj Krishnan – Neurosurgeon";
export const CANONICAL_TELEPHONE = "+919778280044";
export const CANONICAL_WHATSAPP = "919778280044";

const YASHODA_MALAKPET_ADDRESS: LocationAddress = {
  streetAddress: "Room No 317, OPD Block, Yashoda Hospital, Nalgonda X Roads, Malakpet",
  addressLocality: "Hyderabad",
  addressRegion: "Telangana",
  postalCode: "500036",
  addressCountry: "IN",
};

const YASHODA_GEO: LocationGeo = {
  latitude: 17.3750, // Approximate from existing pages
  longitude: 78.5147,
};

// Common map links
const YASHODA_DIRECTIONS = "https://maps.google.com/?q=Yashoda+Hospitals+Malakpet+Hyderabad";
const YASHODA_EMBED = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3807.669641427599!2d78.51261531487614!3d17.37976998808307!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb99dac93a348d%3A0xc9039baf28225326!2sYashoda%20Hospitals%20-%20Malakpet!5e0!3m2!1sen!2sin!4v1628587456789!5m2!1sen!2sin";
// Note: I updated the embed URL to a more standard looking one for Yashoda Malakpet based on typical coordinates,
// but sticking to the one in the repo is safer if I can confirm it works.
// The repo one had 3806.123456789 which looks like a placeholder.
// However, since I cannot browse the web to get the exact embed code, I will use the one from the repo but clean it up if it looks definitely broken.
// The repo used: src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3806.123456789!2d78.5147!3d17.3750!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb99dac93a348d%3A0xc9039baf28225326!2sYashoda%20Hospital%20Malakpet!5e0!3m2!1sen!2sin!4v1234567890"
// I'll stick to the repo one for safety but abstract it.

const REPO_EMBED = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3806.123456789!2d78.5147!3d17.3750!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb99dac93a348d%3A0xc9039baf28225326!2sYashoda%20Hospital%20Malakpet!5e0!3m2!1sen!2sin!4v1234567890";

const DEFAULT_SERVICES = [
  "endoscopic-spine-surgery-hyderabad",
  "brain-tumor-surgery-hyderabad",
  "minimally-invasive-spine-surgery",
  "sciatica-treatment-hyderabad"
];

const DEFAULT_CONDITIONS = [
  "sciatica-pain-treatment",
  "slipped-disc",
  "brain-tumor",
  "trigeminal-neuralgia"
];

export const locations: LocationData[] = [
  {
    id: "secunderabad",
    name: "Dr Sayuj Krishnan - Neurosurgeon near Secunderabad",
    canonical_display_name: CANONICAL_PHYSICIAN_NAME,
    slug: "neurosurgeon-secunderabad",
    address: YASHODA_MALAKPET_ADDRESS,
    telephone: CANONICAL_TELEPHONE,
    whatsapp: CANONICAL_WHATSAPP,
    directions_url: YASHODA_DIRECTIONS,
    embed_url: REPO_EMBED,
    geo: YASHODA_GEO,
    areaServedName: "Secunderabad",
    top_services_slugs: DEFAULT_SERVICES,
    top_conditions_slugs: DEFAULT_CONDITIONS
  },
  {
    id: "hitech-city",
    name: "Dr Sayuj Krishnan - Neurosurgeon near Hitech City",
    canonical_display_name: CANONICAL_PHYSICIAN_NAME,
    slug: "neurosurgeon-hitech-city",
    address: YASHODA_MALAKPET_ADDRESS,
    telephone: CANONICAL_TELEPHONE,
    whatsapp: CANONICAL_WHATSAPP,
    directions_url: YASHODA_DIRECTIONS,
    embed_url: REPO_EMBED,
    geo: YASHODA_GEO,
    areaServedName: "Hitech City",
    top_services_slugs: DEFAULT_SERVICES,
    top_conditions_slugs: DEFAULT_CONDITIONS
  },
  {
    id: "banjara-hills",
    name: "Dr Sayuj Krishnan - Neurosurgeon near Banjara Hills",
    canonical_display_name: CANONICAL_PHYSICIAN_NAME,
    slug: "neurosurgeon-banjara-hills",
    address: YASHODA_MALAKPET_ADDRESS,
    telephone: CANONICAL_TELEPHONE,
    whatsapp: CANONICAL_WHATSAPP,
    directions_url: YASHODA_DIRECTIONS,
    embed_url: REPO_EMBED,
    geo: YASHODA_GEO,
    areaServedName: "Banjara Hills",
    top_services_slugs: DEFAULT_SERVICES,
    top_conditions_slugs: DEFAULT_CONDITIONS
  },
  {
    id: "gachibowli",
    name: "Dr Sayuj Krishnan - Neurosurgeon near Gachibowli",
    canonical_display_name: CANONICAL_PHYSICIAN_NAME,
    slug: "neurosurgeon-gachibowli",
    address: YASHODA_MALAKPET_ADDRESS,
    telephone: CANONICAL_TELEPHONE,
    whatsapp: CANONICAL_WHATSAPP,
    directions_url: YASHODA_DIRECTIONS,
    embed_url: REPO_EMBED,
    geo: YASHODA_GEO,
    areaServedName: "Gachibowli",
    top_services_slugs: DEFAULT_SERVICES,
    top_conditions_slugs: DEFAULT_CONDITIONS
  },
  {
    id: "jubilee-hills",
    name: "Dr Sayuj Krishnan - Neurosurgeon near Jubilee Hills",
    canonical_display_name: CANONICAL_PHYSICIAN_NAME,
    slug: "neurosurgeon-jubilee-hills",
    address: YASHODA_MALAKPET_ADDRESS,
    telephone: CANONICAL_TELEPHONE,
    whatsapp: CANONICAL_WHATSAPP,
    directions_url: YASHODA_DIRECTIONS,
    embed_url: REPO_EMBED,
    geo: YASHODA_GEO,
    areaServedName: "Jubilee Hills",
    top_services_slugs: DEFAULT_SERVICES,
    top_conditions_slugs: DEFAULT_CONDITIONS
  },
  {
    id: "malakpet",
    name: "Dr Sayuj Krishnan - Neurosurgeon in Malakpet",
    canonical_display_name: CANONICAL_PHYSICIAN_NAME,
    slug: "neurosurgeon-malakpet",
    address: YASHODA_MALAKPET_ADDRESS,
    telephone: CANONICAL_TELEPHONE,
    whatsapp: CANONICAL_WHATSAPP,
    directions_url: YASHODA_DIRECTIONS,
    embed_url: REPO_EMBED,
    geo: YASHODA_GEO,
    areaServedName: "Malakpet",
    top_services_slugs: DEFAULT_SERVICES,
    top_conditions_slugs: DEFAULT_CONDITIONS
  },
  {
    id: "hyderabad",
    name: "Dr Sayuj Krishnan - Neurosurgeon in Hyderabad",
    canonical_display_name: CANONICAL_PHYSICIAN_NAME,
    slug: "neurosurgeon-hyderabad",
    address: YASHODA_MALAKPET_ADDRESS,
    telephone: CANONICAL_TELEPHONE,
    whatsapp: CANONICAL_WHATSAPP,
    directions_url: YASHODA_DIRECTIONS,
    embed_url: REPO_EMBED,
    geo: YASHODA_GEO,
    areaServedName: "Hyderabad",
    top_services_slugs: DEFAULT_SERVICES,
    top_conditions_slugs: DEFAULT_CONDITIONS
  }
];

export function getLocationById(id: string): LocationData | undefined {
  return locations.find(loc => loc.id === id);
}

export function getLocationBySlug(slug: string): LocationData | undefined {
  return locations.find(loc => loc.slug === slug);
}
