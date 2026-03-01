import { NextRequest, NextResponse } from 'next/server';
import { readFile, stat } from 'fs/promises';
import { resolve } from 'path';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const rawFilePath = searchParams.get('path');

    if (!rawFilePath) {
      return NextResponse.json(
        { error: 'File path is required' },
        { status: 400 }
      );
    }

    // Resolve to absolute path to prevent traversal (e.g., passing /schemas/../.env)
    const filePath = resolve(rawFilePath);

    // Security check: ensure the file is within allowed directories
    const allowedDirs = [
      resolve(process.cwd(), 'geo-bot', 'output'),
      resolve(process.cwd(), 'schemas'),
    ];

    // Check if the resolved path starts with any of the allowed directories
    // Append separator to ensure we don't match /schemas-hacked/
    const isAllowed = allowedDirs.some(dir => filePath.startsWith(dir + '/'));
    if (!isAllowed) {
      console.warn(`[Security] Blocked path traversal attempt to: ${rawFilePath}`);
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

