import { http } from '@/api/http';
import type { MoveInPaymentDetailsResponse } from '@/types/move-in-payment';
import type {
  MoveInChecklistResponse,
  UpdateMoveInChecklistPayload,
  UpdateMoveInChecklistResponse,
} from '@/types/move-in-checklist';

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

export async function getMoveInPaymentDetails(
  bookingId: string,
): Promise<MoveInPaymentDetailsResponse> {
  try {
    const { data } = await http.get<MoveInPaymentDetailsResponse>(
      'api/hello/moveins/get_payments',
      { params: { booking_id: bookingId } },
    );
    return data;
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to load move-in payment details';
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

export async function getMoveInChecklist(bookingId: string): Promise<MoveInChecklistResponse> {
  try {
    const { data } = await http.get<MoveInChecklistResponse>('hello/bookings/checklist', {
      params: { booking_id: bookingId, checklist_type: 'move_in' },
    });
    return data;
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to fetch checklist';
    return { success: false, message };
  }
}

export async function updateMoveInChecklist(
  payload: UpdateMoveInChecklistPayload,
): Promise<UpdateMoveInChecklistResponse> {
  try {
    const { data } = await http.put<UpdateMoveInChecklistResponse>(
      'hello/bookings/checklist/updatechecklistmi',
      payload,
    );
    return data;
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to update checklist';
    return { success: false, message };
  }
}
