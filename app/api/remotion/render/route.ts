import { NextResponse } from 'next/server';
import { renderVideoOnLambda } from '@/src/lib/remotion/lambda';
import type { RenderVideoParams } from '@/src/lib/remotion/lambda';

/**
 * POST /api/remotion/render
 * Triggers a Remotion Lambda video render
 *
 * Request body:
 * {
 *   compositionId: 'ConsultationPrep' | 'BlogReel' | 'OutcomeDashboard',
 *   inputProps: Record<string, unknown>,
 *   metadata?: VideoRenderMetadata
 * }
 *
 * Response:
 * {
 *   success: boolean,
 *   renderId?: string,
 *   bucketName?: string,
 *   error?: string
 * }
 */
export async function POST(request: Request) {
  try {
    const body = (await request.json()) as RenderVideoParams;

    // Validate composition ID
    const validCompositions = ['ConsultationPrep', 'BlogReel', 'OutcomeDashboard'];
    if (!validCompositions.includes(body.compositionId)) {
      return NextResponse.json(
        {
          success: false,
          error: `Invalid composition ID. Must be one of: ${validCompositions.join(', ')}`,
        },
        { status: 400 }
      );
    }

    // Validate input props exist
    if (!body.inputProps || typeof body.inputProps !== 'object') {
      return NextResponse.json(
        {
          success: false,
          error: 'inputProps is required and must be an object',
        },
        { status: 400 }
      );
    }

    console.log('[api/remotion/render] Starting render:', {
      composition: body.compositionId,
      metadata: body.metadata,
    });

    // Trigger render on Lambda
    const result = await renderVideoOnLambda(body);

    if (!result.success) {
      return NextResponse.json(
        {
          success: false,
          error: result.error || 'Render failed',
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      renderId: result.renderId,
      bucketName: result.bucketName,
      message: 'Render started successfully',
    });
  } catch (error) {
    console.error('[api/remotion/render] Error:', error);

    const errorMessage = error instanceof Error ? error.message : 'Unknown error';

    return NextResponse.json(
      {
        success: false,
        error: errorMessage,
      },
      { status: 500 }
    );
  }
}
