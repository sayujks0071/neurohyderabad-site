# Statsig MCP Integration for www.drsayuj.com

## 🎯 Overview
This guide will help you connect your neurosurgery website (www.drsayuj.com) to Statsig MCP for comprehensive analytics, session replay, and A/B testing.

## 🔧 Current Setup Status

### ✅ Already Configured
- **Statsig React Bindings**: `@statsig/react-bindings` installed
- **Session Replay**: `@statsig/session-replay` installed  
- **Web Analytics**: `@statsig/web-analytics` installed
- **Provider Setup**: `StatsigClientProvider` configured
- **Analytics Component**: `StatsigAnalytics` tracking page views and performance
- **Vercel Environment**: `NEXT_PUBLIC_STATSIG_CLIENT_KEY` variable exists

### ⚠️ Missing Configuration
- **Client Key**: Need to add your actual Statsig client key
- **Session Replay**: Needs proper initialization
- **Custom Events**: Medical practice specific tracking

## 🚀 Step-by-Step Setup

### Step 1: Get Your Statsig Client Key

1. **Go to Statsig Console**: https://console.statsig.com/
2. **Navigate to Project Settings**
3. **Copy your Client Key** (starts with `client-`)
4. **Keep this key secure** - don't commit it to version control

### Step 2: Configure Environment Variables

#### Local Development
Add to your `.env.local` file:
```bash
NEXT_PUBLIC_STATSIG_CLIENT_KEY=client-your-actual-key-here
```

#### Production (Vercel)
The environment variable is already set up in Vercel. You just need to update it with your actual key.

### Step 3: Update Session Replay Component

The current `StatsigSessionReplay.tsx` needs proper initialization. Here's the updated version:

```typescript
'use client';

import { useEffect } from 'react';
import { useStatsigClient } from '@statsig/react-bindings';

export default function StatsigSessionReplay() {
  const client = useStatsigClient();

  useEffect(() => {
    if (!client) return;

    // Initialize session replay when Statsig client is available
    const initSessionReplay = async () => {
      try {
        const { initSessionReplay } = await import('@statsig/session-replay');
        
        initSessionReplay({
          // Privacy settings for medical practice
          maskText: true,        // Mask all text for privacy
          maskInputs: true,      // Mask form inputs
          enabled: process.env.NODE_ENV === 'production', // Only in production
          
          // Medical practice specific settings
          blockClass: 'no-record', // Block elements with this class
          ignoreClass: 'ignore-record', // Ignore elements with this class
          
          // Performance settings
          sampleRate: 0.1, // Record 10% of sessions
          maxSessionLength: 30 * 60 * 1000, // 30 minutes max
        });
        
        console.log('✅ Statsig Session Replay initialized');
      } catch (error) {
        console.error('❌ Failed to initialize session replay:', error);
      }
    };

    initSessionReplay();
  }, [client]);

  return null;
}
```

### Step 4: Medical Practice Specific Tracking

Create custom events for your medical practice:

```typescript
// Add to your analytics library
export const medicalPracticeEvents = {
  // Appointment tracking
  trackAppointmentBooking: (source: string, service: string) => {
    analytics.customEvent('appointment_booking', {
      source,
      service,
      timestamp: new Date().toISOString(),
      page: window.location.pathname
    });
  },

  // Service inquiry tracking
  trackServiceInquiry: (service: string, method: string) => {
    analytics.customEvent('service_inquiry', {
      service,
      method,
      timestamp: new Date().toISOString(),
      page: window.location.pathname
    });
  },

  // Phone call tracking
  trackPhoneCall: (phoneNumber: string, source: string) => {
    analytics.customEvent('phone_call', {
      phone_number: phoneNumber,
      source,
      timestamp: new Date().toISOString(),
      page: window.location.pathname
    });
  },

  // Contact form tracking
  trackContactForm: (formType: string, success: boolean) => {
    analytics.customEvent('contact_form', {
      form_type: formType,
      success,
      timestamp: new Date().toISOString(),
      page: window.location.pathname
    });
  }
};
```

## 📊 MCP Configuration

### Statsig MCP Server Setup

Use the configuration in `statsig-mcp-config.json`:

```json
{
  "mcpServers": {
    "statsig-local": {
      "command": "npx",
      "args": [
        "mcp-remote",
        "https://api.statsig.com/v1/mcp",
        "--header",
        "statsig-api-key:${AUTH_TOKEN}"
      ],
      "env": {
        "AUTH_TOKEN": "console-YOUR-API-KEY"
      }
    }
  }
}
```

### Website-Specific Configuration

```json
{
  "website": {
    "domain": "www.drsayuj.com",
    "project": "neurosurgery-nextjs-site",
    "environment": "production",
    "features": {
      "analytics": true,
      "sessionReplay": true,
      "experiments": true,
      "featureFlags": true
    },
    "medicalPractice": {
      "appointmentTracking": true,
      "serviceInquiries": true,
      "contactFormTracking": true,
      "phoneCallTracking": true,
      "patientJourney": true
    }
  }
}
```

