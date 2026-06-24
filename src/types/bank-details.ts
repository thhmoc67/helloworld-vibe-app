export type BankDetails = {
  name: string;
  accountNumber: string;
  ifscCode: string;
};

export type BankDetailsForm = BankDetails & {
  reEnterAccountNumber: string;
};
