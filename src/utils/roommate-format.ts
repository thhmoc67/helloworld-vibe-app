import type { RoomMate } from '@/types/roommate';

export function getMatePropertyLabel(mate: RoomMate, fallback?: string) {
  const unit = mate.bedNo ?? mate.flatNo ?? mate.roomNo;
  const property = mate.propertyName ?? mate.property_name ?? fallback;
  return [unit, property].filter(Boolean).join(' · ') || fallback || '';
}
