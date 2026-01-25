/**
 * Design system color tokens from the existing Tailwind configuration
 * Matches the clinical brand colors used throughout the website
 */
export const COLORS = {
  // Primary - Clinical Blue
  primary: '#005EB8',
  primaryHover: '#003A70',

  // Accent - Vitality Cyan (cyan-600)
  accent: '#00A3E0',

  // Secondary - Surgical Teal
  secondary: '#009688',

  // Text Colors
  text: '#212B36',           // Deep slate (slate-800 equivalent)
  textSecondary: '#637381',  // Muted gray

  // Functional Colors
  success: '#2E7D32',
  warning: '#FF9800',
  error: '#D32F2F',
  info: '#0288D1',

  // Backgrounds
  background: '#F4F6F8',    // Cloud gray
  surface: '#FFFFFF',
} as const;

/**
 * Typography scale following Major Third ratio (1.250)
 */
export const FONT_SIZES = {
  xs: '12.8px',   // 0.8rem
  sm: '16px',     // 1rem (base)
  md: '20px',     // 1.25rem
  lg: '25px',     // 1.563rem
  xl: '31.25px',  // 1.953rem
  '2xl': '39.06px', // 2.441rem
  '3xl': '48.83px', // 3.052rem
  '4xl': '61.04px', // 3.815rem
  '5xl': '76.29px', // 4.768rem
} as const;

/**
 * Font families matching the website
 */
export const FONTS = {
  primary: 'Inter, system-ui, -apple-system, sans-serif',
  secondary: 'Merriweather, Georgia, serif',
} as const;

/**
 * Spacing scale based on 8-point grid system
 */
export const SPACING = {
  1: '4px',
  2: '8px',
  3: '12px',
  4: '16px',
  5: '20px',
  6: '24px',
  8: '32px',
  10: '40px',
  12: '48px',
  16: '64px',
  20: '80px',
  24: '96px',
} as const;
