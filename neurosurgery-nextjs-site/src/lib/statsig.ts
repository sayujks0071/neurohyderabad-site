// Statsig Configuration and Analytics
export const STATSIG_CONFIG = {
  // Statsig client key (get from Statsig dashboard)
  clientKey: process.env.NEXT_PUBLIC_STATSIG_CLIENT_KEY || 'client-6rsFaE0Of4SIMTVQ5J4l560K8ciY7v4wkWTXqPjD5RP',
  
  // User properties for medical practice
  userProperties: {
    medicalSpecialty: 'neurosurgery',
    location: 'hyderabad',
    practiceType: 'private'
  }
};

// Statsig event tracking for medical practice
export const trackStatsigEvent = (eventName: string, properties?: Record<string, any>) => {
  if (typeof window !== 'undefined' && window.statsig) {
    window.statsig.logEvent(eventName, properties);
  }
};

// Medical practice specific events
export const trackAppointmentBooking = (source: string, serviceType?: string) => {
  trackStatsigEvent('appointment_booking', {
    source,
    service_type: serviceType,
    timestamp: new Date().toISOString(),
    location: 'hyderabad'
  });
};

export const trackServiceInquiry = (serviceName: string, inquiryType: string) => {
  trackStatsigEvent('service_inquiry', {
    service_name: serviceName,
    inquiry_type: inquiryType,
    timestamp: new Date().toISOString(),
    location: 'hyderabad'
  });
};

export const trackPageView = (pagePath: string, pageTitle: string) => {
  trackStatsigEvent('page_view', {
    page_path: pagePath,
    page_title: pageTitle,
    timestamp: new Date().toISOString(),
    location: 'hyderabad'
  });
};

export const trackContactForm = (formType: string, success: boolean) => {
  trackStatsigEvent('contact_form_submit', {
    form_type: formType,
    success,
    timestamp: new Date().toISOString(),
    location: 'hyderabad'
  });
};

export const trackPhoneCall = (phoneNumber: string) => {
  trackStatsigEvent('phone_call', {
    phone_number: phoneNumber,
    timestamp: new Date().toISOString(),
    location: 'hyderabad'
  });
};

export const trackEmailClick = (emailType: string) => {
  trackStatsigEvent('email_click', {
    email_type: emailType,
    timestamp: new Date().toISOString(),
    location: 'hyderabad'
  });
};

// Performance tracking
export const trackPerformance = (metric: string, value: number, unit: string) => {
  trackStatsigEvent('performance_metric', {
    metric_name: metric,
    metric_value: value,
    metric_unit: unit,
    timestamp: new Date().toISOString(),
    location: 'hyderabad'
  });
};

// Error tracking
export const trackError = (errorType: string, errorMessage: string, pagePath: string) => {
  trackStatsigEvent('error_occurred', {
    error_type: errorType,
    error_message: errorMessage,
    page_path: pagePath,
    timestamp: new Date().toISOString(),
    location: 'hyderabad'
  });
};

// User engagement tracking
export const trackEngagement = (action: string, element: string, duration?: number) => {
  trackStatsigEvent('user_engagement', {
    action,
    element,
    duration,
    timestamp: new Date().toISOString(),
    location: 'hyderabad'
  });
};

// A/B testing and feature flags
export const getFeatureFlag = (flagName: string): boolean => {
  if (typeof window !== 'undefined' && window.statsig) {
    return window.statsig.getFeatureFlag(flagName);
  }
  return false;
};

export const getExperiment = (experimentName: string) => {
  if (typeof window !== 'undefined' && window.statsig) {
    return window.statsig.getExperiment(experimentName);
  }
  return null;
};

// Extend window interface for TypeScript
declare global {
  interface Window {
    statsig: any;
  }
}
