import { useEffect, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { TabBarIcon } from '@/components/tab-bar-icon';
import { TAB_ROUTES, type TabRouteName } from '@/constants/tab-bar';
import { fontStyleForWeight } from '@/constants/fonts';
import palette from '@/constants/palette';

type TabRoute = { key: string; name: string; params?: object };

type HwBottomTabBarProps = {
  state: {
    index: number;
    routes: TabRoute[];
  };
  navigation: {
    emit: (event: {
      type: 'tabPress';
      target: string;
      canPreventDefault: true;
    }) => { defaultPrevented: boolean };
    navigate: (name: string, params?: object) => void;
  };
};

const PILL_SPRING = { damping: 20, stiffness: 240, mass: 0.75 };
const PILL_INSET = 2;

export function HwBottomTabBar({ state, navigation }: HwBottomTabBarProps) {
  const insets = useSafeAreaInsets();
  const [barWidth, setBarWidth] = useState(0);
  const activeIndex = useSharedValue(state.index);

  const tabCount = state.routes.length;

  useEffect(() => {
    activeIndex.value = withSpring(state.index, PILL_SPRING);
  }, [state.index, activeIndex]);

  const pillAnimatedStyle = useAnimatedStyle(() => {
    if (barWidth === 0 || tabCount === 0) {
      return { opacity: 0 };
    }

    const tabWidth = barWidth / tabCount;

    return {
      opacity: 1,
      width: tabWidth - PILL_INSET * 2,
      transform: [{ translateX: activeIndex.value * tabWidth + PILL_INSET }],
    };
  });

  return (
    <View
      style={[styles.wrapper, { paddingBottom: Math.max(insets.bottom, 12) }]}
      pointerEvents="box-none">
      <View
        style={styles.bar}
        onLayout={(event) => setBarWidth(event.nativeEvent.layout.width)}>
        <Animated.View style={[styles.activePill, pillAnimatedStyle]} pointerEvents="none" />

        {state.routes.map((route, index) => {
          const meta = TAB_ROUTES[route.name as TabRouteName];
          if (!meta) return null;

          const isFocused = state.index === index;

          function onPress() {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name, route.params);
            }
          }

          const color = isFocused ? palette.lime[700] : palette.black;

          return (
            <Pressable
              key={route.key}
              onPress={onPress}
              style={styles.tab}
              accessibilityRole="button"
              accessibilityState={{ selected: isFocused }}
              accessibilityLabel={meta.label}>
              <TabBarIcon name={meta.icon} size={22} color={color} />
              <Text style={[styles.label, { color }, isFocused && styles.labelActive]}>
                {meta.label}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: 16,
    paddingTop: 8,
    backgroundColor: 'transparent',
  },
  bar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'transparent',
    borderRadius: 999,
    paddingHorizontal: 8,
    paddingVertical: 8,
    position: 'relative',
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
    paddingVertical: 8,
    paddingHorizontal: 4,
    minHeight: 56,
    zIndex: 1,
  },
  activePill: {
    position: 'absolute',
    top: 8,
    bottom: 8,
    left: 0,
    backgroundColor: palette.lime[100],
    borderRadius: 999,
    shadowColor: palette.lime[400],
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 2,
  },
  label: {
    fontSize: 11,
    lineHeight: 14,
    ...fontStyleForWeight('medium'),
    textAlign: 'center',
  },
  labelActive: {
    ...fontStyleForWeight('bold'),
  },
});
