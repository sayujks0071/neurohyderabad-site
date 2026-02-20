import { NextRequest, NextResponse } from 'next/server';
import { validateDicom } from '@/lib/dicom/validation';
import { extractDicomMetadataInSandbox } from '@/lib/dicom/extract';

export const runtime = 'nodejs';
export const maxDuration = 60; // 1 minute max

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
        return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    const validation = await validateDicom(file);
    if (!validation.isValid) {
      return NextResponse.json(
        { error: validation.error },
        { status: validation.status || 400 }
      );
    }

    const buffer = Buffer.from(await file.arrayBuffer());

    // Extract metadata in sandbox
    const metadata = await extractDicomMetadataInSandbox(buffer);

    return NextResponse.json({
      metadata,
    });
  } catch (error: any) {
    console.error('DICOM analysis error:', error);

    // Check for sandbox specific errors or timeouts
    if (error.message?.includes('timed out')) {
         return NextResponse.json(
            { error: 'Processing timed out. The file might be too complex.' },
            { status: 504 }
          );
    }

    return NextResponse.json(
      { error: 'Failed to process DICOM file.' },
      { status: 500 }
    );
  }
}
