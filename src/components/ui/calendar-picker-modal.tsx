import { SymbolView } from 'expo-symbols';
import { useEffect, useMemo, useState } from 'react';
import { Modal, Pressable, StyleSheet, View } from 'react-native';

import { Button } from '@/components/ui/button';
import { Typography } from '@/components/ui/typography';
import palette from '@/constants/palette';
import { Radius } from '@/constants/theme';

const WEEKDAYS = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sat', 'Su'] as const;

type CalendarPickerModalProps = {
  visible: boolean;
  value: Date;
  onClose: () => void;
  onApply: (date: Date) => void;
};

function startOfDay(date: Date) {
  const next = new Date(date);
  next.setHours(0, 0, 0, 0);
  return next;
}

function isSameDay(a: Date, b: Date) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

function buildMonthGrid(year: number, month: number) {
  const firstOfMonth = new Date(year, month, 1);
  const startOffset = (firstOfMonth.getDay() + 6) % 7;
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const daysInPrevMonth = new Date(year, month, 0).getDate();

  const cells: { date: Date; inMonth: boolean }[] = [];

  for (let index = 0; index < startOffset; index += 1) {
    const day = daysInPrevMonth - startOffset + index + 1;
    cells.push({ date: new Date(year, month - 1, day), inMonth: false });
  }

  for (let day = 1; day <= daysInMonth; day += 1) {
    cells.push({ date: new Date(year, month, day), inMonth: true });
  }

  while (cells.length % 7 !== 0) {
    const nextDay = cells.length - startOffset - daysInMonth + 1;
    cells.push({ date: new Date(year, month + 1, nextDay), inMonth: false });
  }

  return cells;
}

export function CalendarPickerModal({ visible, value, onClose, onApply }: CalendarPickerModalProps) {
  const [visibleMonth, setVisibleMonth] = useState(() => new Date(value));
  const [draftDate, setDraftDate] = useState(value);

  useEffect(() => {
    if (!visible) return;
    setVisibleMonth(new Date(value));
    setDraftDate(value);
  }, [value, visible]);

  const cells = useMemo(
    () => buildMonthGrid(visibleMonth.getFullYear(), visibleMonth.getMonth()),
    [visibleMonth],
  );

  const monthLabel = visibleMonth.toLocaleDateString('en-IN', {
    month: 'long',
    year: 'numeric',
  });

  function shiftMonth(delta: number) {
    setVisibleMonth((current) => new Date(current.getFullYear(), current.getMonth() + delta, 1));
  }

  return (
    <Modal transparent visible={visible} animationType="fade" onRequestClose={onClose}>
      <View style={styles.overlay}>
        <Pressable style={StyleSheet.absoluteFill} onPress={onClose} />
        <View style={styles.card}>
          <View style={styles.header}>
            <Pressable onPress={() => shiftMonth(-1)} style={styles.navButton} accessibilityLabel="Previous month">
              <SymbolView name="chevron.left" size={14} weight="semibold" tintColor={palette.gray[700]} />
            </Pressable>
            <Typography variant="text" size="md" weight="bold">
              {monthLabel}
            </Typography>
            <Pressable onPress={() => shiftMonth(1)} style={styles.navButton} accessibilityLabel="Next month">
              <SymbolView name="chevron.right" size={14} weight="semibold" tintColor={palette.gray[700]} />
            </Pressable>
          </View>

          <View style={styles.weekdayRow}>
            {WEEKDAYS.map((day) => (
              <Typography key={day} variant="text" size="xs" weight="medium" color={palette.gray[500]} style={styles.weekday}>
                {day}
              </Typography>
            ))}
          </View>

          <View style={styles.grid}>
            {cells.map(({ date, inMonth }) => {
              const selected = isSameDay(date, draftDate);
              const today = isSameDay(date, new Date());

              return (
                <Pressable
                  key={date.toISOString()}
                  onPress={() => setDraftDate(startOfDay(date))}
                  style={[styles.dayCell, selected && styles.dayCellSelected]}
                  accessibilityRole="button"
                  accessibilityState={{ selected }}>
                  <Typography
                    variant="text"
                    size="sm"
                    weight={selected ? 'bold' : 'medium'}
                    color={
                      selected
                        ? palette.white
                        : inMonth
                          ? palette.gray[800]
                          : palette.gray[400]
                    }>
                    {date.getDate()}
                  </Typography>
                  {today && !selected ? <View style={styles.todayDot} /> : null}
                </Pressable>
              );
            })}
          </View>

          <View style={styles.actions}>
            <Button label="Cancel" variant="outline" onPress={onClose} style={styles.actionButton} />
            <Button
              label="Apply"
              onPress={() => {
                onApply(draftDate);
                onClose();
              }}
              style={styles.actionButton}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(16, 24, 40, 0.45)',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  card: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: palette.white,
    borderRadius: Radius.md,
    padding: 20,
    gap: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  navButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: palette.gray[50],
  },
  weekdayRow: {
    flexDirection: 'row',
  },
  weekday: {
    flex: 1,
    textAlign: 'center',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  dayCell: {
    width: `${100 / 7}%`,
    aspectRatio: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: Radius.full,
  },
  dayCellSelected: {
    backgroundColor: palette.gray[800],
  },
  todayDot: {
    position: 'absolute',
    bottom: 8,
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: palette.helloLime,
  },
  actions: {
    flexDirection: 'row',
    gap: 12,
  },
  actionButton: {
    flex: 1,
  },
});
