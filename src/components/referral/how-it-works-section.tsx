import { StyleSheet, View } from 'react-native';

import { Typography } from '@/components/ui/typography';
import { REFERRAL_DISCLAIMER } from '@/constants/referral';
import palette from '@/constants/palette';
import { Radius } from '@/constants/theme';

type HowItWorksStep = {
  step: number;
  title: string;
  description: string;
};

type HowItWorksSectionProps = {
  steps: readonly HowItWorksStep[];
};

export function HowItWorksSection({ steps }: HowItWorksSectionProps) {
  return (
    <View style={styles.section}>
      <Typography variant="text" size="lg" weight="bold">
        How it works
      </Typography>

      <View style={styles.card}>
        <View style={styles.steps}>
          {steps.map((step, index) => (
            <View key={step.step} style={styles.stepRow}>
              <View style={styles.timeline}>
                <View style={styles.stepBadge}>
                  <Typography variant="label" size="xs" weight="bold" color={palette.blue[800]}>
                    {step.step}
                  </Typography>
                </View>
                {index < steps.length - 1 ? <View style={styles.timelineLine} /> : null}
              </View>
              <View style={styles.stepCopy}>
                <Typography variant="text" size="sm" weight="bold">
                  {step.title}
                </Typography>
                <Typography variant="text" size="sm" color={palette.gray[600]}>
                  {step.description}
                </Typography>
              </View>
            </View>
          ))}
        </View>

        <View style={styles.disclaimer}>
          <Typography variant="text" size="sm" color={palette.blue[800]}>
            {REFERRAL_DISCLAIMER}
          </Typography>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    gap: 12,
  },
  card: {
    backgroundColor: palette.white,
    borderRadius: Radius.md,
    padding: 16,
    gap: 16,
    shadowColor: '#101828',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  steps: {
    gap: 0,
  },
  stepRow: {
    flexDirection: 'row',
    gap: 12,
  },
  timeline: {
    alignItems: 'center',
    width: 28,
  },
  stepBadge: {
    width: 28,
    height: 28,
    borderRadius: Radius.full,
    backgroundColor: palette.blue[50],
    alignItems: 'center',
    justifyContent: 'center',
  },
  timelineLine: {
    flex: 1,
    width: 1,
    minHeight: 28,
    borderStyle: 'dashed',
    borderLeftWidth: 1,
    borderColor: palette.blue[200],
    marginVertical: 4,
  },
  stepCopy: {
    flex: 1,
    gap: 4,
    paddingBottom: 20,
  },
  disclaimer: {
    backgroundColor: palette.blue[50],
    borderRadius: Radius.sm,
    padding: 12,
  },
});
