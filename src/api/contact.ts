import { http } from '@/api/http';

export type UploadContactLeadPayload = {
  name: string;
  email?: string;
  phone: string;
  location: string;
  city?: string | number;
  otp: number;
  source?: string;
  referrer?: string;
  srp?: boolean;
  propertyName?: string;
  utm_source?: string;
  utm_url?: string;
};

type SendOtpLeadsResponse = {
  Status?: string;
  success?: boolean;
  message?: string;
};

type UploadContactLeadResponse = {
  success: boolean;
  message?: string;
};

export async function sendOtpLeads(mobile: string): Promise<SendOtpLeadsResponse> {
  try {
    const { data } = await http.post<SendOtpLeadsResponse>('hello/send/sms_mobile', { mobile });
    return data;
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to send OTP';
    return { success: false, message };
  }
}

export async function uploadContactLead(
  payload: UploadContactLeadPayload,
): Promise<UploadContactLeadResponse> {
  try {
    const { data } = await http.post<UploadContactLeadResponse>('hello/callback', payload);
    return data ?? { success: false };
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to submit callback request';
    return { success: false, message };
  }
}
