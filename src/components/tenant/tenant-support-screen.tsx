import { useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import {
  ActivityIndicator,
  Linking,
  Platform,
  Pressable,
  RefreshControl,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { RaiseRequestSheet } from '@/components/tenant/raise-request-sheet';
import { SupportTicketCard } from '@/components/tenant/support-ticket-card';
import { Button } from '@/components/ui/button';
import { EmptyState } from '@/components/ui/empty-state';
import { SegmentedTabToggle } from '@/components/ui/segmented-tab-toggle';
import { Typography } from '@/components/ui/typography';
import { HELP_DESK_PHONE } from '@/constants/tenant';
import palette from '@/constants/palette';
import { TAB_SCREEN_EXTRA_PADDING } from '@/constants/tab-bar';
import { Radius } from '@/constants/theme';
import { useTabBarInset } from '@/hooks/use-tab-bar-inset';
import { useSupportTickets } from '@/queries/use-support-tickets';
import { postCreateTicket } from '@/api/tickets';
import { useTenantProfile } from '@/stores/tenant-store';
import { isActiveTicket } from '@/utils/tenant-format';

type SupportTab = 'active' | 'resolved';

export function TenantSupportScreen() {
  const insets = useSafeAreaInsets();
  const tabBarInset = useTabBarInset();
  const profile = useTenantProfile();
  const queryClient = useQueryClient();
  const { data: tickets, isLoading, refetch, isRefetching } = useSupportTickets();
  const [tab, setTab] = useState<SupportTab>('active');
  const [sheetVisible, setSheetVisible] = useState(false);

  const filteredTickets = (tickets ?? []).filter((ticket) =>
    tab === 'active' ? isActiveTicket(ticket.status) : !isActiveTicket(ticket.status),
  );

  function callHelpDesk() {
    const url = Platform.OS === 'android' ? `tel:${HELP_DESK_PHONE}` : `telprompt:${HELP_DESK_PHONE}`;
    Linking.openURL(url);
  }

  async function handleCreateTicket(payload: { category: string; description: string }) {
    await postCreateTicket({
      subject: payload.category,
      description: payload.description,
      bookingId: profile?.bookingId,
      propertyId: profile?.propertyInfo?.propertyId,
    });
    await queryClient.invalidateQueries({ queryKey: ['support-tickets'] });
  }

  return (
    <View style={styles.root}>
      <View style={[styles.header, { paddingTop: insets.top + 8 }]}>
        <Typography variant="text" size="lg" weight="medium">
          Support
        </Typography>
      </View>

      <ScrollView
        contentContainerStyle={[styles.scroll, { paddingBottom: tabBarInset + TAB_SCREEN_EXTRA_PADDING + 72 }]}
        refreshControl={<RefreshControl refreshing={isRefetching} onRefresh={() => refetch()} />}
        showsVerticalScrollIndicator={false}>
        <SegmentedTabToggle
          value={tab}
          onChange={setTab}
          tabs={[
            { id: 'active', label: 'Active Tickets' },
            { id: 'resolved', label: 'Resolved Tickets' },
          ]}
        />

        <View style={styles.helpDesk}>
          <Typography variant="label" size="xs" color={palette.gray[700]}>
            Help desk · {HELP_DESK_PHONE.replace(/(\d{3})(\d{3})(\d{4})/, '$1 $2 $3')}
          </Typography>
          <Pressable onPress={callHelpDesk} accessibilityRole="button">
            <Typography variant="label" size="xs" weight="medium" color={palette.lime[700]}>
              Call now →
            </Typography>
          </Pressable>
        </View>

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
            title={tab === 'active' ? 'No active tickets yet' : 'No resolved tickets yet'}
            subtitle={
              tab === 'active'
                ? 'Raise a request and our team will help you out.'
                : 'Resolved tickets will appear here once closed.'
            }
            actionLabel={tab === 'active' ? 'Raise New Request' : undefined}
            onAction={tab === 'active' ? () => setSheetVisible(true) : undefined}
          />
        )}
      </ScrollView>

      <View style={[styles.fabWrap, { bottom: tabBarInset }]}>
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
  scroll: {
    paddingHorizontal: 20,
    paddingTop: 16,
    gap: 16,
  },
  helpDesk: {
    backgroundColor: palette.white,
    borderRadius: Radius.md,
    paddingHorizontal: 16,
    paddingVertical: 11,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
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
