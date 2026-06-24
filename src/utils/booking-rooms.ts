import type { BookRoomOption, OccupancyType, PropertyCategory } from '@/types/booking';

const OCCUPANCY_LABELS: Record<OccupancyType, string> = {
  private: 'Private',
  double: 'Double',
  triple: 'Triple',
  quadruple: 'Quadruple',
};

const DEFAULT_FEATURES = ['Balcony', 'Attached Bathroom', 'North Facing'];

export function getOccupancyLabel(type: OccupancyType) {
  return OCCUPANCY_LABELS[type];
}

export function buildOccupancyOptions(roomTypes?: string[]): OccupancyType[] {
  const normalized = roomTypes?.map((type) => type.toLowerCase()) ?? [];

  const options: OccupancyType[] = [];
  if (normalized.some((type) => type.includes('private'))) options.push('private');
  if (normalized.some((type) => type.includes('double'))) options.push('double');
  if (normalized.some((type) => type.includes('triple'))) options.push('triple');
  if (normalized.some((type) => type.includes('quad'))) options.push('quadruple');

  return options.length > 0 ? options : ['private', 'double', 'triple', 'quadruple'];
}

function buildFeatures(category: PropertyCategory): string[] {
  const features: string[] = [];

  if (category.balcony) features.push('Balcony');
  if (category.attached_bathroom) features.push('Attached Bathroom');
  if (category.facing) features.push(`${category.facing} Facing`);

  const fromApi = [
    ...(Array.isArray(category.amenities) ? category.amenities : []),
    ...(Array.isArray(category.features) ? category.features : []),
  ].filter((item): item is string => typeof item === 'string' && item.trim().length > 0);

  if (fromApi.length > 0) {
    return fromApi.slice(0, 3);
  }

  return features.length > 0 ? features : DEFAULT_FEATURES;
}

function priceForOccupancy(category: PropertyCategory, occupancy: OccupancyType): number {
  if (occupancy === 'private') {
    return category.private_offer_rent ?? category.private_rent ?? category.rent ?? 0;
  }

  return category.offer_rent ?? category.rent ?? category.private_rent ?? 0;
}

export function buildBookRoomOptions(
  categories: PropertyCategory[] | undefined,
  occupancy: OccupancyType,
  fallbackRent?: number,
): BookRoomOption[] {
  if (categories && categories.length > 0) {
    return categories.map((category, index) => ({
      id: String(category.id ?? index),
      name: category.name || `Room Type ${index + 1}`,
      price: priceForOccupancy(category, occupancy) || fallbackRent || 0,
      features: buildFeatures(category),
    }));
  }

  const base = fallbackRent && fallbackRent > 0 ? fallbackRent : 12500;

  return [
    {
      id: '1',
      name: 'Room Type 1',
      price: base,
      features: DEFAULT_FEATURES,
    },
    {
      id: '2',
      name: 'Room Type 2',
      price: base + 1500,
      features: ['Attached Bathroom', 'East Facing'],
    },
    {
      id: '3',
      name: 'Room Type 3',
      price: base + 3000,
      features: ['Balcony', 'West Facing'],
    },
  ];
}

export function formatBookingPrice(amount: number) {
  if (!amount || amount <= 0) return '₹—';
  return `₹${amount.toLocaleString('en-IN')}/mo`;
}
