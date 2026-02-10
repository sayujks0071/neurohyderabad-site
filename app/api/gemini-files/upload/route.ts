/**
 * API Route: Upload files to Gemini File API
 * POST /api/gemini-files/upload
 */

import { NextRequest, NextResponse } from 'next/server';
import { verifyAdminAccess } from '@/src/lib/security';
import {
  uploadFileBufferToGemini,
  validateFile,
  waitForFileActive,
} from '@/src/lib/gemini/file-handler';
import { GeminiFileMetadata } from '@/src/lib/gemini/types';

export const runtime = 'nodejs';
export const maxDuration = 60; // 60 seconds for file upload

export async function POST(request: NextRequest) {
  // 🛡️ Sentinel: Protect sensitive upload endpoint
  const auth = await verifyAdminAccess(request);
  if (!auth.isAuthorized) {
    return auth.response!;
  }

  try {
    // Parse multipart form data
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const displayName = formData.get('displayName') as string | null;
    const category = formData.get('category') as string | null;
    const tags = formData.get('tags') as string | null;
    const waitForProcessing = formData.get('waitForProcessing') === 'true';

    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      );
    }

    // Validate file
    const validation = validateFile(file);
    if (!validation.valid) {
      return NextResponse.json(
        { error: validation.error },
        { status: 400 }
      );
    }

    // Convert file to buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Upload to Gemini
    console.log(`Uploading file: ${file.name} (${file.type})`);
    const uploadedFile = await uploadFileBufferToGemini(
      buffer,
      file.name,
      file.type,
      displayName || file.name
    );

    // Optionally wait for file to be processed
    let finalFile: GeminiFileMetadata = uploadedFile;
    if (waitForProcessing) {
      console.log(`Waiting for file to be processed: ${uploadedFile.name}`);
      finalFile = await waitForFileActive(uploadedFile.name);
    }

    // Return file metadata
    return NextResponse.json({
      success: true,
      file: {
        name: finalFile.name,
        displayName: finalFile.displayName,
        uri: finalFile.uri,
        mimeType: finalFile.mimeType,
        sizeBytes: finalFile.sizeBytes,
        state: finalFile.state,
        createTime: finalFile.createTime,
        expirationTime: finalFile.expirationTime,
      },
      metadata: {
        category: category || 'other',
        tags: tags ? tags.split(',').map(t => t.trim()) : [],
        uploadedAt: new Date().toISOString(),
      },
    });
  } catch (error) {
    console.error('Error uploading file:', error);
    return NextResponse.json(
      {
        error: 'Failed to upload file',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

// Health check endpoint
export async function GET() {
  return NextResponse.json({
    status: 'ok',
    endpoint: 'gemini-files/upload',
    methods: ['POST'],
    description: 'Upload files to Gemini File API',
  });
}
