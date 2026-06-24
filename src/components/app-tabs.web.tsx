import { Tabs, TabList, TabSlot, TabTrigger } from 'expo-router/ui';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { TabBarIcon } from '@/components/tab-bar-icon';
import { TAB_ROUTES, type TabBarIconName, type TabRouteName } from '@/constants/tab-bar';
import { fontStyleForWeight } from '@/constants/fonts';
import palette from '@/constants/palette';

const TAB_ORDER: TabRouteName[] = ['home', 'my-visits', 'wishlist', 'contact'];

export default function AppTabs() {
  const insets = useSafeAreaInsets();

  return (
    <Tabs>
      <TabSlot style={styles.slot} />
      <TabList style={[styles.tabList, { paddingBottom: Math.max(insets.bottom, 12) }]}>
        {TAB_ORDER.map((name) => {
          const meta = TAB_ROUTES[name];

          return (
            <TabTrigger key={name} name={name} href={`/(tabs)/${name}`} asChild>
              <TabButton label={meta.label} icon={meta.icon} />
            </TabTrigger>
          );
        })}
      </TabList>
    </Tabs>
  );
}

function TabButton({
  label,
  icon,
  isFocused,
  ...props
}: {
  label: string;
  icon: TabBarIconName;
  isFocused?: boolean;
} & React.ComponentProps<typeof Pressable>) {
  const color = isFocused ? palette.lime[700] : palette.black;

  return (
    <Pressable {...props} style={styles.tab} accessibilityRole="button" accessibilityState={{ selected: isFocused }}>
      <View style={[styles.tabInner, isFocused && styles.tabInnerFocused]}>
        <TabBarIcon name={icon} size={22} color={color} />
        <Text style={[styles.label, { color }, isFocused && styles.labelActive]}>{label}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  slot: {
    flex: 1,
  },
  tabList: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 8,
    backgroundColor: palette.white,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: palette.gray[200],
  },
  tab: {
    flex: 1,
  },
  tabInner: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
    paddingVertical: 8,
    paddingHorizontal: 4,
    minHeight: 56,
    borderRadius: 999,
  },
  tabInnerFocused: {
    backgroundColor: palette.lime[100],
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
