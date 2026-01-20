import { NextRequest, NextResponse } from 'next/server';
import { sendAppointmentRequestEmail } from '@/lib/email';
import { rateLimit } from '@/src/lib/rate-limit';

// 🛡️ Sentinel: Input length limits to prevent DoS
const MAX_NAME_LENGTH = 100;
const MAX_EMAIL_LENGTH = 254;
const MAX_PHONE_LENGTH = 20;
const MAX_MESSAGE_LENGTH = 5000;
const MAX_GENERIC_LENGTH = 500; // For condition, urgency, etc.

function sanitizeInput(input: string): string {
  // Basic trimming and removing null bytes
  return input.trim().replace(/\0/g, '');
}

export async function POST(request: NextRequest) {
  // 🛡️ Sentinel: Rate limiting - 5 requests per 60 seconds per IP
  const ip = request.headers.get("x-forwarded-for") ?? "unknown";
  const limit = rateLimit(ip, 5, 60 * 1000);

  if (!limit.success) {
    return NextResponse.json(
      { success: false, error: "Too many requests. Please try again later." },
      { status: 429 }
    );
  }

  try {
    const body = await request.json();
    
    // Validate required fields
    if (!body.name || !body.email || !body.phone) {
      return NextResponse.json({ 
        success: false, 
        error: 'Missing required fields: name, email, phone' 
      }, { status: 400 });
    }

    // 🛡️ Sentinel: Type Validation (Prevent crashes on non-string input)
    if (typeof body.name !== 'string') {
        return NextResponse.json({ success: false, error: 'Invalid input type: name must be a string' }, { status: 400 });
    }
    if (typeof body.email !== 'string') {
        return NextResponse.json({ success: false, error: 'Invalid input type: email must be a string' }, { status: 400 });
    }
    if (typeof body.phone !== 'string') {
        return NextResponse.json({ success: false, error: 'Invalid input type: phone must be a string' }, { status: 400 });
    }
    if (body.preferredDate && typeof body.preferredDate !== 'string') {
        return NextResponse.json({ success: false, error: 'Invalid input type: preferredDate must be a string' }, { status: 400 });
    }
    if (body.condition && typeof body.condition !== 'string') {
        return NextResponse.json({ success: false, error: 'Invalid input type: condition must be a string' }, { status: 400 });
    }
    if (body.urgency && typeof body.urgency !== 'string') {
        return NextResponse.json({ success: false, error: 'Invalid input type: urgency must be a string' }, { status: 400 });
    }
    if (body.message && typeof body.message !== 'string') {
        return NextResponse.json({ success: false, error: 'Invalid input type: message must be a string' }, { status: 400 });
    }

    // 🛡️ Sentinel: Input Length Validation (DoS Prevention)
    if (body.name.length > MAX_NAME_LENGTH) {
      return NextResponse.json({ success: false, error: 'Name is too long' }, { status: 400 });
    }
    if (body.email.length > MAX_EMAIL_LENGTH) {
      return NextResponse.json({ success: false, error: 'Email is too long' }, { status: 400 });
    }
    if (body.phone.length > MAX_PHONE_LENGTH) {
      return NextResponse.json({ success: false, error: 'Phone number is too long' }, { status: 400 });
    }
    if (body.message && body.message.length > MAX_MESSAGE_LENGTH) {
      return NextResponse.json({ success: false, error: 'Message is too long' }, { status: 400 });
    }
    if (body.condition && body.condition.length > MAX_GENERIC_LENGTH) {
      return NextResponse.json({ success: false, error: 'Condition text is too long' }, { status: 400 });
    }
    if (body.urgency && body.urgency.length > MAX_GENERIC_LENGTH) {
      return NextResponse.json({ success: false, error: 'Urgency text is too long' }, { status: 400 });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.email)) {
      return NextResponse.json({ 
        success: false, 
        error: 'Invalid email format' 
      }, { status: 400 });
    }

    // Validate phone format (basic validation)
    const phoneRegex = /^[\+]?[0-9\s\-\(\)]{10,}$/;
    if (!phoneRegex.test(body.phone)) {
      return NextResponse.json({ 
        success: false, 
        error: 'Invalid phone format' 
      }, { status: 400 });
    }

    // 🛡️ Sentinel: Sanitize inputs
    const result = await sendAppointmentRequestEmail({
      name: sanitizeInput(body.name),
      email: sanitizeInput(body.email),
      phone: sanitizeInput(body.phone),
      preferredDate: body.preferredDate ? sanitizeInput(body.preferredDate) : undefined,
      condition: body.condition ? sanitizeInput(body.condition) : undefined,
      urgency: body.urgency ? sanitizeInput(body.urgency) : undefined,
      message: body.message ? sanitizeInput(body.message) : undefined
    });
    
    if (result.success) {
      return NextResponse.json({ 
        success: true, 
        message: 'Appointment request submitted successfully!',
        adminMessageId: 'adminMessageId' in result ? result.adminMessageId : undefined,
        patientMessageId: 'patientMessageId' in result ? result.patientMessageId : undefined 
      });
    } else {
      return NextResponse.json({ 
        success: false, 
        error: result.error 
      }, { status: 500 });
    }
  } catch (error) {
    console.error('Appointment request error:', error);
    return NextResponse.json({ 
      success: false, 
      error: 'Failed to submit appointment request' 
    }, { status: 500 });
  }
}
