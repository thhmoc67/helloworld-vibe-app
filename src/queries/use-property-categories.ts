import { useQuery } from '@tanstack/react-query';

import { getPropertyCategories } from '@/api/property';
import { queryKeys } from '@/queries/keys';
import type { PropertyCategory } from '@/types/booking';

export function usePropertyCategories(propertyId: string) {
  return useQuery({
    queryKey: queryKeys.propertyCategories(propertyId),
    queryFn: async () => {
      const response = await getPropertyCategories(propertyId);
      if (!response.success || !Array.isArray(response.data)) {
        return [] as PropertyCategory[];
      }

      return response.data as PropertyCategory[];
    },
    enabled: Boolean(propertyId),
  });
}
