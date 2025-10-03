'use client';

import { useWebLogger, getPageContext } from '@/app/lib/ab';
import { usePathname } from 'next/navigation';
import { useCallback } from 'react';

export function useAppointmentLogger() {
  const pathname = usePathname();
  const pageCtx = getPageContext(pathname);
  const { logCTA, logApptStart, logApptSuccess } = useWebLogger(pageCtx);

  const logAppointmentCTA = useCallback((surface: 'header' | 'footer' | 'card' | 'hero' | 'sticky') => {
    logCTA(surface);
  }, [logCTA]);

  const logAppointmentStart = useCallback(() => {
    logApptStart();
  }, [logApptStart]);

  const logAppointmentSuccess = useCallback((appointment_type: 'in-person' | 'tele' | 'unknown' = 'unknown') => {
    logApptSuccess(appointment_type);
  }, [logApptSuccess]);

  return {
    logAppointmentCTA,
    logAppointmentStart,
    logAppointmentSuccess
  };
}

// Hook for tracking other contact methods
export function useContactLogger() {
  const pathname = usePathname();
  const pageCtx = getPageContext(pathname);
  const { logWhatsApp, logCall, logDirections } = useWebLogger(pageCtx);

  const logWhatsAppClick = useCallback(() => {
    logWhatsApp();
  }, [logWhatsApp]);

  const logCallClick = useCallback(() => {
    logCall();
  }, [logCall]);

  const logDirectionsClick = useCallback(() => {
    logDirections();
  }, [logDirections]);

  return {
    logWhatsAppClick,
    logCallClick,
    logDirectionsClick
  };
}