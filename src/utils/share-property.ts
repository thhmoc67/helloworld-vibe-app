import { Share } from 'react-native';

import config from '@/config';

export function getPropertyShareUrl(propertyId: string) {
  return `${config.PUBLIC_URL}/coliving-pg/${propertyId}`;
}

export async function shareProperty(params: {
  name: string;
  id?: string;
  url?: string;
}) {
  const url = params.url ?? (params.id ? getPropertyShareUrl(params.id) : config.PUBLIC_URL);
  const message = `Check out ${params.name} on HelloWorld\n${url}`;
  await Share.share({ message }).catch(() => undefined);
}

export function getImageUriFromSource(
  image: number | { uri?: string } | undefined,
): string | undefined {
  if (typeof image === 'object' && image !== null && 'uri' in image) {
    return image.uri;
  }
  return undefined;
}
