import type { SvgProps } from 'react-native-svg';

import { ProfileIcons, type ProfileIconName } from '@/constants/profile-icons';

type ProfileIconProps = SvgProps & {
  name: ProfileIconName;
  size?: number;
};

export function ProfileIcon({ name, size = 24, width, height, ...props }: ProfileIconProps) {
  const Icon = ProfileIcons[name];
  const dimension = size ?? 24;

  return (
    <Icon
      width={width ?? dimension}
      height={height ?? dimension}
      {...props}
    />
  );
}
