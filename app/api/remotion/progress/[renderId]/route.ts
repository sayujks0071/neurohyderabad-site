import { NextResponse } from 'next/server';
import { pollRenderStatus } from '@/src/lib/remotion/lambda';

/**
 * GET /api/remotion/progress/[renderId]?bucketName=xxx
 * Poll render progress from Remotion Lambda
 *
 * Query params:
 * - bucketName: S3 bucket name (required)
 *
 * Response:
 * {
 *   done: boolean,
 *   overallProgress: number (0-1),
 *   outputFile?: string,
 *   outputUrl?: string,
 *   errors?: string[]
 * }
 */
export async function GET(
  request: Request,
  { params }: { params: Promise<{ renderId: string }> }
) {
  try {
    const { renderId } = await params;
    const { searchParams } = new URL(request.url);
    const bucketName = searchParams.get('bucketName');

    if (!bucketName) {
      return NextResponse.json(
        {
          done: false,
          overallProgress: 0,
          errors: ['bucketName query parameter is required'],
        },
        { status: 400 }
      );
    }

    console.log('[api/remotion/progress] Polling status:', { renderId, bucketName });

    const status = await pollRenderStatus(renderId, bucketName);

    return NextResponse.json(status);
  } catch (error) {
    console.error('[api/remotion/progress] Error:', error);

    const errorMessage = error instanceof Error ? error.message : 'Unknown error';

    return NextResponse.json(
      {
        done: false,
        overallProgress: 0,
        errors: [errorMessage],
      },
      { status: 500 }
    );
  }
}
