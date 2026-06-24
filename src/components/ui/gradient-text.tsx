import MaskedView from '@react-native-masked-view/masked-view';
import { LinearGradient } from 'expo-linear-gradient';
import { Platform, StyleSheet, type StyleProp, type TextStyle } from 'react-native';

import { Typography, type TypographyProps } from '@/components/ui/typography';
import palette from '@/constants/palette';

const DEFAULT_GRADIENT = [palette.lightBlue, '#4F46E5'] as const;

type GradientTextProps = Omit<TypographyProps, 'color' | 'children'> & {
  children: string;
  colors?: readonly [string, string, ...string[]];
  style?: StyleProp<TextStyle>;
};

export function GradientText({
  children,
  style,
  colors = DEFAULT_GRADIENT,
  variant = 'text',
  size = 'xl',
  weight = 'bold',
  ...props
}: GradientTextProps) {
  const typographyProps = { variant, size, weight, style, ...props };

  if (Platform.OS === 'web') {
    const webStyle = {
      backgroundImage: `linear-gradient(90deg, ${colors.join(', ')})`,
      backgroundClip: 'text',
      WebkitBackgroundClip: 'text',
      color: 'transparent',
    } as TextStyle;

    return (
      <Typography {...typographyProps} style={[style, webStyle]}>
        {children}
      </Typography>
    );
  }

  return (
    <MaskedView
      maskElement={
        <Typography {...typographyProps} style={[style, styles.maskText]}>
          {children}
        </Typography>
      }>
      <LinearGradient colors={[...colors]} start={{ x: 0, y: 0.5 }} end={{ x: 1, y: 0.5 }}>
        <Typography {...typographyProps} style={[style, styles.hiddenText]}>
          {children}
        </Typography>
      </LinearGradient>
    </MaskedView>
  );
}

const styles = StyleSheet.create({
  maskText: {
    backgroundColor: 'transparent',
  },
  hiddenText: {
    opacity: 0,
  },
});
