import { StyleSheet } from 'react-native';

import palette from '@/constants/palette';

/** Matches Figma move-out screens (24px screen inset). */
export const MOVE_OUT_HORIZONTAL_PADDING = 24;

/** Gap between major blocks (retention card → form section). */
export const MOVE_OUT_SECTION_GAP = 32;

/** Gap inside a form group (section title → cards). */
export const MOVE_OUT_FORM_GROUP_GAP = 15;

/** Gap between cards within a group. */
export const MOVE_OUT_CARD_GAP = 16;

/** Gap between checklist sections. */
export const MOVE_OUT_CHECKLIST_SECTION_GAP = 24;

/** Space reserved above fixed footers (excluding safe-area inset). */
export const MOVE_OUT_FOOTER_CLEARANCE = 168;

/** Form screen footer is taller (disclaimer + submit CTA). */
export const MOVE_OUT_FORM_FOOTER_CLEARANCE = 196;

export const moveOutContent = StyleSheet.create({
  horizontal: {
    paddingHorizontal: MOVE_OUT_HORIZONTAL_PADDING,
  },
});

export const moveOutFooter = StyleSheet.create({
  bar: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: palette.white,
    paddingHorizontal: MOVE_OUT_HORIZONTAL_PADDING,
    paddingTop: 16,
    gap: 10,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: -5 },
    shadowOpacity: 0.25,
    shadowRadius: 21.4,
    elevation: 12,
  },
});
