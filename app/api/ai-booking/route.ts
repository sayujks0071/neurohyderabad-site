import { NextRequest, NextResponse } from 'next/server';
import { rateLimit } from '@/src/lib/rate-limit';
import { escapeHtml } from '@/src/lib/validation';

interface BookingRequest {
  message: string;
  bookingData: {
    name?: string;
    phone?: string;
    email?: string;
    condition?: string;
    urgency?: 'routine' | 'urgent' | 'emergency';
    preferredDate?: string;
    preferredTime?: string;
    symptoms?: string[];
    previousTreatment?: string;
    insurance?: string;
  };
  pageSlug: string;
  service?: string;
  threadId?: string;
}

interface AIResponse {
  response: string;
  isEmergency: boolean;
  suggestedAction?: string;
  bookingData?: any;
  nextStep?: string;
}

const EMERGENCY_KEYWORDS = [
  'stroke', 'seizure', 'unconscious', 'severe headache', 'sudden weakness',
  'paralysis', 'loss of vision', 'severe neck pain', 'trauma', 'accident',
  'emergency', 'urgent', 'critical', 'immediate', 'can\'t move', 'numbness',
  'confusion', 'difficulty speaking', 'facial droop', 'severe dizziness'
];

const CONDITION_KEYWORDS = {
  'brain_tumor': ['brain tumor', 'tumor', 'mass', 'lesion', 'growth'],
  'spine_surgery': ['back pain', 'spine', 'disc', 'herniated', 'sciatica', 'stenosis'],
  'epilepsy': ['seizure', 'epilepsy', 'convulsion', 'fits'],
  'trigeminal_neuralgia': ['facial pain', 'trigeminal', 'neuralgia', 'jaw pain'],
  'peripheral_nerve': ['nerve pain', 'peripheral', 'carpal tunnel', 'ulnar']
};

function detectEmergency(text: string): boolean {
  const lowerText = text.toLowerCase();
  return EMERGENCY_KEYWORDS.some(keyword => lowerText.includes(keyword));
}

function detectCondition(text: string): string | null {
  const lowerText = text.toLowerCase();
  for (const [condition, keywords] of Object.entries(CONDITION_KEYWORDS)) {
    if (keywords.some(keyword => lowerText.includes(keyword))) {
      return condition;
    }
  }
  return null;
}

function extractPhoneNumber(text: string): string | null {
  const phoneRegex = /(\+91|91)?[6-9]\d{9}/;
  const match = text.match(phoneRegex);
  return match ? match[0] : null;
}

function extractEmail(text: string): string | null {
  const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/;
  const match = text.match(emailRegex);
  return match ? match[0] : null;
}

