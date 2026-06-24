import { useEffect, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Switch, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { BottomSheet } from '@/components/ui/bottom-sheet';
import { Button } from '@/components/ui/button';
import { FilterCheckbox } from '@/components/ui/filter-checkbox';
import { Typography } from '@/components/ui/typography';
import {
  SRP_AMENITIES,
  SRP_BUDGET_PRESETS,
  SRP_GENDER_OPTIONS,
} from '@/constants/srp-filters';
import palette from '@/constants/palette';
import { Radius } from '@/constants/theme';
import { DEFAULT_SRP_FILTERS, type SrpFilters } from '@/types/srp-filters';

type SrpFiltersSheetProps = {
  visible: boolean;
  filters: SrpFilters;
  onClose: () => void;
  onApply: (filters: SrpFilters) => void;
};

function isBudgetPresetSelected(filters: SrpFilters, min: number, max: number) {
  return filters.priceMin === min && filters.priceMax === max;
}

export function SrpFiltersSheet({ visible, filters, onClose, onApply }: SrpFiltersSheetProps) {
  const insets = useSafeAreaInsets();
  const [draft, setDraft] = useState<SrpFilters>(filters);

  useEffect(() => {
    if (visible) {
      setDraft(filters);
    }
  }, [visible, filters]);

  function updateDraft(patch: Partial<SrpFilters>) {
    setDraft((current) => ({ ...current, ...patch }));
  }

  function handleClearAll() {
    setDraft({ ...DEFAULT_SRP_FILTERS });
  }

  function handleApply() {
    onApply(draft);
    onClose();
  }

  return (
    <BottomSheet visible={visible} onClose={onClose}>
      <View style={styles.header}>
        <Typography variant="heading" weight="bold">
          Filters
        </Typography>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={[styles.content, { paddingBottom: insets.bottom + 16 }]}>
        <View style={styles.section}>
          <Typography variant="text" size="md" weight="bold">
            Budget
          </Typography>
          <View style={styles.chipRow}>
            {SRP_BUDGET_PRESETS.map((preset) => {
              const selected = isBudgetPresetSelected(draft, preset.min, preset.max);
              return (
                <Pressable
                  key={preset.label}
                  onPress={() => updateDraft({ priceMin: preset.min, priceMax: preset.max })}
                  style={[styles.chip, selected && styles.chipSelected]}
                  accessibilityRole="button"
                  accessibilityState={{ selected }}>
                  <Typography
                    variant="text"
                    size="sm"
                    weight="medium"
                    color={selected ? palette.blue[700] : palette.gray[800]}>
                    {preset.label}
                  </Typography>
                </Pressable>
              );
            })}
          </View>
        </View>

        <View style={styles.section}>
          <Typography variant="text" size="md" weight="bold">
            Gender
          </Typography>
          <View style={styles.chipRow}>
            {SRP_GENDER_OPTIONS.map((option) => {
              const selected = draft.gender === option.value;
              return (
                <Pressable
                  key={option.label}
                  onPress={() => updateDraft({ gender: option.value })}
                  style={[styles.chip, selected && styles.chipSelected]}
                  accessibilityRole="radio"
                  accessibilityState={{ selected }}>
                  <Typography
                    variant="text"
                    size="sm"
                    weight="medium"
                    color={selected ? palette.blue[700] : palette.gray[800]}>
                    {option.label}
                  </Typography>
                </Pressable>
              );
            })}
          </View>
        </View>

        <View style={[styles.section, styles.foodRow]}>
          <Typography variant="text" size="md" weight="bold">
            Food available
          </Typography>
          <Switch
            value={draft.food}
            onValueChange={(food) => updateDraft({ food })}
            trackColor={{ false: palette.gray[300], true: palette.lime[400] }}
            thumbColor={palette.white}
          />
        </View>

        <View style={styles.section}>
          <Typography variant="text" size="md" weight="bold">
            Amenities
          </Typography>
          <View style={styles.amenitiesGrid}>
            {SRP_AMENITIES.map((amenity) => (
              <View key={amenity} style={styles.amenityItem}>
                <FilterCheckbox
                  label={amenity}
                  checked={draft.amenities.includes(amenity)}
                  onChange={() => {
                    const next = draft.amenities.includes(amenity)
                      ? draft.amenities.filter((item) => item !== amenity)
                      : [...draft.amenities, amenity];
                    updateDraft({ amenities: next });
                  }}
                />
              </View>
            ))}
          </View>
        </View>

        <View style={styles.actions}>
          <Pressable onPress={handleClearAll} accessibilityRole="button">
            <Typography variant="text" size="sm" weight="medium" color={palette.gray[600]} style={styles.clearAll}>
              Clear all
            </Typography>
          </Pressable>
          <Button label="Apply" onPress={handleApply} style={styles.applyButton} />
        </View>
      </ScrollView>
    </BottomSheet>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 20,
    paddingBottom: 8,
  },
  content: {
    paddingHorizontal: 20,
    gap: 24,
  },
  section: {
    gap: 12,
  },
  chipRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  chip: {
    borderRadius: Radius.full,
    backgroundColor: palette.gray[100],
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  chipSelected: {
    backgroundColor: palette.blue[50],
  },
  foodRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  amenitiesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  amenityItem: {
    width: '50%',
    paddingRight: 8,
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: palette.gray[200],
    paddingTop: 16,
  },
  clearAll: {
    textDecorationLine: 'underline',
  },
  applyButton: {
    minWidth: 140,
  },
});
