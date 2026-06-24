import { Pressable, ScrollView, StyleSheet, View } from 'react-native';

import { Typography } from '@/components/ui/typography';
import { HDP_SECTION_NAV, type HdpSectionId } from '@/constants/hdp';
import palette from '@/constants/palette';
import { Radius } from '@/constants/theme';

type HdpSectionNavProps = {
  activeId: HdpSectionId;
  onChange: (id: HdpSectionId) => void;
};

export function HdpSectionNav({ activeId, onChange }: HdpSectionNavProps) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.content}>
      {HDP_SECTION_NAV.map((item) => {
        const isActive = item.id === activeId;

        return (
          <Pressable
            key={item.id}
            onPress={() => onChange(item.id)}
            style={[styles.pill, isActive && styles.pillActive]}
            accessibilityRole="button"
            accessibilityState={{ selected: isActive }}>
            <Typography
              variant="text"
              size="sm"
              weight={isActive ? 'bold' : 'medium'}
              color={isActive ? palette.gray[900] : palette.gray[600]}>
              {item.label}
            </Typography>
          </Pressable>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  content: {
    gap: 8,
    paddingVertical: 2,
  },
  pill: {
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: Radius.full,
    backgroundColor: palette.gray[100],
  },
  pillActive: {
    backgroundColor: palette.lime[100],
  },
});
