import { http } from '@/api/http';

export type VisitSlotTime = {
  label: string;
  value: boolean;
};

export type VisitSlotDay = {
  date: string | number;
  slotId: string | number;
  slots?: VisitSlotTime[];
};

export type VisitSlotsResponse = {
  success: boolean;
  data?: VisitSlotDay[];
  message?: string;
  error?: string;
};

export type CreateVisitPayload = {
  date: string;
  savType: string;
  time: string;
  name: string;
  email: string;
  slotId: string | number;
  propertyId: string | number;
  source: string;
  url?: string;
};

export type CreateVisitResponse = {
  success: boolean;
  message?: string;
  error?: string;
};

export async function getPropertyVisitSlots(
  propertyId: number | string,
): Promise<VisitSlotsResponse> {
  try {
    const { data } = await http.get<VisitSlotsResponse>('api/hello/visit/slots', {
      params: { property_id: propertyId },
    });
    return data;
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to load visit slots';
    return { success: false, message };
  }
}

export async function createVisit(payload: CreateVisitPayload): Promise<CreateVisitResponse> {
  try {
    const { data } = await http.post<CreateVisitResponse>('v2/visit/create', payload);
    return data;
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to create visit';
    return { success: false, error: message, message };
  }
}
