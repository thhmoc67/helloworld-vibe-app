import type { PanGesture } from 'react-native-gesture-handler';

/** Horizontal swipe with vertical-scroll parent coexistence. */
export function configureCarouselPanGesture(gesture: PanGesture) {
  gesture
    .activeOffsetX([-4, 4])
    .failOffsetY([-12, 12])
    .minPointers(1)
    .maxPointers(1);
}
