'use client';

/**
 * Real-World Example: Combined Use Cases
 * 
 * This demonstrates how to combine multiple flag patterns in a production component
 * 
 * Features:
 * - Feature toggle for new booking flow
 * - A/B test for CTA buttons
 * - Personalization based on user segment
 * - Progressive rollout of new features
 * - Analytics tracking
 */
import { useFeatureFlag } from '@/src/lib/hypertune/hooks';
import { analytics } from '@/src/lib/analytics';
import { useEffect, useMemo, useState } from 'react';
import { usePathname } from 'next/navigation';

type UserSegment = 'new' | 'returning' | 'vip';
type CTAVariant = 'primary' | 'secondary' | 'minimal';

export default function RealWorldExample() {
  const pathname = usePathname();
  const [userSegment, setUserSegment] = useState<UserSegment>('new');

  // Feature Toggles
  const enableNewBookingFlow = useFeatureFlag('enableNewBookingFlow', false);
  const showTestimonials = useFeatureFlag('showTestimonials', true);
  const enableLiveChat = useFeatureFlag('enableLiveChat', false);

  // A/B Test Variants
  const ctaVariant = useFeatureFlag<CTAVariant>('ctaButtonVariant', 'primary');
  const headlineVariant = useFeatureFlag('headlineVariant', 'control');

  // Personalization Flags
  const showWelcomeOffer = useFeatureFlag('showWelcomeOffer', false);
  const showLoyaltyProgram = useFeatureFlag('showLoyaltyProgram', false);

  // Progressive Rollout
  const newFeatureRollout = useFeatureFlag('newFeatureRollout', 0);
  const shouldShowNewFeature = useMemo(() => {
    if (newFeatureRollout === 0) return false;
    if (newFeatureRollout === 100) return true;
    const userId = localStorage.getItem('user_id') || 'anonymous';
    const hash = userId.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return (hash % 100) < newFeatureRollout;
  }, [newFeatureRollout]);

  // Determine user segment
  useEffect(() => {
    const isReturning = localStorage.getItem('returning_visitor') === 'true';
    const isVIP = localStorage.getItem('user_tier') === 'vip';
    if (isVIP) setUserSegment('vip');
    else if (isReturning) setUserSegment('returning');
    else setUserSegment('new');
  }, []);

  // Track experiment exposure
  useEffect(() => {
    analytics.track('Experiment_Exposure', {
      experiment_name: 'ctaButtonVariant',
      experiment_variant: ctaVariant,
      page_slug: pathname || '/',
    });

    analytics.track('Experiment_Exposure', {
      experiment_name: 'headlineVariant',
      experiment_variant: headlineVariant,
      page_slug: pathname || '/',
    });
  }, [ctaVariant, headlineVariant, pathname]);

  // CTA Button Styles
  const ctaStyles = {
    primary: 'bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold',
    secondary: 'bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-semibold',
    minimal: 'border-2 border-blue-600 text-blue-600 hover:bg-blue-50 px-8 py-3 rounded-lg font-semibold',
  };

  // Headlines
  const headlines = {
    control: 'Expert Neurosurgery Care in Hyderabad',
    variant_a: 'Transform Your Health with Advanced Brain & Spine Surgery',
    variant_b: '1,000+ Successful Surgeries | Same-Day Discharge Available',
  };

  const handleCTAClick = () => {
    analytics.track('CTA_Click', {
      page_slug: pathname || '/',
      cta_variant: ctaVariant,
      headline_variant: headlineVariant,
      booking_flow: enableNewBookingFlow ? 'new' : 'standard',
      user_segment: userSegment,
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      {/* Hero Section with A/B Test */}
      <section className="text-center space-y-4">
        <h1 className="text-4xl font-bold">
          {headlines[headlineVariant as keyof typeof headlines] || headlines.control}
        </h1>
        <p className="text-gray-600 text-lg">
          German-trained neurosurgeon specializing in minimally invasive procedures
        </p>

        {/* CTA Buttons with A/B Test */}
        <div className="flex gap-4 justify-center">
          {enableNewBookingFlow ? (
            <button
              className={ctaStyles[ctaVariant]}
              onClick={handleCTAClick}
            >
              Book with New Flow
            </button>
          ) : (
            <button
              className={ctaStyles[ctaVariant]}
              onClick={handleCTAClick}
            >
              Book Consultation
            </button>
          )}
        </div>
      </section>

      {/* Personalization Section */}
      {userSegment === 'new' && showWelcomeOffer && (
        <section className="bg-gradient-to-r from-blue-500 to-purple-500 text-white p-6 rounded-lg">
          <h3 className="text-xl font-bold mb-2">Welcome! Special Offer</h3>
          <p>Get 10% off your first consultation. Book now!</p>
        </section>
      )}

      {userSegment === 'returning' && showLoyaltyProgram && (
        <section className="bg-gradient-to-r from-green-500 to-teal-500 text-white p-6 rounded-lg">
          <h3 className="text-xl font-bold mb-2">Loyalty Rewards</h3>
          <p>Thank you for being a valued patient. Earn points with every visit!</p>
        </section>
      )}

      {/* Progressive Rollout Feature */}
      {shouldShowNewFeature && (
        <section className="border-2 border-blue-500 rounded-lg p-6 bg-blue-50">
          <div className="flex items-center gap-2 mb-4">
            <span className="bg-blue-500 text-white px-2 py-1 rounded text-xs font-bold">
              NEW FEATURE
            </span>
            <span className="text-sm text-gray-600">
              Rollout: {newFeatureRollout}%
            </span>
          </div>
          <h3 className="text-lg font-semibold mb-2">Enhanced Patient Portal</h3>
          <p className="text-gray-700">
            Access your medical records, schedule appointments, and communicate with your care team.
          </p>
        </section>
      )}

      {/* Conditional Content */}
      {showTestimonials && (
        <section className="bg-gray-50 p-6 rounded-lg">
          <h3 className="text-xl font-bold mb-4">Patient Testimonials</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <blockquote className="border-l-4 border-blue-500 pl-4">
              "Excellent care and professional service. Highly recommended!"
            </blockquote>
            <blockquote className="border-l-4 border-blue-500 pl-4">
              "Dr. Sayuj provided exceptional treatment for my spine condition."
            </blockquote>
          </div>
        </section>
      )}

      {/* Live Chat Widget */}
      {enableLiveChat && (
        <div className="fixed bottom-4 right-4 bg-green-500 text-white p-4 rounded-full shadow-lg cursor-pointer hover:bg-green-600 transition-colors">
          💬 Chat
        </div>
      )}

      {/* Debug Panel (remove in production) */}
      {process.env.NODE_ENV === 'development' && (
        <div className="mt-8 p-4 bg-gray-100 rounded-lg text-xs space-y-1">
          <p><strong>Feature Flags Status:</strong></p>
          <p>New Booking Flow: {enableNewBookingFlow ? 'ON' : 'OFF'}</p>
          <p>Testimonials: {showTestimonials ? 'ON' : 'OFF'}</p>
          <p>Live Chat: {enableLiveChat ? 'ON' : 'OFF'}</p>
          <p>CTA Variant: {ctaVariant}</p>
          <p>Headline Variant: {headlineVariant}</p>
          <p>User Segment: {userSegment}</p>
          <p>New Feature Rollout: {newFeatureRollout}%</p>
          <p>Should Show New Feature: {shouldShowNewFeature ? 'YES' : 'NO'}</p>
        </div>
      )}
    </div>
  );
}
