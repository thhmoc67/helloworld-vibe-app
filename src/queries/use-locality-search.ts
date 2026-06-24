import { useQuery } from '@tanstack/react-query';

import { fetchLocalitySuggestions } from '@/api/search';
import { useDebounce } from '@/hooks/use-debounce';
import { queryKeys } from '@/queries/keys';

const MIN_KEYWORD_LENGTH = 3;
const DEBOUNCE_MS = 300;

export function useLocalitySearch(keyword: string, city: string) {
  const debouncedKeyword = useDebounce(keyword.trim(), DEBOUNCE_MS);
  const enabled = debouncedKeyword.length >= MIN_KEYWORD_LENGTH;

  return useQuery({
    queryKey: queryKeys.localitySearch(city, debouncedKeyword),
    queryFn: () =>
      fetchLocalitySuggestions({
        city,
        keyword: debouncedKeyword,
      }),
    enabled,
    staleTime: 60_000,
  });
}
