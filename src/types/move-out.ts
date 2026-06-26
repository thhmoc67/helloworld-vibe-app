import type { ChecklistSection } from '@/types/move-in-checklist';

export type MoveOutStatus = 'loading' | 'form' | 'initiated' | 'completed' | 'blocked';

export type MoveOutInfo = {
  can_initiate_move_out?: boolean;
  move_out_status?: 'initiated' | 'completed' | string;
  move_out_checklist_status?: 'pending' | 'initiated' | 'completed' | string;
  move_out_date?: string;
  rent_stop_date?: string;
  reason?: string;
  message?: string;
  internal_transfer_available?: boolean;
};

export type MoveOutChecklistItems = Record<string, ChecklistSection>;

export type MoveOutChecklistData = {
  items: MoveOutChecklistItems;
  submitted?: boolean;
  status?: boolean;
};

export type MoveOutChecklistResponse = {
  success?: boolean;
  data?: MoveOutChecklistData;
  message?: string;
};

export type PostMoveOutInitPayload = {
  bookingId?: string;
  tenantMobile?: string;
  moveOutDate: string;
  create: boolean;
  propertyName?: string;
  bankInfo: {
    accountNumber?: string;
    ifscCode?: string;
    accountName?: string;
  };
  moveOutReason: string;
};

export type UpdateMoveOutChecklistPayload = {
  booking_id: string;
  status?: boolean;
  data?: { items: MoveOutChecklistItems };
};
