/**
 * Google Search Console and Bing Webmaster Tools Integration
 * Handles sitemap submission and indexing requests
 */

import { NextRequest, NextResponse } from 'next/server';

const GOOGLE_SEARCH_CONSOLE_API = 'https://searchconsole.googleapis.com/v1';
const BING_WEBMASTER_API = 'https://ssl.bing.com/webmaster/api.svc/json';
const SITE_URL = 'https://www.drsayuj.info';

// URLs to submit for indexing
const PRIORITY_URLS = [
  '/',
  '/services',
  '/services/minimally-invasive-spine-surgery',
  '/services/endoscopic-discectomy-hyderabad',
  '/services/brain-tumor-surgery-hyderabad',
  '/conditions',
  '/conditions/herniated-disc-treatment-hyderabad',
  '/conditions/sciatica-pain-treatment-hyderabad',
  '/about',
  '/appointments',
  '/contact',
  '/locations/malakpet',
  '/neurosurgeon-hyderabad',
  '/best-neurosurgeon-in-hyderabad',
  '/blog'
];

export async function GET(request: NextRequest) {
  return NextResponse.json({
    message: 'Search Console API endpoint',
    sitemaps: [
      `${SITE_URL}/sitemap.xml`,
      `${SITE_URL}/sitemap-blog.xml`,
      `${SITE_URL}/sitemap-services.xml`,
      `${SITE_URL}/sitemap-conditions.xml`,
      `${SITE_URL}/sitemap-locations.xml`,
      `${SITE_URL}/sitemap-images.xml`,
      `${SITE_URL}/sitemap-videos.xml`,
    ],
    priority_urls: PRIORITY_URLS.map(url => `${SITE_URL}${url}`),
    instructions: {
      google: {
        verification: 'Add this to NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION env variable',
        searchConsole: 'https://search.google.com/search-console',
        steps: [
          '1. Go to Google Search Console',
          '2. Add property: www.drsayuj.info',
          '3. Verify using HTML meta tag',
          '4. Submit all sitemaps',
          '5. Request indexing for priority URLs'
        ]
      },
      bing: {
        verification: 'Add this to NEXT_PUBLIC_BING_SITE_VERIFICATION env variable',
        webmasterTools: 'https://www.bing.com/webmasters',
        steps: [
          '1. Go to Bing Webmaster Tools',
          '2. Add site: www.drsayuj.info',
          '3. Verify using HTML meta tag',
          '4. Submit all sitemaps',
          '5. Submit priority URLs'
        ]
      },
      yandex: {
        webmaster: 'https://webmaster.yandex.com',
        steps: [
          '1. Add site to Yandex Webmaster',
          '2. Verify ownership',
          '3. Submit sitemap'
        ]
      },
      duckduckgo: {
        note: 'DuckDuckGo uses Bing results, optimization for Bing covers DuckDuckGo'
      }
    }
  });
}

// Endpoint to trigger indexing (call after deployment)
export async function POST(request: NextRequest) {
  try {
    const { action } = await request.json();
    
    if (action === 'ping_sitemaps') {
      // DEPRECATED: Google's unauthenticated ping endpoint was deprecated on June 26, 2023
      // Use the Google Search Console API instead via scripts/google-seo-automation.ts
      // Bing still supports ping, but Google requires authenticated API submission
      const bingPing = `https://www.bing.com/ping?sitemap=${encodeURIComponent(`${SITE_URL}/sitemap.xml`)}`;
      
      return NextResponse.json({
        success: true,
        message: 'Sitemap notification',
        note: 'Google ping endpoint is deprecated. Use GSC API for Google submissions.',
        google: {
          deprecated: true,
          message: 'Use Google Search Console API instead',
          script: 'scripts/google-seo-automation.ts --sitemap'
        },
        bing: {
          pingUrl: bingPing,
          note: 'Bing still supports ping endpoint'
        }
      });
    }
    
    if (action === 'generate_schema_test') {
      // Generate schema testing URL
      const schemaTestUrl = `https://search.google.com/test/rich-results?url=${encodeURIComponent(SITE_URL)}`;
      
      return NextResponse.json({
        success: true,
        message: 'Test your structured data',
        schemaTest: schemaTestUrl,
        validatorUrl: 'https://validator.schema.org/'
      });
    }
    
    return NextResponse.json({
      success: false,
      message: 'Invalid action specified'
    }, { status: 400 });
    
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: 'Failed to process indexing request'
    }, { status: 500 });
  }
}
