/**
 * HelloWorld design assets.
 *
 * Canonical source: ~/Desktop/HW vibe assets
 * Symlink: assets/hw-vibe (see scripts/link-hw-assets.js)
 *
 * All require() paths must be static strings for Metro bundling.
 */

// ---------------------------------------------------------------------------
// SVG components (via react-native-svg-transformer)
// ---------------------------------------------------------------------------
export const LogoIcons = {
  favicon: require('../../assets/hw-vibe/Logos/Favicon.svg').default,
  gradientMonogram: require('../../assets/hw-vibe/Logos/Gradient Monogram.svg').default,
  blackMonogram: require('../../assets/hw-vibe/Logos/Black Monogram.svg').default,
  whiteMonogram: require('../../assets/hw-vibe/Logos/White Monogram.svg').default,
  blackWordmark: require('../../assets/hw-vibe/Logos/Black Wordmark.svg').default,
  whiteWordmark: require('../../assets/hw-vibe/Logos/White Wordmark.svg').default,
  gradientBlack: require('../../assets/hw-vibe/Logos/Gardient+ black.svg').default,
  black: require('../../assets/hw-vibe/Logos/Black.svg').default,
  white: require('../../assets/hw-vibe/Logos/White.svg').default,
} as const;

export type LogoIconName = keyof typeof LogoIcons;

export const LoginIcons = {
  call: require('../../assets/hw-vibe/Login Flow- App/Vector.svg').default,
  bangalore: require('../../assets/hw-vibe/Login Flow- App/City Selection page/Bangalore.svg').default,
  chennai: require('../../assets/hw-vibe/Login Flow- App/City Selection page/Chennai.svg').default,
  delhi: require('../../assets/hw-vibe/Login Flow- App/City Selection page/Delhi.svg').default,
  hyderabad: require('../../assets/hw-vibe/Login Flow- App/City Selection page/Hyderabad.svg').default,
  mumbai: require('../../assets/hw-vibe/Login Flow- App/City Selection page/Mumbai.svg').default,
  pune: require('../../assets/hw-vibe/Login Flow- App/City Selection page/Pune.svg').default,
  noida: require('../../assets/hw-vibe/Login Flow- App/City Selection page/Noida.svg').default,
  jaipur: require('../../assets/hw-vibe/Login Flow- App/City Selection page/Jaipur.svg').default,
  kota: require('../../assets/hw-vibe/Login Flow- App/City Selection page/Kota.svg').default,
  goa: require('../../assets/hw-vibe/Login Flow- App/City Selection page/Goa.svg').default,
  gurugram: require('../../assets/hw-vibe/Login Flow- App/City Selection page/Gurugram.svg').default,
  kolkata: require('../../assets/hw-vibe/Login Flow- App/City Selection page/Kolkata.svg').default,
  ahmedabad: require('../../assets/hw-vibe/Login Flow- App/City Selection page/Ahemdabad.svg').default,
  coimbatore: require('../../assets/hw-vibe/Login Flow- App/City Selection page/Coimbatore.svg').default,
  indore: require('../../assets/hw-vibe/Login Flow- App/City Selection page/Indore.svg').default,
  visakhapatnam: require('../../assets/hw-vibe/Login Flow- App/City Selection page/Visakhapa-tnam.svg').default,
} as const;

export type LoginIconName = keyof typeof LoginIcons;

export const DashboardIcons = {
  profile: require('../../assets/hw-vibe/Dashboard- App/Profile.svg').default,
  notification: require('../../assets/hw-vibe/Dashboard- App/Notification.svg').default,
  sos: require('../../assets/hw-vibe/Dashboard- App/SOS.svg').default,
  refer: require('../../assets/hw-vibe/Dashboard- App/Refer.svg').default,
  roommate: require('../../assets/hw-vibe/Dashboard- App/Roomate.svg').default,
  visitor: require('../../assets/hw-vibe/Dashboard- App/Visitor.svg').default,
  call: require('../../assets/hw-vibe/Dashboard- App/Call.svg').default,
  navDashboard: require('../../assets/hw-vibe/Dashboard- App/Bottom Nav/Dashboard.svg').default,
  navExplore: require('../../assets/hw-vibe/Dashboard- App/Bottom Nav/Explore.svg').default,
  navPayments: require('../../assets/hw-vibe/Dashboard- App/Bottom Nav/Payments.svg').default,
  navSupport: require('../../assets/hw-vibe/Dashboard- App/Bottom Nav/Support.svg').default,
} as const;

export type DashboardIconName = keyof typeof DashboardIcons;

export type HwIconName = LogoIconName | LoginIconName | DashboardIconName;

// ---------------------------------------------------------------------------
// Lottie & raster
// ---------------------------------------------------------------------------
export const LottieAssets = {
  loginLogo: require('../../assets/hw-vibe/Login Flow- App/Logo Animation_White.json'),
  loginLoading: require('../../assets/hw-vibe/Login Flow- App/Loading state HW.json'),
  paymentSuccess: require('../../assets/hw-vibe/Payments- App/Lottie Animations/Payment Sucess_Animation.json'),
  paymentPending: require('../../assets/hw-vibe/Payments- App/Lottie Animations/Payment Pending_Animation.json'),
  paymentError: require('../../assets/hw-vibe/Payments- App/Lottie Animations/Payment Error_Animation.json'),
} as const;

export const ImageAssets = {
  loginBento1: require('../../assets/hw-vibe/Login Flow- App/Login Bento 1.png'),
  loginBento2: require('../../assets/hw-vibe/Login Flow- App/Login Bento 2.png'),
  loginBento3: require('../../assets/hw-vibe/Login Flow- App/Login Bento 3.png'),
  loginBento4: require('../../assets/hw-vibe/Login Flow- App/Login Bento 4.png'),
  otpIllustration: require('../../assets/hw-vibe/Login Flow- App/OTP 3d Illustration.png'),
  appIcon: require('../../assets/images/icon.png'),
  splashIcon: require('../../assets/images/splash-icon.png'),
} as const;

export const PaymentIcons = {
  downloadInvoice: require('../../assets/hw-vibe/Payments- App/Download Invoice.svg').default,
} as const;

// Feature-module aliases
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

export const logos = LogoIcons;
export const dashboard = DashboardIcons;
export const payments = {
  ...PaymentIcons,
  ...LottieAssets,
} as const;

export const HW_VIBE_ASSETS_ROOT = 'assets/hw-vibe';
