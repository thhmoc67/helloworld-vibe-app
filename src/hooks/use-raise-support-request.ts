import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'expo-router';
import { useCallback, useState } from 'react';

import { getKbCategories, postCreateTicket } from '@/api/tickets';
import { useAuthStore } from '@/stores/auth-store';
import { useTenantProfile } from '@/stores/tenant-store';

export type RaiseSupportRequestPayload = {
  category: string;
  subCategory: string;
  subCategoryId?: string;
  description: string;
};

export function useRaiseSupportRequest() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const profile = useTenantProfile();
  const selectedCity = useAuthStore((state) => state.selectedCity);
  const [sheetVisible, setSheetVisible] = useState(false);

  const openRaiseRequest = useCallback(() => {
    void queryClient.prefetchQuery({
      queryKey: ['kb-categories'],
      queryFn: getKbCategories,
    });
    setSheetVisible(true);
  }, [queryClient]);

  const closeRaiseRequest = useCallback(() => {
    setSheetVisible(false);
  }, []);

  const submitRaiseRequest = useCallback(
    async (payload: RaiseSupportRequestPayload) => {
      if (payload.category === 'move-out') {
        setSheetVisible(false);
        router.push('/profile/move-out');
        return;
      }

      if (!profile?.userInfo?.email) {
        throw new Error('We could not find your account email. Please try again.');
      }

      const result = await postCreateTicket({
        category: payload.category,
        subCategory: payload.subCategory,
        subCategoryId: payload.subCategoryId,
        description: payload.description,
        email: profile.userInfo.email,
        propertyName: profile.propertyInfo?.name,
        city: selectedCity ?? profile.propertyInfo?.locality,
        bookingId: profile.bookingId,
        propertyId: profile.propertyInfo?.propertyId,
      });

      if (!result.success || !result.ticketNumber) {
        throw new Error(result.message ?? 'Failed to create ticket');
      }

      await queryClient.invalidateQueries({ queryKey: ['support-tickets'] });
      return result.ticketNumber;
    },
    [profile, queryClient, router, selectedCity],
  );

  return {
    sheetVisible,
    openRaiseRequest,
    closeRaiseRequest,
    submitRaiseRequest,
  };
}
