'use client';

import { useState } from 'react';
import Button from '../_components/Button';

interface NewsletterSignupProps {
  className?: string;
  variant?: 'inline' | 'card';
}

export default function NewsletterSignup({ 
  className = '', 
  variant = 'inline' 
}: NewsletterSignupProps) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [error, setError] = useState('');

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email.trim()) {
      setError('Please enter your email address');
      return;
    }

    if (!validateEmail(email)) {
      setError('Please enter a valid email address');
      return;
    }

    setStatus('submitting');

    try {
      const response = await fetch('/api/newsletter/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setStatus('success');
        setEmail('');
        setTimeout(() => setStatus('idle'), 3000);
      } else {
        setStatus('error');
        setError(data.error || 'Something went wrong. Please try again.');
      }
    } catch (err) {
      setStatus('error');
      setError('Network error. Please try again later.');
    }
  };

  if (variant === 'card') {
    return (
      <div className={`bg-blue-50 border border-blue-200 rounded-lg p-6 ${className}`}>
        <h3 className="text-xl font-semibold text-blue-900 mb-2">
          Stay Updated with Health Insights
        </h3>
        <p className="text-sm text-blue-700 mb-4">
          Subscribe to receive expert neurosurgical insights, patient education, and health tips.
        </p>
        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full px-4 py-2 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={status === 'submitting'}
              required
              aria-label="Email address"
            />
            {error && (
              <p className="mt-1 text-sm text-red-600" role="alert">
                {error}
              </p>
            )}
          </div>
          <Button
            type="submit"
            variant="primary"
            disabled={status === 'submitting'}
            fullWidth
          >
            {status === 'submitting' 
              ? 'Subscribing...' 
              : status === 'success' 
              ? '✓ Subscribed!' 
              : 'Subscribe'}
          </Button>
        </form>
        {status === 'success' && (
          <p className="mt-2 text-sm text-green-700" role="alert">
            Thank you for subscribing! Check your email for confirmation.
          </p>
        )}
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={`flex flex-col sm:flex-row gap-2 ${className}`}>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your email for health insights"
        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        disabled={status === 'submitting'}
        required
        aria-label="Email address"
      />
      <Button
        type="submit"
        variant="primary"
        disabled={status === 'submitting'}
      >
        {status === 'submitting' ? 'Subscribing...' : 'Subscribe'}
      </Button>
      {error && (
        <p className="text-sm text-red-600 mt-1" role="alert">
          {error}
        </p>
      )}
      {status === 'success' && (
        <p className="text-sm text-green-700 mt-1" role="alert">
          Thank you for subscribing!
        </p>
      )}
    </form>
  );
}














