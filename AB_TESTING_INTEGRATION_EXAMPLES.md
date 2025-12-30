# A/B Testing Integration Examples

## Overview

This document provides practical examples of how to integrate the A/B testing components into your existing pages and components.

## 🏠 Home Page Integration

### Hero Section
```tsx
// app/page.tsx
import HeroCTA from '@/app/components/ab/HeroCTA';
import LocationBanner from '@/app/components/ab/LocationBanner';
import { useAppointmentLogger } from '@/app/hooks/useAppointmentLogger';

export default function HomePage() {
  const { logAppointmentCTA } = useAppointmentLogger();

  const handleAppointmentClick = () => {
    // Your existing appointment logic
    openAppointmentModal();
  };

  return (
    <div>
      {/* Optional location banner */}
      <LocationBanner />
      
      {/* Hero section */}
      <section className="hero">
        <h1>Expert Neurosurgery in Hyderabad</h1>
        <p>Minimally invasive brain & spine surgery</p>
        
        {/* A/B tested hero CTA */}
        <HeroCTA 
          onClick={handleAppointmentClick}
          defaultText="Book Consultation"
          defaultStyle="primary"
        />
      </section>
      
      {/* Rest of your page content */}
    </div>
  );
}
```

## 📱 Mobile Sticky CTA

### Add to Layout
```tsx
// app/layout.tsx
import StickyCTA from '@/app/components/ab/StickyCTA';

export default function RootLayout({ children }) {
  const handleStickyAppointment = () => {
    // Your appointment logic
    openAppointmentModal();
  };

  return (
    <html lang="en">
      <body>
        <StatsigClientProvider>
          {/* Your existing content */}
          {children}
          
          {/* Mobile sticky CTA */}
          <StickyCTA onClick={handleStickyAppointment} />
        </StatsigClientProvider>
      </body>
    </html>
  );
}
```

## 🏥 Service Pages Integration

### Service Page Example
```tsx
// app/services/endoscopic-spine-surgery/page.tsx
import HeroCTA from '@/app/components/ab/HeroCTA';
import { useAppointmentLogger } from '@/app/hooks/useAppointmentLogger';

export default function EndoscopicSpineSurgeryPage() {
  const { logAppointmentCTA } = useAppointmentLogger();

  const handleAppointmentClick = () => {
    logAppointmentCTA('hero');
    openAppointmentModal();
  };

  return (
    <div>
      <section className="hero">
        <h1>Endoscopic Spine Surgery in Hyderabad</h1>
        <p>Minimally invasive spine procedures</p>
        
        <HeroCTA 
          onClick={handleAppointmentClick}
          defaultText="Book Consultation"
          defaultStyle="primary"
        />
      </section>
      
      {/* Rest of service content */}
    </div>
  );
}
```

## 📋 Appointment Form Integration

### Form Event Tracking
```tsx
// app/components/AppointmentForm.tsx
import { useAppointmentLogger } from '@/app/hooks/useAppointmentLogger';
import { useState } from 'react';

export default function AppointmentForm() {
  const { logAppointmentStart, logAppointmentSuccess } = useAppointmentLogger();
  const [isFormOpen, setIsFormOpen] = useState(false);

  const openForm = () => {
    logAppointmentStart(); // Log when form opens
    setIsFormOpen(true);
  };

  const handleSubmit = async (formData) => {
    try {
      // Your form submission logic
      await submitAppointment(formData);
      
      // Log successful booking
      logAppointmentSuccess('in-person'); // or 'tele' for telehealth
      
      // Show success message
      showSuccessMessage();
    } catch (error) {
      // Handle error
      console.error('Appointment booking failed:', error);
    }
  };

  return (
    <div>
      <button onClick={openForm}>
        Book Appointment
      </button>
      
      {isFormOpen && (
        <form onSubmit={handleSubmit}>
          {/* Your form fields */}
        </form>
      )}
    </div>
  );
}
```

## 📞 Contact Method Tracking

### Phone & WhatsApp Integration
```tsx
// app/components/ContactMethods.tsx
import { useContactLogger } from '@/app/hooks/useContactLogger';

export default function ContactMethods() {
  const { logCallClick, logWhatsAppClick, logDirectionsClick } = useContactLogger();

  return (
    <div className="contact-methods">
      <a 
        href="tel:+91-1234567890"
        onClick={logCallClick}
        className="contact-link"
      >
        📞 Call Now
      </a>
      
      <a 
        href="https://wa.me/911234567890"
        onClick={logWhatsAppClick}
        className="contact-link"
      >
        💬 WhatsApp
      </a>
      
      <a 
        href="https://maps.google.com/..."
        onClick={logDirectionsClick}
        className="contact-link"
      >
        🗺️ Directions
      </a>
    </div>
  );
}
```

## 🧭 Navigation CTA Integration

