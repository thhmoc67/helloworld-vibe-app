import type { EmergencyContactDetails } from '@/types/emergency-contact';

export function validateEmergencyContactForm(form: EmergencyContactDetails) {
  const errors: Partial<Record<keyof EmergencyContactDetails, string>> = {};

  const name = form.name.trim();
  if (!name) {
    errors.name = 'Field is required';
  } else if (!/^[a-zA-Z\s]{1,40}$/.test(name)) {
    errors.name = 'Please enter a valid name';
  }

  const mobile = form.mobile.trim();
  if (!mobile) {
    errors.mobile = 'Field is required';
  } else if (!/^\d{10}$/.test(mobile)) {
    errors.mobile = 'Please enter a valid mobile number';
  }

  const relation = form.relation.trim();
  if (!relation) {
    errors.relation = 'Field is required';
  }

  return errors;
}

export function hasCompleteEmergencyContact(details?: Partial<EmergencyContactDetails>) {
  return Boolean(details?.name?.trim() && details?.mobile?.trim() && details?.relation?.trim());
}
