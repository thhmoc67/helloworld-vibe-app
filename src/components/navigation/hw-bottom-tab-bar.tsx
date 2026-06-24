import { useEffect, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { TabBarIcon } from '@/components/tab-bar-icon';
import {
  PROSPECT_TAB_ORDER,
  PROSPECT_TAB_ROUTES,
  TENANT_TAB_ORDER,
  TENANT_TAB_ROUTES,
  type ProspectTabRouteName,
  type TabBarIconName,
  type TenantTabRouteName,
} from '@/constants/tab-bar';
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
  isTenant?: boolean;
};

const PILL_SPRING = { damping: 20, stiffness: 240, mass: 0.75 };
const PILL_INSET = 2;

type TabMeta = {
  label: string;
  icon: TabBarIconName;
};

function getTabMeta(isTenant: boolean, name: string): TabMeta | null {
  if (isTenant && name in TENANT_TAB_ROUTES) {
    return TENANT_TAB_ROUTES[name as TenantTabRouteName];
  }
  if (!isTenant && name in PROSPECT_TAB_ROUTES) {
    return PROSPECT_TAB_ROUTES[name as ProspectTabRouteName];
  }
  return null;
}

export function HwBottomTabBar({ state, navigation, isTenant = false }: HwBottomTabBarProps) {
  const insets = useSafeAreaInsets();
  const [barWidth, setBarWidth] = useState(0);
  const activeIndex = useSharedValue(0);

  const tabOrder = isTenant ? TENANT_TAB_ORDER : PROSPECT_TAB_ORDER;
  const visibleTabs = tabOrder
    .map((name) => {
      const route = state.routes.find((item) => item.name === name);
      const meta = getTabMeta(isTenant, name);
      if (!route || !meta) return null;
      return { route, meta };
    })
    .filter(Boolean) as { route: TabRoute; meta: TabMeta }[];

  const focusedName = state.routes[state.index]?.name;
  const focusedVisibleIndex = Math.max(
    0,
    visibleTabs.findIndex((tab) => tab.route.name === focusedName),
  );

  useEffect(() => {
    activeIndex.value = withSpring(focusedVisibleIndex, PILL_SPRING);
  }, [focusedVisibleIndex, activeIndex]);

  const pillAnimatedStyle = useAnimatedStyle(() => {
    const tabCount = visibleTabs.length;
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

        {visibleTabs.map(({ route, meta }) => {
          const isFocused = focusedName === route.name;

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
    backgroundColor: palette.white,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: palette.gray[200],
  },
  bar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: palette.gray[50],
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
    backgroundColor: palette.lime[50],
    borderRadius: 999,
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
