import { http } from '@/api/http';

type SendOtpResponse = {
  success: boolean;
  message?: string;
};

type VerifyOtpResponse = {
  success: boolean;
  message?: string;
  data?: {
    token?: string;
  };
};

export async function sendOtp(mobile: string): Promise<SendOtpResponse> {
  try {
    const { data } = await http.post('hello/send/sms', { mobile });
    return { success: data.Status === 'Success', message: data.message };
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to send OTP';
    return { success: false, message };
  }
}

export async function verifyOtp(payload: {
  mobile: string;
  otp: string;
}): Promise<VerifyOtpResponse> {
  try {
    const { data } = await http.post('hello/verify/sms', payload);
    return data;
  } catch (error: unknown) {
    const axiosError = error as { message?: string; response?: { status?: number } };
    return {
      success: false,
      message:
        axiosError.response?.status === 400
          ? 'Please enter correct OTP'
          : axiosError.message ?? 'Verification failed',
    };
  }
}

export async function fetchCommonData() {
  const { data } = await http.get('hello/houses/offerevents');
  return data;
}
