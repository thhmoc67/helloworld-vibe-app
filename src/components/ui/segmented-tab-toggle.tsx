import { Pressable, StyleSheet, View, type ViewStyle } from 'react-native';

import { Typography } from '@/components/ui/typography';
import palette from '@/constants/palette';
import { Radius } from '@/constants/theme';

export type SegmentedTabOption<T extends string> = {
  id: T;
  label: string;
};

type SegmentedTabToggleProps<T extends string> = {
  value: T;
  onChange: (tab: T) => void;
  tabs: SegmentedTabOption<T>[];
  style?: ViewStyle;
};

export function SegmentedTabToggle<T extends string>({
  value,
  onChange,
  tabs,
  style,
}: SegmentedTabToggleProps<T>) {
  return (
    <View style={[styles.track, style]}>
      {tabs.map((tab) => {
        const active = tab.id === value;

        return (
          <Pressable
            key={tab.id}
            onPress={() => onChange(tab.id)}
            style={[styles.tab, active && styles.tabActive]}
            accessibilityRole="button"
            accessibilityState={{ selected: active }}>
            <Typography
              variant="text"
              size="sm"
              weight="medium"
              color={active ? palette.gray[900] : palette.gray[500]}
              style={styles.tabLabel}>
              {tab.label}
            </Typography>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  track: {
    flexDirection: 'row',
    backgroundColor: '#EEEEEE',
    borderRadius: Radius.full,
    padding: 4,
    gap: 4,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    borderRadius: Radius.full,
  },
  tabActive: {
    backgroundColor: palette.white,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 1,
    elevation: 1,
  },
  tabLabel: {
    textAlign: 'center',
  },
});
