import { useQuery } from '@tanstack/react-query';

import { fetchPropertyList, mapApiPropertyToListing } from '@/api/property';
import { queryKeys } from '@/queries/keys';

export const SRP_PAGE_SIZE = 10;

export function useSrpProperties(city: string, locality: string | null = null) {
  const localityKey = locality ?? '';

  return useQuery({
    queryKey: queryKeys.srpProperties(city, localityKey),
    queryFn: () =>
      fetchPropertyList(
        {
          city,
          localityName: locality || undefined,
        },
        { page: 1, page_size: SRP_PAGE_SIZE },
      ),
    enabled: Boolean(city),
    select: (response) => ({
      success: response.success,
      listings: (response.data ?? [])
        .slice(0, SRP_PAGE_SIZE)
        .map(mapApiPropertyToListing),
      total: response.pageInfo?.total ?? response.data?.length ?? 0,
      nearByListings: (response.nearBy ?? []).map(mapApiPropertyToListing),
      pageInfo: response.pageInfo,
    }),
  });
}
