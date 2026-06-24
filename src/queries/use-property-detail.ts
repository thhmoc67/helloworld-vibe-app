import { useQuery } from '@tanstack/react-query';

import { getPropertyData } from '@/api/property';
import { queryKeys } from '@/queries/keys';

export function usePropertyDetail(id: string) {
  return useQuery({
    queryKey: queryKeys.propertyDetail(id),
    queryFn: () => getPropertyData(id),
    enabled: Boolean(id),
  });
}
