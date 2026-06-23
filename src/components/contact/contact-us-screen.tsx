import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  Linking,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { SymbolView } from 'expo-symbols';

import { ProfileIcon } from '@/components/profile-icon';
import { Button } from '@/components/ui/button';
import { TextField } from '@/components/ui/text-field';
import { fontFamilyForWeight } from '@/constants/fonts';
import { ImageAssets } from '@/constants/assets';
import palette from '@/constants/palette';
import { Radius } from '@/constants/theme';
import { useAuthStore } from '@/stores/auth-store';

const HELP_DESK_NUMBER = '8880008888';
const HELP_DESK_DISPLAY = '888 000 88 88';

const compactLabel = { fontSize: 12, lineHeight: 18, color: palette.gray[700] };

export function ContactUsScreen({ embedded = false }: { embedded?: boolean }) {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const phoneRef = useRef<TextInput>(null);

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [location, setLocation] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{ name?: string; phone?: string }>({});

  const storedMobile = useAuthStore((state) => state.mobile);
  const storedCity = useAuthStore((state) => state.selectedCity);

  useEffect(() => {
    if (storedMobile) setPhone(storedMobile);
    if (storedCity) setLocation(storedCity);
  }, [storedMobile, storedCity]);

  function validate() {
    const nextErrors: { name?: string; phone?: string } = {};
    if (!name.trim()) nextErrors.name = 'Please enter your full name';
    if (phone.replace(/\D/g, '').length !== 10) {
      nextErrors.phone = 'Please enter a valid 10-digit phone number';
    }
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }

  async function onRequestCallback() {
    if (!validate()) return;

    setLoading(true);
    Keyboard.dismiss();
    // TODO: wire uploadContactLead API
    await new Promise((resolve) => setTimeout(resolve, 500));
    setLoading(false);
    if (!embedded) {
      router.back();
    }
  }

  function onCallHelpDesk() {
    Linking.openURL(`tel:${HELP_DESK_NUMBER}`);
  }

  return (
    <LinearGradient
      colors={['#EAF7FE', palette.white]}
      locations={[0, 0.45]}
      style={styles.gradient}>
      <SafeAreaView style={styles.safe} edges={['top', 'left', 'right']}>
        <View style={[styles.header, embedded && styles.headerEmbedded]}>
          {!embedded ? (
            <Pressable
              onPress={() => router.back()}
              style={({ pressed }) => [styles.backButton, pressed && styles.backPressed]}
              accessibilityRole="button"
              accessibilityLabel="Go back">
              <SymbolView
                name="chevron.left"
                size={18}
                weight="semibold"
                tintColor={palette.gray[800]}
              />
            </Pressable>
          ) : null}
          <Text style={[styles.headerTitle, embedded && styles.headerTitleEmbedded]}>
            Contact us
          </Text>
          {!embedded ? <View style={styles.backPlaceholder} /> : null}
        </View>

        <KeyboardAvoidingView
          style={styles.flex}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          keyboardVerticalOffset={insets.top + 48}>
          <ScrollView
            bounces={false}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
            contentContainerStyle={[
              styles.scroll,
              { paddingBottom: Math.max(insets.bottom, 16) + 24 },
            ]}>
            <Image
              source={ImageAssets.contactIllustration}
              style={styles.illustration}
              contentFit="contain"
            />

            <Text style={styles.headline}>Let us help you!</Text>

            <View style={styles.form}>
              <TextField
                label="Full Name"
                labelStyle={compactLabel}
                value={name}
                onChangeText={(text) => {
                  setName(text);
                  if (errors.name) setErrors((prev) => ({ ...prev, name: undefined }));
                }}
                placeholder="Full Name"
                autoCapitalize="words"
                error={errors.name}
                containerStyle={styles.field}
              />

              <View style={styles.field}>
                <Text style={styles.label}>Phone Number</Text>
                <Pressable
                  style={[styles.phoneBox, errors.phone ? styles.phoneBoxError : null]}
                  onPress={() => phoneRef.current?.focus()}>
                  <Text style={styles.prefix}>+91-</Text>
                  <TextInput
                    ref={phoneRef}
                    value={phone}
                    onChangeText={(text) => {
                      setPhone(text.replace(/\D/g, '').slice(0, 10));
                      if (errors.phone) setErrors((prev) => ({ ...prev, phone: undefined }));
                    }}
                    placeholder="Mobile number"
                    placeholderTextColor={palette.gray[400]}
                    keyboardType="phone-pad"
                    textContentType="telephoneNumber"
                    style={styles.phoneInput}
                  />
                </Pressable>
                {errors.phone ? <Text style={styles.error}>{errors.phone}</Text> : null}
              </View>

              <TextField
                label="Location"
                labelStyle={compactLabel}
                value={location}
                onChangeText={setLocation}
                placeholder="Search your location"
                error={undefined}
                containerStyle={styles.field}
              />
            </View>

            <Button
              label="Request Callback"
              onPress={onRequestCallback}
              loading={loading}
              style={styles.submitButton}
            />

            <View style={styles.divider} />

            <Pressable
              onPress={onCallHelpDesk}
              style={({ pressed }) => [styles.helpDesk, pressed && styles.helpDeskPressed]}
              accessibilityRole="button"
              accessibilityLabel={`Call help desk ${HELP_DESK_DISPLAY}`}>
              <View style={styles.helpDeskLeft}>
                <ProfileIcon name="support" size={20} color={palette.gray[900]} />
                <Text style={styles.helpDeskText}>
                  Help desk <Text style={styles.helpDeskBullet}>•</Text> {HELP_DESK_DISPLAY}
                </Text>
              </View>
              <View style={styles.helpDeskAction}>
                <Text style={styles.callNow}>Call now</Text>
                <SymbolView
                  name="arrow.right"
                  size={14}
                  weight="semibold"
                  tintColor={palette.helloLime}
                />
              </View>
            </Pressable>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  safe: {
    flex: 1,
  },
  flex: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingHorizontal: 20,
    paddingBottom: 8,
  },
  headerEmbedded: {
    justifyContent: 'center',
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: palette.white,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#101828',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  backPressed: {
    opacity: 0.85,
  },
  backPlaceholder: {
    width: 40,
  },
  headerTitle: {
    fontSize: 18,
    lineHeight: 28,
    fontFamily: fontFamilyForWeight('bold'),
    color: palette.black,
    flex: 1,
  },
  headerTitleEmbedded: {
    flex: 0,
    textAlign: 'center',
  },
  scroll: {
    paddingHorizontal: 24,
    gap: 20,
  },
  illustration: {
    width: '100%',
    height: 200,
    alignSelf: 'center',
  },
  headline: {
    fontSize: 24,
    lineHeight: 32,
    fontFamily: fontFamilyForWeight('bold'),
    color: palette.black,
    textAlign: 'center',
  },
  form: {
    gap: 16,
  },
  field: {
    gap: 6,
  },
  label: {
    fontSize: 12,
    lineHeight: 18,
    fontFamily: fontFamilyForWeight('medium'),
    color: palette.gray[700],
  },
  phoneBox: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: palette.gray[300],
    borderRadius: Radius.sm,
    paddingHorizontal: 14,
    paddingVertical: 10,
    backgroundColor: palette.white,
    minHeight: 48,
    shadowColor: '#0A0D12',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  phoneBoxError: {
    borderColor: palette.red[300],
  },
  prefix: {
    fontSize: 16,
    lineHeight: 24,
    fontFamily: fontFamilyForWeight('medium'),
    color: palette.gray[400],
  },
  phoneInput: {
    flex: 1,
    minWidth: 0,
    marginLeft: 4,
    padding: 0,
    fontSize: 16,
    lineHeight: 24,
    fontFamily: fontFamilyForWeight('medium'),
    color: palette.black,
  },
  error: {
    fontSize: 12,
    lineHeight: 18,
    color: palette.red[600],
  },
  submitButton: {
    width: '100%',
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: palette.gray[300],
    marginVertical: 4,
  },
  helpDesk: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
    backgroundColor: palette.lime[50],
    borderWidth: 1,
    borderColor: palette.lime[200],
    borderRadius: Radius.full,
    paddingVertical: 14,
    paddingHorizontal: 16,
  },
  helpDeskPressed: {
    opacity: 0.9,
  },
  helpDeskLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    flex: 1,
  },
  helpDeskText: {
    flex: 1,
    fontSize: 13,
    lineHeight: 18,
    fontFamily: fontFamilyForWeight('medium'),
    color: palette.gray[900],
  },
  helpDeskBullet: {
    color: palette.gray[500],
  },
  helpDeskAction: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  callNow: {
    fontSize: 13,
    lineHeight: 18,
    fontFamily: fontFamilyForWeight('bold'),
    color: palette.helloLime,
  },
});
