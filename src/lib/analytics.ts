// Centralized event tracking helper with privacy-safe instrumentation
import { trackMiddlewareEvent } from '@/src/lib/middleware/rum';
// import { Statsig } from '@statsig/js-client';

// Export GA4 measurement ID for GoogleAnalytics component
export const GA4_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID || 'G-BBTYBBDWMR';

// Event tracking interface
interface EventProps {
  page_type?: string;
  page_slug?: string;
  device?: 'mobile' | 'desktop' | 'tablet';
  service_or_condition?: string;
  experiment_variant?: string;
  [key: string]: string | number | boolean | undefined;
}

// Device detection helper
function getDevice(): 'mobile' | 'desktop' | 'tablet' {
  if (typeof window === 'undefined') return 'desktop';
  
  const width = window.innerWidth;
  if (width < 768) return 'mobile';
  if (width < 1024) return 'tablet';
  return 'desktop';
}

// Privacy-safe value masking
function maskSensitiveValue(value: string): string {
  const sensitivePatterns = [
    /email/i,
    /phone/i,
    /name/i,
    /address/i,
    /ssn/i,
    /credit/i,
    /card/i,
    /password/i
  ];
  
  for (const pattern of sensitivePatterns) {
    if (pattern.test(value)) {
      return 'masked_field';
    }
  }
  
  return value;
}

// Main tracking function
export function track(eventName: string, props: EventProps = {}) {
  // Only track if user has given consent
  const hasConsent = typeof window !== 'undefined' && 
    localStorage.getItem('analytics-consent') === 'true';
  
  if (!hasConsent) return;

  try {
    // Add default properties
    const enrichedProps: EventProps = {
      device: getDevice(),
      timestamp: Date.now(),
      ...props
    };

    // Mask sensitive values
    Object.keys(enrichedProps).forEach(key => {
      if (typeof enrichedProps[key] === 'string') {
        enrichedProps[key] = maskSensitiveValue(enrichedProps[key] as string);
      }
    });

    // Log to Statsig (when properly initialized)
    if (typeof window !== 'undefined' && (window as any).Statsig) {
      (window as any).Statsig.logEvent(eventName, undefined, enrichedProps);
    }

    // Log to Middleware RUM
    trackMiddlewareEvent(eventName, enrichedProps);
    
    // Log to GA4 (when available)
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', eventName, enrichedProps);
    }
    
    // Optional: Log to console in development
    if (process.env.NODE_ENV === 'development') {
      console.log('Analytics Event:', eventName, enrichedProps);
    }
  } catch (error) {
    console.error('Analytics tracking error:', error);
  }
}

