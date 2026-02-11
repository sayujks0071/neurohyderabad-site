/**
 * API Route: List uploaded files from Gemini File API
 * GET /api/gemini-files/list
 */

import { NextRequest, NextResponse } from 'next/server';
import { verifyAdminAccess } from '@/src/lib/security';
import { listGeminiFiles, getGeminiFile, deleteGeminiFile } from '@/src/lib/gemini/file-handler';

export const runtime = 'nodejs';
export const maxDuration = 30;

export async function GET(request: NextRequest) {
  // 🛡️ Sentinel: Protect sensitive list endpoint
  const auth = await verifyAdminAccess(request);
  if (!auth.isAuthorized) {
    return auth.response!;
  }

  try {
    const searchParams = request.nextUrl.searchParams;
    const pageSize = searchParams.get('pageSize')
      ? parseInt(searchParams.get('pageSize')!)
      : 100;
    const pageToken = searchParams.get('pageToken') || undefined;
    const filter = searchParams.get('filter') || undefined; // e.g., "ACTIVE", "PROCESSING"

    console.log('Listing Gemini files...');

    const result = await listGeminiFiles(pageSize, pageToken);

    // Apply filter if specified
    let filteredFiles = result.files;
    if (filter) {
      filteredFiles = result.files.filter(file => file.state === filter);
    }

    return NextResponse.json({
      success: true,
      files: filteredFiles.map(file => ({
        name: file.name,
        displayName: file.displayName,
        uri: file.uri,
        mimeType: file.mimeType,
        sizeBytes: file.sizeBytes,
        state: file.state,
        createTime: file.createTime,
        updateTime: file.updateTime,
        expirationTime: file.expirationTime,
        sha256Hash: file.sha256Hash,
      })),
      totalCount: filteredFiles.length,
      nextPageToken: result.nextPageToken,
      hasMore: !!result.nextPageToken,
    });
  } catch (error) {
    console.error('Error listing files:', error);
    return NextResponse.json(
      {
        error: 'Failed to list files',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
