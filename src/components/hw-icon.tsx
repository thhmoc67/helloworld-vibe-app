import type { SvgProps } from 'react-native-svg';

import {
  DashboardIcons,
  LoginIcons,
  LogoIcons,
  type HwIconName,
} from '@/constants/assets';

type HwIconProps = SvgProps & {
  name: HwIconName;
  size?: number;
};

const iconMap = {
  ...LogoIcons,
  ...LoginIcons,
  ...DashboardIcons,
};

export function HwIcon({ name, size = 24, width, height, ...props }: HwIconProps) {
  const Icon = iconMap[name];
  const dimension = size ?? 24;

  return (
    <Icon
      width={width ?? dimension}
      height={height ?? dimension}
      {...props}
    />
  );
}
