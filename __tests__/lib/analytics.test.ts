// @vitest-environment jsdom
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { analytics } from '@/src/lib/analytics';
import { trackMiddlewareEvent } from '@/src/lib/middleware/rum';

// Mock dependencies
vi.mock('@/src/lib/middleware/rum', () => ({
  trackMiddlewareEvent: vi.fn(),
}));

// Mock localStorage
const localStorageMock = (function() {
  let store: Record<string, string> = {};
  return {
    getItem: function(key: string) {
      return store[key] || null;
    },
    setItem: function(key: string, value: string) {
      store[key] = value.toString();
    },
    clear: function() {
      store = {};
    },
    removeItem: function(key: string) {
      delete store[key];
    }
  };
})();
Object.defineProperty(window, 'localStorage', { value: localStorageMock });

describe('Analytics Helper', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    window.localStorage.setItem('analytics-consent', 'true');
  });

  it('should track appointment start', () => {
    analytics.appointmentStart('test-slug', 'consultation');

    expect(trackMiddlewareEvent).toHaveBeenCalledWith('Appointment_Start', expect.objectContaining({
      page_slug: 'test-slug',
      service_or_condition: 'consultation'
    }));
  });

  it('should track appointment step completion', () => {
    analytics.appointmentStepComplete('test-slug', 2, 'consultation');

    expect(trackMiddlewareEvent).toHaveBeenCalledWith('Appointment_Step_Complete', expect.objectContaining({
      page_slug: 'test-slug',
      step: 2,
      service_or_condition: 'consultation'
    }));
  });

  it('should track appointment success', () => {
    analytics.appointmentSuccess('test-slug', 'test-source', 'consultation');

    expect(trackMiddlewareEvent).toHaveBeenCalledWith('Appointment_Success', expect.objectContaining({
      page_slug: 'test-slug',
      source: 'test-source',
      service_or_condition: 'consultation'
    }));
  });

  it('should track form error', () => {
    analytics.formError('test-slug', 'test-field', 'required');

    expect(trackMiddlewareEvent).toHaveBeenCalledWith('Form_Error', expect.objectContaining({
      page_slug: 'test-slug',
      field_name: 'test-field',
      error_type: 'required'
    }));
  });

  it('should track chat events', () => {
    analytics.chat.open('test-source');
    expect(trackMiddlewareEvent).toHaveBeenCalledWith('chat_widget_open', expect.objectContaining({
      source: 'test-source'
    }));

    analytics.chat.messageSent('test-source');
    expect(trackMiddlewareEvent).toHaveBeenCalledWith('chat_message_sent', expect.objectContaining({
      source: 'test-source'
    }));

    analytics.chat.responseReceived('test-source', 100, true);
    expect(trackMiddlewareEvent).toHaveBeenCalledWith('chat_response_received', expect.objectContaining({
      source: 'test-source',
      duration_ms: 100,
      success: true
    }));

    analytics.chat.error('test-source', 200, 'test-error');
    expect(trackMiddlewareEvent).toHaveBeenCalledWith('chat_error', expect.objectContaining({
      source: 'test-source',
      duration_ms: 200,
      error_message: 'test-error'
    }));
  });
});
