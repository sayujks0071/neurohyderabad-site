import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { generateObject } from 'ai';
import { rateLimit } from '@/src/lib/rate-limit';
import { escapeHtml } from '@/src/lib/validation';
import { getTextModel } from '@/src/lib/ai/gateway';

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
    painScore?: number;
    mriScanAvailable?: boolean;
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

// Zod Schema for Structured Output
const aiBookingSchema = z.object({
  response: z.string().describe("The natural language response to the user."),
  isEmergency: z.boolean().describe("Whether the situation is a medical emergency."),
  suggestedAction: z.string().optional().describe("Suggested action, e.g., 'Call emergency hotline immediately'."),
  bookingData: z.object({
    name: z.string().optional(),
    phone: z.string().optional(),
    email: z.string().optional(),
    condition: z.string().optional(),
    urgency: z.enum(['routine', 'urgent', 'emergency']).optional(),
    preferredDate: z.string().optional(),
    preferredTime: z.string().optional(),
    symptoms: z.array(z.string()).optional(),
    previousTreatment: z.string().optional(),
    insurance: z.string().optional(),
    painScore: z.number().min(1).max(10).optional(),
    mriScanAvailable: z.boolean().optional(),
  }).optional().describe("Updated booking data extracted from the conversation."),
  nextStep: z.string().optional().describe("The next step in the flow: 'condition', 'urgency', 'details', 'scheduling', 'confirmation', or null."),
});

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

async function generateAIResponse(request: BookingRequest): Promise<AIResponse> {
  const { message } = request;
  const bookingData = request.bookingData || {};
  
  const isEmergency = detectEmergency(message);
  const detectedCondition = detectCondition(message);
  const phoneNumber = extractPhoneNumber(message);
  const email = extractEmail(message);

  // Fast-path Emergency detection (Rule-based)
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

  // Use Vercel AI Gateway for intelligent conversation flow
  try {
    const { object } = await generateObject({
      model: getTextModel('gpt-4o-mini'),
      schema: aiBookingSchema,
      prompt: `You are a helpful medical appointment booking assistant for Dr. Sayuj Krishnan, a neurosurgeon.
Your goal is to help patients book an appointment by collecting necessary information.

Current Booking State:
${JSON.stringify(bookingData, null, 2)}

User Message: "${message}"

Detected Entities (for reference):
- Phone: ${phoneNumber || 'None'}
- Email: ${email || 'None'}
- Condition Hint: ${detectedCondition || 'None'}

Instructions:
1. Extract any new information from the user message. Update bookingData fields.
2. If the user provides a phone number or email, ensure it is captured in bookingData.
3. Determine the next step in the flow:
   - 'condition': If condition is unknown, ask about symptoms.
   - 'urgency': If urgency is unknown, ask about pain levels (1-10) and if they have any recent MRI scans.
   - 'details': If name/phone/email are missing, ask for them.
   - 'scheduling': If date/time are missing, ask for preference (OPD hours: Mon-Sat 10am-1pm, 5pm-7:30pm).
   - 'confirmation': If all key info (name, phone, condition, urgency, painScore, mriScanAvailable, date) is present, summarize and ask to confirm.
4. Be empathetic and professional. Dr. Sayuj is a specialist.
5. If the user asks unrelated medical questions, politely guide them back to booking or suggest a consultation.

Output strictly valid JSON matching the schema.`,
      temperature: 0.3, // Low temperature for consistent structured output
    });

    // Merge extracted data with existing data, preferring new non-null values
    const newBookingData = {
      ...bookingData,
      ...object.bookingData,
      // Ensure regex-extracted entities are preserved if AI missed them but didn't overwrite them
      phone: object.bookingData?.phone || phoneNumber || bookingData.phone,
      email: object.bookingData?.email || email || bookingData.email,
      condition: object.bookingData?.condition || detectedCondition || bookingData.condition,
    };

    return {
      ...object,
      bookingData: newBookingData
    };

  } catch (error) {
    console.error("AI Generation failed, falling back to rule-based logic", error);
    // Fallback logic if AI fails (simplified version of original rule-based logic)
    return {
      response: "I apologize, I'm having trouble processing that. Could you please provide your name and phone number so we can contact you directly?",
      isEmergency: false,
      bookingData: bookingData,
      nextStep: 'details'
    };
  }
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
    const body = await request.json();
    
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
    const aiResponse = await generateAIResponse(body);

    // Log the interaction
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
    version: '2.0.0', // Bumped version
    features: [
      'Vercel AI Gateway Integration',
      'Structured Data Extraction (zod)',
      'Fast Path Emergency Detection',
      'Rule-based Fallback',
      'Condition classification',
      'Appointment scheduling'
    ]
  });
}
