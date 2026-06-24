import type { BookingStatus } from '@/types/booking-status';
import type { TenantProfile } from '@/types/tenant';
import type { TenantInvoice } from '@/types/invoice';

export function shouldShowMoveInPendingPaymentCard(
  profile?: TenantProfile | null,
  status?: BookingStatus | null,
) {
  if (!profile?.bookingId || !status) return false;
  if (status.moved_in) return false;
  if (status.payment) return false;

  const tokenPaid = profile.paymentInfo?.isTokenPaid;
  return tokenPaid === true;
}

export function getMoveInPendingAmount(
  profile?: TenantProfile | null,
  pendingInvoice?: TenantInvoice,
) {
  if (pendingInvoice) {
    return pendingInvoice.balance ?? pendingInvoice.total ?? 0;
  }

  const payment = profile?.paymentInfo;
  if (!payment) return 0;

  let amount = 0;
  if (!payment.isPartialRentCleared) {
    amount += payment.rent ?? 0;
  }
  if (!payment.isSdCleared) {
    amount += payment.sd ?? 0;
  }
  return amount;
}
