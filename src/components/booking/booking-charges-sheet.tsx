import { ScrollView, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { BottomSheet } from '@/components/ui/bottom-sheet';
import { Button } from '@/components/ui/button';
import { Typography } from '@/components/ui/typography';
import type { AppliedDiscount, BookingChargeOption } from '@/types/booking-payment';
import { formatBookingAmount } from '@/utils/booking-payment';
import palette from '@/constants/palette';
import { Radius } from '@/constants/theme';

type BookingChargesSheetProps = {
  visible: boolean;
  onClose: () => void;
  charges: BookingChargeOption[];
  selectedIds: Set<string>;
  discounts: AppliedDiscount[];
  subtotal: number;
  total: number;
  savings: number;
  onPayNow: () => void;
  paying?: boolean;
};

function DiscountBadge({ discount }: { discount: AppliedDiscount }) {
  return (
    <View style={styles.discountRow}>
      <View style={styles.discountBadge}>
        <Typography variant="text" size="xs" weight="bold" color={palette.lime[800]}>
          {discount.type === 'coupon' ? 'COUPON' : 'REFERRAL'}
        </Typography>
      </View>
      <Typography variant="text" size="sm" weight="medium" style={styles.discountCode}>
        {discount.code}
      </Typography>
      <Typography variant="text" size="sm" weight="bold" color={palette.helloLime}>
        -{formatBookingAmount(discount.amount)}
      </Typography>
    </View>
  );
}

export function BookingChargesSheet({
  visible,
  onClose,
  charges,
  selectedIds,
  discounts,
  subtotal,
  total,
  savings,
  onPayNow,
  paying,
}: BookingChargesSheetProps) {
  const insets = useSafeAreaInsets();
  const selectedCharges = charges.filter((charge) => selectedIds.has(charge.id));

  return (
    <BottomSheet visible={visible} onClose={onClose}>
      <ScrollView
        bounces={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[styles.content, { paddingBottom: Math.max(insets.bottom, 20) }]}>
        <Typography variant="text" size="xs" weight="medium" color={palette.gray[500]} style={styles.eyebrow}>
          CHARGES SELECTED
        </Typography>

        <View style={styles.chargeList}>
          {selectedCharges.map((charge) => (
            <View key={charge.id} style={styles.chargeRow}>
              <View style={styles.chargeCopy}>
                <Typography variant="text" size="sm" weight="bold">
                  {charge.label}
                </Typography>
                <Typography variant="text" size="xs" color={palette.gray[600]}>
                  {charge.description}
                </Typography>
              </View>
              <Typography variant="text" size="sm" weight="bold">
                {formatBookingAmount(charge.amount)}
              </Typography>
            </View>
          ))}
        </View>

        <View style={styles.subtotalRow}>
          <Typography variant="text" size="sm" weight="bold">
            Subtotal
          </Typography>
          <Typography variant="text" size="sm" weight="bold">
            {formatBookingAmount(subtotal)}
          </Typography>
        </View>

        {discounts.length > 0 ? (
          <View style={styles.discountBox}>
            {discounts.map((discount) => (
              <DiscountBadge key={`${discount.type}-${discount.code}`} discount={discount} />
            ))}
          </View>
        ) : null}

        <View style={styles.totalBlock}>
          <Typography variant="text" size="sm" color={palette.gray[600]}>
            Total payable now
          </Typography>
          <View style={styles.totalRow}>
            {savings > 0 ? (
              <Typography variant="text" size="sm" color={palette.gray[400]} style={styles.strike}>
                {formatBookingAmount(subtotal)}
              </Typography>
            ) : null}
            <Typography variant="display" size="sm" weight="bold">
              {formatBookingAmount(total)}
            </Typography>
          </View>
          {savings > 0 ? (
            <Typography variant="text" size="sm" weight="medium" color={palette.helloLime}>
              You&apos;re saving {formatBookingAmount(savings)} on this booking
            </Typography>
          ) : null}
        </View>

        <Button label="Pay Now" onPress={onPayNow} loading={paying} style={styles.cta} />
      </ScrollView>
    </BottomSheet>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: 24,
    paddingTop: 20,
    gap: 16,
  },
  eyebrow: {
    letterSpacing: 0.8,
  },
  chargeList: {
    gap: 14,
  },
  chargeRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: 12,
  },
  chargeCopy: {
    flex: 1,
    gap: 4,
  },
  subtotalRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: palette.gray[200],
    paddingTop: 14,
  },
  discountBox: {
    backgroundColor: palette.lime[50],
    borderRadius: Radius.md,
    padding: 14,
    gap: 12,
  },
  discountRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  discountBadge: {
    backgroundColor: palette.lime[200],
    borderRadius: Radius.sm,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  discountCode: {
    flex: 1,
  },
  totalBlock: {
    gap: 8,
  },
  totalRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  strike: {
    textDecorationLine: 'line-through',
  },
  cta: {
    marginTop: 4,
  },
});
