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

export const Fonts = {
  satoshiRegular: 'Satoshi-Regular',
  satoshiMedium: 'Satoshi-Medium',
  satoshiBold: 'Satoshi-Bold',
} as const;

export const FontAssets = {
  [Fonts.satoshiRegular]: require('../../assets/fonts/Satoshi-Regular.ttf'),
  [Fonts.satoshiMedium]: require('../../assets/fonts/Satoshi-Medium.ttf'),
  [Fonts.satoshiBold]: require('../../assets/fonts/Satoshi-Bold.ttf'),
} as const;

export type FontWeight = 'regular' | 'medium' | 'bold';

export function fontFamilyForWeight(weight: FontWeight): string {
  if (weight === 'bold') return Fonts.satoshiBold;
  if (weight === 'medium') return Fonts.satoshiMedium;
  return Fonts.satoshiRegular;
}
