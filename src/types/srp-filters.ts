export type SrpFilters = {
  priceMin: number;
  priceMax: number;
  gender: '' | 'male' | 'female';
  food: boolean;
  amenities: string[];
};

export const DEFAULT_SRP_FILTERS: SrpFilters = {
  priceMin: 0,
  priceMax: 100_000,
  gender: '',
  food: false,
  amenities: [],
};
