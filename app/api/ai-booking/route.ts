import { NextRequest, NextResponse } from 'next/server';
import { generateObject } from 'ai';
import { z } from 'zod';
import { getTextModel, hasAIConfig } from '@/src/lib/ai/gateway';

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

// -------------------------------------------------------------------------
// LEGACY LOGIC (Fallback)
// -------------------------------------------------------------------------

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

// -------------------------------------------------------------------------
// NEW AI LOGIC (Vercel AI Gateway)
// -------------------------------------------------------------------------

const bookingDataSchema = z.object({
  name: z.string().optional().describe("The patient's full name"),
  phone: z.string().optional().describe("Indian phone number (+91 or 10 digits)"),
  email: z.string().optional().describe("Email address"),
  condition: z.string().optional().describe("Medical condition or main complaint (e.g. brain tumor, back pain)"),
  urgency: z.enum(['routine', 'urgent', 'emergency']).optional().describe("Urgency level"),
  preferredDate: z.string().optional().describe("Preferred appointment date (natural language or YYYY-MM-DD)"),
  preferredTime: z.string().optional().describe("Preferred time of day"),
  symptoms: z.array(z.string()).optional().describe("List of symptoms mentioned"),
  previousTreatment: z.string().optional().describe("Any previous treatments mentioned"),
  insurance: z.string().optional().describe("Insurance provider if mentioned"),
});

const aiResponseSchema = z.object({
  response: z.string().describe("A polite, professional response from Dr. Sayuj's receptionist. Keep it concise (under 50 words)."),
  isEmergency: z.boolean().describe("True if the user describes a life-threatening emergency (stroke, unconsciousness, etc)"),
  suggestedAction: z.string().optional().describe("Action to take (e.g., 'Call emergency hotline immediately')"),
  bookingData: bookingDataSchema.describe("Updated booking data based on the conversation"),
  nextStep: z.enum(['condition', 'urgency', 'details', 'scheduling', 'confirmation']).optional().describe("The next step in the booking flow"),
});

async function generateLLMResponse(request: BookingRequest): Promise<AIResponse> {
  const { message, bookingData, service } = request;

  const systemPrompt = `You are the friendly and professional medical receptionist for Dr. Sayuj Krishnan, a leading neurosurgeon.
Your goal is to help patients book appointments.
Current context: Service page related to "${service || 'General Neurosurgery'}".

Booking Process Steps:
1. Understand the condition/symptoms.
2. Assess urgency (Ask if they have severe pain if not clear).
3. Get patient details (Name, Phone).
4. Schedule a time (Dr. Sayuj's OPD: Mon-Sat 10am-1pm & 5pm-7:30pm).
5. Confirm the request.

Current Booking State:
${JSON.stringify(bookingData, null, 2)}

User's Latest Message: "${message}"

Instructions:
- Update the booking state with any new information provided.
- If the user describes a medical emergency (stroke, paralysis, unconsciousness), set isEmergency=true immediately.
- Be empathetic but efficient.
- If information is missing, ask for it in the 'response' field.
- If a date is mentioned (e.g., "next monday"), normalize it if possible or keep the natural text.
- Determine the 'nextStep' based on what is missing.
`;

  const result = await generateObject({
    model: getTextModel(), // Uses Gateway default (gpt-4o-mini usually)
    schema: aiResponseSchema,
    system: systemPrompt,
    messages: [
      { role: 'user', content: message }
    ],
    temperature: 0.3, // Keep it focused
  });

  return result.object;
}


// -------------------------------------------------------------------------
// MAIN HANDLER
// -------------------------------------------------------------------------

export async function POST(request: NextRequest) {
  try {
    const body: BookingRequest = await request.json();
    
    if (!body.message) {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      );
    }

    // 1. Fast Emergency Check (Regex) - Safety First
    // If regex detects emergency, return immediately without waiting for LLM
    if (detectEmergency(body.message)) {
      console.log('Emergency detected via regex fast-path');
      return NextResponse.json({
        response: "🚨 I've detected this may be an emergency situation. Please call our emergency hotline immediately at +91-9778280044 or visit the nearest emergency room. Your safety is our priority.",
        isEmergency: true,
        suggestedAction: "Call emergency hotline immediately",
        bookingData: {
          ...body.bookingData,
          urgency: 'emergency',
        }
      });
    }

    // 2. Try LLM Generation (Vercel AI Gateway)
    if (hasAIConfig()) {
      try {
        const aiResponse = await generateLLMResponse(body);

        // Log interaction
        console.log('AI Booking Interaction (LLM):', {
          timestamp: new Date().toISOString(),
          isEmergency: aiResponse.isEmergency,
          nextStep: aiResponse.nextStep
        });

        return NextResponse.json(aiResponse);

      } catch (llmError) {
        console.error('LLM Generation failed, falling back to rule-based:', llmError);
        // Fallthrough to rule-based
      }
    }

    // 3. Fallback to Rule-Based Logic
    // Used if AI Gateway is not configured OR if LLM call fails
    const fallbackResponse = generateRuleBasedResponse(body);
    console.log('AI Booking Interaction (Fallback):', {
       timestamp: new Date().toISOString(),
       method: 'rule-based'
    });
    return NextResponse.json(fallbackResponse);

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
    version: '2.0.0',
    features: [
      'Vercel AI Gateway Integration',
      'LLM-powered Natural Language Understanding',
      'Emergency detection (Regex + LLM)',
      'Condition classification',
      'Appointment scheduling',
      'Contact extraction',
      'Conversational flow'
    ]
  });
}
