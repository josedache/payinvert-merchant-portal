import { FormikProps } from "formik";
import { SubsidiaryComplianceChecker } from "types/subsidiary";
import { RefObject } from "react";

export type ComplianceUpdateFormikValues = {
  businessType: string | number;
  description: string;
  businessName: string;
  registrationNumber: string;
  taxIdNumber: string;

  verifiedPhoneNumber: string;
  businessAddress: string;
  email: string;

  bankId: string;
  bankName: string;
  accountName: string;
  accountNumber: string;

  FullName: string;
  DocumentType: string;
  Identity: string | File;
  Bvn: string;

  CertificateOfIncorporation: string | File;
  MemoOfAssociation: string | File;

  termOfServiceSigned: boolean;
  slaSigned: boolean;
  msaSigned: boolean;
  signedBy: string;
};

export interface ComplianceUpdateContentDataRef {
  backButtonJsx: any;
  formik: FormikProps<ComplianceUpdateFormikValues>;
  stepper: any;
  isInitialOnboarding?: boolean;
  isView?: boolean;
  complianceInfo?: SubsidiaryComplianceChecker;
  isStartupBusiness?: boolean;
  isRegisteredBusiness?: boolean;
}

export interface ComplianceUpdateContentProps
  extends ComplianceUpdateContentDataRef {
  dataRef: RefObject<ComplianceUpdateContentDataRef>;
}
