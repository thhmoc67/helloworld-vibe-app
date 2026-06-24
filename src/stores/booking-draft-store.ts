import { create } from 'zustand';

import type { BookingDraft, BookingPaymentResult } from '@/types/booking-payment';

type BookingDraftState = {
  draft: BookingDraft | null;
  paymentResult: BookingPaymentResult | null;
  setDraft: (draft: BookingDraft) => void;
  clearDraft: () => void;
  setPaymentResult: (result: BookingPaymentResult) => void;
  clearPaymentResult: () => void;
};

export const useBookingDraftStore = create<BookingDraftState>((set) => ({
  draft: null,
  paymentResult: null,
  setDraft: (draft) => set({ draft }),
  clearDraft: () => set({ draft: null }),
  setPaymentResult: (paymentResult) => set({ paymentResult }),
  clearPaymentResult: () => set({ paymentResult: null }),
}));
