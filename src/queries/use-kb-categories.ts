import { useQuery } from '@tanstack/react-query';

import { getKbCategories } from '@/api/tickets';
import type { TicketCategory } from '@/types/ticket';

function selectVisibleCategories(result: Awaited<ReturnType<typeof getKbCategories>>): TicketCategory[] {
  return (result.data ?? []).filter(
    (category) => category.isVisibleInHC !== false && category.visibility === 'ALL_USERS',
  );
}

export function useKbCategories() {
  return useQuery({
    queryKey: ['kb-categories'],
    queryFn: getKbCategories,
    select: selectVisibleCategories,
    staleTime: 5 * 60 * 1000,
  });
}
