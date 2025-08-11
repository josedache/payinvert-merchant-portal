import { ApiRequest, ApiResponse } from "types/api";
import { AuthUser } from "types/user";
import { Bank } from "./bank";
import {
  SubsidiaryCompliance,
  SubsidiaryComplianceChecker,
} from "types/subsidiary";

export type SubsidiaryLoginApiRequest = ApiRequest<{
  email: string;
  password: string;
}>;

export type SubsidiaryLoginApiResponse = AuthUser;

export type SubsidiaryLoginCompleteApiRequest = ApiRequest<{
  otp: string;
  email: string;
  subsidiaryId?: number;
}>;

export type SubsidiaryLoginCompleteApiResponse = SubsidiaryLoginApiResponse;

export type SubsidiaryOtpResendApiRequest = ApiRequest<{
  identifier: string;
  loginHash: string;
}>;

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export type SubsidiaryOtpResendApiResponse = {};

export type SubsidiarySignupApiRequest = ApiRequest<{
  firstName: string;
  lastName: string;
  userEmail: string;
  mobileNumber: string;
  businessName: string;
  password: string;
  confirmpassword: string;
}>;

export type SubsidiarySignupApiResponse = { message: string };

export type SubsidiaryVerificationEmailResendApiRequest = ApiRequest<
  void,
  void,
  { Email: string }
>;

export type SubsidiaryVerificationEmailResendApiResponse = { message: string };

export type SubsidiaryBusinessEmailVerifyResendApiRequest = ApiRequest;

export type SubsidiaryBusinessEmailVerifyResendApiResponse = {
  message: string;
};

export type SubsidiaryForgotPasswordApiRequest = ApiRequest<{
  identifier: string;
}>;

export type SubsidiaryForgotPasswordApiResponse = { message: string };

export type SubsidiaryCompleteForgotPasswordApiRequest = ApiRequest<{
  identifier: string;
  newPassword: string;
  otp: string;
  confirmPassword: string;
}>;

export type SubsidiaryCompleteForgotPasswordApiResponse = {
  message: string;
};

export type SubsidiaryMeApiRequest = ApiRequest;

export type SubsidiaryMeApiResponse = SubsidiaryLoginApiResponse;

export type UpdateSubsidiaryComplianceProfileApiRequest = ApiRequest<{
  businessType: string | number;
  description: string;
  businessName: string;
  registrationNumber: string;
  taxIdNumber: string;
}>;
export type UpdateSubsidiaryComplianceProfileApiResponse = { message: string };

export type UpdateSubsidiaryComplianceContactApiRequest = ApiRequest<{
  verifiedPhoneNumber: string;
  businessAddress: string;
  email: string;
}>;
export type UpdateSubsidiaryComplianceContactApiResponse = { message: string };

export type UpdateSubsidiaryComplianceBankApiRequest = ApiRequest<{
  bankId: string;
  bankName: string;
  accountName: string;
  accountNumber: string;
}>;
export type UpdateSubsidiaryComplianceBankApiResponse = { message: string };

export type UpdateSubsidiaryComplianceDirectorApiRequest = ApiRequest<{
  FullName: string;
  DocumentType: string;
  Identity: string | File;
  Bvn: string;
}>;
export type UpdateSubsidiaryComplianceDirectorApiResponse = { message: string };

export type UpdateSubsidiaryComplianceOwnerApiRequest = ApiRequest<{
  FullName: string;
  DocumentType: string;
  Identity: string | File;
  Bvn: string;
}>;
export type UpdateSubsidiaryComplianceOwnerApiResponse = { message: string };

export type UpdateSubsidiaryComplianceKybDetailsApiRequest = ApiRequest<{
  CertificateOfIncorporation: string | File;
  MemoOfAssociation: string | File;
}>;
export type UpdateSubsidiaryComplianceKybDetailsApiResponse = {
  message: string;
};

export type GetSubsidiaryComplianceInfoApiResponse = SubsidiaryCompliance;

export type GetSubsidiaryComplianceCheckerApiResponse =
  SubsidiaryComplianceChecker;

export type GetSubsidiaryBankApiResponse = { banks: Bank[] };

export type GetSubsidiaryResolveBankApiResponse = ApiResponse<Bank>;
export type GetSubsidiaryResolveBankApiRequest = ApiRequest<{
  accountNumber: string;
  bankCode: string;
}>;

export type GetSubsidiaryBusinessCategoryListApiResponse = ApiResponse<
  {
    name: string;
    description: string | null;
    isActive: boolean | null;
    id: number;
    dateCreated: string;
    dateUpdated: string | null;
    dateDeleted: string | null;
    createdBy: number;
    updatedBy: number | null;
    deletedBy: number | null;
  }[]
>;

export type GetSubsidiaryBusinessChartApiResponse = {
  transactionCount: {
    data: number;
    percentage: number;
  };
  availableBalance: {
    data: number;
    percentage: number;
  };
  transactionVolume: {
    data: number;
    percentage: number;
  };
  transactionSettlement: {
    data: number;
    percentage: number;
  };
  ledgerBalance: {
    data: number;
    percentage: number;
  };
  chartData: Record<
    string,
    {
      DEBIT: number;
      CREDIT: number;
    }
  >;
};
export type GetSubsidiaryDropdownEnumsApiResponse = ApiResponse<{
  name: string;
  description: string;
  value: number;
}>;
export type GetSubsidiaryDropdownApiResponse = {
  id: number;
  name: string;
  position: number;
  description: string;
  active: boolean;
  mandatory: boolean;
}[];

export type GetSubsidiaryDashboardUserDetailsApiResponse = AuthUser;

export type SubsidiaryDashboardKeysNewApiRequest = ApiRequest;

export type SubsidiaryDashboardKeysNewApiResponse = {
  apiKeys: {
    publicKey: string;
    secretKey: string;
    encryptionKey: string;
  };
};

export type SubsidiaryDashboardKeyCreateNewAuthApiRequest = ApiRequest;

export type SubsidiaryDashboardKeyCreateNewAuthApiResponse = ApiResponse;

export type SubsidiaryDashboardPaymentLinkStatusUpdateApiRequest = ApiRequest<
  void,
  void,
  {
    Action: "Activate" | "Deactivate";
    Reference: string;
  }
>;

export type SubsidiaryDashboardPaymentLinkStatusUpdateApiResponse = ApiResponse;
