'use client';

import { useMemo, useState } from 'react';
import { useStatsigEvents } from '../src/lib/statsig-events';

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
};

const initialState: FormState = {
  name: '',
  phone: '',
  email: '',
  condition: '',
  message: '',
};

export default function TeleconsultationForm({ pageSlug, service }: TeleconsultationFormProps) {
  const [formState, setFormState] = useState<FormState>(initialState);
  const [errors, setErrors] = useState<Record<keyof FormState, string>>({
    name: '',
    phone: '',
    email: '',
    condition: '',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const { logAppointmentBooking, logContactFormSubmit } = useStatsigEvents();

  const subject = useMemo(() => {
    const base = service ? `${service} enquiry` : 'Appointment enquiry';
    return `${base} – ${formState.name || 'New patient'}`;
  }, [service, formState.name]);

  const mailtoHref = useMemo(() => {
    const params = new URLSearchParams({
      subject,
      body: `Page: ${pageSlug}\nName: ${formState.name}\nPhone: ${formState.phone}\nEmail: ${formState.email}\nCondition: ${formState.condition}\nMessage: ${formState.message}`,
    });
    return `mailto:neurospinehyd@drsayuj.com?${params.toString()}`;
  }, [formState, pageSlug, subject]);

  const handleChange = (field: keyof FormState) => (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState((prev) => ({ ...prev, [field]: event.target.value }));
    setErrors((prev) => ({ ...prev, [field]: '' }));
  };

  const validate = () => {
    const newErrors: Record<keyof FormState, string> = { ...errors };
    let valid = true;

    (Object.keys(formState) as (keyof FormState)[]).forEach((key) => {
      if (!formState[key].trim()) {
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
      // Log Statsig events
      logAppointmentBooking('appointment_form', service || 'general');
      logContactFormSubmit('appointment_request', true);
      
      window.location.href = mailtoHref;
      setStatus('success');
      setFormState(initialState);
    } catch (error) {
      console.error(error);
      logContactFormSubmit('appointment_request', false);
      setStatus('error');
    }
  };

  return (
    <form 
      onSubmit={handleSubmit} 
      className="space-y-6 rounded-2xl border border-blue-100 bg-white p-6 shadow-sm"
      aria-label="Appointment request form"
      noValidate
    >
      <fieldset className="space-y-4" aria-describedby="teleconsultation-description">
        <legend className="text-lg font-semibold text-blue-800">Tell us about your concern</legend>
        <p id="teleconsultation-description" className="text-sm text-blue-600">
          Provide a few details and our coordinator will call within one working day to confirm the appointment slot.
        </p>

        <div>
          <label htmlFor="tele-name" className="mb-2 block text-sm font-medium text-gray-700">
            Full name
          </label>
          <input
            id="tele-name"
            name="name"
            value={formState.name}
            onChange={handleChange('name')}
            className={`w-full rounded-lg border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
            autoComplete="name"
            required
            aria-required="true"
            aria-invalid={errors.name ? 'true' : 'false'}
            aria-describedby={errors.name ? 'tele-name-error' : undefined}
          />
          {errors.name && (
            <p id="tele-name-error" className="mt-1 text-xs text-red-600" role="alert">
              {errors.name}
            </p>
          )}
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label htmlFor="tele-phone" className="mb-2 block text-sm font-medium text-gray-700">
              Phone / WhatsApp
            </label>
            <input
              id="tele-phone"
              name="phone"
              value={formState.phone}
              onChange={handleChange('phone')}
              className={`w-full rounded-lg border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.phone ? 'border-red-500' : 'border-gray-300'}`}
              autoComplete="tel"
              required
              aria-required="true"
              aria-invalid={errors.phone ? 'true' : 'false'}
              aria-describedby={errors.phone ? 'tele-phone-error' : undefined}
            />
            {errors.phone && (
              <p id="tele-phone-error" className="mt-1 text-xs text-red-600" role="alert">
                {errors.phone}
              </p>
            )}
          </div>
          <div>
            <label htmlFor="tele-email" className="mb-2 block text-sm font-medium text-gray-700">
              Email (optional)
            </label>
            <input
              id="tele-email"
              name="email"
              type="email"
              value={formState.email}
              onChange={handleChange('email')}
              className={`w-full rounded-lg border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
              autoComplete="email"
              aria-invalid={errors.email ? 'true' : 'false'}
              aria-describedby={errors.email ? 'tele-email-error' : undefined}
            />
            {errors.email && (
              <p id="tele-email-error" className="mt-1 text-xs text-red-600" role="alert">
                {errors.email}
              </p>
            )}
          </div>
        </div>

        <div>
          <label htmlFor="tele-condition" className="mb-2 block text-sm font-medium text-gray-700">
            Condition or symptoms
          </label>
          <input
            id="tele-condition"
            name="condition"
            value={formState.condition}
            onChange={handleChange('condition')}
            className={`w-full rounded-lg border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.condition ? 'border-red-500' : 'border-gray-300'}`}
            placeholder="Example: Cervical disc herniation with arm pain"
            required
            aria-required="true"
            aria-invalid={errors.condition ? 'true' : 'false'}
            aria-describedby={errors.condition ? 'tele-condition-error' : undefined}
          />
          {errors.condition && (
            <p id="tele-condition-error" className="mt-1 text-xs text-red-600" role="alert">
              {errors.condition}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="tele-message" className="mb-2 block text-sm font-medium text-gray-700">
            Additional details (reports, preferred slot)
          </label>
          <textarea
            id="tele-message"
            name="message"
            rows={4}
            value={formState.message}
            onChange={handleChange('message')}
            className={`w-full rounded-lg border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.message ? 'border-red-500' : 'border-gray-300'}`}
            placeholder="Share MRI findings, previous surgeries, or questions you want to cover."
            required
            aria-required="true"
            aria-invalid={errors.message ? 'true' : 'false'}
            aria-describedby={errors.message ? 'tele-message-error' : undefined}
          />
          {errors.message && (
            <p id="tele-message-error" className="mt-1 text-xs text-red-600" role="alert">
              {errors.message}
            </p>
          )}
        </div>
      </fieldset>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="submit"
          className="inline-flex items-center justify-center rounded-full bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={status === 'submitting'}
          aria-label={status === 'submitting' ? 'Submitting appointment request' : 'Submit appointment request'}
        >
          {status === 'submitting' ? 'Preparing email…' : 'Send appointment request'}
        </button>
        <p className="text-xs text-gray-500">
          By submitting, you consent to being contacted on the number provided.
        </p>
      </div>

      <div role="status" aria-live="polite" aria-atomic="true">
        {status === 'success' && (
          <p className="text-sm font-medium text-green-600">
            Email draft opened in your mail app. Please review and send to confirm the request.
          </p>
        )}
      </div>
      <div role="alert" aria-live="assertive" aria-atomic="true">
        {status === 'error' && (
          <p className="text-sm font-medium text-red-600">
            Something went wrong while preparing the email. Please call us directly at +91 9778280044.
          </p>
        )}
      </div>
    </form>
  );
}
