import { create } from 'zustand';

import { DEFAULT_SRP_FILTERS, type SrpFilters } from '@/types/srp-filters';

type SrpFiltersState = {
  filters: SrpFilters;
  setFilters: (filters: SrpFilters) => void;
  resetFilters: () => void;
};

export const useSrpFiltersStore = create<SrpFiltersState>((set) => ({
  filters: { ...DEFAULT_SRP_FILTERS },
  setFilters: (filters) => set({ filters }),
  resetFilters: () => set({ filters: { ...DEFAULT_SRP_FILTERS } }),
}));

export function useSrpFilters() {
  return useSrpFiltersStore((state) => state.filters);
}
