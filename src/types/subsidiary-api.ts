import { ApiRequest, ApiResponse } from "types/api.ts";
import { AuthUser } from "types/user.ts";
import { Bank } from "./bank";

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

export type SubsidiaryVerificationEmailResendApiRequest = ApiRequest;

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
  businessTypeId: number;
  countryId: number;
  description: string;
  businessName: string;
  bvn: string;
  industryId: number;
}>;
export type UpdateSubsidiaryComplianceProfileApiResponse = { message: string };

export type UpdateSubsidiaryComplianceBankApiRequest = ApiRequest<{
  bankId: string;
  bankName: string;
  accountName: string;
  accountNumber: string;
}>;
export type UpdateSubsidiaryComplianceBankApiResponse = { message: string };

export type UpdateSubsidiaryComplianceDirectorApiRequest = ApiRequest<{
  FullName: string;
  Identity: string;
  IdNumber: string;
}>;
export type UpdateSubsidiaryComplianceDirectorApiResponse = { message: string };

export type UpdateSubsidiaryComplianceKycDetailsApiRequest = ApiRequest<{
  Identity: string;
  ProofOfAddress: string;
}>;
export type UpdateSubsidiaryComplianceKycDetailsApiResponse = {
  message: string;
};

export type GetSubsidiaryComplianceInfoApiResponse = {
  profileCompliance: {
    businessType: {
      id: number;
      name: string;
    };
    country: {
      id: number;
      name: string;
    };
    description: string;
    businessName: string;
    bvn: string;
    industry: {
      id: number;
      name: string;
    };
    compliancePercentage: number;
  };
  bankCompliance: {
    bankId: number | null;
    bankName: string | null;
    accountName: string | null;
    accountNumber: string | null;
    compliancePercentage: number;
  };
  directorCompliance: {
    idNumber: string | null;
    fullName: string | null;
    identity: string | null;
    compliancePercentage: number;
  };
  kycDetailsCompliance: {
    meansOfIdentification: string | null;
    proofOfAddress: string | null;
    compliancePercentage: number;
  };
};

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
