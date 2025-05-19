import { ApiRequest } from "types/api.ts";
import { User } from "types/user.ts";
import { Subsidiary } from "types/subsidiary.ts";
import { Notification } from "types/notification.ts";

export type SubsidiaryLoginApiRequest = ApiRequest<{
  email: string;
  password: string;
}>;

export type SubsidiaryLoginApiResponse = {
  notifications: Notification[];
  token: {
    accessToken: string;
  };
  user: User;
  loginHash: string | null;
  envronmentDetail: {
    id: number;
    name: string;
  };
  id: string;
  subsidiaryDetails: {
    total: number;
    subsidiaries: Subsidiary[];
  };
  activeSubsidiary: Subsidiary | null;
  routeToGetStarted: boolean;
  status: string;
  statusCode: string;
  message: string;
};

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

export type UpdateSubsidiaryComplianceProfileApiRequest = {
  businessTypeId: number;
  countryId: number;
  description: string;
  businessName: string;
  bvn: string;
  industryId: number;
};
export type UpdateSubsidiaryComplianceProfileApiResponse = { message: string };

export type UpdateSubsidiaryComplianceBankApiRequest = {
  bankId: string;
  bankName: string;
  accountName: string;
  accountNumber: string;
};
export type UpdateSubsidiaryComplianceBankApiResponse = { message: string };

export type UpdateSubsidiaryComplianceDirectorApiRequest = {
  FullName: string;
  Identity: string;
  IdNumber: string;
};
export type UpdateSubsidiaryComplianceDirectorApiResponse = { message: string };

export type UpdateSubsidiaryComplianceKycDetailsApiRequest = {
  Identity: string;
  ProofOfAddress: string;
};
export type UpdateSubsidiaryComplianceKycDetailsApiResponse = {
  message: string;
};