## 🎯 A/B Testing Examples for Medical Practice

### Test Different CTA Buttons
```typescript
import { useStatsig } from '@statsig/react-bindings';

const { getExperimentVariant } = useStatsig();
const variant = getExperimentVariant('cta-button-test');

return (
  <button className={variant === 'red' ? 'bg-red-600' : 'bg-blue-600'}>
    {variant === 'red' ? 'Book Now' : 'Schedule Consultation'}
  </button>
);
```

### Test Different Headlines
```typescript
const { getExperimentVariant } = useStatsig();
const variant = getExperimentVariant('headline-test');

const headline = variant === 'A' 
  ? 'Best Neurosurgeon in Hyderabad'
  : 'Expert Brain & Spine Surgery in Hyderabad';
```

### Test Contact Form Layout
```typescript
const { getExperimentVariant } = useStatsig();
const variant = getExperimentVariant('contact-form-layout');

return (
  <div className={variant === 'single-column' ? 'flex-col' : 'grid grid-cols-2'}>
    {/* Form fields */}
  </div>
);
```

## 📈 Expected Analytics Data

### Page Views
- Homepage visits
- Service page views
- Condition page views
- Location page views
- Blog post views

### User Interactions
- Button clicks
- Form submissions
- Phone call clicks
- Email clicks
- Scroll depth

### Performance Metrics
- Core Web Vitals (LCP, INP, CLS, FCP, TTFB)
- Page load times
- Error rates
- User engagement

### Medical Practice Specific
- Appointment booking attempts
- Service inquiries
- Contact form completions
- Phone call conversions
- Patient journey analysis

## 🔒 Privacy & Compliance

### Data Protection
- ✅ **Text Masking**: Sensitive text automatically masked
- ✅ **Input Masking**: Form inputs protected
- ✅ **GDPR Compliance**: Built-in privacy controls
- ✅ **Medical Data Protection**: HIPAA-compliant settings

### Session Replay Privacy
```typescript
options: {
  maskText: true,        // Mask all text
  maskInputs: true,      // Mask form inputs
  enabled: process.env.NODE_ENV === 'production', // Only in production
  sampleRate: 0.1,       // Record 10% of sessions
  blockClass: 'no-record' // Block sensitive elements
}
```

## 🚀 Deployment Steps

1. **Add your Statsig client key** to `.env.local`
2. **Update Vercel environment variable** with your key
3. **Deploy the changes**:
   ```bash
   npm run build
   npx vercel --prod
   ```
4. **Verify in Statsig dashboard** that data is flowing
5. **Set up custom events** in Statsig console
6. **Create conversion funnels** for appointment tracking

## 📊 Dashboard Setup

### Custom Events to Create
- `appointment_booking`
- `service_inquiry`
- `contact_form_submit`
- `phone_call`
- `email_click`
- `web_vital`
- `error_occurred`

### Conversion Funnels
- **Appointment Funnel**: Page View → Service Inquiry → Contact Form → Appointment Booking
- **Engagement Funnel**: Page View → Scroll → Click → Form Submission

### Alerts to Set Up
- High error rates
- Performance degradation
- Conversion rate changes
- User engagement drops

## 🎉 Benefits for Your Medical Practice

### SEO & Performance
- **Real-time Performance Monitoring**: Track Core Web Vitals
- **User Experience Insights**: Understand user behavior
- **Conversion Optimization**: Improve appointment bookings
- **Technical Issue Detection**: Catch problems early

### Business Intelligence
- **Patient Journey Analysis**: Track user paths
- **Service Popularity**: See which services are most inquired about
- **Geographic Insights**: Understand where patients come from
- **Conversion Rate Optimization**: Improve booking rates

### A/B Testing Benefits
- **CTA Optimization**: Test different call-to-action buttons
- **Content Testing**: Optimize headlines and descriptions
- **Form Optimization**: Improve contact form conversion
- **Page Layout Testing**: Test different page structures

## 🔗 Useful Links

- [Statsig Dashboard](https://console.statsig.com/)
- [Statsig Documentation](https://docs.statsig.com/)
- [React Integration Guide](https://docs.statsig.com/client/react)
- [Session Replay Setup](https://docs.statsig.com/features/session-replay)
- [A/B Testing Guide](https://docs.statsig.com/features/experiments)

## ✅ Next Steps

1. **Get your Statsig client key** from the console
2. **Add it to your environment variables**
3. **Deploy the changes**
4. **Verify data is flowing** in the Statsig dashboard
5. **Set up custom events** and conversion funnels
6. **Start A/B testing** different page elements

Your neurosurgery website will then have enterprise-level analytics, session replay, and A/B testing capabilities! 🎉
