'use client';

import React from 'react';
import { useFeatureGate } from '@statsig/react-bindings';
import { trackHeroCTAClick, trackStickyCTAClick, trackNavCTAClick } from '../lib/statsig';
import Link from 'next/link';

// Test 1: Hero CTA variants
interface HeroCTAProps {
  pageSlug: string;
  service?: string;
  condition?: string;
  className?: string;
}

export function HeroCTA({ pageSlug, service, condition, className = "" }: HeroCTAProps) {
  const { value: ctaVariant } = useFeatureGate('hero_cta_test', 'control');
  
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
    trackHeroCTAClick(pageSlug, getCTAText(), service, condition);
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

// Test 2: Sticky bottom CTA bar
interface StickyCTAProps {
  pageSlug: string;
}

export function StickyCTA({ pageSlug }: StickyCTAProps) {
  const { value: showStickyCTA } = useFeatureGate('sticky_cta_test', false);
  
  if (!showStickyCTA) return null;

  const handleClick = () => {
    trackStickyCTAClick(pageSlug, 'Book Consultation');
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

// Test 3: Social proof near hero
interface SocialProofProps {
  pageSlug: string;
}

export function SocialProof({ pageSlug }: SocialProofProps) {
  const { value: showSocialProof } = useFeatureGate('social_proof_test', false);
  
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
          
          <p className="text-sm text-gray-600">
            <strong>Medically reviewed by Dr Sayuj Krishnan</strong> — MBBS, DNB Neurosurgery (Direct 6 years), Fellowship in Minimally Invasive and Advanced Spine Surgery
          </p>
        </div>
      </div>
    </section>
  );
}

// Test 4: Insurance accepted band
interface InsuranceBandProps {
  pageSlug: string;
}

export function InsuranceBand({ pageSlug }: InsuranceBandProps) {
  const { value: showInsuranceBand } = useFeatureGate('insurance_band_test', false);
  
  if (!showInsuranceBand) return null;

  return (
    <div className="bg-green-50 border-l-4 border-green-400 p-4 mb-6">
      <div className="flex items-center">
        <div className="flex-shrink-0">
          <span className="text-green-400 text-xl">✓</span>
        </div>
        <div className="ml-3">
          <p className="text-sm text-green-700">
            <strong>Insurance Accepted</strong> • Most major insurance providers and TPAs
          </p>
          <p className="text-sm text-green-600">
            Day-care eligible procedures available • Flexible payment options
          </p>
        </div>
      </div>
    </div>
  );
}

// Test 6: H1 variants for local intent
interface LocalH1Props {
  baseTitle: string;
  pageSlug: string;
  service?: string;
  condition?: string;
}

export function LocalH1({ baseTitle, pageSlug, service, condition }: LocalH1Props) {
  const { value: h1Variant } = useFeatureGate('local_h1_test', 'control');
  
  const getH1Text = () => {
    switch (h1Variant) {
      case 'hyderabad_early':
        return baseTitle.replace('in Hyderabad', '').trim() + ' in Hyderabad';
      case 'hyderabad_later':
        return baseTitle;
      default:
        return baseTitle;
    }
  };

  return (
    <h1 className="text-4xl md:text-6xl font-bold mb-6">
      {getH1Text()}
    </h1>
  );
}

// Test 7: FAQ display variants
interface FAQDisplayProps {
  pageSlug: string;
  faqs: Array<{ id: string; question: string; answer: string }>;
}

export function FAQDisplay({ pageSlug, faqs }: FAQDisplayProps) {
  const { value: faqVariant } = useFeatureGate('faq_display_test', 'control');
  const [expandedFAQs, setExpandedFAQs] = React.useState<Set<string>>(
    faqVariant === 'first_three_expanded' ? new Set(faqs.slice(0, 3).map(f => f.id)) : new Set()
  );

  const toggleFAQ = (faqId: string) => {
    const newExpanded = new Set(expandedFAQs);
    const isCurrentlyExpanded = expandedFAQs.has(faqId);
    
    if (isCurrentlyExpanded) {
      newExpanded.delete(faqId);
    } else {
      newExpanded.add(faqId);
    }
    
    setExpandedFAQs(newExpanded);
    
    // Track FAQ interaction
    if (typeof window !== 'undefined') {
      const { trackFAQToggle } = require('../lib/statsig');
      trackFAQToggle(pageSlug, faqId, !isCurrentlyExpanded);
    }
  };

  return (
    <div className="space-y-6">
      {faqs.map((faq) => (
        <div key={faq.id} className="bg-white p-6 rounded-lg shadow-md">
          <button
            onClick={() => toggleFAQ(faq.id)}
            className="w-full text-left text-xl font-semibold mb-3 text-blue-700 hover:text-blue-800 transition-colors"
          >
            {faq.question}
            <span className="float-right">
              {expandedFAQs.has(faq.id) ? '−' : '+'}
            </span>
          </button>
          {expandedFAQs.has(faq.id) && (
            <p className="text-gray-700">{faq.answer}</p>
          )}
        </div>
      ))}
    </div>
  );
}

// Test 8: Nav label variants
interface NavCTAProps {
  pageSlug: string;
  className?: string;
}

export function NavCTA({ pageSlug, className = "" }: NavCTAProps) {
  const { value: navVariant } = useFeatureGate('nav_label_test', 'appointments');
  
  const getNavText = () => {
    switch (navVariant) {
      case 'book_consultation':
        return 'Book Consultation';
      default:
        return 'Appointments';
    }
  };

  const handleClick = () => {
    trackNavCTAClick(pageSlug, getNavText());
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
