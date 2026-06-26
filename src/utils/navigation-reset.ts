import type { Href } from 'expo-router';
import { router } from 'expo-router';

/** Clears the root stack and lands on a single route — no back navigation into the prior flow. */
export function resetRootRoute(href: Href) {
  if (router.canDismiss()) {
    router.dismissAll();
  }
  router.replace(href);
}
