import type { ColorValue } from 'react-native';
import type { SvgProps } from 'react-native-svg';

import { TabBarIcons, type TabBarIconName } from '@/constants/tab-bar';
import palette from '@/constants/palette';

type TabBarIconProps = SvgProps & {
  name: TabBarIconName;
  size?: number;
  color?: ColorValue;
};

export function TabBarIcon({
  name,
  size = 24,
  width,
  height,
  color = palette.black,
  ...props
}: TabBarIconProps) {
  const Icon = TabBarIcons[name];

  return (
    <Icon
      width={width ?? size}
      height={height ?? size}
      color={color}
      {...props}
    />
  );
}
