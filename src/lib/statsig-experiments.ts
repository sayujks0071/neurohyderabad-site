// Statsig Experiments Configuration for SEO and Conversion Optimization
export const STATSIG_EXPERIMENTS = {
  // Hero CTA Copy Experiment
  exp_hero_cta_copy: {
    name: "Hero CTA Copy Optimization",
    description: "Test different CTA copy variations on the hero section",
    variants: {
      control: {
        name: "Book Consultation",
        description: "Original CTA text"
      },
      variant_a: {
        name: "Get Expert Opinion",
        description: "More consultative approach"
      },
      variant_b: {
        name: "Schedule Free Consultation",
        description: "Emphasizes free consultation"
      },
      variant_c: {
        name: "Book Your Appointment",
        description: "Direct appointment booking"
      }
    },
    kpis: ["cta_click_rate", "appointment_conversion", "time_on_page"],
    guardrails: ["bounce_rate", "page_load_time"],
    target_audience: "all_visitors",
    duration_days: 30
  },

  // Sticky CTA Mobile Experiment
  exp_sticky_cta_mobile: {
    name: "Sticky CTA Mobile Optimization",
    description: "Test sticky CTA bar on mobile devices",
    variants: {
      control: {
        name: "No Sticky CTA",
        description: "Original mobile experience"
      },
      variant_a: {
        name: "Sticky CTA Bottom",
        description: "Sticky CTA at bottom of screen"
      },
      variant_b: {
        name: "Sticky CTA Top",
        description: "Sticky CTA at top after scroll"
      }
    },
    kpis: ["mobile_cta_click_rate", "mobile_conversion", "scroll_depth"],
    guardrails: ["mobile_bounce_rate", "user_experience_score"],
    target_audience: "mobile_visitors",
    duration_days: 21
  },

  // Social Proof Band Experiment
  exp_social_proof_band: {
    name: "Social Proof Band Optimization",
    description: "Test different social proof elements",
    variants: {
      control: {
        name: "No Social Proof",
        description: "Original layout without social proof"
      },
      variant_a: {
        name: "Patient Testimonials",
        description: "Show patient testimonials"
      },
      variant_b: {
        name: "Success Statistics",
        description: "Show success rates and numbers"
      },
      variant_c: {
        name: "Awards & Certifications",
        description: "Show awards and certifications"
      }
    },
    kpis: ["trust_indicators_engagement", "conversion_rate", "time_on_page"],
    guardrails: ["page_load_time", "content_engagement"],
    target_audience: "all_visitors",
    duration_days: 28
  },

  // Insurance Band Experiment
  exp_insurance_band: {
    name: "Insurance Information Band",
    description: "Test insurance information display",
    variants: {
      control: {
        name: "No Insurance Info",
        description: "Original layout"
      },
      variant_a: {
        name: "Insurance Accepted Banner",
        description: "Show insurance acceptance"
      },
      variant_b: {
        name: "Payment Options Banner",
        description: "Show payment options"
      }
    },
    kpis: ["insurance_inquiry_rate", "conversion_rate", "contact_form_submissions"],
    guardrails: ["page_load_time", "user_experience"],
    target_audience: "all_visitors",
    duration_days: 21
  },

  // Form Length Experiment
  exp_form_length: {
    name: "Appointment Form Length",
    description: "Test different form lengths for appointment booking",
    variants: {
      control: {
        name: "Full Form",
        description: "Complete appointment form"
      },
      variant_a: {
        name: "Minimal Form",
        description: "Name, phone, and preferred time only"
      },
      variant_b: {
        name: "Progressive Form",
        description: "Multi-step form with progress indicator"
      }
    },
    kpis: ["form_completion_rate", "appointment_bookings", "form_abandonment"],
    guardrails: ["form_error_rate", "user_satisfaction"],
    target_audience: "form_visitors",
    duration_days: 35
  },

  // H1 Phrasing Experiment
  exp_h1_phrasing: {
    name: "H1 Phrasing Optimization",
    description: "Test different H1 tag variations",
    variants: {
      control: {
        name: "Best Neurosurgeon in Hyderabad",
        description: "Original H1"
      },
      variant_a: {
        name: "Leading Neurosurgeon in Hyderabad",
        description: "Leading instead of Best"
      },
      variant_b: {
        name: "Expert Neurosurgeon in Hyderabad",
        description: "Expert instead of Best"
      },
      variant_c: {
        name: "Top Neurosurgeon in Hyderabad",
        description: "Top instead of Best"
      }
    },
    kpis: ["seo_ranking_improvement", "organic_traffic", "click_through_rate"],
    guardrails: ["brand_consistency", "user_engagement"],
    target_audience: "organic_visitors",
    duration_days: 45
  },

  // FAQ Display Experiment
  exp_faq_display: {
    name: "FAQ Display Optimization",
    description: "Test different FAQ presentation styles",
    variants: {
      control: {
        name: "Collapsible FAQs",
        description: "Original collapsible design"
      },
      variant_a: {
        name: "Expanded FAQs",
        description: "All FAQs expanded by default"
      },
      variant_b: {
        name: "FAQ Cards",
        description: "Card-based FAQ layout"
      }
    },
    kpis: ["faq_engagement", "time_on_page", "scroll_depth"],
    guardrails: ["page_load_time", "mobile_usability"],
    target_audience: "all_visitors",
    duration_days: 21
  },

  // Navigation Labels Experiment
  exp_nav_labels: {
    name: "Navigation Labels Optimization",
    description: "Test different navigation label variations",
    variants: {
      control: {
        name: "Services, Conditions, Appointments",
        description: "Original navigation labels"
      },
      variant_a: {
        name: "Treatments, Conditions, Book Now",
        description: "More action-oriented labels"
      },
      variant_b: {
        name: "Procedures, Disorders, Contact",
        description: "More medical terminology"
      }
    },
    kpis: ["navigation_click_rate", "page_views", "conversion_rate"],
    guardrails: ["user_confusion", "bounce_rate"],
    target_audience: "all_visitors",
    duration_days: 28
  }
};

