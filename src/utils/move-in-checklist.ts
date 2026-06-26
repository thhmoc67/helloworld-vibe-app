import type { MoveInChecklistItems } from '@/types/move-in-checklist';

export const FEEDBACK_SECTION_KEY = 'additional_feedback';

const SECTION_LABEL_OVERRIDES: Record<string, string> = {
  room_furniture: 'Room & Furniture',
  room_and_furniture: 'Room & Furniture',
  electrical_lighting: 'Electrical & lighting',
  electrical_and_lighting: 'Electrical & lighting',
  common_areas: 'Common areas',
};

const ITEM_LABEL_OVERRIDES: Record<string, string> = {
  bedsheet_pillow: 'Bedsheet & pillow',
  bedsheet_and_pillow: 'Bedsheet & pillow',
  tv_with_remote: 'TV with remote',
  ac_with_remote: 'AC with remote',
  main_entrance_key: 'Main entrance key',
  towel_hanger: 'Towel Hanger',
  toiletry_holder: 'Toiletry Holder',
  shoe_rack: 'Shoe rack',
  room_lights: 'Room Lights',
  bathroom_lights: 'Bathroom Lights',
};

const RESERVED_SECTION_KEYS = new Set(['status', FEEDBACK_SECTION_KEY]);
const RESERVED_ITEM_KEYS = new Set(['comments']);

function capitalizeWord(word: string) {
  if (!word) return word;
  return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
}

export function formatChecklistLabel(key: string) {
  const normalized = key.trim().toLowerCase();
  if (SECTION_LABEL_OVERRIDES[normalized]) {
    return SECTION_LABEL_OVERRIDES[normalized];
  }
  if (ITEM_LABEL_OVERRIDES[normalized]) {
    return ITEM_LABEL_OVERRIDES[normalized];
  }

  return key
    .split('_')
    .filter(Boolean)
    .map(capitalizeWord)
    .join(' ');
}

export function getChecklistSectionKeys(items: MoveInChecklistItems | null | undefined) {
  if (!items) return [];
  return Object.keys(items).filter((key) => !RESERVED_SECTION_KEYS.has(key));
}

export function getChecklistItemEntries(section: Record<string, boolean | string | undefined>) {
  return Object.entries(section).filter(([key]) => !RESERVED_ITEM_KEYS.has(key));
}

export function extractFeedbackComments(items: MoveInChecklistItems | null | undefined) {
  const feedback = items?.[FEEDBACK_SECTION_KEY]?.comments;
  if (typeof feedback === 'string' && feedback.trim()) {
    return feedback;
  }

  if (!items) return '';

  const sectionComments = getChecklistSectionKeys(items)
    .map((sectionKey) => items[sectionKey]?.comments)
    .filter((value): value is string => typeof value === 'string' && value.trim().length > 0);

  return sectionComments[0] ?? '';
}

export function mergeFeedbackComments(
  items: MoveInChecklistItems,
  comments: string,
): MoveInChecklistItems {
  const next = { ...items };

  for (const sectionKey of getChecklistSectionKeys(next)) {
    const section = { ...next[sectionKey] };
    delete section.comments;
    next[sectionKey] = section;
  }

  if (comments.trim()) {
    next[FEEDBACK_SECTION_KEY] = { comments: comments.trim() };
  } else {
    delete next[FEEDBACK_SECTION_KEY];
  }

  return next;
}