// Convenience functions for common events
export const analytics = {
  // Generic track function
  track,
  
  // Core funnel events
  pageView: (pageSlug: string, pageType: string, serviceOrCondition?: string) => {
    track('Page_View', {
      page_slug: pageSlug,
      page_type: pageType,
      service_or_condition: serviceOrCondition
    });
  },

  heroCTAClick: (pageSlug: string, ctaLabel: string, serviceOrCondition?: string, experimentVariant?: string) => {
    track('Hero_CTA_Click', {
      page_slug: pageSlug,
      cta_label: ctaLabel,
      service_or_condition: serviceOrCondition,
      experiment_variant: experimentVariant
    });
  },

  stickyCTAClick: (pageSlug: string, ctaLabel: string, experimentVariant?: string) => {
    track('Sticky_CTA_Click', {
      page_slug: pageSlug,
      cta_label: ctaLabel,
      experiment_variant: experimentVariant
    });
  },

  navCTAClick: (pageSlug: string, ctaLabel: string) => {
    track('Nav_CTA_Click', {
      page_slug: pageSlug,
      cta_label: ctaLabel
    });
  },

  appointmentStart: (pageSlug: string, serviceOrCondition?: string) => {
    track('Appointment_Start', {
      page_slug: pageSlug,
      service_or_condition: serviceOrCondition
    });
  },

  appointmentSubmit: (pageSlug: string, errorCount: number = 0) => {
    track('Appointment_Submit', {
      page_slug: pageSlug,
      form_errors_count: errorCount
    });
  },

  appointmentSuccess: (pageSlug: string, serviceOrCondition?: string) => {
    track('Appointment_Success', {
      page_slug: pageSlug,
      service_or_condition: serviceOrCondition
    });
  },

  // Assist events
  phoneClick: (pageSlug: string, phoneType: 'main' | 'whatsapp' | 'emergency') => {
    track('Phone_Click', {
      page_slug: pageSlug,
      phone_type: phoneType
    });
  },

  whatsAppClick: (pageSlug: string) => {
    track('WhatsApp_Click', {
      page_slug: pageSlug
    });
  },

  directionsClick: (pageSlug: string) => {
    track('Directions_Click', {
      page_slug: pageSlug
    });
  },

  formError: (pageSlug: string, fieldName: string, errorType: string) => {
    track('Form_Error', {
      page_slug: pageSlug,
      field_name: maskSensitiveValue(fieldName),
      error_type: errorType
    });
  },

  formRageClicks: (pageSlug: string, clickCount: number) => {
    track('Form_Rage_Clicks', {
      page_slug: pageSlug,
      click_count: clickCount
    });
  },

  faqToggle: (pageSlug: string, faqId: string, opened: boolean) => {
    track('FAQ_Toggle', {
      page_slug: pageSlug,
      faq_id: faqId,
      opened: opened
    });
  },

  // Core Web Vitals
  coreWebVitals: (metricName: string, value: number, pageSlug: string) => {
    track('Core_Web_Vitals', {
      metric_name: metricName,
      metric_value: value,
      page_slug: pageSlug
    });
  },

  // Scroll depth
  scrollDepth: (pageSlug: string, depth: number) => {
    track('Scroll_Depth', {
      page_slug: pageSlug,
      depth_percentage: depth
    });
  },

  // Trust signal tracking
  trustSignalView: (pageSlug: string, signalType: string, serviceType?: string) => {
    track('Trust_Signal_View', {
      page_slug: pageSlug,
      trust_signal_type: signalType,
      service_type: serviceType
    });
  },

  trustSignalClick: (pageSlug: string, signalType: string, destination: string, serviceType?: string) => {
    track('Trust_Signal_Click', {
      page_slug: pageSlug,
      trust_signal_type: signalType,
      destination: destination,
      service_type: serviceType
    });
  },

  // Trust pathway funnel tracking
  trustPathwayStart: (pageSlug: string, entryPoint: string) => {
    track('Trust_Pathway_Start', {
      page_slug: pageSlug,
      entry_point: entryPoint
    });
  },

  trustPathwayComplete: (pageSlug: string, pathwayType: 'about' | 'patient_stories', timeSpent: number) => {
    track('Trust_Pathway_Complete', {
      page_slug: pageSlug,
      pathway_type: pathwayType,
      time_spent_seconds: timeSpent
    });
  },

  // Engagement events
  timeOnPage: (pageSlug: string, seconds: number) => {
    track('Time_On_Page', {
      page_slug: pageSlug,
      seconds: seconds
    });
  },

  exitIntent: (pageSlug: string, exitPoint: string) => {
    track('Exit_Intent', {
      page_slug: pageSlug,
      exit_point: exitPoint
    });
  }
};

// Experiment exposure tracking
export function trackExperimentExposure(experimentName: string, variant: string, pageSlug: string) {
  track('Experiment_Exposure', {
    experiment_name: experimentName,
    experiment_variant: variant,
    page_slug: pageSlug
  });
}

// Feature gate exposure tracking
export function trackFeatureGateExposure(gateName: string, enabled: boolean, pageSlug: string) {
  track('Feature_Gate_Exposure', {
    gate_name: gateName,
    gate_enabled: enabled,
    page_slug: pageSlug
  });
}
