import { useEffect, useRef, type ReactNode } from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  useWindowDimensions,
  type NativeScrollEvent,
  type NativeSyntheticEvent,
} from 'react-native';

type SwipeableTabPagerProps<T extends string> = {
  tabs: readonly T[];
  value: T;
  onChange: (value: T) => void;
  children: (tab: T) => ReactNode;
};

export function SwipeableTabPager<T extends string>({
  tabs,
  value,
  onChange,
  children,
}: SwipeableTabPagerProps<T>) {
  const { width } = useWindowDimensions();
  const pagerRef = useRef<ScrollView>(null);
  const activeIndex = Math.max(0, tabs.indexOf(value));
  const isSyncingRef = useRef(false);

  useEffect(() => {
    isSyncingRef.current = true;
    pagerRef.current?.scrollTo({ x: activeIndex * width, animated: true });
    const timer = setTimeout(() => {
      isSyncingRef.current = false;
    }, 300);
    return () => clearTimeout(timer);
  }, [activeIndex, width]);

  function handleMomentumScrollEnd(event: NativeSyntheticEvent<NativeScrollEvent>) {
    if (isSyncingRef.current) return;

    const index = Math.round(event.nativeEvent.contentOffset.x / width);
    const nextTab = tabs[index];
    if (nextTab && nextTab !== value) {
      onChange(nextTab);
    }
  }

  return (
    <ScrollView
      ref={pagerRef}
      horizontal
      pagingEnabled
      bounces={false}
      showsHorizontalScrollIndicator={false}
      scrollEventThrottle={16}
      onMomentumScrollEnd={handleMomentumScrollEnd}
      style={styles.pager}
      contentContainerStyle={styles.pagerContent}>
      {tabs.map((tab) => (
        <View key={tab} style={[styles.page, { width }]}>
          {children(tab)}
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  pager: {
    flex: 1,
  },
  pagerContent: {
    flexGrow: 1,
  },
  page: {
    flex: 1,
  },
});
