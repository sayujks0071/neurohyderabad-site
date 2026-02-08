import { NextRequest, NextResponse } from 'next/server';
import { generateObject } from 'ai';
import { z } from 'zod';
import { getTextModel, hasAIConfig } from '@/src/lib/ai/gateway';
import { DR_SAYUJ_SYSTEM_PROMPT } from '@/src/lib/ai/prompts';

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

// Renamed fallback function
function generateRuleBasedResponse(request: BookingRequest): AIResponse {
  const { message, bookingData, pageSlug, service } = request;
  
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
    return {
      response: `Thank you. I'll mark this as a ${bookingData.urgency} appointment. Now, could you please provide your name and contact information? I'll need your phone number for confirmation.`,
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
    return {
      response: `Perfect! I have your phone number: ${phoneNumber || bookingData.phone}. When would you prefer to have your appointment? Dr. Sayuj's OPD hours are Monday to Saturday (10:00 AM – 1:00 PM and 5:00 PM – 7:30 PM). What day works best for you?`,
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
  return {
    response: `Great! I have all the information I need. Let me summarize your appointment request:

• Name: ${bookingData.name || 'To be confirmed'}
• Phone: ${phoneNumber || bookingData.phone}
• Condition: ${detectedCondition ? detectedCondition.replace('_', ' ') : bookingData.condition || 'To be discussed'}
• Urgency: ${bookingData.urgency || 'routine'}
• Preferred Date: ${bookingData.preferredDate || 'To be confirmed'}

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
  let body: BookingRequest;

  try {
    body = await request.json();
    
    if (!body.message) {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      );
    }

    // 1. FAST PATH: Rule-based Emergency Detection
    // We check this first to ensure 0 latency for critical keywords
    if (detectEmergency(body.message)) {
      console.log('Use Fast Path: Emergency detected');
      const emergencyResponse = generateRuleBasedResponse(body);
      return NextResponse.json(emergencyResponse);
    }

    // 2. AI PATH: Use Vercel AI Gateway if configured
    if (hasAIConfig()) {
      try {
        const { object } = await generateObject({
          model: getTextModel(),
          schema: aiBookingSchema,
          messages: [
            {
              role: 'system',
              content: `${DR_SAYUJ_SYSTEM_PROMPT}

You are an intelligent booking assistant. Your goal is to help the user book an appointment by extracting the necessary information.

CURRENT BOOKING STATE:
${JSON.stringify(body.bookingData, null, 2)}

INSTRUCTIONS:
1. Extract any new information from the user's message and update the booking data.
2. If the user mentions a medical condition, classify it.
3. If the user mentions symptoms like severe pain, update urgency.
4. If the user provides a phone number, extract it.
5. Determine the next logical step (condition -> urgency -> details -> scheduling -> confirmation).
6. Provide a natural, empathetic response guiding them to the next step.
7. Dr. Sayuj's OPD hours are Mon-Sat (10AM-1PM & 5PM-7:30PM).

OUTPUT FORMAT:
Return a JSON object matching the schema.
`
            },
            {
              role: 'user',
              content: body.message
            }
          ],
          temperature: 0.3, // Lower temperature for more consistent data extraction
        });

        // Merge the AI extracted data with existing data to ensure nothing is lost
        // (though we passed existing data to AI, we double check)
        const mergedBookingData = {
          ...body.bookingData,
          ...object.bookingData,
        };

        // Log the interaction
        console.log('AI Booking Interaction (Gateway):', {
          timestamp: new Date().toISOString(),
          pageSlug: body.pageSlug,
          service: body.service,
          message: body.message,
          isEmergency: object.isEmergency,
          bookingData: mergedBookingData
        });

        return NextResponse.json({
          ...object,
          bookingData: mergedBookingData
        });

      } catch (error) {
        console.error('AI Gateway failed, falling back to rule-based:', error);
        // Fallthrough to rule-based
      }
    }

    // 3. FALLBACK: Rule-based logic
    // Used if AI is not configured or fails
    console.log('Using Rule-based fallback');
    const ruleBasedResponse = generateRuleBasedResponse(body);

    // Log the interaction
    console.log('Rule-based Interaction:', {
      timestamp: new Date().toISOString(),
      pageSlug: body.pageSlug,
      service: body.service,
      message: body.message,
      isEmergency: ruleBasedResponse.isEmergency,
      bookingData: ruleBasedResponse.bookingData
    });

    return NextResponse.json(ruleBasedResponse);

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
