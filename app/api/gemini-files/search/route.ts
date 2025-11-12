/**
 * API Route: Search files using Gemini File Search API
 * POST /api/gemini-files/search
 */

import { NextRequest, NextResponse } from 'next/server';
import {
  searchFiles,
  searchMedicalDocuments,
  generatePatientEducation,
  extractFAQ,
  summarizeDocument,
  compareDocuments,
  validateClaim,
} from '@/src/lib/gemini/file-search';
import { listGeminiFiles } from '@/src/lib/gemini/file-handler';
import { MedicalFileSearchQuery } from '@/src/lib/gemini/types';

export const runtime = 'nodejs';
export const maxDuration = 60; // 60 seconds for complex searches

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      query,
      fileUris,
      category,
      tags,
      conditions,
      temperature,
      searchType = 'standard',
      ...options
    } = body;

    if (!query) {
      return NextResponse.json(
        { error: 'Query parameter is required' },
        { status: 400 }
      );
    }

    console.log(`File search request: ${searchType} - "${query}"`);

    let result;

    switch (searchType) {
      case 'medical': {
        // Medical-specific search with filtering
        const availableFiles = await listGeminiFiles();
        const medicalQuery: MedicalFileSearchQuery = {
          query,
          fileUris,
          category,
          tags,
          conditions,
          temperature,
        };
        result = await searchMedicalDocuments(medicalQuery, availableFiles.files);
        break;
      }

      case 'patient-education': {
        // Use query as condition if condition not provided
        const condition = options.condition || query;
        const educationContent = await generatePatientEducation(
          condition,
          fileUris || []
        );
        result = { answer: educationContent, usedFiles: fileUris || [] };
        break;
      }

      case 'faq': {
        const faqList = await extractFAQ(
          query,
          fileUris || [],
          options.numQuestions || 10
        );
        result = { answer: JSON.stringify(faqList, null, 2), usedFiles: fileUris || [] };
        break;
      }

      case 'summarize': {
        if (!fileUris || fileUris.length === 0) {
          return NextResponse.json(
            { error: 'File URI is required for summarization' },
            { status: 400 }
          );
        }
        const summary = await summarizeDocument(
          fileUris[0],
          options.summaryType || 'brief'
        );
        result = { answer: summary, usedFiles: [fileUris[0]] };
        break;
      }

      case 'compare': {
        if (!fileUris || fileUris.length < 2) {
          return NextResponse.json(
            { error: 'At least 2 file URIs are required for comparison' },
            { status: 400 }
          );
        }
        const comparison = await compareDocuments(fileUris, query);
        result = { answer: comparison, usedFiles: fileUris };
        break;
      }

      case 'validate': {
        if (!options.claim) {
          return NextResponse.json(
            { error: 'Claim is required for validation' },
            { status: 400 }
          );
        }
        const validation = await validateClaim(
          options.claim,
          fileUris || []
        );
        result = {
          answer: validation.evidence,
          usedFiles: fileUris || [],
          validation: {
            isSupported: validation.isSupported,
            confidence: validation.confidence,
          },
        };
        break;
      }

      case 'standard':
      default: {
        // Standard file search
        result = await searchFiles({
          query,
          fileUris,
          temperature,
        });
        break;
      }
    }

    return NextResponse.json({
      success: true,
      searchType,
      query,
      ...result,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Error searching files:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    
    // Provide more specific error messages
    if (errorMessage.includes('API key')) {
      return NextResponse.json(
        {
          error: 'Gemini API key not configured',
          details: 'Please configure GEMINI_API_KEY environment variable',
        },
        { status: 500 }
      );
    }
    
    if (errorMessage.includes('Empty response')) {
      return NextResponse.json(
        {
          error: 'No results found',
          details: 'The search did not return any results. Try a different query or ensure files are uploaded.',
        },
        { status: 404 }
      );
    }
    
    return NextResponse.json(
      {
        error: 'Failed to search files',
        details: errorMessage,
      },
      { status: 500 }
    );
  }
}

// Health check endpoint
export async function GET() {
  return NextResponse.json({
    status: 'ok',
    endpoint: 'gemini-files/search',
    methods: ['POST'],
    description: 'Search and query files using Gemini File API',
    searchTypes: [
      'standard - Basic file search',
      'medical - Medical document search with filtering',
      'patient-education - Generate patient education content',
      'faq - Extract FAQ from documents',
      'summarize - Summarize a document',
      'compare - Compare multiple documents',
      'validate - Validate claims against documents',
    ],
  });
}
