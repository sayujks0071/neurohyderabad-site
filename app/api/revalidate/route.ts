import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import crypto from 'crypto';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const secret = searchParams.get('secret');
  const path = searchParams.get('path');
  const expectedToken = process.env.REVALIDATE_TOKEN;

  // 🛡️ Sentinel: Use constant-time comparison to prevent timing attacks
  let isValid = false;
  if (secret && expectedToken && secret.length === expectedToken.length) {
    const secretBuffer = Buffer.from(secret);
    const expectedBuffer = Buffer.from(expectedToken);
    isValid = crypto.timingSafeEqual(secretBuffer, expectedBuffer);
  }

  // Check for secret to confirm this is a valid request
  if (!isValid) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    );
  }

  if (!path) {
    return NextResponse.json(
      { error: 'Path is required' },
      { status: 400 }
    );
  }

  try {
    // Revalidate the specific path
    revalidatePath(path);
    
    return NextResponse.json({
      revalidated: true,
      path,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Error revalidating' },
      { status: 500 }
    );
  }
}