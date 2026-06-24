import { NativeTabs } from 'expo-router/unstable-native-tabs';
import type { SFSymbol } from 'sf-symbols-typescript';

import palette from '@/constants/palette';
import { TAB_ROUTES, type TabRouteName } from '@/constants/tab-bar';

const TAB_ORDER: TabRouteName[] = ['home', 'my-visits', 'wishlist', 'contact'];

const TAB_ICONS = {
  home: {
    sf: { default: 'house', selected: 'house.fill' },
    md: { default: 'home', selected: 'home' },
  },
  'my-visits': {
    sf: { default: 'calendar', selected: 'calendar' },
    md: { default: 'event', selected: 'event' },
  },
  wishlist: {
    sf: { default: 'heart', selected: 'heart.fill' },
    md: { default: 'favorite_border', selected: 'favorite' },
  },
  contact: {
    sf: { default: 'headphones', selected: 'headphones' },
    md: { default: 'headset_mic', selected: 'headset_mic' },
  },
} as const satisfies Record<
  TabRouteName,
  {
    sf: { default: SFSymbol; selected: SFSymbol };
    md: { default: string; selected: string };
  }
>;

export default function AppTabs() {
  return (
    <NativeTabs
      tintColor={palette.lime[700]}
      iconColor={{ default: palette.black, selected: palette.lime[700] }}
      indicatorColor={palette.lime[100]}
      labelStyle={{
        default: { color: palette.black, fontSize: 11 },
        selected: { color: palette.lime[700], fontSize: 11 },
      }}>
      {TAB_ORDER.map((name) => {
        const meta = TAB_ROUTES[name];
        const icons = TAB_ICONS[name];

        return (
          <NativeTabs.Trigger
            key={name}
            name={name}
            disableTransparentOnScrollEdge={name === 'home'}>
            <NativeTabs.Trigger.Label>{meta.label}</NativeTabs.Trigger.Label>
            <NativeTabs.Trigger.Icon
              sf={icons.sf}
              md={icons.md}
            />
          </NativeTabs.Trigger>
        );
      })}
    </NativeTabs>
  );
}
