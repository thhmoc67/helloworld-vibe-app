import { useRouter } from 'expo-router';

import { useAuthStore } from '@/stores/auth-store';
import { useTenantProfile } from '@/stores/tenant-store';

export function useMoveInPayment() {
  const router = useRouter();
  const profile = useTenantProfile();
  const mobile = useAuthStore((state) => state.mobile);

  function startMoveInPayment() {
    if (!profile?.bookingId) return;
    router.push('/move-in-payment');
  }

  return { startMoveInPayment, profile, mobile };
}
