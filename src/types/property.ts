import type { ImageSource } from 'expo-image';

export type PropertyBadgeVariant = 'filling-fast' | 'women-only';

export type PropertyBadge = {
  label: string;
  variant: PropertyBadgeVariant;
};

export type PropertyListing = {
  id: string;
  name: string;
  location: string;
  rating: number;
  vibeMatchPercent: number;
  startingRent: number;
  roomTypes: string[];
  images: ImageSource[];
  badges?: PropertyBadge[];
};
