import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { transferVideoFromS3ToBlob } from '@/src/lib/remotion/storage';

/**
 * POST /api/remotion/webhook
 * Webhook handler for Remotion Lambda render completion
 *
 * This endpoint is called by Remotion Lambda when a render completes.
 * It transfers the video from S3 to Vercel Blob and updates the database.
 *
 * Request body:
 * {
 *   type: 'success' | 'error' | 'timeout',
 *   renderId: string,
 *   bucketName: string,
 *   outputFile?: string,
 *   outputUrl?: string,
 *   errors?: string[],
 *   metadata?: {
 *     appointmentId?: string,
 *     patientEmail?: string,
 *     type: string
 *   }
 * }
 */
export async function POST(request: Request) {
  try {
    // Verify webhook signature (if configured)
    const signature = request.headers.get('x-remotion-signature');
    const webhookSecret = process.env.REMOTION_WEBHOOK_SECRET;

    if (webhookSecret && signature) {
      const rawBody = await request.text();
      const expectedSignature = crypto
        .createHmac('sha256', webhookSecret)
        .update(rawBody)
        .digest('hex');

      if (signature !== expectedSignature) {
        console.error('[api/remotion/webhook] Invalid signature');
        return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
      }

      var payload = JSON.parse(rawBody);
    } else {
      var payload = await request.json();
    }

    const { type, renderId, outputUrl, metadata } = payload;

    console.log('[api/remotion/webhook] Received webhook:', {
      type,
      renderId,
      metadata,
    });

    // Handle successful render
    if (type === 'success' && outputUrl && metadata?.appointmentId) {
      const filename = `consultation-prep-${metadata.appointmentId}-${Date.now()}.mp4`;

      console.log('[api/remotion/webhook] Transferring video to Vercel Blob');

      // Transfer video from S3 to Vercel Blob
      const uploadResult = await transferVideoFromS3ToBlob(outputUrl, filename);

      if (uploadResult.success && uploadResult.url) {
        console.log('[api/remotion/webhook] Video uploaded to Vercel Blob:', uploadResult.url);

        // TODO: Update database with video URL
        // await appointments.updateVideoStatus(
        //   metadata.appointmentId,
        //   'completed',
        //   uploadResult.url
        // );

        // TODO: Resend confirmation email with video link
        // if (metadata.patientEmail) {
        //   await sendConfirmationEmailWithVideo(
        //     metadata.appointmentId,
        //     uploadResult.url
        //   );
        // }

        return NextResponse.json({
          received: true,
          videoUrl: uploadResult.url,
        });
      } else {
        console.error('[api/remotion/webhook] Upload failed:', uploadResult.error);

        // TODO: Update database to mark video as failed
        // await appointments.updateVideoStatus(metadata.appointmentId, 'failed');

        return NextResponse.json({
          received: true,
          error: 'Video upload failed',
        }, { status: 500 });
      }
    }

    // Handle failed render
    if (type === 'error' && metadata?.appointmentId) {
      console.error('[api/remotion/webhook] Render failed:', payload.errors);

      // TODO: Update database to mark video as failed
      // await appointments.updateVideoStatus(metadata.appointmentId, 'failed');
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('[api/remotion/webhook] Error:', error);

    const errorMessage = error instanceof Error ? error.message : 'Unknown error';

    return NextResponse.json(
      {
        received: false,
        error: errorMessage,
      },
      { status: 500 }
    );
  }
}
