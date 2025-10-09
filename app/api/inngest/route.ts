// Temporarily disabled Inngest functions to fix website loading
import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({ 
    message: 'Inngest API temporarily disabled for debugging',
    status: 'maintenance'
  });
}

export async function POST() {
  return NextResponse.json({ 
    message: 'Inngest API temporarily disabled for debugging',
    status: 'maintenance'
  });
}

export async function PUT() {
  return NextResponse.json({ 
    message: 'Inngest API temporarily disabled for debugging',
    status: 'maintenance'
  });
}
