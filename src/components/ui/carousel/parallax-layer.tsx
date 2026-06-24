import type { ReactNode } from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedStyle,
  type SharedValue,
} from 'react-native-reanimated';

type ParallaxLayerProps = {
  animationValue: SharedValue<number>;
  children: ReactNode;
  offset?: number;
  style?: StyleProp<ViewStyle>;
};

export function ParallaxLayer({
  animationValue,
  children,
  offset = 36,
  style,
}: ParallaxLayerProps) {
  const animatedStyle = useAnimatedStyle(() => ({
    flex: 1,
    transform: [
      {
        translateX: interpolate(
          animationValue.value,
          [-1, 0, 1],
          [-offset, 0, offset],
          Extrapolation.CLAMP,
        ),
      },
    ],
  }));

  return (
    <Animated.View style={[style, { overflow: 'hidden' }]}>
      <Animated.View style={animatedStyle}>{children}</Animated.View>
    </Animated.View>
  );
}
