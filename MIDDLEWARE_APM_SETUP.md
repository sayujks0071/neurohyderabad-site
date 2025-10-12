# Middleware.io APM Setup Guide

## ✅ Installation Complete

The Middleware.io APM monitoring has been successfully integrated into your Next.js application.

## 🔧 Configuration

### Environment Variables
Add these to your `.env.local` file:

```bash
# Middleware.io APM Configuration
MIDDLEWARE_SERVICE_NAME=neurosurgery-nextjs-site
MIDDLEWARE_ACCESS_TOKEN=your_middleware_access_token_here
```

### Get Your Access Token
1. Go to [Middleware.io Dashboard](https://middleware.io/dashboard)
2. Create a new project or select existing one
3. Copy your access token
4. Add it to your environment variables

## 📊 Usage Examples

### Server-Side Logging
```typescript
import APMLogger from '@/src/lib/apm';

// In your API routes or server components
APMLogger.info('User visited homepage', { userId: '123' });
APMLogger.warn('High memory usage detected', { memory: '85%' });
APMLogger.error('Database connection failed', { error: 'timeout' });
```

### Client-Side Logging
```typescript
import APMLogger from '@/src/lib/apm';

// In your React components
const handleButtonClick = () => {
  APMLogger.trackUserAction('consultation_button_clicked', {
    page: 'homepage',
    section: 'hero'
  });
};
```

### Page View Tracking
```typescript
import APMLogger from '@/src/lib/apm';

// Track page views
useEffect(() => {
  APMLogger.trackPageView('/services/brain-tumor-surgery', {
    referrer: document.referrer,
    userAgent: navigator.userAgent
  });
}, []);
```

## 🚀 API Endpoints

### Health Check
```
GET /api/apm-logs
```

### Log Submission
```
POST /api/apm-logs
Content-Type: application/json

{
  "level": "info|warn|error",
  "message": "Your log message",
  "data": { "key": "value" }
}
```

## 📁 Files Created

- `instrumentation.ts` - APM initialization
- `app/api/apm-logs/route.ts` - Logging API endpoint
- `src/lib/apm.ts` - APM utility functions
- `src/types/middleware.d.ts` - TypeScript declarations
- `next.config.mjs` - Updated with APM configuration

## 🔍 Monitoring

Once deployed with your access token, you'll be able to monitor:

- **Performance Metrics**: Response times, throughput
- **Error Tracking**: Application errors and exceptions
- **Custom Events**: User interactions and business metrics
- **Real-time Logs**: Application logs and debugging info

## 🚀 Deployment

1. Add your `MIDDLEWARE_ACCESS_TOKEN` to Vercel environment variables
2. Deploy your application
3. Check the Middleware.io dashboard for incoming data

## 📈 Next Steps

1. **Set up alerts** in Middleware.io dashboard
2. **Create custom dashboards** for key metrics
3. **Add more tracking** throughout your application
4. **Monitor performance** and optimize based on data

Your APM monitoring is now ready! 🎉










