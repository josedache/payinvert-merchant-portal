import { FormikProps } from "formik";

export type SettingComplianceFormikValues = {
  bvn?: string;
};
export type SettingsComplianceContentProps = {
  formik: FormikProps<SettingComplianceFormikValues>;
  stepper: any;
};
