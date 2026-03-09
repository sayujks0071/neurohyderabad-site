import React, { useMemo } from 'react';
import { AbsoluteFill, Sequence, useCurrentFrame, interpolate, spring, useVideoConfig, Easing } from 'remotion';
import type { ConsultationPrepProps } from '../types/ConsultationPrepProps';
import { WelcomeScene } from '../components/ConsultationPrep/WelcomeScene';
import { CalendarScene } from '../components/ConsultationPrep/CalendarScene';
import { PrepStepsScene } from '../components/ConsultationPrep/PrepStepsScene';
import { TransitionFlash } from '../components/shared/TransitionFlash';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';

// Transition Easing
const smoothEase = Easing.inOut(Easing.ease);

/**
 * Personalized Consultation Prep Video (30 seconds @ 30fps = 900 frames)
 *
 * Scene breakdown:
 * - Frames 0-180 (6s): Welcome Scene - Patient greeting
 * - Frames 150-450 (10s): Calendar Scene - Appointment date visualization (starts with crossfade)
 * - Frames 420-900 (16s): Prep Steps Scene - 3 preparation steps (starts with crossfade)
 */
export const ConsultationPrepVideo: React.FC<ConsultationPrepProps> = ({
  patientName,
  surgeryType,
  appointmentDate,
  appointmentTime,
  prepSteps,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const prefersReducedMotion = usePrefersReducedMotion();

  // Scene 1 Exit: Fade out, scale down slightly
  const scene1ExitOpacity = useMemo(() => interpolate(frame, [160, 180], [1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: smoothEase,
  }), [frame]);

  const scene1ExitScale = useMemo(() => interpolate(frame, [160, 180], [1, 0.95], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: smoothEase,
  }), [frame]);

  // Scene 2 Entrance: Slide up, fade in
  const scene2EnterSpring = useMemo(() => spring({
    frame: frame - 150,
    fps,
    from: 50,
    to: 0,
    config: { damping: 15 },
  }), [frame, fps]);

  const scene2EnterOpacity = useMemo(() => interpolate(frame, [150, 170], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: smoothEase,
  }), [frame]);

  // Scene 2 Exit: Fade out, push up
  const scene2ExitOpacity = useMemo(() => interpolate(frame, [430, 460], [1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: smoothEase,
  }), [frame]);

  const scene2ExitY = useMemo(() => interpolate(frame, [430, 460], [0, -50], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: smoothEase,
  }), [frame]);

  // Scene 3 Entrance: Slide up, fade in
  const scene3EnterSpring = useMemo(() => spring({
    frame: frame - 430,
    fps,
    from: 50,
    to: 0,
    config: { damping: 15 },
  }), [frame, fps]);

  const scene3EnterOpacity = useMemo(() => interpolate(frame, [430, 450], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: smoothEase,
  }), [frame]);

  return (
    <AbsoluteFill style={{ backgroundColor: 'white' }}>
      {/* Scene 1: Welcome (6 seconds) */}
      <Sequence from={0} durationInFrames={180}>
        <AbsoluteFill
          style={{
            opacity: scene1ExitOpacity,
            transform: `scale(${prefersReducedMotion ? 1 : scene1ExitScale})`,
          }}
        >
          <WelcomeScene patientName={patientName} />
        </AbsoluteFill>
      </Sequence>

      {/* Scene 2: Calendar (10 seconds + overlap) */}
      <Sequence from={150} durationInFrames={310}>
        <AbsoluteFill
          style={{
            opacity: scene2EnterOpacity * scene2ExitOpacity,
            transform: `translateY(${prefersReducedMotion ? 0 : scene2EnterSpring + scene2ExitY}px)`,
          }}
        >
          <CalendarScene
            appointmentDate={appointmentDate}
            appointmentTime={appointmentTime}
          />
        </AbsoluteFill>
      </Sequence>

      {/* Scene 3: Prep Steps (16 seconds + overlap) */}
      <Sequence from={430} durationInFrames={470}>
        <AbsoluteFill
          style={{
            opacity: scene3EnterOpacity,
            transform: `translateY(${prefersReducedMotion ? 0 : scene3EnterSpring}px)`,
          }}
        >
          <PrepStepsScene
            surgeryType={surgeryType}
            prepSteps={prepSteps}
          />
        </AbsoluteFill>
      </Sequence>

      {/* Transition Flashes (Placed on top for smooth effect) */}
      <TransitionFlash startFrame={165} />
      <TransitionFlash startFrame={445} />
    </AbsoluteFill>
  );
};
