# Statsig Setup Guide for Medical Practice

## 🎯 Overview
This guide will help you complete the Statsig setup for your medical practice website, including analytics, session replay, and A/B testing.

## 📦 Installed Packages
- `@statsig/react-bindings` - Official React integration
- `@statsig/session-replay` - User session recording
- `@statsig/web-analytics` - Web analytics and tracking

## 🔧 Configuration Steps

### 1. Get Your Statsig Client Key
1. Go to [Statsig Dashboard](https://console.statsig.com/)
2. Navigate to your project settings
3. Copy your **Client Key** (starts with `client-`)

### 2. Add Environment Variable
Add your Statsig client key to your environment variables:

```bash
# Add to your Vercel environment variables
NEXT_PUBLIC_STATSIG_CLIENT_KEY=client-your-key-here
```

### 3. Configure Vercel Environment Variables
1. Go to your Vercel dashboard
2. Navigate to your project settings
3. Go to "Environment Variables"
4. Add: `NEXT_PUBLIC_STATSIG_CLIENT_KEY` with your client key

## 🚀 Features Enabled

### **Analytics & Tracking**
- ✅ **Page Views** - Track all page visits
- ✅ **User Interactions** - Clicks, hovers, scrolls
- ✅ **Performance Metrics** - Core Web Vitals (LCP, INP, CLS, FCP, TTFB)
- ✅ **Error Tracking** - JavaScript errors and unhandled rejections
- ✅ **Custom Events** - Medical practice specific tracking

### **Session Replay**
- ✅ **User Sessions** - Record user interactions
- ✅ **Console Logs** - Capture console output
- ✅ **Network Requests** - Track API calls
- ✅ **Error Capture** - Record errors in context
- ✅ **Privacy Protection** - Mask sensitive data

### **A/B Testing & Feature Flags**
- ✅ **Feature Flags** - Toggle features on/off
- ✅ **Experiments** - A/B test different versions
- ✅ **User Segmentation** - Target specific user groups
- ✅ **Gradual Rollouts** - Safe feature deployments

## 📊 Medical Practice Specific Tracking

### **Appointment Tracking**
```typescript
import { useStatsig } from '../hooks/useStatsig';

const { trackAppointmentBooking } = useStatsig();

// Track appointment booking
trackAppointmentBooking('contact-form', 'brain-surgery');
```

### **Service Inquiries**
```typescript
const { trackServiceInquiry } = useStatsig();

// Track service inquiry
trackServiceInquiry('endoscopic-spine-surgery', 'phone-call');
```

### **Contact Form Tracking**
```typescript
const { trackContactForm } = useStatsig();

// Track form submission
trackContactForm('appointment-request', true);
```

### **Phone Call Tracking**
```typescript
const { trackPhoneCall } = useStatsig();

// Track phone call clicks
trackPhoneCall('+91-9778280044');
```

## 🎨 A/B Testing Examples

### **Test Different CTA Buttons**
```typescript
import { useABTesting } from '../hooks/useStatsig';

const { getExperimentVariant } = useABTesting();
const variant = getExperimentVariant('cta-button-test');

return (
  <button className={variant === 'red' ? 'bg-red-600' : 'bg-blue-600'}>
    {variant === 'red' ? 'Book Now' : 'Schedule Consultation'}
  </button>
);
```

### **Test Different Headlines**
```typescript
const { getExperimentVariant } = useABTesting();
const variant = getExperimentVariant('headline-test');

const headline = variant === 'A' 
  ? 'Best Neurosurgeon in Hyderabad'
  : 'Expert Brain & Spine Surgery in Hyderabad';
```

## 📈 Dashboard Setup

### **1. Create Custom Events**
In your Statsig dashboard, create these custom events:
- `appointment_booking`
- `service_inquiry`
- `contact_form_submit`
- `phone_call`
- `email_click`
- `web_vital`
- `error_occurred`

### **2. Set Up Funnels**
Create conversion funnels to track:
- **Appointment Funnel:** Page View → Service Inquiry → Contact Form → Appointment Booking
- **Engagement Funnel:** Page View → Scroll → Click → Form Submission

### **3. Configure Alerts**
Set up alerts for:
- High error rates
- Performance degradation
- Conversion rate changes
- User engagement drops

## 🔒 Privacy & Compliance

### **Data Protection**
- ✅ **Text Masking** - Sensitive text is automatically masked
- ✅ **Input Masking** - Form inputs are protected
- ✅ **GDPR Compliance** - Built-in privacy controls
- ✅ **Medical Data Protection** - HIPAA-compliant settings

### **Session Replay Privacy**
```typescript
// Privacy settings in StatsigSessionReplay.tsx
options: {
  maskText: true,        // Mask all text
  maskInputs: true,      // Mask form inputs
  enabled: process.env.NODE_ENV === 'production' // Only in production
}
```

## 📊 Expected Benefits

### **SEO & Performance**
- **Real-time Performance Monitoring** - Track Core Web Vitals
- **User Experience Insights** - Understand user behavior
- **Conversion Optimization** - Improve appointment bookings
- **Technical Issue Detection** - Catch problems early

### **Business Intelligence**
- **Patient Journey Analysis** - Track user paths
- **Service Popularity** - See which services are most inquired about
- **Geographic Insights** - Understand where patients come from
- **Conversion Rate Optimization** - Improve booking rates

### **A/B Testing Benefits**
- **CTA Optimization** - Test different call-to-action buttons
- **Content Testing** - Optimize headlines and descriptions
- **Form Optimization** - Improve contact form conversion
- **Page Layout Testing** - Test different page structures

## 🚀 Next Steps

1. **Add your Statsig client key** to environment variables
2. **Deploy the changes** to see analytics in action
3. **Set up custom events** in your Statsig dashboard
4. **Create conversion funnels** for appointment tracking
5. **Start A/B testing** different page elements

## 📞 Support

- [Statsig Documentation](https://docs.statsig.com/)
- [React Integration Guide](https://docs.statsig.com/client/react)
- [Session Replay Setup](https://docs.statsig.com/features/session-replay)
- [A/B Testing Guide](https://docs.statsig.com/features/experiments)

Your medical practice website now has enterprise-level analytics, session replay, and A/B testing capabilities! 🎉
