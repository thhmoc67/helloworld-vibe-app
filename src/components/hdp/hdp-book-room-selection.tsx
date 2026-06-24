import { SymbolView } from 'expo-symbols';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';

import { Button } from '@/components/ui/button';
import { Typography } from '@/components/ui/typography';
import type { BookRoomOption, OccupancyType } from '@/types/booking';
import { formatBookingPrice, getOccupancyLabel } from '@/utils/booking-rooms';
import palette from '@/constants/palette';
import { Radius } from '@/constants/theme';

type HdpBookRoomSelectionProps = {
  occupancyOptions: OccupancyType[];
  selectedOccupancy: OccupancyType;
  onOccupancyChange: (occupancy: OccupancyType) => void;
  rooms: BookRoomOption[];
  selectedRoomId: string;
  onRoomSelect: (roomId: string) => void;
  minStayMonths: number;
  onBookNow: () => void;
};

function OccupancyChips({
  options,
  selected,
  onChange,
}: {
  options: OccupancyType[];
  selected: OccupancyType;
  onChange: (value: OccupancyType) => void;
}) {
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.chipRow}>
      {options.map((option) => {
        const active = option === selected;

        return (
          <Pressable
            key={option}
            onPress={() => onChange(option)}
            style={[styles.chip, active && styles.chipActive]}
            accessibilityRole="button"
            accessibilityState={{ selected: active }}>
            <Typography
              variant="text"
              size="sm"
              weight="medium"
              color={active ? palette.white : palette.gray[700]}>
              {getOccupancyLabel(option)}
            </Typography>
          </Pressable>
        );
      })}
    </ScrollView>
  );
}

function RoomTypeRow({
  room,
  selected,
  onSelect,
}: {
  room: BookRoomOption;
  selected: boolean;
  onSelect: () => void;
}) {
  return (
    <Pressable
      onPress={onSelect}
      style={[styles.roomRow, selected && styles.roomRowSelected]}
      accessibilityRole="radio"
      accessibilityState={{ selected }}>
      <View style={styles.roomHeader}>
        <View style={styles.roomTitleRow}>
          <View style={[styles.radio, selected && styles.radioSelected]}>
            {selected ? <View style={styles.radioDot} /> : null}
          </View>
          <Typography variant="text" size="md" weight="bold">
            {room.name}
          </Typography>
        </View>
        <Typography variant="text" size="md" weight="bold">
          {formatBookingPrice(room.price)}
        </Typography>
      </View>

      <View style={styles.featureRow}>
        {room.features.map((feature, index) => (
          <View key={feature} style={styles.featureItem}>
            {index > 0 ? (
              <Typography variant="text" size="xs" color={palette.gray[400]}>
                ·
              </Typography>
            ) : null}
            <SymbolView name="house.fill" size={12} tintColor={palette.gray[500]} />
            <Typography variant="text" size="xs" color={palette.gray[600]}>
              {feature}
            </Typography>
          </View>
        ))}
      </View>
    </Pressable>
  );
}

export function HdpBookRoomSelection({
  occupancyOptions,
  selectedOccupancy,
  onOccupancyChange,
  rooms,
  selectedRoomId,
  onRoomSelect,
  minStayMonths,
  onBookNow,
}: HdpBookRoomSelectionProps) {
  return (
    <View style={styles.wrap}>
      <Typography variant="text" size="md" weight="bold">
        Select your Occupancy
      </Typography>

      <OccupancyChips
        options={occupancyOptions}
        selected={selectedOccupancy}
        onChange={onOccupancyChange}
      />

      <View style={styles.roomList}>
        {rooms.map((room) => (
          <RoomTypeRow
            key={room.id}
            room={room}
            selected={room.id === selectedRoomId}
            onSelect={() => onRoomSelect(room.id)}
          />
        ))}
      </View>

      <Button label="Book Now" onPress={onBookNow} style={styles.cta} />

      <Typography variant="text" size="xs" color={palette.gray[500]} style={styles.disclaimer}>
        Full Refund of Security Deposit requires a minimum {minStayMonths}-month stay.
      </Typography>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    gap: 16,
  },
  chipRow: {
    gap: 8,
    paddingVertical: 2,
  },
  chip: {
    borderRadius: Radius.full,
    backgroundColor: palette.gray[100],
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  chipActive: {
    backgroundColor: palette.gray[800],
  },
  roomList: {
    gap: 0,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: palette.gray[200],
  },
  roomRow: {
    gap: 8,
    paddingVertical: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: palette.gray[200],
  },
  roomRowSelected: {
    backgroundColor: palette.gray[25],
  },
  roomHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
  },
  roomTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    flex: 1,
  },
  radio: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: palette.gray[400],
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioSelected: {
    borderColor: palette.gray[800],
  },
  radioDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: palette.gray[800],
  },
  featureRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    gap: 6,
    paddingLeft: 30,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  cta: {
    marginTop: 4,
  },
  disclaimer: {
    textAlign: 'center',
    lineHeight: 18,
  },
});
