import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
  ActivityIndicator,
  Pressable,
  RefreshControl,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import { SymbolView } from 'expo-symbols';

import { CommunityEventCard } from '@/components/community/community-event-card';
import { CommunityPromoCard } from '@/components/community/community-promo-card';
import { CommunityRequestSheet } from '@/components/community/community-request-sheet';
import { TenantScreenHeader } from '@/components/tenant/tenant-screen-header';
import { Button } from '@/components/ui/button';
import { SegmentedTabToggle } from '@/components/ui/segmented-tab-toggle';
import { Typography } from '@/components/ui/typography';
import { postEventRequest } from '@/api/community';
import {
  COMMUNITY_EVENT_TABS,
  COMMUNITY_TAB_HEADINGS,
  type CommunityEventsTab,
} from '@/constants/community';
import palette from '@/constants/palette';
import { Radius } from '@/constants/theme';
import { useCommunityEvents } from '@/queries/use-events';

export function CommunityEventsScreen() {
  const router = useRouter();
  const [tab, setTab] = useState<CommunityEventsTab>('upcoming');
  const [requestVisible, setRequestVisible] = useState(false);
  const { data: events, isLoading, refetch, isRefetching } = useCommunityEvents(tab);

  const hasEvents = (events?.length ?? 0) > 0;
  const showEmpty = !isLoading && !hasEvents;
  const showPromo = tab === 'upcoming' && hasEvents;

  async function handleRequestSubmit(payload: {
    name: string;
    categories: string[];
    description: string;
  }) {
    await postEventRequest(payload);
  }

  return (
    <View style={styles.root}>
      <TenantScreenHeader title="Community Events" onBack={() => router.back()} />

      <ScrollView
        contentContainerStyle={styles.scroll}
        refreshControl={<RefreshControl refreshing={isRefetching} onRefresh={() => refetch()} />}
        showsVerticalScrollIndicator={false}>
        <SegmentedTabToggle value={tab} onChange={setTab} tabs={COMMUNITY_EVENT_TABS} />

        {!showEmpty ? (
          <Typography variant="text" size="lg" weight="medium" style={styles.heading}>
            {COMMUNITY_TAB_HEADINGS[tab]}
          </Typography>
        ) : null}

        {isLoading ? (
          <ActivityIndicator color={palette.lime[700]} style={styles.loader} />
        ) : showEmpty ? (
          <View style={styles.empty}>
            <Typography variant="text" size="lg" weight="medium" style={styles.emptyTitle}>
              No Events scheduled this week
            </Typography>
            <Typography variant="text" size="sm" color={palette.gray[600]} style={styles.emptySubtitle}>
              Got an idea? Help us plan the next one.
            </Typography>
            <Button
              label="Request Event"
              onPress={() => setRequestVisible(true)}
              style={styles.emptyButton}
            />
          </View>
        ) : (
          <>
            <View style={styles.grid}>
              {events?.map((event) => (
                <CommunityEventCard
                  key={event.id}
                  event={event}
                  onPress={() =>
                    router.push({
                      pathname: '/community-event',
                      params: { id: String(event.id) },
                    })
                  }
                />
              ))}
            </View>
            {showPromo ? <CommunityPromoCard onRequestPress={() => setRequestVisible(true)} /> : null}
          </>
        )}
      </ScrollView>

      {!showEmpty && tab === 'upcoming' ? (
        <Pressable
          style={styles.fab}
          onPress={() => setRequestVisible(true)}
          accessibilityRole="button"
          accessibilityLabel="Request event">
          <SymbolView name="plus" size={18} weight="bold" tintColor={palette.white} />
        </Pressable>
      ) : null}

      <CommunityRequestSheet
        visible={requestVisible}
        onClose={() => setRequestVisible(false)}
        onSubmit={handleRequestSubmit}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: palette.gray[50],
  },
  scroll: {
    padding: 24,
    gap: 16,
    paddingBottom: 120,
  },
  heading: {
    marginTop: 4,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  loader: {
    marginVertical: 48,
  },
  empty: {
    alignItems: 'center',
    paddingVertical: 48,
    gap: 12,
  },
  emptyTitle: {
    textAlign: 'center',
  },
  emptySubtitle: {
    textAlign: 'center',
  },
  emptyButton: {
    marginTop: 8,
    minWidth: 180,
  },
  fab: {
    position: 'absolute',
    right: 24,
    bottom: 32,
    width: 48,
    height: 48,
    borderRadius: Radius.full,
    backgroundColor: palette.gray[900],
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
});
