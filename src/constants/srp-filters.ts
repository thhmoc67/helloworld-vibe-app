import { AMENITY_NAMES } from '@/constants/amenities';

export const SRP_PRICE_MIN = 1000;
export const SRP_PRICE_MAX = 99999;

export type SrpBudgetPreset = {
  label: string;
  min: number;
  max: number;
};

export const SRP_BUDGET_PRESETS: readonly SrpBudgetPreset[] = [
  { label: 'Any budget', min: 0, max: 100_000 },
  { label: 'Under ₹10,000', min: 1000, max: 10_000 },
  { label: '₹10,000 – ₹15,000', min: 10_000, max: 15_000 },
  { label: '₹15,000 – ₹20,000', min: 15_000, max: 20_000 },
  { label: '₹20,000+', min: 20_000, max: 99_999 },
];

export type SrpGenderOption = {
  label: string;
  value: '' | 'male' | 'female';
};

export const SRP_GENDER_OPTIONS: readonly SrpGenderOption[] = [
  { label: 'Men Only', value: 'male' },
  { label: 'Women Only', value: 'female' },
  { label: 'Coliving', value: '' },
];

export const SRP_AMENITIES: readonly string[] = AMENITY_NAMES;
