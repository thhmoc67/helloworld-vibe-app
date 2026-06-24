import { http } from '@/api/http';

export async function postInitiatePayment(api: string, payload: unknown) {
  try {
    const { data } = await http.post(api, payload);
    return data as {
      success?: boolean;
      message?: string;
      data?: Record<string, unknown>;
      payments?: Record<string, unknown>;
    };
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to initiate payment';
    return { success: false, message };
  }
}

export async function postVerifyPayment(api: string, payload: unknown) {
  try {
    const { data } = await http.post(api, payload);
    return data as { success?: boolean; message?: string };
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to verify payment';
    return { success: false, message };
  }
}
