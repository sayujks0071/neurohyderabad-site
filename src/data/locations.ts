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

/**
 * Single Source of Truth for Location Data
 * This file centralizes all NAP (Name, Address, Phone) and location-specific data.
 * It is used by LocationNAPCard, LocationSchema, and other components to ensure consistency.
 */
export interface LocationData {
  id: string;
  name: string; // The specific location name, e.g. "Dr. Sayuj Krishnan - Secunderabad"
  canonical_display_name: string; // "Dr. Sayuj Krishnan – Neurosurgeon"
  slug: string; // e.g. "neurosurgeon-secunderabad" or "locations/lb-nagar"
  address: LocationAddress;
  telephone: string;
  whatsapp?: string;
  directions_url: string;
  google_maps_place_url: string; // Canonical Google Maps URL
  embed_url: string; // Shared embed URL for Yashoda Malakpet as all locations are served from here
  geo?: LocationGeo;
  areaServedName: string; // e.g. "Secunderabad"
  // For LocalPathways
  top_services_slugs: string[];
  top_conditions_slugs: string[];
  sameAs?: string[];
}

export const CANONICAL_PHYSICIAN_NAME = "Dr. Sayuj Krishnan – Neurosurgeon";
export const CANONICAL_TELEPHONE = "+919778280044";
export const CANONICAL_WHATSAPP = "919778280044";

/**
 * Canonical Address for Local Citations (Google Maps, JustDial, etc.)
 * This address format must be maintained exactly across all external platforms
 * to ensure NAP (Name, Address, Phone) consistency for Local SEO.
 */
export const YASHODA_MALAKPET_ADDRESS: LocationAddress = {
  streetAddress: "Room No 317, OPD Block, Yashoda Hospital, Nalgonda X Roads, Malakpet",
  addressLocality: "Hyderabad",
  addressRegion: "Telangana",
  postalCode: "500036",
  addressCountry: "IN",
};

export const YASHODA_GEO: LocationGeo = {
  latitude: 17.3750,
  longitude: 78.5147,
};

// Common map links
export const YASHODA_DIRECTIONS = "https://maps.google.com/?q=Yashoda+Hospitals+Malakpet+Hyderabad";
export const CANONICAL_MAPS_URL = "https://www.google.com/maps/place/Dr+Sayuj+Krishnan";
// Using the embed URL found in the repo
export const REPO_EMBED = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3807.669641427599!2d78.51261531487614!3d17.37976998808307!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb99dac93a348d%3A0xc9039baf28225326!2sYashoda%20Hospitals%20-%20Malakpet!5e0!3m2!1sen!2sin!4v1628587456789!5m2!1sen!2sin";

export const SOCIAL_PROFILES = [
  "https://www.facebook.com/drsayujneurohyd",
  "https://www.instagram.com/drsayujneurohyd",
  "https://in.linkedin.com/in/drsayujkrishnan",
  "https://www.youtube.com/@drsayujneurohyd",
  "https://twitter.com/drsayuj",
  "https://www.google.com/maps?cid=14503792272825406246",
  "https://www.yashodahospitals.com/doctors/dr-sayuj-krishnan/",
  "https://www.google.com/search?q=Dr+Sayuj+Krishnan+Neurosurgeon+Hyderabad",
  "https://www.practo.com/hyderabad/doctor/dr-sayuj-krishnan-neurosurgeon"
];

const DEFAULT_SERVICES = [
  "endoscopic-spine-surgery-hyderabad",
  "brain-tumor-surgery-hyderabad",
  "minimally-invasive-spine-surgery",
  "endoscopic-discectomy-hyderabad"
];

const DEFAULT_CONDITIONS = [
  "sciatica-pain-treatment-hyderabad",
  "slip-disc-treatment-hyderabad",
  "brain-tumor-surgery-hyderabad",
  "trigeminal-neuralgia-treatment-hyderabad"
];

