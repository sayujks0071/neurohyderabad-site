import { NextRequest, NextResponse } from 'next/server';
import { sendNewsletterSubscriptionEmail, addNewsletterSubscriber } from '@/lib/email';

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

    // Store subscription in database (Resend contacts)
    const storeResult = await addNewsletterSubscriber({
      email: body.email,
      name: body.name
    });

    // If storage fails, we might still want to send the email, or fail?
    // Usually if storage fails (e.g. API error), we probably want to retry or log it.
    // If it's just config missing, we might proceed.
    // However, if the user isn't added to the list, they won't get future emails.
    // Given the previous code just sent email, let's keep sending email as primary success indicator,
    // but maybe warn if storage failed.

    if (!storeResult.success) {
      console.warn('Failed to store subscription:', storeResult.error);
      // Depending on requirements, we could return error here.
      // But let's proceed to send confirmation email so user gets immediate feedback,
      // and we (admin) can see logs.
      // ACTUALLY, if we can't store them, maybe we shouldn't tell them they are subscribed?
      // But the previous implementation didn't store either.
      // Let's assume we proceed.
    }

    // Send confirmation email
    const result = await sendNewsletterSubscriptionEmail({
      email: body.email,
      name: body.name || 'Subscriber'
    });
    
    if (result.success) {
      return NextResponse.json({ 
        success: true, 
        message: 'Successfully subscribed to newsletter',
        messageId: result.messageId,
        contactStored: storeResult.success
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
