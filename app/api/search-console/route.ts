/**
 * Google Search Console and Bing Webmaster Tools Integration
 * Handles sitemap submission and URL indexing requests
 * 
 * Features:
 * - Submit sitemaps to Google Search Console
 * - Request URL indexing via Google Indexing API
 * - Batch URL indexing
 * - URL inspection
 * - Sitemap status checking
 */

import { NextRequest, NextResponse } from 'next/server';
import { google } from 'googleapis';

const GOOGLE_SEARCH_CONSOLE_API = 'https://searchconsole.googleapis.com/v1';
const BING_WEBMASTER_API = 'https://ssl.bing.com/webmaster/api.svc/json';
const SITE_URL = 'https://www.drsayuj.info';

// All available sitemaps
const SITEMAPS = [
  `${SITE_URL}/sitemap.xml`,
  // Note: Individual sitemaps (blog, services, etc.) are now consolidated into main sitemap
];

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
  const { searchParams } = new URL(request.url);
  const action = searchParams.get('action');

  // Health check endpoint
  if (action === 'health') {
    const hasCredentials = !!process.env.GOOGLE_INDEXING_KEY_JSON;
    return NextResponse.json({
      status: 'ok',
      timestamp: new Date().toISOString(),
      credentialsConfigured: hasCredentials,
      siteUrl: SITE_URL,
    });
  }

  // Default: Return API information
  return NextResponse.json({
    message: 'Search Console API endpoint',
    version: '2.0',
    siteUrl: SITE_URL,
    sitemaps: SITEMAPS,
    priority_urls: PRIORITY_URLS.map(url => `${SITE_URL}${url}`),
    endpoints: {
      POST: {
        submit_sitemap: {
          description: 'Submit sitemap to Google Search Console',
          params: { action: 'submit_sitemap', sitemap: 'https://www.drsayuj.info/sitemap.xml' },
        },
        index_url: {
          description: 'Request indexing for a single URL',
          params: { action: 'index_url', url: '/path/to/page', type: 'URL_UPDATED (optional)' },
        },
        index_urls: {
          description: 'Batch index multiple URLs',
          params: { action: 'index_urls', urls: ['/url1', '/url2'], type: 'URL_UPDATED (optional)' },
        },
        inspect_url: {
          description: 'Inspect URL status in Google Search Console',
          params: { action: 'inspect_url', url: '/path/to/page' },
        },
        index_priority_urls: {
          description: 'Index all priority URLs',
          params: { action: 'index_priority_urls' },
        },
      },
    },
    instructions: {
      google: {
        verification: 'Add this to NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION env variable',
        searchConsole: 'https://search.google.com/search-console',
        apiKey: 'Set GOOGLE_INDEXING_KEY_JSON environment variable',
        steps: [
          '1. Go to Google Search Console',
          '2. Add property: www.drsayuj.info',
          '3. Verify using HTML meta tag',
          '4. Submit sitemap via API: POST /api/search-console with action=submit_sitemap',
          '5. Request indexing via API: POST /api/search-console with action=index_url',
        ],
      },
      bing: {
        verification: 'Add this to NEXT_PUBLIC_BING_SITE_VERIFICATION env variable',
        webmasterTools: 'https://www.bing.com/webmasters',
        steps: [
          '1. Go to Bing Webmaster Tools',
          '2. Add site: www.drsayuj.info',
          '3. Verify using HTML meta tag',
          '4. Submit all sitemaps',
          '5. Submit priority URLs',
        ],
      },
    },
  });
}

/**
 * Get authenticated Google client
 */
async function getAuthClient() {
  const keyJson = process.env.GOOGLE_INDEXING_KEY_JSON;
  if (!keyJson) {
    throw new Error('GOOGLE_INDEXING_KEY_JSON environment variable is missing');
  }

  let credentials;
  try {
    credentials = JSON.parse(keyJson);
  } catch (e) {
    throw new Error('Failed to parse GOOGLE_INDEXING_KEY_JSON. Ensure it is valid JSON.');
  }

  const auth = new google.auth.GoogleAuth({
    credentials,
    scopes: [
      'https://www.googleapis.com/auth/webmasters', // For Sitemap submission
      'https://www.googleapis.com/auth/indexing'    // For URL Indexing
    ],
  });

  return auth;
}

