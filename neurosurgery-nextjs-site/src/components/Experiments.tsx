'use client';

import React from 'react';
import { useFeatureGate } from '@statsig/react-bindings';
import { analytics, trackExperimentExposure } from '../lib/analytics';
import Link from 'next/link';

// Experiment 1: Hero CTA Copy Test
interface HeroCTAProps {
  pageSlug: string;
  serviceOrCondition?: string;
  className?: string;
}

export function HeroCTA({ pageSlug, serviceOrCondition, className = "" }: HeroCTAProps) {
  const { value: ctaVariant } = useFeatureGate('exp_hero_cta_copy', 'control');
  
  // Track experiment exposure
  React.useEffect(() => {
    trackExperimentExposure('exp_hero_cta_copy', ctaVariant, pageSlug);
  }, [ctaVariant, pageSlug]);
  
  const getCTAText = () => {
    switch (ctaVariant) {
      case 'book_appointment_today':
        return 'Book Appointment Today';
      case 'talk_to_neurosurgeon':
        return 'Talk to a Neurosurgeon';
      default:
        return 'Book Consultation';
    }
  };

  const handleClick = () => {
    analytics.heroCTAClick(pageSlug, getCTAText(), serviceOrCondition);
  };

  return (
    <Link
      href="/appointments"
      onClick={handleClick}
      className={`bg-white text-blue-800 px-8 py-3 rounded-full text-lg font-semibold hover:bg-blue-50 transition-colors ${className}`}
    >
      {getCTAText()}
    </Link>
  );
}

// Experiment 2: Sticky CTA Mobile
interface StickyCTAProps {
  pageSlug: string;
}

export function StickyCTA({ pageSlug }: StickyCTAProps) {
  const { value: showStickyCTA } = useFeatureGate('exp_sticky_cta_mobile', false);
  
  // Track experiment exposure
  React.useEffect(() => {
    trackExperimentExposure('exp_sticky_cta_mobile', showStickyCTA ? 'treatment' : 'control', pageSlug);
  }, [showStickyCTA, pageSlug]);
  
  if (!showStickyCTA) return null;

  const handleClick = () => {
    analytics.stickyCTAClick(pageSlug, 'Book Now');
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-blue-600 text-white p-4 shadow-lg z-40 md:hidden">
      <div className="flex items-center justify-between max-w-md mx-auto">
        <div className="text-sm">
          <div className="font-semibold">Need Expert Care?</div>
          <div className="text-blue-100">Book with Dr Sayuj Krishnan</div>
        </div>
        <Link
          href="/appointments"
          onClick={handleClick}
          className="bg-white text-blue-600 px-4 py-2 rounded-full text-sm font-semibold hover:bg-blue-50 transition-colors"
        >
          Book Now
        </Link>
      </div>
    </div>
  );
}

// Experiment 3: Social Proof Band
interface SocialProofProps {
  pageSlug: string;
}

export function SocialProof({ pageSlug }: SocialProofProps) {
  const { value: showSocialProof } = useFeatureGate('exp_social_proof_band', false);
  
  // Track experiment exposure
  React.useEffect(() => {
    trackExperimentExposure('exp_social_proof_band', showSocialProof ? 'treatment' : 'control', pageSlug);
  }, [showSocialProof, pageSlug]);
  
  if (!showSocialProof) return null;

  return (
    <section className="py-8 bg-blue-50">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex flex-wrap justify-center items-center gap-6 mb-4">
            {/* Trust badges */}
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <span className="text-green-600">✓</span>
              <span>15+ Years Experience</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <span className="text-green-600">✓</span>
              <span>Advanced Training</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <span className="text-green-600">✓</span>
              <span>Insurance Accepted</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <span className="text-green-600">✓</span>
              <span>Day-care Eligible</span>
            </div>
          </div>
          
          {/* Review snippet */}
          <div className="bg-white p-4 rounded-lg shadow-sm max-w-2xl mx-auto mb-4">
            <div className="flex items-center justify-center gap-1 mb-2">
              {[...Array(5)].map((_, i) => (
                <span key={i} className="text-yellow-400">★</span>
              ))}
            </div>
            <p className="text-sm text-gray-700 italic">
              "Dr Sayuj's endoscopic spine surgery helped me recover quickly with minimal pain. Highly recommended!"
            </p>
            <p className="text-xs text-gray-500 mt-2">- Verified Patient</p>
          </div>
          
          {/* Society logos */}
          <div className="flex justify-center items-center gap-4 mb-4">
            <div className="text-xs text-gray-500">Member of:</div>
            <div className="text-xs text-blue-600 font-medium">Neurological Society of India</div>
            <div className="text-xs text-gray-400">•</div>
            <div className="text-xs text-blue-600 font-medium">Association of Spine Surgeons of India</div>
          </div>
          
          <p className="text-sm text-gray-600">
            <strong>Medically reviewed by Dr Sayuj Krishnan</strong> — MBBS, DNB Neurosurgery (Direct 6 years), Fellowship in Minimally Invasive and Advanced Spine Surgery
          </p>
        </div>
      </div>
    </section>
  );
}

// Nav CTA with A/B testing
interface NavCTAProps {
  pageSlug: string;
  className?: string;
}

export function NavCTA({ pageSlug, className = "" }: NavCTAProps) {
  const { value: navVariant } = useFeatureGate('exp_hero_cta_copy', 'control');
  
  const getNavText = () => {
    switch (navVariant) {
      case 'book_appointment_today':
        return 'Book Appointment Today';
      case 'talk_to_neurosurgeon':
        return 'Talk to a Neurosurgeon';
      default:
        return 'Book Consultation';
    }
  };

  const handleClick = () => {
    analytics.navCTAClick(pageSlug, getNavText());
  };

  return (
    <Link
      href="/appointments"
      onClick={handleClick}
      className={`rounded-full bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 ${className}`}
    >
      {getNavText()}
    </Link>
  );
}

// Phone click tracking component
interface PhoneLinkProps {
  phoneNumber: string;
  pageSlug: string;
  phoneType?: 'main' | 'whatsapp' | 'emergency';
  children: React.ReactNode;
  className?: string;
}

export function PhoneLink({ phoneNumber, pageSlug, phoneType = 'main', children, className }: PhoneLinkProps) {
  const handleClick = () => {
    analytics.phoneClick(pageSlug, phoneType);
  };

  return (
    <a
      href={`tel:${phoneNumber}`}
      onClick={handleClick}
      className={className}
    >
      {children}
    </a>
  );
}

// WhatsApp click tracking component
interface WhatsAppLinkProps {
  pageSlug: string;
  children: React.ReactNode;
  className?: string;
}

export function WhatsAppLink({ pageSlug, children, className }: WhatsAppLinkProps) {
  const handleClick = () => {
    analytics.whatsAppClick(pageSlug);
  };

  return (
    <a
      href="https://wa.me/919778280044"
      onClick={handleClick}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
    >
      {children}
    </a>
  );
}

// Directions click tracking component
interface DirectionsLinkProps {
  pageSlug: string;
  children: React.ReactNode;
  className?: string;
}

export function DirectionsLink({ pageSlug, children, className }: DirectionsLinkProps) {
  const handleClick = () => {
    analytics.directionsClick(pageSlug);
  };

  return (
    <a
      href="https://www.google.com/maps/dir/?api=1&destination=Yashoda+Hospital+Malakpet"
      onClick={handleClick}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
    >
      {children}
    </a>
  );
}
