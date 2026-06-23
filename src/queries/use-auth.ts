import { useMutation } from '@tanstack/react-query';

import { sendOtp, verifyOtp } from '@/api/login';
import { useAuthStore } from '@/stores/auth-store';

export function useSendOtpMutation() {
  const setMobile = useAuthStore((state) => state.setMobile);

  return useMutation({
    mutationFn: async (mobile: string) => {
      const result = await sendOtp(mobile);
      if (!result.success) {
        throw new Error(result.message ?? 'Failed to send OTP');
      }
      setMobile(mobile);
      return result;
    },
  });
}

export function useVerifyOtpMutation() {
  const setToken = useAuthStore((state) => state.setToken);
  const setSelectedCity = useAuthStore((state) => state.setSelectedCity);

  return useMutation({
    mutationFn: async ({ mobile, otp }: { mobile: string; otp: string }) => {
      const result = await verifyOtp({ mobile, otp });
      if (!result.success || !result.data?.token) {
        throw new Error(result.message ?? 'Please enter correct OTP');
      }

      setToken(result.data.token);
      setSelectedCity('Bangalore');
      return result;
    },
  });
}
