import type { OccupantDetails } from '@/types/booking';

export type BookingDraft = {
  propertyId: string;
  propertyName: string;
  location: string;
  imageUri?: string;
  roomId: string;
  roomName: string;
  roomPrice: number;
  occupancyLabel: string;
  categoryId?: string | number;
  sharingType: string;
  moveInDate: string;
  occupant: OccupantDetails;
  securityDepositMonths?: number;
};

export type BookingChargeId =
  | 'token'
  | 'moveIn'
  | 'security'
  | 'advanceRent'
  | 'utility';

export type BookingChargeOption = {
  id: BookingChargeId;
  label: string;
  amount: number;
  description: string;
  required?: boolean;
  badge?: string;
};

export type AppliedDiscount = {
  type: 'coupon' | 'referral';
  code: string;
  amount: number;
  message?: string;
};

export type BookingPaymentResult = {
  invoiceId: string;
  paidAmount: number;
  moveInDate: string;
  paymentDate: string;
};
