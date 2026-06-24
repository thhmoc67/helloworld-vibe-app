const VALIDATORS: Record<string, { message: string; test: (value: string) => boolean }> = {
  name: {
    message: 'Please enter a valid name',
    test: (value) => /^[a-zA-Z\s]{1,40}$/.test(value.trim()),
  },
  accountNumber: {
    message: 'Please enter a valid account number',
    test: (value) => /^\d{8,24}$/.test(value.trim()),
  },
  ifscCode: {
    message: 'Please enter a valid IFSC code',
    test: (value) => /^[A-Za-z]{4}[\dA-Za-z]{6,8}$/.test(value.trim()),
  },
};

export function validateBankField(field: keyof typeof VALIDATORS, value: string) {
  const trimmed = value.trim();
  if (!trimmed) return 'Field is required';
  const validator = VALIDATORS[field];
  return validator.test(trimmed) ? '' : validator.message;
}

export function validateBankForm(form: {
  name: string;
  accountNumber: string;
  reEnterAccountNumber: string;
  ifscCode: string;
}) {
  const errors: Partial<Record<keyof typeof form, string>> = {};

  for (const field of ['name', 'accountNumber', 'ifscCode'] as const) {
    const message = validateBankField(field, form[field]);
    if (message) errors[field] = message;
  }

  if (form.accountNumber.trim() !== form.reEnterAccountNumber.trim()) {
    errors.reEnterAccountNumber = 'Account number does not match';
  }

  return errors;
}

export function hasCompleteBankDetails(details?: {
  name?: string;
  accountNumber?: string;
  ifscCode?: string;
}) {
  return Boolean(details?.name?.trim() && details?.accountNumber?.trim() && details?.ifscCode?.trim());
}
