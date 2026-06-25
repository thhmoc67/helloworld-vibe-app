import axios from 'axios';

import { http } from '@/api/http';

function extractApiErrorMessage(error: unknown, fallback: string) {
  if (axios.isAxiosError(error)) {
    const data = error.response?.data as Record<string, unknown> | undefined;
    if (typeof data?.message === 'string' && data.message.trim()) {
      return data.message.trim();
    }
    if (typeof data?.error === 'string' && data.error.trim()) {
      return data.error.trim();
    }
  }

  if (error instanceof Error && error.message.trim()) {
    return error.message.trim();
  }

  return fallback;
}

function resolveApiFailureMessage(
  data: Record<string, unknown> | undefined,
  fallback: string,
) {
  if (typeof data?.message === 'string' && data.message.trim()) {
    return data.message.trim();
  }
  if (typeof data?.error === 'string' && data.error.trim()) {
    return data.error.trim();
  }
  return fallback;
}

export async function postInitiatePayment(api: string, payload: unknown) {
  try {
    const { data } = await http.post(api, payload);
    const response = data as {
      success?: boolean;
      message?: string;
      error?: string;
      data?: Record<string, unknown>;
      payments?: Record<string, unknown>;
    };

    if (response.success === false) {
      return {
        ...response,
        success: false,
        message: resolveApiFailureMessage(response, 'Failed to initiate payment.'),
      };
    }

    return response;
  } catch (error) {
    return {
      success: false,
      message: extractApiErrorMessage(error, 'Failed to initiate payment'),
    };
  }
}

export async function postVerifyPayment(api: string, payload: unknown) {
  try {
    const { data } = await http.post(api, payload);
    const response = data as { success?: boolean; message?: string; error?: string };

    if (response.success === false) {
      return {
        ...response,
        success: false,
        message: resolveApiFailureMessage(response, 'Failed to verify payment'),
      };
    }

    return response;
  } catch (error) {
    return {
      success: false,
      message: extractApiErrorMessage(error, 'Failed to verify payment'),
    };
  }
}
