import { Platform, type TextStyle } from 'react-native';

/** Satoshi type scale from brand typography guidelines. */
export const TypeScale = {
  display: {
    '2xl': { fontSize: 72, lineHeight: 90, letterSpacing: -1.44 },
    xl: { fontSize: 60, lineHeight: 72, letterSpacing: -1.2 },
    lg: { fontSize: 48, lineHeight: 60, letterSpacing: -0.96 },
    md: { fontSize: 36, lineHeight: 44, letterSpacing: -0.72 },
    sm: { fontSize: 30, lineHeight: 38 },
    xs: { fontSize: 24, lineHeight: 32 },
  },
  text: {
    xl: { fontSize: 20, lineHeight: 30 },
    lg: { fontSize: 18, lineHeight: 28 },
    md: { fontSize: 16, lineHeight: 24 },
    sm: { fontSize: 14, lineHeight: 20 },
    xs: { fontSize: 12, lineHeight: 18 },
  },
} as const;

/** Registered family name for Satoshi Variable (must match useFonts key). */
export const Fonts = {
  satoshi: 'Satoshi Variable',
} as const;

export const FontAssets = {
  [Fonts.satoshi]: require('../../assets/fonts/Satoshi-Variable.ttf'),
} as const;

/** CSS-style weight names mapped to Satoshi variable axis values. */
export const FONT_WEIGHTS = [
  'thin',
  'extralight',
  'light',
  'regular',
  'medium',
  'semibold',
  'bold',
  'extrabold',
  'black',
] as const;

export type FontWeight = (typeof FONT_WEIGHTS)[number];

/** Numeric CSS weight for each token. */
export const FONT_WEIGHT_VALUES: Record<FontWeight, TextStyle['fontWeight']> = {
  thin: '100',
  extralight: '200',
  light: '300',
  regular: '400',
  medium: '500',
  semibold: '600',
  bold: '700',
  extrabold: '800',
  black: '900',
};

/** @deprecated Use `fontStyleForWeight` — kept for legacy imports. */
export function fontFamilyForWeight(_weight: FontWeight = 'regular'): string {
  return Fonts.satoshi;
}

/** Satoshi Variable: one family + numeric weight axis. */
export function fontStyleForWeight(weight: FontWeight = 'regular'): TextStyle {
  return {
    fontFamily: Fonts.satoshi,
    fontWeight: FONT_WEIGHT_VALUES[weight],
    fontStyle: 'normal',
  };
}
