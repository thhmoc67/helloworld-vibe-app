import { SymbolView } from 'expo-symbols';
import { useRouter } from 'expo-router';
import { Pressable, StyleSheet, View } from 'react-native';

import { Typography } from '@/components/ui/typography';
import palette from '@/constants/palette';
import { Radius } from '@/constants/theme';
import { useBookingStatus } from '@/queries/use-booking-status';
import { useTenantProfile } from '@/stores/tenant-store';
import { buildMoveInSteps, partitionMoveInSteps } from '@/utils/move-in-steps';

export function DashboardMoveInStepsCard() {
  const router = useRouter();
  const profile = useTenantProfile();
  const { data: status } = useBookingStatus();

  if (!profile?.bookingId || !status) {
    return null;
  }

  const { pending, doneCount, total } = partitionMoveInSteps(buildMoveInSteps(status, profile));

  if (pending.length === 0) {
    return null;
  }

  return (
    <Pressable
      onPress={() => router.push('/move-in-steps')}
      style={styles.card}
      accessibilityRole="button"
      accessibilityLabel="View move-in steps">
      <View style={styles.content}>
        <Typography variant="text" size="sm" weight="bold">
          Your Move-in Steps
        </Typography>
        <Typography variant="text" size="xs" color={palette.gray[500]}>
          {doneCount} of {total} completed · {pending.length} pending
        </Typography>
      </View>
      <SymbolView name="chevron.right" size={14} weight="semibold" tintColor={palette.lime[700]} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: palette.lime[50],
    borderRadius: Radius.md,
    paddingHorizontal: 16,
    paddingVertical: 14,
    gap: 12,
  },
  content: {
    flex: 1,
    gap: 4,
  },
});
