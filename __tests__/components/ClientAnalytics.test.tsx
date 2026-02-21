import { analytics } from '../../app/_components/ClientAnalytics';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

describe('ClientAnalytics', () => {
  let originalWindow: any;

  beforeEach(() => {
    // Save original window and mock Middleware
    originalWindow = global.window;
    global.window = {
      ...originalWindow,
      Middleware: {
        track: vi.fn(),
      },
    } as any;
  });

  afterEach(() => {
    // Restore window
    global.window = originalWindow;
    vi.restoreAllMocks();
  });

  it('should track appointmentSubmit event correctly', () => {
    analytics.appointmentSubmit('test-page', 'test-source', 2);

    expect((window as any).Middleware.track).toHaveBeenCalledWith('Appointment_Submit', {
      page_slug: 'test-page',
      source: 'test-source',
      form_errors_count: 2,
    });
  });

  it('should track appointmentSuccess event correctly', () => {
    analytics.appointmentSuccess('test-page', 'test-source', 'Spine Surgery', { cost: 500 });

    expect((window as any).Middleware.track).toHaveBeenCalledWith('Appointment_Success', {
      page_slug: 'test-page',
      source: 'test-source',
      service_or_condition: 'Spine Surgery',
      cost: 500,
    });
  });

  it('should track formError event correctly', () => {
    analytics.formError('contact-form', 'Email is invalid');

    expect((window as any).Middleware.track).toHaveBeenCalledWith('Form_Error', {
      form_name: 'contact-form',
      error_message: 'Email is invalid',
    });
  });

  it('should track apiError event correctly', () => {
    analytics.apiError('/api/test', 500, 'Internal Server Error');

    expect((window as any).Middleware.track).toHaveBeenCalledWith('API_Error', {
      endpoint: '/api/test',
      status_code: 500,
      error_message: 'Internal Server Error',
    });
  });

  it('should not throw if Middleware is not defined', () => {
    // Remove Middleware from window
    delete (window as any).Middleware;

    // Should not throw
    expect(() => {
      analytics.appointmentSubmit('test-page', 'test-source');
    }).not.toThrow();
  });
});
