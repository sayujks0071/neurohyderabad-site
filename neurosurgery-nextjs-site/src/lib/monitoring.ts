// Monitoring and Alerting Configuration
export const MONITORING_CONFIG = {
  // Performance thresholds for alerts
  performance: {
    lcp: 2500, // Largest Contentful Paint (ms)
    fid: 100,  // First Input Delay (ms)
    cls: 0.1,  // Cumulative Layout Shift
    fcp: 1800, // First Contentful Paint (ms)
    ttfb: 600  // Time to First Byte (ms)
  },
  
  // Error thresholds
  errors: {
    maxErrorRate: 0.01, // 1% error rate
    max404Rate: 0.05,   // 5% 404 rate
    maxTimeoutRate: 0.02 // 2% timeout rate
  },
  
  // SEO monitoring
  seo: {
    maxPageLoadTime: 3000, // 3 seconds
    minAccessibilityScore: 90,
    minSeoScore: 85,
    minPerformanceScore: 80
  }
};

// Alert functions
export const createAlert = (type: string, message: string, severity: 'low' | 'medium' | 'high') => {
  const alert = {
    type,
    message,
    severity,
    timestamp: new Date().toISOString(),
    url: typeof window !== 'undefined' ? window.location.href : 'server'
  };
  
  // Log to console in development
  if (process.env.NODE_ENV === 'development') {
    console.warn(`[${severity.toUpperCase()}] ${type}: ${message}`, alert);
  }
  
  // Send to monitoring service in production
  if (process.env.NODE_ENV === 'production') {
    // You can integrate with services like:
    // - Sentry for error tracking
    // - DataDog for performance monitoring
    // - Custom webhook for alerts
    sendToMonitoringService(alert);
  }
  
  return alert;
};

// Send to monitoring service (implement based on your choice)
const sendToMonitoringService = async (alert: any) => {
  try {
    // Example: Send to custom webhook
    if (process.env.MONITORING_WEBHOOK_URL) {
      await fetch(process.env.MONITORING_WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(alert)
      });
    }
  } catch (error) {
    console.error('Failed to send alert to monitoring service:', error);
  }
};

// Performance monitoring
export const monitorPerformance = (metric: any) => {
  const { name, value } = metric;
  const thresholds = MONITORING_CONFIG.performance;
  
  let severity: 'low' | 'medium' | 'high' = 'low';
  let message = '';
  
  switch (name) {
    case 'LCP':
      if (value > thresholds.lcp) {
        severity = value > thresholds.lcp * 1.5 ? 'high' : 'medium';
        message = `LCP is ${value}ms (threshold: ${thresholds.lcp}ms)`;
      }
      break;
    case 'FID':
      if (value > thresholds.fid) {
        severity = value > thresholds.fid * 2 ? 'high' : 'medium';
        message = `FID is ${value}ms (threshold: ${thresholds.fid}ms)`;
      }
      break;
    case 'CLS':
      if (value > thresholds.cls) {
        severity = value > thresholds.cls * 2 ? 'high' : 'medium';
        message = `CLS is ${value} (threshold: ${thresholds.cls})`;
      }
      break;
  }
  
  if (message) {
    createAlert('performance', message, severity);
  }
};

// SEO monitoring
export const monitorSEO = (data: any) => {
  const { pageLoadTime, accessibilityScore, seoScore, performanceScore } = data;
  const thresholds = MONITORING_CONFIG.seo;
  
  if (pageLoadTime > thresholds.maxPageLoadTime) {
    createAlert('seo', `Page load time is ${pageLoadTime}ms (threshold: ${thresholds.maxPageLoadTime}ms)`, 'medium');
  }
  
  if (accessibilityScore < thresholds.minAccessibilityScore) {
    createAlert('seo', `Accessibility score is ${accessibilityScore} (threshold: ${thresholds.minAccessibilityScore})`, 'high');
  }
  
  if (seoScore < thresholds.minSeoScore) {
    createAlert('seo', `SEO score is ${seoScore} (threshold: ${thresholds.minSeoScore})`, 'high');
  }
  
  if (performanceScore < thresholds.minPerformanceScore) {
    createAlert('seo', `Performance score is ${performanceScore} (threshold: ${thresholds.minPerformanceScore})`, 'medium');
  }
};
