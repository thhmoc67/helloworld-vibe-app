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
