export function getDefaultTabRoute(isTenant: boolean) {
  return isTenant ? '/(tabs)/dashboard' : '/(tabs)/home';
}
