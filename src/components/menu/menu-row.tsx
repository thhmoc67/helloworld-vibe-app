import { Pressable, StyleSheet, View } from 'react-native';
import { SymbolView } from 'expo-symbols';

import { ProfileIcon } from '@/components/profile-icon';
import { Typography } from '@/components/ui/typography';
import type { MenuItem } from '@/constants/menu';
import palette from '@/constants/palette';

type MenuRowProps = {
  item: MenuItem;
  onPress: () => void;
  isLast?: boolean;
};

export function MenuRow({ item, onPress, isLast }: MenuRowProps) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.row, pressed && styles.rowPressed, !isLast && styles.rowBorder]}
      accessibilityRole="button"
      accessibilityLabel={item.label}>
      <View style={styles.leading}>
        <ProfileIcon name={item.icon} size={22} color={palette.gray[800]} />
        <Typography variant="text" size="md" weight="medium" style={styles.label}>
          {item.label}
        </Typography>
      </View>
      <SymbolView
        name="chevron.right"
        size={14}
        weight="semibold"
        tintColor={palette.gray[400]}
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 16,
    minHeight: 56,
  },
  rowPressed: {
    backgroundColor: palette.gray[50],
  },
  rowBorder: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: palette.gray[200],
  },
  leading: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  label: {
    color: palette.gray[900],
  },
});
