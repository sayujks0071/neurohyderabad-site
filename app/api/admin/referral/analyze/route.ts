import { NextResponse } from 'next/server';
import { verifyAdminAccess } from '@/src/lib/security';
import { validateReferralFile } from '@/lib/referral/validation';
import { extractReferralPdfInSandbox } from '@/lib/referral/extract-sandbox';
import { analyzeReferralText } from '@/lib/referral/analyze';

export const runtime = 'nodejs'; // Sandbox requires Node.js runtime
export const maxDuration = 60; // Allow 1 minute for processing

export async function POST(request: Request) {
  const { isAuthorized, response } = await verifyAdminAccess(request);
  if (!isAuthorized) {
    return response!;
  }

  try {
    const formData = await request.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    const validation = validateReferralFile(file);
    if (!validation.valid) {
      return NextResponse.json({ error: validation.error }, { status: 400 });
    }

    // Convert File to Buffer for sandbox
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // 1. Extract Text (Sandbox)
    let extractionResult;
    try {
      extractionResult = await extractReferralPdfInSandbox(buffer);
    } catch (e) {
      console.error('Extraction error:', e);
      return NextResponse.json({ error: 'Failed to extract text from PDF' }, { status: 500 });
    }

    if (extractionResult.text.length < 50) {
       return NextResponse.json({ error: 'Extracted text is too short or empty' }, { status: 400 });
    }

    // 2. Analyze Text (AI)
    let analysisResult;
    try {
      analysisResult = await analyzeReferralText(extractionResult.text);
    } catch (e) {
      console.error('Analysis error:', e);
      return NextResponse.json({ error: 'Failed to analyze text with AI' }, { status: 500 });
    }

    return NextResponse.json({
      extraction: {
        pages: extractionResult.numpages,
        truncated: extractionResult.truncated
      },
      analysis: analysisResult
    });

  } catch (error) {
    console.error('Referral analysis failed:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
