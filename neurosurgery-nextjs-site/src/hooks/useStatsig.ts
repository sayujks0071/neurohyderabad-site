'use client';

import { 
  useStatsig as useStatsigCore,
  useFeatureFlag,
  useExperiment
} from '@statsig/react-bindings';
import { 
  trackAppointmentBooking, 
  trackServiceInquiry, 
  trackContactForm, 
  trackPhoneCall, 
  trackEmailClick,
  trackEngagement
} from '../lib/statsig';

export const useStatsig = () => {
  const { logEvent } = useStatsigCore();

  return {
    logEvent,
    trackAppointmentBooking,
    trackServiceInquiry,
    trackContactForm,
    trackPhoneCall,
    trackEmailClick,
    trackEngagement
  };
};

// Hook for tracking user interactions
export const useInteractionTracking = () => {
  const { trackEngagement } = useStatsig();

  const trackClick = (element: string, action: string = 'click') => {
    trackEngagement(action, element);
  };

  const trackHover = (element: string, duration: number) => {
    trackEngagement('hover', element, duration);
  };

  const trackScroll = (element: string, percentage: number) => {
    trackEngagement('scroll', element, percentage);
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
    return useFeatureFlag(featureName);
  };

  const getExperimentVariant = (experimentName: string) => {
    return useExperiment(experimentName);
  };

  return {
    isFeatureEnabled,
    getExperimentVariant
  };
};
