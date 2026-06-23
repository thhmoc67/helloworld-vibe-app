/**
 * Bundled HelloWorld assets (copied from ~/Desktop/HW vibe assets).
 * Run `npm run sync:assets` after updating the Desktop source folder.
 */

export const LoginIcons = {
  call: require('../../assets/bundled/login/Vector.svg').default,
  edit: require('../../assets/bundled/login/Edit.svg').default,
  whatsapp: require('../../assets/bundled/login/Whatsapp.svg').default,
  bangalore: require('../../assets/bundled/login/cities/Bangalore.svg').default,
  chennai: require('../../assets/bundled/login/cities/Chennai.svg').default,
  delhi: require('../../assets/bundled/login/cities/Delhi.svg').default,
  hyderabad: require('../../assets/bundled/login/cities/Hyderabad.svg').default,
  mumbai: require('../../assets/bundled/login/cities/Mumbai.svg').default,
  pune: require('../../assets/bundled/login/cities/Pune.svg').default,
  noida: require('../../assets/bundled/login/cities/Noida.svg').default,
  jaipur: require('../../assets/bundled/login/cities/Jaipur.svg').default,
  kota: require('../../assets/bundled/login/cities/Kota.svg').default,
  goa: require('../../assets/bundled/login/cities/Goa.svg').default,
  gurugram: require('../../assets/bundled/login/cities/Gurugram.svg').default,
  kolkata: require('../../assets/bundled/login/cities/Kolkata.svg').default,
  ahmedabad: require('../../assets/bundled/login/cities/Ahemdabad.svg').default,
  coimbatore: require('../../assets/bundled/login/cities/Coimbatore.svg').default,
  indore: require('../../assets/bundled/login/cities/Indore.svg').default,
  visakhapatnam: require('../../assets/bundled/login/cities/Visakhapa-tnam.svg').default,
} as const;

export type LoginIconName = keyof typeof LoginIcons;

export const LottieAssets = {
  loginLogo: require('../../assets/bundled/login/Logo Animation_White.json'),
  loginLoading: require('../../assets/bundled/login/Loading state HW.json'),
} as const;

export const ImageAssets = {
  loginBento1: require('../../assets/bundled/login/Login Bento 1.png'),
  loginBento2: require('../../assets/bundled/login/Login Bento 2.png'),
  loginBento3: require('../../assets/bundled/login/Login Bento 3.png'),
  loginBento4: require('../../assets/bundled/login/Login Bento 4.png'),
  loginBentoBedroomSmall: require('../../assets/bundled/login/bento/bedroom-small.png'),
  loginLiveBetterText: require('../../assets/bundled/login/bento/live-better-text.png'),
  loginHelloWorldWordmark: require('../../assets/bundled/login/bento/hello-world-wordmark.png'),
  loginColivingBg: require('../../assets/bundled/login/bento/coliving-bg.png'),
  otpIllustration: require('../../assets/bundled/login/OTP 3d Illustration.png'),
  contactIllustration: require('../../assets/bundled/contact/illustration.png'),
  appIcon: require('../../assets/images/icon.png'),
  splashIcon: require('../../assets/images/splash-icon.png'),
} as const;

export const TabBarIcons = {
  home: require('../../assets/bundled/tab-bar/home.svg').default,
  myVisits: require('../../assets/bundled/tab-bar/my-visits.svg').default,
  wishlist: require('../../assets/bundled/tab-bar/wishlist.svg').default,
  contact: require('../../assets/bundled/tab-bar/contact.svg').default,
} as const;

export const HomepageIcons = {
  profile: require('../../assets/bundled/profile/profile.svg').default,
} as const;

export const login = {
  ...LoginIcons,
  logoAnimation: LottieAssets.loginLogo,
  loadingState: LottieAssets.loginLoading,
  bento: [
    ImageAssets.loginBento1,
    ImageAssets.loginBento2,
    ImageAssets.loginBento3,
    ImageAssets.loginBento4,
  ],
  otpIllustration: ImageAssets.otpIllustration,
} as const;

export type HwIconName = LoginIconName | keyof typeof TabBarIcons | keyof typeof HomepageIcons;
