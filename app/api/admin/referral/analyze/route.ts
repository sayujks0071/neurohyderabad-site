import { NextResponse } from 'next/server';
import { verifyAdminAccess } from '@/src/lib/security';
import { extractReferralPdfInSandbox } from '@/lib/referral/extract-sandbox';
import { analyzeReferralText } from '@/lib/referral/analyze';
import { validateReferralFile } from '@/lib/referral/validation';

export const runtime = 'nodejs';
export const maxDuration = 60; // 1 minute timeout

export async function POST(request: Request) {
  // 1. Security Check
  const { isAuthorized, response } = await verifyAdminAccess(request);
  if (!isAuthorized) {
    return response!;
  }

  try {
    const formData = await request.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
        return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    // 2. Validation
    const validation = await validateReferralFile(file);
    if (!validation.isValid) {
      return NextResponse.json(
        { error: validation.error },
        { status: 400 }
      );
    }

    // 3. Extraction (Sandbox)
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    let extractionResult;
    try {
      extractionResult = await extractReferralPdfInSandbox(buffer);
    } catch (e: any) {
      console.error('Sandbox extraction failed:', e);
      return NextResponse.json(
        { error: 'Failed to extract text from PDF', details: e.message },
        { status: 500 }
      );
    }

    // 4. Analysis (AI)
    let analysisResult;
    try {
      analysisResult = await analyzeReferralText(extractionResult.text);
    } catch (e: any) {
      console.error('AI analysis failed:', e);
      return NextResponse.json(
        { error: 'Failed to analyze referral text', details: e.message },
        { status: 500 }
      );
    }

    return NextResponse.json({
      extraction: {
        pages: extractionResult.numpages,
        chars: extractionResult.text.length,
        truncated: extractionResult.truncated
      },
      analysis: analysisResult
    });

  } catch (error: any) {
    console.error('Referral analysis error:', error);
    return NextResponse.json(
      { error: 'Internal server error', details: error.message },
      { status: 500 }
    );
  }
}
