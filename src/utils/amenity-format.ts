import { AMENITY_EMOJIS, DEFAULT_AMENITY_EMOJI } from '@/constants/amenity-emojis';

const LEADING_EMOJI_PATTERN =
  /^(\p{Extended_Pictographic}\uFE0F?\u200D?[\p{Extended_Pictographic}\uFE0F]?|\s)+/u;

export function stripAmenityEmoji(value: string) {
  return value.replace(LEADING_EMOJI_PATTERN, '').trim();
}

export function normalizeAmenityKey(value: string) {
  return stripAmenityEmoji(value).toLowerCase().replace(/_/g, ' ').replace(/\s+/g, ' ').trim();
}

export function getAmenityEmoji(amenity: string) {
  const key = normalizeAmenityKey(amenity);
  if (!key) return DEFAULT_AMENITY_EMOJI;

  if (AMENITY_EMOJIS[key]) {
    return AMENITY_EMOJIS[key];
  }

  const partialMatch = Object.entries(AMENITY_EMOJIS).find(
    ([candidate]) => key.includes(candidate) || candidate.includes(key),
  );

  return partialMatch?.[1] ?? DEFAULT_AMENITY_EMOJI;
}

export function formatAmenityLabel(amenity: string) {
  const label = stripAmenityEmoji(amenity).trim() || amenity.trim();
  const emoji = getAmenityEmoji(label);
  return `${emoji} ${label}`;
}
