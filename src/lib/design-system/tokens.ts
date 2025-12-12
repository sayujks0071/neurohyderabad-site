/**
 * Design System Tokens for drsayuj.info
 * Based on comprehensive UI refactoring report
 * Implements Grade 1-3 enhancements with clinical precision
 */

export const designTokens = {
  // Color Palette - Clinical Blue Foundation
  colors: {
    // Primary Brand Palette
    primary: {
      50: '#E3F2FD',
      100: '#BBDEFB',
      500: '#005EB8', // Clinical Blue - Main
      700: '#003A70', // Deep Ocean - Hover states
    },
    // Secondary - Surgical Teal
    secondary: {
      500: '#009688', // Surgical Teal
    },
    // Accent - Vitality Cyan (decorative only)
    accent: {
      500: '#00A3E0', // Vitality Cyan
    },
    // Neutral & Surface Palette
    surface: {
      white: '#FFFFFF', // Pure White
      background: '#F4F6F8', // Cloud Gray - Page background
    },
    // Text Colors
    text: {
      primary: '#212B36', // Deep Slate - Primary body text
      secondary: '#637381', // Muted Gray - Metadata
    },
    // Border Colors
    border: {
      default: '#DFE3E8', // Line Gray
    },
    // Functional Status Palette
    status: {
      success: '#2E7D32', // Emerald
      warning: '#FF9800', // Amber
      error: '#D32F2F', // Crimson
      info: '#0288D1', // Sky Blue
    },
  },

  // Typography Scale
  typography: {
    fontFamilies: {
      primary: "'Inter', system-ui, -apple-system, sans-serif", // Headings
      secondary: "'Merriweather', Georgia, serif", // Body
    },
    scale: {
      xs: '0.8rem',    // 12.8px
      sm: '1rem',      // 16px - Base
      md: '1.25rem',   // 20px
      lg: '1.563rem',  // 25px
      xl: '1.953rem',  // 31.25px
      '2xl': '2.441rem', // 39.06px
      '3xl': '3.052rem', // 48.83px
    },
    weights: {
      regular: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
    },
    lineHeights: {
      tight: 1.2,
      normal: 1.3,
      relaxed: 1.4,
      loose: 1.6,
    },
  },

  // 8-Point Grid System
  spacing: {
    1: '4px',   // Minimal separation
    2: '8px',   // Related elements (icon + text)
    4: '16px',  // Standard component padding
    6: '24px',  // Card gutter
    8: '32px',  // Section separation - Mobile
    16: '64px', // Section separation - Desktop
  },

  // Shadows & Elevation
  shadows: {
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
  },

  // Breakpoints (Mobile-First)
  breakpoints: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
  },

  // Touch Targets (Accessibility)
  touchTargets: {
    minimum: '44px', // Minimum interactive element size
  },
} as const;

export type DesignTokens = typeof designTokens;





















