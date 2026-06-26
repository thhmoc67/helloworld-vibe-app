export const MOVE_OUT_REASONS = [
  'Moving to Another city',
  'Found a better place',
  'Cost Reasons',
  'Property Issues',
  'Other',
] as const;

export type MoveOutReason = (typeof MOVE_OUT_REASONS)[number];

export const MOVE_OUT_NOTICE_DAYS = 30;
export const MOVE_OUT_MAX_DAYS = 60;
