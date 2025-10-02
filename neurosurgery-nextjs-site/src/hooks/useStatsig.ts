'use client';

import { 
  useStatsigClient,
  useFeatureGate,
  useExperiment
} from '@statsig/react-bindings';
import { analytics } from '../lib/analytics';

export const useStatsig = () => {
  const client = useStatsigClient();

  return {
    logEvent: client?.logEvent.bind(client),
    trackAppointmentBooking: (data: any) => analytics.appointmentSuccess(data.pageSlug, data.serviceOrCondition),
    trackServiceInquiry: (data: any) => analytics.appointmentStart(data.pageSlug, data.serviceOrCondition),
    trackContactForm: (data: any) => analytics.appointmentSubmit(data.pageSlug, data.errorCount),
    trackPhoneCall: (data: any) => analytics.phoneClick(data.pageSlug, 'main'),
    trackEmailClick: (data: any) => analytics.track('Email_Click', { page_slug: data.pageSlug }),
    trackEngagement: (data: any) => analytics.track('Engagement', { page_slug: data.pageSlug, engagement_type: data.type })
  };
};

// Hook for tracking user interactions
export const useInteractionTracking = () => {
  const { trackEngagement } = useStatsig();

  const trackClick = (element: string, action: string = 'click') => {
    trackEngagement({ type: action, element, pageSlug: window.location.pathname });
  };

  const trackHover = (element: string, duration: number) => {
    trackEngagement({ type: 'hover', element, duration, pageSlug: window.location.pathname });
  };

  const trackScroll = (element: string, percentage: number) => {
    trackEngagement({ type: 'scroll', element, percentage, pageSlug: window.location.pathname });
  };

  return {
    trackClick,
    trackHover,
    trackScroll
  };
};

// Hook for A/B testing
export const useABTesting = () => {
  const isFeatureEnabled = (featureName: string): boolean => {
    const gate = useFeatureGate(featureName);
    return gate?.value || false;
  };

  const getExperimentVariant = (experimentName: string) => {
    return useExperiment(experimentName);
  };

  return {
    isFeatureEnabled,
    getExperimentVariant
  };
};
