import { useQuery } from '@tanstack/react-query';

import { getBookingStatus } from '@/api/user';
import { useTenantProfile } from '@/stores/tenant-store';

export function useBookingStatus() {
  const profile = useTenantProfile();
  const bookingId = profile?.bookingId;

  return useQuery({
    queryKey: ['booking-status', bookingId],
    queryFn: async () => {
      const response = await getBookingStatus(bookingId!);
      if (!response?.success || !response.data) {
        throw new Error(response?.message ?? 'Unable to load move-in steps');
      }
      return response.data;
    },
    enabled: Boolean(bookingId),
  });
}
