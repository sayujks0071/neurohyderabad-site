import { NextRequest, NextResponse } from 'next/server';
import { sendAppointmentRequestEmail } from '@/lib/email';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate required fields
    if (!body.name || !body.email || !body.phone) {
      return NextResponse.json({ 
        success: false, 
        error: 'Missing required fields: name, email, phone' 
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

    // Validate phone format (basic validation)
    const phoneRegex = /^[\+]?[0-9\s\-\(\)]{10,}$/;
    if (!phoneRegex.test(body.phone)) {
      return NextResponse.json({ 
        success: false, 
        error: 'Invalid phone format' 
      }, { status: 400 });
    }

    const result = await sendAppointmentRequestEmail({
      name: body.name,
      email: body.email,
      phone: body.phone,
      preferredDate: body.preferredDate,
      condition: body.condition,
      urgency: body.urgency,
      message: body.message
    });
    
    if (result.success) {
      return NextResponse.json({ 
        success: true, 
        message: 'Appointment request submitted successfully!',
        adminMessageId: result.adminMessageId,
        patientMessageId: result.patientMessageId 
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
