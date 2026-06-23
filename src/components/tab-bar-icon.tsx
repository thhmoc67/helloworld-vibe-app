import type { SvgProps } from 'react-native-svg';

import { TabBarIcons, type TabBarIconName } from '@/constants/tab-bar';

type TabBarIconProps = SvgProps & {
  name: TabBarIconName;
  size?: number;
};

export function TabBarIcon({ name, size = 24, width, height, ...props }: TabBarIconProps) {
  const Icon = TabBarIcons[name];

  return (
    <Icon
      width={width ?? size}
      height={height ?? size}
      {...props}
    />
  );
}
