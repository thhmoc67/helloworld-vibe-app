import { StyleSheet, View } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';

import { MenuRow } from '@/components/menu/menu-row';
import { Typography } from '@/components/ui/typography';
import type { MenuSection } from '@/constants/menu';
import palette from '@/constants/palette';

const SECTION_ENTER_MS = 240;
const SECTION_STAGGER_MS = 70;

type MenuSectionCardProps = {
  section: MenuSection;
  onItemPress: (itemId: string) => void;
  sectionIndex?: number;
  itemIndexOffset?: number;
  animateOnMount?: boolean;
};

export function MenuSectionCard({
  section,
  onItemPress,
  sectionIndex = 0,
  itemIndexOffset = 0,
  animateOnMount = true,
}: MenuSectionCardProps) {
  return (
    <Animated.View
      entering={
        animateOnMount
          ? FadeInDown.duration(SECTION_ENTER_MS).delay(sectionIndex * SECTION_STAGGER_MS)
          : undefined
      }
      style={styles.section}>
      <Typography variant="text" size="md" weight="bold" style={styles.title}>
        {section.title}
      </Typography>
      <View style={styles.card}>
        {section.items.map((item, index) => (
          <MenuRow
            key={item.id}
            item={item}
            index={itemIndexOffset + index}
            animateOnMount={animateOnMount}
            onPress={() => onItemPress(item.id)}
            isLast={index === section.items.length - 1}
          />
        ))}
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  section: {
    gap: 12,
  },
  title: {
    color: palette.black,
    paddingHorizontal: 4,
  },
  card: {
    backgroundColor: palette.white,
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#101828',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
});
