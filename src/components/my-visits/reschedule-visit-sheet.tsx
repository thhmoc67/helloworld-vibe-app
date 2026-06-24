import { useEffect, useMemo, useState } from 'react';
import { Alert, Pressable, StyleSheet, View } from 'react-native';

import { VisitDateTimePicker } from '@/components/my-visits/visit-date-time-picker';
import { BottomSheet } from '@/components/ui/bottom-sheet';
import { Button } from '@/components/ui/button';
import { Typography } from '@/components/ui/typography';
import palette from '@/constants/palette';
import { Radius } from '@/constants/theme';
import { usePropertyVisitSlots } from '@/queries/use-property-visit-slots';
import type { PropertyVisit } from '@/types/visit';
import {
  buildVisitDateOptions,
  DEFAULT_VISIT_TIME_SLOTS,
  type VisitDateOption,
  type VisitTimeSlot,
} from '@/utils/visit-dates';
import { getVisitPropertyId } from '@/utils/visit-format';
import {
  findSlotDay,
  mapSlotDaysToDateOptions,
  mapTimeSlotsForDay,
} from '@/utils/visit-slots';

type RescheduleVisitSheetProps = {
  visible: boolean;
  visit: PropertyVisit | null;
  onClose: () => void;
  onRescheduled?: () => void;
};

export function RescheduleVisitSheet({
  visible,
  visit,
  onClose,
  onRescheduled,
}: RescheduleVisitSheetProps) {
  const propertyId = visit ? getVisitPropertyId(visit) : null;
  const fallbackDates = useMemo(() => buildVisitDateOptions(), []);
  const { data: slotDays = [] } = usePropertyVisitSlots(
    propertyId ? String(propertyId) : '',
    visible && propertyId != null,
  );

  const hasApiSlots = slotDays.length > 0;
  const visitDates = useMemo(
    () => (hasApiSlots ? mapSlotDaysToDateOptions(slotDays) : fallbackDates),
    [fallbackDates, hasApiSlots, slotDays],
  );

  const [selectedDate, setSelectedDate] = useState<VisitDateOption>(fallbackDates[0]);
  const [selectedTime, setSelectedTime] = useState<VisitTimeSlot>(DEFAULT_VISIT_TIME_SLOTS[0]);
  const [submitting, setSubmitting] = useState(false);

  const selectedSlotDay = useMemo(
    () => findSlotDay(slotDays, selectedDate),
    [selectedDate, slotDays],
  );

  const visitTimeSlots = useMemo(() => {
    if (hasApiSlots) {
      return mapTimeSlotsForDay(selectedSlotDay, selectedDate.date);
    }
    return DEFAULT_VISIT_TIME_SLOTS;
  }, [hasApiSlots, selectedDate.date, selectedSlotDay]);

  useEffect(() => {
    if (!visible) return;
    setSelectedDate(visitDates[0] ?? fallbackDates[0]);
    setSelectedTime(DEFAULT_VISIT_TIME_SLOTS[0]);
    setSubmitting(false);
  }, [fallbackDates, visit, visible, visitDates]);

  useEffect(() => {
    if (!visitDates.length) return;
    if (!visitDates.some((date) => date.id === selectedDate.id)) {
      setSelectedDate(visitDates[0]);
    }
  }, [selectedDate.id, visitDates]);

  useEffect(() => {
    if (!visitTimeSlots.length) return;
    if (!visitTimeSlots.some((slot) => slot.id === selectedTime.id)) {
      setSelectedTime(visitTimeSlots[0]);
    }
  }, [selectedTime.id, visitTimeSlots]);

  function handleCancelVisit() {
    Alert.alert('Cancel visit?', 'This will cancel your scheduled property visit.', [
      { text: 'Keep visit', style: 'cancel' },
      {
        text: 'Cancel visit',
        style: 'destructive',
        onPress: () => {
          onClose();
          Alert.alert('Visit cancelled', 'Your visit has been cancelled.');
        },
      },
    ]);
  }

  async function handleReschedule() {
    setSubmitting(true);
    try {
      onClose();
      onRescheduled?.();
      Alert.alert('Visit rescheduled', 'Your visit has been updated with the new date and time.');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <BottomSheet visible={visible} onClose={onClose}>
      <View style={styles.content}>
        <VisitDateTimePicker
          dates={visitDates}
          selectedDateId={selectedDate.id}
          onSelectDate={setSelectedDate}
          timeSlots={visitTimeSlots}
          selectedTimeId={selectedTime.id}
          onSelectTime={setSelectedTime}
        />

        <View style={styles.actionsRow}>
          <Pressable
            onPress={handleCancelVisit}
            style={[styles.sheetButton, styles.cancelButton]}
            accessibilityRole="button">
            <Typography variant="text" size="md" weight="medium" color={palette.red[700]}>
              Cancel Visit
            </Typography>
          </Pressable>
          <Button
            label="Reschedule Visit"
            onPress={handleReschedule}
            loading={submitting}
            style={styles.sheetButton}
          />
        </View>

        <View style={styles.footerNote}>
          <Typography variant="text" size="xs" color={palette.gray[500]}>
            Completely Free
          </Typography>
          <View style={styles.footerDivider} />
          <Typography variant="text" size="xs" color={palette.gray[500]}>
            Reschedule Anytime
          </Typography>
        </View>
      </View>
    </BottomSheet>
  );
}

const styles = StyleSheet.create({
  content: {
    gap: 24,
    paddingBottom: 8,
  },
  actionsRow: {
    flexDirection: 'row',
    gap: 8,
  },
  sheetButton: {
    flex: 1,
    minHeight: 48,
  },
  cancelButton: {
    backgroundColor: palette.red[50],
    borderRadius: Radius.sm,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  footerNote: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  footerDivider: {
    width: 1,
    height: 12,
    backgroundColor: palette.gray[300],
  },
});
