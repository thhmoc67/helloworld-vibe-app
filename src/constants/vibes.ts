export const VIBE_OPTIONS = [
  { id: 'chill', label: 'Chill', emoji: '😌' },
  { id: 'creative', label: 'Creative', emoji: '🎨' },
  { id: 'fitness', label: 'Fitness', emoji: '💪' },
  { id: 'gaming', label: 'Gaming', emoji: '🎮' },
] as const;

export type VibeOption = (typeof VIBE_OPTIONS)[number];
export type VibeId = VibeOption['id'];

/** Teal → purple gradient used on selected vibe chip borders. */
export const VIBE_CHIP_GRADIENT = ['#38BFF8', '#6941C6'] as const;
