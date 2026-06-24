import { Linking, Platform } from 'react-native';

export function openPhoneCall(mobile: string) {
  const digits = mobile.replace(/\D/g, '');
  if (!digits) return;
  const url = Platform.OS === 'android' ? `tel:${digits}` : `telprompt:${digits}`;
  void Linking.openURL(url);
}

export function openWhatsApp(mobile: string, message?: string) {
  const digits = mobile.replace(/\D/g, '');
  if (!digits) return;
  const phone = digits.length === 10 ? `91${digits}` : digits;
  const text = message ? `&text=${encodeURIComponent(message)}` : '';
  void Linking.openURL(`https://wa.me/${phone}${text}`);
}
