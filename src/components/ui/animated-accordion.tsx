import { useEffect, type ReactNode } from 'react';
import { View, type StyleProp, type ViewStyle } from 'react-native';
import Animated, {
  Easing,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

const EXPAND_MS = 280;
const CHEVRON_MS = 220;

type AnimatedAccordionContentProps = {
  expanded: boolean;
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
};

export function AnimatedAccordionContent({
  expanded,
  children,
  style,
}: AnimatedAccordionContentProps) {
  const expandProgress = useSharedValue(expanded ? 1 : 0);
  const contentHeight = useSharedValue(0);

  useEffect(() => {
    expandProgress.value = withTiming(expanded ? 1 : 0, {
      duration: EXPAND_MS,
      easing: Easing.out(Easing.cubic),
    });
  }, [expandProgress, expanded]);

  const animatedStyle = useAnimatedStyle(() => ({
    height: contentHeight.value > 0 ? contentHeight.value * expandProgress.value : 0,
    opacity: interpolate(expandProgress.value, [0, 0.35, 1], [0, 0.7, 1]),
    overflow: 'hidden',
  }));

  return (
    <Animated.View style={[animatedStyle, style]}>
      <View
        onLayout={(event) => {
          const nextHeight = event.nativeEvent.layout.height;
          if (nextHeight > 0) {
            contentHeight.value = nextHeight;
          }
        }}>
        {children}
      </View>
    </Animated.View>
  );
}

export function useAnimatedChevronRotation(
  expanded: boolean,
  collapsedDeg = 0,
  expandedDeg = 180,
) {
  const rotation = useSharedValue(expanded ? expandedDeg : collapsedDeg);

  useEffect(() => {
    rotation.value = withTiming(expanded ? expandedDeg : collapsedDeg, {
      duration: CHEVRON_MS,
      easing: Easing.out(Easing.cubic),
    });
  }, [collapsedDeg, expanded, expandedDeg, rotation]);

  return useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotation.value}deg` }],
  }));
}
