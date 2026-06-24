import { StyleSheet, Text, type TextProps, type TextStyle } from 'react-native';

import { TypeScale, fontStyleForWeight, type FontWeight } from '@/constants/fonts';
import palette from '@/constants/palette';

type DisplaySize = keyof typeof TypeScale.display;
type TextSize = keyof typeof TypeScale.text;

/** Legacy screen variants map to the Satoshi type scale. */
type LegacyVariant = 'title' | 'heading' | 'body' | 'caption' | 'label';

const legacyVariantMap: Record<
  LegacyVariant,
  { variant: 'display' | 'text'; size: DisplaySize | TextSize; weight?: FontWeight }
> = {
  title: { variant: 'display', size: 'lg', weight: 'bold' },
  heading: { variant: 'text', size: 'xl', weight: 'bold' },
  body: { variant: 'text', size: 'md' },
  caption: { variant: 'text', size: 'sm' },
  label: { variant: 'text', size: 'sm', weight: 'medium' },
};

export type TypographyProps = TextProps & {
  variant?: LegacyVariant | 'display' | 'text';
  size?: DisplaySize | TextSize;
  weight?: FontWeight;
  color?: string;
};

export function Typography({
  variant = 'body',
  size,
  weight,
  color = palette.textPrimary,
  style,
  ...props
}: TypographyProps) {
  const legacy = legacyVariantMap[variant as LegacyVariant];
  const resolvedVariant = legacy?.variant ?? (variant as 'display' | 'text');
  const resolvedSize = size ?? legacy?.size ?? 'md';
  const resolvedWeight = weight ?? legacy?.weight ?? 'regular';

  const scale =
    resolvedVariant === 'display'
      ? TypeScale.display[resolvedSize as DisplaySize]
      : TypeScale.text[resolvedSize as TextSize];

  return (
    <Text
      style={[
        scale as TextStyle,
        fontStyleForWeight(resolvedWeight),
        { color },
        style,
      ]}
      {...props}
    />
  );
}

export const Title = (props: Omit<TypographyProps, 'variant'>) => (
  <Typography variant="title" {...props} />
);

export const Heading = (props: Omit<TypographyProps, 'variant'>) => (
  <Typography variant="heading" {...props} />
);

export const Body = (props: Omit<TypographyProps, 'variant'>) => (
  <Typography variant="body" {...props} />
);

export const Caption = (props: Omit<TypographyProps, 'variant'>) => (
  <Typography variant="caption" color={palette.textSecondary} {...props} />
);

export const Label = (props: Omit<TypographyProps, 'variant'>) => (
  <Typography variant="label" color={palette.textLabel} {...props} />
);
