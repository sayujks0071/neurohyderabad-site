import { NextRequest, NextResponse } from 'next/server';
import { sendNewsletterSubscriptionEmail } from '@/lib/email';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate email
    if (!body.email) {
      return NextResponse.json({ 
        success: false, 
        error: 'Email is required' 
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

    // Send confirmation email
    const result = await sendNewsletterSubscriptionEmail({
      email: body.email,
      name: body.name || 'Subscriber'
    });
    
    if (result.success) {
      // TODO: Store subscription in database (e.g., Resend contacts, Mailchimp, etc.)
      // For now, just send confirmation email
      
      return NextResponse.json({ 
        success: true, 
        message: 'Successfully subscribed to newsletter',
        messageId: result.messageId 
      });
    } else {
      return NextResponse.json({ 
        success: false, 
        error: result.error || 'Failed to subscribe' 
      }, { status: 500 });
    }
  } catch (error) {
    console.error('Newsletter subscription error:', error);
    return NextResponse.json({ 
      success: false, 
      error: 'Failed to process subscription' 
    }, { status: 500 });
  }
}


























