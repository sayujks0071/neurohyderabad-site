// Google Analytics 4 Configuration
// Replace with your actual GA4 Measurement ID
export const GA4_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID || 'G-XXXXXXXXXX';

// Custom events for medical practice tracking
export const trackEvent = (eventName: string, parameters?: Record<string, any>) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, parameters);
  }
};

// Medical practice specific events
export const trackAppointmentBooking = (source: string) => {
  trackEvent('appointment_booking', {
    event_category: 'conversion',
    event_label: source,
    value: 1
  });
};

export const trackPageView = (pagePath: string, pageTitle: string) => {
  trackEvent('page_view', {
    page_path: pagePath,
    page_title: pageTitle
  });
};

export const trackServiceInquiry = (serviceName: string) => {
  trackEvent('service_inquiry', {
    event_category: 'engagement',
    event_label: serviceName
  });
};

export const trackContactForm = (formType: string) => {
  trackEvent('contact_form_submit', {
    event_category: 'conversion',
    event_label: formType
  });
};

// Core Web Vitals tracking
export const trackWebVitals = (metric: any) => {
  trackEvent('web_vitals', {
    event_category: 'performance',
    event_label: metric.name,
    value: Math.round(metric.value),
    non_interaction: true
  });
};
