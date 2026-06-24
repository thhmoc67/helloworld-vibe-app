import { SymbolView } from 'expo-symbols';
import { useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

import { Typography } from '@/components/ui/typography';
import palette from '@/constants/palette';

type HdpFaqListProps = {
  items: readonly { question: string; answer: string }[];
};

export function HdpFaqList({ items }: HdpFaqListProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(2);

  return (
    <View style={styles.list}>
      {items.map((item, index) => {
        const isOpen = openIndex === index;

        return (
          <View key={item.question} style={styles.item}>
            <Pressable
              onPress={() => setOpenIndex(isOpen ? null : index)}
              style={styles.questionRow}
              accessibilityRole="button">
              <Typography variant="text" size="sm" weight="medium" style={styles.question}>
                {item.question}
              </Typography>
              <SymbolView
                name={isOpen ? 'chevron.up' : 'chevron.down'}
                size={14}
                tintColor={palette.gray[600]}
              />
            </Pressable>
            {isOpen && item.answer ? (
              <Typography variant="text" size="sm" color={palette.textSecondary} style={styles.answer}>
                {item.answer}
              </Typography>
            ) : null}
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  list: {
    gap: 8,
  },
  item: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: palette.gray[200],
    paddingBottom: 12,
  },
  questionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
    paddingVertical: 8,
  },
  question: {
    flex: 1,
  },
  answer: {
    paddingBottom: 8,
  },
});
