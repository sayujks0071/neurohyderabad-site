/**
 * UTM Link Generator for multi-channel campaigns
 * Creates trackable links from service pages for GBP, social, and messaging
 */

export interface UTMParameters {
  source: string;
  medium: string;
  campaign: string;
  content?: string;
  term?: string;
}

export type UTMChannel = 'gbp' | 'instagram' | 'youtube' | 'linkedin' | 'whatsapp';

export const UTM_CHANNELS: UTMChannel[] = ['gbp', 'instagram', 'youtube', 'linkedin', 'whatsapp'];

export interface ChannelUTMConfig extends UTMParameters {}

export interface ServiceUTMConfig {
  serviceName: string;
  serviceSlug: string;
  campaign: string;
  channels: Record<UTMChannel, ChannelUTMConfig>;
}

export interface ServiceUTMLinkBundle {
  serviceName: string;
  serviceSlug: string;
  canonicalUrl: string;
  campaign: string;
  links: Record<UTMChannel, string>;
}

export interface CommonUTMLinks {
  appointments: string;
  contact: string;
  about: string;
}

export interface AllServiceUTMLinks {
  services: ServiceUTMLinkBundle[];
  common: CommonUTMLinks;
}

// Service pages configuration with UTM parameters across channels
export const SERVICE_UTM_CONFIGS: ServiceUTMConfig[] = [
  {
    serviceName: 'Endoscopic Spine Surgery',
    serviceSlug: 'endoscopic-spine-surgery',
    campaign: 'endoscopic_spine_surgery',
    channels: {
      gbp: { source: 'google', medium: 'organic', campaign: 'gbp_endoscopic_spine_surgery' },
      instagram: { source: 'instagram', medium: 'social', campaign: 'bio_endoscopic_spine_surgery' },
      youtube: { source: 'youtube', medium: 'social', campaign: 'video_endoscopic_spine_surgery' },
      linkedin: { source: 'linkedin', medium: 'social', campaign: 'profile_endoscopic_spine_surgery' },
      whatsapp: { source: 'whatsapp', medium: 'direct', campaign: 'chat_endoscopic_spine_surgery' }
    }
  },
  {
    serviceName: 'Cervical Spine Surgery',
    serviceSlug: 'cervical-spine-surgery',
    campaign: 'cervical_spine_surgery',
    channels: {
      gbp: { source: 'google', medium: 'organic', campaign: 'gbp_cervical_spine_surgery' },
      instagram: { source: 'instagram', medium: 'social', campaign: 'bio_cervical_spine_surgery' },
      youtube: { source: 'youtube', medium: 'social', campaign: 'video_cervical_spine_surgery' },
      linkedin: { source: 'linkedin', medium: 'social', campaign: 'profile_cervical_spine_surgery' },
      whatsapp: { source: 'whatsapp', medium: 'direct', campaign: 'chat_cervical_spine_surgery' }
    }
  },
  {
    serviceName: 'Lumbar Disc Surgery',
    serviceSlug: 'lumbar-disc-surgery',
    campaign: 'lumbar_disc_surgery',
    channels: {
      gbp: { source: 'google', medium: 'organic', campaign: 'gbp_lumbar_disc_surgery' },
      instagram: { source: 'instagram', medium: 'social', campaign: 'bio_lumbar_disc_surgery' },
      youtube: { source: 'youtube', medium: 'social', campaign: 'video_lumbar_disc_surgery' },
      linkedin: { source: 'linkedin', medium: 'social', campaign: 'profile_lumbar_disc_surgery' },
      whatsapp: { source: 'whatsapp', medium: 'direct', campaign: 'chat_lumbar_disc_surgery' }
    }
  },
  {
    serviceName: 'Brain Tumor Surgery',
    serviceSlug: 'brain-tumor-surgery',
    campaign: 'brain_tumor_surgery',
    channels: {
      gbp: { source: 'google', medium: 'organic', campaign: 'gbp_brain_tumor_surgery' },
      instagram: { source: 'instagram', medium: 'social', campaign: 'bio_brain_tumor_surgery' },
      youtube: { source: 'youtube', medium: 'social', campaign: 'video_brain_tumor_surgery' },
      linkedin: { source: 'linkedin', medium: 'social', campaign: 'profile_brain_tumor_surgery' },
      whatsapp: { source: 'whatsapp', medium: 'direct', campaign: 'chat_brain_tumor_surgery' }
    }
  },
  {
    serviceName: 'Minimally Invasive Spine Surgery',
    serviceSlug: 'minimally-invasive-spine-surgery',
    campaign: 'minimally_invasive_spine_surgery',
    channels: {
      gbp: { source: 'google', medium: 'organic', campaign: 'gbp_minimally_invasive_spine_surgery' },
      instagram: { source: 'instagram', medium: 'social', campaign: 'bio_minimally_invasive_spine_surgery' },
      youtube: { source: 'youtube', medium: 'social', campaign: 'video_minimally_invasive_spine_surgery' },
      linkedin: { source: 'linkedin', medium: 'social', campaign: 'profile_minimally_invasive_spine_surgery' },
      whatsapp: { source: 'whatsapp', medium: 'direct', campaign: 'chat_minimally_invasive_spine_surgery' }
    }
  },
  {
    serviceName: 'Sciatica & Slip Disc Treatment',
    serviceSlug: 'sciatica-slip-disc-treatment',
    campaign: 'sciatica_slip_disc',
    channels: {
      gbp: { source: 'google', medium: 'organic', campaign: 'gbp_sciatica_slip_disc' },
      instagram: { source: 'instagram', medium: 'social', campaign: 'bio_sciatica_slip_disc' },
      youtube: { source: 'youtube', medium: 'social', campaign: 'video_sciatica_slip_disc' },
      linkedin: { source: 'linkedin', medium: 'social', campaign: 'profile_sciatica_slip_disc' },
      whatsapp: { source: 'whatsapp', medium: 'direct', campaign: 'chat_sciatica_slip_disc' }
    }
  }
];