/**
 * Submit sitemap to Google Search Console
 */
async function submitSitemapToGSC(sitemapUrl: string) {
  const siteUrl = process.env.GSC_SITE_URL || SITE_URL;
  const formattedSiteUrl = siteUrl.replace(/\/$/, '');
  
  const auth = await getAuthClient();
  const searchConsole = google.webmasters({ version: 'v3', auth });

  const res = await searchConsole.sitemaps.submit({
    siteUrl: formattedSiteUrl,
    feedpath: sitemapUrl,
  });

  return {
    success: res.status === 200 || res.status === 204,
    status: res.status,
    sitemapUrl,
  };
}

/**
 * Request URL indexing via Google Indexing API
 */
async function requestUrlIndexing(url: string, type: 'URL_UPDATED' | 'URL_DELETED' = 'URL_UPDATED') {
  // Ensure URL is full URL
  const fullUrl = url.startsWith('http') ? url : `${SITE_URL}${url.startsWith('/') ? url : `/${url}`}`;
  
  const auth = await getAuthClient();
  const indexing = google.indexing({ version: 'v3', auth });

  const res = await indexing.urlNotifications.publish({
    requestBody: {
      url: fullUrl,
      type: type,
    },
  });

  return {
    success: res.status === 200,
    status: res.status,
    url: fullUrl,
    data: res.data,
  };
}

/**
 * Inspect URL using Google Search Console URL Inspection API
 */
async function inspectUrl(url: string) {
  const siteUrl = process.env.GSC_SITE_URL || SITE_URL;
  const formattedSiteUrl = siteUrl.replace(/\/$/, '');
  const fullUrl = url.startsWith('http') ? url : `${SITE_URL}${url.startsWith('/') ? url : `/${url}`}`;
  
  const auth = await getAuthClient();
  const searchConsole = google.searchconsole({ version: 'v1', auth });

  const res = await searchConsole.urlInspection.index.inspect({
    requestBody: {
      inspectionUrl: fullUrl,
      siteUrl: formattedSiteUrl,
    },
  });

  return {
    success: true,
    url: fullUrl,
    inspectionResult: res.data.inspectionResult,
  };
}

