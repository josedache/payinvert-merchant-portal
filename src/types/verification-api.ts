import { ApiRequest, ApiResponse } from "types/api";

export type VerificationBvnRequestApiRequest = ApiRequest<
  void,
  void,
  {
    fullname: string;
    bvn: string;
  }
>;

export type VerificationBvnRequestApiResponse = ApiResponse<{
  recipientKey: string;
  recipientReference: string;
  recipientMask: string;
}>;

export type VerificationBvnValidateApiRequest = ApiRequest<{
  recipientKey: string;
  recipientReference: string;
  otpCode: string;
}>;

export type VerificationBvnValidateApiResponse = {
  message: string;
};

export type VerificationEmailRequestApiRequest = ApiRequest<
  void,
  {
    email: string;
  }
>;

export type VerificationEmailRequestApiResponse = ApiResponse;

export type VerificationEmailValidateApiRequest = ApiRequest<
  void,
  {
    otp: string;
  }
>;

export type VerificationEmailValidateApiResponse = {
  message: string;
};

export type VerificationNameEnquiryApiRequest = ApiRequest<{
  bankCode: string;
  nipBankCode: string;
  accountNumber: string;
}>;

export type VerificationNameEnquiryApiResponse = ApiResponse<{
  accountName: string;
  accountNumber: string;
  bankCode: string;
}>;

export type VerificationRcNumberValidateApiRequest = ApiRequest<
  void,
  {
    rcNumber: string;
  }
>;

export type VerificationRcNumberValidateApiResponse = {
  message: string;
};
