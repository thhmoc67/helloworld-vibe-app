import { COMING_SOON_IMAGE_URI, formatPropertyImageUrl, getPropertyImageKeys } from '@/utils/images';
import type { HdpApiEvent, HdpMomentItem } from '@/types/hdp-moments';

const DEFAULT_MOMENT_LABELS = [
  'Community Lounge',
  'Private Room',
  'Shared Kitchen',
  'Work Zone',
  'Rooftop Hangout',
  'Game Room',
  'Fitness Corner',
  'Common Area',
] as const;

function isHdpEvent(value: unknown): value is HdpApiEvent {
  return (
    Boolean(value) &&
    typeof value === 'object' &&
    typeof (value as HdpApiEvent).name === 'string' &&
    (value as HdpApiEvent).name!.trim().length > 0
  );
}

function mapEventsToMoments(events: HdpApiEvent[]): HdpMomentItem[] {
  return events
    .filter((event) => event.name?.trim())
    .map((event) => ({
      id: `event-${event.id ?? event.name}`,
      label: event.name!.trim(),
      imageUri: event.display_image
        ? formatPropertyImageUrl(event.display_image, 'hdp')
        : COMING_SOON_IMAGE_URI,
      eventId: typeof event.id === 'number' ? event.id : undefined,
    }));
}

function mapGalleryToMoments(property?: Record<string, unknown> | null): HdpMomentItem[] {
  const imageKeys = getPropertyImageKeys(property);
  const galleryKeys = imageKeys.length > 3 ? imageKeys.slice(1) : imageKeys;

  return galleryKeys.map((key, index) => ({
    id: `gallery-${index}`,
    label: DEFAULT_MOMENT_LABELS[index % DEFAULT_MOMENT_LABELS.length],
    imageUri: formatPropertyImageUrl(key, 'hdp'),
  }));
}

export function extractMomentsFromHdp(
  events: unknown,
  property?: Record<string, unknown> | null,
): HdpMomentItem[] {
  if (Array.isArray(events)) {
    const fromEvents = mapEventsToMoments(events.filter(isHdpEvent));
    if (fromEvents.length > 0) {
      return fromEvents;
    }
  }

  return mapGalleryToMoments(property);
}
