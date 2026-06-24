import { useQuery } from '@tanstack/react-query';

import { getVisitsList } from '@/api/visit';
import { queryKeys } from '@/queries/keys';
import { splitVisits } from '@/utils/visit-format';

export function useVisits() {
  return useQuery({
    queryKey: queryKeys.visits,
    queryFn: getVisitsList,
    select: (visits) => ({
      all: visits,
      ...splitVisits(visits),
    }),
  });
}