### Header Navigation
```tsx
// app/components/Header.tsx
import { useAppointmentLogger } from '@/app/hooks/useAppointmentLogger';

export default function Header() {
  const { logAppointmentCTA } = useAppointmentLogger();

  const handleHeaderAppointment = () => {
    logAppointmentCTA('header');
    openAppointmentModal();
  };

  return (
    <header>
      <nav>
        <a href="/">Home</a>
        <a href="/services">Services</a>
        <a href="/about">About</a>
        
        {/* Header CTA */}
        <button 
          onClick={handleHeaderAppointment}
          className="header-cta"
        >
          Book Consultation
        </button>
      </nav>
    </header>
  );
}
```

## 🦶 Footer CTA Integration

### Footer Component
```tsx
// app/components/Footer.tsx
import { useAppointmentLogger } from '@/app/hooks/useAppointmentLogger';

export default function Footer() {
  const { logAppointmentCTA } = useAppointmentLogger();

  const handleFooterAppointment = () => {
    logAppointmentCTA('footer');
    openAppointmentModal();
  };

  return (
    <footer>
      <div className="footer-content">
        {/* Footer content */}
      </div>
      
      <div className="footer-cta">
        <button 
          onClick={handleFooterAppointment}
          className="footer-appointment-btn"
        >
          Schedule Consultation
        </button>
      </div>
    </footer>
  );
}
```

## 🃏 Card CTA Integration

### Service Cards
```tsx
// app/components/ServiceCard.tsx
import { useAppointmentLogger } from '@/app/hooks/useAppointmentLogger';

interface ServiceCardProps {
  title: string;
  description: string;
  service: string;
}

export default function ServiceCard({ title, description, service }: ServiceCardProps) {
  const { logAppointmentCTA } = useAppointmentLogger();

  const handleCardAppointment = () => {
    logAppointmentCTA('card');
    openAppointmentModal(service);
  };

  return (
    <div className="service-card">
      <h3>{title}</h3>
      <p>{description}</p>
      
      <button 
        onClick={handleCardAppointment}
        className="card-cta"
      >
        Learn More & Book
      </button>
    </div>
  );
}
```

## 🎯 UTM Parameter Tracking

### Enhanced Page Context
```tsx
// app/lib/pageContext.ts
import { useSearchParams } from 'next/navigation';

export function usePageContextWithUTM() {
  const searchParams = useSearchParams();
  
  const utm = {
    utm_source: searchParams.get('utm_source'),
    utm_campaign: searchParams.get('utm_campaign'),
    utm_medium: searchParams.get('utm_medium'),
    utm_term: searchParams.get('utm_term'),
    utm_content: searchParams.get('utm_content'),
  };

  return {
    ...getPageContext(window.location.pathname),
    utm: Object.fromEntries(
      Object.entries(utm).filter(([_, value]) => value !== null)
    )
  };
}
```

## 🔧 Custom Experiment Hooks

### Service-Specific Experiments
```tsx
// app/hooks/useServiceExperiments.ts
import { useExperiment, useGate } from '@statsig/react-bindings';

export function useServiceExperiments(service: string) {
  const expEnabled = useGate('web_exp_enabled')?.value ?? true;
  
  // Service-specific experiment
  const serviceExp = useExperiment(`web_exp_${service}_cta`)?.value || {};
  
  // Insurance messaging experiment
  const insuranceExp = useExperiment('web_exp_insurance_messaging')?.value || {};
  
  return {
    expEnabled,
    serviceCTA: serviceExp,
    insuranceMessage: insuranceExp,
  };
}
```

## 📊 Analytics Integration

### Google Analytics 4 Integration
```tsx
// app/lib/analytics.ts
import { useWebLogger } from '@/app/lib/ab';

export function useEnhancedAnalytics() {
  const logger = useWebLogger(getPageContext(window.location.pathname));
  
  const trackEvent = (eventName: string, parameters: Record<string, any>) => {
    // Log to Statsig
    logger.logEvent(eventName, parameters);
    
    // Also log to GA4 if needed
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', eventName, parameters);
    }
  };

  return { trackEvent };
}
```

## 🚀 Deployment Checklist

### Before Deployment
- [ ] Install dependencies: `npm install`
- [ ] Verify Statsig client key is set
- [ ] Test components render correctly
- [ ] Check event logging in Statsig console
- [ ] Verify no console errors

### After Deployment
- [ ] Create experiments in Statsig console
- [ ] Set `web_exp_enabled = true`
- [ ] Monitor event logging
- [ ] Check experiment assignment
- [ ] Verify no performance impact

### Monitoring
- [ ] Watch Core Web Vitals
- [ ] Monitor conversion rates
- [ ] Check for layout shifts
- [ ] Review error logs
- [ ] Analyze experiment performance

## 🔍 Debugging

### Debug Mode
```javascript
// Enable in browser console
localStorage.setItem('statsig-debug', 'true');

// Check experiment assignment
console.log('Current experiments:', window.statsig?.getAllExperiments());

// Check user context
console.log('User context:', window.statsig?.getUser());
```

### Common Issues
1. **Components not rendering**: Check Statsig provider is wrapping components
2. **Events not logging**: Verify client key and user context
3. **Experiments not showing**: Check gate `web_exp_enabled` is true
4. **Layout shifts**: Ensure experiment variants have consistent sizing

This integration approach ensures your A/B tests are properly tracked while maintaining the existing functionality of your site.