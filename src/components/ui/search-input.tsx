import {
  StyleSheet,
  TextInput,
  View,
  type StyleProp,
  type TextInputProps,
  type ViewStyle,
} from 'react-native';

import { SymbolView } from 'expo-symbols';

import { fontStyleForWeight } from '@/constants/fonts';
import palette from '@/constants/palette';
import { Radius } from '@/constants/theme';

const SHADOW_OFFSET = { x: 4, y: 5 };

type SearchInputProps = TextInputProps & {
  containerStyle?: StyleProp<ViewStyle>;
};

export function SearchInput({ containerStyle, style, ...props }: SearchInputProps) {
  return (
    <View style={[styles.wrapper, containerStyle]}>
      <View style={styles.shadow} />
      <View style={styles.field}>
        <TextInput
          placeholder="Search for Locality, Office or College"
          placeholderTextColor={palette.textPlaceholder}
          style={[styles.input, style]}
          {...props}
        />
        <SymbolView name="magnifyingglass" size={20} tintColor={palette.grey} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    position: 'relative',
    marginRight: SHADOW_OFFSET.x,
    marginBottom: SHADOW_OFFSET.y,
  },
  shadow: {
    position: 'absolute',
    top: SHADOW_OFFSET.y,
    left: SHADOW_OFFSET.x,
    right: -SHADOW_OFFSET.x,
    bottom: -SHADOW_OFFSET.y,
    borderRadius: Radius.full,
    backgroundColor: palette.lime[400],
  },
  field: {
    position: 'relative',
    zIndex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    minHeight: 52,
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderRadius: Radius.full,
    borderWidth: 1,
    borderColor: palette.grey,
    backgroundColor: palette.white,
  },
  input: {
    flex: 1,
    fontSize: 14,
    lineHeight: 20,
    ...fontStyleForWeight('regular'),
    color: palette.textPrimary,
    padding: 0,
  },
});
