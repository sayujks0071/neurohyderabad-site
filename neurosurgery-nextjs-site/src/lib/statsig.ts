import { Statsig } from 'statsig-react';

// Privacy-safe event tracking for medical site
export interface StatsigEvent {
  eventName: string;
  value?: number;
  metadata?: Record<string, string | number | boolean>;
}

// Core funnel events
export const trackPageView = (pageType: string, pageSlug: string, service?: string, condition?: string) => {
  const event: StatsigEvent = {
    eventName: 'Page_View',
    metadata: {
      page_type: pageType,
      page_slug: pageSlug,
      device: typeof window !== 'undefined' ? (window.innerWidth < 768 ? 'mobile' : 'desktop') : 'unknown',
      ...(service && { service }),
      ...(condition && { condition }),
    }
  };
  
  if (typeof window !== 'undefined') {
    Statsig.logEvent(event.eventName, event.value, event.metadata);
  }
};

export const trackHeroCTAClick = (pageSlug: string, ctaLabel: string, service?: string, condition?: string) => {
  const event: StatsigEvent = {
    eventName: 'Hero_CTA_Click',
    metadata: {
      page_slug: pageSlug,
      cta_label: ctaLabel,
      device: typeof window !== 'undefined' ? (window.innerWidth < 768 ? 'mobile' : 'desktop') : 'unknown',
      ...(service && { service }),
      ...(condition && { condition }),
    }
  };
  
  if (typeof window !== 'undefined') {
    Statsig.logEvent(event.eventName, event.value, event.metadata);
  }
};

export const trackStickyCTAClick = (pageSlug: string, ctaLabel: string) => {
  const event: StatsigEvent = {
    eventName: 'Sticky_CTA_Click',
    metadata: {
      page_slug: pageSlug,
      cta_label: ctaLabel,
      device: typeof window !== 'undefined' ? (window.innerWidth < 768 ? 'mobile' : 'desktop') : 'unknown',
    }
  };
  
  if (typeof window !== 'undefined') {
    Statsig.logEvent(event.eventName, event.value, event.metadata);
  }
};

export const trackNavCTAClick = (pageSlug: string, ctaLabel: string) => {
  const event: StatsigEvent = {
    eventName: 'Nav_CTA_Click',
    metadata: {
      page_slug: pageSlug,
      cta_label: ctaLabel,
      device: typeof window !== 'undefined' ? (window.innerWidth < 768 ? 'mobile' : 'desktop') : 'unknown',
    }
  };
  
  if (typeof window !== 'undefined') {
    Statsig.logEvent(event.eventName, event.value, event.metadata);
  }
};

export const trackAppointmentStart = (pageSlug: string, service?: string, condition?: string, insuranceFlag?: boolean, locationHint?: string) => {
  const event: StatsigEvent = {
    eventName: 'Appointment_Start',
    metadata: {
      page_slug: pageSlug,
      device: typeof window !== 'undefined' ? (window.innerWidth < 768 ? 'mobile' : 'desktop') : 'unknown',
      ...(service && { service }),
      ...(condition && { condition }),
      ...(insuranceFlag !== undefined && { insurance_flag: insuranceFlag }),
      ...(locationHint && { location_hint: locationHint }),
    }
  };
  
  if (typeof window !== 'undefined') {
    Statsig.logEvent(event.eventName, event.value, event.metadata);
  }
};

export const trackAppointmentSubmit = (pageSlug: string, formErrorsCount: number = 0) => {
  const event: StatsigEvent = {
    eventName: 'Appointment_Submit',
    metadata: {
      page_slug: pageSlug,
      form_errors_count: formErrorsCount,
      device: typeof window !== 'undefined' ? (window.innerWidth < 768 ? 'mobile' : 'desktop') : 'unknown',
    }
  };
  
  if (typeof window !== 'undefined') {
    Statsig.logEvent(event.eventName, event.value, event.metadata);
  }
};

