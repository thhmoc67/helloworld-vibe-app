import Constants from 'expo-constants';
import { useRouter } from 'expo-router';
import * as WebBrowser from 'expo-web-browser';
import { useCallback } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { SymbolView } from 'expo-symbols';

import { MenuSectionCard } from '@/components/menu/menu-section-card';
import { ProfileSummary } from '@/components/menu/profile-summary';
import { Typography } from '@/components/ui/typography';
import { MENU_SECTIONS, TENANT_MENU_SECTIONS } from '@/constants/menu';
import palette from '@/constants/palette';
import { queryClient } from '@/queries/query-client';
import { useAuthStore } from '@/stores/auth-store';
import { useIsTenant, useTenantProfile, useTenantStore } from '@/stores/tenant-store';
import {
  getMenuExternalUrl,
  getMenuRoute,
  isTabMenuRoute,
} from '@/utils/menu-navigation';

const APP_VERSION = Constants.expoConfig?.version ?? '1.0.0';

export default function MenuScreen() {
  const router = useRouter();
  const mobile = useAuthStore((state) => state.mobile) ?? '';
  const clearSession = useAuthStore((state) => state.clearSession);
  const isTenant = useIsTenant();
  const tenantProfile = useTenantProfile();

  const propertyLabel = [tenantProfile?.propertyInfo?.address?.flatNo, tenantProfile?.propertyInfo?.name]
    .filter(Boolean)
    .join(' · ');

  const sections = isTenant ? TENANT_MENU_SECTIONS : MENU_SECTIONS;

  const handleLogout = useCallback(() => {
    clearSession();
    useTenantStore.getState().clearProfile();
    queryClient.clear();
    router.replace('/login');
  }, [clearSession, router]);

  async function openExternalUrl(url: string) {
    await WebBrowser.openBrowserAsync(url, {
      toolbarColor: palette.white,
      controlsColor: palette.black,
      showTitle: true,
      enableBarCollapsing: false,
    });
  }

  function handleItemPress(itemId: string) {
    if (itemId === 'logout') {
      handleLogout();
      return;
    }

    const externalUrl = getMenuExternalUrl(itemId);
    if (externalUrl) {
      void openExternalUrl(externalUrl);
      return;
    }

    const route = getMenuRoute(itemId, isTenant);
    if (!route) {
      return;
    }

    if (isTabMenuRoute(String(route))) {
      router.replace(route);
      return;
    }

    router.push(route);
  }

  return (
    <SafeAreaView style={styles.safe} edges={['top', 'left', 'right']}>
      <View style={styles.header}>
        <Pressable
          onPress={() => router.back()}
          style={({ pressed }) => [styles.backButton, pressed && styles.backButtonPressed]}
          accessibilityRole="button"
          accessibilityLabel="Go back">
          <SymbolView
            name="chevron.left"
            size={18}
            weight="semibold"
            tintColor={palette.gray[800]}
          />
        </Pressable>
        <Typography variant="text" size="lg" weight="bold" style={styles.headerTitle}>
          Profile
        </Typography>
      </View>

      <ScrollView
        bounces={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scroll}>
        <ProfileSummary
          mobile={mobile}
          name={isTenant ? tenantProfile?.userInfo?.name : undefined}
          propertyLabel={isTenant ? propertyLabel : undefined}
        />

        {__DEV__ && !isTenant ? (
          <Pressable
            onPress={() => router.push('/component-showcase')}
            style={({ pressed }) => [styles.devLink, pressed && styles.devLinkPressed]}
            accessibilityRole="button">
            <Typography variant="text" size="sm" weight="medium" color={palette.blue[700]}>
              Component Showcase (dev)
            </Typography>
          </Pressable>
        ) : null}

        {sections.map((section) => (
          <MenuSectionCard key={section.id} section={section} onItemPress={handleItemPress} />
        ))}

        <Text style={styles.footer}>
          V {APP_VERSION} | Made with <Text style={styles.heart}>❤️</Text> in Bengaluru
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: palette.gray[50],
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingHorizontal: 20,
    paddingBottom: 8,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: palette.white,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#101828',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  backButtonPressed: {
    opacity: 0.85,
  },
  headerTitle: {
    color: palette.black,
  },
  scroll: {
    paddingHorizontal: 20,
    paddingBottom: 32,
    gap: 24,
  },
  devLink: {
    alignSelf: 'flex-start',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    backgroundColor: palette.blue[50],
  },
  devLinkPressed: {
    opacity: 0.85,
  },
  footer: {
    textAlign: 'center',
    fontSize: 12,
    lineHeight: 18,
    color: palette.gray[500],
    marginTop: 8,
  },
  heart: {
    color: palette.red[500],
  },
});
