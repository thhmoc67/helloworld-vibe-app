import * as WebBrowser from 'expo-web-browser';

import palette from '@/constants/palette';

type KycLinkResponse = {
  success?: boolean;
  data?: string | { url?: string };
  url?: string;
  message?: string;
};

export function extractKycUrl(response: KycLinkResponse | null | undefined): string | null {
  if (!response) return null;

  if (typeof response.data === 'string' && response.data.trim()) {
    return response.data;
  }

  if (response.data && typeof response.data === 'object' && typeof response.data.url === 'string') {
    return response.data.url;
  }

  if (typeof response.url === 'string' && response.url.trim()) {
    return response.url;
  }

  return null;
}

export async function openKycVerification(url: string) {
  return WebBrowser.openBrowserAsync(url, {
    toolbarColor: palette.white,
    controlsColor: palette.gray[800],
    showTitle: true,
    enableBarCollapsing: false,
  });
}
