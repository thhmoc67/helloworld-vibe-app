import { http } from '@/api/http';
import type {
  MoveOutChecklistResponse,
  MoveOutInfo,
  PostMoveOutInitPayload,
  UpdateMoveOutChecklistPayload,
} from '@/types/move-out';

export async function getMoveOutInformation(bookingId: string): Promise<{
  success: boolean;
  data?: MoveOutInfo;
  message?: string;
}> {
  try {
    const { data } = await http.get<{ success?: boolean; data?: MoveOutInfo; message?: string }>(
      'api/hello/moveout/move_out_status',
      { params: { booking_id: bookingId } },
    );

    return {
      success: data?.success !== false && Boolean(data?.data),
      data: data?.data,
      message: data?.message,
    };
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to fetch move-out information';
    return { success: false, message };
  }
}

export async function postMoveOutInit(payload: PostMoveOutInitPayload): Promise<{
  success: boolean;
  data?: unknown;
  message?: string;
}> {
  try {
    const { data } = await http.post<{ success?: boolean; data?: unknown; message?: string }>(
      'api/hello/moveout/init/v2',
      payload,
    );
    return {
      success: data?.success !== false,
      data: data?.data,
      message: data?.message,
    };
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to submit move-out request';
    return { success: false, message };
  }
}

export async function getMoveOutChecklist(bookingId: string): Promise<MoveOutChecklistResponse> {
  try {
    const { data } = await http.get<MoveOutChecklistResponse>('hello/bookings/checklist', {
      params: { booking_id: bookingId, checklist_type: 'move_out' },
    });
    return data;
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to fetch checklist';
    return { success: false, message };
  }
}

export async function updateMoveOutChecklist(
  payload: UpdateMoveOutChecklistPayload,
): Promise<{ success?: boolean; message?: string }> {
  try {
    const { data } = await http.put<{ success?: boolean; message?: string }>(
      'hello/bookings/checklist/updatechecklistmo',
      payload,
    );
    return data;
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to update checklist';
    return { success: false, message };
  }
}
