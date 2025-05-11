import { FormikProps } from "formik";

export type DashboardAccountSetupFormikValues = {
  nin: string;
  bvn: string;
  otp: string;
  rcNumber: string;
  businessTypeId: string;
  businessName: string;
  annualTurnOver: string;
  businessSector: string;
  businessSectorParent: string;
  transactionPin: string;
  confirmTransactionPin: string;
  registrationType: string;
};
export type DashboardAccountSetupContentProps = {
  formik: FormikProps<DashboardAccountSetupFormikValues>;
  stepper: any;
};