function generateAIResponse(request: BookingRequest): AIResponse {
  const { message, pageSlug, service } = request;
  const bookingData = request.bookingData || {};
  
  const isEmergency = detectEmergency(message);
  const detectedCondition = detectCondition(message);
  const phoneNumber = extractPhoneNumber(message);
  const email = extractEmail(message);

  // Emergency detection
  if (isEmergency) {
    return {
      response: "🚨 I've detected this may be an emergency situation. Please call our emergency hotline immediately at +91-9778280044 or visit the nearest emergency room. Your safety is our priority. I can still help you book an urgent appointment, but please seek immediate medical attention if needed.",
      isEmergency: true,
      suggestedAction: "Call emergency hotline immediately",
      bookingData: {
        ...bookingData,
        urgency: 'emergency',
        condition: detectedCondition || bookingData.condition,
        phone: phoneNumber || bookingData.phone,
        email: email || bookingData.email
      }
    };
  }

  // Determine conversation flow based on current state
  const hasName = bookingData.name || message.toLowerCase().includes('my name is') || message.toLowerCase().includes('i am');
  const hasPhone = bookingData.phone || phoneNumber;
  const hasCondition = bookingData.condition || detectedCondition;
  const hasUrgency = bookingData.urgency;

  // Generate contextual response
  if (!hasCondition && !hasName) {
    return {
      response: "I'd be happy to help you book an appointment with Dr. Sayuj Krishnan. Could you tell me more about your condition or symptoms? This will help me understand how urgent your appointment should be.",
      isEmergency: false,
      nextStep: 'condition',
      bookingData: {
        ...bookingData,
        condition: detectedCondition,
        phone: phoneNumber || bookingData.phone,
        email: email || bookingData.email
      }
    };
  }

  if (hasCondition && !hasUrgency) {
    return {
      response: `I understand you're dealing with ${detectedCondition ? detectedCondition.replace('_', ' ') : 'your condition'}. How urgent is your condition? Are you experiencing severe pain, or is this for a routine consultation?`,
      isEmergency: false,
      nextStep: 'urgency',
      bookingData: {
        ...bookingData,
        condition: detectedCondition || bookingData.condition,
        phone: phoneNumber || bookingData.phone,
        email: email || bookingData.email
      }
    };
  }

  if (hasUrgency && !hasPhone) {
    // 🛡️ Sentinel: Safe variable interpolation
    const safeUrgency = escapeHtml(bookingData.urgency);
    return {
      response: `Thank you. I'll mark this as a ${safeUrgency} appointment. Now, could you please provide your name and contact information? I'll need your phone number for confirmation.`,
      isEmergency: false,
      nextStep: 'details',
      bookingData: {
        ...bookingData,
        condition: detectedCondition || bookingData.condition,
        phone: phoneNumber || bookingData.phone,
        email: email || bookingData.email
      }
    };
  }

  if (hasPhone && !bookingData.preferredDate) {
    // 🛡️ Sentinel: Safe variable interpolation
    const safePhone = escapeHtml(phoneNumber || bookingData.phone);
    return {
      response: `Perfect! I have your phone number: ${safePhone}. When would you prefer to have your appointment? Dr. Sayuj's OPD hours are Monday to Saturday (10:00 AM – 1:00 PM and 5:00 PM – 7:30 PM). What day works best for you?`,
      isEmergency: false,
      nextStep: 'scheduling',
      bookingData: {
        ...bookingData,
        condition: detectedCondition || bookingData.condition,
        phone: phoneNumber || bookingData.phone,
        email: email || bookingData.email
      }
    };
  }

  // Ready to confirm
  // 🛡️ Sentinel: Safe variable interpolation
  const safeName = escapeHtml(bookingData.name || 'To be confirmed');
  const safePhone = escapeHtml(phoneNumber || bookingData.phone);
  const safeCondition = detectedCondition ? detectedCondition.replace('_', ' ') : escapeHtml(bookingData.condition || 'To be discussed');
  const safeUrgency = escapeHtml(bookingData.urgency || 'routine');
  const safeDate = escapeHtml(bookingData.preferredDate || 'To be confirmed');

  return {
    response: `Great! I have all the information I need. Let me summarize your appointment request:

• Name: ${safeName}
• Phone: ${safePhone}
• Condition: ${safeCondition}
• Urgency: ${safeUrgency}
• Preferred Date: ${safeDate}

Our coordinator will call you within one working day to confirm your appointment slot. Is there anything else I can help you with?`,
    isEmergency: false,
    nextStep: 'confirmation',
    bookingData: {
      ...bookingData,
      condition: detectedCondition || bookingData.condition,
      phone: phoneNumber || bookingData.phone,
      email: email || bookingData.email
    }
  };
}

export async function POST(request: NextRequest) {
  // 🛡️ Sentinel: Rate limiting
  const ip = request.headers.get("x-forwarded-for") ?? "unknown";
  const limit = rateLimit(ip, 20, 60 * 1000); // 20 requests per minute

  if (!limit.success) {
    return NextResponse.json(
      { error: "Too many requests. Please try again later." },
      { status: 429 }
    );
  }

  try {
    const body: BookingRequest = await request.json();
    
    // 🛡️ Sentinel: Input validation
    if (!body.message) {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      );
    }

    if (body.message.length > 2000) {
      return NextResponse.json(
        { error: 'Message too long (max 2000 characters)' },
        { status: 400 }
      );
    }

    if (body.bookingData) {
      for (const [key, val] of Object.entries(body.bookingData)) {
        if (typeof val === 'string' && val.length > 100) {
           return NextResponse.json(
             { error: `Field '${key}' too long (max 100 characters)` },
             { status: 400 }
           );
        }
      }
    }

    // Generate AI response
    const aiResponse = generateAIResponse(body);

    // Log the interaction (in a real implementation, you'd save this to a database)
    console.log('AI Booking Interaction:', {
      timestamp: new Date().toISOString(),
      pageSlug: body.pageSlug,
      service: body.service,
      message: body.message,
      isEmergency: aiResponse.isEmergency,
      bookingData: aiResponse.bookingData
    });

    return NextResponse.json(aiResponse);

  } catch (error) {
    console.error('Error processing AI booking request:', error);
    return NextResponse.json(
      { 
        error: 'Internal server error',
        response: "I apologize, but I'm having trouble processing your request right now. Please call us directly at +91-9778280044 for immediate assistance."
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    message: 'AI Booking API is running',
    version: '1.0.0',
    features: [
      'Emergency detection',
      'Condition classification',
      'Appointment scheduling',
      'Contact extraction',
      'Conversational flow'
    ]
  });
}
