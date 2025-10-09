import tracker from '@middleware.io/agent-apm-nextjs';

export class APMLogger {
  static info(message: string, data?: any) {
    if (typeof window === 'undefined') {
      // Server-side logging
      tracker.info(message, data);
    } else {
      // Client-side logging - send to API
      fetch('/api/apm-logs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ level: 'info', message, data })
      }).catch(console.error);
    }
  }

  static warn(message: string, data?: any) {
    if (typeof window === 'undefined') {
      tracker.warn(message, data);
    } else {
      fetch('/api/apm-logs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ level: 'warn', message, data })
      }).catch(console.error);
    }
  }

  static error(message: string, data?: any) {
    if (typeof window === 'undefined') {
      tracker.error(message, data);
    } else {
      fetch('/api/apm-logs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ level: 'error', message, data })
      }).catch(console.error);
    }
  }

  static trackEvent(eventName: string, properties?: any) {
    this.info(`Event: ${eventName}`, properties);
  }

  static trackPageView(page: string, properties?: any) {
    this.info(`Page View: ${page}`, properties);
  }

  static trackUserAction(action: string, properties?: any) {
    this.info(`User Action: ${action}`, properties);
  }
}

// Export default instance for convenience
export default APMLogger;

