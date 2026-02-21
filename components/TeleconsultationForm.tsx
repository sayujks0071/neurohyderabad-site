'use client';

import { useMemo, useState } from 'react';
import { analytics } from '@/src/lib/analytics';
import { trackContactConversion } from '../src/lib/google-ads-conversion';
import { APPOINTMENT_SUCCESS_MESSAGE } from '@/packages/appointment-form/constants';
import Button from "@/packages/appointment-form/ui/Button";

interface TeleconsultationFormProps {
  pageSlug: string;
  service?: string;
}

const REQUIRED_MESSAGE = 'This field is required';

type FormState = {
  name: string;
  phone: string;
  email: string;
  condition: string;
  message: string;
  painScore: number;
  mriScanAvailable: boolean;
};

const initialState: FormState = {
  name: '',
  phone: '',
  email: '',
  condition: '',
  message: '',
  painScore: 5,
  mriScanAvailable: false,
};

export default function TeleconsultationForm({ pageSlug, service }: TeleconsultationFormProps) {
  const [formState, setFormState] = useState<FormState>(initialState);
  const [errors, setErrors] = useState<Record<keyof FormState, string>>({
    name: '',
    phone: '',
    email: '',
    condition: '',
    message: '',
    painScore: '',
    mriScanAvailable: '',
  });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const subject = useMemo(() => {
    const base = service ? `${service} enquiry` : 'Appointment enquiry';
    return `${base} – ${formState.name || 'New patient'}`;
  }, [service, formState.name]);

  const mailtoHref = useMemo(() => {
    const params = new URLSearchParams({
      subject,
      body: `Page: ${pageSlug}\nName: ${formState.name}\nPhone: ${formState.phone}\nEmail: ${formState.email}\nCondition: ${formState.condition}\nPain Score: ${formState.painScore}/10\nMRI Available: ${formState.mriScanAvailable ? 'Yes' : 'No'}\nMessage: ${formState.message}`,
    });
    return `mailto:hellodr@drsayuj.info?${params.toString()}`;
  }, [formState, pageSlug, subject]);

  const handleChange = (field: keyof FormState) => (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    let value: string | number = event.target.value;
    if (field === 'painScore') {
      value = Number(value);
    }
    setFormState((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: '' }));
  };

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormState((prev) => ({ ...prev, mriScanAvailable: event.target.checked }));
  };

  const validate = () => {
    const newErrors: Record<keyof FormState, string> = { ...errors };
    let valid = true;

    (Object.keys(formState) as (keyof FormState)[]).forEach((key) => {
      // painScore and mriScanAvailable are always valid by type/default
      // email is optional
      if (key === 'painScore' || key === 'mriScanAvailable' || key === 'email') return;

      const value = formState[key];
      if (typeof value === 'string' && !value.trim()) {
        newErrors[key] = REQUIRED_MESSAGE;
        valid = false;
      }
    });

    if (formState.email && !/.+@.+\..+/.test(formState.email)) {
      newErrors.email = 'Enter a valid email address';
      valid = false;
    }

    if (formState.phone && !/^[+\d][\d\s-]{6,}$/.test(formState.phone)) {
      newErrors.phone = 'Enter a valid phone number';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!validate()) return;

    setStatus('submitting');

    try {
      // Log Analytics events (Middleware RUM + Statsig)
      analytics.appointmentSubmit(pageSlug, 'teleconsultation_form');
      analytics.appointmentSuccess(pageSlug, 'teleconsultation_form', service || 'general');
      
      // Track Google Ads conversion (will handle navigation if URL provided)
      const conversionTracked = trackContactConversion(mailtoHref);
      
      // If conversion function didn't handle navigation, navigate manually
      if (!conversionTracked) {
        window.location.href = mailtoHref;
      }
      
      setStatus('success');
      setFormState(initialState);
    } catch (error) {
      console.error(error);
      analytics.formError(pageSlug, 'teleconsultation_form', 'submission_error');
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div
        className="space-y-6 relative bg-white/70 backdrop-blur-lg border border-white/20 shadow-xl rounded-2xl p-8 text-center animate-in fade-in zoom-in-95 duration-500"
        role="status"
        aria-live="polite"
        aria-atomic="true"
      >
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-2xl font-bold text-gray-800 mb-2">Request Received</h3>
        <p className="text-gray-600 mb-8">{APPOINTMENT_SUCCESS_MESSAGE}</p>
        <button
          onClick={() => {
            setFormState(initialState);
            setStatus('idle');
          }}
          className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-xl text-blue-700 bg-blue-100 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
        >
          Send another request
        </button>
      </div>
    );
  }

  return (
    <form 
      onSubmit={handleSubmit} 
      className="space-y-6 relative bg-white/70 backdrop-blur-lg border border-white/20 shadow-xl rounded-2xl p-8 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1"
      aria-label="Teleconsultation appointment request form"
      noValidate
    >
      {/* Live region for form status announcements */}
      <div 
        role="status" 
        aria-live="polite" 
        aria-atomic="true"
        className="sr-only"
        id="form-status"
      >
        {status === 'submitting' && 'Submitting your appointment request'}
        {status === 'error' && 'An error occurred. Please call us directly at +91 9778280044.'}
      </div>

      {/* Error summary for screen readers */}
      {Object.values(errors).some(error => error) && (
        <div 
          role="alert" 
          aria-live="assertive"
          className="rounded-lg border border-red-300 bg-red-50 p-4 mb-4"
          id="error-summary"
        >
          <h3 className="font-semibold text-red-800 mb-2">Please correct the following errors:</h3>
          <ul className="list-disc list-inside space-y-1 text-sm text-red-700">
            {Object.entries(errors).map(([field, error]) => 
              error ? (
                <li key={field}>
                  <a 
                    href={`#tele-${field}`}
                    className="underline focus:outline-none focus:ring-2 focus:ring-red-500 rounded"
                    onClick={(e) => {
                      e.preventDefault();
                      document.getElementById(`tele-${field}`)?.focus();
                    }}
                  >
                    {field.charAt(0).toUpperCase() + field.slice(1)}: {error}
                  </a>
                </li>
              ) : null
            )}
          </ul>
        </div>
      )}

      <fieldset className="space-y-4" aria-describedby="teleconsultation-description">
        <legend className="text-lg font-semibold text-blue-800">Tell us about your concern</legend>
        <p id="teleconsultation-description" className="text-sm text-blue-600">
          Provide a few details and our coordinator will call within one working day to confirm the appointment slot.
        </p>

        <div>
          <label htmlFor="tele-name" className="mb-2 block text-sm font-medium text-gray-700">
            Full name <span className="text-red-600" aria-label="required">*</span>
          </label>
          <input
            id="tele-name"
            name="name"
            type="text"
            value={formState.name}
            onChange={handleChange('name')}
            className={`w-full rounded-lg border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.name ? 'border-red-500 focus:ring-red-500' : 'border-gray-300'}`}
            autoComplete="name"
            required
            aria-required="true"
            aria-invalid={errors.name ? 'true' : 'false'}
            aria-describedby={errors.name ? 'tele-name-error' : undefined}
          />
          {errors.name && (
            <p 
              id="tele-name-error" 
              className="mt-1 text-xs text-red-600" 
              role="alert"
            >
              {errors.name}
            </p>
          )}
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label htmlFor="tele-phone" className="mb-2 block text-sm font-medium text-gray-700">
              Phone / WhatsApp <span className="text-red-600" aria-label="required">*</span>
            </label>
            <input
              id="tele-phone"
              name="phone"
              type="tel"
              value={formState.phone}
              onChange={handleChange('phone')}
              className={`w-full rounded-lg border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.phone ? 'border-red-500 focus:ring-red-500' : 'border-gray-300'}`}
              autoComplete="tel"
              required
              aria-required="true"
              aria-invalid={errors.phone ? 'true' : 'false'}
              aria-describedby={errors.phone ? 'tele-phone-error' : undefined}
            />
            {errors.phone && (
              <p 
                id="tele-phone-error" 
                className="mt-1 text-xs text-red-600" 
                role="alert"
              >
                {errors.phone}
              </p>
            )}
          </div>
          <div>
            <label htmlFor="tele-email" className="mb-2 block text-sm font-medium text-gray-700">
              Email <span className="text-gray-500 text-xs">(optional)</span>
            </label>
            <input
              id="tele-email"
              name="email"
              type="email"
              value={formState.email}
              onChange={handleChange('email')}
              className={`w-full rounded-lg border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.email ? 'border-red-500 focus:ring-red-500' : 'border-gray-300'}`}
              autoComplete="email"
              aria-invalid={errors.email ? 'true' : 'false'}
              aria-describedby={errors.email ? 'tele-email-error' : undefined}
            />
            {errors.email && (
              <p 
                id="tele-email-error" 
                className="mt-1 text-xs text-red-600" 
                role="alert"
              >
                {errors.email}
              </p>
            )}
          </div>
        </div>

        <div>
          <label htmlFor="tele-condition" className="mb-2 block text-sm font-medium text-gray-700">
            Condition or symptoms <span className="text-red-600" aria-label="required">*</span>
          </label>
          <input
            id="tele-condition"
            name="condition"
            type="text"
            value={formState.condition}
            onChange={handleChange('condition')}
            className={`w-full rounded-lg border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.condition ? 'border-red-500 focus:ring-red-500' : 'border-gray-300'}`}
            placeholder="Example: Cervical disc herniation with arm pain"
            required
            aria-required="true"
            aria-invalid={errors.condition ? 'true' : 'false'}
            aria-describedby={errors.condition ? 'tele-condition-error' : undefined}
          />
          {errors.condition && (
            <p 
              id="tele-condition-error" 
              className="mt-1 text-xs text-red-600" 
              role="alert"
            >
              {errors.condition}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="tele-painScore" className="mb-2 block text-sm font-medium text-gray-700">
            Pain Intensity Score (1-10)
          </label>
          <div className="flex items-center gap-4">
            <span className="text-sm font-bold text-gray-400" aria-hidden="true">1</span>
            <input
              id="tele-painScore"
              name="painScore"
              type="range"
              min="1"
              max="10"
              step="1"
              value={formState.painScore}
              onChange={handleChange('painScore')}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              aria-valuetext={`Score: ${formState.painScore}${formState.painScore >= 8 ? ' (Severe)' : formState.painScore <= 3 ? ' (Mild)' : ''}`}
            />
            <span className="text-sm font-bold text-gray-400" aria-hidden="true">10</span>
          </div>
          <div className="text-center mt-2">
            <span
              key={formState.painScore}
              className={`inline-block px-3 py-1 rounded-lg text-xs font-bold transition-transform duration-200 ease-out transform scale-100 animate-[pulse_0.3s_ease-in-out_1] ${
                formState.painScore <= 3
                  ? "bg-green-100 text-green-700"
                  : formState.painScore <= 7
                  ? "bg-yellow-100 text-yellow-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              Score: {formState.painScore}
              {formState.painScore >= 8 && " (Severe)"}
              {formState.painScore <= 3 && " (Mild)"}
            </span>
          </div>
        </div>

        <label className="flex items-center p-3 bg-gray-50 rounded-lg border border-gray-200 cursor-pointer hover:bg-gray-100 transition-colors">
          <input
            type="checkbox"
            id="tele-mriScanAvailable"
            name="mriScanAvailable"
            checked={formState.mriScanAvailable}
            onChange={handleCheckboxChange}
            className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500 border-gray-300"
          />
          <span className="ml-3 text-sm font-medium text-gray-700 select-none">
            I have MRI/CT Scan reports available
          </span>
        </label>

        <div>
          <label htmlFor="tele-message" className="mb-2 block text-sm font-medium text-gray-700">
            Additional details (preferred slot, questions) <span className="text-red-600" aria-label="required">*</span>
          </label>
          <textarea
            id="tele-message"
            name="message"
            rows={4}
            value={formState.message}
            onChange={handleChange('message')}
            className={`w-full rounded-lg border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.message ? 'border-red-500 focus:ring-red-500' : 'border-gray-300'}`}
            placeholder="Share any questions or preferred times."
            required
            aria-required="true"
            aria-invalid={errors.message ? 'true' : 'false'}
            aria-describedby={errors.message ? 'tele-message-error' : undefined}
          />
          {errors.message && (
            <p 
              id="tele-message-error" 
              className="mt-1 text-xs text-red-600" 
              role="alert"
            >
              {errors.message}
            </p>
          )}
        </div>
      </fieldset>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <Button
          type="submit"
          isLoading={status === 'submitting'}
          aria-describedby="form-status"
        >
          {status === 'submitting' ? "Sending..." : "Send appointment request"}
        </Button>
        <p className="text-xs text-gray-500">
          By submitting, you consent to being contacted on the number provided.
        </p>
      </div>

      {status === 'error' && (
        <div 
          className="rounded-lg border border-red-300 bg-red-50 p-4"
          role="alert"
          aria-live="assertive"
          aria-atomic="true"
        >
          <p className="text-sm font-medium text-red-800">
            Something went wrong while preparing the email. Please call us directly at{' '}
            <a 
              href="tel:+919778280044" 
              className="underline focus:outline-none focus:ring-2 focus:ring-red-500 rounded"
            >
              +91 9778280044
            </a>.
          </p>
        </div>
      )}
    </form>
  );
}
