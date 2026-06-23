import { Tabs } from 'expo-router';

import { HwBottomTabBar } from '@/components/navigation/hw-bottom-tab-bar';

export default function TabsLayout() {
  return (
    <Tabs
      tabBar={(props) => <HwBottomTabBar {...props} />}
      screenOptions={{
        headerShown: false,
        tabBarStyle: { display: 'none' },
      }}>
      <Tabs.Screen name="home" options={{ title: 'Home' }} />
      <Tabs.Screen name="my-visits" options={{ title: 'My Visits' }} />
      <Tabs.Screen name="wishlist" options={{ title: 'Wishlist' }} />
      <Tabs.Screen name="contact" options={{ title: 'Contact' }} />
    </Tabs>
  );
}
