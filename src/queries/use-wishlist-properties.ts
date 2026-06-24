import { useQuery } from '@tanstack/react-query';

import { fetchWishlistPropertyCards } from '@/api/wishlist';
import { useIsAuthenticated } from '@/stores/auth-store';
import { useWishlist } from '@/providers/wishlist-provider';

export function useWishlistProperties() {
  const isAuthenticated = useIsAuthenticated();
  const { revision } = useWishlist();

  return useQuery({
    queryKey: ['wishlist', 'cards', revision],
    queryFn: fetchWishlistPropertyCards,
    enabled: isAuthenticated,
  });
}
