// Temporarily disabled for debugging
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  return NextResponse.json({ 
    message: 'Test API temporarily disabled for debugging',
    status: 'maintenance'
  });
}

export async function GET() {
  return NextResponse.json({ 
    message: 'Test API temporarily disabled for debugging',
    status: 'maintenance'
  });
}

