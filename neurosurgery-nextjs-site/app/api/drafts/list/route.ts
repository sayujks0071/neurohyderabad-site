import { NextRequest, NextResponse } from 'next/server';
import { readdir, stat, readFile } from 'fs/promises';
import { join } from 'path';

export async function GET(request: NextRequest) {
  try {
    const drafts: Array<{
      name: string;
      path: string;
      type: 'content' | 'schema';
      lastModified: string;
      size: number;
    }> = [];

    // Check for content drafts in geo-bot/output/
    const contentDir = join(process.cwd(), 'geo-bot', 'output');
    try {
      // First, try to read latest.json for hash-based files
      let latestPointers: Record<string, string> = {};
      try {
        const latestFile = join(contentDir, 'latest.json');
        const latestContent = await readFile(latestFile, 'utf8');
        latestPointers = JSON.parse(latestContent);
      } catch {
        // latest.json doesn't exist, fall back to direct file listing
      }

      if (Object.keys(latestPointers).length > 0) {
        // Use latest pointers
        for (const [slug, filename] of Object.entries(latestPointers)) {
          const filePath = join(contentDir, filename);
          try {
            const stats = await stat(filePath);
            drafts.push({
              name: slug + '.md',
              path: filePath,
              type: 'content',
              lastModified: stats.mtime.toISOString(),
              size: stats.size,
            });
          } catch {
            // File doesn't exist, skip
          }
        }
      } else {
        // Fall back to direct file listing
        const contentFiles = await readdir(contentDir);
        for (const file of contentFiles) {
          if (file.endsWith('.md') && file !== 'latest.json') {
            const filePath = join(contentDir, file);
            const stats = await stat(filePath);
            drafts.push({
              name: file,
              path: filePath,
              type: 'content',
              lastModified: stats.mtime.toISOString(),
              size: stats.size,
            });
          }
        }
      }
    } catch (error) {
      // Directory doesn't exist or can't be read
      console.log('Content directory not found:', contentDir);
    }

    // Check for schema drafts in schemas/
    const schemaDir = join(process.cwd(), 'schemas');
    try {
      const schemaFiles = await readdir(schemaDir);
      for (const file of schemaFiles) {
        if (file.endsWith('.jsonld')) {
          const filePath = join(schemaDir, file);
          const stats = await stat(filePath);
          drafts.push({
            name: file,
            path: filePath,
            type: 'schema',
            lastModified: stats.mtime.toISOString(),
            size: stats.size,
          });
        }
      }
    } catch (error) {
      // Directory doesn't exist or can't be read
      console.log('Schema directory not found:', schemaDir);
    }

    // Sort by last modified (newest first)
    drafts.sort((a, b) => new Date(b.lastModified).getTime() - new Date(a.lastModified).getTime());

    return NextResponse.json({ drafts });
  } catch (error) {
    console.error('Error listing drafts:', error);
    return NextResponse.json(
      { error: 'Failed to list drafts' },
      { status: 500 }
    );
  }
}
