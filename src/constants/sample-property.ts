import { ImageAssets } from '@/constants/assets';
import type { PropertyListing } from '@/types/property';

export const SAMPLE_PROPERTY: PropertyListing = {
  id: 'hw-mahaveer',
  name: 'HelloWorld Mahaveer',
  location: 'Coliving PG in HSR Layout',
  rating: 4.5,
  vibeMatchPercent: 93,
  startingRent: 12500,
  roomTypes: ['Private', 'Double', 'Triple', 'Quadruple'],
  images: [ImageAssets.loginBento1, ImageAssets.loginBento2, ImageAssets.loginBento3],
  badges: [
    { label: 'Filling Fast', variant: 'filling-fast' },
    { label: 'Women Only', variant: 'women-only' },
  ],
};
