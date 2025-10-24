import { NextRequest, NextResponse } from 'next/server';
import { sendTestEmail } from '@/lib/email';

export async function POST(request: NextRequest) {
  try {
    const result = await sendTestEmail();
    
    if (result.success) {
      return NextResponse.json({ 
        success: true, 
        message: 'Test email sent successfully!',
        messageId: result.messageId 
      });
    } else {
      return NextResponse.json({ 
        success: false, 
        error: result.error 
      }, { status: 500 });
    }
  } catch (error) {
    console.error('Test email error:', error);
    return NextResponse.json({ 
      success: false, 
      error: 'Failed to send test email' 
    }, { status: 500 });
  }
}
