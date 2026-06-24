import { useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  RefreshControl,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';

import { HwLottie } from '@/components/hw-lottie';
import { openInvoiceUrl, PaymentCard } from '@/components/tenant/payment-card';
import { TenantScreenHeader } from '@/components/tenant/tenant-screen-header';
import { SegmentedTabToggle } from '@/components/ui/segmented-tab-toggle';
import { Typography } from '@/components/ui/typography';
import { PaymentLottieAssets } from '@/constants/assets';
import palette from '@/constants/palette';
import { TAB_SCREEN_EXTRA_PADDING } from '@/constants/tab-bar';
import { useTabBarInset } from '@/hooks/use-tab-bar-inset';
import { useTenantInvoices } from '@/queries/use-tenant-invoices';
import type { TenantInvoice } from '@/types/invoice';

type PaymentsTab = 'pending' | 'past';

function PaymentsEmptyState() {
  return (
    <View style={styles.emptyState}>
      <HwLottie source={PaymentLottieAssets.pending} style={styles.emptyLottie} loop />
      <Typography variant="text" size="lg" weight="medium" style={styles.emptyTitle}>
        No Payment Due
      </Typography>
      <Typography variant="label" size="xs" color={palette.gray[900]} style={styles.emptySubtitle}>
        Your Payments are sorted. Sit back and enjoy your stay.
      </Typography>
    </View>
  );
}

export function TenantPaymentsScreen() {
  const tabBarInset = useTabBarInset();
  const { data, isLoading, refetch, isRefetching } = useTenantInvoices();
  const [tab, setTab] = useState<PaymentsTab>('pending');

  const list = tab === 'pending' ? data?.pending ?? [] : data?.paid ?? [];

  function handlePay(invoice: TenantInvoice) {
    Alert.alert(
      'Payment',
      `Pay ${invoice.balance ?? invoice.total ?? 0} for ${invoice.invoice_number ?? invoice.invoice_id}?`,
      [{ text: 'OK' }],
    );
  }

  return (
    <View style={styles.root}>
      <TenantScreenHeader title="Payments" />

      <ScrollView
        contentContainerStyle={[styles.scroll, { paddingBottom: tabBarInset + TAB_SCREEN_EXTRA_PADDING }]}
        refreshControl={<RefreshControl refreshing={isRefetching} onRefresh={() => refetch()} />}
        showsVerticalScrollIndicator={false}>
        <SegmentedTabToggle
          value={tab}
          onChange={setTab}
          tabs={[
            { id: 'pending', label: 'Pending Payment' },
            { id: 'past', label: 'Past Payments' },
          ]}
        />

        {isLoading ? (
          <ActivityIndicator color={palette.lime[700]} style={styles.loader} />
        ) : list.length > 0 ? (
          <View style={styles.list}>
            {list.map((invoice) => (
              <PaymentCard
                key={invoice.invoice_id}
                invoice={invoice}
                variant={tab === 'pending' ? 'pending' : 'paid'}
                onPay={() => handlePay(invoice)}
                onInvoice={() => openInvoiceUrl(invoice.invoice_url)}
              />
            ))}
          </View>
        ) : tab === 'pending' ? (
          <PaymentsEmptyState />
        ) : (
          <View style={styles.emptyState}>
            <Typography variant="text" size="sm" color={palette.gray[500]}>
              No past payments found
            </Typography>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: palette.gray[50],
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
  emptyState: {
    alignItems: 'center',
    gap: 16,
    paddingTop: 24,
  },
  emptyLottie: {
    width: 160,
    height: 160,
  },
  emptyTitle: {
    textAlign: 'center',
  },
  emptySubtitle: {
    textAlign: 'center',
    paddingHorizontal: 24,
  },
});