export const trackAppointmentSuccess = (pageSlug: string, service?: string, condition?: string) => {
  const event: StatsigEvent = {
    eventName: 'Appointment_Success',
    metadata: {
      page_slug: pageSlug,
      device: typeof window !== 'undefined' ? (window.innerWidth < 768 ? 'mobile' : 'desktop') : 'unknown',
      ...(service && { service }),
      ...(condition && { condition }),
    }
  };
  
  if (typeof window !== 'undefined') {
    Statsig.logEvent(event.eventName, event.value, event.metadata);
  }
};

// Assist events
export const trackPhoneClick = (pageSlug: string, phoneType: 'main' | 'whatsapp' | 'emergency') => {
  const event: StatsigEvent = {
    eventName: 'Phone_Click',
    metadata: {
      page_slug: pageSlug,
      phone_type: phoneType,
      device: typeof window !== 'undefined' ? (window.innerWidth < 768 ? 'mobile' : 'desktop') : 'unknown',
    }
  };
  
  if (typeof window !== 'undefined') {
    Statsig.logEvent(event.eventName, event.value, event.metadata);
  }
};

export const trackWhatsAppClick = (pageSlug: string) => {
  const event: StatsigEvent = {
    eventName: 'WhatsApp_Click',
    metadata: {
      page_slug: pageSlug,
      device: typeof window !== 'undefined' ? (window.innerWidth < 768 ? 'mobile' : 'desktop') : 'unknown',
    }
  };
  
  if (typeof window !== 'undefined') {
    Statsig.logEvent(event.eventName, event.value, event.metadata);
  }
};

export const trackDirectionsClick = (pageSlug: string) => {
  const event: StatsigEvent = {
    eventName: 'Directions_Click',
    metadata: {
      page_slug: pageSlug,
      device: typeof window !== 'undefined' ? (window.innerWidth < 768 ? 'mobile' : 'desktop') : 'unknown',
    }
  };
  
  if (typeof window !== 'undefined') {
    Statsig.logEvent(event.eventName, event.value, event.metadata);
  }
};

export const trackFormError = (pageSlug: string, fieldName: string, errorType: string) => {
  // Mask sensitive field names for privacy
  const maskedFieldName = ['email', 'phone', 'name', 'address'].includes(fieldName.toLowerCase()) 
    ? 'masked_field' 
    : fieldName;
    
  const event: StatsigEvent = {
    eventName: 'Form_Error',
    metadata: {
      page_slug: pageSlug,
      field_name: maskedFieldName,
      error_type: errorType,
      device: typeof window !== 'undefined' ? (window.innerWidth < 768 ? 'mobile' : 'desktop') : 'unknown',
    }
  };
  
  if (typeof window !== 'undefined') {
    Statsig.logEvent(event.eventName, event.value, event.metadata);
  }
};

export const trackFAQToggle = (pageSlug: string, faqId: string, opened: boolean) => {
  const event: StatsigEvent = {
    eventName: 'FAQ_Toggle',
    metadata: {
      page_slug: pageSlug,
      faq_id: faqId,
      opened: opened,
      device: typeof window !== 'undefined' ? (window.innerWidth < 768 ? 'mobile' : 'desktop') : 'unknown',
    }
  };
  
  if (typeof window !== 'undefined') {
    Statsig.logEvent(event.eventName, event.value, event.metadata);
  }
};

// Core Web Vitals tracking
export const trackCoreWebVitals = (metric: { name: string; value: number; id: string }) => {
  const event: StatsigEvent = {
    eventName: 'Core_Web_Vitals',
    value: metric.value,
    metadata: {
      metric_name: metric.name,
      metric_id: metric.id,
      page_slug: typeof window !== 'undefined' ? window.location.pathname : 'unknown',
    }
  };
  
  if (typeof window !== 'undefined') {
    Statsig.logEvent(event.eventName, event.value, event.metadata);
  }
};

// Scroll depth tracking
export const trackScrollDepth = (pageSlug: string, depth: number) => {
  const event: StatsigEvent = {
    eventName: 'Scroll_Depth',
    value: depth,
    metadata: {
      page_slug: pageSlug,
      device: typeof window !== 'undefined' ? (window.innerWidth < 768 ? 'mobile' : 'desktop') : 'unknown',
    }
  };
  
  if (typeof window !== 'undefined') {
    Statsig.logEvent(event.eventName, event.value, event.metadata);
  }
};