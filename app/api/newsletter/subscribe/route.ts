import { NextRequest, NextResponse } from 'next/server';
import { sendNewsletterSubscriptionEmail } from '@/lib/email';
import { rateLimit } from '@/src/lib/rate-limit';

export async function POST(request: NextRequest) {
  // 🛡️ Sentinel: Rate limiting - 5 requests per 60 seconds per IP to prevent email spam/DoS
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

      const messageId = "messageId" in result ? result.messageId : undefined;
      return NextResponse.json({
        success: true,
        message: 'Successfully subscribed to newsletter',
        ...(messageId ? { messageId } : {}),
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
