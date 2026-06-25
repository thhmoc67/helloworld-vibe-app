import { useCallback, useRef, type ReactNode } from 'react';
import { StyleSheet, View, type StyleProp, type ViewStyle } from 'react-native';
import Carousel, { type ICarouselInstance } from 'react-native-reanimated-carousel';
import { useSharedValue, type SharedValue } from 'react-native-reanimated';

import { CarouselPagination } from '@/components/ui/carousel/carousel-pagination';
import { configureCarouselPanGesture } from '@/components/ui/carousel/configure-pan-gesture';

export type HwCarouselRenderInfo<T> = {
  item: T;
  index: number;
  animationValue: SharedValue<number>;
};

export type HwCarouselProps<T> = {
  data: T[];
  width: number;
  height: number;
  renderItem: (info: HwCarouselRenderInfo<T>) => ReactNode;
  loop?: boolean;
  showPagination?: boolean;
  paginationDotColor?: string;
  paginationActiveDotColor?: string;
  style?: StyleProp<ViewStyle>;
  onSnapToItem?: (index: number) => void;
  enabled?: boolean;
};

export function HwCarousel<T extends object>({
  data,
  width,
  height,
  renderItem,
  loop = false,
  showPagination = true,
  paginationDotColor,
  paginationActiveDotColor,
  style,
  onSnapToItem,
  enabled = true,
}: HwCarouselProps<T>) {
  const carouselRef = useRef<ICarouselInstance>(null);
  const progress = useSharedValue(0);

  const handlePaginationPress = useCallback((index: number) => {
    carouselRef.current?.scrollTo({ index, animated: true });
  }, []);

  return (
    <View style={style}>
      <Carousel
        ref={carouselRef}
        width={width}
        height={height}
        data={data}
        loop={loop}
        pagingEnabled
        snapEnabled
        enabled={enabled}
        overscrollEnabled
        onConfigurePanGesture={configureCarouselPanGesture}
        onProgressChange={progress}
        onSnapToItem={onSnapToItem}
        style={styles.carousel}
        renderItem={({ item, index, animationValue }) => (
          <View style={styles.item}>{renderItem({ item, index, animationValue })}</View>
        )}
      />
      {showPagination && data.length > 1 ? (
        <CarouselPagination
          progress={progress}
          data={data}
          onPress={handlePaginationPress}
          dotColor={paginationDotColor}
          activeDotColor={paginationActiveDotColor}
        />
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  carousel: {
    overflow: 'visible',
  },
  item: {
    flex: 1,
  },
});
