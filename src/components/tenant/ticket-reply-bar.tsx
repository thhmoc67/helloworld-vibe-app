import { SymbolView } from 'expo-symbols';
import { useRef, useState } from 'react';
import {
  ActivityIndicator,
  Keyboard,
  Platform,
  Pressable,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Typography } from '@/components/ui/typography';
import palette from '@/constants/palette';
import { Radius } from '@/constants/theme';

type TicketReplyBarProps = {
  value: string;
  onChange: (value: string) => void;
  onSend: () => void;
  sending?: boolean;
};

export function TicketReplyBar({ value, onChange, onSend, sending = false }: TicketReplyBarProps) {
  const insets = useSafeAreaInsets();
  const inputRef = useRef<TextInput>(null);
  const [focused, setFocused] = useState(false);
  const canSend = value.trim().length > 0 && !sending;

  return (
    <View style={[styles.footer, { paddingBottom: Math.max(insets.bottom, 12) }]}>
      <Pressable
        onPress={() => inputRef.current?.focus()}
        style={[styles.inputShell, focused && styles.inputShellFocused]}>
        <TextInput
          ref={inputRef}
          value={value}
          onChangeText={onChange}
          placeholder="Type your message here"
          placeholderTextColor={palette.gray[400]}
          style={styles.input}
          multiline
          maxLength={1000}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          editable={!sending}
        />
      </Pressable>

      <Pressable
        onPress={() => {
          if (!canSend) return;
          onSend();
        }}
        disabled={!canSend}
        style={[styles.sendButton, !canSend && styles.sendButtonDisabled]}
        accessibilityRole="button"
        accessibilityLabel="Send message">
        {sending ? (
          <ActivityIndicator size="small" color={palette.lime[800]} />
        ) : (
          <SymbolView name="paperplane.fill" size={18} weight="semibold" tintColor={palette.lime[800]} />
        )}
      </Pressable>
    </View>
  );
}

export function dismissTicketReplyKeyboard() {
  Keyboard.dismiss();
}

const styles = StyleSheet.create({
  footer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 10,
    paddingHorizontal: 16,
    paddingTop: 12,
    backgroundColor: palette.white,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: palette.gray[200],
    ...Platform.select({
      ios: {
        shadowColor: '#101828',
        shadowOffset: { width: 0, height: -4 },
        shadowOpacity: 0.06,
        shadowRadius: 12,
      },
      android: {
        elevation: 8,
      },
    }),
  },
  inputShell: {
    flex: 1,
    minHeight: 48,
    maxHeight: 120,
    borderWidth: 1,
    borderColor: palette.gray[300],
    borderRadius: Radius.md,
    paddingHorizontal: 14,
    paddingVertical: 10,
    backgroundColor: palette.white,
    justifyContent: 'center',
  },
  inputShellFocused: {
    borderColor: palette.lime[400],
  },
  input: {
    fontSize: 16,
    lineHeight: 22,
    color: palette.textPrimary,
    padding: 0,
    maxHeight: 96,
  },
  sendButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: palette.lime[300],
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 2,
  },
  sendButtonDisabled: {
    opacity: 0.45,
  },
});
