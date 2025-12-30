// Statsig experiment configuration for medical site
export const STATSIG_EXPERIMENTS = {
  // Test 1: Hero CTA variants
  hero_cta_test: {
    name: 'Hero CTA Test',
    description: 'Testing different CTA copy and styles on hero sections',
    variants: {
      control: 'Book Consultation',
      book_appointment_today: 'Book Appointment Today',
      talk_to_neurosurgeon: 'Talk to a Neurosurgeon'
    },
    kpis: ['Hero_CTA_Click', 'Appointment_Start', 'Appointment_Success', 'Phone_Click'],
    guardrails: ['bounce_rate', 'LCP', 'INP']
  },

  // Test 2: Sticky bottom CTA bar
  sticky_cta_test: {
    name: 'Sticky CTA Test',
    description: 'Testing sticky bottom CTA bar on mobile devices',
    variants: {
      control: false,
      treatment: true
    },
    kpis: ['Sticky_CTA_Click', 'Appointment_Start', 'Appointment_Success', 'Phone_Click'],
    guardrails: ['CLS', 'INP', 'scroll_depth']
  },

  // Test 3: Social proof near hero
  social_proof_test: {
    name: 'Social Proof Test',
    description: 'Testing trust badges and review snippets near hero',
    variants: {
      control: false,
      treatment: true
    },
    kpis: ['Hero_CTA_Click', 'Appointment_Start', 'Appointment_Success'],
    guardrails: ['LCP', 'CLS']
  },

  // Test 4: Insurance accepted band
  insurance_band_test: {
    name: 'Insurance Band Test',
    description: 'Testing insurance acceptance messaging on procedure pages',
    variants: {
      control: false,
      treatment: true
    },
    kpis: ['Appointment_Start', 'Appointment_Success', 'time_on_page'],
    guardrails: ['bounce_rate', 'LCP']
  },

  // Test 5: Form length and layout (to be implemented)
  form_layout_test: {
    name: 'Form Layout Test',
    description: 'Testing full form vs 2-step form layout',
    variants: {
      control: 'full_form',
      two_step: 'two_step_form'
    },
    kpis: ['Appointment_Submit', 'form_dropoff_step'],
    guardrails: ['error_rate', 'rage_clicks']
  },

  // Test 6: H1 phrasing for local intent
  local_h1_test: {
    name: 'Local H1 Test',
    description: 'Testing H1 phrasing for local SEO intent',
    variants: {
      control: 'default',
      hyderabad_early: 'hyderabad_early',
      hyderabad_later: 'hyderabad_later'
    },
    kpis: ['organic_ctr', 'time_on_page', 'Appointment_Start'],
    guardrails: ['bounce_rate']
  },

  // Test 7: FAQ display
  faq_display_test: {
    name: 'FAQ Display Test',
    description: 'Testing FAQ expansion behavior',
    variants: {
      control: 'all_collapsed',
      first_three_expanded: 'first_three_expanded'
    },
    kpis: ['scroll_depth', 'CTA_Click', 'Appointment_Start'],
    guardrails: ['CLS']
  },

  // Test 8: Nav label
  nav_label_test: {
    name: 'Nav Label Test',
    description: 'Testing navigation CTA labels',
    variants: {
      control: 'appointments',
      book_consultation: 'book_consultation'
    },
    kpis: ['Nav_CTA_Click', 'Appointment_Start'],
    guardrails: ['pages_per_session']
  }
};

