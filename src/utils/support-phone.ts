import { Linking, Platform } from 'react-native';

import { HELP_DESK_PHONE } from '@/constants/tenant';

export function callHelpDesk() {
  const phoneNumber =
    Platform.OS === 'android' ? `tel:${HELP_DESK_PHONE}` : `telprompt:${HELP_DESK_PHONE}`;
  void Linking.openURL(phoneNumber);
}
