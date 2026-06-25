import { Image, type ImageSource, type ImageStyle } from 'expo-image';
import { useMemo, useState } from 'react';
import { type StyleProp } from 'react-native';

import { ImageAssets } from '@/constants/assets';
import { COMING_SOON_IMAGE_URI } from '@/utils/images';

type ImageAssetKey = keyof typeof ImageAssets;

type LocalityCardImageProps = {
  imageKey?: ImageAssetKey;
  imageUri?: string | null;
  style?: StyleProp<ImageStyle>;
};

function resolveLocalityImageSource(
  imageKey?: ImageAssetKey,
  imageUri?: string | null,
): ImageSource {
  if (typeof imageUri === 'string' && imageUri.trim().length > 0) {
    return { uri: imageUri };
  }

  if (imageKey && imageKey in ImageAssets) {
    return ImageAssets[imageKey];
  }

  return { uri: COMING_SOON_IMAGE_URI };
}

export function LocalityCardImage({ imageKey, imageUri, style }: LocalityCardImageProps) {
  const initialSource = useMemo(
    () => resolveLocalityImageSource(imageKey, imageUri),
    [imageKey, imageUri],
  );
  const [useFallback, setUseFallback] = useState(false);
  const source = useFallback ? { uri: COMING_SOON_IMAGE_URI } : initialSource;

  return (
    <Image
      source={source}
      style={style}
      contentFit="cover"
      onError={() => setUseFallback(true)}
    />
  );
}
