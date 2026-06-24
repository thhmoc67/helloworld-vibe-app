import type { ColorValue } from 'react-native';

import { DashboardIcons } from '@/constants/assets';
import palette from '@/constants/palette';

export type DashboardIconName = keyof typeof DashboardIcons;

type DashboardIconProps = {
  name: DashboardIconName;
  size?: number;
  color?: ColorValue;
};

export function DashboardIcon({ name, size = 24, color = palette.black }: DashboardIconProps) {
  const Icon = DashboardIcons[name];
  return <Icon width={size} height={size} color={color} />;
}
