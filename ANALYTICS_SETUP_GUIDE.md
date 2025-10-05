# 📊 Analytics Setup Guide - Dr. Sayuj Krishnan Website

## 🎯 **Current Analytics Status**

### **Implemented Features**
- ✅ **Scroll Tracking**: Scroll_25, Scroll_50, Scroll_75, Scroll_90, Scroll_100
- ✅ **Core Web Vitals**: CLS, INP, FCP, LCP, TTFB tracking
- ✅ **Error Tracking**: JavaScript errors and unhandled promise rejections
- ✅ **Page View Tracking**: Automatic page type and service/condition detection
- ✅ **Privacy-Safe Implementation**: Consent-based tracking with value masking

### **Pending Configuration**
- ⏳ **Statsig SDK Key**: Needs to be provided or fallback to GA4
- ⏳ **CTA Click Tracking**: Needs to be implemented on key CTAs
- ⏳ **Form Interaction Tracking**: Enhanced form analytics

## 🔧 **Statsig Configuration Options**

### **Option 1: Provide Statsig SDK Key**
Add to `.env.local`:
```bash
NEXT_PUBLIC_STATSIG_CLIENT_KEY=your-actual-statsig-key-here
```

### **Option 2: Fallback to Google Analytics 4**
Add to `.env.local`:
```bash
NEXT_PUBLIC_GA4_MEASUREMENT_ID=G-XXXXXXXXXX
```

## 📈 **Implemented Analytics Events**

### **Automatic Tracking**
```javascript
// Page Views
analytics.pageView('/services/spinal-fusion', 'service', 'spinal_fusion')

// Scroll Depth
analytics.scrollDepth('/services/spinal-fusion', 50)  // 50% scroll
analytics.scrollDepth('/services/spinal-fusion', 75)  // 75% scroll

// Core Web Vitals
analytics.coreWebVitals('LCP', 2.1, '/services/spinal-fusion')
analytics.coreWebVitals('CLS', 0.05, '/services/spinal-fusion')

// Error Tracking
analytics.formError('/appointments', 'email', 'validation_error')
```

### **Manual CTA Tracking**
```javascript
// Hero CTA Clicks
analytics.heroCTAClick('/services/spinal-fusion', 'Book Consultation', 'spinal_fusion')

// Phone Clicks
analytics.phoneClick('/services/spinal-fusion', 'main')

// WhatsApp Clicks
analytics.whatsAppClick('/services/spinal-fusion')

// Appointment Form
analytics.appointmentStart('/services/spinal-fusion', 'spinal_fusion')
analytics.appointmentSubmit('/services/spinal-fusion', 0)  // 0 errors
analytics.appointmentSuccess('/services/spinal-fusion', 'spinal_fusion')
```

## 🎯 **CTA Tracking Implementation**

### **Key CTAs to Track**
1. **Hero CTAs**: "Book Consultation", "Learn More", "Get Directions"
2. **Sticky CTAs**: Floating action buttons
3. **Navigation CTAs**: Header and footer links
4. **Phone Numbers**: All clickable phone numbers
5. **WhatsApp Links**: WhatsApp contact buttons
6. **Appointment Forms**: Form interactions and submissions

### **Implementation Example**
```tsx
// In a CTA component
import { analytics } from '@/src/lib/analytics';

const handleCTAClick = (ctaLabel: string) => {
  analytics.heroCTAClick(pathname, ctaLabel, serviceOrCondition);
  // ... rest of click handler
};

<button onClick={() => handleCTAClick('Book Consultation')}>
  Book Consultation
</button>
```

## 📊 **Analytics Dashboard Setup**

### **Statsig Dashboard**
If using Statsig, create these custom events:
- `Page_View` - Page navigation tracking
- `Scroll_Depth` - User engagement measurement
- `Core_Web_Vitals` - Performance monitoring
- `Hero_CTA_Click` - Primary conversion tracking
- `Phone_Click` - Contact method tracking
- `Appointment_Start` - Form initiation
- `Appointment_Submit` - Form completion
- `Appointment_Success` - Conversion completion

