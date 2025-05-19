import { baseApi } from "configs/store-query";
import { USER } from "constants/tags.ts";
import {
  SubsidiaryBusinessEmailVerifyResendApiRequest,
  SubsidiaryBusinessEmailVerifyResendApiResponse,
  SubsidiaryCompleteForgotPasswordApiRequest,
  SubsidiaryCompleteForgotPasswordApiResponse,
  SubsidiaryForgotPasswordApiRequest,
  SubsidiaryForgotPasswordApiResponse,
  SubsidiaryLoginApiRequest,
  SubsidiaryLoginApiResponse,
  SubsidiaryLoginCompleteApiRequest,
  SubsidiaryLoginCompleteApiResponse,
  SubsidiaryMeApiRequest,
  SubsidiaryMeApiResponse,
  SubsidiaryOtpResendApiRequest,
  SubsidiaryOtpResendApiResponse,
  SubsidiarySignupApiRequest,
  SubsidiarySignupApiResponse,
  SubsidiaryVerificationEmailResendApiRequest,
  SubsidiaryVerificationEmailResendApiResponse,
  UpdateSubsidiaryComplianceBankApiRequest,
  UpdateSubsidiaryComplianceBankApiResponse,
  UpdateSubsidiaryComplianceDirectorApiRequest,
  UpdateSubsidiaryComplianceDirectorApiResponse,
  UpdateSubsidiaryComplianceKycDetailsApiRequest,
  UpdateSubsidiaryComplianceKycDetailsApiResponse,
  UpdateSubsidiaryComplianceProfileApiRequest,
  UpdateSubsidiaryComplianceProfileApiResponse,
} from "types/subsidiary-api.ts";

export const BASE_URL = "/subsidiary";

export const subsidiaryApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    loginSubsidiary: builder.mutation<
      SubsidiaryLoginApiResponse,
      SubsidiaryLoginApiRequest
    >({
      query: (config) => ({
        url: BASE_URL + "/dashboard/login",
        method: "post",
        ...config,
      }),
      invalidatesTags: [{ type: USER }],
    }),
    completeSubsidiaryLogin: builder.mutation<
      SubsidiaryLoginCompleteApiResponse,
      SubsidiaryLoginCompleteApiRequest
    >({
      query: (config) => ({
        url: BASE_URL + "/dashboard/complete/login",
        method: "post",
        ...config,
      }),
      invalidatesTags: [{ type: USER }],
    }),
    resendSubsidiaryOtp: builder.mutation<
      SubsidiaryOtpResendApiResponse,
      SubsidiaryOtpResendApiRequest
    >({
      query: (config) => ({
        url: BASE_URL + "/dashboard/otp-resend",
        method: "post",
        ...config,
      }),
      invalidatesTags: [{ type: USER }],
    }),
    signupSubsidiary: builder.mutation<
      SubsidiarySignupApiResponse,
      SubsidiarySignupApiRequest
    >({
      query: (config) => ({
        url: BASE_URL + "/dashboard/signup",
        method: "post",
        ...config,
      }),
      invalidatesTags: [{ type: USER }],
    }),
    resendSubsidiaryVerificationEmail: builder.mutation<
      SubsidiaryVerificationEmailResendApiResponse,
      SubsidiaryVerificationEmailResendApiRequest
    >({
      query: (config) => ({
        url: BASE_URL + "/dashboard/resend/verification/email",
        method: "get",
        ...config,
      }),
      invalidatesTags: [{ type: USER }],
    }),
    verifySubsidiaryBusinessEmail: builder.mutation<
      SubsidiaryBusinessEmailVerifyResendApiResponse,
      SubsidiaryBusinessEmailVerifyResendApiRequest
    >({
      query: (config) => ({
        url: BASE_URL + "/dashboard/verify/business/email",
        method: "get",
        ...config,
      }),
      invalidatesTags: [{ type: USER }],
    }),
    forgotPasswordSubsidiary: builder.mutation<
      SubsidiaryForgotPasswordApiResponse,
      SubsidiaryForgotPasswordApiRequest
    >({
      query: (config) => ({
        url: BASE_URL + "/dashboard/forgot-password",
        method: "post",
        ...config,
      }),
      invalidatesTags: [{ type: USER }],
    }),
    completeSubsidiaryForgotPassword: builder.mutation<
      SubsidiaryCompleteForgotPasswordApiResponse,
      SubsidiaryCompleteForgotPasswordApiRequest
    >({
      query: (config) => ({
        url: BASE_URL + "/dashboard/complete/forgot-password",
        method: "post",
        ...config,
      }),
      invalidatesTags: [{ type: USER }],
    }),
    getSubsidiaryMe: builder.query<
      SubsidiaryMeApiResponse,
      SubsidiaryMeApiRequest
    >({
      query: (config) => ({
        url: BASE_URL + "/dashboard/me",
        method: "get",
        ...config,
      }),
      providesTags: [{ type: USER }],
    }),

    //Compliance
    updateSubsidiaryComplianceProfile: builder.mutation<
      UpdateSubsidiaryComplianceProfileApiResponse,
      UpdateSubsidiaryComplianceProfileApiRequest
    >({
      query: (config) => ({
        url: BASE_URL + "/dashboard/compliance/profile",
        method: "post",
        ...config,
      }),
      invalidatesTags: [{ type: USER }],
    }),
    updateSubsidiaryComplianceBank: builder.mutation<
      UpdateSubsidiaryComplianceBankApiResponse,
      UpdateSubsidiaryComplianceBankApiRequest
    >({
      query: (config) => ({
        url: BASE_URL + "/dashboard/compliance/bank",
        method: "post",
        ...config,
      }),
      invalidatesTags: [{ type: USER }],
    }),
    updateSubsidiaryComplianceDirector: builder.mutation<
      UpdateSubsidiaryComplianceDirectorApiResponse,
      UpdateSubsidiaryComplianceDirectorApiRequest
    >({
      query: (config) => ({
        url: BASE_URL + "/dashboard/compliance/director",
        method: "post",
        ...config,
      }),
      invalidatesTags: [{ type: USER }],
    }),
    updateSubsidiaryComplianceKycDetails: builder.mutation<
      UpdateSubsidiaryComplianceKycDetailsApiResponse,
      UpdateSubsidiaryComplianceKycDetailsApiRequest
    >({
      query: (config) => ({
        url: BASE_URL + "/dashboard/compliance/kyc-details",
        method: "post",
        ...config,
      }),
      invalidatesTags: [{ type: USER }],
    }),
  }),
});
