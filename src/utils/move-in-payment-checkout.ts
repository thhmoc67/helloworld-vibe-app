import type { MoveInPaymentDetails, MoveInPaymentLineItem } from '@/types/move-in-payment';
import type { TenantProfile } from '@/types/tenant';

export const MOVE_IN_PAYMENT_INIT_API = 'api/hello/v2/payments/init';
export const MOVE_IN_PAYMENT_VERIFY_API = 'api/hello/v2/moveins/update';

export function parseMoveInPaymentLineItems(
  payments: MoveInPaymentDetails,
): MoveInPaymentLineItem[] {
  return Object.keys(payments)
    .map((key) => {
      const value = payments[key];
      if (!value || typeof value !== 'object' || Array.isArray(value)) {
        return null;
      }

      const amount = value.amount ?? 0;
      if (amount === 0) {
        return null;
      }

      return {
        paid: Boolean(value.paid),
        title: key.split('_').join(' '),
        amount,
      };
    })
    .filter((item): item is MoveInPaymentLineItem => item !== null);
}

export function buildMoveInPaymentPayload(
  profile: TenantProfile,
  amount: number,
  mobile: string,
) {
  return {
    mobile,
    type: 'movein',
    amount,
    paymentForIds: [profile.bookingId],
    paymentMode: 'Razorpay',
    paymentMethod: 'Upi',
    isTenantApp: true,
    propertyName: profile.propertyInfo?.name,
  };
}

export function buildMoveInPaymentParams(
  profile: TenantProfile,
  amount: number,
  mobile: string,
) {
  return {
    type: 'movein',
    paymentFor: profile.bookingId ?? '',
    amount: String(amount),
    description: 'Invoice payment from tenant app',
    email: profile.userInfo?.email ?? '',
    mobile: profile.userInfo?.mobile ?? '',
    name: profile.userInfo?.name ?? '',
    propertyName: profile.propertyInfo?.name ?? '',
    bookingId: profile.bookingId ?? '',
    initApi: MOVE_IN_PAYMENT_INIT_API,
    verifyApi: MOVE_IN_PAYMENT_VERIFY_API,
    payload: JSON.stringify(buildMoveInPaymentPayload(profile, amount, mobile)),
  };
}
