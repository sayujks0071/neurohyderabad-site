const getStatsig = () => {
  if (typeof window === 'undefined') return null;
  const possibleClient = (window as any).Statsig || (window as any).statsig;
  return typeof possibleClient?.logEvent === 'function' ? possibleClient : null;
};

const logWithFallback = (eventName: string, properties?: Record<string, any>) => {
  try {
    const statsigClient = getStatsig();
    if (statsigClient) {
      statsigClient.logEvent(eventName, undefined, properties || {});
      if (process.env.NODE_ENV !== 'production') {
        console.log(`📊 Statsig Event: ${eventName}`, properties);
      }
    } else if (process.env.NODE_ENV !== 'production') {
      console.debug('Statsig client not available; skipping event:', eventName);
    }
  } catch (error) {
    console.warn('Error logging Statsig event:', error);
  }
};

// Statsig event logging utility for medical practice
export const useStatsigEvents = () => {
  const logEvent = (eventName: string, properties?: Record<string, any>) => {
    logWithFallback(eventName, properties);
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
  logWithFallback(eventName, properties);
};