// Event taxonomy for tracking
export const EVENT_TAXONOMY = {
  // Core funnel events
  Page_View: {
    description: 'Page view tracking with context',
    props: ['page_type', 'page_slug', 'service', 'condition', 'device', 'source_medium', 'experiment_variant']
  },
  Hero_CTA_Click: {
    description: 'Hero section CTA clicks',
    props: ['page_slug', 'cta_label', 'device', 'service', 'condition', 'experiment_variant']
  },
  Sticky_CTA_Click: {
    description: 'Sticky bottom CTA clicks',
    props: ['page_slug', 'cta_label', 'device']
  },
  Nav_CTA_Click: {
    description: 'Navigation CTA clicks',
    props: ['page_slug', 'cta_label', 'device']
  },
  Appointment_Start: {
    description: 'Appointment form interaction start',
    props: ['page_slug', 'service', 'condition', 'device', 'insurance_flag', 'location_hint']
  },
  Appointment_Submit: {
    description: 'Appointment form submission attempt',
    props: ['page_slug', 'form_errors_count', 'device']
  },
  Appointment_Success: {
    description: 'Successful appointment booking',
    props: ['page_slug', 'device', 'service', 'condition']
  },

  // Assist events
  Phone_Click: {
    description: 'Phone number clicks',
    props: ['page_slug', 'phone_type', 'device']
  },
  WhatsApp_Click: {
    description: 'WhatsApp link clicks',
    props: ['page_slug', 'device']
  },
  Directions_Click: {
    description: 'Directions link clicks',
    props: ['page_slug', 'device']
  },
  Form_Error: {
    description: 'Form validation errors',
    props: ['page_slug', 'field_name', 'error_type', 'device']
  },
  FAQ_Toggle: {
    description: 'FAQ expansion/collapse',
    props: ['page_slug', 'faq_id', 'opened', 'device']
  },
  Core_Web_Vitals: {
    description: 'Core Web Vitals metrics',
    props: ['metric_name', 'metric_id', 'page_slug', 'value']
  },
  Scroll_Depth: {
    description: 'Page scroll depth tracking',
    props: ['page_slug', 'device', 'depth_percentage']
  }
};

// Dashboard configurations
export const DASHBOARD_CONFIGS = {
  conversion_dashboard: {
    name: 'Conversion Dashboard',
    description: 'Primary conversion funnel and CTA performance',
    metrics: [
      'Appointment_Start_rate',
      'Appointment_Success_rate',
      'Hero_CTA_Click_rate',
      'Sticky_CTA_Click_rate',
      'Nav_CTA_Click_rate',
      'Phone_Click_count',
      'WhatsApp_Click_count'
    ],
    segments: ['device', 'page_type', 'service', 'traffic_source', 'city_locale'],
    experiments: ['hero_cta_test', 'sticky_cta_test', 'social_proof_test', 'nav_label_test']
  },

  seo_cwv_dashboard: {
    name: 'SEO & Core Web Vitals Dashboard',
    description: 'SEO performance and Core Web Vitals monitoring',
    metrics: [
      'LCP_distribution',
      'INP_distribution',
      'CLS_distribution',
      'organic_entry_pages',
      'organic_conversion_rates',
      'scroll_depth_quartiles'
    ],
    segments: ['page_group', 'device', 'traffic_source'],
    experiments: ['local_h1_test', 'faq_display_test', 'social_proof_test']
  },

  local_behavior_dashboard: {
    name: 'Local Behavior Dashboard',
    description: 'Local SEO and location-based behavior',
    metrics: [
      'Directions_Click_count',
      'Phone_Click_by_location',
      'Appointment_Success_by_location',
      'weekday_hourly_heatmap'
    ],
    segments: ['location', 'service', 'device', 'time_of_day'],
    experiments: ['insurance_band_test', 'local_h1_test']
  }
};

// Privacy and compliance settings
export const PRIVACY_CONFIG = {
  session_replay: {
    enabled: true,
    retention_days: 14,
    mask_selectors: [
      'input[type="email"]',
      'input[type="tel"]',
      'input[name*="phone"]',
      'input[name*="email"]',
      'input[name*="name"]',
      'input[name*="address"]',
      'textarea[name*="message"]',
      'textarea[name*="details"]',
      '.sensitive-data',
      '[data-sensitive="true"]'
    ],
    disable_on_pages: ['/appointments/confirm', '/appointments/success']
  },
  
  consent: {
    required: true,
    opt_out_available: true,
    consent_storage_key: 'analytics-consent',
    consent_banner_enabled: true
  },
  
  data_retention: {
    events_retention_days: 90,
    user_data_retention_days: 30,
    session_data_retention_days: 14
  }
};
