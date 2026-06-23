import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { TabBarIcon } from '@/components/tab-bar-icon';
import { TAB_ROUTES, type TabRouteName } from '@/constants/tab-bar';
import { fontFamilyForWeight } from '@/constants/fonts';
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

export function HwBottomTabBar({ state, navigation }: HwBottomTabBarProps) {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.wrapper, { paddingBottom: Math.max(insets.bottom, 12) }]}>
      <View style={styles.bar}>
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
              {isFocused ? <View style={styles.activePill} /> : null}
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
    backgroundColor: palette.white,
    borderRadius: 999,
    paddingHorizontal: 8,
    paddingVertical: 8,
    shadowColor: '#101828',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 16,
    elevation: 8,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
    paddingVertical: 8,
    paddingHorizontal: 4,
    minHeight: 56,
    position: 'relative',
  },
  activePill: {
    ...StyleSheet.absoluteFill,
    backgroundColor: palette.lime[100],
    borderRadius: 999,
    marginHorizontal: 2,
  },
  label: {
    fontSize: 11,
    lineHeight: 14,
    fontFamily: fontFamilyForWeight('medium'),
    textAlign: 'center',
  },
  labelActive: {
    fontFamily: fontFamilyForWeight('bold'),
  },
});
