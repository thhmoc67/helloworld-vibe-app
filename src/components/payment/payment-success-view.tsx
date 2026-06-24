import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'expo-router';
import { StyleSheet, View } from 'react-native';

import { Button } from '@/components/ui/button';
import { Typography } from '@/components/ui/typography';
import palette from '@/constants/palette';

type PaymentSuccessViewProps = {
  isInvoicePayment?: boolean;
};

export function PaymentSuccessView({ isInvoicePayment }: PaymentSuccessViewProps) {
  const router = useRouter();
  const queryClient = useQueryClient();

  async function handleDone() {
    if (isInvoicePayment) {
      await queryClient.invalidateQueries({ queryKey: ['tenant-invoices'] });
      router.replace('/(tabs)/payments');
      return;
    }
    router.back();
  }

  return (
    <View style={styles.container}>
      <Typography variant="display" size="sm" weight="bold" color={palette.lime[700]} style={styles.icon}>
        ✓
      </Typography>
      <Typography variant="text" size="xl" weight="medium" style={styles.title}>
        Congratulations
      </Typography>
      <Typography variant="text" size="md" color={palette.gray[600]} style={styles.message}>
        Payment has been completed successfully.
      </Typography>
      <Button label="Go Back" onPress={handleDone} style={styles.button} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: palette.white,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
    gap: 12,
  },
  icon: {
    fontSize: 56,
    marginBottom: 8,
  },
  title: {
    textAlign: 'center',
  },
  message: {
    textAlign: 'center',
    lineHeight: 22,
  },
  button: {
    marginTop: 16,
    alignSelf: 'stretch',
  },
});
