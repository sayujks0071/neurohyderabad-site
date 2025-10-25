import { NextResponse } from 'next/server';
import { getAllServiceUTMLinks, UTM_CHANNELS } from '../../../lib/utm-generator';

/**
 * API endpoint to get service UTM links across channels
 * GET /api/utm-links
 */
export async function GET() {
  try {
    const { services, common } = getAllServiceUTMLinks();
    
    const utmLinks = {
      services,
      common,
      channels: UTM_CHANNELS,
      metadata: {
        generated_at: new Date().toISOString(),
        total_services: services.length,
        base_url: 'https://www.drsayuj.info'
      }
    };

    return NextResponse.json(utmLinks, {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'public, max-age=3600' // Cache for 1 hour
      }
    });
  } catch (error) {
    console.error('Error generating UTM links:', error);
    return NextResponse.json(
      { error: 'Failed to generate UTM links' },
      { status: 500 }
    );
  }
}
