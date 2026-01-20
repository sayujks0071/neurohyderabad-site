import { getLocationById, LocationData, CANONICAL_PHYSICIAN_NAME, CANONICAL_TELEPHONE } from '@/src/data/locations';

const malakpet = getLocationById('malakpet');

// Fallback to ensure TS safety if 'malakpet' id changes (unlikely)
const fallback: LocationData = {
  id: "malakpet",
  name: "Dr Sayuj Krishnan - Neurosurgeon in Malakpet",
  canonical_display_name: CANONICAL_PHYSICIAN_NAME,
  slug: "neurosurgeon-malakpet",
  address: {
      streetAddress: "Room No 317, OPD Block, Yashoda Hospital, Nalgonda X Roads, Malakpet",
      addressLocality: "Hyderabad",
      addressRegion: "Telangana",
      postalCode: "500036",
      addressCountry: "IN",
  },
  telephone: CANONICAL_TELEPHONE,
  whatsapp: "919778280044",
  directions_url: "https://maps.google.com/?q=Yashoda+Hospitals+Malakpet+Hyderabad",
  google_maps_place_url: "https://www.google.com/maps/place/Dr+Sayuj+Krishnan",
  embed_url: "",
  geo: {
      latitude: 17.3750,
      longitude: 78.5147,
  },
  areaServedName: "Malakpet",
  top_services_slugs: [],
  top_conditions_slugs: []
};

const location = malakpet || fallback;

export const CLINIC = {
  name: location.name,
  opdrm: 'Room 317, OPD Block', // Keep as specific detail, matches address
  phone: location.telephone,
  phoneHuman: location.telephone.replace('+91', '+91 '),
  email: 'hellodr@drsayuj.info',
  addr: `${location.address.streetAddress}, ${location.address.addressLocality}, ${location.address.addressRegion} ${location.address.postalCode}`,
  street: location.address.streetAddress,
  locality: location.address.addressLocality,
  city: location.address.addressLocality,
  region: location.address.addressRegion,
  postalCode: location.address.postalCode,
  country: location.address.addressCountry,
  site: 'https://www.drsayuj.info',
  geo: { lat: location.geo?.latitude || 17.3750, lng: location.geo?.longitude || 78.5147 },
};
