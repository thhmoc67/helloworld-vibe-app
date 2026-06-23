# Expo HAS CHANGED

Read the exact versioned docs at https://docs.expo.dev/versions/v56.0.0/ before writing any code.

## Design assets

**Always use the `HW vibe assets` folder on the Desktop** for icons, logos, Lottie animations, and illustrations.

| | |
|---|---|
| **Source** | `~/Desktop/HW vibe assets` |
| **In repo** | `assets/hw-vibe` (symlink to the Desktop folder) |
| **Constants** | `src/constants/assets.ts` — import paths from here |

If `assets/hw-vibe` is missing, recreate the symlink:

```bash
ln -sfn "$HOME/Desktop/HW vibe assets" assets/hw-vibe
```

Folder layout (by feature): `Logos/`, `Login Flow- App/`, `Dashboard- App/`, `Payments- App/`, `Support- App/`, `Profile-App- After Onboarding /`, etc.

Do not add duplicate assets to the repo — reference the Desktop folder via the symlink.
