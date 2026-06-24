import { useQuery } from '@tanstack/react-query';

import { getSupportTickets } from '@/api/tickets';

export function useSupportTickets() {
  return useQuery({
    queryKey: ['support-tickets'],
    queryFn: getSupportTickets,
    select: (result) => result.data ?? [],
  });
}
