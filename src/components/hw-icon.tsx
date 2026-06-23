import type { SvgProps } from 'react-native-svg';

import { HomepageIcons, LoginIcons, TabBarIcons, type HwIconName } from '@/constants/assets';

const ICON_MAP = {
  ...LoginIcons,
  ...TabBarIcons,
  ...HomepageIcons,
} as const;

type HwIconProps = SvgProps & {
  name: HwIconName;
  size?: number;
};

export function HwIcon({ name, size = 24, width, height, ...props }: HwIconProps) {
  const Icon = ICON_MAP[name];
  const dimension = size ?? 24;

  return <Icon width={width ?? dimension} height={height ?? dimension} {...props} />;
}
