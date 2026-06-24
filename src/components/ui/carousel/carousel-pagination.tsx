import { StyleSheet } from 'react-native';
import { Pagination } from 'react-native-reanimated-carousel';
import type { SharedValue } from 'react-native-reanimated';

import palette from '@/constants/palette';

type CarouselPaginationProps<T extends object> = {
  progress: SharedValue<number>;
  data: T[];
  onPress: (index: number) => void;
};

export function CarouselPagination<T extends object>({ progress, data, onPress }: CarouselPaginationProps<T>) {
  return (
    <Pagination.Custom
      progress={progress}
      data={data}
      horizontal
      size={6}
      containerStyle={styles.container}
      dotStyle={styles.dot}
      activeDotStyle={styles.dotActive}
      onPress={onPress}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 6,
    marginTop: 8,
    marginBottom: 8,
    alignItems: 'center',
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: palette.gray[300],
  },
  dotActive: {
    width: 18,
    borderRadius: 3,
    backgroundColor: palette.lime[500],
  },
});
