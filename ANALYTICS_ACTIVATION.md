# 🚀 Analytics Activation Guide

## 📊 **Quick Setup (Choose One)**

### **Option 1: Google Analytics 4 (Recommended)**
Create or update `.env.local`:
```bash
NEXT_PUBLIC_GA4_MEASUREMENT_ID=G-XXXXXXXXXX
```

### **Option 2: Statsig (Alternative)**
Create or update `.env.local`:
```bash
NEXT_PUBLIC_STATSIG_CLIENT_KEY=client-6rsFaE0Of4SIMTVQ5J4l560K8ciY7v4wkWTXqPjD5RP
```

## 🎯 **What Will Start Tracking Immediately**

### **Automatic Events**
- ✅ **Page Views**: Every page navigation with page type detection
- ✅ **Scroll Depth**: 25%, 50%, 75%, 90%, 100% milestones
- ✅ **Core Web Vitals**: CLS, INP, FCP, LCP, TTFB
- ✅ **Error Tracking**: JavaScript errors and form validation issues

### **CTA Click Tracking**
- ✅ **Phone Clicks**: All phone number interactions
- ✅ **WhatsApp Clicks**: WhatsApp contact buttons
- ✅ **Appointment Clicks**: Booking form initiations

### **Conversion Funnel**
- ✅ **Awareness**: Page views, scroll depth
- ✅ **Interest**: CTA clicks, phone clicks
- ✅ **Consideration**: Form starts, FAQ interactions
- ✅ **Action**: Form submissions, appointment bookings
- ✅ **Conversion**: Successful appointments, phone calls

## 📈 **Expected Tracking Data**

### **Page View Events**
```javascript
analytics.pageView('/services/spinal-fusion', 'service', 'spinal_fusion')
```

### **Scroll Depth Events**
```javascript
analytics.scrollDepth('/services/spinal-fusion', 50)  // 50% scroll
analytics.scrollDepth('/services/spinal-fusion', 75)  // 75% scroll
```

### **CTA Click Events**
```javascript
analytics.phoneClick('/services/spinal-fusion', 'main')
analytics.whatsAppClick('/services/spinal-fusion')
analytics.appointmentStart('/services/spinal-fusion', 'spinal_fusion')
```

### **Core Web Vitals**
```javascript
analytics.coreWebVitals('LCP', 2.1, '/services/spinal-fusion')
analytics.coreWebVitals('CLS', 0.05, '/services/spinal-fusion')
```

## 🔧 **Verification Steps**

### **1. Add Environment Variable**
```bash
# Create .env.local file
echo "NEXT_PUBLIC_GA4_MEASUREMENT_ID=G-XXXXXXXXXX" > .env.local
```

### **2. Restart Development Server**
```bash
npm run dev
```

### **3. Check Browser Console**
Open browser dev tools and look for:
```
Analytics Event: Page_View {page_slug: "/", page_type: "home", ...}
Analytics Event: Scroll_Depth {page_slug: "/", depth_percentage: 50, ...}
```

### **4. Test CTA Tracking**
Click any CTA button and verify console logs:
```
Analytics Event: Phone_Click {page_slug: "/", phone_type: "main", ...}
Analytics Event: WhatsApp_Click {page_slug: "/", ...}
```

## 📊 **Dashboard Setup**

### **Google Analytics 4**
1. Go to [Google Analytics](https://analytics.google.com)
2. Create new GA4 property
3. Get Measurement ID (G-XXXXXXXXXX)
4. Add to `.env.local`
5. View real-time events in GA4 dashboard

### **Statsig Dashboard**
1. Go to [Statsig Console](https://console.statsig.com)
2. Get Client Key from project settings
3. Add to `.env.local`
4. View events in Statsig dashboard

## 🎯 **Key Metrics to Monitor**

### **Engagement Metrics**
- **Scroll_50 Rate**: >60% (user engagement)
- **Scroll_75 Rate**: >40% (deep engagement)
- **Page Views**: Track popular content

### **Conversion Metrics**
- **CTA Click Rate**: >5% (conversion interest)
- **Phone Click Rate**: Track contact method preference
- **Appointment Start Rate**: Form initiation tracking

### **Performance Metrics**
- **LCP**: <2.5s (loading performance)
- **CLS**: <0.1 (visual stability)
- **INP**: <200ms (interaction responsiveness)

## 🚀 **Next Steps After Activation**

1. **Monitor for 24-48 hours** to establish baseline metrics
2. **Identify conversion bottlenecks** in the funnel
3. **Optimize low-performing CTAs** based on click data
4. **Improve content engagement** based on scroll depth
5. **Enhance performance** based on Core Web Vitals

## 🔍 **Troubleshooting**

### **No Events Tracking**
- Check environment variable is set correctly
- Verify `.env.local` file exists in project root
- Restart development server after changes

### **Missing CTA Events**
- Ensure CTA components have onClick handlers
- Check browser console for JavaScript errors
- Verify analytics consent is enabled

### **Performance Issues**
- Check for excessive event firing
- Verify scroll tracking is throttled
- Monitor Core Web Vitals impact

---

**Ready to activate!** Just add the environment variable and restart the server. The tracking will start immediately! 🎯
