import { useRouter } from 'expo-router';
import { ActivityIndicator, Pressable, ScrollView, StyleSheet, View } from 'react-native';

import { TabScreen } from '@/components/navigation/tab-screen';
import { PropertyCard } from '@/components/property/property-card';
import { Button } from '@/components/ui/button';
import { Typography } from '@/components/ui/typography';
import palette from '@/constants/palette';
import { useTabBarInset } from '@/hooks/use-tab-bar-inset';
import { useWishlistProperties } from '@/queries/use-wishlist-properties';
import { useIsAuthenticated } from '@/stores/auth-store';
import { mapWishlistCardToListing } from '@/utils/map-wishlist-card';

export default function WishlistScreen() {
  const router = useRouter();
  const tabBarInset = useTabBarInset(0);
  const isAuthenticated = useIsAuthenticated();
  const { data: cards = [], isLoading, isError, refetch } = useWishlistProperties();

  const properties = cards.map(mapWishlistCardToListing);

  function openProperty(propertyId: string, name: string, imageUri?: string) {
    router.push({
      pathname: '/hdp',
      params: {
        id: propertyId,
        name,
        image: imageUri,
      },
    });
  }

  if (!isAuthenticated) {
    return (
      <TabScreen>
        <View style={styles.centered}>
          <Typography variant="heading" weight="bold">
            Wishlist
          </Typography>
          <Typography variant="body" color={palette.textSecondary} style={styles.subtitle}>
            Sign in to save properties and view them here.
          </Typography>
          <Button label="Sign in" onPress={() => router.push('/login')} style={styles.cta} />
        </View>
      </TabScreen>
    );
  }

  return (
    <TabScreen contentStyle={styles.screen}>
      <View style={styles.header}>
        <Typography variant="heading" weight="bold">
          Wishlist
        </Typography>
        <Typography variant="text" size="sm" color={palette.textSecondary}>
          {properties.length > 0
            ? `${properties.length} saved ${properties.length === 1 ? 'property' : 'properties'}`
            : 'Saved properties will appear here.'}
        </Typography>
      </View>

      {isLoading ? (
        <View style={styles.loader}>
          <ActivityIndicator color={palette.helloLime} />
        </View>
      ) : isError ? (
        <View style={styles.centered}>
          <Typography variant="body" color={palette.textSecondary} style={styles.subtitle}>
            Unable to load your wishlist right now.
          </Typography>
          <Button label="Try again" onPress={() => refetch()} style={styles.cta} />
        </View>
      ) : properties.length === 0 ? (
        <View style={styles.centered}>
          <Typography variant="body" color={palette.textSecondary} style={styles.subtitle}>
            Tap the heart on any property to save it here.
          </Typography>
          <Pressable onPress={() => router.push('/')}>
            <Typography variant="text" size="sm" weight="medium" color={palette.blue[600]}>
              Browse properties
            </Typography>
          </Pressable>
        </View>
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={[styles.list, { paddingBottom: tabBarInset }]}
          keyboardShouldPersistTaps="handled">
          {properties.map((property) => {
            const imageUri =
              typeof property.images[0] === 'object' &&
              property.images[0] &&
              'uri' in property.images[0]
                ? property.images[0].uri
                : undefined;

            return (
              <PropertyCard
                key={property.id}
                property={property}
                onPress={() => openProperty(property.id, property.name, imageUri)}
              />
            );
          })}
        </ScrollView>
      )}
    </TabScreen>
  );
}

const styles = StyleSheet.create({
  screen: {
    paddingBottom: 0,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 12,
    gap: 4,
  },
  centered: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
    gap: 12,
  },
  subtitle: {
    textAlign: 'center',
  },
  cta: {
    minWidth: 160,
    marginTop: 8,
  },
  loader: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  list: {
    paddingHorizontal: 20,
    gap: 20,
  },
});
