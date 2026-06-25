import type { BookingChargeId } from '@/types/booking-payment';

export function formatBookingAmount(amount: number) {
  return `₹${amount.toLocaleString('en-IN')}`;
}

type TaxableChargeAmount = {
  amount: number;
  totalAmount?: number;
};

export function normalizeBookingChargeAmount(value: unknown): number | undefined {
  if (typeof value === 'number' && Number.isFinite(value)) {
    return value;
  }

  if (value && typeof value === 'object' && 'amount' in value) {
    const amount = (value as TaxableChargeAmount).amount;
    return typeof amount === 'number' && Number.isFinite(amount) ? amount : undefined;
  }

  return undefined;
}

export function formatBookingMoveInDate(isoDate: string) {
  const date = new Date(isoDate);
  if (Number.isNaN(date.getTime())) {
    return isoDate;
  }

  return date.toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

export function formatBookingApiDate(date: Date | string) {
  const value = typeof date === 'string' ? new Date(date) : date;
  const year = value.getFullYear();
  const month = String(value.getMonth() + 1).padStart(2, '0');
  const day = String(value.getDate()).padStart(2, '0');

  return `${year}/${month}/${day}`;
}

export function sumSelectedCharges(
  charges: { id: BookingChargeId; amount: number }[],
  selected: Record<BookingChargeId, boolean>,
) {
  return charges.reduce((total, charge) => {
    if (!selected[charge.id]) {
      return total;
    }

    return total + charge.amount;
  }, 0);
}

export function buildInvoiceId() {
  return `HW-${Math.floor(100000 + Math.random() * 900000)}`;
}
