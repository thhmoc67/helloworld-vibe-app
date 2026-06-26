import { useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import {
  ActivityIndicator,
  RefreshControl,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { RaiseRequestSheet } from '@/components/tenant/raise-request-sheet';
import { HelpDeskCard } from '@/components/support/help-desk-card';
import { SupportTicketCard } from '@/components/tenant/support-ticket-card';
import { Button } from '@/components/ui/button';
import { EmptyState } from '@/components/ui/empty-state';
import { SegmentedTabToggle } from '@/components/ui/segmented-tab-toggle';
import { SwipeableTabPager } from '@/components/ui/swipeable-tab-pager';
import { Typography } from '@/components/ui/typography';
import palette from '@/constants/palette';
import { TAB_BAR_HEIGHT, TAB_SCREEN_EXTRA_PADDING } from '@/constants/tab-bar';
import { useTabBarInset } from '@/hooks/use-tab-bar-inset';
import { useSupportTickets } from '@/queries/use-support-tickets';
import { postCreateTicket } from '@/api/tickets';
import { useTenantProfile } from '@/stores/tenant-store';
import { isActiveTicket } from '@/utils/tenant-format';

type SupportTab = 'active' | 'resolved';

const SUPPORT_TABS: SupportTab[] = ['active', 'resolved'];
const FAB_HEIGHT = 52;
const FAB_GAP = 12;

export function TenantSupportScreen() {
  const insets = useSafeAreaInsets();
  const tabBarInset = useTabBarInset();
  const profile = useTenantProfile();
  const queryClient = useQueryClient();
  const { data: tickets, isLoading, refetch, isRefetching } = useSupportTickets();
  const [tab, setTab] = useState<SupportTab>('active');
  const [sheetVisible, setSheetVisible] = useState(false);

  const fabBottom = insets.bottom + TAB_BAR_HEIGHT + FAB_GAP;
  const scrollBottomPadding = tabBarInset + TAB_SCREEN_EXTRA_PADDING + FAB_HEIGHT + FAB_GAP;

  async function handleCreateTicket(payload: { category: string; description: string }) {
    await postCreateTicket({
      subject: payload.category,
      description: payload.description,
      bookingId: profile?.bookingId,
      propertyId: profile?.propertyInfo?.propertyId,
    });
    await queryClient.invalidateQueries({ queryKey: ['support-tickets'] });
  }

  function renderTabContent(tabId: SupportTab) {
    const filteredTickets = (tickets ?? []).filter((ticket) =>
      tabId === 'active' ? isActiveTicket(ticket.status) : !isActiveTicket(ticket.status),
    );

    return (
      <ScrollView
        contentContainerStyle={[styles.scroll, { paddingBottom: scrollBottomPadding }]}
        refreshControl={<RefreshControl refreshing={isRefetching} onRefresh={() => refetch()} />}
        showsVerticalScrollIndicator={false}>
        {isLoading ? (
          <ActivityIndicator color={palette.lime[700]} style={styles.loader} />
        ) : filteredTickets.length > 0 ? (
          <View style={styles.list}>
            {filteredTickets.map((ticket) => (
              <SupportTicketCard key={ticket.id} ticket={ticket} />
            ))}
          </View>
        ) : (
          <EmptyState
            title={tabId === 'active' ? 'No active tickets yet' : 'No resolved tickets yet'}
            subtitle={
              tabId === 'active'
                ? 'Raise a request and our team will help you out.'
                : 'Resolved tickets will appear here once closed.'
            }
          />
        )}
      </ScrollView>
    );
  }

  return (
    <View style={styles.root}>
      <View style={[styles.header, { paddingTop: insets.top + 8 }]}>
        <Typography variant="text" size="lg" weight="medium">
          Support
        </Typography>
      </View>

      <View style={styles.controls}>
        <SegmentedTabToggle
          value={tab}
          onChange={setTab}
          tabs={[
            { id: 'active', label: 'Active Tickets' },
            { id: 'resolved', label: 'Resolved Tickets' },
          ]}
        />

        <HelpDeskCard />
      </View>

      <SwipeableTabPager tabs={SUPPORT_TABS} value={tab} onChange={setTab}>
        {renderTabContent}
      </SwipeableTabPager>

      <View style={[styles.fabWrap, { bottom: fabBottom }]}>
        <Button label="Raise New Request" onPress={() => setSheetVisible(true)} style={styles.fab} />
      </View>

      <RaiseRequestSheet
        visible={sheetVisible}
        onClose={() => setSheetVisible(false)}
        onSubmit={handleCreateTicket}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: palette.gray[50],
  },
  header: {
    paddingHorizontal: 24,
    paddingBottom: 8,
    backgroundColor: palette.white,
  },
  controls: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 12,
    gap: 16,
    backgroundColor: palette.gray[50],
  },
  scroll: {
    paddingHorizontal: 20,
    paddingTop: 4,
    flexGrow: 1,
  },
  list: {
    gap: 12,
  },
  loader: {
    marginTop: 24,
  },
  fabWrap: {
    position: 'absolute',
    left: 0,
    right: 0,
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  fab: {
    minWidth: 192,
  },
});
