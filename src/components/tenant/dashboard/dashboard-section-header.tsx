import { Pressable, StyleSheet, View } from 'react-native';

import { Typography } from '@/components/ui/typography';
import palette from '@/constants/palette';

type DashboardSectionHeaderProps = {
  title: string;
  actionLabel?: string;
  subtitle?: string;
  onActionPress?: () => void;
};

export function DashboardSectionHeader({
  title,
  actionLabel,
  subtitle,
  onActionPress,
}: DashboardSectionHeaderProps) {
  return (
    <View style={styles.root}>
      <View style={styles.copy}>
        <Typography variant="text" size="xl" weight="medium">
          {title}
        </Typography>
        {subtitle ? (
          <Typography variant="text" size="sm" color={palette.gray[600]}>
            {subtitle}
          </Typography>
        ) : null}
      </View>
      {actionLabel && onActionPress ? (
        <Pressable onPress={onActionPress} accessibilityRole="button" hitSlop={8}>
          <Typography variant="text" size="sm" weight="medium" color={palette.lime[700]}>
            {actionLabel}
          </Typography>
        </Pressable>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: 12,
  },
  copy: {
    flex: 1,
    gap: 4,
  },
});
