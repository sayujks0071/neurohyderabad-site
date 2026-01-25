/**
 * Template registry and video generation triggers
 * Maps appointment data to Remotion input props and initiates renders
 */

import { renderVideoOnLambda } from './lambda';
import { buildConsultationPrepProps } from '../../../remotion/utils/surgeryTypeMapper';
import type { ConsultationPrepProps } from '../../../remotion/types/ConsultationPrepProps';

export interface AppointmentVideoTriggerParams {
  appointmentId: string;
  patientName: string;
  patientEmail: string;
  reason: string; // Chief complaint (will be mapped to surgery type)
  appointmentDate: string;
  appointmentTime: string;
}

/**
 * Trigger personalized consultation prep video generation
 * Called after appointment booking is confirmed
 */
export async function triggerConsultationPrepVideo(
  params: AppointmentVideoTriggerParams
): Promise<{ success: boolean; renderId?: string; error?: string }> {
  try {
    console.log('[remotion/templates] Triggering consultation prep video:', {
      appointmentId: params.appointmentId,
      patientName: params.patientName,
    });

    // Build video input props using surgery mapper
    const videoProps: ConsultationPrepProps = buildConsultationPrepProps({
      patientName: params.patientName,
      reason: params.reason,
      appointmentDate: params.appointmentDate,
      appointmentTime: params.appointmentTime,
    });

    console.log('[remotion/templates] Video props:', {
      surgeryType: videoProps.surgeryType,
      prepStepsCount: videoProps.prepSteps.length,
    });

    // Trigger Lambda render
    const result = await renderVideoOnLambda({
      compositionId: 'ConsultationPrep',
      inputProps: videoProps as unknown as Record<string, unknown>,
      metadata: {
        appointmentId: params.appointmentId,
        type: 'consultation-prep',
        patientEmail: params.patientEmail,
        triggeredBy: 'appointment',
        triggeredAt: new Date().toISOString(),
      },
    });

    if (!result.success) {
      throw new Error(result.error || 'Render failed');
    }

    return {
      success: true,
      renderId: result.renderId,
    };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error('[remotion/templates] Failed to trigger video:', errorMessage);

    return {
      success: false,
      error: errorMessage,
    };
  }
}

/**
 * Trigger blog-to-reel video generation (Phase 2)
 * Deferred to future implementation
 */
export async function triggerBlogReelVideo(blogSlug: string) {
  console.log('[remotion/templates] Blog-to-reel deferred to Phase 2:', blogSlug);
  return { success: false, error: 'Not implemented' };
}

/**
 * Trigger outcome dashboard video generation (Phase 2)
 * Deferred to future implementation
 */
export async function triggerOutcomeDashboardVideo() {
  console.log('[remotion/templates] Outcome dashboard deferred to Phase 2');
  return { success: false, error: 'Not implemented' };
}
