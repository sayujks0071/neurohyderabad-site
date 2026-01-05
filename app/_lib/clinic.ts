import { getLocationById, LocationData } from '@/src/data/locations';

const malakpet = getLocationById('malakpet');

// Fallback to ensure TS safety if 'malakpet' id changes (unlikely)
const fallback: LocationData = {
  id: "malakpet",
  name: "Dr Sayuj Krishnan - Neurosurgeon in Malakpet",
  canonical_display_name: "Dr. Sayuj Krishnan – Neurosurgeon",
  slug: "neurosurgeon-malakpet",
  address: {
      streetAddress: "Room No 317, OPD Block, Yashoda Hospital, Nalgonda X Roads, Malakpet",
      addressLocality: "Hyderabad",
      addressRegion: "Telangana",
      postalCode: "500036",
      addressCountry: "IN",
  },
  telephone: "+919778280044",
  whatsapp: "919778280044",
  directions_url: "https://maps.google.com/?q=Yashoda+Hospitals+Malakpet+Hyderabad",
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
  name: location.name, // or location.canonical_display_name if preferred for "clinic" name? Usually "Dr Sayuj..." or "Yashoda Hospital..."
  // Previous implementation: 'Dr. Sayuj Krishnan | Yashoda Hospital, Malakpet, Hyderabad'
  // Let's keep it close to previous but using our data
  // location.name is "Dr Sayuj Krishnan - Neurosurgeon in Malakpet"
  opdrm: 'Room 317, OPD Block',
  phone: location.telephone, // "+919778280044"
  phoneHuman: location.telephone.replace('+91', '+91 '), // "+91 9778280044"
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