// Base URL for the website
const BASE_URL = 'https://www.drsayuj.info';

/**
 * Generate UTM link for a specific service
 */
export function generateServiceUTMLink(
  serviceSlug: string,
  channel: UTMChannel = 'gbp'
): string {
  const config = SERVICE_UTM_CONFIGS.find(c => c.serviceSlug === serviceSlug);
  
  if (!config) {
    throw new Error(`Service configuration not found for slug: ${serviceSlug}`);
  }

  const utmParams = config.channels[channel];

  if (!utmParams) {
    throw new Error(`UTM configuration not found for channel "${channel}" on slug: ${serviceSlug}`);
  }

  return generateCustomUTMLink(`${BASE_URL}/services/${config.serviceSlug}`, utmParams);
}

/**
 * Generate UTM link for appointment booking
 */
export function generateAppointmentUTMLink(
  source: string = 'google',
  medium: string = 'business_profile',
  campaign: string = 'appointment_booking',
  content?: string
): string {
  const url = new URL(`${BASE_URL}/appointments`);
  
  url.searchParams.set('utm_source', source);
  url.searchParams.set('utm_medium', medium);
  url.searchParams.set('utm_campaign', campaign);
  
  if (content) {
    url.searchParams.set('utm_content', content);
  }

  return url.toString();
}

/**
 * Generate UTM link for contact page
 */
export function generateContactUTMLink(
  source: string = 'google',
  medium: string = 'business_profile',
  campaign: string = 'contact_inquiry',
  content?: string
): string {
  const url = new URL(`${BASE_URL}/contact`);
  
  url.searchParams.set('utm_source', source);
  url.searchParams.set('utm_medium', medium);
  url.searchParams.set('utm_campaign', campaign);
  
  if (content) {
    url.searchParams.set('utm_content', content);
  }

  return url.toString();
}

/**
 * Generate UTM link for about page
 */
export function generateAboutUTMLink(
  source: string = 'google',
  medium: string = 'business_profile',
  campaign: string = 'about_doctor',
  content?: string
): string {
  const url = new URL(`${BASE_URL}/about`);
  
  url.searchParams.set('utm_source', source);
  url.searchParams.set('utm_medium', medium);
  url.searchParams.set('utm_campaign', campaign);
  
  if (content) {
    url.searchParams.set('utm_content', content);
  }

  return url.toString();
}

/**
 * Get all service UTM links grouped by channel
 */
export function getAllServiceUTMLinks(): AllServiceUTMLinks {
  const serviceLinks: ServiceUTMLinkBundle[] = SERVICE_UTM_CONFIGS.map(config => {
    const links = UTM_CHANNELS.reduce((acc, channel) => {
      acc[channel] = generateServiceUTMLink(config.serviceSlug, channel);
      return acc;
    }, {} as Record<UTMChannel, string>);

    return {
      serviceName: config.serviceName,
      serviceSlug: config.serviceSlug,
      canonicalUrl: `${BASE_URL}/services/${config.serviceSlug}`,
      campaign: config.campaign,
      links
    };
  });

  return {
    services: serviceLinks,
    common: {
      appointments: generateAppointmentUTMLink(),
      contact: generateContactUTMLink(),
      about: generateAboutUTMLink()
    }
  };
}

/**
 * Generate UTM link for specific service with custom parameters
 */
export function generateCustomUTMLink(
  baseUrl: string,
  utmParams: UTMParameters
): string {
  const url = new URL(baseUrl);
  
  Object.entries(utmParams).forEach(([key, value]) => {
    if (value) {
      url.searchParams.set(`utm_${key}`, value);
    }
  });

  return url.toString();
}
