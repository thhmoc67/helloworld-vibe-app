import { http } from '@/api/http';

export type PaymentDetailsPayload = {
  categoryId: string | number;
  sharingType: string;
  moveInDate: string;
  sdMonths?: number;
  propertyId: string | number;
  couponCode?: string;
  propertyName?: string;
  sdKey?: string;
};

export type PaymentDetailsResponse = {
  success: boolean;
  data?: Record<string, unknown>[];
  discountMessage?: string;
  message?: string;
};

export type ReferralValidatePayload = {
  referralCode: string;
  propertyName?: string;
};

export type ReferralValidateResponse = {
  success?: boolean;
  isValid?: boolean;
  message?: string;
};

export async function getPaymentDetails(
  payload: PaymentDetailsPayload,
): Promise<PaymentDetailsResponse> {
  try {
    const { data } = await http.post<PaymentDetailsResponse>(
      'api/v3/booking/payment_details',
      payload,
    );
    return data;
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to load payment details';
    return { success: false, message };
  }
}

export async function verifyReferralCode(
  payload: ReferralValidatePayload,
): Promise<ReferralValidateResponse> {
  try {
    const { data } = await http.post<ReferralValidateResponse>(
      'api/hello/referral/validate',
      payload,
    );
    return data;
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to validate referral code';
    return { isValid: false, message };
  }
}