// Single Source of Truth for Location Data
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
    google_maps_place_url: CANONICAL_MAPS_URL,
    embed_url: REPO_EMBED,
    geo: YASHODA_GEO,
    areaServedName: "Secunderabad",
    top_services_slugs: DEFAULT_SERVICES,
    top_conditions_slugs: DEFAULT_CONDITIONS,
    sameAs: SOCIAL_PROFILES
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
    google_maps_place_url: CANONICAL_MAPS_URL,
    embed_url: REPO_EMBED,
    geo: YASHODA_GEO,
    areaServedName: "Hitech City",
    top_services_slugs: DEFAULT_SERVICES,
    top_conditions_slugs: DEFAULT_CONDITIONS,
    sameAs: SOCIAL_PROFILES
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
    google_maps_place_url: CANONICAL_MAPS_URL,
    embed_url: REPO_EMBED,
    geo: YASHODA_GEO,
    areaServedName: "Banjara Hills",
    top_services_slugs: DEFAULT_SERVICES,
    top_conditions_slugs: DEFAULT_CONDITIONS,
    sameAs: SOCIAL_PROFILES
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
    google_maps_place_url: CANONICAL_MAPS_URL,
    embed_url: REPO_EMBED,
    geo: YASHODA_GEO,
    areaServedName: "Gachibowli",
    top_services_slugs: DEFAULT_SERVICES,
    top_conditions_slugs: DEFAULT_CONDITIONS,
    sameAs: SOCIAL_PROFILES
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
    google_maps_place_url: CANONICAL_MAPS_URL,
    embed_url: REPO_EMBED,
    geo: YASHODA_GEO,
    areaServedName: "Jubilee Hills",
    top_services_slugs: DEFAULT_SERVICES,
    top_conditions_slugs: DEFAULT_CONDITIONS,
    sameAs: SOCIAL_PROFILES
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
    google_maps_place_url: CANONICAL_MAPS_URL,
    embed_url: REPO_EMBED,
    geo: YASHODA_GEO,
    areaServedName: "Malakpet",
    top_services_slugs: DEFAULT_SERVICES,
    top_conditions_slugs: DEFAULT_CONDITIONS,
    sameAs: SOCIAL_PROFILES
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
    google_maps_place_url: CANONICAL_MAPS_URL,
    embed_url: REPO_EMBED,
    geo: YASHODA_GEO,
    areaServedName: "Hyderabad",
    top_services_slugs: DEFAULT_SERVICES,
    top_conditions_slugs: DEFAULT_CONDITIONS,
    sameAs: SOCIAL_PROFILES
  },
  {
    id: "lb-nagar",
    name: "Dr Sayuj Krishnan - Neurosurgeon near LB Nagar",
    canonical_display_name: CANONICAL_PHYSICIAN_NAME,
    slug: "locations/lb-nagar",
    address: YASHODA_MALAKPET_ADDRESS,
    telephone: CANONICAL_TELEPHONE,
    whatsapp: CANONICAL_WHATSAPP,
    directions_url: YASHODA_DIRECTIONS,
    google_maps_place_url: CANONICAL_MAPS_URL,
    embed_url: REPO_EMBED,
    geo: YASHODA_GEO,
    areaServedName: "LB Nagar",
    top_services_slugs: DEFAULT_SERVICES,
    top_conditions_slugs: DEFAULT_CONDITIONS,
    sameAs: SOCIAL_PROFILES
  },
  {
    id: "kukatpally",
    name: "Dr Sayuj Krishnan - Neurosurgeon near Kukatpally",
    canonical_display_name: CANONICAL_PHYSICIAN_NAME,
    slug: "locations/neurosurgeon-kukatpally",
    address: YASHODA_MALAKPET_ADDRESS,
    telephone: CANONICAL_TELEPHONE,
    whatsapp: CANONICAL_WHATSAPP,
    directions_url: YASHODA_DIRECTIONS,
    google_maps_place_url: CANONICAL_MAPS_URL,
    embed_url: REPO_EMBED,
    geo: YASHODA_GEO,
    areaServedName: "Kukatpally",
    top_services_slugs: DEFAULT_SERVICES,
    top_conditions_slugs: DEFAULT_CONDITIONS,
    sameAs: SOCIAL_PROFILES
  },
  {
    id: "manikonda",
    name: "Dr Sayuj Krishnan - Neurosurgeon near Manikonda",
    canonical_display_name: CANONICAL_PHYSICIAN_NAME,
    slug: "locations/neurosurgeon-manikonda",
    address: YASHODA_MALAKPET_ADDRESS,
    telephone: CANONICAL_TELEPHONE,
    whatsapp: CANONICAL_WHATSAPP,
    directions_url: YASHODA_DIRECTIONS,
    google_maps_place_url: CANONICAL_MAPS_URL,
    embed_url: REPO_EMBED,
    geo: YASHODA_GEO,
    areaServedName: "Manikonda",
    top_services_slugs: DEFAULT_SERVICES,
    top_conditions_slugs: DEFAULT_CONDITIONS,
    sameAs: SOCIAL_PROFILES
  },
  {
    id: "nizampet",
    name: "Dr Sayuj Krishnan - Neurosurgeon near Nizampet",
    canonical_display_name: CANONICAL_PHYSICIAN_NAME,
    slug: "locations/neurosurgeon-nizampet",
    address: YASHODA_MALAKPET_ADDRESS,
    telephone: CANONICAL_TELEPHONE,
    whatsapp: CANONICAL_WHATSAPP,
    directions_url: YASHODA_DIRECTIONS,
    google_maps_place_url: CANONICAL_MAPS_URL,
    embed_url: REPO_EMBED,
    geo: YASHODA_GEO,
    areaServedName: "Nizampet",
    top_services_slugs: DEFAULT_SERVICES,
    top_conditions_slugs: DEFAULT_CONDITIONS,
    sameAs: SOCIAL_PROFILES
  },
  {
    id: "kondapur",
    name: "Dr Sayuj Krishnan - Neurosurgeon near Kondapur",
    canonical_display_name: CANONICAL_PHYSICIAN_NAME,
    slug: "locations/neurosurgeon-kondapur",
    address: YASHODA_MALAKPET_ADDRESS,
    telephone: CANONICAL_TELEPHONE,
    whatsapp: CANONICAL_WHATSAPP,
    directions_url: YASHODA_DIRECTIONS,
    google_maps_place_url: CANONICAL_MAPS_URL,
    embed_url: REPO_EMBED,
    geo: YASHODA_GEO,
    areaServedName: "Kondapur",
    top_services_slugs: DEFAULT_SERVICES,
    top_conditions_slugs: DEFAULT_CONDITIONS,
    sameAs: SOCIAL_PROFILES
  },
  {
    id: "kothapet",
    name: "Dr Sayuj Krishnan - Neurosurgeon near Kothapet",
    canonical_display_name: CANONICAL_PHYSICIAN_NAME,
    slug: "locations/neurosurgeon-kothapet",
    address: YASHODA_MALAKPET_ADDRESS,
    telephone: CANONICAL_TELEPHONE,
    whatsapp: CANONICAL_WHATSAPP,
    directions_url: YASHODA_DIRECTIONS,
    google_maps_place_url: CANONICAL_MAPS_URL,
    embed_url: REPO_EMBED,
    geo: YASHODA_GEO,
    areaServedName: "Kothapet",
    top_services_slugs: DEFAULT_SERVICES,
    top_conditions_slugs: DEFAULT_CONDITIONS,
    sameAs: SOCIAL_PROFILES
  },
  {
    id: "madhapur",
    name: "Dr Sayuj Krishnan - Neurosurgeon near Madhapur",
    canonical_display_name: CANONICAL_PHYSICIAN_NAME,
    slug: "locations/neurosurgeon-madhapur",
    address: YASHODA_MALAKPET_ADDRESS,
    telephone: CANONICAL_TELEPHONE,
    whatsapp: CANONICAL_WHATSAPP,
    directions_url: YASHODA_DIRECTIONS,
    google_maps_place_url: CANONICAL_MAPS_URL,
    embed_url: REPO_EMBED,
    geo: YASHODA_GEO,
    areaServedName: "Madhapur",
    top_services_slugs: DEFAULT_SERVICES,
    top_conditions_slugs: DEFAULT_CONDITIONS,
    sameAs: SOCIAL_PROFILES
  },
  {
    id: "dilsukhnagar",
    name: "Dr Sayuj Krishnan - Neurosurgeon in Dilsukhnagar",
    canonical_display_name: CANONICAL_PHYSICIAN_NAME,
    slug: "locations/neurosurgeon-dilsukhnagar",
    address: YASHODA_MALAKPET_ADDRESS,
    telephone: CANONICAL_TELEPHONE,
    whatsapp: CANONICAL_WHATSAPP,
    directions_url: YASHODA_DIRECTIONS,
    google_maps_place_url: CANONICAL_MAPS_URL,
    embed_url: REPO_EMBED,
    geo: YASHODA_GEO,
    areaServedName: "Dilsukhnagar",
    top_services_slugs: DEFAULT_SERVICES,
    top_conditions_slugs: DEFAULT_CONDITIONS,
    sameAs: SOCIAL_PROFILES
  }
];

export type LocationId =
  | "secunderabad"
  | "hitech-city"
  | "banjara-hills"
  | "gachibowli"
  | "jubilee-hills"
  | "malakpet"
  | "hyderabad"
  | "lb-nagar"
  | "kukatpally"
  | "manikonda"
  | "nizampet"
  | "kondapur"
  | "kothapet"
  | "madhapur"
  | "dilsukhnagar";

export function getLocationById(id: string): LocationData | undefined {
  return locations.find(loc => loc.id === id);
}

export function getLocationBySlug(slug: string): LocationData | undefined {
  return locations.find(loc => loc.slug === slug);
}
