import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

type AuthState = {
  token: string | null;
  mobile: string | null;
  selectedCity: string | null;
  hydrated: boolean;
  setToken: (token: string | null) => void;
  setMobile: (mobile: string | null) => void;
  setSelectedCity: (city: string | null) => void;
  clearSession: () => void;
  setHydrated: (hydrated: boolean) => void;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      mobile: null,
      selectedCity: null,
      hydrated: false,
      setToken: (token) => set({ token }),
      setMobile: (mobile) => set({ mobile }),
      setSelectedCity: (selectedCity) => set({ selectedCity }),
      clearSession: () => set({ token: null, mobile: null }),
      setHydrated: (hydrated) => set({ hydrated }),
    }),
    {
      name: 'hw-auth',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        token: state.token,
        mobile: state.mobile,
        selectedCity: state.selectedCity,
      }),
      onRehydrateStorage: () => (state) => {
        state?.setHydrated(true);
      },
    },
  ),
);

export function useIsAuthenticated() {
  return useAuthStore((state) => Boolean(state.token));
}

export function useSelectedCity() {
  return useAuthStore((state) => state.selectedCity ?? 'Bangalore');
}

export function useAuthHydrated() {
  return useAuthStore((state) => state.hydrated);
}
