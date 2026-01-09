import { NextRequest, NextResponse } from 'next/server';
import { sendContactFormEmail } from '@/lib/email';
import { rateLimit } from '@/src/lib/rate-limit';

// 🛡️ Sentinel: Input length limits to prevent DoS (aligned with src/lib/validation.ts)
const MAX_NAME_LENGTH = 100;
const MAX_EMAIL_LENGTH = 254;
const MAX_MESSAGE_LENGTH = 5000;
const MAX_SUBJECT_LENGTH = 100;

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
    if (!body.name || !body.email || !body.message) {
      return NextResponse.json({ 
        success: false, 
        error: 'Missing required fields: name, email, message' 
      }, { status: 400 });
    }

    // 🛡️ Sentinel: Type Validation (Prevent crashes on non-string input)
    if (typeof body.name !== 'string') {
        return NextResponse.json({ success: false, error: 'Invalid input type: name must be a string' }, { status: 400 });
    }
    if (typeof body.email !== 'string') {
        return NextResponse.json({ success: false, error: 'Invalid input type: email must be a string' }, { status: 400 });
    }
    if (typeof body.message !== 'string') {
        return NextResponse.json({ success: false, error: 'Invalid input type: message must be a string' }, { status: 400 });
    }
    if (body.subject && typeof body.subject !== 'string') {
        return NextResponse.json({ success: false, error: 'Invalid input type: subject must be a string' }, { status: 400 });
    }

    // 🛡️ Sentinel: Input Length Validation (DoS Prevention)
    if (body.name.length > MAX_NAME_LENGTH) {
      return NextResponse.json({ success: false, error: 'Name is too long' }, { status: 400 });
    }
    if (body.email.length > MAX_EMAIL_LENGTH) {
      return NextResponse.json({ success: false, error: 'Email is too long' }, { status: 400 });
    }
    if (body.message.length > MAX_MESSAGE_LENGTH) {
      return NextResponse.json({ success: false, error: 'Message is too long' }, { status: 400 });
    }
    if (body.subject && body.subject.length > MAX_SUBJECT_LENGTH) {
      return NextResponse.json({ success: false, error: 'Subject is too long' }, { status: 400 });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.email)) {
      return NextResponse.json({ 
        success: false, 
        error: 'Invalid email format' 
      }, { status: 400 });
    }

    // 🛡️ Sentinel: Sanitize inputs
    const sanitizedData = {
      name: sanitizeInput(body.name),
      email: sanitizeInput(body.email),
      phone: body.phone && typeof body.phone === 'string' ? sanitizeInput(body.phone) : undefined,
      message: sanitizeInput(body.message),
      subject: body.subject ? sanitizeInput(body.subject) : undefined
    };

    const result = await sendContactFormEmail(sanitizedData);
    
    if (result.success) {
      return NextResponse.json({ 
        success: true, 
        message: 'Contact form submitted successfully!',
        messageId: result.messageId 
      });
    } else {
      return NextResponse.json({ 
        success: false, 
        error: result.error 
      }, { status: 500 });
    }
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json({ 
      success: false, 
      error: 'Failed to submit contact form' 
    }, { status: 500 });
  }
}
