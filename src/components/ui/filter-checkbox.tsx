import { Pressable, StyleSheet, View } from 'react-native';
import { SymbolView } from 'expo-symbols';

import { Typography } from '@/components/ui/typography';
import palette from '@/constants/palette';
import { Radius } from '@/constants/theme';

type FilterCheckboxProps = {
  label: string;
  checked: boolean;
  onChange: () => void;
};

export function FilterCheckbox({ label, checked, onChange }: FilterCheckboxProps) {
  return (
    <Pressable
      onPress={onChange}
      style={styles.root}
      accessibilityRole="checkbox"
      accessibilityState={{ checked }}>
      <View style={[styles.box, checked && styles.boxChecked]}>
        {checked ? (
          <SymbolView name="checkmark" size={12} weight="bold" tintColor={palette.gray[800]} />
        ) : null}
      </View>
      <Typography variant="text" size="sm" weight="medium" color={palette.gray[700]} style={styles.label}>
        {label}
      </Typography>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingVertical: 4,
  },
  box: {
    width: 20,
    height: 20,
    borderRadius: Radius.sm,
    borderWidth: 1,
    borderColor: palette.gray[300],
    backgroundColor: palette.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  boxChecked: {
    borderColor: palette.gray[800],
  },
  label: {
    flex: 1,
  },
});
