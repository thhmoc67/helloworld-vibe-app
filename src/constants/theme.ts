import '@/global.css';

import { Platform } from 'react-native';

import palette from '@/constants/palette';

export const Colors = {
  light: {
    text: palette.textPrimary,
    background: palette.white,
    backgroundElement: palette.gray[100],
    backgroundSelected: palette.gray[200],
    textSecondary: palette.textSecondary,
  },
  dark: {
    text: palette.white,
    background: palette.grey,
    backgroundElement: palette.gray[800],
    backgroundSelected: palette.gray[700],
    textSecondary: palette.gray[400],
  },
} as const;

export type ThemeColor = keyof typeof Colors.light & keyof typeof Colors.dark;

export const Fonts = Platform.select({
  ios: {
    sans: 'system-ui',
    serif: 'ui-serif',
    rounded: 'ui-rounded',
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: 'var(--font-display)',
    serif: 'var(--font-serif)',
    rounded: 'var(--font-rounded)',
    mono: 'var(--font-mono)',
  },
});

export const Spacing = {
  half: 2,
  one: 4,
  two: 8,
  three: 16,
  four: 24,
  five: 32,
  six: 64,
} as const;

export const Radius = {
  sm: 8,
  md: 12,
  full: 9999,
} as const;

export const BottomTabInset = Platform.select({ ios: 50, android: 80 }) ?? 0;
export const MaxContentWidth = 800;
