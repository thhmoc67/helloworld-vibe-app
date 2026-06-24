import { Pressable, StyleSheet, View } from 'react-native';

import { Typography } from '@/components/ui/typography';
import palette from '@/constants/palette';
import { Radius } from '@/constants/theme';

type HdpAmenityPillsProps = {
  items: string[];
  onViewAll?: () => void;
};

export function HdpAmenityPills({ items, onViewAll }: HdpAmenityPillsProps) {
  const visible = items.slice(0, 11);

  return (
    <View style={styles.wrap}>
      {visible.map((item) => (
        <View key={item} style={styles.pill}>
          <Typography variant="text" size="sm" weight="medium" color={palette.gray[800]}>
            {item}
          </Typography>
        </View>
      ))}
      {items.length > visible.length ? (
        <Pressable onPress={onViewAll} style={[styles.pill, styles.viewAll]}>
          <Typography variant="text" size="sm" weight="medium" color={palette.blue[600]}>
            View All
          </Typography>
        </Pressable>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  pill: {
    backgroundColor: palette.gray[50],
    borderWidth: 1,
    borderColor: palette.gray[200],
    borderRadius: Radius.full,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  viewAll: {
    backgroundColor: palette.white,
    borderColor: palette.blue[200],
  },
});
