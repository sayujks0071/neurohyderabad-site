import { NextRequest, NextResponse } from 'next/server';
import { sendContactFormEmail } from '@/lib/email';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate required fields
    if (!body.name || !body.email || !body.message) {
      return NextResponse.json({ 
        success: false, 
        error: 'Missing required fields: name, email, message' 
      }, { status: 400 });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.email)) {
      return NextResponse.json({ 
        success: false, 
        error: 'Invalid email format' 
      }, { status: 400 });
    }

    const result = await sendContactFormEmail({
      name: body.name,
      email: body.email,
      phone: body.phone,
      message: body.message,
      subject: body.subject
    });
    
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
