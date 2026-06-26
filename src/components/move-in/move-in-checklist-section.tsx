import { StyleSheet, View } from 'react-native';

import { FilterCheckbox } from '@/components/ui/filter-checkbox';
import { Typography } from '@/components/ui/typography';
import palette from '@/constants/palette';
import type { ChecklistSection } from '@/types/move-in-checklist';
import { formatChecklistLabel, getChecklistItemEntries } from '@/utils/move-in-checklist';

type MoveInChecklistSectionProps = {
  sectionKey: string;
  section: ChecklistSection;
  readonly?: boolean;
  onToggleItem: (sectionKey: string, itemKey: string, value: boolean) => void;
};

export function MoveInChecklistSection({
  sectionKey,
  section,
  readonly = false,
  onToggleItem,
}: MoveInChecklistSectionProps) {
  const items = getChecklistItemEntries(section);

  if (items.length === 0) {
    return null;
  }

  return (
    <View style={styles.section}>
      <Typography variant="text" size="md" weight="bold" style={styles.title}>
        {formatChecklistLabel(sectionKey)}
      </Typography>
      <View style={styles.grid}>
        {items.map(([itemKey, value]) => (
          <View key={itemKey} style={styles.gridCell}>
            <FilterCheckbox
              label={formatChecklistLabel(itemKey)}
              checked={Boolean(value)}
              onChange={() => {
                if (!readonly) {
                  onToggleItem(sectionKey, itemKey, !value);
                }
              }}
            />
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    gap: 12,
  },
  title: {
    color: palette.gray[900],
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    rowGap: 4,
  },
  gridCell: {
    width: '50%',
    paddingRight: 8,
  },
});
