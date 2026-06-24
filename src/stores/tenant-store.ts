import { create } from 'zustand';

import { getTenantProfile } from '@/api/user';
import type { TenantProfile } from '@/types/tenant';

type TenantState = {
  profile: TenantProfile | null;
  profileLoaded: boolean;
  setProfile: (profile: TenantProfile | null) => void;
  clearProfile: () => void;
  fetchProfile: () => Promise<void>;
};

export const useTenantStore = create<TenantState>((set) => ({
  profile: null,
  profileLoaded: false,
  setProfile: (profile) => set({ profile, profileLoaded: true }),
  clearProfile: () => set({ profile: null, profileLoaded: false }),
  fetchProfile: async () => {
    set({ profileLoaded: false });
    try {
      const data = await getTenantProfile();
      if (data?.status === 404 || !data?.bookingId) {
        set({ profile: null, profileLoaded: true });
        return;
      }
      set({ profile: data, profileLoaded: true });
    } catch {
      set({ profile: null, profileLoaded: true });
    }
  },
}));

export function useTenantProfile() {
  return useTenantStore((state) => state.profile);
}

export function useIsTenant() {
  return useTenantStore((state) => Boolean(state.profile?.bookingId));
}

export function useTenantProfileLoaded() {
  return useTenantStore((state) => state.profileLoaded);
}