// Feature Gates Configuration
export const STATSIG_FEATURE_GATES = {
  fg_admin_experiments: {
    name: "Admin Experiments Access",
    description: "Enable admin access to experiment controls",
    enabled: false,
    target_audience: "admin_users"
  },
  fg_session_replay_enabled: {
    name: "Session Replay",
    description: "Enable session replay for user behavior analysis",
    enabled: true,
    target_audience: "all_visitors"
  },
  fg_sticky_cta: {
    name: "Sticky CTA",
    description: "Enable sticky CTA functionality",
    enabled: true,
    target_audience: "mobile_visitors"
  },
  fg_advanced_analytics: {
    name: "Advanced Analytics",
    description: "Enable advanced analytics tracking",
    enabled: true,
    target_audience: "all_visitors"
  },
  fg_seo_optimization: {
    name: "SEO Optimization",
    description: "Enable SEO optimization features",
    enabled: true,
    target_audience: "all_visitors"
  }
};

// Experiment Helper Functions
export const experimentHelpers = {
  // Get experiment variant for a user
  getExperimentVariant: (experimentName: string, userId: string) => {
    // This would integrate with Statsig SDK
    // For now, return a mock implementation
    const experiments = STATSIG_EXPERIMENTS as any;
    if (experiments[experimentName]) {
      const variants = Object.keys(experiments[experimentName].variants);
      const hash = userId.split('').reduce((a, b) => {
        a = ((a << 5) - a) + b.charCodeAt(0);
        return a & a;
      }, 0);
      return variants[Math.abs(hash) % variants.length];
    }
    return 'control';
  },

  // Check if feature gate is enabled
  isFeatureGateEnabled: (gateName: string, userId: string) => {
    const gates = STATSIG_FEATURE_GATES as any;
    if (gates[gateName]) {
      return gates[gateName].enabled;
    }
    return false;
  },

  // Track experiment exposure
  trackExperimentExposure: (experimentName: string, variant: string, userId: string) => {
    // This would send data to Statsig
    console.log(`Experiment exposure: ${experimentName} - ${variant} for user ${userId}`);
  },

  // Track experiment conversion
  trackExperimentConversion: (experimentName: string, variant: string, conversionType: string, userId: string) => {
    // This would send conversion data to Statsig
    console.log(`Experiment conversion: ${experimentName} - ${variant} - ${conversionType} for user ${userId}`);
  }
};
