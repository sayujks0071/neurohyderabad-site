import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const secret = searchParams.get('secret');
  const path = searchParams.get('path');

  // Check for secret to confirm this is a valid request
  if (secret !== process.env.REVALIDATE_TOKEN) {
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