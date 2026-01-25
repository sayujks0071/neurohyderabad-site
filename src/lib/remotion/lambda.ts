/**
 * Remotion Lambda rendering wrapper
 * Handles serverless video generation using Remotion's managed AWS infrastructure
 */

import { renderMediaOnLambda, getRenderProgress } from '@remotion/lambda/client';
import type { RenderMediaOnLambdaInput, RenderProgress } from '@remotion/lambda/client';

const REGION = (process.env.REMOTION_APP_REGION as any) || 'us-east-1';
const FUNCTION_NAME = process.env.REMOTION_APP_FUNCTION_NAME;
const SERVE_URL = process.env.REMOTION_APP_SERVE_URL;

if (!FUNCTION_NAME) {
  console.warn('[remotion/lambda] REMOTION_APP_FUNCTION_NAME not set. Deploy Lambda function first.');
}

if (!SERVE_URL) {
  console.warn('[remotion/lambda] REMOTION_APP_SERVE_URL not set. Deploy site bundle first.');
}

export interface VideoRenderMetadata {
  appointmentId?: string;
  blogSlug?: string;
  type: 'consultation-prep' | 'blog-reel' | 'outcome-dashboard';
  patientEmail?: string;
  triggeredBy: 'appointment' | 'cron' | 'manual';
  triggeredAt: string;
}

export interface RenderVideoParams {
  compositionId: 'ConsultationPrep' | 'BlogReel' | 'OutcomeDashboard';
  inputProps: Record<string, unknown>;
  metadata?: VideoRenderMetadata;
}

export interface RenderVideoResult {
  success: boolean;
  renderId?: string;
  bucketName?: string;
  error?: string;
}

export interface RenderStatusResult {
  done: boolean;
  overallProgress: number;
  outputFile?: string;
  outputUrl?: string;
  errors?: string[];
}

/**
 * Trigger a video render on Remotion Lambda
 * @returns Render ID and bucket name for status polling
 */
export async function renderVideoOnLambda(
  params: RenderVideoParams
): Promise<RenderVideoResult> {
  try {
    if (!FUNCTION_NAME || !SERVE_URL) {
      throw new Error(
        'Remotion Lambda not configured. Run `pnpm remotion:deploy` first.'
      );
    }

    const renderRequest: RenderMediaOnLambdaInput = {
      region: REGION,
      functionName: FUNCTION_NAME,
      serveUrl: SERVE_URL,
      composition: params.compositionId,
      inputProps: params.inputProps,
      codec: 'h264',
      maxRetries: 1,
      privacy: 'public',
      // Output naming
      outName: params.metadata?.appointmentId
        ? `consultation-prep-${params.metadata.appointmentId}-${Date.now()}.mp4`
        : `video-${params.compositionId}-${Date.now()}.mp4`,
    };

    console.log('[remotion/lambda] Starting render:', {
      composition: params.compositionId,
      metadata: params.metadata,
    });

    const { renderId, bucketName } = await renderMediaOnLambda(renderRequest);

    console.log('[remotion/lambda] Render started:', { renderId, bucketName });

    return {
      success: true,
      renderId,
      bucketName,
    };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error('[remotion/lambda] Render failed:', errorMessage);

    return {
      success: false,
      error: errorMessage,
    };
  }
}

/**
 * Poll render status and get progress
 * @param renderId - Render ID from renderVideoOnLambda
 * @param bucketName - Bucket name from renderVideoOnLambda
 */
export async function pollRenderStatus(
  renderId: string,
  bucketName: string
): Promise<RenderStatusResult> {
  try {
    if (!FUNCTION_NAME) {
      throw new Error('REMOTION_APP_FUNCTION_NAME not configured');
    }

    const progress = await getRenderProgress({
      renderId,
      bucketName,
      functionName: FUNCTION_NAME,
      region: REGION,
    });

    // Check for errors
    const errors = progress.fatalErrorEncountered
      ? (progress.errors 
          ? (Array.isArray(progress.errors) 
              ? progress.errors.flat().map(e => typeof e === 'string' ? e : e?.message || 'Unknown error')
              : [typeof progress.errors === 'string' ? progress.errors : 'Unknown render error'])
          : ['Unknown render error'])
      : undefined;

    return {
      done: progress.done,
      overallProgress: progress.overallProgress,
      outputFile: progress.outputFile ?? undefined,
      outputUrl: progress.outputFile
        ? `https://${bucketName}.s3.${REGION}.amazonaws.com/${progress.outputFile}`
        : undefined,
      errors,
    };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error('[remotion/lambda] Status check failed:', errorMessage);

    return {
      done: false,
      overallProgress: 0,
      errors: [errorMessage],
    };
  }
}

/**
 * Wait for render to complete (with timeout)
 * @param renderId - Render ID
 * @param bucketName - Bucket name
 * @param maxWaitTimeMs - Maximum wait time in milliseconds (default: 5 minutes)
 */
export async function waitForRenderCompletion(
  renderId: string,
  bucketName: string,
  maxWaitTimeMs: number = 5 * 60 * 1000
): Promise<RenderStatusResult> {
  const startTime = Date.now();
  const pollIntervalMs = 3000; // Poll every 3 seconds

  while (Date.now() - startTime < maxWaitTimeMs) {
    const status = await pollRenderStatus(renderId, bucketName);

    if (status.done) {
      return status;
    }

    if (status.errors && status.errors.length > 0) {
      return status;
    }

    // Wait before next poll
    await new Promise((resolve) => setTimeout(resolve, pollIntervalMs));
  }

  // Timeout reached
  return {
    done: false,
    overallProgress: 0,
    errors: ['Render timeout: exceeded maximum wait time'],
  };
}
