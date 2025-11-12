/**
 * API Route: Manage individual files (get, delete)
 * GET /api/gemini-files/manage?name=files/xyz
 * DELETE /api/gemini-files/manage?name=files/xyz
 */

import { NextRequest, NextResponse } from 'next/server';
import { getGeminiFile, deleteGeminiFile } from '@/lib/gemini/file-handler';

export const runtime = 'nodejs';
export const maxDuration = 30;

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const fileName = searchParams.get('name');

    if (!fileName) {
      return NextResponse.json(
        { error: 'File name parameter is required' },
        { status: 400 }
      );
    }

    console.log(`Getting file details: ${fileName}`);

    const file = await getGeminiFile(fileName);

    return NextResponse.json({
      success: true,
      file: {
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
        error: file.error,
      },
    });
  } catch (error) {
    console.error('Error getting file:', error);
    return NextResponse.json(
      {
        error: 'Failed to get file',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const fileName = searchParams.get('name');

    if (!fileName) {
      return NextResponse.json(
        { error: 'File name parameter is required' },
        { status: 400 }
      );
    }

    console.log(`Deleting file: ${fileName}`);

    await deleteGeminiFile(fileName);

    return NextResponse.json({
      success: true,
      message: `File ${fileName} deleted successfully`,
      deletedAt: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Error deleting file:', error);
    return NextResponse.json(
      {
        error: 'Failed to delete file',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
