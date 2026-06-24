import { QueryClientProvider } from '@tanstack/react-query';
import type { ReactNode } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { PropertyActionsProvider } from '@/providers/property-actions-provider';
import { WishlistProvider } from '@/providers/wishlist-provider';
import { queryClient } from '@/queries/query-client';
import { useSelectedCity } from '@/stores/auth-store';

type AppProvidersProps = {
  children: ReactNode;
};

function AppProvidersInner({ children }: AppProvidersProps) {
  const city = useSelectedCity();

  return (
    <WishlistProvider>
      <PropertyActionsProvider defaultCity={city}>{children}</PropertyActionsProvider>
    </WishlistProvider>
  );
}

export function AppProviders({ children }: AppProvidersProps) {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <QueryClientProvider client={queryClient}>
        <AppProvidersInner>{children}</AppProvidersInner>
      </QueryClientProvider>
    </GestureHandlerRootView>
  );
}
