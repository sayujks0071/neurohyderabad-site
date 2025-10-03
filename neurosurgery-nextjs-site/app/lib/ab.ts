'use client';

import { useExperiment, useGate, useStatsigLogEvent } from '@statsig/react-bindings';

export function useWebExperiments() {
  const expEnabled = useGate('web_exp_enabled')?.value ?? true;
  const hero = useExperiment('web_exp_hero_cta')?.value || {};
  const sticky = useExperiment('web_exp_sticky_cta')?.value || {};
  return { expEnabled, hero, sticky };
}

export function useWebLogger(ctx: { 
  page_path: string; 
  page_type: string; 
  cluster: string; 
  device: string; 
  utm?: Record<string, string> 
}) {
  const logEvent = useStatsigLogEvent();
  
  const logCTA = (surface: string) => logEvent('web_CTA_Click', { 
    surface, 
    ...ctx, 
    ...ctx.utm 
  });
  
  const logApptStart = () => logEvent('web_Appointment_Start', ctx);
  
  const logApptSuccess = (appointment_type?: string) => logEvent('web_Appointment_Success', { 
    ...ctx, 
    appointment_type 
  });

  const logWhatsApp = () => logEvent('web_WhatsApp_Click', ctx);
  const logCall = () => logEvent('web_Call_Click', ctx);
  const logDirections = () => logEvent('web_Directions_Click', ctx);

  return { 
    logCTA, 
    logApptStart, 
    logApptSuccess, 
    logWhatsApp, 
    logCall, 
    logDirections 
  };
}

// Helper function to determine page context
export function getPageContext(pathname: string): {
  page_path: string;
  page_type: string;
  cluster: string;
  device: string;
} {
  const page_path = pathname;
  
  // Determine page type
  let page_type = 'generic';
  if (pathname === '/') page_type = 'home';
  else if (pathname.startsWith('/blog/')) page_type = 'blog';
  else if (pathname.startsWith('/appointments')) page_type = 'appointment';
  else if (pathname.includes('hyderabad') || pathname.includes('location')) page_type = 'location';
  else if (pathname.includes('endoscopic') || pathname.includes('discectomy') || pathname.includes('spine')) page_type = 'service';
  else if (pathname.includes('herniated') || pathname.includes('condition')) page_type = 'condition';

  // Determine cluster
  let cluster = 'generic';
  if (pathname.includes('spine') || pathname.includes('discectomy') || pathname.includes('endoscopic')) cluster = 'spine';
  else if (pathname.includes('brain') || pathname.includes('tumor') || pathname.includes('awake')) cluster = 'brain';
  else if (pathname.includes('epilepsy') || pathname.includes('seizure')) cluster = 'epilepsy';
  else if (pathname.includes('trigeminal') || pathname.includes('neuralgia')) cluster = 'tn';

  // Determine device (this would typically come from user agent detection)
  const device = typeof window !== 'undefined' && window.innerWidth < 768 ? 'mobile' : 'desktop';

  return {
    page_path,
    page_type,
    cluster,
    device
  };
}