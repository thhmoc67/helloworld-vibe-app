import { useRef, useState } from 'react';
import {
  Pressable,
  StyleSheet,
  TextInput,
  View,
  type TextInputProps,
  type ViewStyle,
} from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { fontStyleForWeight } from '@/constants/fonts';
import palette from '@/constants/palette';
import { Radius } from '@/constants/theme';

type TextAreaProps = TextInputProps & {
  label: string;
  hint?: string;
  error?: string;
  containerStyle?: ViewStyle;
};

export function TextArea({
  label,
  hint,
  error,
  containerStyle,
  style,
  editable = true,
  onFocus,
  onBlur,
  ...props
}: TextAreaProps) {
  const inputRef = useRef<TextInput>(null);
  const [focused, setFocused] = useState(false);
  const hasError = Boolean(error);
  const isDisabled = editable === false;

  function focusInput() {
    if (!isDisabled) {
      inputRef.current?.focus();
    }
  }

  return (
    <View style={[styles.wrapper, containerStyle]}>
      <ThemedText style={styles.label}>{label}</ThemedText>
      <Pressable
        onPress={focusInput}
        style={[
          styles.input,
          focused && !hasError && styles.inputFocused,
          hasError && styles.inputError,
          focused && hasError && styles.inputErrorFocused,
          isDisabled && styles.inputDisabled,
        ]}>
        <TextInput
          ref={inputRef}
          multiline
          textAlignVertical="top"
          editable={editable}
          placeholderTextColor={palette.textPlaceholder}
          style={[styles.textInput, isDisabled && styles.inputTextDisabled, style]}
          onFocus={(e) => {
            setFocused(true);
            onFocus?.(e);
          }}
          onBlur={(e) => {
            setFocused(false);
            onBlur?.(e);
          }}
          {...props}
        />
      </Pressable>
      {hasError ? (
        <ThemedText style={styles.error}>{error}</ThemedText>
      ) : hint ? (
        <ThemedText style={styles.hint}>{hint}</ThemedText>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    gap: 6,
  },
  label: {
    fontSize: 14,
    lineHeight: 20,
    ...fontStyleForWeight('medium'),
    color: palette.textLabel,
  },
  input: {
    minHeight: 120,
    borderWidth: 1,
    borderColor: palette.borderDefault,
    borderRadius: Radius.sm,
    backgroundColor: palette.white,
  },
  textInput: {
    flex: 1,
    minHeight: 96,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 16,
    lineHeight: 24,
    ...fontStyleForWeight('regular'),
    color: palette.textPrimary,
  },
  inputTextDisabled: {
    color: palette.textSecondary,
  },
  inputFocused: {
    borderColor: palette.lime[400],
    shadowColor: palette.focusRing,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 2,
  },
  inputError: {
    borderColor: palette.red[300],
  },
  inputErrorFocused: {
    borderColor: palette.red[300],
    shadowColor: palette.red[100],
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 2,
  },
  inputDisabled: {
    backgroundColor: palette.surfaceDisabled,
    borderColor: palette.borderDefault,
    color: palette.textSecondary,
  },
  hint: {
    fontSize: 12,
    lineHeight: 18,
    color: palette.textSecondary,
  },
  error: {
    fontSize: 12,
    lineHeight: 18,
    color: palette.borderError,
  },
});