// Endpoint to trigger indexing and sitemap submission
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action, url, urls, sitemap, type } = body;
    
    // Verify API key if required (optional security layer)
    const apiKey = request.headers.get('x-api-key');
    const requiredApiKey = process.env.SEARCH_CONSOLE_API_KEY;
    if (requiredApiKey && apiKey !== requiredApiKey) {
      return NextResponse.json(
        { success: false, error: 'Invalid API key' },
        { status: 401 }
      );
    }

    switch (action) {
      case 'submit_sitemap':
        // Submit sitemap to Google Search Console
        if (!sitemap) {
          return NextResponse.json(
            { success: false, error: 'sitemap parameter is required' },
            { status: 400 }
          );
        }
        
        try {
          const result = await submitSitemapToGSC(sitemap);
          return NextResponse.json({
            success: result.success,
            message: result.success 
              ? 'Sitemap submitted successfully' 
              : 'Sitemap submission failed',
            ...result,
          });
        } catch (error: any) {
          console.error('[search-console] Sitemap submission error:', error);
          return NextResponse.json({
            success: false,
            error: error.message || 'Failed to submit sitemap',
            details: error.response?.data || error.message,
          }, { status: 500 });
        }

      case 'index_url':
        // Request indexing for a single URL
        if (!url) {
          return NextResponse.json(
            { success: false, error: 'url parameter is required' },
            { status: 400 }
          );
        }
        
        try {
          const result = await requestUrlIndexing(url, type || 'URL_UPDATED');
          return NextResponse.json({
            success: result.success,
            message: result.success 
              ? 'Indexing request submitted successfully' 
              : 'Indexing request failed',
            ...result,
          });
        } catch (error: any) {
          console.error('[search-console] URL indexing error:', error);
          return NextResponse.json({
            success: false,
            error: error.message || 'Failed to request indexing',
            details: error.response?.data || error.message,
          }, { status: 500 });
        }

      case 'index_urls':
        // Batch index multiple URLs
        if (!urls || !Array.isArray(urls) || urls.length === 0) {
          return NextResponse.json(
            { success: false, error: 'urls parameter must be a non-empty array' },
            { status: 400 }
          );
        }
        
        try {
          const results = [];
          const errors = [];
          
          // Process URLs with rate limiting (max 200 requests per 100 seconds)
          for (let i = 0; i < urls.length; i++) {
            const url = urls[i];
            try {
              const result = await requestUrlIndexing(url, type || 'URL_UPDATED');
              results.push(result);
              
              // Rate limiting: wait 500ms between requests
              if (i < urls.length - 1) {
                await new Promise(resolve => setTimeout(resolve, 500));
              }
            } catch (error: any) {
              errors.push({ url, error: error.message });
            }
          }
          
          return NextResponse.json({
            success: errors.length === 0,
            message: `Processed ${results.length} URLs, ${errors.length} errors`,
            results,
            errors: errors.length > 0 ? errors : undefined,
          });
        } catch (error: any) {
          console.error('[search-console] Batch indexing error:', error);
          return NextResponse.json({
            success: false,
            error: error.message || 'Failed to batch index URLs',
          }, { status: 500 });
        }

      case 'inspect_url':
        // Inspect URL status
        if (!url) {
          return NextResponse.json(
            { success: false, error: 'url parameter is required' },
            { status: 400 }
          );
        }
        
        try {
          const result = await inspectUrl(url);
          return NextResponse.json({
            success: true,
            ...result,
          });
        } catch (error: any) {
          console.error('[search-console] URL inspection error:', error);
          return NextResponse.json({
            success: false,
            error: error.message || 'Failed to inspect URL',
            details: error.response?.data || error.message,
          }, { status: 500 });
        }

      case 'index_priority_urls':
        // Index all priority URLs
        try {
          const results = [];
          const errors = [];
          
          for (let i = 0; i < PRIORITY_URLS.length; i++) {
            const url = PRIORITY_URLS[i];
            try {
              const result = await requestUrlIndexing(url, 'URL_UPDATED');
              results.push(result);
              
              // Rate limiting
              if (i < PRIORITY_URLS.length - 1) {
                await new Promise(resolve => setTimeout(resolve, 500));
              }
            } catch (error: any) {
              errors.push({ url, error: error.message });
            }
          }
          
          return NextResponse.json({
            success: errors.length === 0,
            message: `Indexed ${results.length} priority URLs, ${errors.length} errors`,
            results,
            errors: errors.length > 0 ? errors : undefined,
          });
        } catch (error: any) {
          console.error('[search-console] Priority URLs indexing error:', error);
          return NextResponse.json({
            success: false,
            error: error.message || 'Failed to index priority URLs',
          }, { status: 500 });
        }

      case 'ping_sitemaps':
        // DEPRECATED: Google's unauthenticated ping endpoint was deprecated on June 26, 2023
        // Use submit_sitemap action instead
        const bingPing = `https://www.bing.com/ping?sitemap=${encodeURIComponent(`${SITE_URL}/sitemap.xml`)}`;
        
        return NextResponse.json({
          success: true,
          message: 'Sitemap notification',
          note: 'Google ping endpoint is deprecated. Use submit_sitemap action instead.',
          google: {
            deprecated: true,
            message: 'Use submit_sitemap action with Google Search Console API',
          },
          bing: {
            pingUrl: bingPing,
            note: 'Bing still supports ping endpoint',
          },
        });

      case 'generate_schema_test':
        // Generate schema testing URL
        const schemaTestUrl = `https://search.google.com/test/rich-results?url=${encodeURIComponent(SITE_URL)}`;
        
        return NextResponse.json({
          success: true,
          message: 'Test your structured data',
          schemaTest: schemaTestUrl,
          validatorUrl: 'https://validator.schema.org/',
        });

      default:
        return NextResponse.json({
          success: false,
          error: 'Invalid action specified',
          availableActions: [
            'submit_sitemap',
            'index_url',
            'index_urls',
            'inspect_url',
            'index_priority_urls',
            'ping_sitemaps',
            'generate_schema_test',
          ],
        }, { status: 400 });
    }
    
  } catch (error: any) {
    console.error('[search-console] API error:', error);
    return NextResponse.json({
      success: false,
      error: 'Failed to process request',
      message: error.message || 'Unknown error',
    }, { status: 500 });
  }
}
