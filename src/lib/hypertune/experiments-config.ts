export type CTAIntent = 'call' | 'whatsapp' | 'appointment';

export type CtaVariant = 'control' | 'teleconsult_first' | 'whatsapp_first';

export type StickyCtaVariant = 'control' | 'mri_review' | 'coordinator_first';

export type HypertuneFlags = {
  cta_variant: CtaVariant;
  sticky_cta_variant: StickyCtaVariant;
};

export const hypertuneFlagFallbacks: HypertuneFlags = {
  cta_variant: 'control',
  sticky_cta_variant: 'control',
};

export type CTAButtonConfig = {
  intent: CTAIntent;
  label: string;
  href: string;
  target?: string;
  rel?: string;
  ariaLabel?: string;
};

const CONTACT_PHONE = '+919778280044';

const BASE_BUTTONS: Record<CTAIntent, Omit<CTAButtonConfig, 'label'>> = {
  call: {
    intent: 'call',
    href: `tel:${CONTACT_PHONE}`,
    ariaLabel: 'Call OPD for appointment',
  },
  whatsapp: {
    intent: 'whatsapp',
    href: 'https://wa.me/919778280044',
    target: '_blank',
    rel: 'noopener noreferrer',
    ariaLabel: 'WhatsApp the care team',
  },
  appointment: {
    intent: 'appointment',
    href: '/appointments',
    ariaLabel: 'Book teleconsultation appointment',
  },
};

export type CtaExperimentConfig = {
  heroPrimary: CTAButtonConfig;
  heroSecondary: CTAButtonConfig;
  heroHelper?: string;
  heroKicker?: string;
  standardButtons: CTAButtonConfig[];
};

export const CTA_VARIANTS: Record<CtaVariant, CtaExperimentConfig> = {
  control: {
    heroPrimary: { ...BASE_BUTTONS.appointment, label: 'Book Consultation' },
    heroSecondary: {
      ...BASE_BUTTONS.call,
      label: 'Call +91 97782 80044',
    },
    heroHelper: 'Same-day slots at Yashoda Hospital or tele-consults.',
    heroKicker: 'Fast-track brain & spine consults',
    standardButtons: [
      { ...BASE_BUTTONS.call, label: 'Call OPD' },
      { ...BASE_BUTTONS.whatsapp, label: 'WhatsApp' },
      { ...BASE_BUTTONS.appointment, label: 'Book Tele-Consult' },
    ],
  },
  teleconsult_first: {
    heroPrimary: {
      ...BASE_BUTTONS.appointment,
      label: 'Schedule Tele-Consult',
    },
    heroSecondary: {
      ...BASE_BUTTONS.whatsapp,
      label: 'Share MRI on WhatsApp',
    },
    heroHelper: 'Remote review and scheduling within 20 minutes.',
    heroKicker: 'Share MRI for a tele-consult slot',
    standardButtons: [
      { ...BASE_BUTTONS.appointment, label: 'Schedule Tele-Consult' },
      { ...BASE_BUTTONS.whatsapp, label: 'Share MRI on WhatsApp' },
      { ...BASE_BUTTONS.call, label: 'Call OPD' },
    ],
  },
  whatsapp_first: {
    heroPrimary: { ...BASE_BUTTONS.whatsapp, label: 'Chat on WhatsApp' },
    heroSecondary: {
      ...BASE_BUTTONS.appointment,
      label: 'Book Consultation',
    },
    heroHelper: 'WhatsApp replies in under 10 minutes.',
    heroKicker: 'Talk to the surgical coordinator now',
    standardButtons: [
      { ...BASE_BUTTONS.whatsapp, label: 'WhatsApp Triage' },
      { ...BASE_BUTTONS.call, label: 'Call OPD' },
      { ...BASE_BUTTONS.appointment, label: 'Book Consultation' },
    ],
  },
};

export type StickyCtaConfig = {
  headline: string;
  subhead?: string;
  buttons: CTAButtonConfig[];
};

export const STICKY_CTA_VARIANTS: Record<StickyCtaVariant, StickyCtaConfig> = {
  control: {
    headline: 'Need immediate consultation?',
    subhead: 'Call or WhatsApp the care team for urgent appointments.',
    buttons: [
      { ...BASE_BUTTONS.call, label: 'Call OPD' },
      { ...BASE_BUTTONS.whatsapp, label: 'WhatsApp' },
      { ...BASE_BUTTONS.appointment, label: 'Book Tele-Consult' },
    ],
  },
  mri_review: {
    headline: 'Already have MRI or CT scans?',
    subhead: 'Share them for a 15-minute surgical review and same-day slot.',
    buttons: [
      { ...BASE_BUTTONS.whatsapp, label: 'Share MRI on WhatsApp' },
      { ...BASE_BUTTONS.appointment, label: 'Book Tele-Consult' },
      { ...BASE_BUTTONS.call, label: 'Call OPD' },
    ],
  },
  coordinator_first: {
    headline: 'Need the coordinator to arrange everything?',
    subhead: 'We can block OT slots, insurance, and follow-ups for you.',
    buttons: [
      { ...BASE_BUTTONS.call, label: 'Call Care Coordinator' },
      { ...BASE_BUTTONS.whatsapp, label: 'Message on WhatsApp' },
    ],
  },
};

export const HYPERTUNE_EXPERIMENT_KEYS = {
  cta: 'cta_variant',
  sticky: 'sticky_cta_variant',
} as const;
