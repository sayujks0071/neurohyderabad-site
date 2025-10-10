# Inngest Setup Guide for Dr. Sayuj Krishnan's Website

## ✅ Installation Complete

Inngest has been successfully integrated into your Next.js application for reliable background job processing and event-driven workflows.

## 🔧 Configuration

### Environment Variables
Add these to your `.env.local` file:

```bash
# Inngest Configuration
INNGEST_EVENT_KEY=your_inngest_event_key_here
INNGEST_SIGNING_KEY=your_inngest_signing_key_here
```

### Get Your Inngest Keys
1. Go to [Inngest Dashboard](https://app.inngest.com)
2. Create a new app or select existing one
3. Copy your Event Key and Signing Key
4. Add them to your environment variables

## 📁 Files Created

- `src/lib/inngest.ts` - Main Inngest client and event types
- `app/api/inngest/route.ts` - API endpoint for Inngest functions
- `src/lib/inngest/functions/appointment-reminder.ts` - Production functions
- `src/lib/inngest/functions/test-functions.ts` - Test functions including hello-world
- `src/lib/inngest/events.ts` - Event sending utilities
- `app/api/test-inngest/route.ts` - Test API endpoint
- `app/test-inngest/page.tsx` - Test dashboard page

## 🚀 Usage Examples

### 1. Send Events from Your Application

```typescript
import { InngestEvents } from '@/src/lib/inngest/events';

// When a new appointment is created
await InngestEvents.appointmentCreated({
  appointmentId: "apt_123",
  patientName: "John Doe",
  patientEmail: "john@example.com",
  appointmentDate: "2025-10-15T10:00:00Z",
  appointmentType: "consultation"
});

// When someone submits a contact form
await InngestEvents.contactForm({
  name: "Jane Smith",
  email: "jane@example.com",
  phone: "+91-9876543210",
  message: "I need a consultation for my back pain",
  source: "homepage",
  timestamp: new Date().toISOString()
});

// Test functions (for development)
await InngestEvents.testHelloWorld({
  email: "test@drsayuj.com"
});

await InngestEvents.testAppointmentFlow({
  patientName: "Test Patient",
  patientEmail: "test@example.com"
});
```

### 2. Use in API Routes

```typescript
// app/api/appointments/route.ts
import { InngestEvents } from '@/src/lib/inngest/events';

export async function POST(request: Request) {
  const appointmentData = await request.json();
  
  // Create appointment in your database
  const appointment = await createAppointment(appointmentData);
  
  // Send event to trigger background processes
  await InngestEvents.appointmentCreated({
    appointmentId: appointment.id,
    patientName: appointment.patientName,
    patientEmail: appointment.patientEmail,
    appointmentDate: appointment.date,
    appointmentType: appointment.type
  });
  
  return Response.json({ success: true, appointment });
}
```

### 3. Track Analytics Events

```typescript
// In your React components
import { InngestEvents } from '@/src/lib/inngest/events';

const handleConsultationClick = async () => {
  // Track the conversion
  await InngestEvents.conversion({
    conversionType: "consultation",
    page: "/services/brain-tumor-surgery",
    value: 5000, // Estimated consultation value
    timestamp: new Date().toISOString()
  });
  
  // Navigate to appointment page
  router.push('/appointments');
};
```

## 🔄 Background Functions

### Appointment Reminders
The system automatically handles:
- **24-hour reminders** before appointments
- **1-hour reminders** before appointments
- **Confirmation emails** when appointments are created
- **Follow-up sequences** after procedures

### Contact Form Processing
- **Automatic responses** to contact form submissions
- **Lead scoring** and qualification
- **Integration** with CRM systems
- **Follow-up sequences** for potential patients

## 📊 Monitoring

### Inngest Dashboard
- **Function executions** and success rates
- **Error tracking** and debugging
- **Performance metrics** and optimization
- **Event history** and replay capabilities

### Local Development
```bash
# Install Inngest CLI
npm install -g inngest-cli

# Start local development server
inngest-cli dev

# Your functions will be available at:
# http://localhost:8288
```

## 🚀 Deployment

### Vercel Deployment
1. Add your Inngest keys to Vercel environment variables
2. Deploy your application
3. Your functions will be available at: `https://your-domain.com/api/inngest`

### Production Setup
1. **Configure webhooks** in Inngest dashboard
2. **Set up monitoring** and alerts
3. **Test functions** in staging environment
4. **Monitor performance** in production

## 🎯 Common Use Cases

### Medical Website Workflows
- **Appointment scheduling** and confirmations
- **Patient onboarding** sequences
- **Follow-up care** reminders
- **Insurance verification** processes
- **Referral tracking** and management
- **Analytics** and reporting

### Example Workflows
```typescript
// Patient journey automation
appointmentCreated → sendConfirmation → scheduleReminders → 
followUpSequence → patientSatisfactionSurvey

// Lead nurturing
contactForm → qualificationCheck → personalizedFollowUp → 
appointmentScheduling → conversionTracking
```

## 🔧 Customization

### Adding New Functions
1. Create new function files in `src/lib/inngest/functions/`
2. Import and register them in `app/api/inngest/route.ts`
3. Define event types in `src/lib/inngest.ts`
4. Add utility functions in `src/lib/inngest/events.ts`

### Error Handling
- **Automatic retries** with exponential backoff
- **Dead letter queues** for failed events
- **Error notifications** and monitoring
- **Graceful degradation** for service outages

## 📈 Next Steps

1. **Set up your Inngest account** and get API keys
2. **Configure environment variables** in Vercel
3. **Test functions** in development
4. **Deploy to production** and monitor
5. **Add more workflows** as needed

Your Inngest setup is ready for reliable background processing! 🎉
