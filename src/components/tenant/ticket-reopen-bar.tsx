import { ActivityIndicator, Pressable, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Typography } from '@/components/ui/typography';
import palette from '@/constants/palette';

type TicketReopenBarProps = {
  onReopen: () => void;
  loading?: boolean;
};

export function TicketReopenBar({ onReopen, loading = false }: TicketReopenBarProps) {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.footer, { paddingBottom: Math.max(insets.bottom, 16) }]}>
      <Typography variant="text" size="sm" color={palette.gray[500]} style={styles.status}>
        This ticket is marked as resolved
      </Typography>
      <View style={styles.actionRow}>
        <Typography variant="text" size="sm" color={palette.gray[800]}>
          Not Satisfied?{' '}
        </Typography>
        <Pressable
          onPress={onReopen}
          disabled={loading}
          accessibilityRole="button"
          hitSlop={8}>
          {loading ? (
            <ActivityIndicator size="small" color={palette.blue[600]} />
          ) : (
            <Typography variant="text" size="sm" weight="bold" color={palette.blue[600]}>
              Reopen ticket
            </Typography>
          )}
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  footer: {
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 24,
    paddingTop: 16,
    backgroundColor: palette.white,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: palette.gray[200],
  },
  status: {
    textAlign: 'center',
  },
  actionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
