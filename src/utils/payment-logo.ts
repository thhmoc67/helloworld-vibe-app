import { Asset } from 'expo-asset';
import * as FileSystem from 'expo-file-system/legacy';

import { ImageAssets } from '@/constants/assets';

let cachedPaymentLogoDataUri: string | null = null;

/** Razorpay checkout logo — bundled revamp icon as a base64 data URI. */
export async function getPaymentLogoImage() {
  if (cachedPaymentLogoDataUri) {
    return cachedPaymentLogoDataUri;
  }

  const asset = Asset.fromModule(ImageAssets.paymentLogo);
  await asset.downloadAsync();

  const uri = asset.localUri ?? asset.uri;
  if (!uri) {
    throw new Error('Payment logo asset is unavailable');
  }

  const base64 = await FileSystem.readAsStringAsync(uri, {
    encoding: FileSystem.EncodingType.Base64,
  });

  cachedPaymentLogoDataUri = `data:image/png;base64,${base64}`;
  return cachedPaymentLogoDataUri;
}
