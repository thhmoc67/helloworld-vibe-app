import { useRouter } from 'expo-router';
import { SymbolView } from 'expo-symbols';
import { useEffect, useMemo, useState } from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

import { getPaymentDetails, verifyReferralCode } from '@/api/booking';
import { BookingChargesSheet } from '@/components/booking/booking-charges-sheet';
import { BookingPaymentOption } from '@/components/booking/booking-payment-option';
import { BookingPropertySummary } from '@/components/booking/booking-property-summary';
import { DiscountCodeInput } from '@/components/booking/discount-code-input';
import { Button } from '@/components/ui/button';
import { Typography } from '@/components/ui/typography';
import { BOOKING_TERMS, DEFAULT_BOOKING_CHARGES } from '@/constants/booking';
import palette from '@/constants/palette';
import { Radius } from '@/constants/theme';
import { useBookingDraftStore } from '@/stores/booking-draft-store';
import type { AppliedDiscount, BookingChargeId } from '@/types/booking-payment';
import {
  buildInvoiceId,
  formatBookingAmount,
  formatBookingApiDate,
  sumSelectedCharges,
} from '@/utils/booking-payment';

const DEFAULT_SELECTED: Record<BookingChargeId, boolean> = {
  token: true,
  moveIn: false,
  security: false,
  advanceRent: false,
  utility: false,
};

