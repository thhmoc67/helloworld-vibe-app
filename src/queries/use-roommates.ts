import { useQuery } from '@tanstack/react-query';

import { getRoomMates } from '@/api/roommate';
import type { RoomMateType } from '@/types/roommate';
import { useTenantProfile } from '@/stores/tenant-store';

export function useRoomMates(inType: RoomMateType) {
  const bookingId = useTenantProfile()?.bookingId;

  return useQuery({
    queryKey: ['room-mates', inType, bookingId],
    queryFn: () => getRoomMates(bookingId ?? '', inType),
    enabled: Boolean(bookingId),
  });
}
