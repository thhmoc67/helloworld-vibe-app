import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { TAB_BAR_HEIGHT, TAB_SCREEN_EXTRA_PADDING } from '@/constants/tab-bar';

/** Bottom space to reserve so scroll content stays above the native tab bar. */
export function useTabBarInset(extra = TAB_SCREEN_EXTRA_PADDING) {
  const insets = useSafeAreaInsets();
  return insets.bottom + TAB_BAR_HEIGHT + extra;
}
