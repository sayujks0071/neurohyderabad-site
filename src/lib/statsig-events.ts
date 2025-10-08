import { useStatsigClient } from '@statsig/react-bindings';

// Statsig event logging utility for medical practice
export const useStatsigEvents = () => {
  const client = useStatsigClient();

  const logEvent = (eventName: string, properties?: Record<string, any>) => {
    if (client && typeof client.logEvent === 'function') {
      try {
        // Use the client's logEvent method with proper typing
        (client as any).logEvent(eventName, properties || {});
        console.log(`📊 Statsig Event: ${eventName}`, properties);
      } catch (error) {
        console.warn('Error logging Statsig event:', error);
      }
    } else {
      console.warn('Statsig client not available');
    }
  };

  return {
    // Medical practice specific events
    logAppointmentBooking: (source: string, service?: string) => {
      logEvent('appointment_booking', {
        source,
        service,
        timestamp: new Date().toISOString(),
        page: typeof window !== 'undefined' ? window.location.pathname : '',
        user_agent: typeof window !== 'undefined' ? window.navigator.userAgent : '',
      });
    },

    logServiceInquiry: (service: string, method: string) => {
      logEvent('service_inquiry', {
        service,
        method,
        timestamp: new Date().toISOString(),
        page: typeof window !== 'undefined' ? window.location.pathname : '',
      });
    },

    logContactFormSubmit: (formType: string, success: boolean) => {
      logEvent('contact_form_submit', {
        form_type: formType,
        success,
        timestamp: new Date().toISOString(),
        page: typeof window !== 'undefined' ? window.location.pathname : '',
      });
    },

    logPhoneCallClick: (phoneNumber: string, source: string) => {
      logEvent('phone_call_click', {
        phone_number: phoneNumber,
        source,
        timestamp: new Date().toISOString(),
        page: typeof window !== 'undefined' ? window.location.pathname : '',
      });
    },

    logLocationPageView: (location: string) => {
      logEvent('location_page_view', {
        location,
        timestamp: new Date().toISOString(),
        page: typeof window !== 'undefined' ? window.location.pathname : '',
      });
    },

    // Generic event logger
    logEvent,
  };
};

// Non-hook version for use outside React components
export const logStatsigEvent = (eventName: string, properties?: Record<string, any>) => {
  if (typeof window !== 'undefined' && (window as any).statsig) {
    (window as any).statsig.logEvent(eventName, properties || {});
    console.log(`📊 Statsig Event: ${eventName}`, properties);
  } else {
    console.warn('Statsig not available for event logging');
  }
};
