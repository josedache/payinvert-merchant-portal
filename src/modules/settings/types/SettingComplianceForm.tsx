import { FormikProps } from "formik";

export type SettingComplianceFormikValues = Partial<{
  businessTypeId: number;
  countryId: number;
  description: string;
  businessName: string;
  bvn: string;
  industryId: number;

  bankId: string;
  bankName: string;
  accountName: string;
  accountNumber: string;

  IdNumber: string;
  FullName: string;
  directorIdentity: string;

  KycIdentity: string;
  ProofOfAddress;
}>;
export type SettingsComplianceContentProps = {
  formik: FormikProps<SettingComplianceFormikValues>;
  stepper: any;
  isInitialOnboarding?: boolean;
  isEdit?: boolean;
  isPreview?: boolean;
};
