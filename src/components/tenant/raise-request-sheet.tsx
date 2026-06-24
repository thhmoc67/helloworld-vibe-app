import { useState } from 'react';
import { ActivityIndicator, Pressable, ScrollView, StyleSheet, View } from 'react-native';

import { BottomSheet } from '@/components/ui/bottom-sheet';
import { Button } from '@/components/ui/button';
import { TextField } from '@/components/ui/text-field';
import { Typography } from '@/components/ui/typography';
import { SUPPORT_CATEGORIES } from '@/constants/tenant';
import palette from '@/constants/palette';
import { Radius } from '@/constants/theme';

type RaiseRequestSheetProps = {
  visible: boolean;
  onClose: () => void;
  onSubmit: (payload: { category: string; description: string }) => Promise<void>;
};

export function RaiseRequestSheet({ visible, onClose, onSubmit }: RaiseRequestSheetProps) {
  const [step, setStep] = useState<'category' | 'details'>('category');
  const [category, setCategory] = useState<string | null>(null);
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  function reset() {
    setStep('category');
    setCategory(null);
    setDescription('');
    setError('');
    setLoading(false);
  }

  function handleClose() {
    reset();
    onClose();
  }

  async function handleSubmit() {
    if (!category) {
      setError('Please choose a category');
      return;
    }
    if (!description.trim()) {
      setError('Please describe your issue');
      return;
    }

    setError('');
    setLoading(true);
    try {
      await onSubmit({ category, description: description.trim() });
      handleClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to raise request');
    } finally {
      setLoading(false);
    }
  }

  return (
    <BottomSheet visible={visible} onClose={handleClose}>
      <View style={styles.content}>
        <Typography variant="text" size="lg" weight="medium" style={styles.title}>
          {step === 'category' ? "What's this about?" : 'Help us narrow it down'}
        </Typography>

        {step === 'category' ? (
          <View style={styles.categoryGrid}>
            {SUPPORT_CATEGORIES.map((item) => (
              <Pressable
                key={item.id}
                style={[styles.categoryItem, category === item.id && styles.categoryItemActive]}
                onPress={() => {
                  setCategory(item.id);
                  setStep('details');
                }}
                accessibilityRole="button">
                <Typography variant="label" size="xs" weight="medium" style={styles.categoryLabel}>
                  {item.label}
                </Typography>
              </Pressable>
            ))}
          </View>
        ) : (
          <View style={styles.details}>
            <Typography variant="label" color={palette.gray[500]}>
              Category: {SUPPORT_CATEGORIES.find((item) => item.id === category)?.label}
            </Typography>
            <TextField
              label="Describe your issue"
              value={description}
              onChangeText={setDescription}
              multiline
              numberOfLines={4}
              style={styles.textArea}
            />
            {error ? (
              <Typography variant="label" color={palette.error}>
                {error}
              </Typography>
            ) : null}
            <View style={styles.actions}>
              <Button label="Back" variant="outline" onPress={() => setStep('category')} style={styles.actionButton} />
              <Button
                label="Submit"
                loading={loading}
                onPress={handleSubmit}
                style={styles.actionButton}
              />
            </View>
          </View>
        )}

        {step === 'category' && loading ? <ActivityIndicator color={palette.lime[700]} /> : null}
      </View>
    </BottomSheet>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: 24,
    paddingBottom: 24,
    gap: 16,
  },
  title: {
    textAlign: 'center',
  },
  categoryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  categoryItem: {
    width: '23%',
    minWidth: 72,
    height: 84,
    borderRadius: Radius.sm,
    borderWidth: 1,
    borderColor: palette.gray[200],
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 4,
  },
  categoryItemActive: {
    borderColor: palette.lime[700],
    backgroundColor: palette.lime[50],
  },
  categoryLabel: {
    textAlign: 'center',
  },
  details: {
    gap: 12,
  },
  textArea: {
    minHeight: 120,
    textAlignVertical: 'top',
  },
  actions: {
    flexDirection: 'row',
    gap: 12,
  },
  actionButton: {
    flex: 1,
  },
});
