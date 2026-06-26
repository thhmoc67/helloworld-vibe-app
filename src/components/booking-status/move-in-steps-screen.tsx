import { useFocusEffect, useRouter } from 'expo-router';
import { useCallback } from 'react';
import {
  ActivityIndicator,
  RefreshControl,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { MoveInCompletedSection } from '@/components/booking-status/move-in-completed-section';
import { MoveInPendingCard } from '@/components/booking-status/move-in-pending-card';
import { MoveInProgressCard } from '@/components/booking-status/move-in-progress-card';
import { MoveInStepsHeader } from '@/components/booking-status/move-in-steps-header';
import { DashboardMoveInPendingPaymentCard } from '@/components/tenant/dashboard/dashboard-move-in-pending-payment-card';
import { Typography } from '@/components/ui/typography';
import palette from '@/constants/palette';
import { useMoveInPayment } from '@/hooks/use-move-in-payment';
import { useBookingStatus } from '@/queries/use-booking-status';
import { useTenantInvoices } from '@/queries/use-tenant-invoices';
import { useTenantProfile, useTenantStore } from '@/stores/tenant-store';
import type { MoveInStep } from '@/types/booking-status';
import { buildMoveInSteps, partitionMoveInSteps } from '@/utils/move-in-steps';
import {
  getMoveInPendingAmount,
  shouldShowMoveInPendingPaymentCard,
} from '@/utils/move-in-payment';
import { resetRootRoute } from '@/utils/navigation-reset';

export function MoveInStepsScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const profile = useTenantProfile();
  const { startMoveInPayment } = useMoveInPayment();
  const { data: invoices } = useTenantInvoices();
  const { data: status, isLoading, isError, refetch, isRefetching } = useBookingStatus();

  useFocusEffect(
    useCallback(() => {
      refetch();
    }, [refetch]),
  );

  const moveInInterests = useTenantStore((state) => state.moveInInterests);
  const moveInBackground = useTenantStore((state) => state.moveInBackground);
  const steps = status ? buildMoveInSteps(status, profile, moveInInterests, moveInBackground) : [];
  const { completed, pending, total, doneCount } = partitionMoveInSteps(steps);
  const moveInDate = status?.move_in_date ?? profile?.propertyInfo?.moveInDate ?? '';
  const nextPending = invoices?.pending?.[0];
  const showMoveInPendingPayment = shouldShowMoveInPendingPaymentCard(profile, status);
  const moveInPendingAmount = getMoveInPendingAmount(profile, nextPending);
  const visiblePending = showMoveInPendingPayment
    ? pending.filter((step) => step.id !== 'advance-charges')
    : pending;

  function handleMoveInPayment() {
    startMoveInPayment();
  }

  const handleBack = useCallback(() => {
    resetRootRoute('/(tabs)/dashboard');
  }, []);

  function handleStepPress(step: MoveInStep) {
    if (step.route) {
      router.push(step.route as never);
    }
  }

  return (
    <View style={styles.root}>
      <MoveInStepsHeader onBack={handleBack} />

      {isLoading ? (
        <View style={styles.loader}>
          <ActivityIndicator color={palette.helloLime} />
        </View>
      ) : isError || !status ? (
        <View style={styles.loader}>
          <Typography variant="body" color={palette.textSecondary} style={styles.errorText}>
            Unable to load your move-in steps right now.
          </Typography>
        </View>
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          refreshControl={<RefreshControl refreshing={isRefetching} onRefresh={() => refetch()} />}
          contentContainerStyle={[
            styles.content,
            { paddingBottom: Math.max(insets.bottom, 24) + 24 },
          ]}>
          {showMoveInPendingPayment ? (
            <DashboardMoveInPendingPaymentCard
              propertyName={profile?.propertyInfo?.name ?? 'Your property'}
              locality={profile?.propertyInfo?.locality}
              imageUrl={profile?.propertyInfo?.imageUrl}
              amount={moveInPendingAmount}
              onPayPress={handleMoveInPayment}
            />
          ) : null}

          {moveInDate ? (
            <MoveInProgressCard doneCount={doneCount} total={total} moveInDate={moveInDate} />
          ) : null}

          {visiblePending.length > 0 ? (
            <View style={styles.section}>
              <Typography variant="text" size="xl" weight="bold">
                Pending Actions
              </Typography>
              {visiblePending.map((step) => (
                <MoveInPendingCard
                  key={step.id}
                  step={step}
                  onPress={step.actionLabel ? () => handleStepPress(step) : undefined}
                />
              ))}
            </View>
          ) : null}

          <MoveInCompletedSection steps={completed} />
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: palette.white,
  },
  loader: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  errorText: {
    textAlign: 'center',
  },
  content: {
    paddingHorizontal: 24,
    paddingTop: 16,
    gap: 32,
  },
  section: {
    gap: 16,
  },
});
