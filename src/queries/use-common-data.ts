import { useQuery } from '@tanstack/react-query';

import { fetchCommonData } from '@/api/login';
import { queryKeys } from '@/queries/keys';
import { useIsAuthenticated } from '@/stores/auth-store';

export function useCommonData() {
  const isAuthenticated = useIsAuthenticated();

  return useQuery({
    queryKey: queryKeys.common,
    queryFn: fetchCommonData,
    enabled: isAuthenticated,
  });
}
