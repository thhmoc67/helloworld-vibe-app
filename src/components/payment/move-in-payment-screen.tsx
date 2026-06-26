import { useFocusEffect, useRouter } from 'expo-router';
import { useCallback, useState } from 'react';
import {
  ActivityIndicator,
  RefreshControl,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { getMoveInPaymentDetails } from '@/api/booking';
import { MoveInPaymentLineCard } from '@/components/payment/move-in-payment-line-card';
import { TenantScreenHeader } from '@/components/tenant/tenant-screen-header';
import { Button } from '@/components/ui/button';
import { Typography } from '@/components/ui/typography';
import palette from '@/constants/palette';
import { useMoveInPayment } from '@/hooks/use-move-in-payment';
import type { MoveInPaymentDetails } from '@/types/move-in-payment';
import {
  buildMoveInPaymentParams,
  parseMoveInPaymentLineItems,
} from '@/utils/move-in-payment-checkout';
import { priceFormatter } from '@/utils/tenant-format';

export function MoveInPaymentScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { profile, mobile } = useMoveInPayment();
  const [payments, setPayments] = useState<MoveInPaymentDetails | null>(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const fetchPaymentLineItems = useCallback(async () => {
    if (!profile?.bookingId) {
      setErrorMessage('Booking details are unavailable right now.');
      setPayments(null);
      setIsLoading(false);
      return;
    }

    const { data, success, message } = await getMoveInPaymentDetails(profile.bookingId);
    if (success && data) {
      setPayments(data);
      setErrorMessage('');
    } else {
      setPayments(null);
      setErrorMessage(message || 'Failed to fetch payment details');
    }
    setIsLoading(false);
  }, [profile?.bookingId]);

  useFocusEffect(
    useCallback(() => {
      setIsLoading(true);
      void fetchPaymentLineItems();
    }, [fetchPaymentLineItems]),
  );

  async function onRefresh() {
    setIsRefreshing(true);
    await fetchPaymentLineItems();
    setIsRefreshing(false);
  }

  function handleMoveInPayment() {
    if (!profile || !payments?.finalAmount) return;

    router.push({
      pathname: '/complete-payment',
      params: buildMoveInPaymentParams(profile, payments.finalAmount, mobile ?? ''),
    });
  }

  const lineItems = payments ? parseMoveInPaymentLineItems(payments) : [];

  return (
    <View style={styles.root}>
      <TenantScreenHeader title="Move-in Payment" onBack={() => router.back()} />

      {isLoading ? (
        <View style={styles.centered}>
          <ActivityIndicator color={palette.lime[700]} />
        </View>
      ) : errorMessage ? (
        <View style={styles.centered}>
          <Typography variant="text" size="sm" color={palette.gray[600]} style={styles.errorText}>
            {errorMessage}
          </Typography>
          <Button label="Try Again" onPress={() => void fetchPaymentLineItems()} />
        </View>
      ) : (
        <ScrollView
          style={styles.scroll}
          contentContainerStyle={[
            styles.content,
            { paddingBottom: Math.max(insets.bottom, 24) + 24 },
          ]}
          refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={() => void onRefresh()} />}
          showsVerticalScrollIndicator={false}>
          {lineItems.map((item, index) => (
            <MoveInPaymentLineCard key={item.title} index={index} {...item} />
          ))}

          {payments?.finalAmount ? (
            <View style={styles.summary}>
              {payments.cgst ? (
                <View style={styles.amountRow}>
                  <Typography variant="text" size="sm">
                    CGST
                  </Typography>
                  <Typography variant="text" size="sm">
                    {priceFormatter(payments.cgst)}
                  </Typography>
                </View>
              ) : null}
              {payments.sgst ? (
                <View style={styles.amountRow}>
                  <Typography variant="text" size="sm">
                    SGST
                  </Typography>
                  <Typography variant="text" size="sm">
                    {priceFormatter(payments.sgst)}
                  </Typography>
                </View>
              ) : null}

              <View style={styles.amountRow}>
                <Typography variant="text" size="md" weight="bold">
                  Remaining Amount to be paid
                </Typography>
                <Typography variant="text" size="md" weight="bold">
                  {priceFormatter(payments.finalAmount)}
                </Typography>
              </View>

              <Button label="Complete Payment" onPress={handleMoveInPayment} style={styles.cta} />
            </View>
          ) : null}
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
  scroll: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 12,
    paddingTop: 12,
    gap: 12,
  },
  centered: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
    gap: 16,
  },
  errorText: {
    textAlign: 'center',
  },
  summary: {
    gap: 20,
    marginTop: 8,
  },
  amountRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
  },
  cta: {
    marginTop: 4,
  },
});
