import { Image } from 'expo-image';
import { useState } from 'react';
import { StyleSheet, View, useWindowDimensions } from 'react-native';

import { HwCarousel } from '@/components/ui/carousel';
import { ImageAssets } from '@/constants/assets';
import palette from '@/constants/palette';

type HdpHeroCarouselProps = {
  images: { uri: string }[];
};

const HERO_HEIGHT = 400;

export function HdpHeroCarousel({ images }: HdpHeroCarouselProps) {
  const { width } = useWindowDimensions();
  const slides = images.length > 0 ? images : [{ uri: '' }];
  const [failedIndexes, setFailedIndexes] = useState<Set<number>>(new Set());

  return (
    <View style={[styles.wrap, { height: HERO_HEIGHT }]}>
      <HwCarousel
        data={slides}
        width={width}
        height={HERO_HEIGHT}
        showPagination={slides.length > 1}
        renderItem={({ item, index }) => {
          const useFallback = !item.uri || failedIndexes.has(index);

          return (
            <Image
              source={useFallback ? ImageAssets.loginBento1 : { uri: item.uri }}
              style={{ width, height: HERO_HEIGHT }}
              contentFit="cover"
              onError={() => setFailedIndexes((current) => new Set(current).add(index))}
            />
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    backgroundColor: palette.gray[100],
  },
});
