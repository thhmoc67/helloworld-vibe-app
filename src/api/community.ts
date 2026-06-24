import { http } from '@/api/http';
import type { CommunityEventDetailResponse } from '@/types/community';

export type CommunityEvent = {
  id: number;
  name: string;
  city?: string;
  display_image?: string;
  start_date?: string;
  event_start_date?: string;
  attendees_count?: number;
  people_attending?: number;
  is_registered?: boolean;
  registered?: boolean;
};

export type EventListType = 'all' | 'previous' | 'upcoming';

export async function getEventsList(
  city = '',
  type: EventListType = 'upcoming',
): Promise<{ success: boolean; data: CommunityEvent[] }> {
  try {
    const { data } = await http.get('hello/event/list', {
      params: { city, type },
    });
    const events = data?.data ?? data;
    return {
      success: true,
      data: Array.isArray(events) ? events : [],
    };
  } catch {
    return { success: false, data: [] };
  }
}

export async function getHwEventDetail(
  id: number,
): Promise<{ success: boolean; data: CommunityEventDetailResponse | null }> {
  try {
    const { data } = await http.get('hello/event', { params: { id } });
    const payload = data?.data ?? data;
    return { success: true, data: payload ?? null };
  } catch {
    return { success: false, data: null };
  }
}

export async function postBookEvent(payload: {
  id: number;
  email: string;
  name: string;
  mobile: string;
  seatsBooked: number;
}): Promise<{ success: boolean; message?: string }> {
  try {
    const { data } = await http.post('hello/event/assign', payload);
    return { success: true, message: data?.message };
  } catch (error: unknown) {
    const message =
      error && typeof error === 'object' && 'response' in error
        ? (error as { response?: { data?: { message?: string } } }).response?.data?.message
        : undefined;
    return { success: false, message: message ?? 'Failed to register for event' };
  }
}

export async function postEventRequest(payload: {
  name: string;
  categories: string[];
  description: string;
}): Promise<{ success: boolean; message?: string }> {
  try {
    const { data } = await http.post('hello/event/request', payload);
    return { success: true, message: data?.message };
  } catch {
    return { success: true };
  }
}
