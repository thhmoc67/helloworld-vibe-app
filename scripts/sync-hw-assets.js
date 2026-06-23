#!/usr/bin/env node
/**
 * Syncs login-flow assets from ~/Desktop/HW vibe assets into assets/bundled/login.
 */
const fs = require('fs');
const path = require('path');
const os = require('os');

const sourceRoot = path.join(os.homedir(), 'Desktop', 'HW vibe assets', 'Login Flow- App');
const targetRoot = path.join(__dirname, '..', 'assets', 'bundled', 'login');
const citiesSource = path.join(sourceRoot, 'City Selection page');
const citiesTarget = path.join(targetRoot, 'cities');

function copyFile(src, dest) {
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  fs.copyFileSync(src, dest);
}

function main() {
  if (!fs.existsSync(sourceRoot)) {
    console.warn(`[sync-hw-assets] Source not found: ${sourceRoot}`);
    process.exit(0);
  }

  for (const file of fs.readdirSync(sourceRoot)) {
    const src = path.join(sourceRoot, file);
    if (!fs.statSync(src).isFile()) continue;
    if (/\.(svg|json|png)$/i.test(file)) {
      copyFile(src, path.join(targetRoot, file));
    }
  }

  if (fs.existsSync(citiesSource)) {
    fs.mkdirSync(citiesTarget, { recursive: true });
    for (const file of fs.readdirSync(citiesSource)) {
      if (file.endsWith('.svg')) {
        copyFile(path.join(citiesSource, file), path.join(citiesTarget, file));
      }
    }
  }

  console.log(`[sync-hw-assets] Synced login assets to ${targetRoot}`);

  const profileSource = path.join(os.homedir(), 'Desktop', 'HW vibe assets');
  const profileTarget = path.join(__dirname, '..', 'assets', 'bundled', 'profile');
  const profileCopies = [
    ['Homepage- App/Support.svg', 'support.svg'],
    ['Homepage- App/My visits.svg', 'my-visits.svg'],
    ['Homepage- App/Wishlist.svg', 'wishlist.svg'],
    ['Profile-App- before Onboarding/Community Events.svg', 'community-events.svg'],
    ['Profile-App- before Onboarding/For Homeowners.svg', 'for-homeowners.svg'],
    ['Profile-App- before Onboarding/Helloworld Living.svg', 'helloworld-living.svg'],
    ['Profile-App- before Onboarding/About.svg', 'about.svg'],
    ['Profile-App- before Onboarding/Privacy Policy.svg', 'privacy-policy.svg'],
    ['Profile-App- before Onboarding/Tenancy Poilicy.svg', 'tenancy-policy.svg'],
    ['Profile-App- before Onboarding/Logout.svg', 'logout.svg'],
    ['Homepage- App/Profile.svg', 'profile.svg'],
  ];

  for (const [relativeSource, destName] of profileCopies) {
    const src = path.join(profileSource, relativeSource);
    if (fs.existsSync(src)) {
      copyFile(src, path.join(profileTarget, destName));
    }
  }

  console.log(`[sync-hw-assets] Synced profile menu assets to ${profileTarget}`);

  const contactTarget = path.join(__dirname, '..', 'assets', 'bundled', 'contact');
  const contactSrc = path.join(
    profileSource,
    'Locality, City, Landmark',
    'Contact us form- 3d illustration.png',
  );
  if (fs.existsSync(contactSrc)) {
    copyFile(contactSrc, path.join(contactTarget, 'illustration.png'));
    console.log(`[sync-hw-assets] Synced contact assets to ${contactTarget}`);
  }

  const tabBarTarget = path.join(__dirname, '..', 'assets', 'bundled', 'tab-bar');
  const tabBarCopies = [
    ['Homepage- App/Home.svg', 'home.svg'],
    ['Homepage- App/My visits.svg', 'my-visits.svg'],
    ['Homepage- App/Wishlist.svg', 'wishlist.svg'],
    ['Homepage- App/Support.svg', 'contact.svg'],
  ];
  for (const [relativeSource, destName] of tabBarCopies) {
    const src = path.join(profileSource, relativeSource);
    if (fs.existsSync(src)) {
      copyFile(src, path.join(tabBarTarget, destName));
    }
  }
  console.log(`[sync-hw-assets] Synced tab bar assets to ${tabBarTarget}`);
}

main();
