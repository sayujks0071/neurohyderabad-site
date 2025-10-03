import { NextRequest, NextResponse } from 'next/server';
import { readFile, stat } from 'fs/promises';
import { join } from 'path';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const filePath = searchParams.get('path');

    if (!filePath) {
      return NextResponse.json(
        { error: 'File path is required' },
        { status: 400 }
      );
    }

    // Security check: ensure the file is within allowed directories
    const allowedDirs = [
      join(process.cwd(), 'geo-bot', 'output'),
      join(process.cwd(), 'schemas'),
    ];

    const isAllowed = allowedDirs.some(dir => filePath.startsWith(dir));
    if (!isAllowed) {
      return NextResponse.json(
        { error: 'Access denied' },
        { status: 403 }
      );
    }

    // Read file content
    const content = await readFile(filePath, 'utf-8');
    const stats = await stat(filePath);
    const filename = filePath.split('/').pop() || 'unknown';

    // Determine content type
    const type = filename.endsWith('.jsonld') ? 'json' : 'markdown';

    return NextResponse.json({
      content,
      type,
      filename,
      lastModified: stats.mtime.toISOString(),
    });
  } catch (error) {
    console.error('Error reading draft content:', error);
    return NextResponse.json(
      { error: 'Failed to read draft content' },
      { status: 500 }
    );
  }
}

