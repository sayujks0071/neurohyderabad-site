/**
 * Vercel Blob storage handler for video files
 * Uploads rendered videos from Remotion Lambda to Vercel Blob for CDN delivery
 */

import { put } from '@vercel/blob';

export interface UploadVideoResult {
  success: boolean;
  url?: string;
  error?: string;
}

/**
 * Upload video file to Vercel Blob storage
 * @param videoBuffer - Video file as Buffer or Blob
 * @param filename - Desired filename (e.g., "consultation-prep-123.mp4")
 * @returns Public URL for the uploaded video
 */
export async function uploadVideoToBlob(
  videoBuffer: Buffer | Blob,
  filename: string
): Promise<UploadVideoResult> {
  try {
    if (!process.env.BLOB_READ_WRITE_TOKEN) {
      throw new Error('BLOB_READ_WRITE_TOKEN not configured');
    }

    console.log('[remotion/storage] Uploading video to Vercel Blob:', filename);

    const blob = await put(filename, videoBuffer, {
      access: 'public',
      token: process.env.BLOB_READ_WRITE_TOKEN,
    });

    console.log('[remotion/storage] Upload successful:', blob.url);

    return {
      success: true,
      url: blob.url,
    };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error('[remotion/storage] Upload failed:', errorMessage);

    return {
      success: false,
      error: errorMessage,
    };
  }
}

/**
 * Fetch video from Remotion Lambda S3 and upload to Vercel Blob
 * @param s3Url - Full S3 URL from Remotion render output
 * @param filename - Desired Vercel Blob filename
 */
export async function transferVideoFromS3ToBlob(
  s3Url: string,
  filename: string
): Promise<UploadVideoResult> {
  try {
    console.log('[remotion/storage] Fetching video from S3:', s3Url);

    // Fetch video from S3
    const response = await fetch(s3Url);
    if (!response.ok) {
      throw new Error(`Failed to fetch video: ${response.statusText}`);
    }

    const videoBuffer = Buffer.from(await response.arrayBuffer());

    // Upload to Vercel Blob
    return await uploadVideoToBlob(videoBuffer, filename);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error('[remotion/storage] Transfer failed:', errorMessage);

    return {
      success: false,
      error: errorMessage,
    };
  }
}

/**
 * Get public URL format for a video
 * @param filename - Video filename
 * @returns Expected Vercel Blob URL
 */
export function getExpectedBlobUrl(filename: string): string {
  const projectName = process.env.VERCEL_PROJECT_NAME || 'drsayuj';
  return `https://${projectName}.public.blob.vercel-storage.com/${filename}`;
}
