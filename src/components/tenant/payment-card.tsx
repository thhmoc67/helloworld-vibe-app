import { SymbolView } from 'expo-symbols';
import { Linking, Pressable, StyleSheet, View } from 'react-native';

import { Typography } from '@/components/ui/typography';
import palette from '@/constants/palette';
import { Radius } from '@/constants/theme';
import type { TenantInvoice } from '@/types/invoice';
import {
  formatDisplayDate,
  getInvoiceDueLabel,
  getInvoiceTitle,
  priceFormatter,
} from '@/utils/tenant-format';

type PaymentCardProps = {
  invoice: TenantInvoice;
  variant: 'pending' | 'paid';
  onPay?: () => void;
  onInvoice?: () => void;
};

export function PaymentCard({ invoice, variant, onPay, onInvoice }: PaymentCardProps) {
  const dueMeta = variant === 'pending' ? getInvoiceDueLabel(invoice) : null;
  const amount = variant === 'pending' ? invoice.balance ?? invoice.total ?? 0 : invoice.total ?? invoice.balance ?? 0;

  return (
    <View style={styles.card}>
      <View style={styles.topRow}>
        <Typography variant="text" size="sm" weight="medium" style={styles.title} numberOfLines={1}>
          {getInvoiceTitle(invoice)}
        </Typography>
        {variant === 'pending' && dueMeta ? (
          <View
            style={[
              styles.badge,
              dueMeta.tone === 'error' ? styles.badgeError : styles.badgeWarning,
            ]}>
            <Typography
              variant="label"
              size="xs"
              weight="medium"
              color={dueMeta.tone === 'error' ? palette.red[800] : palette.red[800]}>
              {dueMeta.label}
            </Typography>
          </View>
        ) : (
          <View style={styles.badgePaid}>
            <Typography variant="label" size="xs" weight="medium" color={palette.lime[800]}>
              Paid
            </Typography>
          </View>
        )}
      </View>

      <View style={styles.metaRow}>
        <Typography variant="label" size="xs" color={palette.gray[500]}>
          Invoice ID: {invoice.invoice_number ?? invoice.invoice_id}
        </Typography>
        <Typography variant="label" size="xs" weight="medium" color={palette.gray[900]}>
          {variant === 'pending'
            ? `Due: ${formatDisplayDate(invoice.due_date)}`
            : `Paid on: ${formatDisplayDate(invoice.paid_date ?? invoice.due_date)}`}
        </Typography>
      </View>

      <View style={styles.bottomRow}>
        <Typography
          variant="display"
          size="xs"
          weight="bold"
          color={variant === 'pending' ? palette.red[800] : palette.lime[800]}>
          {priceFormatter(amount)}
        </Typography>

        <Pressable
          onPress={variant === 'pending' ? onPay : onInvoice}
          style={styles.actionRow}
          accessibilityRole="button">
          {variant === 'paid' ? (
            <SymbolView name="arrow.down.circle" size={12} tintColor={palette.lime[700]} />
          ) : null}
          <Typography variant="text" size="sm" weight="medium" color={palette.lime[700]}>
            {variant === 'pending' ? 'Pay Now' : 'Invoice'}
          </Typography>
          {variant === 'pending' ? (
            <SymbolView name="chevron.right" size={10} tintColor={palette.lime[700]} />
          ) : null}
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: palette.white,
    borderRadius: Radius.sm,
    paddingHorizontal: 16,
    paddingVertical: 8,
    gap: 8,
    shadowColor: '#8690A3',
    shadowOffset: { width: 0, height: 1.3 },
    shadowOpacity: 0.2,
    shadowRadius: 20,
    elevation: 3,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: 8,
  },
  title: {
    flex: 1,
  },
  badge: {
    borderRadius: Radius.full,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  badgeError: {
    backgroundColor: palette.red[100],
  },
  badgeWarning: {
    backgroundColor: palette.yellow[50],
  },
  badgePaid: {
    backgroundColor: palette.lime[50],
    borderRadius: Radius.full,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 8,
  },
  bottomRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  actionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
});

export async function openInvoiceUrl(url?: string) {
  if (!url) return;
  await Linking.openURL(url);
}
