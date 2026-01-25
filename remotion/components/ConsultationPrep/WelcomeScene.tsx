import { spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { COLORS, FONTS } from '../../utils/colorTokens';

export interface WelcomeSceneProps {
  patientName: string;
}

export const WelcomeScene: React.FC<WelcomeSceneProps> = ({ patientName }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Spring-based fade-in animation
  const opacity = spring({
    frame,
    fps,
    from: 0,
    to: 1,
    durationInFrames: 30,
  });

  // Spring-based scale animation
  const scale = spring({
    frame,
    fps,
    from: 0.8,
    to: 1,
    durationInFrames: 30,
    config: {
      damping: 15,
    },
  });

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        backgroundColor: COLORS.accent, // cyan-600 (#00A3E0)
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        opacity,
      }}
    >
      <div
        style={{
          transform: `scale(${scale})`,
          textAlign: 'center',
        }}
      >
        <h1
          style={{
            fontFamily: FONTS.primary,
            fontSize: '72px',
            fontWeight: 700,
            color: COLORS.text, // slate-800 (#212B36)
            margin: 0,
            marginBottom: '24px',
          }}
        >
          Hi {patientName}!
        </h1>
        <p
          style={{
            fontFamily: FONTS.primary,
            fontSize: '32px',
            fontWeight: 500,
            color: COLORS.text,
            margin: 0,
          }}
        >
          Welcome to Dr. Sayuj Krishnan's Practice
        </p>
      </div>
    </div>
  );
};
