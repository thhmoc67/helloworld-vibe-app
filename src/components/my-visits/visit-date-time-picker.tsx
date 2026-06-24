import { Pressable, ScrollView, StyleSheet, View } from 'react-native';

import { Typography } from '@/components/ui/typography';
import palette from '@/constants/palette';
import { Radius } from '@/constants/theme';
import type { VisitDateOption, VisitTimeSlot } from '@/utils/visit-dates';

type VisitDateTimePickerProps = {
  dates: VisitDateOption[];
  selectedDateId: string;
  onSelectDate: (date: VisitDateOption) => void;
  timeSlots: VisitTimeSlot[];
  selectedTimeId: string;
  onSelectTime: (slot: VisitTimeSlot) => void;
};

export function VisitDateTimePicker({
  dates,
  selectedDateId,
  onSelectDate,
  timeSlots,
  selectedTimeId,
  onSelectTime,
}: VisitDateTimePickerProps) {
  return (
    <View style={styles.wrap}>
      <Typography variant="text" size="md" weight="medium" style={styles.title}>
        Pick your visit date & time
      </Typography>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.dateRow}>
        {dates.map((date) => {
          const selected = date.id === selectedDateId;

          return (
            <Pressable
              key={date.id}
              onPress={() => onSelectDate(date)}
              style={[styles.dateCard, selected && styles.dateCardSelected]}
              accessibilityRole="button"
              accessibilityState={{ selected }}>
              <Typography
                variant="text"
                size="xs"
                weight="medium"
                color={selected ? palette.blue[600] : palette.gray[500]}>
                {date.dayLabel}
              </Typography>
              <Typography
                variant="text"
                size="lg"
                weight="bold"
                color={selected ? palette.blue[600] : palette.gray[800]}>
                {date.dateLabel}
              </Typography>
            </Pressable>
          );
        })}
      </ScrollView>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.timeRow}>
        {timeSlots.map((slot) => {
          const selected = slot.id === selectedTimeId;

          return (
            <Pressable
              key={slot.id}
              onPress={() => onSelectTime(slot)}
              style={[styles.timePill, selected && styles.timePillSelected]}
              accessibilityRole="button"
              accessibilityState={{ selected }}>
              <Typography
                variant="text"
                size="sm"
                weight="medium"
                color={selected ? palette.blue[600] : palette.gray[800]}>
                {slot.label}
              </Typography>
            </Pressable>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    gap: 16,
  },
  title: {
    textAlign: 'center',
  },
  dateRow: {
    gap: 8,
    paddingVertical: 2,
  },
  dateCard: {
    width: 68,
    minHeight: 110,
    borderRadius: Radius.sm,
    borderWidth: 1,
    borderColor: palette.gray[200],
    backgroundColor: palette.white,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
    paddingVertical: 12,
  },
  dateCardSelected: {
    borderColor: palette.blue[300],
    backgroundColor: palette.blue[50],
  },
  timeRow: {
    gap: 8,
    paddingVertical: 2,
  },
  timePill: {
    borderRadius: Radius.full,
    backgroundColor: palette.gray[100],
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  timePillSelected: {
    backgroundColor: palette.blue[50],
  },
});