### **Google Analytics 4 Setup**
If using GA4, configure these custom events:
- `page_view` - Enhanced page tracking
- `scroll` - Scroll depth measurement
- `web_vitals` - Core Web Vitals
- `cta_click` - Call-to-action interactions
- `phone_click` - Phone number clicks
- `form_start` - Form initiation
- `form_submit` - Form submission
- `conversion` - Appointment booking success

## 🎯 **Conversion Funnel Tracking**

### **Funnel Stages**
1. **Awareness**: Page views, scroll depth
2. **Interest**: CTA clicks, phone clicks
3. **Consideration**: Form starts, FAQ interactions
4. **Action**: Form submissions, appointment bookings
5. **Conversion**: Successful appointments, phone calls

### **Key Metrics to Monitor**
- **Engagement Rate**: Scroll_50 / Page_View
- **CTA Conversion Rate**: CTA_Click / Page_View
- **Form Completion Rate**: Appointment_Submit / Appointment_Start
- **Overall Conversion Rate**: Appointment_Success / Page_View

## 🔒 **Privacy & Compliance**

### **Consent Management**
```javascript
// Check consent before tracking
const hasConsent = localStorage.getItem('analytics-consent') === 'true';
if (!hasConsent) return;
```

### **Data Masking**
```javascript
// Sensitive data is automatically masked
analytics.formError('/appointments', 'email', 'validation_error');
// Becomes: analytics.formError('/appointments', 'masked_field', 'validation_error');
```

## 📱 **Mobile-Specific Tracking**

### **Device Detection**
```javascript
// Automatic device detection
analytics.pageView('/services/spinal-fusion', 'service', 'spinal_fusion');
// Includes: device: 'mobile' | 'desktop' | 'tablet'
```

### **Mobile CTA Optimization**
- Track mobile-specific CTA performance
- Monitor mobile scroll depth patterns
- Optimize for mobile conversion paths

## 🚀 **Implementation Checklist**

### **Phase 1: Basic Setup**
- [ ] Configure Statsig SDK key OR GA4 measurement ID
- [ ] Verify scroll tracking is working
- [ ] Test Core Web Vitals tracking
- [ ] Confirm error tracking functionality

### **Phase 2: CTA Tracking**
- [ ] Add tracking to hero CTAs
- [ ] Implement phone click tracking
- [ ] Add WhatsApp click tracking
- [ ] Track appointment form interactions

### **Phase 3: Advanced Analytics**
- [ ] Set up conversion funnels
- [ ] Configure custom dashboards
- [ ] Implement A/B testing framework
- [ ] Add cohort analysis

### **Phase 4: Optimization**
- [ ] Analyze conversion bottlenecks
- [ ] Optimize low-performing CTAs
- [ ] Improve form completion rates
- [ ] Enhance mobile experience

## 📊 **Expected Results**

### **30-Day Targets**
- **Scroll_50 Rate**: >60% (user engagement)
- **CTA Click Rate**: >5% (conversion interest)
- **Form Completion Rate**: >40% (conversion action)
- **Overall Conversion Rate**: >2% (appointment bookings)

### **90-Day Targets**
- **Scroll_50 Rate**: >70%
- **CTA Click Rate**: >7%
- **Form Completion Rate**: >50%
- **Overall Conversion Rate**: >3%

## 🔧 **Troubleshooting**

### **Common Issues**
1. **No Events Tracking**: Check SDK key configuration
2. **Missing Scroll Events**: Verify scroll tracking implementation
3. **CTA Clicks Not Recording**: Ensure onClick handlers are properly attached
4. **Form Events Missing**: Check form submission handlers

### **Debug Mode**
```javascript
// Enable debug logging in development
if (process.env.NODE_ENV === 'development') {
  console.log('Analytics Event:', eventName, enrichedProps);
}
```

---

**Next Steps**: Choose between Statsig or GA4, implement CTA tracking, and monitor conversion funnel performance. The foundation is solid - now it's time to optimize for conversions! 🎯
