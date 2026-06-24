import * as WebBrowser from 'expo-web-browser';
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
import { Typography } from '@/components/ui/typography';
import { getKycLink } from '@/api/user';
import palette from '@/constants/palette';
import { useBookingStatus } from '@/queries/use-booking-status';
import { useTenantProfile } from '@/stores/tenant-store';
import type { MoveInStep } from '@/types/booking-status';
import { buildMoveInSteps, partitionMoveInSteps } from '@/utils/move-in-steps';

export function MoveInStepsScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const profile = useTenantProfile();
  const { data: status, isLoading, isError, refetch, isRefetching } = useBookingStatus();

  useFocusEffect(
    useCallback(() => {
      refetch();
    }, [refetch]),
  );

  const steps = status ? buildMoveInSteps(status, profile) : [];
  const { completed, pending, total, doneCount } = partitionMoveInSteps(steps);
  const moveInDate = status?.move_in_date ?? profile?.propertyInfo?.moveInDate ?? '';

  const handleBack = useCallback(() => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace('/(tabs)/dashboard');
    }
  }, [router]);

  async function handleStepPress(step: MoveInStep) {
    if (step.id === 'document-verification') {
      if (!profile?.bookingId) return;
      const response = await getKycLink(profile.bookingId);
      const url = response?.data?.url ?? response?.url;
      if (url) {
        await WebBrowser.openBrowserAsync(url);
      }
      return;
    }

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
          {moveInDate ? (
            <MoveInProgressCard doneCount={doneCount} total={total} moveInDate={moveInDate} />
          ) : null}

          {pending.length > 0 ? (
            <View style={styles.section}>
              <Typography variant="text" size="xl" weight="bold">
                Pending Actions
              </Typography>
              {pending.map((step) => (
                <MoveInPendingCard
                  key={step.id}
                  step={step}
                  onPress={
                    step.actionLabel || step.id === 'document-verification'
                      ? () => handleStepPress(step)
                      : undefined
                  }
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
