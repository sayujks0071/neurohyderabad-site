/**
 * Middleware RUM Helper
 *
 * Provides safe access to the Middleware RUM agent for tracking custom events.
 */

export const trackMiddlewareEvent = (event: string, attributes?: Record<string, any>) => {
  if (typeof window !== 'undefined' && (window as any).Middleware) {
    try {
      // Middleware RUM agent track method
      // Note: This assumes the agent supports .track(event, attributes)
      // If the agent API is different, this might need adjustment.
      (window as any).Middleware.track(event, attributes);
    } catch (e) {
      console.warn('Failed to track Middleware event:', e);
    }
  }
};