export function BookingScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const draft = useBookingDraftStore((state) => state.draft);
  const setPaymentResult = useBookingDraftStore((state) => state.setPaymentResult);

  const [charges, setCharges] = useState(DEFAULT_BOOKING_CHARGES);
  const [selected, setSelected] = useState<Record<BookingChargeId, boolean>>(DEFAULT_SELECTED);
  const [referralInput, setReferralInput] = useState('');
  const [couponInput, setCouponInput] = useState('');
  const [referralLoading, setReferralLoading] = useState(false);
  const [couponLoading, setCouponLoading] = useState(false);
  const [referralError, setReferralError] = useState('');
  const [couponError, setCouponError] = useState('');
  const [appliedReferral, setAppliedReferral] = useState<AppliedDiscount | null>(null);
  const [appliedCoupon, setAppliedCoupon] = useState<AppliedDiscount | null>(null);
  const [chargesSheetOpen, setChargesSheetOpen] = useState(false);
  const [paying, setPaying] = useState(false);

  useEffect(() => {
    if (!draft) {
      router.replace('/(tabs)/home');
    }
  }, [draft, router]);

  useEffect(() => {
    if (!draft) return;

    const draftSnapshot = draft;

    async function loadPaymentDetails() {
      const response = await getPaymentDetails({
        categoryId: draftSnapshot.categoryId ?? draftSnapshot.roomId,
        sharingType: draftSnapshot.sharingType,
        moveInDate: formatBookingApiDate(draftSnapshot.moveInDate),
        sdMonths: draftSnapshot.securityDepositMonths ?? 1,
        propertyId: draftSnapshot.propertyId,
        propertyName: draftSnapshot.propertyName,
      });

      if (!response.success || !Array.isArray(response.data) || response.data.length === 0) {
        return;
      }

      const pricing = response.data[0] as Record<string, number>;
      setCharges((current) =>
        current.map((charge) => {
          if (charge.id === 'token' && pricing.token) return { ...charge, amount: pricing.token };
          if (charge.id === 'moveIn' && pricing.moveInCharges) {
            return { ...charge, amount: pricing.moveInCharges };
          }
          if (charge.id === 'security' && pricing.securityDeposit) {
            return { ...charge, amount: pricing.securityDeposit };
          }
          if (charge.id === 'advanceRent' && pricing.advanceRent) {
            return { ...charge, amount: pricing.advanceRent };
          }
          return charge;
        }),
      );
    }

    loadPaymentDetails();
  }, [draft]);

  const discounts = useMemo(
    () => [appliedCoupon, appliedReferral].filter((item): item is AppliedDiscount => Boolean(item)),
    [appliedCoupon, appliedReferral],
  );

  const subtotal = useMemo(() => sumSelectedCharges(charges, selected), [charges, selected]);
  const savings = discounts.reduce((total, discount) => total + discount.amount, 0);
  const total = Math.max(subtotal - savings, 0);
  const selectedIds = useMemo(
    () => new Set(charges.filter((charge) => selected[charge.id]).map((charge) => charge.id)),
    [charges, selected],
  );

  if (!draft) {
    return null;
  }

  const bookingDraft = draft;

  function toggleCharge(id: BookingChargeId) {
    if (id === 'token') return;

    setSelected((current) => ({
      ...current,
      [id]: !current[id],
    }));
  }

  async function handleApplyReferral() {
    setReferralError('');
    setReferralLoading(true);

    try {
      const response = await verifyReferralCode({
        referralCode: referralInput.trim(),
        propertyName: bookingDraft.propertyName,
      });

      if (response.isValid) {
        setAppliedReferral({
          type: 'referral',
          code: referralInput.trim().toUpperCase(),
          amount: 1000,
          message: response.message,
        });
        setReferralInput('');
      } else {
        setReferralError(response.message || 'Invalid referral code');
      }
    } catch {
      setReferralError('Unable to validate referral code');
    } finally {
      setReferralLoading(false);
    }
  }

  async function handleApplyCoupon() {
    setCouponError('');
    setCouponLoading(true);

    try {
      const response = await getPaymentDetails({
        categoryId: bookingDraft.categoryId ?? bookingDraft.roomId,
        sharingType: bookingDraft.sharingType,
        moveInDate: formatBookingApiDate(bookingDraft.moveInDate),
        sdMonths: bookingDraft.securityDepositMonths ?? 1,
        propertyId: bookingDraft.propertyId,
        propertyName: bookingDraft.propertyName,
        couponCode: couponInput.trim(),
      });

      if (response.success && response.discountMessage) {
        setAppliedCoupon({
          type: 'coupon',
          code: couponInput.trim().toUpperCase(),
          amount: 1500,
          message: response.discountMessage,
        });
        setCouponInput('');
      } else {
        setCouponError(response.message || 'Invalid coupon code');
      }
    } catch {
      setCouponError('Unable to apply coupon code');
    } finally {
      setCouponLoading(false);
    }
  }

  function handlePayNow() {
    setChargesSheetOpen(true);
  }

  async function handleConfirmPayment() {
    setPaying(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 900));

      setPaymentResult({
        invoiceId: buildInvoiceId(),
        paidAmount: total,
        moveInDate: bookingDraft.moveInDate,
        paymentDate: new Date().toISOString(),
      });

      setChargesSheetOpen(false);
      router.replace('/booking-success');
    } finally {
      setPaying(false);
    }
  }

  return (
    <SafeAreaView style={styles.safe} edges={['top', 'left', 'right']}>
      <View style={styles.header}>
        <Pressable
          onPress={() => router.back()}
          style={styles.backButton}
          accessibilityRole="button"
          accessibilityLabel="Go back">
          <SymbolView name="chevron.left" size={16} weight="semibold" tintColor={palette.gray[800]} />
        </Pressable>
        <Typography variant="text" size="md" weight="bold">
          Complete Your Booking
        </Typography>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[styles.content, { paddingBottom: 120 + insets.bottom }]}>
        <Typography variant="display" size="sm" weight="bold">
          You&apos;re Almost There!
        </Typography>

        <View style={styles.infoBanner}>
          <Typography variant="text" size="sm" color={palette.blue[700]}>
            Reserve now, pay the rest later. Start with the token amount to lock your room instantly.
          </Typography>
        </View>

        <BookingPropertySummary
          propertyName={bookingDraft.propertyName}
          location={bookingDraft.location}
          roomName={bookingDraft.roomName}
          occupancyLabel={bookingDraft.occupancyLabel}
          rent={bookingDraft.roomPrice}
          moveInDate={bookingDraft.moveInDate}
          imageUri={bookingDraft.imageUri}
          onEdit={() => router.back()}
        />

        <View style={styles.section}>
          <Typography variant="text" size="md" weight="bold">
            Choose what to pay now
          </Typography>
          <View style={styles.optionList}>
            {charges.map((charge) => (
              <BookingPaymentOption
                key={charge.id}
                label={charge.label}
                amount={charge.amount}
                description={charge.description}
                selected={selected[charge.id]}
                required={charge.required}
                badge={charge.badge}
                disabled={charge.required}
                onPress={() => toggleCharge(charge.id)}
              />
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Typography variant="text" size="md" weight="bold">
            🏷️ Apply discounts
          </Typography>

          <DiscountCodeInput
            label="Referral Code"
            placeholder="Enter referral code"
            value={referralInput}
            onChange={setReferralInput}
            onApply={handleApplyReferral}
            loading={referralLoading}
            error={referralError}
            appliedCode={appliedReferral?.code}
            successMessage={
              appliedReferral?.message ||
              (appliedReferral ? `Referral code applied. ${formatBookingAmount(appliedReferral.amount)} discount added.` : undefined)
            }
            onClear={() => {
              setAppliedReferral(null);
              setReferralError('');
            }}
          />

          <DiscountCodeInput
            label="Coupon Code"
            placeholder="Enter coupon code"
            value={couponInput}
            onChange={setCouponInput}
            onApply={handleApplyCoupon}
            loading={couponLoading}
            error={couponError}
            appliedCode={appliedCoupon?.code}
            successMessage={
              appliedCoupon?.message ||
              (appliedCoupon
                ? `Coupon code applied successfully. ${formatBookingAmount(appliedCoupon.amount)} discount has been added to your booking.`
                : undefined)
            }
            onClear={() => {
              setAppliedCoupon(null);
              setCouponError('');
            }}
          />
        </View>

        <Pressable style={styles.totalRow} onPress={handlePayNow}>
          <Typography variant="text" size="sm" weight="medium" color={palette.gray[700]}>
            Total Amount
          </Typography>
          <View style={styles.totalValue}>
            <Typography variant="text" size="md" weight="bold">
              {formatBookingAmount(total)}
            </Typography>
            <SymbolView name="chevron.right" size={12} tintColor={palette.gray[500]} />
          </View>
        </Pressable>

        <View style={styles.section}>
          <Typography variant="text" size="md" weight="bold">
            Terms & Conditions
          </Typography>
          <View style={styles.termsList}>
            {BOOKING_TERMS(bookingDraft.securityDepositMonths ?? 3).map((term) => (
              <View key={term} style={styles.termItem}>
                <Typography variant="text" size="xs" color={palette.gray[600]}>
                  •
                </Typography>
                <Typography variant="text" size="xs" color={palette.gray[600]} style={styles.termText}>
                  {term}
                </Typography>
              </View>
            ))}
          </View>
          <Typography variant="text" size="xs" color={palette.gray[600]}>
            Please refer to HelloWorld&apos;s Terms and conditions for more details.
          </Typography>
        </View>
      </ScrollView>

      <View style={[styles.footer, { paddingBottom: Math.max(insets.bottom, 16) }]}>
        <Button label="Pay Now" onPress={handlePayNow} />
      </View>

      <BookingChargesSheet
        visible={chargesSheetOpen}
        onClose={() => setChargesSheetOpen(false)}
        charges={charges}
        selectedIds={selectedIds}
        discounts={discounts}
        subtotal={subtotal}
        total={total}
        savings={savings}
        onPayNow={handleConfirmPayment}
        paying={paying}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: palette.white,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingBottom: 12,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: palette.gray[200],
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerSpacer: {
    width: 40,
  },
  content: {
    paddingHorizontal: 24,
    gap: 20,
  },
  infoBanner: {
    backgroundColor: palette.blue[50],
    borderRadius: Radius.md,
    padding: 14,
  },
  section: {
    gap: 12,
  },
  optionList: {
    gap: 10,
  },
  totalRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 8,
  },
  totalValue: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  termsList: {
    gap: 8,
  },
  termItem: {
    flexDirection: 'row',
    gap: 8,
    alignItems: 'flex-start',
  },
  termText: {
    flex: 1,
    lineHeight: 18,
  },
  footer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: palette.white,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: palette.gray[200],
    paddingHorizontal: 24,
    paddingTop: 16,
  },
});
