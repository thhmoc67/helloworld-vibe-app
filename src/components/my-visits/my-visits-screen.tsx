import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
  ActivityIndicator,
  Linking,
  RefreshControl,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { RateVisitSheet } from '@/components/my-visits/rate-visit-sheet';
import { RescheduleVisitSheet } from '@/components/my-visits/reschedule-visit-sheet';
import { VisitCard } from '@/components/my-visits/visit-card';
import { ProfileStackScreen } from '@/components/profile/profile-stack-screen';
import { TenantScreenHeader } from '@/components/tenant/tenant-screen-header';
import { EmptyState } from '@/components/ui/empty-state';
import { SegmentedTabToggle } from '@/components/ui/segmented-tab-toggle';
import { Typography } from '@/components/ui/typography';
import palette from '@/constants/palette';
import { TAB_SCREEN_EXTRA_PADDING } from '@/constants/tab-bar';
import { useTabBarInset } from '@/hooks/use-tab-bar-inset';
import { useVisits } from '@/queries/use-visits';
import type { PropertyVisit, VisitTab } from '@/types/visit';
import {
  getVisitDirectionsUrl,
  getVisitPropertyId,
  getVisitPropertyName,
} from '@/utils/visit-format';

function VisitsEmptyState({ tab, onExplore }: { tab: VisitTab; onExplore: () => void }) {
  if (tab === 'upcoming') {
    return (
      <EmptyState
        title="No upcoming visits"
        subtitle="Scheduled property visits will appear here."
        actionLabel="Explore Properties"
        onAction={onExplore}
      />
    );
  }

  return (
    <EmptyState
      title="No past visits yet"
      subtitle="Completed and cancelled visits will show up here after your tours."
    />
  );
}

type MyVisitsScreenProps = {
  variant?: 'tab' | 'stack';
};

export function MyVisitsScreen({ variant = 'tab' }: MyVisitsScreenProps) {
  const router = useRouter();
  const tabBarInset = useTabBarInset();
  const insets = useSafeAreaInsets();
  const { data, isLoading, refetch, isRefetching } = useVisits();
  const [tab, setTab] = useState<VisitTab>('upcoming');
  const [rescheduleVisit, setRescheduleVisit] = useState<PropertyVisit | null>(null);
  const [ratingVisit, setRatingVisit] = useState<PropertyVisit | null>(null);

  const list = tab === 'upcoming' ? data?.upcoming ?? [] : data?.past ?? [];

  function openProperty(visit: PropertyVisit) {
    const propertyId = getVisitPropertyId(visit);
    if (!propertyId) return;

    router.push({
      pathname: '/hdp',
      params: {
        id: String(propertyId),
        name: getVisitPropertyName(visit),
      },
    });
  }

  const bottomPadding =
    variant === 'tab'
      ? tabBarInset + TAB_SCREEN_EXTRA_PADDING
      : Math.max(insets.bottom, 16);

  const content = (
    <>
      <ScrollView
        contentContainerStyle={[styles.scroll, { paddingBottom: bottomPadding }]}
        refreshControl={<RefreshControl refreshing={isRefetching} onRefresh={() => refetch()} />}
        showsVerticalScrollIndicator={false}>
        <SegmentedTabToggle
          value={tab}
          onChange={setTab}
          tabs={[
            { id: 'upcoming', label: 'Upcoming Visits' },
            { id: 'past', label: 'Past Visits' },
          ]}
        />

        <Typography variant="text" size="xl" weight="bold">
          {tab === 'upcoming' ? 'Your upcoming visits' : 'Your past visits'}
        </Typography>

        {isLoading ? (
          <ActivityIndicator color={palette.lime[700]} style={styles.loader} />
        ) : list.length > 0 ? (
          <View style={styles.list}>
            {list.map((visit) => (
              <VisitCard
                key={String(visit.id)}
                visit={visit}
                onReschedule={() => setRescheduleVisit(visit)}
                onRateVisit={() => setRatingVisit(visit)}
                onBookNow={() => openProperty(visit)}
                onViewProperty={() => openProperty(visit)}
                onGetDirections={() => {
                  const url = getVisitDirectionsUrl(visit);
                  if (url) void Linking.openURL(url);
                }}
              />
            ))}
          </View>
        ) : (
          <VisitsEmptyState tab={tab} onExplore={() => router.push('/')} />
        )}
      </ScrollView>

      <RescheduleVisitSheet
        visible={rescheduleVisit != null}
        visit={rescheduleVisit}
        onClose={() => setRescheduleVisit(null)}
        onRescheduled={() => void refetch()}
      />

      <RateVisitSheet
        visible={ratingVisit != null}
        visit={ratingVisit}
        onClose={() => setRatingVisit(null)}
        onSubmitted={() => void refetch()}
      />
    </>
  );

  if (variant === 'stack') {
    return (
      <ProfileStackScreen title="My Visits" centerTitle style={styles.stackBody}>
        {content}
      </ProfileStackScreen>
    );
  }

  return (
    <View style={styles.root}>
      <TenantScreenHeader title="My Visits" />
      {content}
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: palette.white,
  },
  stackBody: {
    paddingHorizontal: 0,
  },
  scroll: {
    paddingHorizontal: 24,
    paddingTop: 16,
    gap: 16,
  },
  list: {
    gap: 16,
  },
  loader: {
    marginTop: 32,
  },
});
